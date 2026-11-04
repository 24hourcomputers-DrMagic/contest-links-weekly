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
