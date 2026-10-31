/* =====================================================================
   Campaign creation screens — static mockups of the three ways a brand
   creates a campaign. screens.html?s=<id> draws one screen; render.js
   screenshots every id in SCREENS to png/.
   ===================================================================== */
const POOL = window.CREATOR_MAP.creators;
const by = (h) => POOL.find(c => c.handle === h);
const rs = (n) => 'Rs. ' + Math.round(n).toLocaleString('en-US');
const kf = (n) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K' : String(n);
const FREE = 3400000;

/* ---------- Icons ---------- */
const I = {
  logo: '<svg viewBox="0 0 269 184" fill="none"><path d="M121.556 4.06404C141.556 -7.48297 166.556 6.9505 166.556 30.0445C166.556 31.0921 165.899 32.0212 164.936 32.4319C152.062 37.9179 143.037 50.6867 143.037 65.564V116.564C143.037 131.086 151.636 143.598 164.02 149.29C165.519 149.979 166.556 151.435 166.556 153.085C166.555 176.178 141.556 190.612 121.556 179.065L15 117.545C-5 105.998 -5 77.1306 15 65.5836L121.556 4.06404Z" fill="currentColor"/><path d="M227.969 0.278931C250.418 0.27893 268.617 18.478 268.617 40.9274V140.409C268.617 162.858 250.418 181.056 227.969 181.056C210.666 181.056 195.891 170.245 190.025 155.01C189.233 152.955 190.505 150.769 192.546 149.942C205.734 144.6 215.037 131.669 215.037 116.564V65.5641C215.037 50.3684 205.621 37.3734 192.306 32.0911C190.279 31.2867 188.994 29.1414 189.737 27.0903C195.397 11.453 210.378 0.278951 227.969 0.278931Z" fill="currentColor"/></svg>',
  lockOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5.5 5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.2 1.8 3.7 4 4v3.1c-1.5 0-2.9-.4-4-1.2v6.6A5.5 5.5 0 1 1 11 10v3.2a2.4 2.4 0 1 0 2.3 2.4V3z"/></svg>',
  insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15V9l5.2 3z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1 .9-1h2.4V2h-3.3C10.4 2 9.7 4.7 9.7 6.4v2.1H7.5v3.9h2.2V22H14v-9.6h2.9l.4-3.9z"/></svg>',
};
const PLAT = {TikTok: I.tiktok, Instagram: I.insta, YouTube: I.yt, Facebook: I.fb};

/* ---------- Building blocks ---------- */
const chips = (all, on = [], icons) => `<div class="chips">${all.map(v => `<span class="chip${on.includes(v) ? ' on' : ''}">${icons && PLAT[v] ? PLAT[v] : ''}${v}</span>`).join('')}</div>`;
const inp = (v, ph = '') => `<input class="in" value="${String(v).replace(/"/g, '&quot;')}" placeholder="${ph}">`;
const money = (v, suf = '') => `<div class="ff"><em>Rs.</em><input value="${v ? Number(v).toLocaleString('en-US') : ''}" placeholder="0">${suf ? `<span class="suf">${suf}</span>` : ''}</div>`;
const sel = (v) => `<select><option>${v}</option></select>`;
const area = (v, rows = 3, ph = '') => `<textarea rows="${rows}" placeholder="${ph}">${v}</textarea>`;
const field = (label, ctl, o = {}) => `<label class="fl${o.cls ? ' ' + o.cls : ''}"><span class="lab">${label}${o.req ? ' <span class="req">Required</span>' : ''}${o.opt ? ' <span class="opt">Optional</span>' : ''}</span>${ctl}${o.hint ? `<span class="hint">${o.hint}</span>` : ''}</label>`;
const card = (title, sub, body, o = {}) => `<section class="dcard"><div class="dhead${o.right ? ' row' : ''}"><div>${o.kick ? `<div class="step-kick">${o.kick}</div>` : ''}<${o.h1 ? 'h1' : 'h2'}>${title}${o.req ? ' <span class="req">Required</span>' : ''}</${o.h1 ? 'h1' : 'h2'}>${sub ? `<p class="dsub">${sub}</p>` : ''}</div>${o.right || ''}</div>${body}</section>`;
const head = (kick, title, sub, right) => `<section class="dcard"><div class="dhead row" style="margin-bottom:0"><div><div class="step-kick">${kick}</div><h1>${title}</h1><p class="dsub">${sub}</p></div>${right || ''}</div></section>`;
const rcards = (items, on, cols = 2) => `<div class="rcards cols${cols}">${items.map(([t, d, ic]) => `<div class="rcard${t === on ? ' on' : ''}"><span class="rd"></span><div><b class="ic">${ic || ''}${t}</b><span>${d}</span></div></div>`).join('')}</div>`;
const checks = (items) => `<div class="checks">${items.map(([t, on]) => `<div class="ck${on ? ' on' : ''}"><span class="bx"></span>${t}</div>`).join('')}</div>`;
const tgl = (t, d, on) => `<div class="tgl${on ? ' on' : ''}"><div><b>${t}</b><span>${d}</span></div><span class="sw"></span></div>`;
const note = (html, cls = '') => `<div class="note ${cls}">${I.info}<div>${html}</div></div>`;
const tiles = (list, n = 3) => `<div class="tiles${n === 4 ? ' t4' : ''}">${list.map(([l, v, s]) => `<div class="tile"><span>${l}</span><b>${v}</b>${s ? `<small>${s}</small>` : ''}</div>`).join('')}</div>`;
const beats = (rows) => `<div class="rows">${rows.map(([t, d]) => `<div class="rowi"><input class="in" value="${t}"><input class="in" value="${d}"><span class="icbtn">${I.x}</span></div>`).join('')}<span class="addrow">+ Add beat</span></div>`;
const listRows = (rows, add) => `<div class="rows">${rows.map(v => `<div class="rowi one"><input class="in" value="${v}"><span class="icbtn">${I.x}</span></div>`).join('')}<span class="addrow">+ ${add}</span></div>`;
const kv = (rows) => `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd${v == null ? ' class="miss"' : ''}>${v == null ? 'Missing' : v}</dd>`).join('')}</dl>`;
const rsec = (title, rows) => `<div class="rsec"><div class="rh"><h3>${title}</h3><span class="link" style="display:flex;align-items:center;gap:4px;font-size:14px"><span style="width:14px;height:14px;display:inline-block">${I.pen}</span>Edit</span></div>${kv(rows)}</div>`;
const gates = (list) => `<div class="gates">${list.map(([t, d, ok]) => `<div class="gate ${ok ? 'ok' : 'no'}"><span class="gi">${ok ? '✓' : '!'}</span><div><b>${t}</b> <span>· ${d}</span></div></div>`).join('')}</div>`;
const tagsHTML = (list) => `<div class="tags">${list.map(t => `<span>${t}</span>`).join('')}</div>`;
const ini = (txt, grad, size = 44) => `<span class="pav ini" style="width:${size}px;height:${size}px;background:linear-gradient(135deg,${grad})">${txt}</span>`;
const cav = (c, size = 44) => `<img class="pav" style="width:${size}px;height:${size}px" src="creators/${c.photo}" alt="">`;

/* ---------- Page frame ---------- */
const FLOWS = {
  self: {name: 'Design it ourselves', steps: ['Basics', 'Creative brief', 'Creators & content', 'Cover & inspiration', 'Budget & pricing', 'Review & go live']},
  strat: {name: 'Hire a creative strategist', steps: ['Basics', 'Budget', 'Cover & inspiration', 'Choose a strategist', 'Agree commission', 'Review design', 'Review & go live']},
  pick: {name: 'Pick creators ourselves', steps: ['Campaign idea', 'Creator persona', 'Pick creators', 'Creative brief', 'Cover & inspiration', 'Budget', 'Review & invite']},
};

const topbar = (flow) => `<header class="topbar">
  <a class="logo">${I.logo}<span>Create campaign</span></a>
  <div class="top-mid">${flow ? FLOWS[flow].name : ''}</div>
  <div class="top-r">${flow ? '<span class="saved">Draft saved · just now</span><span class="btn btn-ghost btn-sm">Save &amp; exit</span>' : '<span class="btn btn-ghost btn-sm">Back to campaigns</span>'}<img class="avatar" src="img/pattypop.png" alt=""></div>
</header>`;

function side(flow, cur, p) {
  const steps = FLOWS[flow].steps;
  return `<aside class="side">
    <div class="cprev">
      <div class="cimg" style="${p.img ? `background-image:url(img/${p.img})` : ''}">${p.img ? '' : 'No cover yet'}<span class="bb"><img src="img/pattypop.png" alt="">Patty Pop</span></div>
      <div class="cbody">
        <div class="ctitle${p.title ? '' : ' ph'}">${p.title || 'Untitled campaign'}</div>
        <div class="status${p.live ? ' live' : ''}"><i></i>${p.live ? 'Live' : 'Draft'}</div>
        ${p.dates ? `<div class="cline">${I.cal}${p.dates}</div>` : ''}
        ${p.access ? `<div class="cline">${p.access === 'Invite only' ? I.lock : I.lockOpen}${p.access}</div>` : ''}
        ${p.fee ? `<div class="cline">${I.cash}${p.fee}</div>` : ''}
        ${p.extra ? `<div class="cline">${I.users}${p.extra}</div>` : ''}
      </div>
      <ol class="steps">${steps.map((s, i) => {
        const st = p.live || i < cur ? 'done' : i === cur ? 'cur' : '';
        return `<li class="${st}"><button><span class="sn">${st === 'done' ? '✓' : i + 1}</span><span>${s}</span><span class="sm">${st === 'done' ? '' : ''}</span></button></li>`;
      }).join('')}</ol>
    </div>
    ${p.hold != null ? wallet(p.hold, p.holdLabel) : ''}
  </aside>`;
}

function wallet(hold, label = 'This campaign holds') {
  const pct = Math.min(100, hold / FREE * 100);
  return `<div class="wallet"><div class="wl"><span>Wallet · free to spend</span><span class="link">Add funds</span></div><b>${rs(FREE)}</b>
    <div class="bar"><i style="width:${pct}%"></i></div><div class="wn">${label} ${rs(hold)} at go live</div></div>`;
}

const actbar = (miss, primary = 'Continue', back = 'Back', ok) => `<div class="actbar"><div class="in2"><span class="btn btn-ghost">${back}</span><span class="miss${ok ? ' ok' : ''}">${miss}</span><span class="btn btn-pri${ok === false ? ' off' : ''}">${primary}</span></div></div>`;

const frame = (flow, cur, p, main, bar) => `${topbar(flow)}<div class="page"><div class="frame">${side(flow, cur, p)}<div class="main nav-in">${main}${bar || ''}</div></div></div>`;

/* ---------- Shared content ---------- */
const CATS = ['Food', 'Mobility', 'Entertainment', 'Lifestyle', 'Price'];
const GOALS = ['Trial', 'Awareness', 'Store visits', 'Orders', 'Event attendance'];
const CITIES = ['Colombo', 'Galle', 'Kandy', 'Negombo', 'Jaffna', 'Kurunegala', 'All island'];
const RESTRICT = ['No AI generated content', 'Face must be visible in the content', 'No competitor brands in the frame', 'Caption must tag the brand handle', 'Use only licensed or original audio', 'Keep the post live for at least 30 days'];

function basics(o) {
  return head(`Step 1 of ${o.n}`, o.h || 'Basics', o.sub || 'What the campaign is for and when it runs. Creators see the title, category and dates on the campaign card.') +
    card('Campaign', '', `<div class="stack">
      ${field('Campaign title', inp(o.title, 'e.g. Pop Crunch Chicken — The crunch you can hear'), {req: 1, hint: 'Short and specific. This is the headline creators see.'})}
      ${field('Category', chips(CATS, ['Food']), {req: 1})}
      ${field('Goal', chips(GOALS, [o.goal]), {req: 1, hint: 'Used to suggest pricing and to report results.'})}
      ${field(o.offerLabel || 'Product or offer', inp(o.offer), {req: 1})}
      ${o.extraBasics || ''}
    </div>`) +
    card('Timeline &amp; location', '', `<div class="stack"><div class="grid2">
      ${field('Start date', inp(o.start), {req: 1})}${field('End date', inp(o.end), {req: 1, hint: o.endHint || ''})}</div>
      ${field('Where creators’ audiences should be', chips(CITIES, o.cities), {req: 1})}
      ${o.event ? tgl('This campaign is for an event', 'Adds the event date, time, venue and ticket link to the campaign page.', true) + `<div class="grid2">${field('Event date', inp(o.event.date))}${field('Time', inp(o.event.time))}${field('Venue', inp(o.event.venue))}${field('Link', inp(o.event.link), {opt: 1})}</div>` : tgl('This campaign is for an event', 'Adds the event date, time, venue and ticket link to the campaign page.', false)}
    </div>`);
}

function media(o) {
  return head(`Step ${o.i} of ${o.n}`, 'Cover image &amp; inspiration', o.sub) +
    card('Cover image', 'The first thing creators see on the campaign card and page. 16:9 or wider, at least 1600px.', o.cover ? `<div class="stack"><div class="coverprev" style="background-image:url(img/${o.cover})"><span class="tag pill blue">Cover image</span><div class="acts"><span class="btn">Replace</span><span class="btn">Remove</span></div></div><span class="hint" style="font-size:13px;color:var(--grey-600)">${o.coverName} · 2.4 MB · 2400 × 1050</span></div>` :
      `<div class="drop">${I.up}<div><b>Drop an image here</b> or click to upload</div><span style="font-size:13px">JPG or PNG, up to 10 MB</span></div>
       <div class="samples" style="margin-top:12px">Or pick from your brand assets:<button><img src="img/ppBiteWide.jpg"></button><button><img src="img/ppMeal.jpg"></button><button><img src="img/ppBite.jpg"></button><span class="link">See all 12</span></div>`, {req: 1}) +
    card('Inspiration posts', o.inspSub || 'Reels or posts that have the style you’re after. Creators see them as “the style we’re after”.', `<div class="stack">
      <div style="display:grid;grid-template-columns:1fr auto;gap:10px">${inp('', 'Paste a TikTok, Instagram or YouTube link')}<span class="btn btn-sec">Add link</span></div>
      ${o.posts && o.posts.length ? `<div class="insp">${o.posts.map(p => `<div class="ip"><div class="th" style="background-image:url(img/${p.img});${p.pos ? `background-position:${p.pos}` : ''}"><span class="pl" style="--s:12px">${p.pl}</span></div><span class="rm">${I.x}</span><div class="meta">${p.handle}</div></div>`).join('')}</div>` : ''}
      ${note('Links must be <b>public</b> so creators can open them.' + (o.inspExtra || ''))}
    </div>`, o.inspReq ? {req: 1} : {right: '<span class="opt">Optional</span>'}) + (o.after || '');
}

/* =====================================================================
   SCREENS
   ===================================================================== */
const SCREENS = {};

/* ---------- 00 · Start: readiness + choose a way ---------- */
SCREENS['00-start'] = () => `${topbar()}<div class="page">
  <div class="hero"><h1>Create a campaign</h1><p>Choose how you want to work. You can save a draft at any step and come back to it.</p></div>
  <section class="dcard tight" style="margin:24px 0 20px"><div class="dhead row" style="margin-bottom:14px"><div><h2>Ready to go live</h2><p class="dsub">What Patty Pop needs before a campaign can be published.</p></div><span class="pill good">4 of 4 ready</span></div>
    <div class="ready">
      <div class="gate ok"><span class="gi">✓</span><div class="gt"><b>Brand profile</b><span>Name, logo, category, about, 3 social accounts</span><a class="link">View profile</a></div></div>
      <div class="gate ok"><span class="gi">✓</span><div class="gt"><b>Your access</b><span>Full admin: can create and publish</span><a class="link">Team</a></div></div>
      <div class="gate ok"><span class="gi">✓</span><div class="gt"><b>Wallet</b><span>${rs(FREE)} free to spend · verified</span><a class="link">Add funds</a></div></div>
      <div class="gate ok"><span class="gi">✓</span><div class="gt"><b>Bank details</b><span>For refunds of unspent budget</span><a class="link">Account</a></div></div>
    </div></section>
  <div class="ways">
    ${[
      ['self', '#c6613f,#e08a62', I.pen, 'Design it ourselves', 'Your team writes the brief. Any matching creator can join and is paid on performance.', ['Hook, script, audience and platforms from you', 'Cover image and inspiration posts', 'Performance or flat fee budget', 'You approve the content'], '6 steps · ~10 min'],
      ['strat', '#5b2bb0,#9a5fe6', I.star, 'Hire a creative strategist', 'No time to design it? A Polysocial strategist designs and runs it for a commission.', ['Set an all-in budget first', 'Pick one of three matched strategists', 'Agree the commission in chat', 'Approve their design, they run it'], '7 steps · over 1–3 days'],
      ['pick', '#123bbd,#3d6bf5', I.users, 'Pick creators ourselves', 'Give the idea and a creator persona, then choose exactly who posts. Invite only.', ['Basic idea, no design needed', 'Match creators by persona and audience', 'Pick on the creator list, see each price', 'Budget = each creator’s price per reel'], '7 steps · ~15 min'],
    ].map(([k, g, ic, t, d, li, f]) => `<div class="way"><div class="wimg" style="background:linear-gradient(135deg,${g})">${ic}</div><div class="wb"><h2>${t}</h2><p>${d}</p><ul>${li.map(x => `<li>${x}</li>`).join('')}</ul><div class="wf"><span>${f}</span><span class="btn btn-pri btn-sm">Start</span></div></div></div>`).join('')}
  </div>
  <section class="dcard tight" style="margin-top:20px"><h3 style="margin-bottom:10px">Drafts</h3><table class="tb"><tbody>
    <tr><td><b>Pop Crunch Chicken — The crunch you can hear</b></td><td>Design it ourselves</td><td>Step 3 of 6</td><td class="r"><span class="link">Continue</span></td></tr>
  </tbody></table></section>
</div>`;

/* ---------- A · Design it ourselves ---------- */
const A = {title: 'Pop Crunch Chicken — The crunch you can hear', dates: 'Oct 19 – Nov 8, 2026'};
const pA = (o = {}) => Object.assign({title: A.title, dates: A.dates, access: 'Open campaign', fee: 'Performance based pay'}, o);

SCREENS['a1-basics'] = () => frame('self', 0, {title: A.title, dates: A.dates},
  basics({n: 6, title: A.title, goal: 'Trial', offer: 'Pop Crunch Chicken burger', start: 'Mon, Oct 19, 2026', end: 'Sun, Nov 8, 2026', endHint: '3 weeks', cities: ['Colombo', 'Galle']}),
  actbar('All required fields are filled', 'Continue', 'Back', true));

SCREENS['a2-brief'] = () => frame('self', 1, pA({access: null, fee: null}),
  head('Step 2 of 6', 'Creative brief', 'What creators should make. Be as specific as you like: the hook, the beats and what must be on screen.') +
  card('The idea', '', `<div class="stack">
    ${field('What should creators show?', area('Show the moment you’re starving, walk into Patty Pop, and take the first big crunchy bite of the new Pop Crunch Chicken.', 3), {req: 1, hint: 'Shown on the campaign page as the requirement.'})}
    ${field('Hook', inp('POV: you found the crunchiest burger in Colombo'), {req: 1, hint: 'The first 3 seconds.'})}
  </div>`) +
  card('Script beats', 'Optional timing for each part of the reel.', beats([['0–3s', 'Starving moment — late-night study, after cricket or after work'], ['3–8s', 'Walk into Patty Pop and order the Pop Crunch Chicken'], ['8–15s', 'First big bite, slow-mo crunch, burger to camera'], ['15s+', 'Happy reaction + “Pop Crunch Chicken, now at Patty Pop”']]), {req: 1}) +
  card('Brand visibility &amp; call to action', '', `<div class="stack">
    ${field('Must be visible', inp('The Pop Crunch Chicken up close, plus the Patty Pop wrapper or logo'), {req: 1})}
    ${field('Caption calls to action', listRows(['Try the Pop Crunch Chicken at your nearest Patty Pop and tag @pattypoplk 🍔', 'The crunch you can hear. Only at Patty Pop.'], 'Add CTA'), {req: 1, hint: 'Creators use one of these in the caption.'})}
    ${field('Tone', chips(['Fun', 'Loud', 'Authentic', 'Premium', 'Heartfelt', 'Informative'], ['Fun', 'Loud', 'Authentic']))}
  </div>`),
  actbar('All required fields are filled', 'Continue', 'Back', true));

SCREENS['a3-creators'] = () => frame('self', 2, pA({fee: null}),
  head('Step 3 of 6', 'Creators &amp; content', 'Who can join, who it suits and what they deliver.') +
  card('Who can join', '', rcards([['Open', 'Every creator who matches can join. Best for reach.', I.lockOpen], ['Invite only', 'Only creators you invite. You add them after publishing.', I.lock]], 'Open'), {req: 1}) +
  card('Best suited for', 'Shown on the campaign page and used to notify matching creators.', `<div class="stack">
    ${field('Audience gender', chips(['All genders', 'Mostly women', 'Mostly men'], ['All genders']))}
    ${field('Audience age', chips(['13–17', '18–24', '25–34', '35–44', '45+'], ['18–24', '25–34']), {req: 1})}
    ${field('Audience interests', chips(['Students', 'Young professionals', 'Foodies', 'Families', 'Gym & sport', 'Nightlife'], ['Students', 'Young professionals', 'Foodies']))}
    ${field('Content style', chips(['Selfie', 'Vlog', 'Skit', 'Review', 'Mukbang', 'Voice-over'], ['Selfie', 'Review', 'Mukbang']))}
  </div>`) +
  card('Platforms &amp; deliverable', '', `<div class="stack">
    ${field('Platforms', chips(['TikTok', 'Instagram', 'YouTube', 'Facebook'], ['TikTok', 'Instagram'], 1), {req: 1})}
    <div class="grid4">${field('Format', sel('Reel'))}${field('Duration', sel('15–30 seconds'))}${field('Quality', sel('Min 1080p'))}${field('Orientation', sel('Vertical 9:16'))}</div>
    ${field('Language', chips(['English', 'Sinhala', 'Tamil', 'Singlish'], ['English', 'Sinhala', 'Singlish']))}
    ${tgl('Captions required', 'On-screen captions for viewers watching without sound.', true)}
  </div>`) +
  card('Restrictions', 'Your brand defaults. Creators must agree to them before joining.', `${checks(RESTRICT.map(r => [r, 1]))}<span class="addrow" style="margin-top:8px">+ Add restriction</span>`),
  actbar('All required fields are filled', 'Continue', 'Back', true));

SCREENS['a4-media'] = () => frame('self', 3, pA({img: 'ppBiteWide.jpg', fee: null}),
  media({i: 4, n: 6, sub: 'Always from your team: Polysocial can’t make these for you.', cover: 'ppBiteWide.jpg', coverName: 'crunch_chicken_cover.jpg', inspReq: 1,
    posts: [{img: 'ppMeal.jpg', pos: '62% 70%', pl: 'TikTok', handle: '@kavindu.bites'}, {img: 'ppBite.jpg', pl: 'Instagram', handle: '@colombo.foodie'}, {img: 'ppMeal.jpg', pos: '95% 50%', pl: 'TikTok', handle: '@dilan.bites'}]}),
  actbar('Cover and 3 inspiration posts added', 'Continue', 'Back', true));

SCREENS['a5-budget'] = () => frame('self', 4, pA({img: 'ppBiteWide.jpg', hold: 600000}),
  head('Step 5 of 6', 'Budget &amp; pricing', 'How creators are paid. The total budget is held from your wallet when the campaign goes live; anything unspent comes back.') +
  card('Pay model', '', rcards([['Performance fee', 'A base price per post plus a rate per 1K views, up to a maximum.', I.cash], ['Flat fee', 'A fixed amount per creator for a set number of slots. Our agent negotiates each fee.', I.users]], 'Performance fee'), {req: 1}) +
  card('Pricing', 'Suggested from 4 past Patty Pop campaigns and the Food category.', `<div class="stack"><div class="grid2">
    ${field('Base price per content', money(6000), {hint: 'Paid for every approved post'})}
    ${field('Performance pricing', money(1800, '/ 1K views'), {hint: 'Food median: Rs. 1,500–2,000'})}
    ${field('Max earning per content', money(90000), {hint: 'Caps what one post can earn'})}
    ${field('Total budget', money(600000), {req: 1, hint: 'Held from your wallet at go live'})}
  </div>${tiles([['Expected creators', '70–90'], ['Expected views', '1.6–2.0M'], ['Cost per 1K views', '~Rs. 330']])}
  ${note(`You have <b>${rs(FREE)}</b> free to spend. After this campaign: <b>${rs(FREE - 600000)}</b>.`, 'good')}</div>`),
  actbar('Budget fits your wallet', 'Review', 'Back', true));

SCREENS['a6-review'] = () => frame('self', 5, pA({img: 'ppBiteWide.jpg', hold: 600000}),
  head('Step 6 of 6', 'Review &amp; go live', 'Check everything once. Creators see it the moment it goes live.', '<span class="btn btn-sec btn-sm">Preview as creator</span>') +
  card('Ready to publish', '', gates([['Brand connected', 'verified · you are a full admin', 1], ['Design done', 'brief, creators &amp; content', 1], ['Cover &amp; inspiration', '1 cover, 3 public posts', 1], ['Budget funded', `${rs(600000)} of ${rs(FREE)} free`, 1], ['No missing fields', 'validated just now', 1]])) +
  card('Summary', '', [
    rsec('Basics', [['Title', A.title], ['Category · goal', 'Food · Trial'], ['Dates', 'Oct 19 – Nov 8, 2026 · 3 weeks'], ['Audience location', 'Colombo, Galle']]),
    rsec('Creative brief', [['Hook', '“POV: you found the crunchiest burger in Colombo”'], ['Script', '4 beats · 15–30s'], ['Must be visible', 'The burger up close + Patty Pop wrapper or logo'], ['CTAs', '2']]),
    rsec('Creators &amp; content', [['Who can join', 'Open'], ['Best suited for', tagsHTML(['18–34', 'Students', 'Young professionals', 'Foodies'])], ['Deliverable', '1 reel · 15–30s · 9:16 · TikTok, Instagram'], ['Restrictions', '6 brand defaults']]),
    rsec('Budget', [['Pay model', 'Performance fee'], ['Pricing', 'Rs. 6,000 base + Rs. 1,800 / 1K views, max Rs. 90,000'], ['Total budget', rs(600000)]]),
  ].join('')),
  actbar('Everything is ready', 'Go live', 'Back', true));

const goLiveModal = (title, rows, body, btn = 'Go live') => `<div class="scrim"><div class="modal"><h2>${title}</h2><p>${body}</p><dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl><div class="mrow"><span class="btn btn-ghost">Cancel</span><span class="btn btn-pri">${btn}</span></div></div></div>`;
SCREENS['a7-confirm'] = () => SCREENS['a6-review']() + goLiveModal('Go live now?', [['Visible to', '~1,480 matching creators'], ['Held from your wallet', rs(600000)], ['Wallet after', rs(FREE - 600000)], ['Posting starts', 'Mon, Oct 19']], 'The campaign becomes visible to creators straight away and the budget is held from your wallet. You can pause it at any time.');

const liveScreen = (flow, cur, p, title, body, tl, btns) => frame(flow, cur, p, `<section class="dcard"><div class="success"><span class="big">${I.check}</span><h1>${title}</h1><p>${body}</p><div class="tl">${tl.map(([t, d], i) => `<div class="${i === 0 ? 'on' : ''}"><b>${t}</b>${d}</div>`).join('')}</div><div style="display:flex;gap:8px">${btns.map((b, i) => `<span class="btn ${i ? 'btn-sec' : 'btn-pri'}">${b}</span>`).join('')}</div></div></section>`);
SCREENS['a8-live'] = () => liveScreen('self', 6, pA({img: 'ppBiteWide.jpg', live: 1}), 'Your campaign is live',
  '1,480 matching creators in Colombo and Galle have been notified. Content comes to you for approval in the campaign’s Pending approvals.',
  [['Today', 'Live · creators join'], ['Oct 19', 'Posting starts'], ['Nov 8', 'Last post'], ['Nov 15', 'Payouts &amp; report']], ['Open campaign dashboard', 'Create another']);

/* ---------- B · Hire a creative strategist ---------- */
const B = {title: 'Patty Pop Kandy store opening', dates: 'Nov 20 – Dec 14, 2026'};
const pB = (o = {}) => Object.assign({title: B.title, dates: B.dates, fee: 'Strategist designs it'}, o);
const STRATS = [
  {ini: 'IF', g: '#1548eb,#f433ab', name: 'Ishara Fernando', role: 'Senior Creative Strategist · Food &amp; beverage', city: 'Kandy', comm: '12–15%', camp: 38, rate: '4.9', fit: 'Best match', why: 'Ran 3 store openings in Kandy; knows the local food creators.'},
  {ini: 'RP', g: '#0f2d8f,#7391f3', name: 'Ravindu Perera', role: 'Creative Strategist · Lifestyle &amp; retail', city: 'Colombo', comm: '8–10%', camp: 14, rate: '4.6', fit: 'Lowest cost', why: 'Strong on retail launches; fewer Kandy creators in his network.'},
  {ini: 'HC', g: '#a8641a,#f433ab', name: 'Malsha Gunawardena', role: 'Agency lead · Hill Country Creators', city: 'Kandy &amp; Nuwara Eliya', comm: '15–18%', camp: 61, rate: '4.8', fit: 'Full service', why: 'Agency team: shoots, edits and reports for you.'},
];

SCREENS['b1-basics'] = () => frame('strat', 0, {title: B.title, dates: B.dates},
  basics({n: 7, title: B.title, goal: 'Store visits', offerLabel: 'What are you promoting?', offer: 'Our new Patty Pop store in Kandy · free fries on opening weekend', start: 'Fri, Nov 20, 2026', end: 'Mon, Dec 14, 2026', cities: ['Kandy'],
    event: {date: 'Sat, Dec 5, 2026', time: '11 am onwards', venue: 'Patty Pop, Peradeniya Rd, Kandy', link: ''},
    extraBasics: field('Anything the strategist should know?', area('Opening weekend is Dec 5–6. We want families and students from Kandy and Peradeniya. My team is swamped with the holiday season.', 3), {opt: 1})}),
  actbar('All required fields are filled', 'Continue', 'Back', true));

SCREENS['b2-budget'] = () => frame('strat', 1, pB({hold: 800000, holdLabel: 'This campaign uses up to'}),
  head('Step 2 of 7', 'Budget', 'Set the total first. It includes the strategist’s commission, which you agree with them in step 5.') +
  card('Total budget, all-in', '', `<div class="stack">
    ${field('Total budget', money(800000), {req: 1, hint: 'Creator payments + strategist commission'})}
    <table class="tb"><thead><tr><th>If the commission is</th><th class="r">Strategist</th><th class="r">Creators get</th></tr></thead><tbody>
      <tr><td>10%</td><td class="r">${rs(80000)}</td><td class="r">${rs(720000)}</td></tr>
      <tr><td>12% <span class="pill blue">Food median</span></td><td class="r">${rs(96000)}</td><td class="r">${rs(704000)}</td></tr>
      <tr><td>15%</td><td class="r">${rs(120000)}</td><td class="r">${rs(680000)}</td></tr></tbody></table>
    ${note('The commission is charged only when you <b>approve the strategist’s design</b>. If you don’t approve it, you pay nothing.')}
  </div>`) +
  card('What the strategist does', '', tiles([['Designs', 'Brief &amp; mix', 'hook, script, creator tiers'], ['Runs', 'Day to day', 'invites, approvals, chasing posts'], ['Reports', 'Weekly', 'views, visits, spend']])),
  actbar('Budget fits your wallet', 'Continue', 'Back', true));

SCREENS['b3-media'] = () => frame('strat', 2, pB({img: 'ppBite.jpg', hold: 800000, holdLabel: 'This campaign uses up to'}),
  media({i: 3, n: 7, sub: 'The strategist uses these as the visual direction, and creators see the cover first. Add them before inviting a strategist.', cover: 'ppBite.jpg', coverName: 'brand_shoot_03.jpg', inspReq: 1,
    posts: [{img: 'ppMeal.jpg', pos: '30% 50%', pl: 'Instagram', handle: '@kandy.eats'}, {img: 'ppBiteWide.jpg', pl: 'TikTok', handle: '@hillcountry.food'}]}),
  actbar('Cover and 2 inspiration posts added', 'Continue', 'Back', true));

SCREENS['b4-strategist'] = () => frame('strat', 3, pB({img: 'ppBite.jpg', hold: 800000, holdLabel: 'This campaign uses up to'}),
  head('Step 4 of 7', 'Choose a strategist', 'Matched on category, location and availability for your dates. You invite one; they accept and start a chat with you.') +
  `<div class="rcards">${STRATS.map((s, i) => `<div class="rcard${i === 0 ? ' on' : ''}" style="grid-template-columns:20px 44px 1fr auto;align-items:center"><span class="rd"></span>${ini(s.ini, s.g)}<div><b>${s.name} <span class="pill ${i === 0 ? 'blue' : ''}" style="margin-left:4px">${s.fit}</span></b><span>${s.role} · ${s.city}</span><span style="margin-top:6px;color:var(--grey-700)">${s.why}</span></div>
    <div style="text-align:right;display:grid;gap:2px"><b style="font-size:18px">${s.comm}</b><span>commission</span><span>${s.camp} campaigns · ★ ${s.rate}</span></div></div>`).join('')}</div>` +
  card('The invite', 'What Ishara sees in her Invites.', `<div class="stack"><div style="border:1px solid var(--line);border-radius:16px;padding:16px;display:grid;gap:10px">
      <div class="prow"><img class="pav" src="img/pattypop.png"><div><b>${B.title}</b><span>Food · starts Nov 20, 2026</span></div><span class="pill warn" style="margin-left:auto">Closes in 47:59:12</span></div>
      ${tagsHTML(['One time project', 'Commission based', 'Kandy', 'Budget Rs. 800,000'])}
      <p style="color:var(--grey-700)">Bring people into the new Kandy store, opening Dec 5. Free fries on opening weekend. Families and students from Kandy and Peradeniya.</p>
      <div style="display:flex;gap:6px"><img src="img/ppBite.jpg" style="width:56px;height:40px;border-radius:8px;object-fit:cover"><img src="img/ppMeal.jpg" style="width:56px;height:40px;border-radius:8px;object-fit:cover"><img src="img/ppBiteWide.jpg" style="width:56px;height:40px;border-radius:8px;object-fit:cover"></div></div>
    ${field('Message to Ishara', area('Hi Ishara, we’d love you to design and run our Kandy opening. Brief and visuals attached.', 2), {opt: 1})}</div>`),
  actbar('Nothing is charged when you send an invite', 'Send invite to Ishara', 'Back', true));

SCREENS['b5-commission'] = () => frame('strat', 4, pB({img: 'ppBite.jpg', hold: 800000, holdLabel: 'This campaign uses up to', extra: 'Ishara Fernando · invited'}),
  head('Step 5 of 7', 'Agree commission', 'Ishara accepted your invite. Agree her commission here; it comes out of your Rs. 800,000.', `<div class="prow">${ini('IF', STRATS[0].g, 36)}<div><b style="font-size:14px">Ishara Fernando</b><span><span style="color:var(--good)">●</span> Online</span></div></div>`) +
  `<section class="dcard"><div class="frame" style="grid-template-columns:minmax(0,1fr) 260px;gap:16px">
    <div style="display:grid;gap:12px"><div class="thread" style="max-height:none">
      <div class="msg sys">Ishara accepted your invite · Today 10:42</div>
      <div class="msg me files"><span class="who">Patty Pop</span>Kandy store opening · Nov 20 – Dec 14 · budget Rs. 800,000 all-in. Brief, cover and inspiration attached.<div class="fx"><img src="img/ppBite.jpg"><img src="img/ppMeal.jpg"><img src="img/ppBiteWide.jpg"></div></div>
      <div class="msg them"><span class="who">Polysocial</span>What commission would you expect for managing this campaign?</div>
      <div class="msg them"><span class="who">Ishara Fernando</span>Happy to take this on! 15% (Rs. 120,000). That covers the design, creator invites, approvals and a final report.</div>
      <div class="msg me"><span class="who">Patty Pop</span>Could you do 12% if weekly reports are included?</div>
      <div class="msg them"><span class="who">Ishara Fernando</span>Deal: 12% with weekly reports every Monday. 👍</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr auto;gap:10px">${inp('', 'Write a message…')}<span class="btn btn-sec">Send</span></div></div>
    <div style="display:grid;gap:12px;align-content:start">
      <div class="tile"><span>Agreed</span><b>12%</b><small>${rs(96000)} · creators get ${rs(704000)}</small></div>
      <div class="tile"><span>Ishara’s last 5 campaigns</span><b>13.2%</b><small>average commission</small></div>
      <div class="tile"><span>Food category median</span><b>12%</b><small>for budgets Rs. 0.5–1M</small></div>
      ${note('Charged only when you approve her design.', '')}
    </div></div></section>`,
  actbar('Ishara agreed to 12% with weekly reports', 'Hire Ishara at 12%', 'Back', true));

SCREENS['b6-design'] = () => frame('strat', 5, pB({img: 'ppBite.jpg', title: 'Patty Pop Kandy — First bite in the hills', hold: 704000, holdLabel: 'Creators’ budget', extra: 'Ishara Fernando · 12%'}),
  head('Step 6 of 7', 'Review design', 'Ishara sent version 2 after your feedback. Approve it to go live; her commission is charged on approval.', '<span class="pill blue">Version 2 · today 4:15 pm</span>') +
  card('Patty Pop Kandy — First bite in the hills', 'Designed by Ishara Fernando', `<div class="stack">
    <div class="coverprev" style="background-image:url(img/ppBite.jpg);aspect-ratio:16/5"></div>
    ${kv([['Hook', '“I drove up to Kandy for one bite…”'], ['Script', '0–3s the drive up · 3–10s queue on opening day · 10–20s first bite + free fries · 20s+ “Patty Pop, now in Kandy”'], ['Must be visible', 'The store front on Peradeniya Rd and the free-fries offer'], ['Platforms', 'Instagram, TikTok'], ['Tracking', 'Free fries with code KANDYPOP: counts visits from each creator']])}
    <table class="tb"><thead><tr><th>Creator mix</th><th>Creators</th><th class="r">Per creator</th><th class="r">Total</th></tr></thead><tbody>
      <tr><td>Macro · 100K+ <span class="pill warn">−2 in v2</span></td><td>2</td><td class="r">${rs(120000)}</td><td class="r">${rs(240000)}</td></tr>
      <tr><td>Micro · 10–50K <span class="pill good">+18 in v2</span></td><td>40</td><td class="r">${rs(9000)}</td><td class="r">${rs(360000)}</td></tr>
      <tr><td>Performance bonus pool</td><td>—</td><td class="r">Rs. 1,500 / 1K views</td><td class="r">${rs(104000)}</td></tr></tbody>
      <tfoot><tr><td>Creators’ budget</td><td>42</td><td></td><td class="r">${rs(704000)}</td></tr></tfoot></table>
    ${tiles([['Nov 28', 'Teasers'], ['Dec 5', 'Store opens'], ['Dec 14', 'Close &amp; report']])}
  </div>`) +
  card('Feedback for Ishara', 'Ask for changes, or approve this version.', `<div class="stack">${field('', area('', 2, 'e.g. Can we add more students from Peradeniya?'))}<div style="display:flex;gap:8px"><span class="btn btn-sec">Request changes</span><span class="hint" style="align-self:center;color:var(--grey-600);font-size:13px">v1 → v2: moved macro money to more micro creators</span></div></div>`),
  actbar('Approving charges Ishara’s commission (Rs. 96,000)', 'Approve design', 'Back', true));

SCREENS['b7-review'] = () => frame('strat', 6, pB({img: 'ppBite.jpg', title: 'Patty Pop Kandy — First bite in the hills', hold: 704000, holdLabel: 'Creators’ budget', extra: 'Ishara Fernando · 12%'}),
  head('Step 7 of 7', 'Review &amp; go live', 'Ishara runs the campaign day to day. You’re only asked about budget changes.', '<span class="btn btn-sec btn-sm">Preview as creator</span>') +
  card('Ready to publish', '', gates([['Brand connected', 'verified · full admin', 1], ['Design approved', 'version 2 by Ishara Fernando', 1], ['Cover &amp; inspiration', '1 cover, 2 public posts', 1], ['Strategist hired', '12% · Rs. 96,000 charged on approval', 1], ['Budget funded', `${rs(704000)} for creators`, 1]])) +
  card('Summary', '', [
    rsec('Basics', [['Title', 'Patty Pop Kandy — First bite in the hills'], ['Goal', 'Store visits · opening Sat, Dec 5'], ['Dates', B.dates], ['Location', 'Kandy']]),
    rsec('Strategist', [['Managed by', 'Ishara Fernando'], ['Commission', '12% · Rs. 96,000 · weekly reports'], ['Approves content', 'Ishara']]),
    rsec('Budget', [['Total', rs(800000)], ['Creators', `${rs(704000)} · 2 macro, 40 micro + bonus pool`], ['Who can join', 'Macro by invite · micro open in Kandy area']]),
  ].join('')),
  actbar('Everything is ready', 'Go live', 'Back', true)) +
  goLiveModal('Go live now?', [['Run by', 'Ishara Fernando'], ['Invites', '2 macro creators'], ['Notified', '~610 micro creators near Kandy'], ['Held from your wallet', rs(704000)]], 'Ishara sends the invites as soon as it’s live. The creators’ budget is held from your wallet.');

SCREENS['b8-live'] = () => liveScreen('strat', 7, pB({img: 'ppBite.jpg', title: 'Patty Pop Kandy — First bite in the hills', live: 1, extra: 'Ishara Fernando · 12%'}), 'Live, and run by Ishara',
  'Ishara has invited the macro creators and 610 micro creators near Kandy were notified. Her weekly report arrives every Monday.',
  [['Today', 'Live'], ['Nov 28', 'Teasers'], ['Dec 5', 'Store opens'], ['Dec 14', 'Close']], ['Open campaign dashboard', 'Message Ishara']);

/* ---------- C · Pick creators ourselves ---------- */
const C = {title: 'Family Feast — Weekend dinner, sorted', dates: 'Nov 16 – Dec 6, 2026'};
const PICKS = ['ranshan15', 'radeeshaa', 'mitchie_imasha', 'she_writes_a_diary'].map(by);
const TOTAL = PICKS.reduce((s, c) => s + c.cost, 0);
const pC = (o = {}) => Object.assign({title: C.title, dates: C.dates, access: 'Invite only', fee: 'Fixed pay per creator'}, o);

SCREENS['c1-idea'] = () => frame('pick', 0, {title: C.title, dates: C.dates, access: 'Invite only'},
  basics({n: 7, h: 'Campaign idea', sub: 'Just the basic idea. You don’t need a design yet: we draft the brief once you’ve picked your creators.', title: C.title, goal: 'Orders', offerLabel: 'Offer', offer: 'Family Feast box · 2 burgers, 2 kids’ meals, fries and 4 drinks · Rs. 4,990', start: 'Mon, Nov 16, 2026', end: 'Sun, Dec 6, 2026', cities: ['Colombo'],
    extraBasics: field('The idea in a sentence', area('Families make Patty Pop their weekend dinner plan.', 2), {req: 1}) + field('Platform', chips(['TikTok', 'Instagram', 'YouTube', 'Facebook'], ['Instagram'], 1), {req: 1})}),
  actbar('All required fields are filled', 'Continue', 'Back', true));

SCREENS['c2-persona'] = () => frame('pick', 1, pC({fee: null}),
  head('Step 2 of 7', 'Creator persona', 'Describe the creators you want. We check every creator against it, their audience and their availability for your dates.') +
  card('Who are you looking for?', '', `<div class="stack">
    ${field('Persona', chips(window.CREATOR_MAP.filterPersonas, ['Momfluencer', 'Dadfluencer', 'Restaurant reviewer']), {req: 1})}
    ${field('Audience location', chips(['Colombo city', 'Colombo suburbs', 'Kandy', 'Galle'], ['Colombo city']), {req: 1})}
    <div class="grid2">${field('Audience gender', chips(['Any', 'Mostly women', 'Mostly men', 'Mixed'], ['Any']))}${field('Language', chips(['English', 'Sinhala', 'Singlish', 'Tamil'], ['English']))}</div>
    ${field('Follower tier', chips(['Nano · under 10K', 'Micro · 10–50K', 'Mid · 50–100K', 'Macro · 100K+'], ['Micro · 10–50K', 'Mid · 50–100K']))}
    <div class="grid2">${field('Price per reel, from', money(20000))}${field('to', money(80000))}</div>
  </div>`) +
  `<section class="dcard tight"><div class="prow" style="gap:16px"><div style="display:flex">${['radeeshaa', 'mitchie_imasha', 'she_writes_a_diary', 'ranshan15', 'viindula'].map(h => by(h)).filter(Boolean).map((c, i) => `<img class="pav" src="creators/${c.photo}" style="width:36px;height:36px;border:2px solid #fff;margin-left:${i ? -10 : 0}px">`).join('')}</div>
    <div><b>5 creators match</b><span>16 checked · 2 momfluencers, widened with a dadfluencer and restaurant reviewers · 1 booked for your dates</span></div></div></section>`,
  actbar('5 creators match your persona', 'See creators', 'Back', true));

SCREENS['c3-pick'] = () => {
  const list = ['radeeshaa', 'ranshan15', 'mitchie_imasha', 'she_writes_a_diary', 'viindula', 'le.lumii'].map(by).filter(Boolean);
  const picked = new Set(PICKS.map(c => c.handle));
  return frame('pick', 2, pC({extra: `${PICKS.length} creators picked`}),
    head('Step 3 of 7', 'Pick creators', 'Choose exactly who posts. Each price is for one Instagram reel, inclusive of Polysocial fees.') +
    `<section class="dcard tight"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px">${chips(['Momfluencer', 'Dadfluencer', 'Restaurant reviewer', 'Micro', 'Mid', 'Colombo city'], ['Momfluencer', 'Dadfluencer', 'Restaurant reviewer', 'Colombo city'])}<select style="height:34px;border:1px solid var(--grey-200);border-radius:100px;padding:0 14px;font-size:13px"><option>Sort: best match</option></select></div></section>` +
    tiles([['Picked', `${PICKS.length} creators`], ['Combined followers', kf(PICKS.reduce((s, c) => s + c.followers, 0))], ['Total for 1 reel each', rs(TOTAL)], ['Audience in Colombo city', '100%']], 4) +
    `<div class="ccards">${list.map(c => {
      const booked = c.handle === 'le.lumii', on = picked.has(c.handle);
      return `<div class="ccard${on ? ' on' : ''}${booked ? ' off' : ''}"><span class="sel ck${on ? ' on' : ''}" style="border:0;padding:0;background:none"><span class="bx"></span></span>
        <div class="prow">${cav(c)}<div><b>${c.name}</b><span>@${c.handle} · ${kf(c.followers)} followers</span></div></div>
        <div class="cmeta">${c.personas.slice(0, 3).map(p => `<span class="pill${['Momfluencer', 'Dadfluencer', 'Restaurant reviewer'].includes(p) ? ' blue' : ''}">${p}</span>`).join('')}</div>
        <div class="comm">${c.community}</div>
        <div class="cstat"><span>Audience <b>${c.age}</b></span><span><b>${c.gender}</b></span><span><b>${c.location}</b></span></div>
        <div style="display:flex;justify-content:space-between;align-items:center">${booked ? '<span class="pill warn">Booked until Nov 29</span>' : `<span class="link" style="font-size:13px">View profile</span>`}<span class="price">${rs(c.cost)}</span></div></div>`;
    }).join('')}</div>`,
    actbar(`${PICKS.length} creators picked · ${rs(TOTAL)}`, `Use these ${PICKS.length} creators`, 'Back', true));
};

SCREENS['c4-brief'] = () => frame('pick', 3, pC({extra: `${PICKS.length} creators picked`}),
  head('Step 4 of 7', 'Creative brief', 'We drafted this from your idea for the creators you picked. Change anything, then approve it.', '<span class="pill blue">Drafted by Polysocial</span>') +
  card('Brief', '', `<div class="stack">
    ${field('What creators should show', area('Your family’s Saturday night sorted: open the Family Feast box at home, everyone grabs their favourite, kids react to their meal.', 3), {req: 1})}
    ${field('Hook', inp('“Weekend dinner, sorted in one box”'), {req: 1})}
    ${field('Script beats', beats([['0–3s', 'The “what’s for dinner?” moment at home'], ['3–10s', 'Family Feast box arrives, open it on the table'], ['10–20s', 'Everyone digs in, kids’ reactions'], ['20s+', 'Price on screen: Rs. 4,990 for the whole family']]))}
    ${field('Must be visible', inp('The open Family Feast box and the Rs. 4,990 price'), {req: 1})}
    ${field('Caption CTA', inp('Order the Family Feast box on the Patty Pop app and tag @pattypoplk'), {req: 1})}
    <div class="grid2">${field('Deliverable', sel('1 Instagram reel each · 20–40s'))}${field('Restrictions', sel('6 brand defaults'))}</div>
  </div>`) +
  card('Approve the brief', '', checks([['I’ve read the brief and it’s ready to send to the creators', 1]])),
  actbar('Brief approved', 'Continue', 'Back', true));

SCREENS['c5-media'] = () => frame('pick', 4, pC({img: 'ppMeal.jpg', extra: `${PICKS.length} creators picked`}),
  media({i: 5, n: 7, sub: 'Creators see the cover on their invite. Inspiration is optional here: your brief and your picks set the style.', cover: 'ppMeal.jpg', coverName: 'family_feast_box.jpg', posts: [{img: 'ppBite.jpg', pl: 'Instagram', handle: '@imasha.home'}]}),
  actbar('Cover added', 'Continue', 'Back', true));

SCREENS['c6-budget'] = () => frame('pick', 5, pC({img: 'ppMeal.jpg', extra: `${PICKS.length} creators picked`, hold: TOTAL}),
  head('Step 6 of 7', 'Budget', 'Since you picked the creators, the budget is their price for one reel each. Nothing to negotiate.') +
  card('Creators &amp; prices', 'Fixed pay per creator, inclusive of Polysocial fees.', `<table class="tb"><thead><tr><th>Creator</th><th>Persona</th><th>Followers</th><th class="r">1 Instagram reel</th></tr></thead><tbody>
    ${PICKS.map(c => `<tr><td><div class="prow">${cav(c, 32)}<div><b style="font-size:14px">${c.name}</b><span>@${c.handle}</span></div></div></td><td>${['Momfluencer', 'Dadfluencer', 'Restaurant reviewer'].find(p => c.personas.includes(p))}</td><td>${kf(c.followers)}</td><td class="r">${rs(c.cost)}</td></tr>`).join('')}
    </tbody><tfoot><tr><td colspan="3">Total budget</td><td class="r">${rs(TOTAL)}</td></tr></tfoot></table>`) +
  card('How payment works', '', `<div class="stack">${tiles([['Held at go live', rs(TOTAL)], ['Paid per creator', 'After approval'], ['If a creator declines', 'Refunded']])}${note(`You have <b>${rs(FREE)}</b> free to spend. After this campaign: <b>${rs(FREE - TOTAL)}</b>.`, 'good')}</div>`),
  actbar('Budget fits your wallet', 'Review', 'Back', true));

SCREENS['c7-review'] = () => frame('pick', 6, pC({img: 'ppMeal.jpg', extra: `${PICKS.length} creators picked`, hold: TOTAL}),
  head('Step 7 of 7', 'Review &amp; invite', 'Each creator gets an invite with the brief. Their reels come to you for approval, and each is paid once approved.', '<span class="btn btn-sec btn-sm">Preview invite</span>') +
  card('Ready to send', '', gates([['Brand connected', 'verified · full admin', 1], ['Creators picked', `${PICKS.length} available for Nov 16 – Dec 6`, 1], ['Brief approved', 'drafted by Polysocial, edited by you', 1], ['Cover added', 'family_feast_box.jpg', 1], ['Budget funded', `${rs(TOTAL)} of ${rs(FREE)} free`, 1]])) +
  card('Summary', '', [
    rsec('Idea', [['Title', C.title], ['Offer', 'Family Feast box · Rs. 4,990'], ['Goal', 'Weekend family orders'], ['Dates', C.dates]]),
    rsec('Creators', [['Who can join', 'Invite only'], ['Invited', `<div style="display:flex;gap:6px;align-items:center">${PICKS.map(c => cav(c, 26)).join('')}<span style="margin-left:4px">${PICKS.map(c => c.name.split(' ')[0]).join(', ')}</span></div>`], ['Deliverable', '1 Instagram reel each']]),
    rsec('Budget', [['Pay model', 'Fixed per creator'], ['Total', rs(TOTAL)], ['Approves content', 'You, then payouts are released']]),
  ].join('')),
  actbar('Everything is ready', `Send ${PICKS.length} invites &amp; go live`, 'Back', true));

SCREENS['c8-live'] = () => liveScreen('pick', 7, pC({img: 'ppMeal.jpg', live: 1, extra: `${PICKS.length} creators invited`}), 'Invites sent',
  `${PICKS.map(c => c.name.split(' ')[0]).join(', ')} have their invites with the brief. ${rs(TOTAL)} is held from your wallet and each creator is paid once you approve their reel.`,
  [['Today', 'Invites sent'], ['Nov 16', 'Posting starts'], ['Dec 6', 'Last post'], ['After approval', 'Payouts']], ['Open campaign dashboard', 'Create another']);

/* ---------- Draw ---------- */
const id = new URLSearchParams(location.search).get('s') || '00-start';
document.body.innerHTML = (SCREENS[id] || SCREENS['00-start'])();
window.SCREEN_IDS = Object.keys(SCREENS);
