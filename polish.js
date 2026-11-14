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

  /* mandala: use the video when it loads; if it can't load/play, show its still picture instead of an empty ring */
  const v=$('#mv'), m=$('.mandala');
  if(v&&m){
    const ok=()=>document.body.classList.add('hasvid');   /* the picture already carries the shloka line */
    let img=null;
    const showStill=()=>{
      if(img) return;
      video = document.createElement('video'); video.src = 'assets/mandela.mp4';
      img.style.cssText='display:block;width:100%;height:auto;mix-blend-mode:multiply';
      v.style.display='none'; m.appendChild(img); ok();
    };
    const backToVideo=()=>{ if(!img) return; img.remove(); img=null; v.hidden=false; v.style.display=''; };
    v.addEventListener('error',showStill,true);
    v.addEventListener('playing',backToVideo);
    if(v.readyState>=2) ok(); else v.addEventListener('loadeddata',ok,{once:true});
    if(v.networkState===3) showStill();
    setTimeout(()=>{ if(v.readyState<2) showStill(); },4000);
  }

  /* stop guests from sending the RSVP twice */
  const f=$('#rsvp');
  if(f) f.addEventListener('submit',()=>{
    if(!$('#gname').value.trim()) return;
    const b=f.querySelector('button[type=submit]');
    b.disabled=true; setTimeout(()=>{b.disabled=false},4000);
  });
})();
