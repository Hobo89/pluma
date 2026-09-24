# Suggested controller changes

These exact replacements match the public bundle fetched on 24 September 2026. Port them to the original source and rebuild; do not deploy a renamed production bundle. Minified identifiers are included so every change is traceable.

## First-frame readiness: do not treat loadeddata as a presented frame; always settle stale waits

Replace:
```js
function Vb(l,o,c){return new Promise(r=>{let f=!1;const m=T=>{f||!c(o)||(f=!0,y(),r(T))};let p=0;const v=()=>{l.readyState>=2&&m(!0)},g=()=>m(!1);function y(){l.removeEventListener("playing",v),l.removeEventListener("loadeddata",v),l.removeEventListener("error",g),p&&typeof l.cancelVideoFrameCallback=="function"&&l.cancelVideoFrameCallback(p)}typeof l.requestVideoFrameCallback=="function"&&(p=l.requestVideoFrameCallback(()=>m(!0))),l.addEventListener("playing",v),l.addEventListener("loadeddata",v),l.addEventListener("error",g),l.readyState>=2&&!l.paused&&m(!0),window.setTimeout(()=>m(!1),1600)})}
```

With:
```js
function Vb(video, token, isCurrent) {
  return new Promise(resolve => {
    let settled = false, frame = 0, timer;
    const hasFrameCallback = typeof video.requestVideoFrameCallback === "function";
    function finish(ok) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (frame && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frame);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      resolve(Boolean(ok && isCurrent(token)));
    }
    function onPlaying() {
      if (!hasFrameCallback && video.readyState >= 2 && !video.paused) finish(true);
    }
    function onError() { finish(false); }
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    timer = setTimeout(() => finish(false), 1500);
    if (hasFrameCallback) frame = video.requestVideoFrameCallback(() => finish(true));
    else onPlaying();
  });
}
```

## Do not let visibility/resize observers interrupt preparation playback

Replace:
```js
function Ve(){const z=++et;
```

With:
```js
function Ve(){if(G==="preparing")return;const z=++et;
```

## Use the readiness promise registered before playback

Replace:
```js
const Xi=await Vb(f,z,Lt=>!Q&&Lt===Ye);
```

With:
```js
const Xi=await firstFrame;
```

## Start readiness and asset decoding concurrently; decode the chosen responsive photo

Replace:
```js
_e&&(Se=!0,f.src=Ft(H.matches?_e.mobile:_e.desktop),f.play()?.catch(()=>{}));const _o=await Promise.all([Qr(Ft(c.assets.massageMedium||c.assets.massage)),
```

With:
```js
const firstFrame=_e?Vb(f,z,Lt=>!Q&&Lt===Ye):Promise.resolve(false);
_e&&(Se=!0,f.preload="auto",f.defaultMuted=!0,f.muted=!0,f.playsInline=!0,f.src=Ft(H.matches?_e.mobile:_e.desktop),f.play()?.catch(()=>{}));const _o=await Promise.all([Qr(r(".ph-massage-photo").currentSrc||r(".ph-massage-photo").src),
```

## Only manually seek reveal animations in the editing/scrubbing mode

Replace:
```js
J.forEach(ne=>{ne.currentTime=se}),rn(
```

With:
```js
ae&&J.forEach(ne=>{ne.currentTime=se}),rn(
```

## Play ordinary reveals natively while retaining the existing SVG timeline and editor

Replace:
```js
De=performance.now();const Ce=se;
```

With:
```js
De=performance.now();
if(!ae)for(const animation of J){animation.currentTime=se;animation.playbackRate=E;animation.play();}
const Ce=se;
```

## Avoid resetting the same clip-path every frame

Replace:
```js
m.style.clipPath=`url("#${V}-clip")`;const Ce=
```

With:
```js
const clip=`url("#${V}-clip")`;if(m.style.clipPath!==clip)m.style.clipPath=clip;const Ce=
```

## Do not rewrite an unchanged photo edge during the contraction

Replace:
```js
X.setAttribute("d",`M.044 0 H.11 C.26 0 .355 ${ne} .5 ${ne} S.74 0 .89 0 H.956 Q1 0 1 .0785714 V.9214286 Q1 1 .956 1 H.044 Q0 1 0 .9214286 V.0785714 Q0 0 .044 0Z`)
```

With:
```js
const path=`M.044 0 H.11 C.26 0 .355 ${ne} .5 ${ne} S.74 0 .89 0 H.956 Q1 0 1 .0785714 V.9214286 Q1 1 .956 1 H.044 Q0 1 0 .9214286 V.0785714 Q0 0 .044 0Z`;if(X.getAttribute("d")!==path)X.setAttribute("d",path)
```

## Remove the clip-path promotion hint; it does not make SVG clipping compositor-only

Replace:
```js
const ne=z?"transform, opacity, clip-path":"";
```

With:
```js
const ne=z?"transform, opacity":"";
```

