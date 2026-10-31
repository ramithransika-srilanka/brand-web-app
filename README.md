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
- **Request to create a campaign** — the blue button next to the Campaigns heading (`#/create`). The same 4 steps for
  every campaign, with a stepper at the top:
  1. **Basics** (`/create/basics`) — the brief (and photos), who designs it (*Hire an expert* is shown but disabled: Coming
     soon), who can join (Open campaign or Invite only) and the dates. No title: it is written from the brief.
     *Send request* moves on.
  2. **Details** (`/create/details`) — after a short "Preparing" moment, the campaign design written from the brief
     (title, brief, hook, script, deliverable, platforms, best suited for, must be visible, call to action) under the
     photos. Every section has a comment button; comments open as a pop-up over the section (reply, resolve, minimize
     to a pin). *Request edits* sends the open comments (Polysocial answers with a new version); *Approve design*
     moves on. Open campaigns are open to anyone, so that's all of step 2. Invite-only campaigns add a **Creators** tab
     (`/create/creators`) with the Polysocial creator map (polysocial.cc/creator-map/celeste) to pick the creators.
  3. **Budget** (`/create/budget`) — open campaigns: total budget, base price, performance pricing and max earning per
     content; invite only: flat fee per content × creators. Fund it by allocating from the brand budget (free to spend
     = wallet balance minus budgets already committed; blocked if it isn't enough) or by bank transfer (PolySocial's
     bank details, the amount and payment reference to copy, slip upload, Pending verification).
  4. **Go live** (`/create/golive`) — the go-live date and time (Change goes back to Basics), the terms to accept,
     *View as creator* (the same creator view drawer as the campaign dashboard, filled with this request) and
     *Request edits* (pick a section, say what should change). *Confirm & go live* schedules it (a transfer is added to
     Financials as pending) and shows the scheduled date (`/create/done`).
  The request is kept in the browser's local storage (`brand.campaignRequest`); the button starts a new one once the
  last one is scheduled.
- **Campaign page** — click any campaign (`#/campaign/<id>`). The status bar turns into a blue
  "You are viewing this page as a creator" notice, and the page shows the middle column of the creator
  web app's campaign page (`main` branch): hero with brand badge, title and meta, pricing list,
  best-suited-for tags, event details for events, requirements and "Campaign created by".
- **Admin dashboard** — "Switch to admin" on a campaign page (`#/campaign/<id>/admin`), laid out like a LinkedIn
  Page admin on a `#f6f6f6` canvas. The left column is a card with the campaign image, title, status and a
  "View as creator" button (it slides in the creator web app's campaign drawer under a blue "You are viewing this
  as a creator" bar; `Esc`, the scrim or "Admin view" closes it; phones go to the creator page instead), followed by the sub menu (badges show pending submissions and unread messages):
  - **What’s new** (`/admin/news`, default, top of the menu) — updates as a chat, split into sessions with their start time
    (scroll up for older ones). Actions that need attention (submissions to review, unread messages, brief to share) come
    as bubbles with a button in the latest session; a message box at the bottom lets the brand write back (placeholder
    reply for now).
  - **Campaign details** (`/admin/details`) — performance tiles,
    budget and the campaign brief.
  - **Collaborators** (`/admin/collaborators`) — every campaign: the brand's own team members on the campaign. Empty for now:
    a bordered box with a people (Users_Group) icon, "You haven’t invited any collaborators yet" and an Add people button.
  - **Negotiations** (`/admin/negotiations`) — flat-fee (slot) campaigns only: the rules the platform's negotiation agent
    follows when it agrees the flat fee with every creator on the campaign (one set of rules per campaign, also for
    creators who join later): Price limits (opening offer, target and maximum per slot) and Time limit (deadline, reply
    window, rounds, what happens at the deadline).
  - **Creators** (`/admin/creators`) — invite-only and flat-fee (slot) campaigns: a creator list with Select all, Status (Pending / Approved) and Tier filters, search, and one row per creator (checkbox, photo, name, email · tier, remove). Pending invites read "Awaiting …’s response" with a Pending label (12px) and a copy-link button. Flat fee (slot) campaigns add an Agreed amount column after it (e.g. Rs. 65,000; the campaign’s flat fee scaled by tier); it stays blank for pending creators, since their price is still open. Clicking a name opens the creator profile in a drawer from the right (photo, name, email, social
    profiles with followers, About the creator, total campaigns and views, last 5 brands); `Esc` or the scrim closes it.
    Invite-only campaigns add a blue Invite button at the top right and the copy-invite-link button on pending rows;
    open slot campaigns show the same list without them.
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
- **Brand profile** — the brand logo at the top right of the top menu (`#/profile`). Same dashboard frame as Financials:
  the left card has the cover, the brand logo (camera button to upload a new one, which also updates the top-menu logo),
  name, category and "Edit profile", then the sub menu:
  - **Brand profile** (`/profile/brand`, default) — the details creators see (name, category, website, location, about,
    profiles) with an Edit form, a Social accounts card, a Track record of tiles (campaigns, creators joined, paid to creators, approval
    rate).
    **Social accounts** shows one tile per connected account (logo with the platform badge, follower count, handle),
    then a dashed **Add** circle, and the total followers. Any of them opens the **Connected accounts** dialog:
    Instagram, TikTok, Facebook, YouTube and LinkedIn, each with Connect (a short stand-in for the platform's sign-in)
    or Disconnect.
  - **Team** (`/profile/team`) — who can log in to the brand. Invite someone by email with an access level (Full admin,
    Can edit, View only; the line under the form says what the chosen level can do); they appear in Members as Pending,
    with a resend button. Each member has an access dropdown and a remove button (not for you). The team always keeps at
    least one active full admin. An Access levels card explains the three levels.
  - **Account** (`/profile/account`) — the account owner (name, role, email, phone, editable), Bank details (account
    holder, bank, branch, account number; where PolySocial sends money back; only the brand adds or edits them), email notification
    switches and Security (change password, sign out — placeholders for now).
  Edits, the new logo, the team and the switches are kept in the browser's local storage (`brand.profile`).

## Assets

`assets.js` holds the images and icons shared with the creator web app. It is generated, not edited by hand:

```sh
node scripts/sync-assets.js <path-to-creator-web-app>
```

`images/hotzy-reel.jpg` is a demo reel frame taken from the admin-view mockup.
