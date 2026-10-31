(function(){
  'use strict';
  const OWNER='10ec718e-2863-46be-8706-ab040e4d6f3c';
  let allowed=false;
  let originalPage=null;

  async function checkOwner(){
    try{
      let uid='';
      if(typeof sb!=='undefined' && sb?.auth?.getUser){
        const r=await sb.auth.getUser();
        uid=r?.data?.user?.id||'';
      }
      if(!uid && typeof S!=='undefined' && S?.profile?.id) uid=S.profile.id;
      allowed=uid===OWNER || (typeof S!=='undefined' && S?.is_admin===true && uid===OWNER);
    }catch(e){ allowed=false; }
    apply();
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
  }

  function installPageGuard(){
    if(typeof window.page!=='function' || window.page===originalPage) return;
    originalPage=window.page;
    window.page=function(id){
      if(id==='admin' && !allowed){
        try{ if(typeof toast==='function') toast('⛔ Ez az admin felület csak a tulajdonosnak érhető el.'); }catch(e){}
        return;
      }
      return originalPage.apply(this,arguments);
    };
  }

  function addOwnerAdminCard(){
    if(!allowed) return;
    const extras=document.getElementById('extras');
    if(!extras || extras.querySelector('[data-owner-admin-card]')) return;
    const card=document.createElement('div');
    card.setAttribute('data-owner-admin-card','1');
    card.className='card row';
    card.innerHTML='<main><b>👑 Admin felület</b><small>Csak a játék tulajdonosa láthatja</small></main><button class="btn primary">BELÉPÉS</button>';
    card.querySelector('button').onclick=function(){window.page('admin');};
    const list=extras.querySelector('.list');
    if(list) list.insertBefore(card,list.firstChild);
  }

  function tick(){
    installPageGuard();
    if(typeof S!=='undefined' && S?.profile?.id===OWNER) allowed=true;
    apply();
    addOwnerAdminCard();
  }

  const boot=setInterval(tick,500);
  setTimeout(()=>clearInterval(boot),30000);
  setTimeout(checkOwner,500);
  setTimeout(checkOwner,1500);
  setTimeout(checkOwner,3000);
  document.addEventListener('click',function(){
    if(typeof S!=='undefined' && S?.profile?.id===OWNER) allowed=true;
    tick();
  },true);
})();
