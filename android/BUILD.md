# Build the Play Store AAB (Bubblewrap TWA)
AAB not built on the shared box (no JDK/Android SDK installed). On any PC with Node 18+:
    npm i -g @bubblewrap/cli
    mkdir cl-android && cd cl-android
    bubblewrap init --manifest=https://24hourcomputers-drmagic.github.io/contest-links-weekly/manifest.webmanifest
      # say Yes to let it install JDK 17 + Android SDK; accept defaults from twa-manifest.json
      # package id: io.github.drmagic24.contestlinks ; create a NEW keystore and back it up + passwords
    bubblewrap build        # -> app-release-bundle.aab (upload to Play) + app-release-signed.apk (test)
    bubblewrap fingerprint add <SHA256 from Play Console > Setup > App signing>
Then put that SHA-256 into ../.well-known/assetlinks.json.
NOTE: GitHub Pages project sites serve /contest-links-weekly/.well-known/, but Android checks
https://24hourcomputers-drmagic.github.io/.well-known/assetlinks.json (domain root). Publish assetlinks.json in a
repo named 24hourcomputers-DrMagic.github.io (or use a custom domain), else the app shows a browser URL bar.

## Google Play Billing (Bubblewrap playBilling)
`twa-manifest.json` has `features.playBilling.enabled: true`. Bubblewrap adds the Play Billing library and the Digital Goods / Payment Request bridge to the generated Android project. After changing it, run `bubblewrap update` and then `bubblewrap build`.
- **Web side:** `billing.js` uses `getDigitalGoodsService('https://play.google.com/billing')`. It calls `getDetails(['monthly_2cad','yearly_10cad'])`, opens the `PaymentRequest` (`supportedMethods: 'https://play.google.com/billing'`, `data: {sku}`), and calls `listPurchases()` on load to restore an existing subscription.
- **Testing:** this only works inside the installed TWA, from a Play-installed build (internal or closed testing track). Use a license-tester account (Play Console > Settings > License testing) so test purchases aren't charged.
- **Play Console:** create two subscriptions: `monthly_2cad` with a monthly auto-renewing base plan at C$2.00, and `yearly_10cad` with an annual auto-renewing base plan at C$10.00. Activate both. The server accepts both ids.
- **Server:** deploy `server/worker-stub.js` (Cloudflare Worker) and put its secrets in Worker env, never in git. Set `window.PLAY_VERIFY_URL` (for example in index.html before billing.js) to `https://<worker>/play/verify`. Google refunds purchases that aren't acknowledged within 3 days.
- **API access:** create a Google Cloud service account and enable the Google Play Android Developer API. Invite the service account in Play Console > Users and permissions with financial and subscription permissions.
- **Real-time developer notifications:** create a Pub/Sub topic and grant `google-play-developer-notifications@system.gserviceaccount.com` the Publisher role. Set the topic in Play Console > Monetization setup. Add a push subscription to `https://<worker>/play/rtdn?token=<RTDN_TOKEN>` so renewals, cancellations and expiries update the account.
