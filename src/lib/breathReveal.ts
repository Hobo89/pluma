const SELECTOR = ".psl .psl-title, .psl .psl-page-title, .psl .psl-copy";

const EXCLUDE_ANCESTOR =
  ".ph-hero, .psl-hero, .psl-nav, nav, .psl-footer, footer, .psl-sticky-book, .psl-legal";

const COPY_DELAY = "0.15s";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shouldSkip(el: HTMLElement) {
  if (el.closest(EXCLUDE_ANCESTOR)) return true;
  return false;
}

function settle(el: HTMLElement) {
  el.classList.add("is-in", "is-settled");
  el.style.removeProperty("--psl-breath-delay");
}

/**
 * One-shot scroll breath for titles and copy: soft blur + drop → sharp.
 * Re-scans `#main` on DOM mutations (route content swaps).
 */
export function startBreathReveal(root: ParentNode = document): () => void {
  const reduced = prefersReducedMotion();

  if (!window.IntersectionObserver || reduced) {
    const nodes = root.querySelectorAll(SELECTOR);
    nodes.forEach((node) => {
      if (!(node instanceof HTMLElement) || shouldSkip(node)) return;
      node.classList.add("psl-breath");
      settle(node);
    });
    return () => {};
  }

  const pending = new WeakSet<HTMLElement>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        if (!(el instanceof HTMLElement)) continue;
        el.classList.add("is-in");
        observer.unobserve(el);

        const onEnd = (event: TransitionEvent) => {
          if (event.target !== el) return;
          if (event.propertyName !== "opacity") return;
          el.classList.add("is-settled");
          el.removeEventListener("transitionend", onEnd);
        };
        el.addEventListener("transitionend", onEnd);
      }
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  const scan = () => {
    root.querySelectorAll(SELECTOR).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (shouldSkip(node)) return;
      if (node.classList.contains("is-in")) return;

      if (!node.classList.contains("psl-breath")) {
        if (node.classList.contains("psl-copy")) {
          node.style.setProperty("--psl-breath-delay", COPY_DELAY);
        }
        node.classList.add("psl-breath");
      }

      if (!pending.has(node)) {
        pending.add(node);
        observer.observe(node);
      }
    });
  };

  scan();

  const main = document.getElementById("main");
  let mo: MutationObserver | undefined;
  let scanQueued = false;

  if (main) {
    mo = new MutationObserver(() => {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(() => {
        scanQueued = false;
        scan();
      });
    });
    mo.observe(main, { childList: true, subtree: true });
  }

  return () => {
    observer.disconnect();
    mo?.disconnect();
  };
}
