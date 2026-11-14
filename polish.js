/* ===== v7 polish: load AFTER script.js ===== */
(()=>{
  const $=s=>document.querySelector(s);

  /* each section loads the art named in its data-bg (script.js assumes the old order) */
  document.querySelectorAll('.scene[data-bg]').forEach(sc=>{
    const t=new Image();
    t.onload=()=>{
      sc.style.setProperty('--bg',`url("${t.src}")`);
      sc.style.setProperty('--ar',`${t.naturalWidth} / ${t.naturalHeight}`);
      sc.classList.add('bgd');
    };
    t.src=`assets/bg/${sc.dataset.bg}.jpg`;
  });

  /* mandala video: always keep the real <video> on screen and keep nudging it to play */
  const v=$('#mv');
  if(v){
    const caption=()=>document.body.classList.add('hasvid');   /* the video/poster already carries the shloka line */
    if(v.readyState>=2) caption(); else v.addEventListener('loadeddata',caption,{once:true});
    v.addEventListener('error',()=>{caption(); v.hidden=false;},true);
    const kick=()=>{ if(v.paused){ const p=v.play(); if(p&&p.catch) p.catch(()=>{}); } };
    v.addEventListener('canplay',kick);
    ['pointerdown','touchend','click','scroll'].forEach(e=>addEventListener(e,kick,{passive:true,once:true}));
  }

  /* stop guests from sending the RSVP twice */
  const f=$('#rsvp');
  if(f) f.addEventListener('submit',()=>{
    if(!$('#gname').value.trim()) return;
    const b=f.querySelector('button[type=submit]');
    b.disabled=true; setTimeout(()=>{b.disabled=false},4000);
  });
})();
