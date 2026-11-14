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
    /* second chance: download the whole file, then play it from memory (works around server/range problems) */
    let tried=false;
    const viaBlob=async()=>{
      tried=true;
      try{
        const r=await fetch('assets/mandala.mp4',{cache:'no-store'}); if(!r.ok) return;
        const b=await r.blob();
        v.removeAttribute('autoplay'); v.src=URL.createObjectURL(new Blob([b],{type:'video/mp4'}));
        v.muted=true; v.loop=true; const p=v.play(); if(p&&p.catch) p.catch(()=>{});
      }catch(e){}
    };
    v.addEventListener('error',()=>{
      caption(); v.hidden=false;
      if(!tried && !String(v.currentSrc).startsWith('blob:')) viaBlob();
    },true);
    if(v.networkState===3 && !tried) viaBlob();
    const kick=()=>{ if(v.paused){ const p=v.play(); if(p&&p.catch) p.catch(()=>{}); } };
    v.addEventListener('canplay',kick);
    ['pointerdown','touchend','click','scroll'].forEach(e=>addEventListener(e,kick,{passive:true,once:true}));

    /* add #debug to the end of the address to see what the video is doing */
    if(location.hash==='#debug'){
      const d=document.createElement('pre');
      d.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99;margin:0;padding:8px;font:12px/1.3 monospace;background:#000c;color:#0f0;white-space:pre-wrap';
      setInterval(()=>{ d.textContent='src: '+(v.currentSrc||'(none)')+'\nnetwork: '+v.networkState+'  ready: '+v.readyState+'  paused: '+v.paused+'\nerror: '+(v.error?v.error.code+' '+(v.error.message||''):'none'); },500);
      document.body.appendChild(d);
    }
  }

  /* RSVP -> Google Sheet (replaces the old handler in script.js) */
  document.addEventListener('submit',async e=>{
    if(!e.target || e.target.id!=='rsvp') return;
    e.preventDefault(); e.stopImmediatePropagation();
    const f=e.target, msg=$('#msg'), name=$('#gname').value.trim();
    const ans=f.querySelector('[name=ans]:checked').value;
    if(!name){ msg.textContent='Please enter your name.'; return; }
    if(!CONFIG.sheetUrl){ msg.textContent='RSVP is not connected yet. Please call one of the numbers below.'; return; }
    const btn=f.querySelector('button[type=submit]'); btn.disabled=true; msg.textContent='Sending…';
    try{
      const r=await fetch(CONFIG.sheetUrl,{method:'POST',body:JSON.stringify({name,answer:ans})});
      const res=await r.json();
      if(!res.ok) throw new Error(res.error||'failed');
      msg.textContent = ans==='Yes' ? 'Thank you, '+name+'! We look forward to celebrating with you.'
                                    : 'Thank you for letting us know, '+name+'. You will be missed.';
      f.reset();
    }catch(err){
      msg.textContent='Could not send. Please call one of the numbers below.';
    }finally{ btn.disabled=false; }
  },true);
})();
