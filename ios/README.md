# iOS wrapper (Capacitor) — NOT BUILT YET (needs a Mac with Xcode 16+)
Bundles the web app files locally (not a remote URL) so it works offline and is less likely to be rejected under App Store guideline 4.2 ("repackaged website").
1. On a Mac: `cd ios && npm install && npx cap add ios && npm run sync && npx cap open ios`
2. Xcode: set Team (Apple Developer Program, US$99/yr), bundle id io.github.drmagic24.contestlinks, add capability "In-App Purchase".
3. Billing on iOS MUST be Apple In-App Purchase (guideline 3.1.1). Create auto-renewable subscription `monthly_1cad` (CA$0.99 or $1.49 tier — Apple price tiers do not include exactly $1.00 CAD; pick nearest) in App Store Connect. Wire `billing.js` → `@capgo/native-purchases` when `window.Capacitor?.isNativePlatform()`. Stripe checkout must be hidden on iOS. (STUB: not wired yet.)
4. Native touches that help with 4.2: local daily re-entry reminders (@capacitor/local-notifications), share sheet. Not added yet.
