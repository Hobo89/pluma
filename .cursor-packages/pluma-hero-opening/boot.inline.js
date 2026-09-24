// Inline this in <head>, replacing the dynamic /pluma-hero/boot.js loader.
(() => {
  const path = location.pathname.replace(/\/+$/, '') || '/';
  if (path !== '/' && path !== '/index.html') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;
  const html = document.documentElement;
  let timer;
  const guard = window.__plumaHeroBoot = {
    status: 'pending',
    release(reason = 'controller') {
      if (guard.status === 'released') return;
      clearTimeout(timer);
      html.removeAttribute('data-ph-intro-pending');
      guard.status = 'released';
      guard.releaseReason = reason;
      if (reason === 'watchdog') {
        // Release phase-based hiding too if mounting failed before data-ready.
        document.querySelectorAll('.ph-hero:not([data-ready])').forEach(hero => {
          hero.removeAttribute('data-phase');
        });
      }
    }
  };
  html.setAttribute('data-ph-intro-pending', '');
  timer = setTimeout(() => guard.release('watchdog'), 4000);
})();
