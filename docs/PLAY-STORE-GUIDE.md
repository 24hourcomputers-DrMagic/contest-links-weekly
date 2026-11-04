# Publishing "Enter 100 Contests Free" on Google Play — plain-language guide
*For Paul. Facts checked Nov 4, 2026 (sources at bottom). Nothing has been published or signed up for yet.*

## 0. What you already have
- Live web app: https://24hourcomputers-drmagic.github.io/contest-links-weekly/
- Icons (512 px), feature graphic 1024×500 (gold "Fun Ahead" coin): `contest-app/icons/`
- Privacy policy: …/privacy-policy.html · Terms: …/terms.html
- Android wrapper settings: `contest-app/android/twa-manifest.json` + `BUILD.md` (exact build commands)
- Draft Data safety answers: `newsletter/DATA-SAFETY-DRAFT.md`

## 1. Make the Google Play developer account (about 1 hour + waiting)
1. Go to https://play.google.com/console/signup and sign in with 24hourcomputers@gmail.com.
2. Choose **Personal** (just you, legal name Paul Digby) or **Organization** (needs a registered business + a D-U-N-S number, free from Dun & Bradstreet but takes days). Personal is simplest.
3. Pay the **one-time US$25** fee by card. (It's not $35.)
4. **Verify your identity**: upload government ID; your legal name and address must match. Can take a few days.
5. Personal accounts must also **verify an Android phone** using the Play Console app.
6. For selling a subscription: set up a **payments (merchant) profile** and tax info in Play Console → Setup → Payments profile.

## 2. The big hurdle for new personal accounts: 12 testers × 14 days
- Before your app can go public, you must run a **closed test with at least 12 people** (real Google accounts, real Android phones) who stay **opted in continuously for 14 days**. Internal testing doesn't count. Organization accounts skip this.
- Plan: ask 12–15 friends/family with Android phones; send them the opt-in link; tell them not to leave the test.
- After 14 days: Dashboard → **Apply for production**, answer the questions. Google says review is usually **7 days or less**.

## 3. Build the app file (.aab)
On a PC (or ask me to install the tools on the box): follow `android/BUILD.md` — `npm i -g @bubblewrap/cli`, `bubblewrap init --manifest=…/manifest.webmanifest`, `bubblewrap build`. **Back up the keystore file and passwords** — losing them means you can't update the app. Then copy the SHA-256 fingerprint from Play Console → App signing into `assetlinks.json` (must be at the domain root; see BUILD.md) so the app opens without a browser bar.

## 4. Store listing — what you'll fill in
- App name (≤30 chars): **Enter 100 Contests Free**; short description (≤80); full description (≤4000).
- **App icon 512×512 PNG**, **feature graphic 1024×500**, **at least 2 phone screenshots** (I can make these).
- **Privacy policy URL** (above), contact **email** (shown publicly; a phone/address may also be shown for paid apps — use one you're OK being public).
- **Data safety form** (use the draft), **content rating questionnaire** (IARC; answer honestly — no gambling with real money, it links to free sweepstakes), **target audience: 18+**, ads: none, app access instructions for reviewers (e.g., "sign up with any email").
- **Contests policy notes:** Google requires any contest *you run* to have official rules and a disclaimer that Google isn't a sponsor. You don't run contests, but the app already shows: "We list third-party contests, don't run them or guarantee prizes; Google is not a sponsor." Don't promise wins; no real-money gambling.

## 5. Getting paid inside the Android app
- Google's rule: a subscription that unlocks app features must use **Google Play Billing** (outside the US/UK/EEA billing-choice programs; Canada isn't in them). So the Play version charges **$1.00 CAD/month through Google Play**; Stripe stays for the website only. Don't link Android users to Stripe to pay.
- Google's cut on auto-renewing subscriptions: **15%** in Canada (US/UK/EEA now 10% + 5% billing fee). On $1 you keep about $0.85 before tax.
- In Play Console → Monetize → Subscriptions, create product id **monthly_1cad**, $1.00 CAD, monthly auto-renew. The app has a billing stub ready; a small server must verify purchases before it's turned on.
- The free tier is "first 100 tracked entries free, no card" — not a free *trial* — so nothing auto-converts to paid.

## 6. Release
1. Upload the .aab to **Internal testing** first, install on your phone, check it.
2. Move to **Closed testing**, add the 12+ testers, wait 14 days.
3. Apply for production; once approved, create a **Production** release, choose countries (start with Canada), and submit. Each new release/update is reviewed — often hours, sometimes up to a week+.
4. After launch: answer reviews, keep the privacy policy current, and bump `appVersionCode` for each update.

## Sources
- Play Console: get started — https://support.google.com/googleplay/android-developer/answer/6112435
- Testing requirement (12 testers/14 days) — https://support.google.com/googleplay/android-developer/answer/14151465
- Payments policy — https://support.google.com/googleplay/android-developer/answer/10281818
- Service fees — https://support.google.com/googleplay/android-developer/answer/112622 ; billing choice — https://support.google.com/googleplay/android-developer/answer/17161464
- Bubblewrap — https://github.com/GoogleChromeLabs/bubblewrap

## Multi-language (added Nov 4, 2026)
- The app is a **TWA (web app in a Chrome wrapper)**, so translation happens in the web app: `i18n/*.json` (en, fr, es, de, pt, ar). It auto-picks the phone's language; users can change it in Settings. Arabic flips to right-to-left.
- Android `strings.xml` only covers the wrapper (launcher name "100 Free"). Bubblewrap generates it; you can add `values-fr/strings.xml` for the launcher label if wanted.
- **Store listing:** In Play Console → Grow → Store presence → Main store listing → "Manage translations" → add languages. Play offers **machine translation** of your listing text (review it; for French/Québec, check wording yourself).
- Choose countries in Play Console → Production → Countries/regions: **Canada, United States, United Kingdom, Australia, New Zealand** (paid plan). Leave out other countries for now (see MULTI-REGION-LEGAL.md).
- Account deletion: Play requires an in-app delete option **and** a web link in the Data safety form. In-app: Settings → Delete my account. Web link: use the privacy policy URL (section "Delete your account").

## Play policy checklist (re-checked Nov 4 2026)
- [x] Not a real-money contest app: no paid entries, no prizes from us. Never use "Pay to enter/win" wording.
- [x] Disclaimer: Google not a sponsor (footer + terms).
- [x] Subscription via Play Billing in the Android app (stub — must be wired before launch).
- [x] Privacy policy URL, Data safety (email, app activity), account deletion.
- [ ] Target audience 18+; content rating questionnaire.
- [ ] 12 testers × 14 days closed test.
