# Create campaign — screens

Screenshots of how a brand creates a campaign from the brand web app. These are mockups (images), not a working
feature. Patty Pop is the brand; the three campaigns follow the three chats in `ramithransika-srilanka/MCP-view`.

## The 4 steps (the same for every campaign)

1. **Basics** — brief (with attachments), who designs it, who can join, dates. The title is written from the brief.
2. **Details & creators** — *Design*: the campaign design; comments open as pop-ups over the section they belong to and
   can be minimized to a pin. *Creators*: the Polysocial
   creator map, embedded exactly as deployed (Polysocial-mobile `site/creator-map/celeste`, unchanged).
3. **Budget** — allocate from the brand budget, or send a bank transfer.
4. **Go live** — go-live date, terms; request edits or confirm. *View as creator* opens the brand web app's own creator
   view drawer (`viewCampaignDrawer` in `../index.html`), filled with the campaign (`png/*4b-creator-view.png`).

## The three campaign types

| Type | Step 1 choices | Screens |
| --- | --- | --- |
| **A · Crunch Chicken** | We’ll design it · Open campaign | `png/a*.png` |
| **B · Kandy opening** | Hire an expert · Open campaign | `png/b*.png` |
| **C · Family Feast** | We’ll design it · Invite only | `png/c*.png` |

`png/00-brand-page.png` is where it starts (*Create campaign*); `png/overview-*.png` show all screens of one type.

## Updating the images

The screens are drawn by `screens.js` (styles in `create.css`) and opened with `screens.html?s=<id>`. `render.js` serves
Polysocial-mobile's `site/` on localhost:8765 so step 2 can embed the creator map (default path: `../../Polysocial-mobile`),
and for the creator view it loads `../index.html`, adds the campaign to its data and opens its drawer.

```sh
node campaign-screens/render.js [path-to-Polysocial-mobile]   # png/<id>.png at 1440px wide, 2x
python3 campaign-screens/overview.py   # png/overview-<type>.png
```

`creators/` is the creator pool and avatars from MCP-view's creator map; `img/` is Patty Pop's logo and photos.

## Sources (checked Oct 31, 2026)

| Repo | Version used | Deployed |
| --- | --- | --- |
| brand-web-app | `main` @ `9f2e4e5` (bank details on Account) | GitHub Pages builds `main`: last deploy `9f2e4e5` |
| MCP-view | `main` @ `e24816b` (creator map as chat UI) | GitHub Pages builds `main`: last deploy `e24816b` |
| Polysocial-mobile | `release-1.0.0(11)` = `main` @ `2412b77` | Netlify deploys `release-*` branches; creator data identical to `site/creator-map/celeste/data.js` |
| collaborators-web-app | `main` @ Oct 14 (invites, chats, commission ask) | Pages branch not visible from this session |
| creator-web-app | `main` @ Oct 10 (campaign page: pricing list, best suited for, requirements, created by, *Join now*) | Pages branch not visible from this session |
