'use strict';
(()=>{
 const plans=window.GP_PLANS,select=document.querySelector('#plan-select');
 if(!plans||!select)return;
 const err=document.querySelector('#plan-error');
 const query=new URLSearchParams(location.search).get('plan');
 let invalid=!!query&&!plans.some(p=>p.id===query);
 if(invalid){select.selectedIndex=-1;err.hidden=false;}else select.value=query||'six';
 const text=(id,value)=>{document.getElementById(id).textContent=value;};
 function update(changed){
  const p=plans.find(p=>p.id===select.value);
  if(!p){['confirm-name','confirm-content','confirm-price','confirm-term','summary-name','summary-price','summary-term'].forEach(id=>text(id,'プランを選択してください'));return;}
  invalid=false;err.hidden=true;
  const recurring=p.id==='community';
  const price=(recurring?'月額 ':'')+p.price.toLocaleString('ja-JP')+' 円（税込）';
  text('confirm-name',p.name);text('confirm-content',p.content);text('confirm-price',price);text('summary-name',p.name);const amount=document.createTextNode(p.price.toLocaleString('ja-JP'));const suffix=document.createElement('small');suffix.textContent='円（税込）';const prefix=document.createElement('small');prefix.textContent=recurring?'月額 ':'';document.getElementById('summary-price').replaceChildren(prefix,amount,suffix);text('summary-term',p.term);
  text('confirm-term',recurring?'申込日（支払い完了日）から 1 か月ごとの更新':'申込日（支払い完了日）から '+p.months+' か月'+(p.id==='content'?'（学習コンテンツの視聴期間）':''));
  text('confirm-cancellation',recurring?'1 か月ごとの更新で、いつでも解約できます。解約の手続き・締切・適用日・返金の扱いは未定です。受付開始前に掲載します。':'キャンセル・返金・中途解約の条件・期限・手続きは未定です。受付開始前に掲載します。');
  const bank=document.querySelector('input[name="payment"]:checked')?.value==='bank';
  text('confirm-payment',bank?'銀行振込（振込期限・振込先・手数料負担は未定）':'クレジットカード（決済接続準備中）');
  if(changed){document.querySelector('#agree-terms').checked=false;document.querySelector('#agree-law').checked=false;}
  try{const url=new URL(location.href);url.searchParams.set('plan',p.id);history.replaceState(null,'',url.pathname+url.search+url.hash);}catch{}
 }
 select.addEventListener('change',()=>update(true));
 document.querySelectorAll('input[name="payment"]').forEach(el=>el.addEventListener('change',()=>update(true)));
 update(false);
})();
