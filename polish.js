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

  /* hide the duplicate shloka line once the mandala video is ready (the video already shows it) */
  const v=$('#mv');
  if(v){
    const ok=()=>document.body.classList.add('hasvid');
    if(v.readyState>=2) ok(); else v.addEventListener('loadeddata',ok,{once:true});
  }

  /* stop guests from sending the RSVP twice */
  const f=$('#rsvp');
  if(f) f.addEventListener('submit',()=>{
    if(!$('#gname').value.trim()) return;
    const b=f.querySelector('button[type=submit]');
    b.disabled=true; setTimeout(()=>{b.disabled=false},4000);
  });
})();