/* ===== EDIT THESE ===== */
const CONFIG = {
  mapsUrl:  "https://maps.app.goo.gl/CL5geEgnWkpFrP9J6", // Google Maps share link
  whatsapp: "+91 8291979537",   // country code + number, no + or spaces
  sheetUrl: "https://docs.google.com/spreadsheets/d/1Gh94X5_6GMTYYnQC5NjWJ6KPndhfC0F0P0fhkPDaSSU/edit?gid=0#gid=0"                // Apps Script Web App URL (see README). Leave "" until set up.
};
/* ====================== */
const $ = s => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = '#b8923a', G2 = '#e2c36b', M = '#6e1423';

// Mandala (generated SVG)
function mandala() {
  let p = '';
  [[95,16,G],[75,12,M],[55,8,G2]].forEach(([r,n,c],i)=>{
    for (let k=0;k<n*2;k++) p += `<ellipse cx="100" cy="${100-r}" rx="${5+i*2}" ry="${14-i*2}" fill="none" stroke="${c}" stroke-width="1.2" transform="rotate(${k*360/(n*2)} 100 100)"/>`;
  });
  for (let k=0;k<24;k++) p += `<circle cx="100" cy="6" r="2.2" fill="${G}" transform="rotate(${k*15} 100 100)"/>`;
  return `<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="98" fill="none" stroke="${G}" stroke-width="1.5"/><circle cx="100" cy="100" r="40" fill="none" stroke="${G2}" stroke-width="1"/>${p}</svg>`;
}
document.querySelectorAll('[data-mandala]').forEach(e => e.innerHTML = mandala());

// Toran (hanging bells & garland)
(function(){
  let s = `<path d="M0 6 Q200 40 400 6" fill="none" stroke="${G}" stroke-width="2"/>`;
  for (let i=1;i<14;i++){const x=i*400/14,y=6+Math.sin(Math.PI*i/14)*17;
    s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+10}" stroke="${G}"/><path d="M${x-5} ${y+10}q5 -6 10 0v6h-10z" fill="${i%2?M:G}"/><circle cx="${x}" cy="${y+19}" r="2" fill="${G2}"/>`;}
  document.querySelector('.toran').innerHTML = s;
})();

// Sparrows
(function(){
  if (reduce) return;
  const b = $('#birds'), svg = '<svg viewBox="0 0 40 24" fill="currentColor"><path d="M2 12c6-2 10-1 14 2 3-6 9-10 18-9-5 2-8 5-9 8 3 1 5 3 5 6-4-3-9-4-15-3-5 0-9-2-13-4z"/></svg>';
  for (let i=0;i<4;i++){const d=document.createElement('div');d.className='bird';d.innerHTML=svg;
    d.style.cssText=`top:${15+i*17}%;--dy:${(i%2?-1:1)*40}px;animation-duration:${18+i*5}s;animation-delay:${i*4}s`;b.appendChild(d);}
})();

// Petals
const petals = $('#petals'); let intensity = 1, started = false;
function petal() {
  if (reduce || document.hidden) return;
  const p = document.createElement('i'), s = 10 + Math.random()*14;
  p.className = 'petal';
  p.style.cssText = `left:${Math.random()*100}vw;width:${s}px;height:${s*1.2}px;background:${Math.random()<.5?'#e58aa0':'#c43d52'};opacity:${.55+Math.random()*.4};--dx:${(Math.random()-.5)*160}px;--r:${Math.random()*720}deg;animation-duration:${7+Math.random()*7}s`;
  petals.appendChild(p); setTimeout(()=>p.remove(), 15000);
}
(function loop(){ if(started) petal(); setTimeout(loop, 700/intensity + (innerWidth<600?250:0)); })();
addEventListener('scroll', () => {
  const s1 = $('#s1').offsetHeight, y = scrollY;
  intensity = 1 + Math.min(y/s1, 1.2) * 1.5;           // more petals while scrolling the opening
  if (!reduce) document.querySelectorAll('[data-parallax]').forEach(e => e.style.transform = `translateY(${y*e.dataset.parallax}px)`);
}, {passive:true});

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

// Maps
$('#maps').href = CONFIG.mapsUrl;

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
