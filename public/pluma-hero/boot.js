/* Load synchronously in the homepage head before hero.css. Fails open after 4s. */
(() => {
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||navigator.connection?.saveData)return;
  let timeout;const html=document.documentElement,guard={status:'pending',release};
  window.__plumaHeroBoot=guard;html.setAttribute('data-ph-intro-pending','');
  function release(){clearTimeout(timeout);html.removeAttribute('data-ph-intro-pending');window.removeEventListener('scroll',skip);document.removeEventListener('keydown',skip,true);document.removeEventListener('pointerdown',skip,true);if(guard.status==='pending')guard.status='released';}
  function skip(){guard.status='skipped';release();}
  window.addEventListener('scroll',skip,{passive:true});document.addEventListener('keydown',skip,true);document.addEventListener('pointerdown',skip,true);timeout=setTimeout(skip,4000);
})();
