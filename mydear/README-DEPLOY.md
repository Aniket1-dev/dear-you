# Mydear — Realtime Dating App

Enhanced Mydear dating-app build with profiles, KYC/verification flows, admin portal, discovery, matching, and real-time Firestore chat.

## Realtime chat
- Firestore `onSnapshot()` message listeners
- Online/offline presence and typing indicators
- Message read state and unread counts
- Message reactions
- Photo sharing hooks via Cloudinary
- Date planning, icebreaker duel, moments and safety actions from chat

## Firebase setup
Fill `assets/js/firebase-config.js` with the Firebase Web SDK configuration for your project. Never place service-account credentials in client code.

Deploy hosting and Firestore rules with Firebase CLI after configuring the project.

The complete expanded UI archive contains the full page set; this repository branch contains the core deploy/runtime files for the enhanced Mydear build.
