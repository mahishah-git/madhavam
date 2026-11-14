/* ===== EDIT THESE ===== */
const CONFIG = {
  mapsUrl:  "https://maps.app.goo.gl/4dGDmz5ZEK1xiU7t9",
  whatsapp: "+91 8291979537",     // country code + number, no + or spaces
  sheetUrl: "https://docs.google.com/spreadsheets/d/1Gh94X5_6GMTYYnQC5NjWJ6KPndhfC0F0P0fhkPDaSSU/edit?gid=0#gid=0",                 // Apps Script Web App URL (see README)
  contacts: [                   // shown under RSVP (tap to call) – replace with real names/numbers
    {name: "Nirav", phone: "+91 82919 79537"},
    {name: "Zankhana", phone: "+91 99797 88188"}
  ]
};
/* ====================== */
const $ = s => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = '#b8923a', G2 = '#e2c36b', M = '#6e1423';

// Scene image layers: put PNGs in assets/scene/<name>.png — any missing file is simply skipped
const LAYERS = {
  s1:['arch','bells','floral-top','elephants','lotus-bottom'],
  s2:['leaves-left','leaves-right','floral-top','lotus-bottom'],
  s3:['leaves-left','leaves-right','palace-gate','lotus-bottom'],
  s4:['arch','toran-flowers','dome-left','dome-right','elephant-left','lotus-bottom'],
  s5:['floral-left','floral-right','palace-gate','peacock','lotus-bottom'],
  s6:['leaves-left','leaves-right','cows','lotus-bottom'],
  s7:['floral-left','floral-right','palace-gate','peacock','lotus-bottom']
};
Object.entries(LAYERS).forEach(([id, names]) => {
  const sec = document.getElementById(id);
  names.forEach(n => {
    const i = new Image(); i.className = 'layer ' + n; i.alt = ''; i.loading = 'lazy'; i.decoding = 'async';
    i.onerror = () => i.remove();
    if (n === 'bells' || n === 'toran-flowers') i.onload = () => sec.querySelectorAll('.toran').forEach(t => t.remove());
    i.src = `assets/scene/${n}.png`; sec.prepend(i);
  });
});

// Mandala ring (assets/mandala.png, rotates) + Ganesha emblem (assets/ganesha.png, still)
function fallbackRing() {
  let p = '';
  [[95,16,G],[75,12,M],[55,8,G2]].forEach(([r,n,c],i)=>{ for (let k=0;k<n*2;k++) p += `<ellipse cx="100" cy="${100-r}" rx="${5+i*2}" ry="${14-i*2}" fill="none" stroke="${c}" stroke-width="1.2" transform="rotate(${k*360/(n*2)} 100 100)"/>`; });
  const s = document.createElement('div'); s.className = 'ring';
  s.innerHTML = `<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true"><circle cx="100" cy="100" r="98" fill="none" stroke="${G}" stroke-width="1.5"/>${p}</svg>`; return s;
}
document.querySelectorAll('[data-ring]').forEach(box => {
  const r = new Image(); r.className = 'ring'; r.alt = '';
  r.onerror = () => r.replaceWith(fallbackRing());
  r.src = 'assets/mandala.png'; box.appendChild(r);
  const g = new Image(); g.className = 'gimg'; g.alt = 'Lord Ganesha';
  g.onerror = () => { const f = document.createElement('div'); f.className = 'gfallback'; f.textContent = 'ॐ'; g.replaceWith(f); };
  g.src = 'assets/ganesha.png'; box.appendChild(g);
});

// Fallback toran (hidden automatically once your own bells/toran image loads)
document.querySelectorAll('.toran').forEach(t => {
  let s = `<path d="M0 6 Q200 40 400 6" fill="none" stroke="${G}" stroke-width="2"/>`;
  for (let i=1;i<14;i++){const x=i*400/14,y=6+Math.sin(Math.PI*i/14)*17;
    s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+10}" stroke="${G}"/><path d="M${x-5} ${y+10}q5 -6 10 0v6h-10z" fill="${i%2?M:G}"/><circle cx="${x}" cy="${y+19}" r="2" fill="${G2}"/>`;}
  t.innerHTML = s;
});

// Sparrows
if (!reduce) { const b = $('#birds'), svg = '<svg viewBox="0 0 40 24" fill="currentColor"><path d="M2 12c6-2 10-1 14 2 3-6 9-10 18-9-5 2-8 5-9 8 3 1 5 3 5 6-4-3-9-4-15-3-5 0-9-2-13-4z"/></svg>';
  for (let i=0;i<3;i++){const d=document.createElement('div');d.className='bird';d.innerHTML=svg;d.style.cssText=`top:${12+i*14}%;--dy:${(i%2?-1:1)*40}px;animation-duration:${18+i*5}s;animation-delay:${i*4}s`;b.appendChild(d);} }

// Falling flowers: lotus, rose, mogra, yellow marigold. Optional images: assets/petals/{lotus,rose,mogra,marigold}.png
const TYPES = ['lotus','lotus','lotus','rose','rose','mogra','mogra','marigold','marigold'];
const have = {}; ['lotus','rose','mogra','marigold'].forEach(t => { const i = new Image(); i.onload = () => have[t] = true; i.src = `assets/petals/${t}.png`; });
const petals = $('#petals'); let intensity = 1, started = false;
function petal() {
  if (reduce || document.hidden) return;
  const t = TYPES[Math.random()*TYPES.length|0], s = (t==='mogra'?9:12) + Math.random()*14;
  const p = have[t] ? Object.assign(new Image(), {src:`assets/petals/${t}.png`}) : document.createElement('i');
  p.className = 'petal' + (have[t] ? '' : ' t-' + t); p.alt = '';
  p.style.cssText = `left:${Math.random()*100}%;width:${s}px;height:${have[t]||t==='mogra'||t==='marigold'?'auto':s*1.2+'px'};opacity:${.7+Math.random()*.3};--dx:${(Math.random()-.5)*180}px;--r:${Math.random()*720}deg;animation-duration:${7+Math.random()*7}s`;
  if (!have[t] && (t==='mogra'||t==='marigold')) p.style.height = s + 'px';
  petals.appendChild(p); setTimeout(() => p.remove(), 15000);
}
(function loop(){ if (started) petal(); setTimeout(loop, 650/intensity + (innerWidth<600?200:0)); })();
addEventListener('scroll', () => { intensity = 1 + Math.min(scrollY/$('#s1').offsetHeight, 1.2) * 1.5; }, {passive:true});

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.2});
document.querySelectorAll('.rv').forEach(e => io.observe(e));

// Enter + music
const bg = $('#bg'), mb = $('#music');
$('#enter').addEventListener('click', () => {
  $('#gate').classList.add('out'); document.body.classList.remove('locked');
  mb.hidden = false; started = true; scrollTo(0,0);
  bg.volume = .7; bg.play().catch(() => { mb.classList.add('off'); mb.setAttribute('aria-pressed','false'); });
  setTimeout(() => $('#gate').remove(), 1300);
});
mb.addEventListener('click', () => {
  if (bg.paused) { bg.play(); mb.classList.remove('off'); mb.setAttribute('aria-pressed','true'); }
  else { bg.pause(); mb.classList.add('off'); mb.setAttribute('aria-pressed','false'); }
});

// Maps + contacts
$('#maps').href = CONFIG.mapsUrl;
$('#contacts').innerHTML = CONFIG.contacts.map(c => `<a href="tel:${c.phone.replace(/[^+\d]/g,'')}">${c.name}<br>${c.phone}</a>`).join('');

// RSVP
const msg = $('#msg');
function getData() {
  const att = document.querySelector('input[name=att]:checked'), name = $('#gname').value.trim();
  if (!att || !name) { msg.textContent = 'Please choose an option and enter your name.'; return null; }
  return {name, att: att.value};
}
$('#rsvp').addEventListener('submit', async e => {
  e.preventDefault(); const d = getData(); if (!d) return;
  if (!CONFIG.sheetUrl) { msg.textContent = 'RSVP sheet is not connected yet — please use the WhatsApp button.'; return; }
  msg.textContent = 'Sending…';
  try {
    await fetch(CONFIG.sheetUrl, {method:'POST', mode:'no-cors', body:new URLSearchParams({name:d.name, attendance:d.att})});
    msg.textContent = d.att === 'Yes' ? 'Thank you, ' + d.name + '! We look forward to seeing you. 🙏' : 'Thank you for letting us know, ' + d.name + '. You will be missed. 🙏';
    $('#rsvp').querySelector('button[type=submit]').disabled = true;
  } catch { msg.textContent = 'Something went wrong. Please try WhatsApp.'; }
});
$('#wa').addEventListener('click', () => {
  const d = getData(); if (!d) return;
  const t = d.att === 'Yes' ? `Namaste! This is ${d.name}. I will be joining the Vastu Pujan at Madhavam on 25th November. 🙏`
                            : `Namaste! This is ${d.name}. Sorry, I won't be able to attend the Vastu Pujan at Madhavam. 🙏`;
  open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`, '_blank');
});
