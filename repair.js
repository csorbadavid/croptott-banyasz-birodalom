(function(){
const ADMIN_ID='79eb397b-c141-4c11-b381-d3cce655eed0';
const rows=`Mészkőbánya|limestone|Mészkő|🪨|10
Gránitbánya|granite|Gránit|🪨|15
Bazaltbánya|basalt|Bazalt|⬛|20
Homokkőbánya|sandstone|Homokkő|🟫|25
Palabánya|slate|Pala|◼️|30
Lignitbánya|lignite|Lignit|🟤|35
Feketekőszén-bánya|hardcoal|Feketekőszén|⚫|40
Antracitbánya|anthracite|Antracit|⬛|45
Rézércbánya|copper|Rézérc|🟧|55
Vasércbánya|iron|Vasérc|🔩|65
Bauxitbánya|bauxite|Bauxit|🟥|75
Mangánércbánya|manganese|Mangánérc|🟪|85
Cinkércbánya|zinc|Cinkérc|⬜|95
Ólomércbánya|lead|Ólomérc|◾|105
Nikkelércbánya|nickel|Nikkelérc|🟩|115
Krómitbánya|chromite|Krómit|🟫|125
Kassziteritbánya|cassiterite|Kassziterit|🟨|135
Wolframitbánya|wolframite|Wolframit|⬛|145
Molibdenitbánya|molybdenite|Molibdenit|🩶|155
Kobaltbánya|cobalt|Kobaltkő|🔵|165
Grafitbánya|graphite|Grafit|⚫|175
Lítiumércbánya|lithium|Lítiumérc|🩵|185
Fluoritbánya|fluorite|Fluorit|🟣|195
Baritbánya|barite|Barit|⚪|205
Gipszbánya|gypsum|Gipsz|⬜|215
Kősóbánya|halite|Kősó|🧂|225
Kénbánya|sulfur|Kén|🟡|235
Piritbánya|pyrite|Pirit|🟨|245
Ezüstércbánya|silver|Ezüstérc|⚪|260
Aranyércbánya|gold|Aranyérc|🟨|280
Platinaércbánya|platinum|Platinaérc|⬜|300
Palládiumércbánya|palladium|Palládiumérc|◻️|320
Ródiumércbánya|rhodium|Ródiumérc|🔘|340
Irídiumércbánya|iridium|Irídiumérc|🟣|360
Ozmiumércbánya|osmium|Ozmiumérc|⚫|380
Rutilbánya|rutile|Rutil|🔴|400
Ilmenitbánya|ilmenite|Ilmenit|🖤|420
Cirkonbánya|zircon|Cirkon|🔷|440
Monacitbánya|monazite|Monacit|🟠|460
Bastnäsitbánya|bastnasite|Bastnäsit|🟡|480
Smaragdbánya|emerald|Smaragd|💚|520
Rubinbánya|ruby|Rubin|❤️|550
Zafírbánya|sapphire|Zafír|💙|580
Turmalinbánya|tourmaline|Turmalin|🩷|610
Ametisztbánya|amethyst|Ametiszt|💜|640
Topázbánya|topaz|Topáz|🟠|670
Opálbánya|opal|Opál|🤍|700
Gyémántbánya|diamond|Gyémánt|💎|750
Kvarckristály-bánya|quartz|Kvarckristály|🔷|800
Obszidiánbánya|obsidian|Obszidián|⬛|850
Titánércbánya|titanium|Titánérc|⚙️|900
Vanádiumércbánya|vanadium|Vanádiumérc|🟦|950
Tantálércbánya|tantalum|Tantálérc|⬜|1000
Nióbiumércbánya|niobium|Nióbiumérc|🔹|1050
Uránércbánya|uranium|Uránérc|☢️|1100
Tóriumércbánya|thorium|Tóriumérc|🟢|1150
Berkéliumbánya|berkelium|Berkélium|🟣|1200
Kalifornium-bánya|californium|Kalifornium|🟠|1250
Tellúrércbánya|tellurium|Tellúrérc|🟡|1300
Germániumércbánya|germanium|Germániumérc|🩶|1350
Bizmutércbánya|bismuth|Bizmutérc|🌈|1400
Galliumércbánya|gallium|Galliumérc|🔵|1450
Szelénércbánya|selenium|Szelénérc|🔴|1500
Indiumércbánya|indium|Indiumérc|⚪|1550
Hafniumércbánya|hafnium|Hafniumérc|⬜|1600
Réniumbánya|rhenium|Réniumérc|🔘|1650
Skandiumércbánya|scandium|Skandiumérc|🟦|1700
Stronciumércbánya|strontium|Stronciumérc|🟩|1750
Bórásvány-bánya|boron|Bórásvány|🟤|1800
Berilliumércbánya|beryllium|Berilliumérc|🟢|1900`.split('\n').map(x=>x.split('|'));
const H70=rows.map((_,i)=>100+i*i*80),fmt70=n=>Number(n||0).toLocaleString('hu-HU');
function gear(){if(!S)return;const st=S.state,u=S.upgrades||{},a=document.getElementById('picks'),b=document.getElementById('upgrades');if(a&&window.PICKS)a.innerHTML=PICKS.map((x,i)=>`<div class="card row"><div class="ico">${x[1]}</div><main><b>${x[0]}</b><small>${x[2]} alap sebzés • feloldás Lv ${x[4]} • ${fmt70(x[3])} Ft</small></main><button class="btn ${st.selected_pick===i+1?'green':''}" onclick="buyPick(${i+1})">${st.selected_pick===i+1?'FELSZERELVE':i===0?'INGYENES':'MEGVESZEM'}</button></div>`).join('');if(b)b.innerHTML=[['pick','⛏️','Csákányerő',u.pick_upgrade,5000,'+5 sebzés'],['machine','🏭','Bányagép',u.machine_level,8000,'géperő'],['xp','⭐','XP-fejlesztés',u.xp_upgrade,6500,'+3 XP/ütés'],['offline','🕳️','Bányagép-rendszer',u.offline_upgrade,7000,'fejlesztett gépek']].map(x=>{const c=x[4]*(x[3]+1)**2;return `<div class="row"><div class="ico">${x[1]}</div><main><b>${x[2]} • LV ${x[3]}</b><small>${x[5]} • következő: ${fmt70(c)} Ft</small></main><button class="btn" onclick="upgrade('${x[0]}')">FEJLESZTÉS</button></div>`}).join('')}
function mines(){if(!S)return;const e=document.getElementById('minesList');if(e)e.innerHTML=rows.map((m,i)=>{const ok=Number(S.profile?.level||1)>=i+1,active=Number(S.state?.selected_mine||1)===i+1;return `<div class="card row"><div class="ico">${m[3]}</div><main><b>${i+1}. ${m[0]}</b><small>LV ${i+1} • ${fmt70(H70[i])} HP • ${m[2]}</small></main><button class="btn ${active?'green':''}" ${ok?'':'disabled'} onclick="selectMine(${i+1})">${active?'AKTÍV':ok?'BELÉPÉS':'🔒 LV '+(i+1)}</button></div>`}).join('');const t=document.querySelector('#mines .sub');if(t)t.textContent='70 egyedi lelőhely • minden bánya saját szinthez kötve'}
function ores(){if(!S)return;const e=document.getElementById('marketSell');if(e)e.innerHTML='<div class="list">'+rows.map(m=>{const q=Number(S.ores?.[m[1]]||0);return `<div class="card row"><div class="ico">${m[3]}</div><main><b>${m[2]}</b><small>${fmt70(q)} db • egységár <span class="price">${fmt70(m[4])} Ft</span></small></main><button class="btn" onclick="sellOre('${m[1]}')">ELADÁS</button></div>`}).join('')+'</div>';const inv=document.getElementById('inventoryList');if(inv)inv.innerHTML=rows.map(m=>{const q=Number(S.ores?.[m[1]]||0);return `<div class="card row"><div class="ico">${m[3]}</div><main><b>${m[2]}</b><small>${fmt70(q)} db • összérték ${fmt70(q*m[4])} Ft</small></main><span class="price">${fmt70(m[4])} Ft</span></div>`}).join('')}
function all(){if(!S?.profile||!S?.state)return;const p=S.profile,st=S.state,u=S.upgrades||{},o=S.ores||{},mi=Math.max(0,Math.min(69,Number(st.selected_mine||1)-1)),set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};set('userName',p.username);set('userLevel',p.level);set('userXp',fmt70(p.xp));set('money',fmt70(p.money));set('gems',fmt70(st.gems));const lv=Number(p.level||1),aa=(lv-1)*250+(lv-1)**2*80,bb=lv*250+lv**2*80,xb=document.getElementById('xpBar');if(xb)xb.style.width=Math.max(0,Math.min(100,(p.xp-aa)/Math.max(1,bb-aa)*100))+'%';set('mineName',rows[mi][0]+' • '+(mi+1)+'. szint');const pk=(window.PICKS||[])[Math.max(0,(st.selected_pick||1)-1)]||(window.PICKS||[])[0];set('pickInfo',pk?pk[0]+' • '+(pk[2]+(u.pick_upgrade||0)*5+(u.machine_level||0)*2)+' sebzés':'Felszerelés');set('hpText',fmt70(st.rock_hp)+' / '+fmt70(H70[mi])+' HP');const hp=document.getElementById('hpBar');if(hp)hp.style.width=Math.max(0,Math.min(100,Number(st.rock_hp)/H70[mi]*100))+'%';set('rock',rows[mi][3]);set('oreGlow',rows[Math.min(69,mi+1)][3]);set('hits',fmt70(st.hits));set('machine',fmt70(u.machine_level));set('oreTotal',fmt70(Object.values(o).reduce((a,b)=>a+Number(b),0)));const ho=document.getElementById('homeOres');if(ho)ho.innerHTML=rows.slice(0,6).map(m=>`<div class="ore"><div class="ico">${m[3]}</div><b>${fmt70(o[m[1]]||0)}</b><small>${m[2]}</small></div>`).join('');mines();gear();ores();try{renderQuests()}catch(_){}try{renderDaily()}catch(_){}try{renderProfile()}catch(_){}try{renderSocial()}catch(_){}admin()}
function nav(id){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===id));document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('on',x.dataset.page===id));window.scrollTo({top:0,behavior:'smooth'});if(id==='mines')mines();if(id==='gear')gear();if(id==='market'||id==='inventory')ores();if(id==='rank'&&window.loadRank)loadRank();if(id==='clans'&&window.loadClans)loadClans();if(id==='payout'&&window.loadPayouts)loadPayouts();if(id==='support'&&window.loadTickets)loadTickets();if(id==='news'&&window.loadNews)loadNews();if(id==='admin'&&window.loadAdmin)loadAdmin()}
function admin(){const b=document.getElementById('adminMenu');if(b&&S?.is_admin)b.classList.remove('hidden');const ex=document.querySelector('#extras .menu-grid');if(ex&&S?.is_admin&&!document.getElementById('adminMenuQuick')){const x=document.createElement('button');x.id='adminMenuQuick';x.className='card menu';x.innerHTML='<strong>👑 Admin központ</strong><span>Játékosok, XP, tiltás, beállítások</span>';x.onclick=()=>nav('admin');ex.appendChild(x)}}
window.renderAll=all;window.renderMines=mines;window.renderGear=gear;window.show=nav;const timer=setInterval(()=>{if(S&&document.getElementById('app')){all();clearInterval(timer)}},250);setTimeout(()=>{all()},1500);
})();