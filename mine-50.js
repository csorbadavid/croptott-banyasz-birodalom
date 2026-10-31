(function(){
'use strict';
const ROCKS=[
  ["Kő", "stone", 1, 1],
  ["Kő", "stone", 1, 1],
  ["Kő", "stone", 1, 1],
  ["Szén", "coal", 2, 2],
  ["Szén", "coal", 2, 2],
  ["Rézérc", "copper", 4, 3],
  ["Rézérc", "copper", 4, 3],
  ["Vasérc", "iron", 6, 4],
  ["Vasérc", "iron", 6, 4],
  ["Ezüstérc", "silver", 8, 5],
  ["Ezüstérc", "silver", 8, 5],
  ["Aranyérc", "gold", 10, 6],
  ["Aranyérc", "gold", 10, 6],
  ["Platinaérc", "platinum", 12, 7],
  ["Platinaérc", "platinum", 12, 7],
  ["Gyémánt", "diamond", 14, 8],
  ["Gyémánt", "diamond", 14, 8],
  ["Kristály", "crystal", 16, 9],
  ["Kristály", "crystal", 16, 9],
  ["Kobaltkő", "cobalt", 18, 10],
  ["Kobaltkő", "cobalt", 18, 10],
  ["Smaragd", "emerald", 20, 11],
  ["Smaragd", "emerald", 20, 11],
  ["Rubin", "ruby", 22, 12],
  ["Rubin", "ruby", 22, 12],
  ["Zafír", "sapphire", 24, 13],
  ["Zafír", "sapphire", 24, 13],
  ["Zafír", "sapphire", 24, 13],
  ["Obszidián", "obsidian", 26, 14],
  ["Obszidián", "obsidian", 26, 14],
  ["Titánérc", "titanium", 28, 15],
  ["Titánérc", "titanium", 28, 15],
  ["Irídiumérc", "iridium", 30, 16],
  ["Irídiumérc", "iridium", 30, 16],
  ["Ónix", "onyx", 32, 17],
  ["Ónix", "onyx", 32, 17],
  ["Holdkő", "moonstone", 34, 18],
  ["Holdkő", "moonstone", 34, 18],
  ["Napkő", "sunstone", 36, 19],
  ["Napkő", "sunstone", 36, 19],
  ["Mithril", "mithril", 38, 20],
  ["Mithril", "mithril", 38, 20],
  ["Csillagacél", "starsteel", 40, 21],
  ["Csillagacél", "starsteel", 40, 21],
  ["Asztrálérc", "astral", 45, 22],
  ["Asztrálérc", "astral", 45, 22],
  ["Ősi érc", "ancient", 50, 23],
  ["Ősi érc", "ancient", 50, 23],
  ["Ürességérc", "void", 55, 24],
  ["Ürességérc", "void", 55, 24]
];
const C={"stone":["#b7b7b7","#4f5356"],"coal":["#44484d","#101214"],"copper":["#c9793b","#6b2e13"],"iron":["#a76a4c","#43261c"],"silver":["#e8edf2","#77838e"],"gold":["#ffd54a","#9b6200"],"platinum":["#eef3f7","#7c8791"],"diamond":["#d9fbff","#5ea4bd"],"crystal":["#b7f5ff","#3a7c91"],"cobalt":["#4d88ed","#183c83"],"emerald":["#34dc79","#07572e"],"ruby":["#ff4157","#70101c"],"sapphire":["#338cff","#082c74"],"obsidian":["#3b3f48","#090b0e"],"titanium":["#c7d2de","#56616d"],"iridium":["#a96cff","#4b2379"],"onyx":["#3e424a","#111317"],"moonstone":["#dfe8ff","#697895"],"sunstone":["#ffc94c","#8b5a00"],"mithril":["#9fe7ff","#3b7084"],"starsteel":["#f0d27b","#70592a"],"astral":["#bb8cff","#4d2d79"],"ancient":["#a9865d","#4a3824"],"void":["#5d4d78","#17121e"]};
const NAMES=["Kőbánya", "Rézbánya", "Vasérc-bánya", "Ezüstbánya", "Aranybánya", "Platinabánya", "Gyémántbánya", "Kristálybánya", "Kobaltbánya", "Smaragdbánya", "Rubintbánya", "Zafírbánya", "Obszidiánbánya", "Titánbánya", "Irídiumbánya", "Ónixbánya", "Holdkőbánya", "Napkőbánya", "Mithrilbánya", "Csillagacél-bánya", "Asztrálbánya", "Ősi bánya", "Void-bánya", "Kristálybarlang"];
function level(){const p=window.S&&window.S.profile;if(p&&p.level)return +p.level;const m=(document.body.innerText||'').match(/LV\s*(\d+)/);return +(m&&m[1]||1)}
function svg(type,large){const p=C[type]||C.stone,id='m'+Math.random().toString(36).slice(2);return `<svg class="ore-real ${large?'big':''}" viewBox="0 0 120 100"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient></defs><path d="M10 70L22 31 51 10 91 22 110 57 87 88 42 94Z" fill="url(#${id})" stroke="${p[1]}" stroke-width="5"/><path d="M22 50L50 31 79 40 93 64 67 75 38 68Z" fill="rgba(255,255,255,.17)"/><path d="M51 11L50 31M79 23L79 40M38 68L42 93" stroke="rgba(255,255,255,.3)" stroke-width="4"/><circle cx="82" cy="54" r="5" fill="rgba(255,255,255,.72)"/></svg>`}
function miner(){return `<div class="miner-real"><div class="helmet"></div><div class="head"></div><div class="torso"></div><div class="arm a"></div><div class="arm b"></div><div class="leg l"></div><div class="leg r"></div><div class="pick"><i></i></div></div>`}
function toast(t){if(typeof window.toast==='function')window.toast(t);else{let x=document.getElementById('mine50toast');if(!x){x=document.createElement('div');x.id='mine50toast';document.body.appendChild(x)}x.textContent=t;x.classList.add('on');setTimeout(()=>x.classList.remove('on'),2200)}}
async function hit(i){const r=ROCKS[i-1];if(!r)return;if(level()<r[2])return toast('🔒 '+r[0]+' csak LV '+r[2]+' szinttől üthető');try{if(typeof sb==='undefined'||!sb?.rpc)throw Error('A szerverkapcsolat nem elérhető');const q=await sb.rpc('mining_select_mine',{p_mine:r[3]});if(q.error)throw q.error;if(typeof window.mineHit!=='function')throw Error('A bányászat nem elérhető');await window.mineHit();render()}catch(e){toast('❌ '+(e.message||'Hiba'))}}
function render(){const art=document.querySelector('.hero-art');if(!art)return;let scene=document.getElementById('realMinerScene');if(!scene){scene=document.createElement('div');scene.id='realMinerScene';art.prepend(scene)}const chosen=+(art.dataset.rock50||1),r=ROCKS[chosen-1]||ROCKS[0];scene.innerHTML=`<div class="cave-glow"></div>${miner()}<div class="big-rock">${svg(r[1],true)}</div><div class="item-label">${svg(r[1],true)}<b>${r[0]}</b><small>LV ${r[2]} • ${NAMES[r[3]-1]}</small></div>`;let grid=document.getElementById('mine50grid');if(!grid){grid=document.createElement('div');grid.id='mine50grid';art.appendChild(grid)}grid.innerHTML=ROCKS.map((r,i)=>{const open=level()>=r[2];return `<button class="mine50-rock ${open?'open':'locked'}" data-rock="${i+1}">${svg(r[1],false)}<b>${i+1}. ${r[0]}</b><small>LV ${r[2]}</small>${open?'':'<em>🔒</em>'}</button>`}).join('');grid.querySelectorAll('[data-rock]').forEach(b=>b.addEventListener('click',()=>{art.dataset.rock50=b.dataset.rock;render();hit(+b.dataset.rock)}))}
function style(){if(document.getElementById('realMinerStyle'))return;const s=document.createElement('style');s.id='realMinerStyle';s.textContent=`#realMinerScene{position:absolute;left:7px;right:7px;top:7px;height:230px;border:1px solid #8b681f;border-radius:18px;background:radial-gradient(circle at 72% 55%,#3a2c16,#0b0b0b 68%);overflow:hidden;z-index:8;box-shadow:inset 0 0 35px #000}.cave-glow{position:absolute;right:10%;top:30px;width:160px;height:160px;border-radius:50%;background:rgba(255,196,53,.1);filter:blur(20px)}.miner-real{position:absolute;left:22%;bottom:18px;width:115px;height:185px;z-index:3}.helmet{position:absolute;left:31px;top:2px;width:55px;height:25px;border-radius:30px 30px 9px 9px;background:linear-gradient(#ffe17b,#a56d10);border:3px solid #ffea9c}.head{position:absolute;left:46px;top:23px;width:31px;height:37px;border-radius:11px;background:#b87845;border:3px solid #623c26}.torso{position:absolute;left:31px;top:58px;width:61px;height:74px;border-radius:15px;background:linear-gradient(#68757c,#20262a);border:3px solid #aeb9bc}.arm{position:absolute;width:18px;height:76px;border-radius:12px;background:#697175;border:3px solid #303437;transform-origin:9px 9px}.arm.a{left:14px;top:62px;transform:rotate(34deg)}.arm.b{left:82px;top:62px;transform:rotate(-57deg)}.leg{position:absolute;top:127px;width:21px;height:55px;border-radius:11px;background:#34393e;border:3px solid #111}.leg.l{left:34px;transform:rotate(6deg)}.leg.r{left:67px;transform:rotate(-6deg)}.pick{position:absolute;left:58px;top:45px;width:112px;height:8px;background:#70401e;border-radius:8px;transform-origin:8px 4px;transform:rotate(-38deg);animation:pickhit .72s ease-in-out infinite alternate;z-index:5}.pick i{position:absolute;left:73px;top:-11px;width:49px;height:18px;border:7px solid #bfc5c9;border-bottom:0;border-radius:30px 30px 0 0}@keyframes pickhit{to{transform:rotate(24deg) translate(8px,12px)}}.big-rock{position:absolute;right:12%;bottom:16px;width:150px;height:115px;z-index:2}.big-rock .ore-real{width:150px;height:120px;filter:drop-shadow(0 10px 5px #000)}.item-label{position:absolute;right:5%;top:8px;width:108px;text-align:center;background:#0a0a0ae8;border:1px solid #a47b28;border-radius:12px;padding:2px;color:#f9dd7d;z-index:9}.item-label .ore-real{width:62px;height:48px}.item-label b{display:block;font-size:12px}.item-label small{display:block;font-size:8px;color:#bdb4a0}#mine50grid{position:absolute;left:7px;right:7px;top:245px;bottom:7px;z-index:7;display:grid;grid-template-columns:repeat(5,1fr);grid-auto-rows:68px;gap:6px;overflow:auto;padding:3px}.mine50-rock{min-width:0;border:1px solid #755a20;border-radius:12px;background:linear-gradient(145deg,#17130b,#090909);color:#f4df9d;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2px;box-shadow:inset 0 1px #fff1}.mine50-rock.open{border-color:#b08428;cursor:pointer}.mine50-rock.locked{opacity:.38;filter:grayscale(.55)}.mine50-rock b{font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.mine50-rock small{font-size:7px;color:#aaa08e}.mine50-rock em{font-style:normal;font-size:10px}.ore-real{width:48px;height:40px;display:block;margin:auto}@media(max-width:380px){#mine50grid{grid-template-columns:repeat(4,1fr)}}`;document.head.appendChild(s)}
style();new MutationObserver(()=>setTimeout(render,100)).observe(document.body,{subtree:true,childList:true});setTimeout(render,700);setInterval(render,1800);
})();