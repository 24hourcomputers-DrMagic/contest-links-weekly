# Publishing "Enter 100 Contests Free" on the Apple App Store — plain guide
*Nov 4, 2026. Nothing has been published. Sources: [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), [5.1.1(v) account deletion](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion/).*

## What you need
- A **Mac with Xcode** (I can't build iOS on my Linux computer). The wrapper project is in `contest-app/ios/` (Capacitor).
- **Apple Developer Program: US$99/year** (not $25 — that's Google). Enroll as an individual at developer.apple.com/programs.
- App Store Connect: create the app, bundle id `io.github.drmagic24.contestlinks`.

## Steps
1. On the Mac: `cd ios && npm install && npx cap add ios && npm run sync && npx cap open ios`.
2. In App Store Connect → Subscriptions: make group "Plan", product `monthly_1cad`, auto-renewing 1 month. Apple uses fixed price points; choose the nearest to $1 CAD (e.g. CA$0.99 or CA$1.49). Apple keeps 15% under the Small Business Program (apply for it).
3. Wire Apple In-App Purchase in `billing.js` (stub today) and **hide Stripe/Visa/Mastercard wording on iOS**.
4. Fill the **App Privacy ("nutrition label")**: Contact Info → Email (linked to user, app functionality; marketing only if opted in); Usage Data → Product interaction (entry tracker, if stored on a server; today device-only = "not collected"); Purchases (handled by Apple). No tracking.
5. Upload with Xcode → TestFlight test → Submit for review with **Review notes** (below). Review is usually 1–3 days.
6. Countries: App Store Connect → Pricing & Availability → Canada, US, UK, Australia, NZ.

## Review guideline check
| Guideline | Status | What to do |
|---|---|---|
| 5.3.1 contests must be sponsored by developer | ⚠ **High risk** | We don't run contests; we're a directory. Review note: "This app is a tracker/directory of publicly available, free-to-enter third-party promotions; it does not run, sponsor or award any contest. Links open in Safari." Lawyer to confirm. |
| 5.3.2 official rules + Apple not a sponsor | Done | Footer + terms say Apple isn't a sponsor; each card links to the sponsor's rules. |
| 4.2 minimum functionality (web wrapper) | ⚠ Medium | Files are bundled locally (not a remote site); tracker, streaks, re-entry list, music, wins log. Adding local daily-reminder notifications would help a lot (not built). |
| 3.1.1 IAP required | ⚠ Stub | Must use Apple IAP for the $1 plan; no Stripe link/button on iOS. |
| 3.1.2 auto-renew disclosures | Done in copy | Plan page shows price, period, auto-renew, how to cancel; add links to Terms & Privacy on the paywall (present) and in App Store description. |
| 5.1.1(v) account deletion | Done | Settings → Delete my account (deletes local data; tells user to cancel the store subscription). Server deletion needed once a server exists. |
| 5.1.1 privacy policy | Done | privacy-policy.html, linked in app and store. |
| Age rating | To do | Answer questionnaire; set 18+ in description ("contests usually require 18+/age of majority"). |
