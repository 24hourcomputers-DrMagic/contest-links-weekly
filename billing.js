// billing.js — Google Play Billing for the Android TWA (Bubblewrap features.playBilling.enabled=true).
// Uses the Digital Goods API + Payment Request API. Subscription product id: monthly_2cad (C$2.00/month base plan, set up in Play Console).
// Purchases are verified and acknowledged on the server (server/worker-stub.js -> /play/verify), using the Google Play Developer API
// purchases.subscriptionsv2.get. Unacknowledged purchases are refunded by Google after 3 days, so verify before unlocking.
// There is no other payment path in the app (Play policy). In a normal browser the app shows "subscribe in the Android app".
const PLAY='https://play.google.com/billing';
const SKU='monthly_2cad';
const VERIFY_URL=window.PLAY_VERIFY_URL||''; // set to the deployed Worker origin, e.g. 'https://clw-api.example.workers.dev/play/verify'
const Billing={
  SKU,
  available(){return 'getDigitalGoodsService' in window && 'PaymentRequest' in window},
  isPlay(){return document.referrer.startsWith('android-app://')||/source=twa/.test(location.search)||sessionStorage.getItem('twa')==='1'},
  async service(){if(!this.available())return null;try{return await window.getDigitalGoodsService(PLAY)}catch(e){return null}},
  async details(){const s=await this.service();if(!s)return null;try{const [d]=await s.getDetails([SKU]);return d||null}catch(e){return null}},
  async verify(token,sku){ // server verifies with Google and acknowledges; returns {active,expiry}
    if(!VERIFY_URL)return {active:true,unverified:true}; // demo build: no server deployed yet
    const r=await fetch(VERIFY_URL,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({purchaseToken:token,sku,packageName:'io.github.drmagic24.contestlinks'})});
    if(!r.ok)throw new Error('verification failed ('+r.status+')');return r.json()},
  async restore(){ // on load: unlock if Play reports an existing purchase of the subscription
    const s=await this.service();if(!s)return null;
    try{const list=await s.listPurchases();const p=list.find(x=>x.itemId===SKU);if(!p)return {active:false};
      const v=await this.verify(p.purchaseToken,SKU);return {active:!!v.active,token:p.purchaseToken,expiry:v.expiry,unverified:v.unverified}}
    catch(e){return {active:false,error:e.message}}},
  async subscribe(){
    if(!this.available())return {ok:false,msg:'Subscribe in the Android app. The $2 plan is sold only through Google Play in the "Enter 50 Contests Free" Android app.'};
    const s=await this.service();if(!s)return {ok:false,msg:'Google Play Billing is not available on this device. Update Google Play and try again.'};
    const d=await this.details();if(!d)return {ok:false,msg:'The subscription is not set up in Google Play yet. No charge was made.'};
    try{
      const pr=new PaymentRequest([{supportedMethods:PLAY,data:{sku:SKU}}],{total:{label:d.title||'Monthly',amount:d.price||{currency:'CAD',value:'2.00'}}});
      const res=await pr.show();const token=res.details.purchaseToken;
      let v;try{v=await this.verify(token,SKU)}catch(e){await res.complete('fail');return {ok:false,msg:'Payment could not be verified. You have not been charged if Google refunds the unacknowledged purchase. '+e.message}}
      await res.complete(v.active?'success':'fail');
      return v.active?{ok:true,token,expiry:v.expiry,unverified:v.unverified}:{ok:false,msg:'Subscription is not active.'}}
    catch(e){return {ok:false,msg:e.name==='AbortError'?'Purchase cancelled. No charge was made.':'Purchase not completed: '+e.message}}}
};
if(/source=twa/.test(location.search))sessionStorage.setItem('twa','1');
window.Billing=Billing;
