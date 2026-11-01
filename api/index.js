const BASE='https://raw.githubusercontent.com/csorbadavid/croptott-banyasz-birodalom/main/';
const VERSION='fix-20261101-01';

export default async function handler(req,res){
  try{
    const get=async(path)=>{const r=await fetch(`${BASE}${path}?v=${VERSION}&t=${Date.now()}`,{cache:'no-store'});if(!r.ok)throw new Error(`${path} ${r.status}`);return r.text()};
    let html=await get('index.html');
    const css=await get('redesign.css');
    const design=await get('redesign.js');
    const fix=`<script data-croptott-fix>(function(){
function adminVisible(){try{var n=document.getElementById('userName');if(n&&n.textContent.trim()==='Csorba'){var a=document.getElementById('adminMenu');if(a)a.classList.remove('hidden')}}catch(e){}}
async function safeRefresh(){try{S=await rpc('mining_bootstrap');try{SOCIAL=await rpc('croptott_social_bootstrap')}catch(e){}renderAll();adminVisible()}catch(e){showErr(e)}}
window.refresh=safeRefresh;
window.buyPick=async function(i){try{var r=await rpc('mining_buy_pick',{p_pick:i});await safeRefresh();toast((r&&r.name?r.name:'Felszerelés')+' felszerelve!')}catch(e){showErr(e)}};
window.upgrade=async function(k){try{var r=await rpc('mining_upgrade',{p_kind:k});await safeRefresh();toast('Fejlesztés megvásárolva • LV '+(r&&r.level||''))}catch(e){showErr(e)}};
var t=setInterval(function(){if(document.getElementById('app')){clearInterval(t);adminVisible()}},300);
})();</script>`;
    const last=html.lastIndexOf('</body>');
    const inject=`<style data-croptott-modern>${css}</style><script data-croptott-modern>${design.replace(/<\\/script/gi,'<\\/script')}</script>${fix}`;
    html=last>=0?html.slice(0,last)+inject+html.slice(last):html+inject;
    res.setHeader('Cache-Control','no-store,no-cache,must-revalidate');
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.status(200).send(html);
  }catch(e){res.status(500).send('Croptott error: '+(e.message||e));}
}
