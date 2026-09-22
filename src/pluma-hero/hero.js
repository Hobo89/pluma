import { FEATHER_PATH } from './feather-path.js';

export const translations = {
  en: { eyebrow: 'home massage studio', about: 'about', prices: 'prices', vouchers: 'vouchers', book: 'Book massage', menu: 'Menu', close: 'Close menu', navigation: 'Main navigation', home: 'Pluma home', pause: 'Pause motion', play: 'Play motion', photoAlt: 'A client receiving a gentle head and neck massage at Pluma', language: 'Language' },
  es: { eyebrow: 'estudio de masaje en casa', about: 'sobre pluma', prices: 'precios', vouchers: 'bonos regalo', book: 'Reservar masaje', menu: 'Menú', close: 'Cerrar menú', navigation: 'Navegación principal', home: 'Inicio de Pluma', pause: 'Pausar vídeo', play: 'Reproducir vídeo', photoAlt: 'Una clienta recibe un suave masaje de cabeza y cuello en Pluma', language: 'Idioma' },
};
export const defaults = {
  assetBase: './assets/', language: 'en', timing: { hold: 300, contract: 2500, reveal: 700, brandOffset: 250, edgeOffset: 0 },
  videos: ['sky', 'trees', 'fabric', 'water'].map(id => ({ id, desktop: `hero-${id}-desktop.mp4`, mobile: `hero-${id}-mobile.mp4`, poster: `hero-${id}-desktop-poster.jpg`, mobilePoster: `hero-${id}-mobile-poster.jpg` })),
  assets: { wordmark: 'wordmark.svg', logo: 'logo-ink.svg', feather: 'feather.svg', navFeather: 'feather-nav.svg', menuIcon: 'menu-01.svg', photoMask: 'massage-mask.svg', massage: 'massage-1920.webp', massageMedium: 'massage-1280.webp', massageSmall: 'massage-640.webp' },
  links: { home: '#', about: '#about', prices: '#prices', vouchers: '#vouchers', booking: '#booking' },
};
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const configFor = options => ({ ...defaults, ...options, timing: { ...defaults.timing, ...options.timing }, assets: { ...defaults.assets, ...options.assets }, links: { ...defaults.links, ...options.links } });
const copyFor = (config, language) => ({ ...translations[language], ...config.labels?.[language] });
// Resolve URLs against assetBase without requiring browser globals during SSR.
const assetURL = (base, file) => /^(?:[a-z]+:|\/)/i.test(file) ? file : base.replace(/\/?$/, '/') + file;
const cssURL = url => `url("${String(url).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\n\r\f]/g, '')}")`;
let sequence = 0;

/** Initial markup is usable without JS. Options are trusted site configuration. */
export function heroMarkup(options = {}) {
  const c = configFor(options), t = copyFor(c, c.language);
  const a = key => escape(assetURL(c.assetBase, c.assets[key]));
  const text = key => escape(t[key]);
  const link = key => escape(c.links[key]);
  const poster = assetURL(c.assetBase, c.videos[0]?.poster || 'hero-sky-desktop-poster.jpg');
  const logo = `<img src="${a('logo')}" width="1272" height="485" alt="Pluma">`;
  return `<section class="ph-hero" aria-label="Pluma" lang="${escape(c.language)}" style="--ph-poster:${escape(cssURL(poster))};--ph-feather:${escape(cssURL(assetURL(c.assetBase,c.assets.feather)))};--ph-photo-mask:${escape(cssURL(assetURL(c.assetBase,c.assets.photoMask)))}">
  <div class="ph-media" aria-hidden="true"><video class="ph-video" muted playsinline loop preload="none" poster="${escape(poster)}" tabindex="-1"></video></div>
  <svg class="ph-definitions" width="0" height="0" aria-hidden="true"><defs><clipPath class="ph-clip" clipPathUnits="userSpaceOnUse"><path d="${FEATHER_PATH}"></path></clipPath></defs></svg>
  <div class="ph-composition">
    <div class="ph-brand"><p class="ph-eyebrow" data-ph-label="eyebrow">${text('eyebrow')}</p><h1><img src="${a('wordmark')}" alt="Pluma" width="1015" height="350"></h1></div>
    <div class="ph-feather-slot" aria-hidden="true"></div>
    <figure class="ph-massage"><img class="ph-massage-photo" src="${a('massage')}" srcset="${a('massageSmall')} 640w, ${a('massageMedium')} 1280w, ${a('massage')} 1920w" sizes="(max-width: 699px) 92vw, 72vw" width="2176" height="1014" alt="${text('photoAlt')}" decoding="async" fetchpriority="high"></figure>
  </div>
  ${c.renderNavigation === false ? '' : `<header class="ph-nav" data-ph-nav>
    <div class="ph-drawer" hidden><a class="ph-drawer-logo" href="${link('home')}" data-ph-aria="home" aria-label="${text('home')}"><img src="${a('navFeather')}" width="1253" height="132" alt="" aria-hidden="true"></a><button class="ph-close" type="button" data-ph-aria="close" aria-label="${text('close')}">×</button><nav data-ph-aria="navigation" aria-label="${text('navigation')}">${['about','prices','vouchers'].map(k=>`<a href="${link(k)}" data-ph-label="${k}">${text(k)}</a>`).join('')}</nav></div>
    <div class="ph-bar"><a class="ph-nav-logo" href="${link('home')}" data-ph-aria="home" aria-label="${text('home')}">${logo}</a>
    <nav class="ph-desktop-links" data-ph-aria="navigation" aria-label="${text('navigation')}">${['about','prices','vouchers'].map(k=>`<a href="${link(k)}" data-ph-label="${k}">${text(k)}</a>`).join('')}</nav>
    <div class="ph-languages" role="group" data-ph-aria="language" aria-label="${text('language')}">${['en','es'].map(l=>`<button type="button" data-ph-language="${l}" lang="${l}" aria-label="${l==='en'?'English':'Español'}" aria-pressed="${c.language===l}">${l}</button>`).join('')}</div>
    <a class="ph-book" href="${link('booking')}" data-ph-label="book">${text('book')}</a><button class="ph-menu" type="button" data-ph-aria="menu" aria-label="${text('menu')}" aria-expanded="false"><img src="${a('menuIcon')}" width="24" height="24" alt="" aria-hidden="true"></button></div>
    <nav class="ph-fallback-links" aria-label="${text('navigation')}">${['about','prices','vouchers'].map(k=>`<a href="${link(k)}">${text(k)}</a>`).join('')}</nav>
  </header>`}
</section>`;
}

export function initPlumaHero(root, options = {}) {
  if (!root?.matches('.ph-hero')) throw new Error('initPlumaHero expects a .ph-hero element');
  const c = configFor(options), find = selector => root.querySelector(selector);
  root.removeAttribute('data-media');
  const video = find('.ph-video'), media = find('.ph-media'), path = find('.ph-clip path');
  const slot = find('.ph-feather-slot'), drawer = find('.ph-drawer'), menu = find('.ph-menu');
  const nav = c.navigationElement || find('.ph-nav'), ownNav = find('.ph-nav');
  if (c.navigationElement && ownNav) ownNav.hidden = true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)'), mobile = matchMedia('(max-width: 699px)'), connection = navigator.connection;
  const id = `ph-${++sequence}`;
  find('.ph-clip').id = `${id}-clip`; media.style.clipPath = `url("#${id}-clip")`;
  const photo=find('.ph-massage');
  const photoClip=document.createElementNS('http://www.w3.org/2000/svg','clipPath');
  const photoPath=document.createElementNS('http://www.w3.org/2000/svg','path');
  photoClip.id=`${id}-photo`;photoClip.setAttribute('clipPathUnits','objectBoundingBox');photoClip.append(photoPath);find('.ph-definitions defs').append(photoClip);
  photo.style.clipPath=`url("#${id}-photo")`;
  if (drawer) { drawer.id = `${id}-drawer`; menu.setAttribute('aria-controls', drawer.id); }
  let language = c.language, destroyed = false, intro = false, mediaFailed = false, loaded = false, videoVisible = true;
  let frame = 0, token = 0, started = 0, geometry, opened = false, animations = [];
  let editing=false, currentTime=0, playbackRate=1, scrubVideoURL=null, preparingVideo=false;
  const photoStart=c.timing.hold+c.timing.contract, brandStart=photoStart+c.timing.brandOffset;
  const baseline={
    feather:{start:c.timing.hold,duration:c.timing.contract,easing:'ease-in-out'},
    photo:{start:photoStart,duration:c.timing.reveal,easing:'gentle',distance:42},
    eyebrow:{start:brandStart,duration:c.timing.reveal,easing:'gentle',distance:-24},
    wordmark:{start:brandStart,duration:c.timing.reveal,easing:'gentle',distance:-24},
    edge:{start:brandStart+c.timing.edgeOffset,duration:c.timing.reveal,easing:'smooth',depth:18/560*100},
    navigation:{start:brandStart,duration:c.timing.reveal,easing:'gentle'}
  };
  let sequences=structuredClone(baseline);
  const easingCSS={'linear':'linear','ease-in':'cubic-bezier(.33333,0,.66667,.33333)','ease-out':'cubic-bezier(.33333,.66667,.66667,1)','ease-in-out':'cubic-bezier(.65,0,.35,1)','smooth':'ease-in-out','gentle':'cubic-bezier(.22,1,.36,1)'};
  function applySequences(updates={}){
    if(!updates||typeof updates!=='object')return;
    for(const key of Object.keys(baseline)){const patch=updates[key]&&typeof updates[key]==='object'?updates[key]:{},track=sequences[key];
      for(const name of ['start','duration','distance','depth'])if(name in patch&&name in track&&Number.isFinite(Number(patch[name])))track[name]=Math.max(name==='distance'?-200:0,Math.min(name==='start'||name==='duration'?30000:name==='depth'?15:200,Number(patch[name])));
      if(patch.easing in easingCSS)track.easing=patch.easing;
    }
  }
  applySequences(c.sequences);
  const total=()=>Math.max(0,...Object.values(sequences).map(t=>t.start+t.duration));
  const progress=(time,track)=>track.duration===0?(time>=track.start?1:0):Math.max(0,Math.min(1,(time-track.start)/track.duration));
  const listeners = [];
  const listen = (el, event, fn, opts) => { el?.addEventListener?.(event, fn, opts); listeners.push(() => el?.removeEventListener?.(event,fn,opts)); };
  const staticMode = () => reduced.matches || Boolean(connection?.saveData);
  // Selection belongs to this homepage mount. Replay and resize never reselect.
  const candidates = c.videos.filter(v => v.desktop && v.mobile && v.poster);
  const selected = candidates[Math.min(candidates.length-1, Math.floor(Math.random()*candidates.length))];
  const asset = file => assetURL(c.assetBase,file);
  if (selected) { const poster = asset(mobile.matches && selected.mobilePoster ? selected.mobilePoster : selected.poster); video.poster = poster; root.style.setProperty('--ph-poster', cssURL(poster)); root.dataset.video = selected.id; }
  video.muted = true;
  function setLanguage(next, notify = true) {
    if (!translations[next]) return;
    language = next; root.lang = next;
    const t = copyFor(c,next);
    root.querySelectorAll('[data-ph-label]').forEach(el => el.textContent=t[el.dataset.phLabel]);
    root.querySelectorAll('[data-ph-aria]').forEach(el => el.setAttribute('aria-label', t[el.dataset.phAria]));
    root.querySelectorAll('[data-ph-language]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.phLanguage===next)));
    find('.ph-massage img').alt=t.photoAlt;
    if (notify) c.onLanguageChange?.(next);
  }
  function measure() {
    const r=root.getBoundingClientRect(), f=slot.getBoundingClientRect();
    geometry={width:r.width,height:Math.min(innerHeight,r.height),x:f.left-r.left+f.width/2,y:f.top-r.top+f.height/2,scale:f.width/1253};
  }
  const mix = (a,b,p) => a+(b-a)*p;
  const smooth = p => p*p*(3-2*p);
  const easeInOutCubic = p => p < .5 ? 4*p*p*p : 1-Math.pow(-2*p+2,3)/2;
  const ease=(p,name)=>name==='linear'?p:name==='ease-in'?p*p*p:name==='ease-out'?1-Math.pow(1-p,3):name==='smooth'?smooth(p):easeInOutCubic(p);
  function draw(p) {
    const g=geometry;
    if (p<=0) { media.style.clipPath='none'; return; }
    media.style.clipPath=`url("#${id}-clip")`;
    const initial=Math.max(g.width/340,g.height/24)*1.3;
    // Contract around the final anchor: no falling, drift, or rotation.
    const scale=Math.exp(mix(Math.log(initial),Math.log(g.scale),ease(p,sequences.feather.easing)));
    path.setAttribute('transform',`translate(${g.x} ${g.y}) scale(${scale}) translate(-643.5 -509)`);
  }
  function drawPhoto(progress) {
    const depth=(sequences.edge.depth/100)*ease(progress,sequences.edge.easing);
    photoPath.setAttribute('d',`M.044 0 H.11 C.26 0 .355 ${depth} .5 ${depth} S.74 0 .89 0 H.956 Q1 0 1 .0785714 V.9214286 Q1 1 .956 1 H.044 Q0 1 0 .9214286 V.0785714 Q0 0 .044 0Z`);
  }
  function cancelAnimations() { cancelAnimationFrame(frame); animations.forEach(a=>a.cancel()); animations=[]; }
  function visibility() { const r=(intro?root:slot).getBoundingClientRect(); videoVisible=r.bottom>0&&r.top<innerHeight; }
  function syncPlayback() {
    const attemptToken=++token;
    if(destroyed||staticMode()||mediaFailed||document.hidden||!videoVisible||!selected||(editing&&!intro)) { video.pause(); return; }
    if(!loaded) { video.src=asset(mobile.matches?selected.mobile:selected.desktop); loaded=true; }
    video.play()?.catch(()=> { if(!destroyed&&attemptToken===token&&!document.hidden&&!staticMode()) failMedia(); });
  }
  function finish() {
    if(destroyed)return;
    intro=false;editing=false;currentTime=total();cancelAnimations();root.dataset.phase='complete';video.playbackRate=1;
    if(nav===c.navigationElement)nav.style.opacity='';
    measure();draw(1);drawPhoto(1);visibility();syncPlayback();
  }
  function failMedia() { mediaFailed=true; root.dataset.media='fallback'; video.pause();finish(); }
  function buildAnimations() {
    cancelAnimations();
    for(const [key,el] of [['photo',find('.ph-massage-photo')],['eyebrow',find('.ph-eyebrow')],['wordmark',find('.ph-brand h1')],['navigation',nav]]){
      if(!el?.animate)continue;
      const track=sequences[key], distance=track.distance||0;
      const frames=key==='navigation'?[{opacity:0},{opacity:1}]:[{opacity:0,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}];
      const animation=el.animate(frames,{delay:track.start,duration:track.duration,fill:'both',easing:easingCSS[track.easing]});
      animation.pause();animations.push(animation);
    }
  }
  function renderAt(time) {
    currentTime=Math.max(0,Math.min(total(),time));
    animations.forEach(a=>a.currentTime=currentTime);
    draw(progress(currentTime,sequences.feather));drawPhoto(progress(currentTime,sequences.edge));
  }
  function prepareFrameVideo() {
    if(preparingVideo||scrubVideoURL||!video.src||staticMode())return;
    preparingVideo=true;
    // Editing uses a seekable local copy, including on servers without byte ranges.
    fetch(video.currentSrc||video.src,{cache:'force-cache'}).then(response=>{if(!response.ok)throw new Error('Video unavailable');return response.blob();}).then(blob=>{
      if(destroyed)return;
      scrubVideoURL=URL.createObjectURL(blob);++token;video.src=scrubVideoURL;video.load();
    }).catch(()=>{/* Keep the original URL when file-browser fetching is restricted. */});
  }
  function seekVideo() {
    video.pause();
    if(Number.isFinite(video.duration)&&video.duration>0)video.currentTime=(currentTime/1000)%video.duration;
  }
  function seek(time) {
    if(destroyed)return;
    if(!editing||!animations.length)buildAnimations();
    editing=true;intro=false;cancelAnimationFrame(frame);measure();root.dataset.phase='scrub';
    renderAt(Number.isFinite(time)?time:0);++token;prepareFrameVideo();seekVideo();
  }
  function run(from=0,rate=1) {
    buildAnimations();measure();renderAt(from);intro=true;root.dataset.phase=editing?'preview':'intro';
    playbackRate=Math.max(.1,Math.min(2,rate));video.playbackRate=playbackRate;
    if(editing){prepareFrameVideo();seekVideo();}
    started=performance.now();const origin=currentTime;
    function tick(now){
      if(destroyed||!intro)return;
      renderAt(origin+(now-started)*playbackRate);
      if(currentTime>=total()){if(editing)seek(total());else finish();}else frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);visibility();syncPlayback();
  }
  function startIntro(){
    if(destroyed)return;
    editing=false;
    if(staticMode()||mediaFailed||scrollY>4||!selected){finish();return;}
    run();
  }
  function closeMenu(restore = true) {
    if(!opened)return;opened=false;drawer.hidden=true;ownNav.dataset.open='false';menu.setAttribute('aria-expanded','false');
    if(restore)menu.focus({preventScroll:true});
  }
  function openMenu() {
    finish();opened=true;drawer.hidden=false;ownNav.dataset.open='true';menu.setAttribute('aria-expanded','true');
    if(!staticMode())drawer.animate([{opacity:0,transform:'translateY(18px) scaleY(.94)'},{opacity:1,transform:'none'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});
    find('.ph-drawer nav a').focus({preventScroll:true});
  }
  setLanguage(language,false);measure();root.dataset.ready='true';draw(1);drawPhoto(1);
  const boot=window.__plumaHeroBoot, skipped=boot?.status==='skipped'; boot?.release();
  if(!staticMode()&&!skipped)startIntro();else finish();
  listen(menu,'click',()=>{if(!opened)openMenu();});
  listen(document,'pointerdown',e=>{if(intro&&!editing&&!e.target.closest('[data-ph-controls]'))finish();if(opened&&!ownNav.contains(e.target))closeMenu(false);},{capture:true});
  listen(document,'keydown',e=>{if(intro&&!editing&&!e.target.closest('[data-ph-controls]'))finish();if(opened&&e.key==='Escape'){e.preventDefault();closeMenu();}},{capture:true});
  root.querySelectorAll('[data-ph-language]').forEach(el=>listen(el,'click',()=>{finish();setLanguage(el.dataset.phLanguage);}));
  listen(window,'scroll',()=>{if(intro&&!editing)finish();},{passive:true});
  listen(video,'error',failMedia);
  listen(video,'loadedmetadata',()=>{if(editing){seekVideo();if(intro)syncPlayback();}});
  listen(document,'visibilitychange',()=>{if(document.hidden&&intro){if(editing)seek(currentTime);else finish();}syncPlayback();});
  listen(window,'pagehide',()=>{finish();video.pause();});
  listen(window,'pageshow',e=>{if(e.persisted)startIntro();});
  const preferenceChange=()=>{if(staticMode()){finish();video.pause();video.removeAttribute('src');video.load();loaded=false;}else syncPlayback();};
  listen(reduced,'change',preferenceChange);listen(connection,'change',preferenceChange);
  listen(mobile,'change',()=>closeMenu());
  const observer=typeof IntersectionObserver!=='undefined'?new IntersectionObserver(()=>{visibility();syncPlayback();}):null;
  observer?.observe(root);observer?.observe(slot);
  let previousSize=`${root.offsetWidth}:${root.offsetHeight}`;
  const resize=()=>{const size=`${root.offsetWidth}:${root.offsetHeight}`;if(size===previousSize)return;previousSize=size;if(editing){measure();renderAt(currentTime);}else if(intro)finish();else{measure();draw(1);drawPhoto(1);visibility();syncPlayback();}};
  const resizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
  resizeObserver?.observe(root);listen(window,'resize',resize);
  return {finish,seek,
    playFrom(time=currentTime,rate=1){if(destroyed)return;editing=true;run(time,rate);},
    getState(){return {time:currentTime,duration:total(),playing:intro,editing};},
    getSequences(){return structuredClone(sequences);},
    setSequences(updates){applySequences(updates);buildAnimations();seek(currentTime);},
    resetSequences(){sequences=structuredClone(baseline);buildAnimations();seek(0);},
    replay(){closeMenu(false);startIntro();},setLanguage,
    destroy(){if(destroyed)return;finish();closeMenu(false);destroyed=true;++token;cancelAnimations();observer?.disconnect();resizeObserver?.disconnect();listeners.forEach(remove=>remove());video.pause();video.removeAttribute('src');video.load();if(scrubVideoURL)URL.revokeObjectURL(scrubVideoURL);photoClip.remove();photo.style.removeProperty('clip-path');root.removeAttribute('data-ready');root.removeAttribute('data-phase');}
  };
}
