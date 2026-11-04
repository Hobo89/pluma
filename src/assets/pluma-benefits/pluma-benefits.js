/** Pluma benefit illustrations. Native SVG + Web Animations; no dependencies. */
const EASING = 'cubic-bezier(0.42, 0, 0.58, 1)';
const mounted = new WeakMap();
let labelSequence = 0;

function positive(value, fallback = 1) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function ratio(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 && number <= 1 ? number : fallback;
}

function milliseconds(element, attribute, fallback = 0) {
  const raw = element.getAttribute(attribute);
  if (raw === null || raw.trim() === '') return fallback;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function scopeLocalReferences(svg) {
  const ids = new Map();
  const prefix = `pluma-benefit-${++labelSequence}-`;
  const nodes = [svg, ...svg.querySelectorAll('*')];
  for (const node of nodes) {
    const oldId = node.getAttribute('id');
    if (oldId) {
      const id = prefix + oldId;
      ids.set(oldId, id);
      node.setAttribute('id', id);
    }
  }
  const idLists = new Set([
    'aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns',
    'aria-flowto', 'aria-activedescendant', 'aria-details', 'aria-errormessage',
  ]);
  for (const node of nodes) {
    for (const attribute of [...node.attributes]) {
      const { name, value, namespaceURI } = attribute;
      let scoped = value;
      if (idLists.has(name)) {
        scoped = value.split(/\s+/).map((id) => ids.get(id) || id).join(' ');
      } else if (name === 'data-reveal-mask') {
        scoped = ids.get(value) || value;
      } else if ((name === 'href' || name === 'xlink:href') && value.startsWith('#')) {
        scoped = '#' + (ids.get(value.slice(1)) || value.slice(1));
      } else if (name !== 'id') {
        // Includes presentation attributes and inline style references.
        scoped = value.replace(/url\(\s*(['"]?)#([^\s)'";]+)\1\s*\)/g,
          (match, quote, id) => ids.has(id) ? `url(#${ids.get(id)})` : match);
      }
      if (scoped !== value) {
        if (namespaceURI) node.setAttributeNS(namespaceURI, name, scoped);
        else node.setAttribute(name, scoped);
      }
    }
  }
}

function poseSamples(path, attribute) {
  const samples = JSON.parse(path.getAttribute(attribute) || 'null');
  if (!Array.isArray(samples) || samples.length < 3 || samples.some((point) => (
    !Array.isArray(point) || point.length !== 3 || point.some((value) => !Number.isFinite(value)) || point[2] < 0
  ))) throw new Error('Invalid illustration pose samples.');
  return samples;
}

function pointTangent(points, index) {
  const last = points.length - 1;
  if (index === 0) return [
    (-3 * points[0][0] + 4 * points[1][0] - points[2][0]) / 2,
    (-3 * points[0][1] + 4 * points[1][1] - points[2][1]) / 2,
  ];
  if (index === last) return [
    (3 * points[last][0] - 4 * points[last - 1][0] + points[last - 2][0]) / 2,
    (3 * points[last][1] - 4 * points[last - 1][1] + points[last - 2][1]) / 2,
  ];
  return [(points[index + 1][0] - points[index - 1][0]) / 2,
    (points[index + 1][1] - points[index - 1][1]) / 2];
}

/** A smooth brush outline around corresponding centerline/width samples. */
function poseOutline(from, to, progress, capStart, capEnd) {
  const centers = from.map((point, index) => point.map((value, axis) => (
    value + (to[index][axis] - value) * progress
  )));
  const tangents = centers.map((point, index) => {
    const tangent = pointTangent(centers, index);
    const length = Math.hypot(...tangent);
    if (length < 0.00001) throw new Error('Degenerate illustration pose centerline.');
    return tangent.map((value) => value / length);
  });
  const normals = tangents.map(([x, y]) => [-y, x]);
  const left = centers.map(([x, y, width], index) => [
    x + normals[index][0] * width / 2, y + normals[index][1] * width / 2,
  ]);
  const right = centers.map(([x, y, width], index) => [
    x - normals[index][0] * width / 2, y - normals[index][1] * width / 2,
  ]);
  const number = (value) => String(Math.round(value * 1000) / 1000);
  const point = (values) => values.map(number).join(' ');
  const pieces = [`M${point(left[0])}`];
  const curve = (p1, p2, p3) => pieces.push(`C${point(p1)} ${point(p2)} ${point(p3)}`);
  const edge = (points) => {
    for (let index = 0; index < points.length - 1; index++) {
      const start = points[index], end = points[index + 1];
      const a = pointTangent(points, index), b = pointTangent(points, index + 1);
      curve(start.map((value, axis) => value + a[axis] / 3),
        end.map((value, axis) => value - b[axis] / 3), end);
    }
  };
  const cap = (index, outward, start, end, style) => {
    if (style === 'butt') {
      pieces.push(`L${point(end)}`);
      return;
    }
    const center = centers[index], radius = center[2] / 2;
    const tangent = tangents[index].map((value) => value * outward);
    const middle = center.slice(0, 2).map((value, axis) => value + tangent[axis] * radius);
    const normal = start.map((value, axis) => radius > 0 ? (value - center[axis]) / radius : 0);
    const k = 0.5522847498;
    curve(start.map((value, axis) => value + tangent[axis] * radius * k),
      middle.map((value, axis) => value + normal[axis] * radius * k), middle);
    curve(middle.map((value, axis) => value - normal[axis] * radius * k),
      end.map((value, axis) => value + tangent[axis] * radius * k), end);
  };
  edge(left);
  cap(centers.length - 1, 1, left.at(-1), right.at(-1), capEnd);
  edge([...right].reverse());
  cap(0, -1, right[0], left[0], capStart);
  pieces.push('Z');
  return pieces.join(' ');
}

/**
 * Controls one inline svg[data-pluma-benefit]. The unenhanced SVG is the final frame.
 * Options: lineDurationScale, accentDurationScale, delayScale (positive numbers),
 * threshold (portion of the SVG that must be inside the viewport, default 0.25).
 */
export class PlumaBenefitIllustration {
  constructor(svg, options = {}) {
    if (!svg || svg.localName !== 'svg' || !svg.hasAttribute('data-pluma-benefit')) {
      throw new TypeError('Pass an inline svg[data-pluma-benefit] element.');
    }
    this.svg = svg;
    this.state = 'new';
    this.options = {
      lineDurationScale: positive(options.lineDurationScale),
      accentDurationScale: positive(options.accentDurationScale),
      delayScale: positive(options.delayScale),
      threshold: ratio(options.threshold, 0.25),
    };
    this.startDelay = milliseconds(svg, 'data-start-delay');
    this.animations = [];
    this.run = 0;
    this.observer = null;
    this.resizeObserver = null;
    this.lineAnimations = new Map();
    this.lineDashes = new Map();
    this.poseClock = null;
    this.poseFrame = null;
    this.poseProgress = null;
    this.poseData = [];
    this.onResize = () => {
      if (this.state !== 'waiting' && this.state !== 'playing') return;
      try { this.refreshGeometry(); } catch { this.finish(); }
    };
    this.completion = Promise.resolve(this);
    this.motion = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
    this.onMotionChange = (event) => { if (event.matches) this.finish(); };
    this.motion?.addEventListener?.('change', this.onMotionChange);
    // Each inline instance owns its masks as well as its accessible labels.
    scopeLocalReferences(svg);
    this.lines = [...svg.querySelectorAll('path[data-draw]')];
    this.brushes = [...svg.querySelectorAll('[data-brush][data-reveal-mask]')];
    this.maskIds = new Set([...svg.querySelectorAll('mask[id]')].map((mask) => mask.id));
    this.accents = [...svg.querySelectorAll('[data-accent]')];
    this.initialGroups = [...svg.querySelectorAll('[data-initial]')];
    this.poseGroups = [...svg.querySelectorAll('[data-pose-carriers]')];
    this.posePaths = [...svg.querySelectorAll('[data-pose-from], [data-pose-to]')];
    this.poseStatic = [...svg.querySelectorAll('[data-pose-static]')];
    this.snapshots = [...new Set([...this.lines, ...this.brushes, ...this.accents, ...this.initialGroups,
      ...this.poseGroups, ...this.posePaths, ...this.poseStatic])].map((element) => ({
      element,
      style: element.getAttribute('style'),
      pathLength: element.getAttribute('pathLength'),
      mask: element.getAttribute('mask'),
      d: element.getAttribute('d'),
    }));
    this.duration = this.timelineDuration();
    this.supported = typeof svg.animate === 'function' && typeof IntersectionObserver === 'function'
      && (!this.posePaths.length || (typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function'));
    if (!this.supported || this.motion?.matches) {
      this.finish();
      return;
    }
    try {
      this.prepare();
      const threshold = this.options.threshold;
      this.observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.target === svg && entry.isIntersecting && entry.intersectionRatio >= threshold)) {
          this.play();
        }
      }, { threshold });
      this.observer.observe(svg);
    } catch {
      this.finish();
    }
  }

  timing(element, accent = false, fade = false) {
    const delay = (this.startDelay + milliseconds(element, fade ? 'data-fade-delay' : 'data-delay')) * this.options.delayScale;
    const duration = milliseconds(element, fade ? 'data-fade-duration' : 'data-duration', 650)
      * (accent ? this.options.accentDurationScale : this.options.lineDurationScale);
    return { delay, duration, easing: EASING, fill: 'both', iterations: 1 };
  }

  poseTiming() {
    return {
      delay: (this.startDelay + milliseconds(this.svg, 'data-pose-delay', 650)) * this.options.delayScale,
      duration: milliseconds(this.svg, 'data-pose-duration', 800) * this.options.lineDurationScale,
      easing: EASING, fill: 'both', iterations: 1,
    };
  }

  timelineDuration() {
    const ends = [0];
    for (const element of this.lines) {
      const { delay, duration } = this.timing(element);
      ends.push(delay + duration);
    }
    for (const element of this.accents) {
      const { delay, duration } = this.timing(element, true);
      ends.push(delay + duration);
    }
    for (const element of this.initialGroups) {
      const { delay, duration } = this.timing(element, false, true);
      ends.push(delay + duration);
    }
    if (this.posePaths.length) {
      const { delay, duration } = this.poseTiming();
      ends.push(delay + duration);
    }
    return Math.max(...ends);
  }

  prepare() {
    this.restore();
    this.poseProgress = null;
    this.poseData = this.posePaths.map((path) => {
      const from = poseSamples(path, 'data-pose-from');
      const to = poseSamples(path, 'data-pose-to');
      const end = path.getAttribute('data-pose-end');
      if (from.length !== to.length || !end || !/^\s*M/.test(end) || !/Z\s*$/i.test(end)) {
        throw new Error('Invalid illustration pose correspondence.');
      }
      return { path, from, to, end, start: path.getAttribute('d'),
        capStart: path.getAttribute('data-pose-cap-start') || 'round',
        capEnd: path.getAttribute('data-pose-cap-end') || 'round' };
    });
    if (((this.poseGroups.length || this.poseStatic.length) && !this.posePaths.length)
      || (this.posePaths.length && (!this.poseGroups.length || !this.poseStatic.length))) {
      throw new Error('Missing illustration pose layers.');
    }
    // A mask is attached only while playing. The authored filled shape remains
    // unmasked in the static, reduced-motion, failed, and completed states.
    for (const brush of this.brushes) {
      const id = brush.getAttribute('data-reveal-mask');
      if (!this.maskIds.has(id)) throw new Error('Missing illustration reveal mask.');
      brush.setAttribute('mask', `url(#${id})`);
    }
    for (const path of this.lines) {
      path.setAttribute('pathLength', '1');
    }
    for (const accent of this.accents) accent.style.opacity = '0';
    for (const group of this.initialGroups) group.style.opacity = '1';
    for (const group of this.poseGroups) group.style.opacity = '1';
    for (const path of this.poseStatic) path.style.visibility = 'hidden';
    this.state = 'waiting';
    this.refreshGeometry();
    if (typeof ResizeObserver === 'function') {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.svg);
    } else {
      globalThis.addEventListener?.('resize', this.onResize);
    }
  }

  /**
   * Stroke masks scale with their fixed artwork. Padding hides their round caps
   * completely before drawing starts. Legacy non-scaling strokes remain safe.
   */
  refreshGeometry() {
    for (const path of this.lines) {
      const length = path.getTotalLength();
      const matrix = path.getScreenCTM();
      const computed = typeof getComputedStyle === 'function' ? getComputedStyle(path) : null;
      const nonScaling = (computed?.vectorEffect || path.getAttribute('vector-effect')) === 'non-scaling-stroke';
      const strokeWidth = Number.parseFloat(computed?.strokeWidth || path.getAttribute('stroke-width')) || 1.5;
      let scale = 1;
      if (nonScaling && matrix) {
        // Largest singular value also safely covers an anisotropic transform.
        const aa = matrix.a * matrix.a + matrix.b * matrix.b;
        const bb = matrix.c * matrix.c + matrix.d * matrix.d;
        const ab = matrix.a * matrix.c + matrix.b * matrix.d;
        scale = Math.sqrt((aa + bb + Math.sqrt((aa - bb) ** 2 + 4 * ab * ab)) / 2) || 1;
      }
      const isMask = path.closest('mask') !== null;
      const padding = isMask ? strokeWidth / 2 + 0.5 : 2 * strokeWidth;
      const dash = (nonScaling ? scale : 1) + padding / Math.max(length, 0.001);
      this.lineDashes.set(path, dash);
      path.style.strokeDasharray = `${dash} ${dash}`;
      path.style.strokeDashoffset = String(dash);
      // Updating keyframes does not change the animation's currentTime.
      this.lineAnimations.get(path)?.effect?.setKeyframes([
        { strokeDashoffset: String(dash) }, { strokeDashoffset: '0' },
      ]);
    }
  }

  restore() {
    for (const { element, style, pathLength, mask, d } of this.snapshots) {
      if (style === null) element.removeAttribute('style');
      else element.setAttribute('style', style);
      if (pathLength === null) element.removeAttribute('pathLength');
      else element.setAttribute('pathLength', pathLength);
      if (mask === null) element.removeAttribute('mask');
      else element.setAttribute('mask', mask);
      if (d === null) element.removeAttribute('d');
      else element.setAttribute('d', d);
    }
  }

  /** Samples the shared pose clock; also useful for deterministic review. */
  samplePose() {
    if (!this.poseClock || !this.poseData.length) return 1;
    const progress = Math.min(1, Math.max(0, this.poseClock.effect.getComputedTiming().progress ?? 0));
    if (progress === this.poseProgress) return progress;
    for (const { path, from, to, start, end, capStart, capEnd } of this.poseData) {
      if (progress <= 0) {
        path.setAttribute('d', start);
        path.setAttribute('mask', `url(#${path.getAttribute('data-reveal-mask')})`);
      } else {
        // The compact drawing is already complete. Its same visible carrier now
        // opens continuously, so a fixed compact mask must no longer clip it.
        path.removeAttribute('mask');
        path.setAttribute('d', progress >= 1 ? end : poseOutline(from, to, progress, capStart, capEnd));
      }
    }
    this.poseProgress = progress;
    return progress;
  }

  startPoseSampling() {
    const tick = () => {
      this.poseFrame = null;
      if (this.state !== 'playing' || !this.poseClock) return;
      try {
        if (this.samplePose() < 1) this.poseFrame = requestAnimationFrame(tick);
      } catch { this.finish(); }
    };
    this.samplePose();
    this.poseFrame = requestAnimationFrame(tick);
  }

  /** Plays once. Further calls do nothing; use replay() for an explicit review. */
  play() {
    if (this.state === 'destroyed' || this.state === 'finished' || this.state === 'playing') return this.completion;
    this.observer?.disconnect();
    this.observer = null;
    if (!this.supported || this.motion?.matches) {
      this.finish();
      return this.completion;
    }
    const currentRun = ++this.run;
    try {
      this.refreshGeometry();
      this.state = 'playing';
      const epoch = this.svg.ownerDocument.timeline?.currentTime;
      const animate = (element, frames, timing) => {
        const animation = element.animate(frames, timing);
        this.animations.push(animation);
        if (epoch !== null && epoch !== undefined) animation.startTime = epoch;
        return animation;
      };
      for (const path of this.lines) {
        const dash = String(this.lineDashes.get(path));
        this.lineAnimations.set(path, animate(path, [{ strokeDashoffset: dash }, { strokeDashoffset: '0' }], this.timing(path)));
      }
      for (const accent of this.accents) {
        animate(accent, [{ opacity: 0 }, { opacity: 0.36 }], this.timing(accent, true));
      }
      for (const group of this.initialGroups) {
        animate(group, [{ opacity: 1 }, { opacity: 0 }], this.timing(group, false, true));
      }
      if (this.poseData.length) {
        this.poseClock = animate(this.svg, [{}, {}], this.poseTiming());
        this.startPoseSampling();
      }
      this.svg.dispatchEvent(new CustomEvent('pluma:start', { bubbles: true }));
      this.completion = Promise.all(this.animations.map((animation) => animation.finished)).then(() => {
        if (currentRun === this.run) this.finish();
        return this;
      }, () => {
        if (currentRun === this.run) this.finish();
        return this;
      });
    } catch {
      this.finish();
    }
    return this.completion;
  }

  /** Explicit review control. Reduced-motion users always receive the final frame. */
  replay() {
    if (this.state === 'destroyed') return Promise.resolve(this);
    this.finish();
    if (!this.supported || this.motion?.matches) return Promise.resolve(this);
    try {
      this.prepare();
      return this.play();
    } catch {
      this.finish();
      return Promise.resolve(this);
    }
  }

  /** Restores the authored final frame and removes every active animation. */
  finish() {
    if (this.state === 'destroyed') return this;
    const previousState = this.state;
    ++this.run;
    this.observer?.disconnect();
    this.observer = null;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    globalThis.removeEventListener?.('resize', this.onResize);
    if (this.poseFrame !== null) cancelAnimationFrame(this.poseFrame);
    this.poseFrame = null;
    this.poseClock = null;
    this.poseProgress = null;
    for (const animation of this.animations) {
      // Consume cancellation rejections even if enhancement failed partway through.
      animation.finished.catch(() => {});
      animation.cancel();
    }
    this.animations = [];
    this.lineAnimations.clear();
    this.lineDashes.clear();
    this.restore();
    this.state = 'finished';
    if (previousState !== 'finished') this.svg.dispatchEvent(new CustomEvent('pluma:complete', { bubbles: true }));
    return this;
  }

  /** Removes listeners and leaves the complete, accessible final illustration. */
  destroy() {
    if (this.state === 'destroyed') return;
    this.finish();
    this.motion?.removeEventListener?.('change', this.onMotionChange);
    mounted.delete(this.svg);
    this.state = 'destroyed';
  }
}

/** Mounts every inline benefit SVG inside root (including root itself). */
export function mountPlumaBenefits(root = document, options = {}) {
  const selector = 'svg[data-pluma-benefit]';
  const svgs = [...root.querySelectorAll(selector)];
  if (root.matches?.(selector)) svgs.unshift(root);
  return svgs.map((svg) => {
    if (!mounted.has(svg)) mounted.set(svg, new PlumaBenefitIllustration(svg, options));
    return mounted.get(svg);
  });
}
