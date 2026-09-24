/* Unused by the application entry: the first-paint guard is now inlined in
   index.html so it cannot race the module bundle. Kept for cached HTML and
   older deploys that still request this URL. */
(() => {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  if (path !== "/" && path !== "/index.html") return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (navigator.connection?.saveData) return;
  if (window.__plumaHeroBoot) return;

  const html = document.documentElement;
  let timeout;
  const guard = {
    status: "pending",
    release(reason = "controller") {
      if (guard.status === "released") return;
      clearTimeout(timeout);
      html.removeAttribute("data-ph-intro-pending");
      guard.status = "released";
      guard.releaseReason = reason;
      if (reason === "watchdog") {
        document.querySelectorAll(".ph-hero:not([data-ready])").forEach((hero) => {
          hero.removeAttribute("data-phase");
        });
      }
    },
  };

  window.__plumaHeroBoot = guard;
  html.setAttribute("data-ph-intro-pending", "");
  timeout = setTimeout(() => guard.release("watchdog"), 4000);
})();
