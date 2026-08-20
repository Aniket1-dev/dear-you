// Mydear — chat realtime enhancements
(function () {
  const db = () => window.fb.db;
  const FV = () => window.fb.FieldValue;
  async function uid() { const u = await AUTH.getUser(); return u && u.uid; }

  async function setTyping(matchId, isTyping) {
    const me = await uid(); if (!me) return;
    await db().collection('matches').doc(matchId).collection('presence').doc(me).set({
      typing: !!isTyping, online: true, updatedAt: FV().serverTimestamp()
    }, { merge: true });
  }

  function subscribeTyping(matchId, otherUid, callback) {
    return db().collection('matches').doc(matchId).collection('presence').doc(otherUid)
      .onSnapshot(s => callback(!!(s.exists && s.data().typing)));
  }

  async function heartbeat(matchId) {
    const me = await uid(); if (!me) return;
    await db().collection('matches').doc(matchId).collection('presence').doc(me).set({
      online: true, updatedAt: FV().serverTimestamp(), typing: false
    }, { merge: true });
  }

  function subscribePresence(matchId, otherUid, callback) {
    return db().collection('matches').doc(matchId).collection('presence').doc(otherUid)
      .onSnapshot(s => {
        const d = s.exists ? s.data() : {};
        let online = false;
        if (d.updatedAt && typeof d.updatedAt.toDate === 'function') online = (Date.now() - d.updatedAt.toDate().getTime()) < 45000;
        callback({ online, typing: !!d.typing });
      });
  }

  async function toggleReaction(matchId, messageId, emoji) {
    const me = await uid(); if (!me) return;
    const ref = db().collection('matches').doc(matchId).collection('messages').doc(messageId);
    const snap = await ref.get(); if (!snap.exists) return;
    const reactions = { ...(snap.data().reactions || {}) };
    if (reactions[me] === emoji) delete reactions[me]; else reactions[me] = emoji;
    await ref.update({ reactions });
  }

  async function markMessagesRead(matchId) {
    const me = await uid(); if (!me) return;
    const snap = await db().collection('matches').doc(matchId).collection('messages').orderBy('createdAt', 'desc').limit(80).get();
    const batch = db().batch(); snap.docs.filter(d => d.data().senderId !== me && !d.data().read).forEach(d => batch.update(d.ref, { read: true }));
    if (snap.docs.length) await batch.commit();
    try { await db().collection('matches').doc(matchId).update({ [`unread.${me}`]: 0 }); } catch (_) {}
  }

  window.CHAT_REALTIME = { setTyping, subscribeTyping, heartbeat, subscribePresence, toggleReaction, markMessagesRead };
})();
