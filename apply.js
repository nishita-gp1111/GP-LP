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
  text('confirm-name',p.name);text('confirm-content',p.content);text('confirm-price',recurring?price+'／1か月ごとに更新。支払総額は利用月数により異なります（12回支払う場合：117,600円）。基本プランからの自動移行はありません。':price+'（契約期間全体の総額・一括）');text('summary-name',p.name);const amount=document.createTextNode(p.price.toLocaleString('ja-JP'));const suffix=document.createElement('small');suffix.textContent='円（税込）';const prefix=document.createElement('small');prefix.textContent=recurring?'月額 ':'';document.getElementById('summary-price').replaceChildren(prefix,amount,suffix);text('summary-term',p.term);
  text('confirm-term',recurring?'申込日（支払い完了日）から 1 か月ごとの更新':'申込日（支払い完了日）から '+p.months+' か月'+(p.id==='content'?'（学習コンテンツの視聴期間）':''));
  text('confirm-cancellation',recurring?"次回更新日の前日23:59（日本時間）までに、メールまたは公式お問い合わせフォームへ解約をご連絡ください。連絡の到達日時で判定し、次回以降の更新・請求を停止します。更新日以降の連絡は次々回から停止します。支払済み期間の末日まで利用でき、自己都合の月途中解約では日割り返金しません。最低利用月数・解約手数料なし。法令上の解除・返金や当社による提供不能の場合はこの限りではありません。":"受講案内の送信前は全額返金。送信後も期間内はいつでも中途解約でき、解約連絡の到達日の翌日以降の残期間を日割り返金します（1円未満切り上げ）。解約手数料なし。解約受付日で利用終了となります。メールまたは公式お問い合わせフォームからご連絡ください。法令に基づくクーリング・オフ等が適用される場合は、その定めを優先します。");
  const bank=document.querySelector('input[name="payment"]:checked')?.value==='bank';
  text('confirm-payment',recurring?(bank?"銀行振込：初回は申込日の翌日から7日以内、2回目以降は毎月の更新日までに前払い。更新日は初回支払完了日と同じ日付（同日がない月は月末）です。振込先は更新日の7日前までに案内します。振込手数料はお客様負担。期限内に入金がない場合、次期の利用は開始せず未払い期間の受講料は請求しません。":"クレジットカード：初回は申込時に決済、2回目以降は初回支払完了日と同じ日付に毎月課金します。同日がない月は月末更新です。口座引き落とし日はカード会社の定めによります。更新日に決済が完了しない場合、次期の利用は開始せず未払い期間の受講料は請求しません。"):(bank?"銀行振込：申込日の翌日から7日以内に一括前払い。振込手数料はお客様負担です。期限内に入金がない場合はキャンセル扱いとなり、受講料は請求しません。":"クレジットカード：申込時に一括決済。口座引き落とし日はカード会社の定めによります。"));
  if(changed){document.querySelector('#agree-terms').checked=false;document.querySelector('#agree-law').checked=false;}
  try{const url=new URL(location.href);url.searchParams.set('plan',p.id);history.replaceState(null,'',url.pathname+url.search+url.hash);}catch{}
 }
 select.addEventListener('change',()=>update(true));
 document.querySelectorAll('input[name="payment"]').forEach(el=>el.addEventListener('change',()=>update(true)));
 update(false);
})();
