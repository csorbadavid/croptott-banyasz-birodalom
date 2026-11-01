(function(){
const ADMIN_ID='79eb397b-c141-4c11-b381-d3cce655eed0';
const rows=`Mészkőbánya|limestone|Mészkő|#b9b3a8|10
Gránitbánya|granite|Gránit|#77746e|15
Bazaltbánya|basalt|Bazalt|#3b3a38|20
Homokkőbánya|sandstone|Homokkő|#c99a63|25
Palabánya|slate|Pala|#4f5660|30
Lignitbánya|lignite|Lignit|#51402f|35
Feketekőszén-bánya|hardcoal|Feketekőszén|#202124|40
Antracitbánya|anthracite|Antracit|#17181a|45
Rézércbánya|copper|Rézérc|#b76d3b|55
Vasércbánya|iron|Vasérc|#76645a|65
Bauxitbánya|bauxite|Bauxit|#9f5139|75
Mangánércbánya|manganese|Mangánérc|#604b58|85
Cinkércbánya|zinc|Cinkérc|#a6a9aa|95
Ólomércbánya|lead|Ólomérc|#4d5054|105
Nikkelércbánya|nickel|Nikkelérc|#66726a|115
Krómitbánya|chromite|Krómit|#252a2b|125
Kassziteritbánya|cassiterite|Kassziterit|#8b7652|135
Wolframitbánya|wolframite|Wolframit|#292b2d|145
Molibdenitbánya|molybdenite|Molibdenit|#70757a|155
Kobaltbánya|cobalt|Kobaltkő|#405f83|165
Grafitbánya|graphite|Grafit|#303133|175
Lítiumércbánya|lithium|Lítiumérc|#b9c8ce|185
Fluoritbánya|fluorite|Fluorit|#765ca3|195
Baritbánya|barite|Barit|#d8d8d1|205
Gipszbánya|gypsum|Gipsz|#dedbd1|215
Kősóbánya|halite|Kősó|#eee8d8|225
Kénbánya|sulfur|Kén|#c9aa26|235
Piritbánya|pyrite|Pirit|#b58a25|245
Ezüstércbánya|silver|Ezüstérc|#bfc2c5|260
Aranyércbánya|gold|Aranyérc|#d6a52c|280
Platinaércbánya|platinum|Platinaérc|#c9c8c1|300
Palládiumércbánya|palladium|Palládiumérc|#a9afb3|320
Ródiumércbánya|rhodium|Ródiumérc|#8f969b|340
Irídiumércbánya|iridium|Irídiumérc|#665b73|360
Ozmiumércbánya|osmium|Ozmiumérc|#383a3c|380
Rutilbánya|rutile|Rutil|#a95745|400
Ilmenitbánya|ilmenite|Ilmenit|#35373a|420
Cirkonbánya|zircon|Cirkon|#4f8ea5|440
Monacitbánya|monazite|Monacit|#b06b3f|460
Bastnäsitbánya|bastnasite|Bastnäsit|#b19a42|480
Smaragdbánya|emerald|Smaragd|#19845a|520
Rubinbánya|ruby|Rubin|#a62d35|550
Zafírbánya|sapphire|Zafír|#275e9d|580
Turmalinbánya|tourmaline|Turmalin|#a24b75|610
Ametisztbánya|amethyst|Ametiszt|#76519e|640
Topázbánya|topaz|Topáz|#c58b45|670
Opálbánya|opal|Opál|#d8d2c4|700
Gyémántbánya|diamond|Gyémánt|#8fc6d2|750
Kvarckristály-bánya|quartz|Kvarckristály|#b7cbd0|800
Obszidiánbánya|obsidian|Obszidián|#17191d|850
Titánércbánya|titanium|Titánérc|#7d8487|900
Vanádiumércbánya|vanadium|Vanádiumérc|#4c7080|950
Tantálércbánya|tantalum|Tantálérc|#85898a|1000
Nióbiumércbánya|niobium|Nióbiumérc|#5d8392|1050
Uránércbánya|uranium|Uránérc|#6d9650|1100
Tóriumércbánya|thorium|Tóriumérc|#547b5d|1150
Berkéliumbánya|berkelium|Berkélium|#654e83|1200
Kalifornium-bánya|californium|Kalifornium|#a36b4a|1250
Tellúrércbánya|tellurium|Tellúrérc|#a18c39|1300
Germániumércbánya|germanium|Germániumérc|#72777a|1350
Bizmutércbánya|bismuth|Bizmutérc|#8c7182|1400
Galliumércbánya|gallium|Galliumérc|#597c91|1450
Szelénércbánya|selenium|Szelénérc|#8b514b|1500
Indiumércbánya|indium|Indiumérc|#a4a8aa|1550
Hafniumércbánya|hafnium|Hafniumérc|#888c8e|1600
Réniumbánya|rhenium|Réniumérc|#676d70|1650
Skandiumbánya|scandium|Skandiumérc|#5e7c89|1700
Stronciumércbánya|strontium|Stronciumérc|#607b67|1750
Bórásvány-bánya|boron|Bórásvány|#755e48|1800
Berilliumércbánya|beryllium|Berilliumérc|#65935f|1900`.split('\n').map(x=>x.split('|'));
const H70=rows.map((_,i)=>100+i*i*80),fmt70=n=>Number(n||0).toLocaleString('hu-HU');
function mineralIcon(row,size=46){const c=row[3],id=row[1],n=rows.indexOf(row);const hue2=['#f4f1e8','#8b8d91','#22252a','#fff4cf','#d8dce0','#6f6254','#3b3c40','#050608','#e7a16e','#b18f7c','#c87555','#8b7182','#d8dde0','#8d9094','#9daaa1','#565b5e','#d0b47d','#575b60','#aeb4b8','#719bc2','#55585c','#e2edf0','#b49ad8','#f0eee7','#f5f2e7','#ffffff','#f0c83d','#e4bd4a','#f0f1f2','#ffe27b','#f4f2e8','#d8dde0','#c8d2d7','#bcaac7','#70757c','#e58a75','#62666b','#84c5dd','#e5a17c','#d8c06d','#4de0a5','#ef5b66','#69a4ff','#ed78b4','#b58ae6','#ffd47d','#f2f1e8','#e8fbff','#252831','#aeb5b8','#74a9bd','#c8cbd0','#84a9b8','#9bd46e','#76ad8b','#a988c9','#d18c67','#d4c05e','#a9adb0','#d6b0c4','#8abbd6','#d7a29a','#cfd3d5','#c6d0d3','#aab0b5','#8fb0bb','#91aa9b','#b79b7c','#9fc08e'][n]||'#fff';const uid='m'+id;const crystal=/emerald|ruby|sapphire|tourmaline|amethyst|topaz|opal|diamond|quartz|zircon|fluorite/.test(id);const gem=crystal?`<path d="M14 31 23 12 42 9 54 25 43 49 22 53Z" fill="url(#${uid})" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/><path d="M23 12 31 29 42 9M31 29 54 25M31 29 43 49M31 29 22 53" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/><path d="M23 15 37 12" stroke="#fff" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>`:`<path d="M7 38 15 18 31 8 51 16 58 35 48 52 28 57 12 50Z" fill="url(#${uid})" stroke="#111" stroke-opacity=".5" stroke-width="2"/><path d="M15 18 29 31 31 8M29 31 58 35M29 31 28 57M29 31 12 50M29 31 48 52" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="2"/><path d="M16 22 27 16" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/><circle cx="45" cy="22" r="3" fill="${hue2}" fill-opacity=".55"/><circle cx="19" cy="42" r="2.5" fill="${hue2}" fill-opacity=".4"/>`;return `<svg class="mineral-icon" width="${size}" height="${size}" viewBox="0 0 64 64" aria-label="${row[2]}" role="img"><defs><radialGradient id="${uid}" cx="30%" cy="20%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".16" stop-color="${hue2}"/><stop offset=".48" stop-color="${c}"/><stop offset="1" stop-color="#090a0c"/></radialGradient><filter id="sh${uid}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".55"/></filter></defs><g filter="url(#sh${uid})">${gem}</g></svg>`}
function gear(){if(!S)return;const st=S.state,u=S.upgrades||{},a=document.getElementById('picks'),b=document.getElementById('upgrades');if(a&&window.PICKS)a.innerHTML=PICKS.map((x,i)=>`<div class="card row"><div class="ico">⛏</div><main><b>${x[0]}</b><small>${x[2]} alap sebzés • feloldás Lv ${x[4]} • ${fmt70(x[3])} Ft</small></main><button class="btn ${st.selected_pick===i+1?'green':''}" onclick="buyPick(${i+1})">${st.selected_pick===i+1?'FELSZERELVE':i===0?'INGYENES':'MEGVESZEM'}</button></div>`).join('');if(b)b.innerHTML=[['pick','Csákányerő',u.pick_upgrade,5000,'+5 sebzés'],['machine','Bányagép',u.machine_level,8000,'géperő'],['xp','XP-fejlesztés',u.xp_upgrade,6500,'+3 XP/ütés'],['offline','Bányagép-rendszer',u.offline_upgrade,7000,'fejlesztett gépek']].map(x=>{const c=x[3]*(x[2]+1)**2;return `<div class="row"><div class="ico">⚙</div><main><b>${x[1]} • LV ${x[2]}</b><small>${x[4]} • következő: ${fmt70(c)} Ft</small></main><button class="btn" onclick="upgrade('${x[0]}')">FEJLESZTÉS</button></div>`}).join('')}
function mines(){if(!S)return;const e=document.getElementById('minesList');if(e)e.innerHTML=rows.map((m,i)=>{const ok=Number(S.profile?.level||1)>=i+1,active=Number(S.state?.selected_mine||1)===i+1;return `<div class="card row"><div class="ico mineral-slot">${mineralIcon(m,52)}</div><main><b>${i+1}. ${m[0]}</b><small>LV ${i+1} • ${fmt70(H70[i])} HP • ${m[2]}</small></main><button class="btn ${active?'green':''}" ${ok?'':'disabled'} onclick="selectMine(${i+1})">${active?'AKTÍV':ok?'BELÉPÉS':'🔒 LV '+(i+1)}</button></div>`}).join('');const t=document.querySelector('#mines .sub');if(t)t.textContent='70 egyedi lelőhely • minden bánya saját ércével'}
function ores(){if(!S)return;const e=document.getElementById('marketSell');if(e)e.innerHTML='<div class="list">'+rows.map(m=>{const q=Number(S.ores?.[m[1]]||0);return `<div class="card row"><div class="ico mineral-slot">${mineralIcon(m,52)}</div><main><b>${m[2]}</b><small>${fmt70(q)} db • egységár <span class="price">${fmt70(m[4])} Ft</span></small></main><button class="btn" onclick="sellOre('${m[1]}')">ELADÁS</button></div>`}).join('')+'</div>';const inv=document.getElementById('inventoryList');if(inv)inv.innerHTML=rows.map(m=>{const q=Number(S.ores?.[m[1]]||0);return `<div class="card row"><div class="ico mineral-slot">${mineralIcon(m,52)}</div><main><b>${m[2]}</b><small>${fmt70(q)} db • összérték ${fmt70(q*m[4])} Ft</small></main><span class="price">${fmt70(m[4])} Ft</span></div>`}).join('')}
function all(){if(!S?.profile||!S?.state)return;const p=S.profile,st=S.state,u=S.upgrades||{},o=S.ores||{},mi=Math.max(0,Math.min(69,Number(st.selected_mine||1)-1)),set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};set('userName',p.username);set('userLevel',p.level);set('userXp',fmt70(p.xp));set('money',fmt70(p.money));set('gems',fmt70(st.gems));const lv=Number(p.level||1),aa=(lv-1)*250+(lv-1)**2*80,bb=lv*250+lv**2*80,xb=document.getElementById('xpBar');if(xb)xb.style.width=Math.max(0,Math.min(100,(p.xp-aa)/Math.max(1,bb-aa)*100))+'%';set('mineName',rows[mi][0]+' • '+(mi+1)+'. szint');const pk=(window.PICKS||[])[Math.max(0,(st.selected_pick||1)-1)]||(window.PICKS||[])[0];set('pickInfo',pk?pk[0]+' • '+(pk[2]+(u.pick_upgrade||0)*5+(u.machine_level||0)*2)+' sebzés':'Felszerelés');set('hpText',fmt70(st.rock_hp)+' / '+fmt70(H70[mi])+' HP');const hp=document.getElementById('hpBar');if(hp)hp.style.width=Math.max(0,Math.min(100,Number(st.rock_hp)/H70[mi]*100))+'%';const rock=document.getElementById('rock');if(rock)rock.innerHTML=mineralIcon(rows[mi],100);const glow=document.getElementById('oreGlow');if(glow)glow.innerHTML=mineralIcon(rows[Math.min(69,mi+1)],64);set('hits',fmt70(st.hits));set('machine',fmt70(u.machine_level));set('oreTotal',fmt70(Object.values(o).reduce((a,b)=>a+Number(b),0)));const ho=document.getElementById('homeOres');if(ho)ho.innerHTML=rows.slice(0,6).map(m=>`<div class="ore"><div class="ico mineral-slot">${mineralIcon(m,48)}</div><b>${fmt70(o[m[1]]||0)}</b><small>${m[2]}</small></div>`).join('');mines();gear();ores();try{renderQuests()}catch(_){}try{renderDaily()}catch(_){}try{renderProfile()}catch(_){}try{renderSocial()}catch(_){}admin()}
function nav(id){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===id));document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('on',x.dataset.page===id));window.scrollTo({top:0,behavior:'smooth'});if(id==='mines')mines();if(id==='gear')gear();if(id==='market'||id==='inventory')ores();if(id==='rank'&&window.loadRank)loadRank();if(id==='clans'&&window.loadClans)loadClans();if(id==='payout'&&window.loadPayouts)loadPayouts();if(id==='support'&&window.loadTickets)loadTickets();if(id==='news'&&window.loadNews)loadNews();if(id==='admin'&&window.loadAdmin)loadAdmin()}
function admin(){const b=document.getElementById('adminMenu');if(b&&S?.is_admin)b.classList.remove('hidden');const ex=document.querySelector('#extras .menu-grid');if(ex&&S?.is_admin&&!document.getElementById('adminMenuQuick')){const x=document.createElement('button');x.id='adminMenuQuick';x.className='card menu';x.innerHTML='<strong>👑 Admin központ</strong><span>Játékosok, XP, tiltás, beállítások</span>';x.onclick=()=>nav('admin');ex.appendChild(x)}}
window.renderAll=all;window.renderMines=mines;window.renderGear=gear;window.show=nav;const timer=setInterval(()=>{if(S&&document.getElementById('app')){all();clearInterval(timer)}},250);setTimeout(()=>{all()},1500);
})();