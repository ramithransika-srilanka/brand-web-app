/* =====================================================================
   Campaign creation screens — static mockups. Every campaign type is
   created in the same 4 steps. screens.html?s=<id> draws one screen; render.js
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
const checks = (items) => `<div class="checks">${items.map(([t, on]) => `<div class="ck${on ? ' on' : ''}"><span class="bx"></span><span class="tx">${t}</span></div>`).join('')}</div>`;
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

const RESTRICT = ['No AI generated content', 'Face must be visible in the content', 'No competitor brands in the frame', 'Caption must tag the brand handle', 'Use only licensed or original audio', 'Keep the post live for at least 30 days'];
function wallet(hold, label = 'This campaign holds') {
  const pct = Math.min(100, hold / FREE * 100);
  return `<div class="wallet"><div class="wl"><span>Wallet · free to spend</span><span class="link">Add funds</span></div><b>${rs(FREE)}</b>
    <div class="bar"><i style="width:${pct}%"></i></div><div class="wn">${label} ${rs(hold)}</div></div>`;
}
const SCREENS = {};
/* ---------- More icons ---------- */
I.chat = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/></svg>';
I.eye = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
I.plus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
I.compass = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>';
I.walletI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/></svg>';
I.bell = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>';
I.bank = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>';

/* =====================================================================
   The three campaign types, each created in the same 4 steps:
   1 Basics · 2 Details & creators · 3 Budget · 4 Go live
   ===================================================================== */
const STEPS4 = [['Basics', 'Brief, designer, access, dates'], ['Details &amp; creators', 'Design, comments, creator map'], ['Budget', 'Allocate or transfer'], ['Go live', 'Terms &amp; confirmation']];
const T = {
  a: {title: 'Pop Crunch Chicken — The crunch you can hear', type: 'Designed by your team', access: 'Open campaign', cover: ['ppBiteWide.jpg', 'ppBite.jpg', 'ppMeal.jpg'],
      live: ['Mon', 'OCT', '19', 'Mon, Oct 19, 2026 · 9:00 am'], end: 'Sun, Nov 8, 2026', budget: 600000},
  b: {title: 'Patty Pop Kandy — First bite in the hills', type: 'Designed by an expert', access: 'Open campaign', cover: ['ppBite.jpg', 'ppMeal.jpg', 'ppBiteWide.jpg'],
      live: ['Fri', 'NOV', '20', 'Fri, Nov 20, 2026 · 10:00 am'], end: 'Mon, Dec 14, 2026', budget: 800000},
  c: {title: 'Family Feast — Weekend dinner, sorted', type: 'Designed by your team', access: 'Invite only', cover: ['ppMeal.jpg', 'ppBiteWide.jpg', 'ppBite.jpg'],
      live: ['Mon', 'NOV', '16', 'Mon, Nov 16, 2026 · 9:00 am'], end: 'Sun, Dec 6, 2026', budget: 217647},
};

const topbar4 = (k) => `<header class="topbar"><a class="logo">${I.logo}<span>Create campaign</span></a><div class="top-mid">${k ? T[k].title : ''}</div>
  <div class="top-r">${k ? '<span class="saved">Draft saved · just now</span><span class="btn btn-ghost btn-sm">Save &amp; exit</span>' : ''}<img class="avatar" src="img/pattypop.png" alt=""></div></header>`;
const stepbar = (k, cur) => `<div class="stepbar"><div class="in2"><div class="type"><b>${T[k].type}</b><span>${T[k].access}</span></div>
  <ol class="stepper4">${STEPS4.map(([t, s], i) => `<li class="${i < cur ? 'done' : i === cur ? 'cur' : ''}"><span class="c">${i < cur ? '✓' : i + 1}</span><span class="t"><b>${t}</b><span>${s}</span></span></li>`).join('')}</ol></div></div>`;
const bar = (msg, btns, ok = true) => `<div class="actbar"><div class="in2"><span class="btn btn-ghost">Back</span><span class="miss${ok ? ' ok' : ''}">${msg}</span>${btns.map((b, i) => `<span class="btn ${i === btns.length - 1 ? 'btn-pri' : 'btn-sec'}">${b}</span>`).join('')}</div></div>`;
const page = (k, cur, body, b) => `${topbar4(k)}${stepbar(k, cur)}<div class="wide nav-in">${body}${b || ''}</div>`;
const stephead = (n, title, sub, right) => `<section class="dcard"><div class="dhead row" style="margin-bottom:0"><div><div class="step-kick">Step ${n} of 4</div><h1>${title}</h1><p class="dsub">${sub}</p></div>${right || ''}</div></section>`;

/* ---------- 00 · Entry: request a campaign from the brand page ---------- */
SCREENS['00-brand-page'] = () => `<style>body{background:#fff}</style><header class="topbar"><a class="logo">${I.logo}</a><div style="display:flex;gap:28px;color:var(--grey-600)"><span style="width:22px;color:var(--grey-800)">${I.compass}</span><span style="width:22px">${I.walletI}</span></div><div class="top-r"><span style="width:22px;color:var(--grey-700)">${I.bell}</span><img class="avatar" src="img/pattypop.png" alt=""></div></header>
  <div style="background:#121212;color:#a0a0a0;display:flex;justify-content:center;gap:26px;height:36px;align-items:center;font-size:15px;font-weight:500"><span style="color:#fff">Active</span><span>Completed</span><span>Upcoming</span><span>Drafts <span class="pill" style="background:#333;color:#fff;margin-left:2px">1</span></span></div>
  <div class="wide" style="background:#fff;max-width:none;padding-left:max(24px,calc((100% - 1128px)/2));padding-right:max(24px,calc((100% - 1128px)/2))">
    <div class="ctahead" style="margin-top:12px"><h1 style="font-size:24px;font-weight:600">Active campaigns</h1><span class="btn btn-pri"><span style="width:16px">${I.plus}</span>Create campaign</span></div>
    ${chips(['All', 'Price', 'Mobility', 'Food', 'Entertainment', 'Lifestyle'], ['All'])}
    <div class="reqcard"><div><h2>Request a new campaign</h2><p>4 steps: basics → details &amp; creators → budget → go live. Design it yourselves or hire an expert; open to all creators or invite only.</p></div><span class="btn">Start a request</span></div>
    <div class="grid3">${[['ppBiteWide.jpg', 'Spicy Pop Wings — Feel the heat', 'Open · 3 d ago · 12 d left', 46, '186 joined', 'Rs. 212,400 / Rs. 450,000'], ['ppMeal.jpg', 'Patty Pop Combo Tuesdays', 'Invite only · 6 d ago · 4 d left', 75, '9 / 12 slots', ''], ['ppBite.jpg', 'Double Smash launch week', 'Open · 1 d ago · 20 d left', 18, '64 joined', 'Rs. 54,000 / Rs. 300,000']].map(([img, t, m, p, j, mo]) => `<div><div style="height:200px;border-radius:16px;background:url(img/${img}) center/cover"></div><div style="padding:12px 4px;display:grid;gap:6px"><b style="font-size:16px;font-weight:500">${t}</b><span style="font-size:13px;color:var(--grey-600)">${m}</span><div style="height:6px;border-radius:6px;background:#ddd"><div style="width:${p}%;height:100%;border-radius:6px;background:var(--blue-500)"></div></div><div style="display:flex;justify-content:space-between;font-size:15px;font-weight:500"><span>${j}</span><span>${mo}</span></div></div></div>`).join('')}</div>
  </div>`;

/* ---------- Step 1 · Basics (same form for every type) ---------- */
function step1(k, o) {
  return page(k, 0,
    stephead(1, 'Tell us what the campaign is about', 'Give us a brief. We turn it into a full campaign design for you to review in step 2.') +
    `<div class="cols"><div class="main">` +
    card('The campaign', '', `<div class="stack">
      ${field('Working title', inp(o.title), {req: 1, hint: 'You can change it after you see the design.'})}
      ${field('Brief', area(o.brief, 6), {req: 1, hint: 'What you’re promoting, the goal, who it’s for, what must be shown, the tone. As much or as little as you have.'})}
      ${field('Attachments', `<div style="display:flex;gap:8px;align-items:center">${o.files.map(f => `<img src="img/${f}" style="width:64px;height:64px;border-radius:12px;object-fit:cover">`).join('')}<span class="drop" style="width:64px;height:64px;padding:0;border-radius:12px"><span style="width:20px">${I.plus}</span></span></div>`, {opt: 1, hint: 'Product photos, logos, reels you like.'})}
    </div>`) +
    card('Who designs the campaign?', '', rcards([['We’ll design it', 'You give the brief; we prepare the design, and you fine-tune it with comments.', I.pen], ['Hire an expert', 'A Polysocial creative strategist designs and runs it. Their commission (usually 10–15%) comes from your budget.', I.star]], o.design), {req: 1}) +
    (o.design === 'Hire an expert' ? note('We’ll match you with an expert after you send this request. You’ll see who it is and agree their commission before they start.') : '') +
    card('Who can join?', '', rcards([['Open campaign', 'Every matching creator can join. You approve the creators we suggest first.', I.lockOpen], ['Invite only', 'Only the creators you pick on the creator map get an invite.', I.lock]], o.access), {req: 1}) +
    card('Dates', '', `<div class="stack"><div class="grid3">${field('Go live on', inp(o.start), {req: 1})}${field('Time', sel(o.time))}${field('Ends on', inp(o.end), {req: 1})}</div>${note(o.dateNote)}</div>`) +
    `</div><div class="stick">` +
    card('What happens next', '', `<div class="gates">${[['1', 'Basics', 'You send this request'], ['2', 'Details &amp; creators', o.next2], ['3', 'Budget', 'Allocate from your brand budget or send a transfer'], ['4', 'Go live', 'Accept the terms and confirm the date']].map(([n, t, d], i) => `<div class="gate ${i ? '' : 'ok'}"><span class="gi" style="${i ? 'background:var(--grey-100);color:var(--grey-600)' : ''}">${n}</span><div><b>${t}</b><br><span>${d}</span></div></div>`).join('')}</div>`) +
    `</div></div>`,
    bar('All required fields are filled', ['Send request'], true));
}
SCREENS['a1-basics'] = () => step1('a', {title: 'Pop Crunch Chicken launch', design: 'We’ll design it', access: 'Open campaign', start: 'Mon, Oct 19, 2026', time: '9:00 am', end: 'Sun, Nov 8, 2026', files: ['ppBiteWide.jpg', 'ppBite.jpg'],
  brief: 'We’re launching the Pop Crunch Chicken burger. Goal: get people in their 20s in Colombo and Galle to try it in the first 3 weeks.\nHook idea: “POV: you found the crunchiest burger in Colombo”. Show the starving moment, ordering at Patty Pop, then a slow-mo crunchy first bite.\nMust show the burger up close and the Patty Pop wrapper. Fun and loud, not too polished. TikTok and Instagram Reels.',
  dateNote: '3 weeks. Creators can join as soon as it’s live and post until it ends.', next2: 'We prepare the design; you comment and approve the creators we suggest'});
SCREENS['b1-basics'] = () => step1('b', {title: 'Patty Pop Kandy store opening', design: 'Hire an expert', access: 'Open campaign', start: 'Fri, Nov 20, 2026', time: '10:00 am', end: 'Mon, Dec 14, 2026', files: ['ppBite.jpg'],
  brief: 'We’re opening a new Patty Pop on Peradeniya Rd, Kandy on Sat, Dec 5, with free fries on opening weekend. We want families and students from Kandy and Peradeniya to come in.\nMy team is swamped with the holiday season, so we’d like an expert to design and run it. Budget around Rs. 800,000 all-in.',
  dateNote: 'Store opens Sat, Dec 5. Teasers before, visits on opening weekend, close a week after.', next2: 'Your expert prepares the design and a creator shortlist; you comment and approve'});
SCREENS['c1-basics'] = () => step1('c', {title: 'Family Feast — Weekend dinner', design: 'We’ll design it', access: 'Invite only', start: 'Mon, Nov 16, 2026', time: '9:00 am', end: 'Sun, Dec 6, 2026', files: ['ppMeal.jpg'],
  brief: 'Family Feast box: 2 burgers, 2 kids’ meals, fries and 4 drinks for Rs. 4,990. We want families to make Patty Pop their weekend dinner plan.\nWe’d like momfluencers in Colombo, and we want to pick the creators ourselves. One Instagram reel each.',
  dateNote: '3 weeks, covering three weekends. Invites go out on the go-live date.', next2: 'We prepare the design; you comment and pick who to invite on the creator map'});

/* ---------- Step 2a · Campaign design with comments ---------- */
const avIni = (t, g) => `<span class="av2" style="background:linear-gradient(135deg,${g})">${t}</span>`;
const ME = '<img src="img/pattypop.png">';
const PS = avIni('PS', '#1548eb,#7391f3');
const IF = avIni('IF', '#1548eb,#f433ab');
const sec = (h, body, c) => `<div class="dsec${c ? ' cm' : ''}"><h4>${h}</h4>${body}${c ? `<span class="cbadge">${I.chat}${c}</span>` : `<span class="addc">${I.chat}Comment</span>`}</div>`;
const thread = (on, msgs, res) => `<div class="cthread${res ? ' res' : ''}"><div class="on"><span>On <b>${on}</b></span><span>${res ? '✓ Resolved' : 'Open'}</span></div>${msgs.map(([av, who, when, txt]) => `<div class="cmt">${av}<div><b>${who}</b><small>${when}</small><div>${txt}</div></div></div>`).join('')}</div>`;
const segs = (on, designDone) => `<div class="seg"><span class="${on === 0 ? 'on' : ''}">${designDone ? '<span class="dot">✓</span>' : ''}Campaign design</span><span class="${on === 1 ? 'on' : ''}">Creators</span></div>`;

function step2design(k, o) {
  const t = T[k];
  return page(k, 1,
    stephead(2, 'Fine-tune the campaign design', o.sub, segs(0)) +
    `<div class="cols"><section class="dcard doc"><div class="dcover">${t.cover.map(c => `<div style="background-image:url(img/${c})"></div>`).join('')}</div><div class="dbody">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span class="pill blue">${o.by} · Version ${o.v}</span><span style="font-size:13px;color:var(--grey-600)">Updated ${o.when}</span></div>
      ${sec('Title', `<div class="dtitle">${t.title}</div>`, o.c.title)}
      ${sec('Requirement', `<p>${o.req}</p>`, o.c.req)}
      ${sec('Hook', `<p>${o.hook}</p>`, o.c.hook)}
      ${sec('Script', `<div class="beatsv">${o.beats.map(([a, b]) => `<div><em>${a}</em><span>${b}</span></div>`).join('')}</div>`, o.c.script)}
      <div class="grid2">${sec('Deliverable', `<p>${o.deliv}</p>`)}${sec('Platforms', `<div class="chips">${o.plats.map(p => `<span class="chip" style="height:30px">${PLAT[p]}${p}</span>`).join('')}</div>`)}</div>
      ${sec('Best suited for', tagsHTML(o.suited), o.c.suited)}
      ${sec('Must be visible', `<p>${o.visible}</p>`)}
      ${sec('Caption call to action', `<p>${o.cta}</p>`)}
      ${sec('Restrictions', `<p style="color:var(--grey-600)">${RESTRICT.join(' · ')}</p>`)}
    </div></section>
    <div class="stick"><section class="dcard tight"><div class="dhead row" style="margin-bottom:12px"><h3>Comments <span class="pill">${o.threads.filter(x => !x[2]).length} open</span></h3><span class="link" style="font-size:13px">Show resolved</span></div>
      <div style="display:grid;gap:10px">${o.threads.map(([on, msgs, res]) => thread(on, msgs, res)).join('')}
      <div class="cbox"><textarea placeholder="Comment on a section… (click Comment next to it)"></textarea><div style="display:flex;justify-content:flex-end"><span class="btn btn-sec btn-sm">Add comment</span></div></div></div></section>
      ${o.side || ''}</div></div>`,
    bar(o.msg, [`Request edits (${o.threads.filter(x => !x[2]).length})`, 'Approve design · next: creators'], true));
}
SCREENS['a2-design'] = () => step2design('a', {sub: 'We turned your brief into the campaign creators will see. Comment on any section to request an edit, then approve.', by: 'Prepared by Polysocial from your brief', v: 2, when: 'today 2:40 pm',
  req: 'Show the moment you’re starving, walk into Patty Pop, and take the first big crunchy bite of the new Pop Crunch Chicken.', hook: '“POV: you found the crunchiest burger in Colombo”',
  beats: [['0–3s', 'Starving moment — late-night study, after cricket or after work'], ['3–8s', 'Walk into Patty Pop and order the Pop Crunch Chicken'], ['8–15s', 'First big bite, slow-mo crunch, burger to camera'], ['15s+', 'Happy reaction + “Pop Crunch Chicken, now at Patty Pop”']],
  deliv: '1 reel · 15–30s · vertical 9:16 · min 1080p · captions on', plats: ['TikTok', 'Instagram'], suited: ['All genders', '18–28 age', 'Colombo', 'Galle', 'Students', 'Young professionals', 'Selfie', 'Reels'],
  visible: 'The Pop Crunch Chicken up close, plus the Patty Pop wrapper or logo', cta: 'Try the Pop Crunch Chicken at your nearest Patty Pop and tag @pattypoplk 🍔',
  c: {hook: 1, script: 1}, msg: '2 comments waiting for an edit',
  threads: [['Cover photos', [[ME, 'You', 'Mon', 'Use the wide bite shot as the main cover.'], [PS, 'Polysocial', 'Mon', 'Done in version 2.']], 1],
    ['Hook', [[ME, 'You', '2:52 pm', 'Can we add “the crunch you can hear” to the hook?']]],
    ['Script · 8–15s', [[ME, 'You', '2:55 pm', 'Make sure the wrapper is in the bite shot.']]]]});
SCREENS['b2-design'] = () => step2design('b', {sub: 'Ishara Fernando designed this from your brief. Comment on any section and she updates it; approve when it’s right.', by: 'Designed by Ishara Fernando', v: 2, when: 'today 4:15 pm',
  req: 'Capture the opening of the new Patty Pop in Kandy: the queue, the first bite and the free fries on opening weekend.', hook: '“I drove up to Kandy for one bite…”',
  beats: [['0–3s', 'The drive up / walk to Peradeniya Rd'], ['3–10s', 'The queue and the store front on opening day'], ['10–20s', 'First bite + free fries with code KANDYPOP'], ['20s+', '“Patty Pop, now in Kandy”']],
  deliv: '1 reel · 20–40s · vertical 9:16 · teaser story before Dec 5', plats: ['Instagram', 'TikTok'], suited: ['Families', 'Students', '18–40 age', 'Kandy', 'Peradeniya', 'Vlog', 'Reels'],
  visible: 'The store front on Peradeniya Rd and the free-fries offer', cta: 'Free fries this weekend at Patty Pop Kandy with code KANDYPOP 🍟',
  c: {suited: 1}, msg: '1 comment waiting for Ishara',
  threads: [['Creator mix', [[ME, 'You', 'Tue', 'Can we move some of the macro money to more micro creators?'], [IF, 'Ishara', 'Tue', 'Done in v2: 2 macro, 40 micro. See the Creators tab.']], 1],
    ['Best suited for', [[ME, 'You', '4:30 pm', 'Please add Katugastota, lots of students there.'], [IF, 'Ishara', '4:41 pm', 'Good call, adding it.']]]],
  side: card('Your expert', '', `<div class="stack"><div class="prow">${ini('IF', '#1548eb,#f433ab')}<div><b>Ishara Fernando</b><span>Senior Creative Strategist · Kandy</span></div></div>${kv([['Commission', '12% · Rs. 96,000'], ['Charged', 'When you approve the design'], ['Runs', 'Invites, approvals, weekly report']])}<span class="btn btn-sec btn-sm" style="justify-self:start">Message Ishara</span></div>`)});
SCREENS['c2-design'] = () => step2design('c', {sub: 'We turned your idea into the brief your creators will get. Comment to request an edit, then approve.', by: 'Prepared by Polysocial from your brief', v: 1, when: 'today 11:05 am',
  req: 'Your family’s Saturday night sorted: open the Family Feast box at home, everyone grabs their favourite, kids react to their meal.', hook: '“Weekend dinner, sorted in one box”',
  beats: [['0–3s', 'The “what’s for dinner?” moment at home'], ['3–10s', 'Family Feast box arrives, open it on the table'], ['10–20s', 'Everyone digs in, kids’ reactions'], ['20s+', 'Price on screen: Rs. 4,990 for the whole family']],
  deliv: '1 Instagram reel each · 20–40s · vertical 9:16', plats: ['Instagram'], suited: ['Families', 'Parents 25–44', 'Colombo city', 'Momfluencer', 'Dadfluencer', 'Restaurant reviewer'],
  visible: 'The open Family Feast box and the Rs. 4,990 price', cta: 'Order the Family Feast box on the Patty Pop app and tag @pattypoplk',
  c: {title: 1}, msg: '1 comment waiting for an edit',
  threads: [['Title', [[ME, 'You', '11:20 am', 'Can the title mention the price? e.g. “Family Feast for Rs. 4,990”']]]]});

/* ---------- Step 2b · Creator map ---------- */
const AGES = ['18–24', '25–34', '35–44', '45+'];
const ageCol = (a) => { const n = parseInt(a, 10); return n < 25 ? 0 : n < 35 ? 1 : n < 45 ? 2 : 3; };
function cmap(rows, people) {
  const cells = rows.map(() => AGES.map(() => []));
  people.forEach(p => cells[p.row][p.col].push(p));
  const heat = (n, r) => n >= 3 || r > 60000 ? 'h3' : n === 2 || r > 30000 ? 'h2' : n === 1 ? 'h1' : '';
  return `<div class="cmap"><span></span>${AGES.map(a => `<span class="ax top">${a}</span>`).join('')}
    ${rows.map((r, i) => `<span class="ax">${r}</span>${AGES.map((_, j) => { const ps = cells[i][j], reach = ps.filter(p => !p.off).reduce((s, p) => s + p.f, 0);
      return `<div class="cell ${heat(ps.filter(p => !p.off).length, reach)}">${ps.map(p => p.av(p)).join('')}${reach ? `<span class="reach">${kf(reach)}</span>` : ''}</div>`; }).join('')}`).join('')}</div>`;
}
const realAv = (c) => (p) => `<img class="mav${p.sel ? ' sel' : ''}${p.off ? ' off' : ''}" src="creators/${c.photo}" alt="">`;
const iniAv = (t, g) => (p) => `<span class="mav ini${p.sel ? ' sel' : ''}${p.off ? ' off' : ''}" style="background:linear-gradient(135deg,${g})">${t}</span>`;
const crow = (p) => `<div class="crow${p.off ? ' off' : ''}"><span class="cbx${p.sel ? ' on' : ''}"></span>${p.photo ? `<img class="pav" src="creators/${p.photo}">` : `<span class="pav ini" style="background:linear-gradient(135deg,${p.g})">${p.ini}</span>`}<div><b>${p.name}</b><span>${p.sub}</span></div><div class="pr">${p.price}<span>${p.note || ''}</span></div></div>`;

function step2creators(k, o) {
  const sel = o.people.filter(p => p.sel);
  return page(k, 1,
    stephead(2, o.h, o.sub, segs(1, 1)) +
    `<section class="dcard tight"><div style="display:flex;justify-content:space-between;align-items:center;gap:16px">${chips(o.filters, o.filtersOn)}<div class="legend2"><span><i style="background:#dfe6fc"></i>1 creator</span><span><i style="background:#8ea4f5"></i>High reach</span></div></div></section>` +
    tiles(o.tiles, 4) +
    `<div class="cols" style="grid-template-columns:minmax(0,1fr) 400px">` +
    card('Creator map · audience', 'Where each creator’s audience sits by age and location. A blue ring means selected.', cmap(o.rows, o.people)) +
    `<div class="stick">` + card(o.listTitle, o.listSub, `<div class="clist">${o.people.map(crow).join('')}</div>`) + `</div></div>`,
    bar(`${sel.length} ${o.barWord} · ${o.barTotal}`, [o.btn], true));
}
const POOLP = (h, o) => { const c = by(h); return Object.assign({name: c.name, photo: c.photo, f: c.followers, col: ageCol(c.age), av: realAv(c), sub: `${(c.personas || [])[0]} · ${kf(c.followers)} · ${c.age}`}, o); };

SCREENS['a2-creators'] = () => {
  const rows = ['Colombo city', 'Colombo suburbs', 'Galle'];
  const people = [
    POOLP('radeeshaa', {row: 0, sel: 1, price: 'Rs. 6,000', note: 'base + views'}), POOLP('viindula', {row: 1, sel: 1, price: 'Rs. 6,000', note: 'base + views'}),
    POOLP('shewan_j', {row: 0, col: 0, sel: 1, price: 'Rs. 6,000', note: 'base + views'}), POOLP('karazz.zzz', {row: 0, col: 0, sel: 1, price: 'Rs. 6,000', note: 'base + views'}),
    POOLP('_kyloooo_', {row: 0, col: 0, sel: 1, price: 'Rs. 6,000', note: 'base + views'}), POOLP('senodeee', {row: 0, col: 0, off: 1, price: 'Excluded', note: 'by you'}),
    {name: 'Kavindu Bites', ini: 'KB', g: '#a8641a,#f433ab', f: 31000, row: 2, col: 0, sel: 1, sub: 'Mukbang reviewer · 31K · 18–24', price: 'Rs. 6,000', note: 'base + views'},
    {name: 'Dilan Eats', ini: 'DE', g: '#0f2d8f,#7391f3', f: 18000, row: 2, col: 1, sel: 1, sub: 'Food critic · 18K · 25–34', price: 'Rs. 6,000', note: 'base + views'},
  ].map(p => Object.assign({av: p.ini ? iniAv(p.ini, p.g) : p.av}, p));
  return step2creators('a', {h: 'Approve the creators we suggest', sub: 'Open campaign: these matching creators get your invite first. Others who match can still join later. Leave out anyone you don’t want.', rows, people,
    filters: ['Restaurant reviewer', 'Food critic', 'Mukbang reviewer', 'Lifestyle', '18–34', 'Colombo', 'Galle'], filtersOn: ['Restaurant reviewer', 'Food critic', 'Mukbang reviewer', '18–34', 'Colombo', 'Galle'],
    tiles: [['Suggested', '8 creators'], ['Approved', '7'], ['Combined followers', '173K'], ['Also notified', '~1,480 matching']],
    listTitle: 'Suggested creators', listSub: 'Paid Rs. 6,000 per reel + Rs. 1,800 per 1K views.', barWord: 'creators approved', barTotal: 'others can still join', btn: 'Approve creators'});
};

const KANDY = [['Sahan Wijeratne', 'SW', '#5b2bb0,#9a5fe6', 140000, 0, 1, 'Macro · travel vlogger', 'Rs. 120,000'], ['Nethmi Rajapaksha', 'NR', '#c42a8c,#f472b6', 112000, 1, 1, 'Macro · family vlogger', 'Rs. 120,000'],
  ['Kavindu Bandara', 'KB', '#0f2d8f,#7391f3', 34000, 0, 0, 'Micro · student life', 'Rs. 9,000'], ['Tharushi Herath', 'TH', '#a8641a,#f2b705', 22000, 1, 0, 'Micro · campus food', 'Rs. 9,000'],
  ['Ama Dissanayake', 'AD', '#0a7d3e,#5cc489', 27000, 0, 2, 'Micro · momfluencer', 'Rs. 9,000'], ['Dinuka Senanayake', 'DS', '#123bbd,#3d6bf5', 18000, 2, 1, 'Micro · food reviewer', 'Rs. 9,000'],
  ['Pasan Ekanayake', 'PE', '#414141,#a0a0a0', 15000, 2, 0, 'Micro · cricket & food', 'Rs. 9,000'], ['Rashmi Kumari', 'RK', '#f433ab,#7391f3', 12000, 3, 1, 'Micro · lifestyle', 'Rs. 9,000']];
SCREENS['b2-creators'] = () => {
  const people = KANDY.map(([name, ini2, g, f, row, col, sub, price], i) => ({name, ini: ini2, g, f, row, col, sub: `${sub} · ${kf(f)}`, price, note: i < 2 ? 'per reel' : 'per reel', sel: 1, av: iniAv(ini2, g)}));
  return step2creators('b', {h: 'Approve Ishara’s creator shortlist', sub: 'Ishara picked these for the opening: 2 macro creators to build hype and micro creators near the store. Approve, or comment to swap someone.', rows: ['Kandy city', 'Peradeniya', 'Katugastota', 'Nuwara Eliya'], people,
    filters: ['Macro', 'Micro', 'Families', 'Students', 'Kandy', 'Peradeniya', 'Katugastota'], filtersOn: ['Macro', 'Micro', 'Kandy', 'Peradeniya', 'Katugastota'],
    tiles: [['Shortlist', '8 named'], ['Plus open to', '~32 micro near Kandy'], ['Combined followers', '380K'], ['Creators’ budget', rs(704000)]],
    listTitle: 'Shortlist by Ishara', listSub: 'Micro creators are paid Rs. 9,000 per reel + bonus pool.', barWord: 'creators approved', barTotal: 'Ishara invites them on go live', btn: 'Approve shortlist'});
};

SCREENS['c2-creators'] = () => {
  const pr = (h) => rs(by(h).cost);
  const people = [
    POOLP('ranshan15', {row: 0, sel: 1, price: pr('ranshan15'), note: '1 reel'}), POOLP('radeeshaa', {row: 0, sel: 1, price: pr('radeeshaa'), note: '1 reel'}),
    POOLP('mitchie_imasha', {row: 0, sel: 1, price: pr('mitchie_imasha'), note: '1 reel'}), POOLP('she_writes_a_diary', {row: 0, sel: 1, price: pr('she_writes_a_diary'), note: '1 reel'}),
    POOLP('viindula', {row: 1, price: pr('viindula'), note: '1 reel'}), POOLP('le.lumii', {row: 1, col: 0, off: 1, price: 'Booked', note: 'until Nov 29'}),
  ];
  return step2creators('c', {h: 'Pick the creators to invite', sub: 'Invite only: only the creators you select get an invite with the brief. Each price is for one Instagram reel, inclusive of Polysocial fees.', rows: ['Colombo city', 'Colombo suburbs'], people,
    filters: ['Momfluencer', 'Dadfluencer', 'Restaurant reviewer', 'Micro', 'Mid', 'Colombo'], filtersOn: ['Momfluencer', 'Dadfluencer', 'Restaurant reviewer', 'Colombo'],
    tiles: [['Matched', '6 creators'], ['Selected', '4'], ['Combined followers', '124K'], ['Total for 1 reel each', rs(217647)]],
    listTitle: 'Matching creators', listSub: '16 checked against your persona and dates.', barWord: 'creators selected', barTotal: rs(217647), btn: 'Invite these 4 creators'});
};

/* ---------- Step 3 · Budget: allocate, or send a transfer ---------- */
function step3(k, o) {
  const t = T[k], transfer = o.fund === 'transfer';
  return page(k, 2,
    stephead(3, 'Allocate the budget', 'Fund the campaign from your brand budget, or send a bank transfer like you do in Financials.') +
    `<div class="cols"><div class="main">` +
    card('Campaign budget', o.budgetSub, o.budgetBody) +
    card('How do you want to fund it?', '', `<div class="stack">${rcards([['Allocate from your brand budget', `You have ${rs(FREE)} free to spend in your wallet.`, I.walletI], ['Send a bank transfer', 'Transfer to PolySocial and upload the slip. Counts once verified.', I.bank]], transfer ? 'Send a bank transfer' : 'Allocate from your brand budget')}
      ${transfer ? `<h3>Transfer ${rs(t.budget)} to</h3><div class="bank">${[['Account name', 'PolySocial (Pvt) Ltd'], ['Bank', 'Commercial Bank of Ceylon'], ['Branch', 'Colombo 03, Kollupitiya'], ['Account number', '1000 4821 9930'], ['SWIFT code', 'CCEYLKLX'], ['Payment reference', 'PS-PATTYPOP-1116']].map(([a, b]) => `<div><span>${a}</span><b>${b}<em>Copy</em></b></div>`).join('')}</div>
        ${field('Transfer slip', `<div class="slip"><span class="fi">PDF</span><div><b>HNB_transfer_217647.pdf</b><span>Uploaded today 3:12 pm · 180 KB</span></div><span class="pill warn">Pending verification</span></div>`, {hint: 'PDF, JPG or PNG up to 10 MB. Use the payment reference so we can match it.'})}
        ${note('Verification usually takes under 1 business day. If it isn’t verified by the go-live date, the campaign waits and we let you know.', 'warn')}`
      : `<div class="alloc"><div class="tile"><span>Free to spend</span><b>${rs(FREE)}</b></div><span class="op">−</span><div class="tile" style="border-color:var(--blue-500);background:var(--blue-50)"><span>This campaign</span><b>${rs(t.budget)}</b></div><span class="op">=</span><div class="tile"><span>Left after</span><b>${rs(FREE - t.budget)}</b></div></div>
        ${note(`Allocated now and held when the campaign goes live on ${t.live[3].split(' · ')[0]}. Anything unspent goes back to your brand budget.`, 'good')}`}
    </div>`) +
    `</div><div class="stick">` + card('Summary', '', `<div class="stack">${kv(o.summary)}${wallet(t.budget, transfer ? 'Pending transfer of' : 'This campaign holds')}</div>`) + `</div></div>`,
    bar(transfer ? 'Transfer pending verification · you can continue' : 'Budget allocated', ['Continue to go live'], true));
}
SCREENS['a3-budget'] = () => step3('a', {fund: 'allocate', budgetSub: 'Open campaign, paid on performance. Suggested from 4 past Patty Pop campaigns.',
  budgetBody: `<div class="stack"><div class="grid2">${field('Total budget', money(600000), {req: 1})}${field('Base price per reel', money(6000))}${field('Performance pricing', money(1800, '/ 1K views'))}${field('Max earning per reel', money(90000))}</div>${tiles([['Expected creators', '70–90'], ['Expected views', '1.6–2.0M'], ['Cost per 1K views', '~Rs. 330']])}</div>`,
  summary: [['Pay model', 'Performance fee'], ['Total budget', rs(600000)], ['Funding', 'Brand budget'], ['Held on', 'Mon, Oct 19']]});
SCREENS['b3-budget'] = () => step3('b', {fund: 'allocate', budgetSub: 'All-in: creators and your expert’s commission.',
  budgetBody: `<div class="stack">${field('Total budget', money(800000), {req: 1})}<table class="tb"><tbody><tr><td>Creators (2 macro, 40 micro + bonus pool)</td><td class="r">${rs(704000)}</td></tr><tr><td>Ishara Fernando · 12% commission <span class="pill">charged on design approval</span></td><td class="r">${rs(96000)}</td></tr></tbody><tfoot><tr><td>Total</td><td class="r">${rs(800000)}</td></tr></tfoot></table></div>`,
  summary: [['Creators', rs(704000)], ['Expert commission', rs(96000)], ['Funding', 'Brand budget'], ['Held on', 'Fri, Nov 20']]});
SCREENS['c3-budget'] = () => step3('c', {fund: 'transfer', budgetSub: 'Invite only: each creator’s price for one reel.',
  budgetBody: `<table class="tb"><tbody>${['ranshan15', 'radeeshaa', 'mitchie_imasha', 'she_writes_a_diary'].map(by).map(c => `<tr><td><div class="prow">${cav(c, 32)}<div><b style="font-size:14px">${c.name}</b><span>1 Instagram reel</span></div></div></td><td class="r">${rs(c.cost)}</td></tr>`).join('')}</tbody><tfoot><tr><td>Total</td><td class="r">${rs(217647)}</td></tr></tfoot></table>`,
  summary: [['Pay model', 'Fixed per creator'], ['Total budget', rs(217647)], ['Funding', 'Bank transfer'], ['Status', '<span class="pill warn">Pending verification</span>']]});

/* ---------- Step 4 · Go live: terms, date, creator view ---------- */
function creatorView(k, o) {
  const t = T[k];
  return `<div class="phone"><div class="notch"><span>9:41</span><span>●●● ▮</span></div><div class="cvbar">You are viewing this as a creator</div>
    <div class="cv-hero" style="background-image:url(img/${t.cover[0]})"><span class="bb"><img src="img/pattypop.png">Patty Pop</span></div>
    <div class="cv"><div><h3>${t.title}</h3><div class="mt">${o.meta}</div></div>
      <div class="pl">${o.price.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>
      <div><h5>Best suited for</h5>${tagsHTML(o.tags)}</div>
      <div><h5>Requirements</h5><p>${o.req}</p></div>
      <div><h5>Campaign created by</h5><div class="prow"><img class="pav" src="img/pattypop.png" style="width:32px;height:32px"><div><b style="font-size:13px">Patty Pop</b><span style="font-size:11px">Since Mar 2026 · 4 campaigns</span></div></div></div>
      <span class="join">Join now</span></div></div>`;
}
function step4(k, o) {
  const t = T[k], [dw, mo, d, full] = t.live;
  return page(k, 3,
    stephead(4, 'Go live', 'Check how creators will see it, accept the terms and confirm the go-live date. You can still request edits.', `<span class="btn btn-sec btn-sm"><span style="width:16px">${I.eye}</span>Open full creator view</span>`) +
    `<div class="cols even"><div class="main">` +
    card('Go-live date', '', `<div class="stack"><div class="dateline"><div class="big"><small>${mo}</small><b>${d}</b></div><div class="tx"><b>${full}</b><span>Ends ${t.end} · ${o.who}</span></div><span class="link" style="margin-left:auto">Change</span></div></div>`) +
    card('Checklist', '', gates(o.gates.map(([a, b]) => [a, b, 1]))) +
    card('Terms', '', `<div class="terms">${checks([
      ['I accept the <a>Polysocial Terms of Service</a> and the <a>Campaign Owner terms</a>', 1],
      [`I agree that ${rs(o.hold)} is held on ${full.split(' · ')[0]} and paid to creators only for content I approve`, 1],
      ['Creators’ content stays theirs; Patty Pop may reshare it with credit for 30 days', 1],
      ...(o.extraTerm ? [[o.extraTerm, 1]] : []),
    ])}</div>`) +
    `</div><div class="stick" style="justify-items:center">${creatorView(k, o.cv)}<span class="btn btn-sec"><span style="width:16px">${I.chat}</span>Request edits</span><span style="font-size:13px;color:var(--grey-600);text-align:center">Edits are possible right up to the go-live date.</span></div></div>`,
    bar(`Goes live ${full}`, ['Request edits', 'Confirm &amp; go live on ' + `${dw}, ${mo.charAt(0) + mo.slice(1).toLowerCase()} ${d}`], true));
}
const CV = {
  a: {meta: 'Food · Oct 19 – Nov 8 · Open', price: [['Base price per content', 'Rs. 6,000'], ['Max earning per content', 'Rs. 90,000'], ['Performance pricing', 'Rs. 1,800 / 1K views'], ['Total budget', 'Rs. 600,000']], tags: ['18–28 age', 'Colombo', 'Galle', 'Selfie', 'Reels'], req: '“POV: you found the crunchiest burger in Colombo”. Starving moment → order at Patty Pop → slow-mo crunchy first bite.'},
  b: {meta: 'Food · Nov 20 – Dec 14 · Open', price: [['Base price per content', 'Rs. 9,000'], ['Max earning per content', 'Rs. 120,000'], ['Performance pricing', 'Rs. 1,500 / 1K views'], ['Total budget', 'Rs. 704,000']], tags: ['Families', 'Students', 'Kandy', 'Peradeniya', 'Reels'], req: '“I drove up to Kandy for one bite…”. Queue on opening day, first bite and free fries with code KANDYPOP.'},
  c: {meta: 'Food · Nov 16 – Dec 6 · Invite only', price: [['Flat fee per content', 'Agreed per creator'], ['Slots', '4'], ['Slots filled', '0'], ['Total budget', 'Rs. 217,647']], tags: ['Families', 'Parents 25–44', 'Colombo city', 'Reels'], req: '“Weekend dinner, sorted in one box”. Open the Family Feast box at home; show the Rs. 4,990 price.'},
};
SCREENS['a4-golive'] = () => step4('a', {who: 'open to all matching creators', hold: 600000, cv: CV.a,
  gates: [['Basics', 'brief, open, Oct 19 – Nov 8'], ['Design approved', 'version 3, after your 2 comments'], ['Creators approved', '7 suggested + open to ~1,480'], ['Budget allocated', `${rs(600000)} from your brand budget`]]});
SCREENS['b4-golive'] = () => step4('b', {who: 'run by Ishara Fernando', hold: 704000, cv: CV.b, extraTerm: 'I hire Ishara Fernando at 12% (Rs. 96,000), charged now that the design is approved',
  gates: [['Basics', 'brief, expert, open, Nov 20 – Dec 14'], ['Design approved', 'version 2 by Ishara'], ['Shortlist approved', '8 named + open near Kandy'], ['Budget allocated', `${rs(800000)} incl. commission`]]});
SCREENS['c4-golive'] = () => step4('c', {who: 'invites go to 4 creators', hold: 217647, cv: CV.c,
  gates: [['Basics', 'brief, invite only, Nov 16 – Dec 6'], ['Design approved', 'version 2'], ['Creators picked', 'Ranshan, Radeesha, Imasha, Chathuri'], ['Budget', `${rs(217647)} transfer verified`]]});

SCREENS['a4b-request-edits'] = () => SCREENS['a4-golive']() + `<div class="scrim"><div class="modal"><h2>Request edits</h2><p>Tell us what to change. We update the campaign and ask you to confirm again; the go-live date stays the same.</p>
  ${field('Section', sel('Pricing'))}${field('What should change?', area('Show the max earning per reel first, it’s the most exciting number for creators.', 3))}
  <div class="mrow"><span class="btn btn-ghost">Cancel</span><span class="btn btn-pri">Send request</span></div></div></div>`;

/* ---------- Scheduled ---------- */
function scheduled(k, o) {
  const t = T[k], [, mo, d, full] = t.live;
  return `${topbar4(k)}${stepbar(k, 4)}<div class="wide nav-in"><section class="dcard"><div class="success"><span class="big">${I.check}</span><h1>Scheduled to go live</h1>
    <div class="dateline" style="margin:8px 0"><div class="big"><small>${mo}</small><b>${d}</b></div><div class="tx" style="text-align:left"><b>${full}</b><span>${o.line}</span></div></div>
    <p>${o.body}</p><div class="tl">${o.tl.map(([a, b], i) => `<div class="${i === 0 ? 'on' : ''}"><b>${a}</b>${b}</div>`).join('')}</div>
    <div style="display:flex;gap:8px"><span class="btn btn-pri">Open campaign dashboard</span><span class="btn btn-sec">View as creator</span><span class="btn btn-sec">Request edits</span></div></div></section></div>`;
}
SCREENS['a5-scheduled'] = () => scheduled('a', {line: `${rs(600000)} allocated · open to matching creators`, body: 'On Oct 19 your 7 approved creators get the invite first and ~1,480 matching creators are notified. Content comes to you for approval.', tl: [['Today', 'Scheduled'], ['Oct 19', 'Goes live'], ['Nov 8', 'Ends'], ['Nov 15', 'Payouts &amp; report']]});
SCREENS['b5-scheduled'] = () => scheduled('b', {line: `${rs(800000)} allocated · run by Ishara Fernando`, body: 'On Nov 20 Ishara sends the invites to your approved shortlist. She handles approvals and sends a report every Monday.', tl: [['Today', 'Scheduled'], ['Nov 20', 'Goes live'], ['Dec 5', 'Store opens'], ['Dec 14', 'Ends']]});
SCREENS['c5-scheduled'] = () => scheduled('c', {line: `${rs(217647)} by bank transfer · 4 invites`, body: 'On Nov 16 Ranshan, Radeesha, Imasha and Chathuri get their invites with the brief. Each is paid once you approve their reel.', tl: [['Today', 'Scheduled'], ['Nov 16', 'Invites go out'], ['Dec 6', 'Ends'], ['After approval', 'Payouts']]});

/* ---------- Draw ---------- */
const id = new URLSearchParams(location.search).get('s') || '00-brand-page';
document.body.innerHTML = SCREENS[id]();
window.SCREEN_IDS = Object.keys(SCREENS);
