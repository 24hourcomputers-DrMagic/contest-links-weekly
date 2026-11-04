// geo.js — served jurisdictions. status: included | restricted (browse free only, paid plan off) | excluded (blocked).
const GEO={
 CA:{n:'Canada',s:'included',home:1,r:{AB:'Alberta',BC:'British Columbia',MB:'Manitoba',NB:'New Brunswick',NL:'Newfoundland and Labrador',NS:'Nova Scotia',NT:'Northwest Territories',NU:'Nunavut',ON:'Ontario',PE:'Prince Edward Island',QC:'Québec',SK:'Saskatchewan',YT:'Yukon'}},
 US:{n:'United States',s:'included',r:{AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'}},
 GB:{n:'United Kingdom',s:'included',r:{ENG:'England',SCT:'Scotland',WLS:'Wales',NIR:'Northern Ireland'}},
 AU:{n:'Australia',s:'included',r:{ACT:'ACT',NSW:'New South Wales',NT:'Northern Territory',QLD:'Queensland',SA:'South Australia',TAS:'Tasmania',VIC:'Victoria',WA:'Western Australia'}},
 NZ:{n:'New Zealand',s:'included',r:{}},
 IE:{n:'Ireland',s:'restricted',r:{}},
 FR:{n:'France',s:'restricted',r:{}},DE:{n:'Germany',s:'restricted',r:{}},ES:{n:'Spain',s:'restricted',r:{}},NL:{n:'Netherlands',s:'restricted',r:{}},
 IT:{n:'Italy',s:'excluded',r:{}},BR:{n:'Brazil',s:'excluded',r:{}},MX:{n:'Mexico',s:'excluded',r:{}},IN:{n:'India',s:'excluded',r:{}},CN:{n:'China',s:'excluded',r:{}},
 RU:{n:'Russia',s:'excluded',r:{}},IR:{n:'Iran',s:'excluded',r:{}},KP:{n:'North Korea',s:'excluded',r:{}},CU:{n:'Cuba',s:'excluded',r:{}},SY:{n:'Syria',s:'excluded',r:{}},
 OTHER:{n:'Other country',s:'excluded',r:{}}};
// US territories (PR, GU, VI...) are not listed = not served (PR requires sweepstakes registration; not researched).
function eligible(c,co,rg){const e=c.el||{};const L=e[co];if(!L)return false;if(c.ev==='unknown'&&!GEO[co]?.home)return false;return L.includes('*')||L.includes(rg)}
window.GEO=GEO;window.eligible=eligible;
