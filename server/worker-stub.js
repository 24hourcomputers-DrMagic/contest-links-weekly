// Cloudflare Worker for Google Play subscription verification. Not deployed. No secrets are in this repo.
// Env (set with `wrangler secret put`):
//   GOOGLE_SA_EMAIL        service-account client_email (Play Console > Users & permissions, with "View financial data" + "Manage orders and subscriptions")
//   GOOGLE_SA_PRIVATE_KEY  service-account private_key (PEM, PKCS#8)
//   PACKAGE_NAME           io.github.drmagic24.contestlinks
//   ALLOWED_ORIGIN         https://24hourcomputers-drmagic.github.io
//   RTDN_TOKEN             shared secret in the Pub/Sub push URL (?token=...) for Real-time developer notifications
// KV namespace MEMBERS (optional) stores purchaseToken -> {state, expiry}.
// Routes:
//   POST /play/verify {purchaseToken, sku}  -> calls purchases.subscriptionsv2.get; if ACTIVE/IN_GRACE_PERIOD and not acknowledged,
//                                              calls purchases.subscriptions.acknowledge; returns {active, expiry, state}
//   POST /play/rtdn?token=...                -> Pub/Sub push from Real-time developer notifications (Play Console > Monetization setup).
//                                              Decodes subscriptionNotification, re-fetches subscriptionsv2 and updates KV (renewed/canceled/expired/revoked).
//   GET  /me                                 -> stub
const API='https://androidpublisher.googleapis.com/androidpublisher/v3/applications';
const b64u=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const enc=s=>b64u(new TextEncoder().encode(s));
async function accessToken(env){
  const now=Math.floor(Date.now()/1000);
  const unsigned=enc(JSON.stringify({alg:'RS256',typ:'JWT'}))+'.'+enc(JSON.stringify({iss:env.GOOGLE_SA_EMAIL,scope:'https://www.googleapis.com/auth/androidpublisher',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600}));
  const pem=env.GOOGLE_SA_PRIVATE_KEY.replace(/\\n/g,'\n').replace(/-----[^-]+-----|\s/g,'');
  const key=await crypto.subtle.importKey('pkcs8',Uint8Array.from(atob(pem),c=>c.charCodeAt(0)),{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);
  const jwt=unsigned+'.'+b64u(await crypto.subtle.sign('RSASSA-PKCS1-v1_5',key,new TextEncoder().encode(unsigned)));
  const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion='+jwt});
  if(!r.ok)throw new Error('token '+r.status);return (await r.json()).access_token;
}
async function getSub(env,tok,purchaseToken){
  const r=await fetch(`${API}/${env.PACKAGE_NAME}/purchases/subscriptionsv2/tokens/${encodeURIComponent(purchaseToken)}`,{headers:{authorization:'Bearer '+tok}});
  if(!r.ok)throw new Error('subscriptionsv2.get '+r.status);return r.json();
}
async function verify(env,purchaseToken,sku){
  const tok=await accessToken(env);const s=await getSub(env,tok,purchaseToken);
  const item=(s.lineItems||[]).find(l=>l.productId===sku)||(s.lineItems||[])[0]||{};
  const active=['SUBSCRIPTION_STATE_ACTIVE','SUBSCRIPTION_STATE_IN_GRACE_PERIOD'].includes(s.subscriptionState)&&item.productId===sku;
  if(active&&s.acknowledgementState==='ACKNOWLEDGEMENT_STATE_PENDING'){
    const a=await fetch(`${API}/${env.PACKAGE_NAME}/purchases/subscriptions/${sku}/tokens/${encodeURIComponent(purchaseToken)}:acknowledge`,{method:'POST',headers:{authorization:'Bearer '+tok,'content-type':'application/json'},body:'{}'});
    if(!a.ok)throw new Error('acknowledge '+a.status);
  }
  const out={active,state:s.subscriptionState,expiry:item.expiryTime||null};
  if(env.MEMBERS)await env.MEMBERS.put('play:'+purchaseToken,JSON.stringify(out));
  return out;
}
export default { async fetch(req, env) {
  const u=new URL(req.url);const cors={'access-control-allow-origin':env.ALLOWED_ORIGIN||'','access-control-allow-headers':'content-type','access-control-allow-methods':'POST,GET,OPTIONS'};
  if(req.method==='OPTIONS')return new Response(null,{headers:cors});
  try{
    if(u.pathname==='/play/verify'&&req.method==='POST'){const {purchaseToken,sku}=await req.json();if(!purchaseToken||!['monthly_2cad','yearly_10cad'].includes(sku))return Response.json({error:'bad request'},{status:400,headers:cors});return Response.json(await verify(env,purchaseToken,sku),{headers:cors})}
    if(u.pathname==='/play/rtdn'&&req.method==='POST'){
      if(!env.RTDN_TOKEN||u.searchParams.get('token')!==env.RTDN_TOKEN)return new Response('forbidden',{status:403});
      const m=await req.json();const n=JSON.parse(atob(m.message.data));
      if(n.subscriptionNotification){const {purchaseToken,subscriptionId}=n.subscriptionNotification;await verify(env,purchaseToken,subscriptionId)}
      return new Response('ok');
    }
    if(u.pathname==='/me')return Response.json({used:0,plan:null,stub:true},{headers:cors});
    return new Response('Not found',{status:404});
  }catch(e){return Response.json({error:e.message},{status:502,headers:cors})}
}};
