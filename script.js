/* ===== CONFIG: edit only this block ===== */
const CONFIG = {
  mapsUrl: "https://maps.app.goo.gl/JNLx4DKmz8XNpL787",  // Google Maps link of the house
  whatsapp: "+91 82919 79537",            // country code + number, digits only
  sheetUrl: "https://docs.google.com/spreadsheets/d/1Gh94X5_6GMTYYnQC5NjWJ6KPndhfC0F0P0fhkPDaSSU/edit?usp=sharing",                        // Apps Script Web App URL (see README). Empty = RSVP form tells guests to use WhatsApp
  contacts: [ {name:"Nirav", phone:"+91 82919 79537"}, {name:"Zankhana", phone:"99797 88188"} ],
  family: [ {names:"Minaxi & Pravin Shah", note:""}, {names:"Sudha & Vinod Desai", note:""} ]   // add more rows the same way
};
/* ======================================== */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const safe=fn=>{try{fn()}catch(e){console.warn(e)}};

/* optional images: load only if the file exists, else leave hidden */
function loadImgs(){ $$('img[data-src]').forEach(el=>{
  const t=new Image(); t.onload=()=>{el.src=t.src; el.dataset.ok=1; if(el.classList.contains('toran')) safe(()=>$('svg.toran.fb').remove())}; t.onerror=()=>{}; t.src=el.dataset.src; }); }

/* fallback SVG toran if no toran image */
safe(()=>{let h='<path d="M0 6 Q200 30 400 6" stroke="#b98a2e" fill="none" stroke-width="3"/>';
 for(let i=0;i<9;i++){const x=22+i*44,y=14+Math.sin(i/8*Math.PI)*14,l=30+(i%3)*18;
 h+=`<line x1="${x}" y1="${y}" x2="${x}" y2="${y+l}" stroke="#d8b25a" stroke-width="2"/><ellipse cx="${x}" cy="${y+l+8}" rx="7" ry="10" fill="#e48aa8"/>`}
 $('svg.toran.fb').innerHTML=h});

/* content from CONFIG */
safe(()=>{ $('#nav').href=CONFIG.mapsUrl;
 $('#family').innerHTML=CONFIG.family.map(f=>`<p>${f.names}${f.note?`<small>${f.note}</small>`:''}</p>`).join('');
 $('#contacts').innerHTML=CONFIG.contacts.map(c=>`<a href="tel:${c.phone.replace(/\s/g,'')}"><b>${c.name}</b><br>${c.phone}</a>`).join('');
 $('#wa').addEventListener('click',()=>{const n=$('#gname').value.trim()||'[my name]',a=document.querySelector('[name=ans]:checked').value==='Yes'?'will be joining':"won't be able to attend";
  $('#wa').href=`https://wa.me/${CONFIG.whatsapp}?text=`+encodeURIComponent(`Hello! This is ${n}. I ${a} the Vastu Pujan at Madhavam on 25th November 2026.`)}); });

/* reveal on scroll */
safe(()=>{ if(!('IntersectionObserver' in window)) return $$('.rv').forEach(e=>e.classList.add('in'));
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
 $$('.rv').forEach(e=>io.observe(e)); });
/* gentle parallax on side layers */
safe(()=>{ if(matchMedia('(prefers-reduced-motion:reduce)').matches) return; let t=false;
 addEventListener('scroll',()=>{ if(t) return; t=true; requestAnimationFrame(()=>{ t=false; $$('.ly.left,.ly.right,.ly.dl,.ly.dr').forEach(e=>{const r=e.parentElement.getBoundingClientRect(); e.style.transform=`translateY(${(r.top*-.06).toFixed(1)}px)`})})},{passive:true}); });

/* mandala video fallback */
function mandalaFallback(){ safe(()=>{ $('#mv').hidden=true; $('#mfb').hidden=false; $('#mring').hidden=false; }); }
safe(()=>{ const v=$('#mv'); v.querySelector('source').addEventListener('error',mandalaFallback); v.addEventListener('error',mandalaFallback);
 $('#mfb').addEventListener('x',()=>{}); });

/* flower shower: images from assets/petals if present, CSS shapes otherwise */
const kinds=['lotus','rose','mogra','marigold'], have={};
kinds.forEach(k=>{const t=new Image();t.onload=()=>have[k]=t.src;t.src=`assets/petals/${k}.png`;});
let on=false, live=0;
function density(){ const m=document.documentElement; return Math.min(1,scrollY/Math.max(1,m.scrollHeight-innerHeight)); }
function spawn(){ if(!on||document.hidden) return setTimeout(spawn,800);
 const max=8+Math.round(density()*8);
 if(live<max){ const k=kinds[Math.random()*4|0], p=document.createElement('div'), s=14+Math.random()*16, i=document.createElement('i');
  p.className='petal p-'+k; p.style.cssText=`left:${Math.random()*100}%;--s:${s}px;--t:${9+Math.random()*7}s;--x:${(Math.random()-.5)*90}px;--r:${3+Math.random()*5}s`;
  if(have[k]){i.style.backgroundImage=`url(${have[k]})`;i.style.background=`url(${have[k]}) center/contain no-repeat`}
  p.appendChild(i); $('#petals').appendChild(p); live++; p.addEventListener('animationend',()=>{p.remove();live--}); }
 setTimeout(spawn,1100-density()*600); }
spawn();

/* music */
const audio=$('#music'); let muted=false;
$('#mute').addEventListener('click',()=>{ safe(()=>{muted=!muted;audio.muted=muted;$('#mute').classList.toggle('off',muted);$('#mute').setAttribute('aria-label',muted?'Unmute music':'Mute music')}) });

/* START (no gate): everything runs on page load; music starts on the guest's first tap/touch (browsers block sound before that) */
let musicOn=false;
const GEST=['pointerdown','touchend','click','keydown'];
function tryMusic(){ if(musicOn) return; safe(()=>{ const p=audio.play(); if(p&&p.then) p.then(()=>{musicOn=true;GEST.forEach(e=>removeEventListener(e,tryMusic))}).catch(()=>{}); else musicOn=true; }); }
GEST.forEach(e=>addEventListener(e,tryMusic,{passive:true}));
on=true;
safe(()=>{ const v=$('#mv'); v.muted=true; const p=v.play(); if(p&&p.catch) p.catch(()=>{}); });
safe(()=>$$('.s1 .rv').forEach(e=>e.classList.add('in')));
tryMusic();
safe(loadImgs);

/* RSVP */
$('#rsvp').addEventListener('submit',async e=>{ e.preventDefault(); const msg=$('#msg'), name=$('#gname').value.trim();
 if(!name){msg.textContent='Please enter your name.';return}
 if(!CONFIG.sheetUrl){msg.textContent='Online RSVP is not set up yet. Please use "Reply on WhatsApp instead".';return}
 const ans=document.querySelector('[name=ans]:checked').value; msg.textContent='Sending…';
 try{ await fetch(CONFIG.sheetUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({name,answer:ans})});
  msg.textContent=ans==='Yes'?'Thank you, '+name+'! We look forward to celebrating with you.':'Thank you for letting us know, '+name+'. You will be missed.'; $('#rsvp').reset();
 }catch(err){ msg.textContent='Could not send. Please use "Reply on WhatsApp instead".'; } });

/* ===== v2: SVG fallback scenery (sits under your real PNGs; they cover it when uploaded) ===== */
safe(()=>{
 const lotus=(x,y,s)=>{let p='';[-72,72,-36,36,0].forEach(a=>p+=`<ellipse cx="0" cy="-15" rx="8" ry="17" transform="rotate(${a})" fill="url(#pk)" stroke="#d4668a" stroke-width=".6"/>`);
  return `<g class="fl" transform="translate(${x} ${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="40" stroke="#4f8f58" stroke-width="2"/>${p}<circle r="4" fill="#f2c14e"/></g>`};
 const pad=(x,y,rx)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx/3}" fill="#2f8a73"/><ellipse cx="${x}" cy="${y-2}" rx="${rx*.8}" ry="${rx/4}" fill="#3ba488"/>`;
 const pond=`<svg class="pond" viewBox="0 0 400 190" preserveAspectRatio="xMidYMax meet"><defs><linearGradient id="pk" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f7c0d0"/><stop offset="1" stop-color="#e5789b"/></linearGradient></defs>
  <path d="M0 95 Q100 60 200 90 T400 80 V190 H0Z" fill="#b5cd98"/><path d="M0 125 Q120 98 240 122 T400 114 V190 H0Z" fill="#93b57e"/><path d="M0 160 Q150 140 400 158 V190 H0Z" fill="#6f9c6c"/>
  ${pad(60,170,50)}${pad(330,172,55)}${pad(200,182,60)}${lotus(48,150,1.5)}${lotus(130,165,1.2)}${lotus(215,150,1.9)}${lotus(300,168,1.3)}${lotus(360,148,1.6)}${lotus(20,175,1)}</svg>`;
 let b='';[[45,70],[105,130],[165,95],[200,155],[235,95],[295,130],[355,70]].forEach(([x,l],i)=>b+=`<g class="bell" style="animation-delay:${i*.4}s"><line x1="${x}" y1="40" x2="${x}" y2="${l+40}" stroke="#d8b25a" stroke-width="2" stroke-dasharray="3 3"/><path transform="translate(${x} ${l+58})" d="M-10 0 Q-10 -16 0 -18 Q10 -16 10 0 Z M-12 0 H12 V3 H-12Z" fill="#b9822a"/></g>`);
 const arch=`<svg class="arch" viewBox="0 0 400 260" preserveAspectRatio="xMidYMin meet"><path d="M14 260 V120 Q14 62 80 54 Q126 46 150 24 Q200 -6 250 24 Q274 46 320 54 Q386 62 386 120 V260" fill="#f1e2bd88" stroke="#b98a2e" stroke-width="3"/><path d="M26 260 V124 Q26 72 84 66 Q132 58 158 36 Q200 12 242 36 Q268 58 316 66 Q374 72 374 124 V260" fill="none" stroke="#d8b25a" stroke-width="1"/>${b}</svg>`;
 const leaf=side=>{let g='';[-50,-25,0,25,50].forEach((a,i)=>g+=`<ellipse cx="0" cy="62" rx="${15-i%2*3}" ry="${60+i%3*12}" transform="rotate(${a+(i%2?8:0)} 0 0)" fill="${i%2?'#7fa26b':'#5f8f5a'}" opacity=".92"/>`);
  return `<svg class="lf ${side}" viewBox="-110 0 220 190">${g}</svg>`};
 const wants={s1:'A',s3:'A',s2:'L',s5:'L',s6:'L',s7:'L'};
 $$('.scene').forEach(sc=>{const d=document.createElement('div');d.className='fb-art';d.setAttribute('aria-hidden','true');
  const k=[...sc.classList].find(c=>wants[c]); let h='';
  if(k&&wants[k]==='A') h+=arch; if(k==='s3'||wants[k]==='L') h+=leaf('l')+leaf('r');
  d.innerHTML=h+pond; sc.prepend(d);});
});

/* v3: use assets/bg/s1.jpg..s7.jpg (one full illustrated scene per section) if present */
safe(()=>{ $$('.scene').forEach((sc,i)=>{ const t=new Image(); t.onload=()=>{sc.style.backgroundImage=`url(${t.src})`;sc.classList.add('bgd')}; t.src=`assets/bg/s${i+1}.jpg`; }); });

/* v4: hide duplicate shloka line when the video plays; drawn flower/petal shapes */
safe(()=>{ $('#mv').addEventListener('loadeddata',()=>document.body.classList.add('hasvid')); });
safe(()=>{
 const u=s=>`data:image/svg+xml,${encodeURIComponent(s)}`, H='xmlns="http://www.w3.org/2000/svg"';
 let mg='',mk='';
 for(let a=0;a<360;a+=72) mg+=`<ellipse cx="0" cy="-9" rx="5" ry="10" transform="rotate(${a})" fill="#fffdf3" stroke="#e3d8a8" stroke-width=".7"/>`;
 for(let a=0;a<360;a+=30) mk+=`<ellipse cx="0" cy="-11" rx="4.2" ry="10" transform="rotate(${a})" fill="#f39a14"/>`;
 for(let a=15;a<360;a+=30) mk+=`<ellipse cx="0" cy="-7" rx="3.6" ry="7" transform="rotate(${a})" fill="#f8b93a"/>`;
 const S={
  lotus:`<svg ${H} viewBox="0 0 40 60"><defs><linearGradient id="g" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fbd6e0"/><stop offset="1" stop-color="#df5f8b"/></linearGradient></defs><path d="M20 2C35 16 37 40 20 58 3 40 5 16 20 2Z" fill="url(#g)"/><path d="M20 9V50" stroke="#fff" stroke-opacity=".55"/></svg>`,
  rose:`<svg ${H} viewBox="0 0 50 50"><path d="M25 4C42 4 49 22 40 36 34 47 16 48 9 36 2 22 8 4 25 4Z" fill="#b01e35"/><path d="M14 18C22 8 36 12 38 24" stroke="#d8485c" fill="none" stroke-width="2.5"/><path d="M25 10C36 12 42 24 36 34" stroke="#7a1022" fill="none" stroke-width="1.4"/></svg>`,
  mogra:`<svg ${H} viewBox="-20 -20 40 40"><g>${mg}<circle r="3.2" fill="#e8c75a"/></g></svg>`,
  marigold:`<svg ${H} viewBox="-22 -22 44 44"><g>${mk}<circle r="4" fill="#cf6f08"/></g></svg>`};
 kinds.forEach(k=>{ if(!have[k]) have[k]=u(S[k]); });
});

/* v5: no falling petals; scenes take their picture's exact shape */
safe(()=>{ $$('.scene').forEach((sc,i)=>{ const t=new Image(); t.onload=()=>{sc.style.aspectRatio=t.naturalWidth+' / '+t.naturalHeight}; t.src=`assets/bg/s${i+1}.jpg`; }); });
