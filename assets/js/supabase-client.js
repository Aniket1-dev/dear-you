// ============================================================================
// Smitten — Supabase client
// Loaded after supabase-config.js and the supabase-js CDN bundle.
// Exposes a single shared client on window.sb for every page to reuse.
// ============================================================================
(function () {
  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error(
      "Smitten: supabase-js failed to load. Check your network connection " +
      "or the CDN <script> tag in <head>."
    );
    return;
  }
  if (
    !window.SUPABASE_URL ||
    window.SUPABASE_URL.includes("YOUR-PROJECT-REF") ||
    !window.SUPABASE_ANON_KEY ||
    window.SUPABASE_ANON_KEY.includes("YOUR-ANON-PUBLIC-KEY")
  ) {
    console.warn(
      "Smitten: assets/js/supabase-config.js still has placeholder values. " +
      "Fill in SUPABASE_URL and SUPABASE_ANON_KEY with your real project's " +
      "values (Supabase dashboard → Settings → API)."
    );
  }

  window.sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
})();
