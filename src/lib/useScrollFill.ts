import { useEffect, useRef } from "react";

type FillConfig = {
  property: string;
  start: number;
  end: number;
};

const defaultConfig: FillConfig = {
  property: "--psl-brand-fill",
  start: 0.9,
  end: 0.38,
};

const fills = new Map<HTMLElement, FillConfig>();
let listening = false;
let ticking = false;
let motion: MediaQueryList | undefined;

function applyFill(node: HTMLElement) {
  const config = fills.get(node);
  if (!config) return;

  if (motion?.matches) {
    node.style.setProperty(config.property, "1");
    return;
  }

  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || 1;

  if (rect.bottom < 0) {
    node.style.setProperty(config.property, "1");
    return;
  }

  if (rect.top > vh) {
    node.style.setProperty(config.property, "0");
    return;
  }

  const start = vh * config.start;
  const end = vh * config.end;
  const fill = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
  node.style.setProperty(config.property, fill.toFixed(3));
}

function update() {
  ticking = false;
  fills.forEach((_, node) => applyFill(node));
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}

function ensureListening() {
  if (listening) return;
  listening = true;
  motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  motion.addEventListener("change", onScroll);
}

function stopIfEmpty() {
  if (fills.size) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  motion?.removeEventListener("change", onScroll);
}

/**
 * Scroll-linked 0–1 fill. Scrolling the node up the viewport fills it;
 * scrolling it back down reverses the fill. Offscreen nodes freeze at 0 or 1.
 */
export function useScrollFill<T extends HTMLElement>(
  config: Partial<FillConfig> = {},
) {
  const ref = useRef<T>(null);
  const property = config.property ?? defaultConfig.property;
  const start = config.start ?? defaultConfig.start;
  const end = config.end ?? defaultConfig.end;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    fills.set(node, { property, start, end });
    ensureListening();
    applyFill(node);

    return () => {
      fills.delete(node);
      node.style.removeProperty(property);
      stopIfEmpty();
    };
  }, [end, property, start]);

  return ref;
}
