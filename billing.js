// billing.js — chooses payment path. Web: Stripe (TEST mode, pk_test_PLACEHOLDER). Play/TWA: Google Play Billing (STUB).
// Play: Digital Goods API + Payment Request in a TWA (Bubblewrap "playBilling" feature). Product id: monthly_1cad ($1.00 CAD/mo auto-renew).
// Purchases must be acknowledged/verified on a server (Google Play Developer API) before granting access — see server/worker-stub.js.
const Billing={
  isPlay(){return document.referrer.startsWith('android-app://')||/source=twa/.test(location.search)||sessionStorage.getItem('twa')==='1'},
  async subscribe(sku){
    if(!('getDigitalGoodsService' in window))return {ok:false,msg:'Google Play Billing is not connected yet in this test build (stub). No charge was made.'};
    try{const svc=await window.getDigitalGoodsService('https://play.google.com/billing');const [d]=await svc.getDetails([sku]);
      const pr=new PaymentRequest([{supportedMethods:'https://play.google.com/billing',data:{sku}}],{total:{label:'Total',amount:{currency:'CAD',value:'0'}}});
      const res=await pr.show();/* TODO: POST res.details.purchaseToken to server for verification + acknowledgement */await res.complete('success');return {ok:true,details:d}}
    catch(e){return {ok:false,msg:'Purchase not completed: '+e.message}}}
};
if(/source=twa/.test(location.search))sessionStorage.setItem('twa','1');
window.Billing=Billing;
