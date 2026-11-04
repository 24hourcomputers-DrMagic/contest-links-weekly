# Store plan — Contest Links Weekly

## Fees
- Google Play: **US$25 one-time** registration (verified Oct 30, 2026: https://support.google.com/googleplay/android-developer/answer/6112435). Personal accounts need ID verification and closed testing (12+ testers for 14 days per current Play rules; re-check) before production.
- Apple Developer Program: **US$99/year** (https://developer.apple.com/support/enrollment/). Re-check before enrolling.

## Wrapping
- Android: Trusted Web Activity via Bubblewrap (`npm i -g @bubblewrap/cli; bubblewrap init --manifest https://<host>/manifest.webmanifest; bubblewrap build`). Host `/.well-known/assetlinks.json` for Digital Asset Links. Alternative: PWABuilder.com.
- iOS: Capacitor (`npm i @capacitor/core @capacitor/cli @capacitor/ios; npx cap init; npx cap add ios`), build in Xcode on a Mac. Apple rejects thin web wrappers (Guideline 4.2), so add native value: push close-date alerts, widgets, haptics on win logging.

## Billing
- In-store digital subscriptions: Apple IAP / Google Play Billing. Commission 15% (small-business programs / subscriptions after year 1) up to 30%. On $1/mo the store keeps $0.15–0.30.
- Web-only signup (Stripe, Visa/Mastercard) stays the card path. Linking out from the app is allowed only where store rules permit (e.g. US storefront link-outs on iOS after 2025 court ruling; Google user-choice/external offers programs in some regions, with fees). Safest MVP: store apps are free "reader" companions; subscribe on the web. Verify current rules before launch.

## Contest / sweepstakes policies
- Apple Guideline 5.3: sweepstakes/contests must be sponsored by the developer, have official rules, and state Apple is not a sponsor. Our app only lists third-party contests (not run by us); in-app copy should make clear we are not the sponsor and that Apple/Google aren't involved. No real-money gaming.
- Google Play: Real-money gambling, games and contests policy; contests run by the app need rules and "Google is not a sponsor". Listing links is generally fine; no paid entries, no automated entry.
- Never auto-enter contests or sell entries (sponsor rules). Win claims: no guarantees (Competition Act).

## Asset checklist
- 512×512 icon (Play), 1024×1024 icon (App Store), adaptive icon layers
- Play feature graphic 1024×500; phone screenshots (2–8); iPhone 6.7"/6.5" and iPad screenshots
- Short/full description, privacy policy URL, support URL/email
- Data safety form (Play) / App Privacy labels (Apple): localStorage only, Stripe for payment
- Content rating questionnaire; target audience 18+ (contests often 18/19+)
- Music attribution in About (Kevin MacLeod, CC BY 4.0)

## Steps
1. Deploy PWA to HTTPS host (GitHub Pages). 2. Lighthouse PWA check. 3. Real Stripe test → live after review. 4. Play account ($25), Bubblewrap AAB, internal → closed test → production. 5. Apple enrollment ($99), Capacitor build, TestFlight, review.

## Android-only (Nov 4, 2026)
The iOS/Apple App Store track is dropped. The Capacitor iOS wrapper (`ios/`) and `docs/APP-STORE-GUIDE.md` were removed from the repo (recoverable from commit 2ecc0ef); iOS code paths were removed from `billing.js`/`app.js`. Apple items above are historical only. Release target: Google Play (TWA) only.

## Price change (Nov 4, 2026)
The free tier is now **50 tracked entries** (it was 100). The paid plan is now **C$2.00/month** with Play product id `monthly_2cad` (it was `monthly_1cad`, C$1). The $12/yr web plan is gone. Older figures above are historical.
Added (Nov 4, 2026): second subscription `yearly_10cad`, C$10.00/year annual base plan, shown as best value. Savings are computed from Play-returned prices.
