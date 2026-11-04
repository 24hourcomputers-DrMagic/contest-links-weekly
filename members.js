// members.js — member sign-up + per-member entry tracking.
// Today: LocalMembers (localStorage, this device only). A free member gets FREE_LIMIT tracked entries,
// then needs the paid plan ($1/mo or $12/yr CAD). Real per-subscriber tracking/billing needs a server:
// see RemoteMembers stub below and server/worker-stub.js (Cloudflare Worker + Stripe webhooks).
const FREE_LIMIT=100;
const LocalMembers={
  _k:'clw-members',
  _db(){return JSON.parse(localStorage.getItem(this._k)||'{"current":null,"m":{}}')},
  _put(d){localStorage.setItem(this._k,JSON.stringify(d))},
  async signUp(email,consent){email=String(email).trim().toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))throw new Error('Please enter a valid email.');
    const d=this._db();d.m[email]=d.m[email]||{email,joined:new Date().toISOString(),used:0,plan:null,consent:!!consent};d.current=email;this._put(d);return d.m[email]},
  current(){const d=this._db();return d.current?d.m[d.current]:null},
  signOut(){const d=this._db();d.current=null;this._put(d)},
  remaining(m=this.current()){return m?Math.max(0,FREE_LIMIT-m.used):0},
  canEnter(m=this.current()){return !!m&&(m.plan==='active'||m.used<FREE_LIMIT)},
  async recordEntry(){const d=this._db(),m=d.m[d.current];if(!m)throw new Error('Sign up first');
    if(!this.canEnter(m))return {ok:false,reason:'limit'};m.used++;this._put(d);return {ok:true,used:m.used}},
  async setPlan(status){const d=this._db();if(d.m[d.current]){d.m[d.current].plan=status;this._put(d)}}
};
// STUB — swap in when a backend exists. Server stores members, counts entries, and Stripe webhooks set plan.
const RemoteMembers={
  base:'https://YOUR-WORKER.workers.dev', // placeholder; not deployed
  async signUp(email,consent){return (await fetch(this.base+'/signup',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,consent})})).json()},
  async recordEntry(){return (await fetch(this.base+'/entry',{method:'POST',credentials:'include'})).json()},
  async status(){return (await fetch(this.base+'/me',{credentials:'include'})).json()}
};
window.Members=LocalMembers; window.FREE_LIMIT=FREE_LIMIT;
