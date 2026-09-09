/**
 * One shared observer per mounted collection. No scroll listeners or frame
 * loops. Call after the inline SVG markup exists; call the returned cleanup on
 * unmount. The stylesheet must be loaded before this initializer runs.
 */

type InitOptions = { threshold?: number };
type Dispose = () => void;

const finished = new WeakSet<SVGSVGElement>();
const owners = new WeakMap<SVGSVGElement, object>();

const SELECTOR = "svg[data-pluma-illustration]";

export function initPlumaIllustrations(
  root: Element | null,
  { threshold = 0.3 }: InitOptions = {},
): Dispose {
  if (!root || typeof window === "undefined") return () => {};

  const nodes: SVGSVGElement[] = [
    ...(root.matches?.(SELECTOR) ? [root as SVGSVGElement] : []),
    ...Array.from(root.querySelectorAll<SVGSVGElement>(SELECTOR)),
  ].filter((node) => !finished.has(node) && !owners.has(node));

  if (!nodes.length) return () => {};

  const motion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

  // No observer, no media-query support, or motion is unwelcome: every drawing
  // stays complete and static.
  if (!window.IntersectionObserver || !motion || motion.matches) {
    nodes.forEach((node) => {
      node.removeAttribute("data-pluma-state");
      finished.add(node);
    });
    return () => {};
  }

  const token = {};
  const timers = new Map<SVGSVGElement, number>();
  const groups = new Map<Element, SVGSVGElement[]>();
  const targets = new Map<SVGSVGElement, Element>();
  const seen = new WeakSet<SVGSVGElement>();
  let observer: IntersectionObserver | undefined;
  let disposed = false;

  const triggerThreshold = Math.max(
    0.01,
    Math.min(1, Number(threshold) || 0.3),
  );

  function finish(node: SVGSVGElement) {
    const timer = timers.get(node);
    if (timer !== undefined) window.clearTimeout(timer);
    timers.delete(node);
    node.removeAttribute("data-pluma-state");
    finished.add(node);

    const target = targets.get(node);
    if (target && groups.get(target)?.every((item) => finished.has(item))) {
      observer?.unobserve(target);
    }
  }

  function play(node: SVGSVGElement) {
    if (finished.has(node) || node.dataset.plumaState === "playing") return;
    node.dataset.plumaState = "playing";

    // CSS runs the animation. This single timer also restores the static state
    // if animationend is absent, the tab is backgrounded or CSS is overridden.
    const total = Math.max(
      0,
      Math.min(10000, Number(node.dataset.plumaTotal) || 1900),
    );
    timers.set(
      node,
      window.setTimeout(() => finish(node), total + 80),
    );
  }

  function onMotionChange(event: MediaQueryListEvent) {
    if (event.matches) nodes.forEach(finish);
  }

  function cleanup() {
    if (disposed) return;
    disposed = true;
    observer?.disconnect();

    if (motion.removeEventListener) {
      motion.removeEventListener("change", onMotionChange);
    } else {
      motion.removeListener?.(onMotionChange);
    }

    nodes.forEach((node) => {
      const timer = timers.get(node);
      if (timer !== undefined) window.clearTimeout(timer);
      // An interrupted playing illustration settles; an armed one may be
      // initialized again (including React development Strict Mode).
      if (node.dataset.plumaState === "playing") finished.add(node);
      node.removeAttribute("data-pluma-state");
      if (owners.get(node) === token) owners.delete(node);
    });
    timers.clear();
  }

  try {
    observer = new IntersectionObserver(
      (entries) => {
        if (disposed) return;
        for (const entry of entries) {
          for (const node of groups.get(entry.target) ?? []) {
            if (finished.has(node)) continue;

            if (!seen.has(node)) {
              seen.add(node);
              const viewportBottom = entry.rootBounds?.bottom ?? window.innerHeight;
              // Already visible or already passed at initialization: leave it
              // static. This avoids an SSR or delayed-JS visible→hidden flicker.
              if (
                entry.isIntersecting ||
                entry.boundingClientRect.top < viewportBottom
              ) {
                finish(node);
                continue;
              }
              node.dataset.plumaState = "armed";
            }

            if (
              entry.isIntersecting &&
              entry.intersectionRatio >= triggerThreshold
            ) {
              play(node);
            }
          }
        }
      },
      { threshold: [0, triggerThreshold] },
    );

    for (const node of nodes) {
      owners.set(node, token);
      // Observe the illustration by default, so a tall text-heavy card cannot
      // make the reveal threshold unreachable. Optional dedicated card marker.
      const target = node.closest("[data-pluma-trigger]") ?? node;
      targets.set(node, target);
      if (!groups.has(target)) groups.set(target, []);
      groups.get(target)?.push(node);
    }

    for (const target of groups.keys()) observer.observe(target);

    if (motion.addEventListener) {
      motion.addEventListener("change", onMotionChange);
    } else {
      motion.addListener?.(onMotionChange);
    }
  } catch {
    cleanup(); // Failed enhancement leaves every SVG visible.
  }

  return cleanup;
}
