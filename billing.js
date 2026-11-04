// billing.js — Google Play Billing for the Android TWA (Bubblewrap features.playBilling.enabled=true).
// Uses the Digital Goods API + Payment Request API. Subscriptions (Play Console): monthly_2cad (C$2.00 monthly base plan) and yearly_10cad (C$10.00 annual base plan).
// Purchases are verified and acknowledged on the server (server/worker-stub.js -> /play/verify), using the Google Play Developer API
// purchases.subscriptionsv2.get. Unacknowledged purchases are refunded by Google after 3 days, so verify before unlocking.
// There is no other payment path in the app (Play policy). In a normal browser the app shows "subscribe in the Android app".
const PLAY='https://play.google.com/billing';
const SKUS={monthly:'monthly_2cad',yearly:'yearly_10cad'};
const LIST={monthly_2cad:{currency:'CAD',value:'2.00'},yearly_10cad:{currency:'CAD',value:'10.00'}}; // catalog list price, shown only until Play returns real prices
const SKU=SKUS.monthly;
const VERIFY_URL=window.PLAY_VERIFY_URL||''; // set to the deployed Worker origin, e.g. 'https://clw-api.example.workers.dev/play/verify'
const Billing={
  SKU,SKUS,LIST,
  fmt(p){try{return new Intl.NumberFormat(document.documentElement.lang||undefined,{style:'currency',currency:p.currency}).format(+p.value)}catch(e){return p.value+' '+p.currency}},
  savings(m,y){if(!m||!y||m.currency!==y.currency)return null;const full=12*+m.value,save=full-+y.value;return save>0?{pct:Math.round(save/full*100),amount:{currency:m.currency,value:save.toFixed(2)}}:null},
  available(){return 'getDigitalGoodsService' in window && 'PaymentRequest' in window},
  isPlay(){return document.referrer.startsWith('android-app://')||/source=twa/.test(location.search)||sessionStorage.getItem('twa')==='1'},
  async service(){if(!this.available())return null;try{return await window.getDigitalGoodsService(PLAY)}catch(e){return null}},
  async details(){const s=await this.service();if(!s)return null;try{const L=await s.getDetails(Object.values(SKUS));const o={};L.forEach(d=>o[d.itemId]=d);return o}catch(e){return null}},
  async verify(token,sku){ // server verifies with Google and acknowledges; returns {active,expiry}
    if(!VERIFY_URL)return {active:true,unverified:true}; // demo build: no server deployed yet
    const r=await fetch(VERIFY_URL,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({purchaseToken:token,sku,packageName:'io.github.drmagic24.contestlinks'})});
    if(!r.ok)throw new Error('verification failed ('+r.status+')');return r.json()},
  async restore(){ // on load: unlock if Play reports an existing purchase of the subscription
    const s=await this.service();if(!s)return null;
    try{const list=await s.listPurchases();const ids=Object.values(SKUS);const p=list.find(x=>ids.includes(x.itemId));if(!p)return {active:false};
      const v=await this.verify(p.purchaseToken,p.itemId);return {active:!!v.active,sku:p.itemId,token:p.purchaseToken,expiry:v.expiry,unverified:v.unverified}}
    catch(e){return {active:false,error:e.message}}},
  async subscribe(sku=SKU){if(!Object.values(SKUS).includes(sku))return {ok:false,msg:'Unknown plan.'};
    if(!this.available())return {ok:false,msg:t('pl_android')};
    const s=await this.service();if(!s)return {ok:false,msg:'Google Play Billing is not available on this device. Update Google Play and try again.'};
    const all=await this.details();const d=all&&all[sku];if(!d)return {ok:false,msg:'The subscription is not set up in Google Play yet. No charge was made.'};
    try{
      const pr=new PaymentRequest([{supportedMethods:PLAY,data:{sku}}],{total:{label:d.title||sku,amount:d.price}});
      const res=await pr.show();const token=res.details.purchaseToken;
      let v;try{v=await this.verify(token,sku)}catch(e){await res.complete('fail');return {ok:false,msg:'Payment could not be verified. You have not been charged if Google refunds the unacknowledged purchase. '+e.message}}
      await res.complete(v.active?'success':'fail');
      return v.active?{ok:true,sku,token,expiry:v.expiry,unverified:v.unverified}:{ok:false,msg:'Subscription is not active.'}}
    catch(e){return {ok:false,msg:e.name==='AbortError'?'Purchase cancelled. No charge was made.':'Purchase not completed: '+e.message}}}
};
if(/source=twa/.test(location.search))sessionStorage.setItem('twa','1');
window.Billing=Billing;
