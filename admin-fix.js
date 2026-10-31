(function(){
  'use strict';
  const OWNER='10ec718e-2863-46be-8706-ab040e4d6f3c';
  const EXTRA_ADMIN='9298c6bc-c609-4712-907a-b8bf777411b2';
  let allowed=false;
  let originalPage=null;
  let authBound=false;

  function getUid(){
    try{
      if(globalThis.S?.profile?.id) return String(globalThis.S.profile.id);
      if(globalThis.S?.user?.id) return String(globalThis.S.user.id);
    }catch(e){}
    return '';
  }

  async function checkOwner(){
    try{
      let uid=getUid();
      const client=globalThis.sb;
      if(client?.auth?.getUser){
        const r=await client.auth.getUser();
        uid=String(r?.data?.user?.id||uid||'');
      }
      allowed=(uid===OWNER || uid===EXTRA_ADMIN);
      if(!allowed && client?.rpc){
        try{
          const r=await client.rpc('admin_dashboard');
          if(!r?.error) allowed=true;
        }catch(e){}
      }
    }catch(e){
      const uid=getUid();
      allowed=(uid===OWNER || uid===EXTRA_ADMIN);
    }
    apply();
    addOwnerAdminCard();
    addOwnerAdminButton();
    return allowed;
  }

  function apply(){
    const entry=document.getElementById('adminEntry');
    if(entry){
      entry.classList.toggle('hide',!allowed);
      entry.style.display=allowed?'flex':'none';
    }
    document.querySelectorAll('[data-admin-only]').forEach(x=>{
      x.style.display=allowed?'':'none';
    });
    document.querySelectorAll('[data-owner-admin]').forEach(x=>{
      x.style.display=allowed?'':'none';
    });
  }

  function installPageGuard(){
    if(typeof window.page!=='function' || window.page===originalPage) return;
    originalPage=window.page;
    window.page=function(id){
      if((id==='admin'||id==='systemsAdmin') && !allowed){
        try{ if(typeof toast==='function') toast('⛔ Ez az admin felület csak a tulajdonosnak érhető el.'); }catch(e){}
        return;
      }
      return originalPage.apply(this,arguments);
    };
  }

  function openAdmin(){
    if(!allowed) return;
    if(typeof window.page==='function') window.page('admin');
    else if(typeof window.sysShow==='function') window.sysShow('systemsAdmin');
  }

  function addOwnerAdminCard(){
    if(!allowed) return;
    const extras=document.getElementById('extras');
    if(!extras || extras.querySelector('[data-owner-admin-card]')) return;
    const card=document.createElement('div');
    card.setAttribute('data-owner-admin-card','1');
    card.setAttribute('data-owner-admin','1');
    card.className='card row';
    card.style.cssText='display:flex!important;align-items:center;gap:10px;margin:10px 0;border:1px solid #d6a72c;box-shadow:0 0 12px rgba(214,167,44,.22);';
    card.innerHTML='<main><b>👑 ADMIN FELÜLET</b><small>Csorba Dávid_1 • szerverkezelés</small></main><button class="btn primary" type="button">MEGNYITÁS</button>';
    card.querySelector('button').onclick=openAdmin;
    const list=extras.querySelector('.list');
    (list||extras).prepend(card);
  }

  function addOwnerAdminButton(){
    if(!allowed || document.getElementById('ownerAdminFloating')) return;
    const b=document.createElement('button');
    b.id='ownerAdminFloating';
    b.setAttribute('data-owner-admin','1');
    b.type='button';
    b.textContent='👑 ADMIN';
    b.title='Admin felület';
    b.onclick=openAdmin;
    b.style.cssText='position:fixed;top:10px;right:10px;z-index:99999;background:#d6a72c;color:#080808;border:1px solid #ffe28a;border-radius:999px;padding:8px 12px;font-weight:900;box-shadow:0 0 14px rgba(214,167,44,.45);font-size:12px;';
    document.body.appendChild(b);
  }

  function bindAuth(){
    if(authBound) return;
    const client=globalThis.sb;
    if(client?.auth?.onAuthStateChange){
      authBound=true;
      client.auth.onAuthStateChange(function(){ setTimeout(checkOwner,50); });
    }
  }

  function tick(){
    bindAuth();
    installPageGuard();
    if(getUid()===OWNER || getUid()===EXTRA_ADMIN) allowed=true;
    apply();
    addOwnerAdminCard();
    addOwnerAdminButton();
  }

  const boot=setInterval(tick,500);
  setTimeout(()=>clearInterval(boot),60000);
  [250,750,1500,3000,6000].forEach(t=>setTimeout(checkOwner,t));
  document.addEventListener('click',function(){tick();},true);
})();
