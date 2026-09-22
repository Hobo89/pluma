/* Homepage script-failure watchdog. Hides decorative layers until the hero
   controller releases them. Does not skip the intro on interaction or timers. */
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (navigator.connection?.saveData) return;

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
    },
  };

  window.__plumaHeroBoot = guard;
  html.setAttribute("data-ph-intro-pending", "");

  // Fail open if the module bundle never mounts the controller.
  timeout = setTimeout(() => guard.release("watchdog"), 8000);
})();
