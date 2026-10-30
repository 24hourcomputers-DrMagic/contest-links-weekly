# Contest Links Weekly — PWA ($1/month)

Plain HTML/JS installable PWA. No build step.

## Run
    cd contest-app && python3 -m http.server 8080   # open http://localhost:8080
Install: Chrome/Edge "Install app" icon, or iOS Safari Share > Add to Home Screen. Works offline after the first load (sw.js caches everything).

## Files
- index.html, app.js (all screens/logic), style.css
- contests.json: 298 links seeded from /workspace/newsletter/contest-links.csv (fields n,u,p,c,s,f,r)
- manifest.webmanifest, icon.svg, sw.js (bump `clw-v1` when you change files)
- Heroic_Age.mp3: "Heroic Age" Kevin MacLeod (incompetech.com), CC BY 4.0 https://creativecommons.org/licenses/by/4.0/ (music off by default)

## Modify
- Contests: regenerate contests.json from the CSV (see the python one-liner in the repo history) or edit it directly.
- Screens: the `V` object in app.js (onboarding, issue, library, track, subscribe, settings).
- Data is in localStorage key `clw`.

## Payments (TEST MODE ONLY)
`STRIPE_PK='pk_test_PLACEHOLDER'`. Checkout is simulated; no card is charged. For real Stripe:
1. Create Prices: $1.00 CAD/month and $12.00 CAD/year, Stripe Tax for GST/PST.
2. Add a small server (e.g. Cloudflare Worker) creating Checkout Sessions (mode=subscription) and a webhook for invoice.paid / invoice.payment_failed / customer.subscription.updated.
3. Enable Smart Retries, card account updater, reminder emails before renewal, Customer Portal for cancel/card update.
Inside iOS/Android store apps, digital subscriptions must use Apple/Google billing unless a regional exception applies; web checkout is the card path.

## Deploy
Any static host. GitHub Pages: push to `main`, Settings > Pages > Deploy from branch `main` / root.
