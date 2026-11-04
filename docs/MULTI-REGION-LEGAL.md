# Multi-region legal framework — Enter 50 Contests Free
*Research Nov 4, 2026. Builds on LEGAL-FRAMEWORK.md (BC). A careful research summary, NOT legal advice. Items marked ⚠ LAWYER need review by Lex Meridian / Docket Hawk.*

## The core question: does charging $2/month make this an illegal lottery?
A lottery/illegal sweepstakes generally needs **prize + chance + consideration**. This app **runs no contests and awards no prizes**; it sells access to a curated directory + tracker. The sponsors' contests are free to enter on their own sites. So the subscription is not consideration *for a chance to win* — as long as:
1. Every listed contest is free to enter without the app (true — links go to the sponsor's public page).
2. The paywall never gates the *ability to enter*, only our list/tracker. Wording already says "your plan pays for curated links and tracker, not entries."
3. ⚠ LAWYER: the current design counts "entries" toward the 50-free limit. A regulator could read "pay after 50 entries" as paying for entries. **Recommendation:** rename the meter to "50 free tracked contests" and keep sponsor links visible even when locked (currently the list is hidden behind the paywall). Not changed in this build — flag for decision.
- Canada: Criminal Code s.206 bans lotteries/mixed chance-skill games with paid consideration ([Justice Laws s.206](https://laws-lois.justice.gc.ca/eng/acts/C-46/section-206.html)); Competition Act s.74.06 disclosure ([Competition Bureau guidelines](https://competition-bureau.canada.ca/en/promotional-contests-enforcement-guidelines)). Both target the **operator** of a contest, i.e. the sponsor.
- Google Play bans apps that let users "participate using real money ... to obtain a prize" ([Play policy: Real-Money Gambling, Games, and Contests](https://support.google.com/googleplay/android-developer/answer/9877032)). A paid directory is not that, but listing copy must never say "pay to enter/win".
- Apple 5.3.1: "Sweepstakes and contests must be sponsored by the developer of the app" ([App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)). ⚠ This is the **biggest App Store risk**: a reviewer may treat a contest directory as facilitating third-party sweepstakes. Mitigation: present as a "contest tracker & news directory", no "enter" button inside the app (links open in Safari), App Review notes explaining it.

## Jurisdiction table
| Jurisdiction | Status | Reason (one line) | Sources |
|---|---|---|---|
| Canada (ex-QC) | **Included** (home) | Home law; BC framework done; s.206 targets sponsors; CASL/PIPEDA already handled. | Justice Laws s.206; Competition Bureau |
| Québec | **Included, French required** | RACJ publicity-contest registration/duties **abolished Oct 27 2023**; Charter of the French Language s.52, 52.1, 55 requires full French app, contracts & checkout (done: fr i18n; terms FR on request ⚠ full FR legal text still to translate). CPA distance-contract rules apply. | [RACJ](https://www.racj.gouv.qc.ca/actualiser-lencadrement-de-la-vente-et-de-la-fabrication-dalcool-et-mettre-fin-a-celui-des-concours-publicitaires/organisateur-de-concours-publicitaires); [Charter C-11](https://www.legisquebec.gouv.qc.ca/en/document/cs/c-11); [OQLF websites](https://www.oqlf.gouv.qc.ca/francisation/entreprises/sites.html) |
| United States (50 + DC) | **Included** | NY ($5k+ prizes: registration+bond, GBL §369-e), FL (§849.094 filing+bond) and RI regulate contest **operators**, not listing services; FTC click-to-cancel rule **vacated** (8th Cir. July 8 2025; restored old rule Feb 12 2026) so ROSCA + state ARLs govern; CA ARL (AB 2863, from Jul 1 2025): express consent, clear terms, online cancel, annual reminder. Play/App Store billing supplies most of this. | [NY DOS](https://dos.ny.gov/games-chance-registration); [FL FDACS](https://www.fdacs.gov/Business-Services/Game-Promotions-Sweepstakes); [FR 2026-02866](https://www.federalregister.gov/documents/full_text/html/2026/02/12/2026-02866.html); [CA BPC 17602](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17602) |
| US territories (PR, GU, VI…) | Excluded | PR has its own sweepstakes registration; not researched. | — |
| United Kingdom | **Included** | Free prize draws lawful (Gambling Act 2005 Sch.2); 14-day withdrawal for digital services (CCRs 2013); **DMCCA subscription regime starts Jan 1 2027** (reminders, easy online exit, 14-day cooling off) — store billing + our cancel page cover most; UK GDPR: need ICO fee (~£40–60) ⚠ and possibly a UK representative (Art.27) as a non-UK business. | [Draft SCRs 2026](https://www.legislation.gov.uk/ukdsi/2026/9780348287912); [DBT guidance](https://assets.publishing.service.gov.uk/media/6acf97da2de3184ccf8b814e/subscription-contracts-rules-guidance.pdf) |
| Australia | **Included** | State trade-promotion permits (NSW >$10k, SA >$5k, ACT >$3k) bind **promoters**, not us; ACL unfair-practices & subscription rules from **Jul 1 2027**; ⚠ reports of restrictions on subscription-linked prize draws from Jan 2027 — we run no draws, but lawyer should confirm. | [NSW](https://www.nsw.gov.au/money-and-taxes/community-gaming/trade-promotions); [SA](https://www.sa.gov.au/topics/business-and-trade/running-a-business/trade-promotions); [ACT](https://www.gamblingandracing.act.gov.au/industry/lotteries/trade-promotions); [DLA Piper 2026](https://www.dlapiper.com/en/insights/publications/2026/07/australia-introduces-new-unfair-trading-practices-laws) |
| New Zealand | **Included** | Gambling Act 2003 permits free sales-promotion schemes; Fair Trading Act + CGA; low burden (not separately web-verified this run ⚠). | — |
| Ireland | **Restricted** (free browse only, no paid plan) | GDPR Art.27 EU representative needed for a non-EU business offering paid services to EU residents; Gambling Regulation Act 2024 still bedding in. | GDPR Art.27 |
| France, Germany, Spain, Netherlands | **Restricted** (free only) | Same GDPR rep issue + EU 14-day withdrawal & local language/consumer rules; German "Kündigungsbutton" (§312k BGB). Listed contests mostly Canada-only anyway. | Directive 2011/83/EU |
| Italy | Excluded | Prize promotions require ministerial notification + deposit (DPR 430/2001); contest directories facilitating them sit near gambling regime. | — |
| Brazil | Excluded | Commercial prize promotions need prior SPA/Ministry of Finance authorization (Law 5.768/71). | — |
| Mexico | Excluded | SEGOB permits for draws; Spanish legal docs needed. | — |
| India, China | Excluded | State-by-state gaming law (India); app licensing/ICP (China). | — |
| Russia, Iran, North Korea, Cuba, Syria | Excluded | Sanctions / Play & Apple payments unavailable. | — |
| All other countries | Excluded | Not researched → not served (default deny). | — |

**How the app enforces this:** `geo.js` lists each country's status. Excluded = no contest list shown. Restricted = free browse only; the paid plan page is disabled. Each contest carries `el` (country → regions) and `ev` (`source` / `unknown`). Existing data is all Canada/BC (from source rules), so US/UK/AU/NZ users currently see **zero contests** until US/UK/AU contests are harvested. Unknown-eligibility contests are shown only in Canada.
⚠ Many "Canada" contests exclude Québec; current data marks them all-Canada because the source column didn't record QC exclusions. Needs a re-check pass.

## Subscription rules checklist (all included markets)
- Price, renewal period, "renews automatically until you cancel", how to cancel — shown before purchase (done on Plan page).
- Express affirmative consent (tap Subscribe) + keep consent record 3 yrs (CA ARL) ⚠ needs server (stub).
- Online cancel at will (stores handle; web cancel button exists).
- Annual reminder email (CA ARL) / 6-monthly reminders (UK DMCCA from 2027) ⚠ needs server + email (not built).
- 14-day withdrawal notice for UK/IE/EU (in terms).
- Québec CPA: contract copy within 15 days (terms say so) ⚠ needs email sending.

## Data protection
PIPEDA / BC PIPA / Québec Law 25 (privacy officer named), CASL (opt-in box separate), US state laws (no sale/sharing; most thresholds far above this app's size), UK GDPR/GDPR (lawful bases listed; Canada adequacy), AU/NZ Privacy Acts. Account deletion in-app added (Apple 5.1.1(v), Play account-deletion policy).

## Needs a lawyer (Lex Meridian / Docket Hawk)
1. "Pay after 50 entries" framing vs. consideration (rename suggested).
2. Apple 5.3.1 directory risk.
3. UK ICO fee + Art.27 representative; whether to open EU paid plan.
4. Full French translation of terms/privacy for Québec.
5. Australia 2027 subscription/prize-draw changes.
6. Tax: Google/Apple collect & remit sales tax/VAT/GST in most of these markets as merchant of record; confirm Canadian GST registration once >$30K.

> **Android-only (Nov 4, 2026):** Apple/App Store items in this file are no longer in scope; the iOS wrapper was removed (see STORE-PLAN.md).

## Contest sourcing, Nov 4, 2026
200 contests were added for GB, AU, NZ, IE, FR, DE, ES, NL. Each was found on GiveOwl's per-country lists, which check the organiser page. Only listings marked open and no purchase necessary, with a close date on or after Nov 5, 2026, were kept, and the organiser page had to load (HTTP 200). Each record's `src` field holds the listing, and `how` holds the entry and eligibility summary. Region limits (GB = Great Britain only, AU state lists) were read from that text automatically and should be spot-checked. Users must still read each sponsor's rules. IE/FR/DE/ES/NL stay free-tier only.
