# Create campaign — screens

Screenshots of the three ways a brand creates a campaign, in the brand web app's style. These are mockups (images),
not a working feature. The flows follow the three chats in `ramithransika-srilanka/MCP-view` (`#self`, `#strat`, `#pick`)
and use Patty Pop as the brand.

| Screens | Flow |
| --- | --- |
| `png/00-start.png` | Start: readiness checks (brand profile, access, wallet, bank details) and the three ways |
| `png/a1…a8-*.png`, `png/overview-self.png` | **Design it ourselves**: basics → creative brief → creators & content → cover & inspiration → budget & pricing → review → go-live confirm → live |
| `png/b1…b8-*.png`, `png/overview-strat.png` | **Hire a creative strategist**: basics → all-in budget → cover & inspiration → choose a strategist & invite → agree commission in chat → review design → review & go live → live |
| `png/c1…c8-*.png`, `png/overview-pick.png` | **Pick creators ourselves**: campaign idea → creator persona → pick creators → creative brief → cover → budget → review & invite → invites sent |

The screens are drawn by `screens.js` (one function per screen, styles in `create.css`) and opened with
`screens.html?s=<id>`. To update the images:

```sh
node campaign-screens/render.js        # png/<id>.png at 1440px wide, 2x
python3 campaign-screens/overview.py   # png/overview-<flow>.png
```

`creators/` is the creator pool and avatars from MCP-view's creator map; `img/` is Patty Pop's logo and photos.
