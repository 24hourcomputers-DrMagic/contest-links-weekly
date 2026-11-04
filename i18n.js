// i18n.js — web-app translation layer. Strings live in i18n/<lang>.json. Contest titles/links stay in original language.
const LANGS={en:'English',fr:'Français',es:'Español',de:'Deutsch',pt:'Português',ar:'العربية'};const RTL=['ar','he','fa','ur'];
const I18N={lang:'en',d:{},en:{},
 pick(){const q=new URLSearchParams(location.search).get('lang');const s=JSON.parse(localStorage.getItem('clw')||'{}').settings||{};
  const c=[q,s.lang,...(navigator.languages||[navigator.language])].filter(Boolean).map(x=>x.slice(0,2).toLowerCase());return c.find(x=>LANGS[x])||'en'},
 async load(l){l=LANGS[l]?l:'en';this.en=await (await fetch('i18n/en.json')).json();this.d=l==='en'?this.en:await (await fetch('i18n/'+l+'.json')).json();this.lang=l;
  document.documentElement.lang=l;document.documentElement.dir=RTL.includes(l)?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));document.title=t('headline')}};
const t=k=>I18N.d[k]||I18N.en[k]||k;window.I18N=I18N;window.t=t;window.LANGS=LANGS;
