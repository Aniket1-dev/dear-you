// Mydear — Firebase client
(function () {
  function showBanner(message) {
    var el = document.createElement("div");
    el.textContent = message;
    el.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:99999;background:#ffe3e3;color:#7a1f1f;font:600 13px/1.4 system-ui,sans-serif;padding:10px 16px;text-align:center;border-bottom:2px solid #c92a2a;";
    document.addEventListener("DOMContentLoaded", function () { document.body.prepend(el); });
    if (document.body) document.body.prepend(el);
  }
  if (!window.firebase || typeof window.firebase.initializeApp !== "function") {
    console.error("Mydear: Firebase SDK failed to load.");
    showBanner("⚠️ Firebase library failed to load — see browser console.");
    return;
  }
  var cfg = window.FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey || cfg.apiKey.includes("YOUR-API-KEY") || !cfg.projectId || cfg.projectId.includes("YOUR-PROJECT-ID")) {
    console.warn("Mydear: firebase-config.js still has placeholder values.");
    showBanner("⚠️ Firebase isn't configured yet — edit assets/js/firebase-config.js.");
    return;
  }
  var app = window.firebase.apps.length ? window.firebase.apps[0] : window.firebase.initializeApp(cfg);
  window.fb = {
    app: app,
    auth: window.firebase.auth(),
    db: window.firebase.firestore(),
    functions: window.firebase.app().functions(window.FIREBASE_FUNCTIONS_REGION || "us-central1"),
    FieldValue: window.firebase.firestore.FieldValue,
    Timestamp: window.firebase.firestore.Timestamp,
    GoogleAuthProvider: window.firebase.auth.GoogleAuthProvider,
  };
  window.fb.auth.setPersistence(window.firebase.auth.Auth.Persistence.LOCAL).catch(function (err) {
    console.warn("Mydear: could not set auth persistence:", err.message);
  });
})();
