const emojis = ['💛','💕','✨','💌','🎀'];
  const wrap = document.getElementById('confetti');
  for(let i=0;i<24;i++){
    const s = document.createElement('span');
    s.textContent = emojis[i % emojis.length];
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.transform = 'rotate(' + (Math.random()*40-20) + 'deg)';
    wrap.appendChild(s);
  }
