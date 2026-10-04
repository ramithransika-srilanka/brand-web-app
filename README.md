# Brand web app (desktop)

Desktop web app for brands on the UGC Platform. Open `index.html` in a browser — no build step needed.

## Pages

- **Campaigns (explore)** — recreated from the creator web app's desktop explore page: category filters
  (All / Price / Mobility / Food / Entertainment / Lifestyle), header search (`/` to open, `Esc` to close),
  loading skeletons, empty state and the notifications popover.

## Assets

`assets.js` holds the images and icons shared with the creator web app. It is generated, not edited by hand:

```sh
node scripts/sync-assets.js <path-to-creator-web-app>
```
