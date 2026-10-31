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

/* =====================================================================
   Every campaign type is created in the same 4 steps:
   1 Basics · 2 Details & creators · 3 Budget · 4 Go live
   ===================================================================== */
const STEPS4 = ['Basics', 'Details &amp; creators', 'Budget', 'Go live'];
const T = {
  a: {title: 'Pop Crunch Chicken — The crunch you can hear', cover: ['ppBiteWide.jpg', 'ppBite.jpg', 'ppMeal.jpg'], live: ['OCT', '19', 'Mon, Oct 19, 2026 · 9:00 am'], end: 'Sun, Nov 8, 2026', budget: 600000},
  b: {title: 'Patty Pop Kandy — First bite in the hills', cover: ['ppBite.jpg', 'ppMeal.jpg', 'ppBiteWide.jpg'], live: ['NOV', '20', 'Fri, Nov 20, 2026 · 10:00 am'], end: 'Mon, Dec 14, 2026', budget: 800000},
  c: {title: 'Family Feast — Weekend dinner, sorted', cover: ['ppMeal.jpg', 'ppBiteWide.jpg', 'ppBite.jpg'], live: ['NOV', '16', 'Mon, Nov 16, 2026 · 9:00 am'], end: 'Sun, Dec 6, 2026', budget: 217647},
};
const Q = new URLSearchParams(location.search);
const MAP_URL = Q.get('map') || 'http://localhost:8765/creator-map/celeste';
const MAP_H = Q.get('mapH') || 3902;

const topbar4 = (k, untitled) => `<header class="topbar"><a class="logo">${I.logo}<span>Create campaign</span></a><div class="top-mid">${untitled ? '' : T[k].title}</div>
  <div class="top-r"><span class="btn btn-ghost btn-sm">Save &amp; exit</span><img class="avatar" src="img/pattypop.png" alt=""></div></header>`;
const stepbar = (cur) => `<div class="stepbar"><div class="in2"><ol class="stepper4">${STEPS4.map((t, i) => `<li class="${i < cur ? 'done' : i === cur ? 'cur' : ''}"><span class="c">${i < cur ? '✓' : i + 1}</span><span class="t"><b>${t}</b></span></li>`).join('')}</ol></div></div>`;
const bar = (btns) => `<div class="actbar"><div class="in2"><span class="btn btn-ghost">Back</span><span class="miss"></span>${btns.map((b, i) => `<span class="btn ${i === btns.length - 1 ? 'btn-pri' : 'btn-sec'}">${b}</span>`).join('')}</div></div>`;
const page = (k, cur, body, b) => `${topbar4(k, cur === 0)}${stepbar(cur)}<div class="wide nav-in">${body}${b || ''}</div>`;
const stephead = (title, right) => `<section class="dcard tight"><div class="dhead row" style="margin-bottom:0;align-items:center"><h1>${title}</h1>${right || ''}</div></section>`;
const box = (title, body, req) => card(title, '', body, req ? {req: 1} : {});

/* ---------- Entry: the brand's Campaigns page ---------- */
SCREENS['00-brand-page'] = () => `<style>body{background:#fff}</style><header class="topbar"><a class="logo">${I.logo}</a><div style="display:flex;gap:28px;color:var(--grey-600)"><span style="width:22px;color:var(--grey-800)">${I.compass}</span><span style="width:22px">${I.walletI}</span></div><div class="top-r"><span style="width:22px;color:var(--grey-700)">${I.bell}</span><img class="avatar" src="img/pattypop.png" alt=""></div></header>
  <div style="background:#121212;color:#a0a0a0;display:flex;justify-content:center;gap:26px;height:36px;align-items:center;font-size:15px;font-weight:500"><span style="color:#fff">Active</span><span>Completed</span><span>Upcoming</span></div>
  <div class="wide" style="background:#fff;max-width:none;padding-left:max(24px,calc((100% - 1128px)/2));padding-right:max(24px,calc((100% - 1128px)/2))">
    <div class="ctahead" style="margin-top:12px"><h1 style="font-size:24px;font-weight:600">Active campaigns</h1><span class="btn btn-pri"><span style="width:16px">${I.plus}</span>Create campaign</span></div>
    ${chips(['All', 'Price', 'Mobility', 'Food', 'Entertainment', 'Lifestyle'], ['All'])}
    <div class="grid3">${[['ppBiteWide.jpg', 'Spicy Pop Wings — Feel the heat', 'Open · 3 d ago · 12 d left', 46, '186 joined', 'Rs. 212,400 / Rs. 450,000'], ['ppMeal.jpg', 'Patty Pop Combo Tuesdays', 'Invite only · 6 d ago · 4 d left', 75, '9 / 12 slots', ''], ['ppBite.jpg', 'Double Smash launch week', 'Open · 1 d ago · 20 d left', 18, '64 joined', 'Rs. 54,000 / Rs. 300,000']].map(([img, t, m, p, j, mo]) => `<div><div style="height:200px;border-radius:16px;background:url(img/${img}) center/cover"></div><div style="padding:12px 4px;display:grid;gap:6px"><b style="font-size:16px;font-weight:500">${t}</b><span style="font-size:13px;color:var(--grey-600)">${m}</span><div style="height:6px;border-radius:6px;background:#ddd"><div style="width:${p}%;height:100%;border-radius:6px;background:var(--blue-500)"></div></div><div style="display:flex;justify-content:space-between;font-size:15px;font-weight:500"><span>${j}</span><span>${mo}</span></div></div></div>`).join('')}</div>
  </div>`;

/* ---------- Step 1 · Basics ---------- */
function step1(k, o) {
  return page(k, 0,
    stephead('What is the campaign about?') +
    box('Brief', `<div class="stack">${area(o.brief, 7).replace('<textarea', '<textarea class="in" style="height:auto;border-radius:16px;padding:12px 16px;line-height:22px;font-size:15px;resize:none"')}
      <div style="display:flex;gap:8px;align-items:center">${o.files.map(f => `<img src="img/${f}" style="width:64px;height:64px;border-radius:12px;object-fit:cover">`).join('')}<span class="drop" style="width:64px;height:64px;padding:0;border-radius:12px"><span style="width:20px">${I.plus}</span></span></div></div>`, 1) +
    box('Who designs it?', rcards([['We’ll design it', 'You comment on the design we prepare.', I.pen], ['Hire an expert', 'A creative strategist designs and runs it.', I.star]], o.design), 1) +
    box('Who can join?', rcards([['Open campaign', 'Any matching creator.', I.lockOpen], ['Invite only', 'Only creators you select.', I.lock]], o.access), 1) +
    box('Dates', `<div class="grid3">${field('Go live on', inp(o.start))}${field('Time', sel(o.time))}${field('Ends on', inp(o.end))}</div>`, 1),
    bar(['Send request']));
}
SCREENS['a1-basics'] = () => step1('a', {design: 'We’ll design it', access: 'Open campaign', start: 'Mon, Oct 19, 2026', time: '9:00 am', end: 'Sun, Nov 8, 2026', files: ['ppBiteWide.jpg', 'ppBite.jpg'],
  brief: 'We’re launching the Pop Crunch Chicken burger. Goal: get people in their 20s in Colombo and Galle to try it in the first 3 weeks.\nHook idea: “POV: you found the crunchiest burger in Colombo”. Show the starving moment, ordering at Patty Pop, then a slow-mo crunchy first bite.\nMust show the burger up close and the Patty Pop wrapper. Fun and loud, not too polished. TikTok and Instagram Reels.'});
SCREENS['b1-basics'] = () => step1('b', {design: 'Hire an expert', access: 'Open campaign', start: 'Fri, Nov 20, 2026', time: '10:00 am', end: 'Mon, Dec 14, 2026', files: ['ppBite.jpg'],
  brief: 'We’re opening a new Patty Pop on Peradeniya Rd, Kandy on Sat, Dec 5, with free fries on opening weekend. We want families and students from Kandy and Peradeniya to come in.\nBudget around Rs. 800,000 all-in.'});
SCREENS['c1-basics'] = () => step1('c', {design: 'We’ll design it', access: 'Invite only', start: 'Mon, Nov 16, 2026', time: '9:00 am', end: 'Sun, Dec 6, 2026', files: ['ppMeal.jpg'],
  brief: 'Family Feast box: 2 burgers, 2 kids’ meals, fries and 4 drinks for Rs. 4,990. We want families to make Patty Pop their weekend dinner plan.\nMomfluencers in Colombo, one Instagram reel each.'});

/* ---------- Step 2 · Details: campaign design with comments ---------- */
const avIni = (t, g) => `<span class="av2" style="background:linear-gradient(135deg,${g})">${t}</span>`;
const ME = '<img src="img/pattypop.png">', PS = avIni('PS', '#1548eb,#7391f3'), IF = avIni('IF', '#1548eb,#f433ab');
const sec = (h, body, c) => `<div class="dsec${c ? ' cm' : ''}"><h4>${h}</h4>${body}${c ? `<span class="cbadge">${I.chat}${c}</span>` : `<span class="addc">${I.chat}</span>`}</div>`;
const thread = (on, msgs) => `<div class="cthread"><div class="on"><b>${on}</b></div>${msgs.map(([av, who, txt]) => `<div class="cmt">${av}<div><b>${who}</b><div>${txt}</div></div></div>`).join('')}</div>`;
const segs = (on, done) => `<div class="seg"><span class="${on === 0 ? 'on' : ''}">${done ? '<span class="dot">✓</span>' : ''}Design</span><span class="${on === 1 ? 'on' : ''}">Creators</span></div>`;

function step2design(k, o) {
  const t = T[k];
  return page(k, 1,
    stephead('Campaign design', segs(0)) +
    `<div class="cols"><section class="dcard doc"><div class="dcover">${t.cover.map(c => `<div style="background-image:url(img/${c})"></div>`).join('')}</div><div class="dbody">
      ${sec('Title', `<div class="dtitle">${t.title}</div>`, o.c.title)}
      ${sec('Brief', `<p>${o.req}</p>`, o.c.req)}
      ${sec('Hook', `<p>${o.hook}</p>`, o.c.hook)}
      ${sec('Script', `<div class="beatsv">${o.beats.map(([a, b]) => `<div><em>${a}</em><span>${b}</span></div>`).join('')}</div>`, o.c.script)}
      <div class="grid2">${sec('Deliverable', `<p>${o.deliv}</p>`)}${sec('Platforms', `<div class="chips">${o.plats.map(p => `<span class="chip" style="height:30px">${PLAT[p]}${p}</span>`).join('')}</div>`)}</div>
      ${sec('Best suited for', tagsHTML(o.suited), o.c.suited)}
      ${sec('Must be visible', `<p>${o.visible}</p>`)}
      ${sec('Call to action', `<p>${o.cta}</p>`)}
    </div></section>
    <div class="stick"><section class="dcard tight"><h3 style="margin-bottom:12px">Comments</h3><div style="display:grid;gap:10px">${o.threads.map(([on, msgs]) => thread(on, msgs)).join('')}
      <div class="cbox"><textarea placeholder="Add a comment"></textarea></div></div></section>${o.side || ''}</div></div>`,
    bar([`Request edits`, 'Approve design']));
}
SCREENS['a2-design'] = () => step2design('a', {
  req: 'Show the moment you’re starving, walk into Patty Pop, and take the first big crunchy bite of the new Pop Crunch Chicken.', hook: '“POV: you found the crunchiest burger in Colombo”',
  beats: [['0–3s', 'Starving moment — late-night study, after cricket or after work'], ['3–8s', 'Walk into Patty Pop and order the Pop Crunch Chicken'], ['8–15s', 'First big bite, slow-mo crunch, burger to camera'], ['15s+', 'Happy reaction + “Pop Crunch Chicken, now at Patty Pop”']],
  deliv: '1 reel · 15–30s · 9:16', plats: ['TikTok', 'Instagram'], suited: ['18–28 age', 'Colombo', 'Galle', 'Students', 'Young professionals'],
  visible: 'The burger up close and the Patty Pop wrapper', cta: 'Try the Pop Crunch Chicken at Patty Pop and tag @pattypoplk 🍔', c: {hook: 1, script: 1},
  threads: [['Hook', [[ME, 'You', 'Add “the crunch you can hear” to the hook.']]], ['Script · 8–15s', [[ME, 'You', 'Show the wrapper in the bite shot.']]]]});
SCREENS['b2-design'] = () => step2design('b', {
  req: 'Capture the opening of the new Patty Pop in Kandy: the queue, the first bite and the free fries on opening weekend.', hook: '“I drove up to Kandy for one bite…”',
  beats: [['0–3s', 'The drive up to Peradeniya Rd'], ['3–10s', 'The queue and the store front on opening day'], ['10–20s', 'First bite + free fries with code KANDYPOP'], ['20s+', '“Patty Pop, now in Kandy”']],
  deliv: '1 reel · 20–40s · 9:16', plats: ['Instagram', 'TikTok'], suited: ['Families', 'Students', 'Kandy', 'Peradeniya'],
  visible: 'The store front and the free-fries offer', cta: 'Free fries this weekend at Patty Pop Kandy with code KANDYPOP 🍟', c: {suited: 1},
  threads: [['Best suited for', [[ME, 'You', 'Please add Katugastota.'], [IF, 'Ishara', 'Adding it.']]]],
  side: `<section class="dcard tight"><div class="prow">${ini('IF', '#1548eb,#f433ab')}<div><b>Ishara Fernando</b><span>Expert · 12% commission</span></div></div></section>`});
SCREENS['c2-design'] = () => step2design('c', {
  req: 'Your family’s Saturday night sorted: open the Family Feast box at home, everyone grabs their favourite, kids react to their meal.', hook: '“Weekend dinner, sorted in one box”',
  beats: [['0–3s', 'The “what’s for dinner?” moment at home'], ['3–10s', 'Open the Family Feast box on the table'], ['10–20s', 'Everyone digs in, kids’ reactions'], ['20s+', 'Rs. 4,990 for the whole family']],
  deliv: '1 Instagram reel · 20–40s · 9:16', plats: ['Instagram'], suited: ['Families', 'Parents 25–44', 'Colombo city'],
  visible: 'The open Family Feast box and the Rs. 4,990 price', cta: 'Order the Family Feast box on the Patty Pop app and tag @pattypoplk', c: {title: 1},
  threads: [['Title', [[ME, 'You', 'Mention the price in the title.']]]]});

/* ---------- Step 2 · Creators: the Polysocial creator map, exactly as deployed ---------- */
function step2creators(k, btn) {
  return page(k, 1,
    stephead('Select creators', segs(1, 1)) +
    `<section class="dcard" style="padding:0;overflow:hidden"><iframe src="${MAP_URL}" title="Creator map" style="display:block;width:100%;height:${MAP_H}px;border:0"></iframe></section>`,
    bar([btn]));
}
SCREENS['a2-creators'] = () => step2creators('a', 'Approve creators');
SCREENS['b2-creators'] = () => step2creators('b', 'Approve creators');
SCREENS['c2-creators'] = () => step2creators('c', 'Invite selected creators');

/* ---------- Step 3 · Budget: allocate, or send a transfer ---------- */
function step3(k, o) {
  const t = T[k], transfer = o.fund === 'transfer';
  return page(k, 2,
    stephead('Budget') +
    box('Campaign budget', o.budgetBody) +
    box('Funding', `<div class="stack">${rcards([['Allocate from brand budget', `${rs(FREE)} available`, I.walletI], ['Send a bank transfer', 'Upload the transfer slip', I.bank]], transfer ? 'Send a bank transfer' : 'Allocate from brand budget')}
      ${transfer ? `<div class="bank">${[['Account name', 'PolySocial (Pvt) Ltd'], ['Bank', 'Commercial Bank of Ceylon'], ['Branch', 'Colombo 03, Kollupitiya'], ['Account number', '1000 4821 9930'], ['Amount', rs(t.budget)], ['Payment reference', 'PS-PATTYPOP-1116']].map(([a, b]) => `<div><span>${a}</span><b>${b}<em>Copy</em></b></div>`).join('')}</div>
        <div class="slip"><span class="fi">PDF</span><div><b>HNB_transfer_217647.pdf</b><span>180 KB</span></div><span class="pill warn">Pending verification</span></div>`
      : `<div class="alloc"><div class="tile"><span>Available</span><b>${rs(FREE)}</b></div><span class="op">−</span><div class="tile" style="border-color:var(--blue-500);background:var(--blue-50)"><span>This campaign</span><b>${rs(t.budget)}</b></div><span class="op">=</span><div class="tile"><span>Left</span><b>${rs(FREE - t.budget)}</b></div></div>`}
    </div>`),
    bar(['Continue']));
}
SCREENS['a3-budget'] = () => step3('a', {fund: 'allocate',
  budgetBody: `<div class="grid2">${field('Total budget', money(600000))}${field('Base price per content', money(6000))}${field('Performance pricing', money(1800, '/ 1K views'))}${field('Max earning per content', money(90000))}</div>`});
SCREENS['b3-budget'] = () => step3('b', {fund: 'allocate',
  budgetBody: `<table class="tb"><tbody><tr><td>Creators</td><td class="r">${rs(704000)}</td></tr><tr><td>Ishara Fernando · 12%</td><td class="r">${rs(96000)}</td></tr></tbody><tfoot><tr><td>Total</td><td class="r">${rs(800000)}</td></tr></tfoot></table>`});
SCREENS['c3-budget'] = () => step3('c', {fund: 'transfer',
  budgetBody: `<table class="tb"><tbody>${['ranshan15', 'radeeshaa', 'mitchie_imasha', 'she_writes_a_diary'].map(by).map(c => `<tr><td><div class="prow">${cav(c, 32)}<b style="font-size:14px">${c.name}</b></div></td><td class="r">${rs(c.cost)}</td></tr>`).join('')}</tbody><tfoot><tr><td>Total</td><td class="r">${rs(217647)}</td></tr></tfoot></table>`});

/* ---------- Step 4 · Go live ---------- */
const CV = {
  a: {meta: 'Food · Oct 19 – Nov 8 · Open', price: [['Base price per content', 'Rs. 6,000'], ['Max earning per content', 'Rs. 90,000'], ['Performance pricing', 'Rs. 1,800 / 1K views'], ['Total budget', 'Rs. 600,000']], tags: ['18–28 age', 'Colombo', 'Galle', 'Selfie', 'Reels'], req: '“POV: you found the crunchiest burger in Colombo”. Starving moment → order at Patty Pop → slow-mo crunchy first bite.'},
  b: {meta: 'Food · Nov 20 – Dec 14 · Open', price: [['Base price per content', 'Rs. 9,000'], ['Max earning per content', 'Rs. 120,000'], ['Performance pricing', 'Rs. 1,500 / 1K views'], ['Total budget', 'Rs. 704,000']], tags: ['Families', 'Students', 'Kandy', 'Peradeniya', 'Reels'], req: '“I drove up to Kandy for one bite…”. Queue on opening day, first bite and free fries with code KANDYPOP.'},
  c: {meta: 'Food · Nov 16 – Dec 6 · Invite only', price: [['Flat fee per content', 'Agreed per creator'], ['Slots', '4'], ['Slots filled', '0'], ['Total budget', 'Rs. 217,647']], tags: ['Families', 'Parents 25–44', 'Colombo city', 'Reels'], req: '“Weekend dinner, sorted in one box”. Open the Family Feast box at home; show the Rs. 4,990 price.'},
};
function creatorView(k) {
  const t = T[k], o = CV[k];
  return `<div class="phone"><div class="notch"><span>9:41</span><span>●●● ▮</span></div><div class="cvbar">You are viewing this as a creator</div>
    <div class="cv-hero" style="background-image:url(img/${t.cover[0]})"><span class="bb"><img src="img/pattypop.png">Patty Pop</span></div>
    <div class="cv"><div><h3>${t.title}</h3><div class="mt">${o.meta}</div></div>
      <div class="pl">${o.price.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>
      <div><h5>Best suited for</h5>${tagsHTML(o.tags)}</div>
      <div><h5>Requirements</h5><p>${o.req}</p></div>
      <div><h5>Campaign created by</h5><div class="prow"><img class="pav" src="img/pattypop.png" style="width:32px;height:32px"><b style="font-size:13px">Patty Pop</b></div></div>
      <span class="join">Join now</span></div></div>`;
}
function step4(k, extraTerm) {
  const t = T[k], [mo, d, full] = t.live;
  return page(k, 3,
    stephead('Go live') +
    `<div class="cols even"><div class="main">` +
    box('Go-live date', `<div class="dateline"><div class="big"><small>${mo}</small><b>${d}</b></div><div class="tx"><b>${full}</b><span>Ends ${t.end}</span></div><span class="link" style="margin-left:auto">Change</span></div>`) +
    box('Terms', `<div class="terms">${checks([['I accept the <a>Polysocial Terms of Service</a> and the <a>Campaign Owner terms</a>', 1], ...(extraTerm ? [[extraTerm, 1]] : [])])}</div>`) +
    `</div><div class="stick" style="justify-items:center">${creatorView(k)}</div></div>`,
    bar(['Request edits', `Confirm &amp; go live`]));
}
SCREENS['a4-golive'] = () => step4('a');
SCREENS['b4-golive'] = () => step4('b', 'I hire Ishara Fernando at 12% (Rs. 96,000)');
SCREENS['c4-golive'] = () => step4('c');
SCREENS['a4b-request-edits'] = () => SCREENS['a4-golive']() + `<div class="scrim"><div class="modal"><h2>Request edits</h2>
  ${field('Section', sel('Pricing'))}${field('What should change?', area('Show the max earning per content first.', 3))}
  <div class="mrow"><span class="btn btn-ghost">Cancel</span><span class="btn btn-pri">Send</span></div></div></div>`;

/* ---------- Scheduled ---------- */
function scheduled(k) {
  const t = T[k], [mo, d, full] = t.live;
  return `${topbar4(k)}${stepbar(4)}<div class="wide nav-in"><section class="dcard"><div class="success"><span class="big">${I.check}</span><h1>Scheduled to go live</h1>
    <div class="dateline" style="margin:8px 0"><div class="big"><small>${mo}</small><b>${d}</b></div><div class="tx" style="text-align:left"><b>${full}</b></div></div>
    <div style="display:flex;gap:8px"><span class="btn btn-pri">Open campaign</span><span class="btn btn-sec">Request edits</span></div></div></section></div>`;
}
SCREENS['a5-scheduled'] = () => scheduled('a');
SCREENS['b5-scheduled'] = () => scheduled('b');
SCREENS['c5-scheduled'] = () => scheduled('c');

/* ---------- Draw ---------- */
document.body.innerHTML = SCREENS[Q.get('s') || '00-brand-page']();
window.SCREEN_IDS = Object.keys(SCREENS);
