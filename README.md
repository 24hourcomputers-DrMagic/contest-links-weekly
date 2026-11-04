# Contest Links Weekly — PWA ($1/month)

Plain HTML/JS installable PWA. No build step.

## Run
    cd contest-app && python3 -m http.server 8080   # open http://localhost:8080
Install: Chrome/Edge "Install app" icon, or the Android Google Play app (Android-only release; no iOS build). Works offline after the first load (sw.js caches everything).

## Files
- index.html, app.js (all screens/logic), style.css
- contests.json: 298 links seeded from /workspace/newsletter/contest-links.csv (fields n,u,p,c,s,f,r)
- manifest.webmanifest, icon.svg, sw.js (bump `clw-v1` when you change files)
- Heroic_Age.mp3: "Heroic Age" Kevin MacLeod (incompetech.com), CC BY 4.0 https://creativecommons.org/licenses/by/4.0/ (music off by default)

## Modify
- Contests: regenerate contests.json from the CSV (see the python one-liner in the repo history) or edit it directly.
- Screens: the `V` object in app.js (onboarding, issue, library, track, subscribe, settings).
- Data is in localStorage key `clw`.

## Payments: Google Play Billing only
`billing.js` uses the Digital Goods API (`getDigitalGoodsService('https://play.google.com/billing')`) and the Payment Request API (`supportedMethods: 'https://play.google.com/billing'`, `sku: 'monthly_1cad'`).
- **On load:** `listPurchases()` restores an existing subscription.
- **After 100 free entries:** the lock screen leads to Plan, then "Subscribe $1/mo with Google Play".
- **Plain browsers:** show "Subscribe in the Android app".
- **Server checks:** purchases are verified and acknowledged by `server/worker-stub.js` (`POST /play/verify`). Set `window.PLAY_VERIFY_URL` once it is deployed. Until then, the demo unlocks without server verification. Do not ship that to production.
- **Stripe:** removed from the in-app path (Play policy). See android/BUILD.md for the Bubblewrap and Play Console setup.

## Deploy
Any static host. GitHub Pages: push to `main`, Settings > Pages > Deploy from branch `main` / root.
