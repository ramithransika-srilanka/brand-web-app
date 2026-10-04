# Brand web app (desktop)

Desktop web app for brands on the UGC Platform. Open `index.html` in a browser — no build step needed.

## Pages

- **Campaigns** — a dark secondary bar under the top menu switches between Active, Completed and Upcoming
  campaigns (`#/active`, `#/completed`, `#/upcoming`). Each tab is the explore page recreated from the creator web app's desktop explore page: category filters
  (All / Price / Mobility / Food / Entertainment / Lifestyle), header search (`/` to open, `Esc` to close),
  loading skeletons, empty state and the notifications popover.
- **Campaign page** — click any campaign (`#/campaign/<id>`). The status bar turns into a blue
  "You are viewing this page as a creator" notice, and the page shows the middle column of the creator
  web app's campaign page (`main` branch): hero with brand badge, title and meta, pricing list,
  best-suited-for tags, event details for events, requirements and "Campaign created by".

## Assets

`assets.js` holds the images and icons shared with the creator web app. It is generated, not edited by hand:

```sh
node scripts/sync-assets.js <path-to-creator-web-app>
```
