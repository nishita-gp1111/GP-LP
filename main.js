'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu(){nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
document.querySelectorAll('[data-feature]').forEach(detail=>detail.addEventListener('toggle',()=>{
 if(!detail.open||!window.GP_FEATURES)return;
 document.querySelectorAll('[data-feature]').forEach(other=>{if(other!==detail)other.open=false;});
 const feature=window.GP_FEATURES[Number(detail.dataset.feature)];
 ['label','title','stat','description','note'].forEach((part,i)=>{const el=document.getElementById('feature-'+part);if(el)el.textContent=feature[i+2];});
}));
