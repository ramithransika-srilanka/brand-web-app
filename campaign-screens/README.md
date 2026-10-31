# Create campaign — screens

Screenshots of how a brand creates a campaign from the brand web app. These are mockups (images), not a working
feature. Patty Pop is the brand; the three campaigns follow the three chats in `ramithransika-srilanka/MCP-view`.

## The 4 steps (the same for every campaign)

A stepper at the top shows the 4 steps on every screen:

1. **Basics** — the brief (what the campaign is about), who designs it (*We’ll design it* or *Hire an expert*),
   who can join (*Open campaign* or *Invite only*) and the dates (go live on, ends on). Ends with *Send request*.
2. **Details & creators** — two tabs:
   - *Campaign design*: the full design (title, photos, requirement, hook, script, deliverable, platforms, best suited
     for, must be visible, CTA, restrictions). Comment on any section to request an edit, then approve.
   - *Creators*: the creator map (audience by age and location) and the creator list, to approve or select creators.
3. **Budget** — allocate from the brand budget (wallet), or send a bank transfer like in Financials (PolySocial’s bank
   details, payment reference, slip upload, pending verification).
4. **Go live** — the go-live date, a checklist, the terms to accept, and the creator view of the campaign. The brand
   can still request edits here, until the go-live date.

## The three campaign types

| Type | Step 1 choices | What changes inside the steps | Screens |
| --- | --- | --- | --- |
| **A · Crunch Chicken** | We’ll design it · Open | Polysocial prepares the design; brand approves the creators we suggest; budget from the brand budget | `png/a*.png` |
| **B · Kandy opening** | Hire an expert · Open | Ishara Fernando (expert) designs it and shortlists creators; commission is part of the budget | `png/b*.png` |
| **C · Family Feast** | We’ll design it · Invite only | Brand picks who to invite on the creator map; budget = each creator’s price, paid by bank transfer | `png/c*.png` |

Screens per type: `1-basics`, `2-design`, `2-creators`, `3-budget`, `4-golive`, `5-scheduled`. Also:

- `png/00-brand-page.png` — where it starts: *Create campaign* / *Request a new campaign* on the brand’s Campaigns page.
- `png/a4b-request-edits.png` — requesting an edit from the go-live step.
- `png/overview-self.png`, `png/overview-strat.png`, `png/overview-pick.png` — all screens of one type on one image.

## Updating the images

The screens are drawn by `screens.js` (styles in `create.css`) and opened with `screens.html?s=<id>`.

```sh
node campaign-screens/render.js        # png/<id>.png at 1440px wide, 2x
python3 campaign-screens/overview.py   # png/overview-<type>.png
```

`creators/` is the creator pool and avatars from MCP-view's creator map; `img/` is Patty Pop's logo and photos.
