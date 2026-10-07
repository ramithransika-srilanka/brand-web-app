# Brand web app (desktop)

Desktop web app for brands on the UGC Platform. Open `index.html` in a browser — no build step needed.

On phones (767px wide and below) the app shows a "Log in from a desktop" screen instead. The mobile layout is still in
the code, just hidden behind that screen (`.desk-only` in `index.html`), so it can be switched back on later.

## Pages

- **Campaigns** — a dark secondary bar under the top menu switches between Active, Completed and Upcoming
  campaigns (`#/active`, `#/completed`, `#/upcoming`). Each tab is the explore page recreated from the creator web app's desktop explore page: category filters
  (All / Price / Mobility / Food / Entertainment / Lifestyle), an Open / Invite only filter (click the active one
  again to show both; each card shows an "Open" (open lock) or "Invite only"
  (closed lock) line under the image), a Performance fee / Flat fee filter (flat fee cards
  drop the per-1K price and show filled / total slots; 20 or fewer slots get a segmented bar, more get a continuous one), header search (`/` to open, `Esc` to close),
  loading skeletons, empty state and the notifications popover.
- **Campaign page** — click any campaign (`#/campaign/<id>`). The status bar turns into a blue
  "You are viewing this page as a creator" notice, and the page shows the middle column of the creator
  web app's campaign page (`main` branch): hero with brand badge, title and meta, pricing list,
  best-suited-for tags, event details for events, requirements and "Campaign created by".
- **Admin dashboard** — "Switch to admin" on a campaign page (`#/campaign/<id>/admin`), laid out like a LinkedIn
  Page admin on a `#f6f6f6` canvas. The left column is a card with the campaign image, title, status and a
  "View as creator" button (it slides in the creator web app's campaign drawer under a blue "You are viewing this
  as a creator" bar; `Esc`, the scrim or "Admin view" closes it; phones go to the creator page instead), followed by the sub menu (badges show pending submissions and unread messages):
  - **Campaign details** (`/admin/details`, default) — dismissable "Needs your attention" items, performance tiles,
    budget and the campaign brief.
  - **Collaborators** (`/admin/collaborators`) — invite-only and flat-fee (slot) campaigns: a creator list with Select all, Status (Pending / Approved) and Tier filters, search, and one row per creator (checkbox, photo, name, email · tier, remove). Pending invites read "Awaiting …’s response" with a Pending label (12px) and a copy-link button. Flat fee (slot) campaigns add an Agreed amount column after it (e.g. Rs. 65,000; the campaign’s flat fee scaled by tier); pending creators show “Not agreed yet” there, since their price is still open. Clicking a name opens the creator profile in a drawer from the right (photo, name, email, social
    profiles with followers, About the creator, total campaigns and views, last 5 brands); `Esc` or the scrim closes it.
    Invite-only campaigns add a blue Invite button at the top right and the copy-invite-link button on pending rows;
    open slot campaigns show the same list without them.
  - **Negotiations** (`/admin/negotiations`) — flat-fee (slot) campaigns only: the rules the platform's negotiation agent
    follows when it agrees the flat fee with every collaborator on the campaign (one set of rules per campaign, also for
    creators who join later): Price limits (opening offer, target and maximum per slot) and Time limit (deadline, reply
    window, rounds, what happens at the deadline).
  - **Pending approvals** (`/admin/pending`) — the original admin review as a vertical feed: each submission is a
    full-height row with the post (reel, image or swipeable carousel) in the centre column and the creator, caption,
    bio on the right. Approve / Reject sit on the post itself, at the bottom. Scroll for the next submission (one per screen on desktop); reels play only while on screen.
  - **Approved content** (`/admin/approved`) — grid of live posts with views; newly approved posts appear first.
  - **Analytics** (`/admin/analytics`) — headline tiles (views, total reach, engagement rate, live posts) and an Engagement card (impressions, reactions, comments, reposts), each with its own platform dropdown (All / Instagram / TikTok / YouTube); a per-day line chart with a metric dropdown (Views / Reach / Engagement rate / Submissions) above its title and its own platform dropdown (hover for each day's value), top creators (platforms, views, reach, engagement rate, paid amount, submission date).
  - **Inbox** (`/admin/inbox`) — conversations with creators; send replies in the open thread.

- **Financials** — the wallet icon next to Explore in the top menu (`#/financials`). Laid out like the campaign admin
  dashboard (same left card + sub menu (Overview, Monthly financials), drawer on phones, cards, tiles and tables). One wallet funds every campaign:
  - **Overview** (`/financials/overview`, default) — dismissable "Needs your attention" items (transfer being verified,
    rejected slip, budget shortfall), a Wallet card of tiles (balance, total added, spent; then free
    to spend, committed to campaign budgets, spent this month and pending verification), then spend by campaign for the last 10 campaigns.
  - **Monthly financials** (`/financials/monthly`) — added vs spent for the last six months in the analytics chart frame
    (click a month or use the dropdown); the month's opening, added, spent and closing balance; spend by campaign with a
    CSV statement download.
  - **Add funds** (`/financials/funds`, from the outlined button in the left card) — how it works, PolySocial's bank
    account as spec tiles (click to copy) and the payment reference, the transfer slip upload (PDF, JPG or PNG up to 10 MB,
    drag and drop), then **Bank transfers**: every uploaded slip with its status (`/financials/funds/transfers` scrolls
    to it). A new upload lands there as Pending; only verified transfers count towards the wallet. The bank details in
    `BANK` are placeholders.

## Assets

`assets.js` holds the images and icons shared with the creator web app. It is generated, not edited by hand:

```sh
node scripts/sync-assets.js <path-to-creator-web-app>
```

`images/hotzy-reel.jpg` is a demo reel frame taken from the admin-view mockup.
