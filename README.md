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
- **Admin dashboard** — "Switch to admin" on a campaign page (`#/campaign/<id>/admin`), laid out like a LinkedIn
  Page admin on a `#f6f6f6` canvas. The left column is a card with the campaign image, title, status and a
  "View as creator" button, followed by the sub menu (badges show pending submissions and unread messages):
  - **Campaign details** (`/admin/details`, default) — dismissable "Needs your attention" items, performance tiles,
    budget and the campaign brief.
  - **Pending approvals** (`/admin/pending`) — the original admin review as a vertical feed: each submission is a
    full-height row with the post (reel, image or swipeable carousel) in the centre column and the creator, caption,
    bio on the right. Approve / Reject sit on the post itself, at the bottom. Scroll down for the next submission; reels play only while on screen.
  - **Approved content** (`/admin/approved`) — grid of live posts with views; newly approved posts appear first.
  - **Analytics** (`/admin/analytics`) — headline tiles, views per day (hover a bar), views by platform, top creators.
  - **Inbox** (`/admin/inbox`) — conversations with creators; send replies in the open thread.

## Assets

`assets.js` holds the images and icons shared with the creator web app. It is generated, not edited by hand:

```sh
node scripts/sync-assets.js <path-to-creator-web-app>
```

`images/hotzy-reel.jpg` is a demo reel frame taken from the admin-view mockup.
