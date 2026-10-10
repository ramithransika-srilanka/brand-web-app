# Patty Pop — Fiery BBQ Chicken Burger Launch Campaign

Campaign brief for **Patty Pop**, written in the shape `index.html` expects. Nothing in the UI uses it yet;
the ready-to-paste data is in [Data for the UI](#data-for-the-ui).

## Brief

| | |
|---|---|
| **Brand** | Patty Pop (`Patty Pop LK`) |
| **Product** | Fiery BBQ Chicken Burger: flame-grilled chicken thigh, smoky chipotle BBQ glaze, pepper-jack cheese, jalapeño slaw, charred brioche bun |
| **Objective** | Build launch-week buzz and drive first orders, in store and through delivery apps |
| **Category** | Food |
| **Brand-side status** | Active, launch window of 14 days |
| **Big idea** | **"Feel the Fire"**: creators film an honest first bite and rate the heat on a 1–5 🔥 scale |
| **Hashtags** | `#FeelTheFire` `#PattyPopLK` `#FieryBBQ` |

### Audience: best suited for

- Foodies and spice lovers, all genders
- Age 18–30
- Colombo and suburbs
- Formats: Reels and selfie / first-bite shots

### Pricing

| | |
|---|---|
| Base price per content | Rs. 5,500 |
| Max earning per content | Rs. 90,000 |
| Performance pricing | Rs. 1,600 / 1K views |
| Total budget | Rs. 1,500,000 |

Launch snapshot for the cards and admin view: **Rs. 486,250 spent / Rs. 1,013,750 available**,
32 % of budget used, 214 creators joined, posted 2 days ago, 12 days left.

### Content requirements

The shared `SPEC` (9:16, 30–45 s, 1080p, English/Sinhala, captions) and `RESTRICT` rules already apply.
Specific to this campaign:

- **Brand visibility:** the Patty Pop wrapper and the burger cross-section (glaze and slaw) clearly visible
- **Platforms:** TikTok, Instagram, Facebook
- **Must show:** the unwrap, the first bite with sound on, and a 1–5 🔥 heat rating to camera

### Call-to-action ideas

1. "Feel the Fire — the Fiery BBQ Chicken Burger is here."
2. "Rate the heat: how many 🔥 would you give it?"
3. "Grab yours at Patty Pop or order on Uber Eats and PickMe Food."

### Brand card ("Campaign created by")

| | |
|---|---|
| Name | Patty Pop LK |
| Since | Since Aug 2026 |
| Description | Smash burgers and loaded fries, grilled to order at 6 outlets across Colombo. |
| Total paid / Campaigns | Rs. 420 K / 5 |
| Content approval rate | 95 % |
| Approval time | 1 d |
| Responds within | 3 hrs |
| Handles | Instagram 18K · TikTok 7.6K · LinkedIn 640 |

### Sample creator submission (admin view)

| | |
|---|---|
| Creator | Dilan Fernando (`@dilan.bites`), avatar `av3` |
| Posted | 6 hrs ago |
| Media | Reel, 0:28 |
| Followers | TikTok 41K · Instagram 9.8K |
| Caption | Patty Pop said "fiery" and they meant it 🔥🍔 Smoky BBQ glaze, jalapeño slaw, and a heat score at the end. I'm giving it 4/5 🔥. #FeelTheFire #PattyPopLK #FieryBBQ #ad |
| Bio | Fast-food reviewer with zero chill. Big bites, honest scores, Colombo and suburbs. |

## Data for the UI

Paste into `C` and `SUB` in `index.html` and add `'pattypop'` to `EXPLORE` when you are ready to wire it up.

```js
// C
pattypop:{img:'pattypopHero',logo:'pattypopLogo',abbr:'PP',cat:'Food',status:'active',
  title:'Patty Pop Fiery BBQ Chicken Burger launch',time:'2 d ago',right:'12 d left',progress:32,joined:'214 joined',joinedShort:'200+',
  money:'<span>Rs. 486,250 /</span><b>Rs. 1,500,000</b>',spent:'Rs. 486,250',available:'Rs. 1,013,750',budget:'Rs. 1,500,000',budgetN:1500000,
  list:[['Base price per content','Rs. 5500'],['Max earning per content','Rs. 90,000'],['Performance pricing','Rs. 1600 / 1K views'],['Total budget','Rs. 1,500,000']],
  tags:[['Spice lovers','people'],['18-30 age','age'],['Colombo','pin'],['Selfie','camera'],['Reels','video']],
  reqDesc:'Launch the new Fiery BBQ Chicken Burger with an honest first bite: unwrap it, take the bite with sound on, and rate the heat from 1 to 5 🔥 on camera.',
  platforms:['tiktok','insta','facebook'],visibility:'Patty Pop wrapper and the burger cross-section clearly visible',
  ctas:['Feel the Fire — the Fiery BBQ Chicken Burger is here.','Rate the heat: how many 🔥 would you give it?','Grab yours at Patty Pop or order on Uber Eats and PickMe Food.'],
  brand:'Patty Pop LK',since:'Since Aug 2026',brandDesc:'Smash burgers and loaded fries, grilled to order at 6 outlets across Colombo.',
  totalPaid:'Rs. 420 K',campaigns:'5',metrics:[['Content approval rate','95 %'],['Approval time','1 d'],['Responds within','3 hrs']],
  handles:[['18K','insta'],['7.6K','tiktok'],['640','linkedin']]},

// SUB
pattypop:{name:'Dilan Fernando',handle:'@dilan.bites',av:'av3',posted:'6 hrs ago',
  media:{type:'reel',items:['pattypopHero'],length:'0:28'},
  followers:[['tiktok','41K'],['insta','9.8K']],
  caption:'Patty Pop said “fiery” and they meant it 🔥🍔 Smoky BBQ glaze, jalapeño slaw, and a heat score at the end. I’m giving it 4/5 🔥. #FeelTheFire #PattyPopLK #FieryBBQ #ad',
  bio:'Fast-food reviewer with zero chill. Big bites, honest scores, Colombo and suburbs.'},
```

### Assets needed

`pattypopHero` and `pattypopLogo` don't exist in `assets.js` yet. Until they're added, the cards and
campaign page fall back to the `PP` label, but the admin reel would show a broken image (`src()` treats an
unknown key as a file path). Add the assets before wiring this in. Hero image: a close-up of the burger cross-section with the glaze dripping on a dark,
smoky background, with room at the top-left for the brand pill. Logo: square, works on light and dark.
