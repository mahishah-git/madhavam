:root{--paper:#f7efd8;--gold:#b8923a;--gold2:#e2c36b;--maroon:#6e1423;--rust:#9b3b2d;--olive:#5c4d1c}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{background:#3d0c16 radial-gradient(circle at 50% 0,#6e1423,#2c0810);color:var(--olive);font:500 1.25rem 'Cormorant Garamond',serif;overflow-x:hidden;text-align:center}
body.locked{overflow:hidden;height:100vh}
#inv{position:relative;max-width:520px;margin:auto;overflow:hidden;box-shadow:0 0 70px #000a;
 background:var(--paper) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 .55 0 0 0 0 .42 0 0 0 0 .2 0 0 0 .13 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")}
.script{font-family:'Pinyon Script',cursive;font-weight:400;color:var(--rust)}
.rust{color:var(--rust)}
.deva{font-family:'Tiro Devanagari Hindi',serif;color:var(--rust)}
section{position:relative;min-height:100svh;padding:7rem 1.6rem 15rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.2rem;overflow:hidden}
section::before{content:"";position:absolute;inset:12px;border:1.5px solid var(--gold);border-radius:26px 26px 4px 4px;opacity:.55;pointer-events:none;z-index:3}
section>*:not(.layer):not(.toran):not(#birds){position:relative;z-index:2}
/* scene image layers (all optional) */
.layer{position:absolute;z-index:1;pointer-events:none;height:auto}
.arch,.bells,.floral-top,.toran-flowers,.lotus-bottom,.elephants,.palace-gate,.cows{left:0;width:100%}
.arch,.bells,.floral-top,.toran-flowers{top:0}
.lotus-bottom,.elephants,.palace-gate,.cows{bottom:0}
.leaves-left{top:0;left:0;width:42%}.leaves-right{top:0;right:0;width:42%}
.floral-left{top:6%;left:0;width:30%}.floral-right{top:6%;right:0;width:30%}
.peacock{bottom:0;right:0;width:36%}.dome-left{bottom:10%;left:0;width:40%}.dome-right{bottom:10%;right:0;width:40%}.elephant-left{bottom:4%;left:0;width:46%}
.bells,.toran-flowers{transform-origin:top center;animation:sway 6s ease-in-out infinite alternate}
.lotus-bottom{animation:bob 7s ease-in-out infinite alternate}
@keyframes sway{from{transform:rotate(-.7deg)}to{transform:rotate(.7deg)}}@keyframes bob{to{transform:translateY(-6px)}}
/* gate */
#gate{position:fixed;inset:0;z-index:50;background:var(--paper);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.2rem;transition:opacity 1.2s}
#gate.out{opacity:0;pointer-events:none}#gate h1{font-size:4rem}
.btn{font:600 1.1rem 'Cormorant Garamond',serif;letter-spacing:.08em;background:var(--maroon);color:#f8e9c0;border:1px solid var(--gold);padding:.8rem 1.8rem;border-radius:40px;cursor:pointer;text-decoration:none;box-shadow:0 4px 14px #6e142340;min-height:44px;display:inline-block}
.btn.ghost{background:transparent;color:var(--maroon)}
.btn:focus-visible,input:focus-visible,#music:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
#music{position:fixed;top:14px;right:max(14px,calc(50% - 246px));z-index:40;width:44px;height:44px;border-radius:50%;border:1px solid var(--gold);background:#f6efddcc;color:var(--maroon);font-size:1.3rem;cursor:pointer}
#music.off{opacity:.55;text-decoration:line-through}
/* ganesh + mandala ring (no overlap: ring stays inside its box) */
.ganesh{position:relative;width:min(68vw,300px);aspect-ratio:1;display:grid;place-items:center;margin:1rem 0 1.5rem}
.ganesh.small{width:200px}
.ganesh .ring{position:absolute;inset:0;width:100%;height:100%;animation:spin 90s linear infinite}
.ganesh .gimg{position:relative;width:48%;filter:drop-shadow(0 4px 8px #0002)}
.gfallback{position:relative;font:5rem 'Tiro Devanagari Hindi';color:var(--maroon);text-shadow:0 0 16px var(--gold2)}
@keyframes spin{to{transform:rotate(360deg)}}
.big{font-size:1.8rem}.shloka{font-size:1.2rem;line-height:2}.title{font-size:2.3rem}
.om{font:4rem 'Tiro Devanagari Hindi';color:var(--rust)}
.blessing{font-size:1.7rem;color:var(--olive);max-width:16ch;line-height:1.3}.big2{font-size:2rem;color:var(--rust)}
.name{font-size:3rem;letter-spacing:.14em;color:var(--rust)}
#s3>.script{font-size:3.8rem}
.frame{position:relative;width:min(80vw,340px);padding:10px;background:linear-gradient(135deg,var(--gold2),var(--gold) 50%,var(--gold2));border-radius:170px 170px 8px 8px;box-shadow:0 12px 28px #5a43324d}
.frame img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:160px 160px 3px 3px;background:#f2c9c9}
.phtxt{display:none;position:absolute;inset:10px;border-radius:160px 160px 3px 3px;background:#f2c9c9;color:var(--maroon);align-items:center;justify-content:center;padding:2rem}
.ph .phtxt{display:flex}.ph img{visibility:hidden}
/* invite details */
#s4>.script{font-size:4rem;line-height:1.1}
.when{display:grid;gap:.1rem}.dow,.mon{font-size:1.5rem;letter-spacing:.3em;text-transform:uppercase;color:var(--olive)}
.dnum{font-size:5rem;line-height:1;border-top:1px solid var(--gold);border-bottom:1px solid var(--gold);padding:.1rem 1.5rem;margin:.4rem auto}.dnum sup{font-size:1.8rem}
.at{font-size:1.45rem}.evs{display:grid;gap:1rem;margin-top:.6rem}
.ev{font-size:1.5rem;font-weight:600;color:var(--rust);letter-spacing:.14em;text-transform:uppercase}
address{font-style:normal;line-height:1.9;font-size:1.3rem}
#s6 .names{font-size:3.4rem;line-height:1.2}.closing{font-size:2.1rem;max-width:16ch;line-height:1.3}
#rsvp{display:grid;gap:.9rem;width:min(86vw,380px)}
.opt input{position:absolute;opacity:0}.opt span{display:block;padding:.85rem 1rem;border:1px solid var(--gold);border-radius:12px;background:#fffaf0cc;cursor:pointer}
.opt input:checked+span{background:var(--maroon);color:#f8e9c0}.opt input:focus-visible+span{outline:3px solid var(--gold)}
#gname{font:inherit;padding:.8rem 1rem;border:1px solid var(--gold);border-radius:12px;background:#fffaf0;color:var(--olive);text-align:center}
#msg{min-height:1.4em;color:var(--maroon)}#contacts a{display:block;color:var(--olive);text-decoration:none;font-size:1.4rem;font-weight:600;line-height:1.7}
/* motion */
.rv{opacity:0;transform:translateY(28px);transition:opacity 1.4s ease,transform 1.4s ease}.rv.in{opacity:1;transform:none}
.d1{transition-delay:.3s}.d2{transition-delay:.7s}.d3{transition-delay:1.1s}
.frame.rv{clip-path:inset(0 0 100% 0);transition:clip-path 1.6s ease,opacity 1s,transform 1.4s}.frame.rv.in{clip-path:inset(0)}
.toran{position:absolute;top:0;left:0;width:100%;height:60px;z-index:1}
#petals{position:fixed;inset:0;z-index:30;pointer-events:none;overflow:hidden}
.petal{position:absolute;top:-40px;animation:fall linear forwards;will-change:transform}
@keyframes fall{to{transform:translate3d(var(--dx),115vh,0) rotate(var(--r))}}
.t-lotus{background:linear-gradient(160deg,#fbcad6,#e56f94);border-radius:50% 0 50% 0}
.t-rose{background:linear-gradient(135deg,#d6314f,#8e0e26);border-radius:60% 40% 60% 40%}
.t-mogra{background:radial-gradient(circle,#f1dd8a 0 14%,#fff 18%);border-radius:50%;box-shadow:0 0 0 2px #fff,0 1px 4px #0003}
.t-marigold{background:radial-gradient(circle,#d9780a 0 22%,#fbbf24 30%,#f59e0b);border-radius:50%;box-shadow:0 0 0 2px #f9b21d,0 1px 4px #0003}
#birds .bird{position:absolute;left:-60px;width:34px;color:var(--olive);animation:fly linear infinite;opacity:.8}
#birds{position:absolute;inset:0;z-index:1;pointer-events:none}
@keyframes fly{to{transform:translate(calc(100vw + 120px),var(--dy))}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none;clip-path:none!important}html{scroll-behavior:auto}#petals,#birds{display:none}}
