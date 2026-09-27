/* =====================================================================
   REMOTION PRODUCTION SUITE — ASSET CATALOG
   Every asset that can be dropped into a scene is declared here:
     - defaults  : initial Keyframe.properties
     - controls  : schema for the dynamic Property Inspector (also exported to MCP agents)
     - render    : SVG string renderer used by the browser viewport (mirrors remotion/*.tsx)
   The exact same componentName must exist in remotion/SceneRenderer.tsx REGISTRY.
   ===================================================================== */
(function (global) {
  'use strict';

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const J = (x, y, len, deg) => { const r = deg * Math.PI / 180; return { x: x + len * Math.cos(r), y: y + len * Math.sin(r) }; };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const num = (v, d) => (typeof v === 'number' && !isNaN(v) ? v : d);

  /* ---------------------------------------------------------------
     STICKMAN RIG (Forward Kinematics) — identical to AdvancedStickman.tsx
     --------------------------------------------------------------- */
  const SEG = { headRadius: 22, neckLength: 15, torsoLength: 90, upperArmLength: 45, forearmLength: 40, thighLength: 55, shinLength: 50, handLength: 12, footLength: 18 };
  const GUARD = { torso: -90, neck: 0, leftShoulder: 120, leftElbow: -60, leftWrist: 0, rightShoulder: 60, rightElbow: -70, rightWrist: 0, leftHip: 75, leftKnee: 30, leftAnkle: 0, rightHip: 105, rightKnee: 15, rightAnkle: 0 };
  const JOINT_KEYS = Object.keys(GUARD);

  function calcRig(a) {
    const hip = { x: 0, y: 0 };
    const torso = num(a.torso, -90), neck = num(a.neck, 0);
    const shoulder = J(0, 0, SEG.torsoLength, torso);
    const neckPt = J(shoulder.x, shoulder.y, SEG.neckLength, torso + neck);
    const head = J(neckPt.x, neckPt.y, SEG.headRadius, torso + neck);
    const lS = num(a.leftShoulder, 120), lE = num(a.leftElbow, -60), lW = num(a.leftWrist, 0);
    const rS = num(a.rightShoulder, 60), rE = num(a.rightElbow, -70), rW = num(a.rightWrist, 0);
    const lH = num(a.leftHip, 75), lK = num(a.leftKnee, 30), lA = num(a.leftAnkle, 0);
    const rH = num(a.rightHip, 105), rK = num(a.rightKnee, 15), rA = num(a.rightAnkle, 0);
    const leftElbow = J(shoulder.x, shoulder.y, SEG.upperArmLength, lS);
    const leftWrist = J(leftElbow.x, leftElbow.y, SEG.forearmLength, lS + lE);
    const leftHand = J(leftWrist.x, leftWrist.y, SEG.handLength, lS + lE + lW);
    const rightElbow = J(shoulder.x, shoulder.y, SEG.upperArmLength, rS);
    const rightWrist = J(rightElbow.x, rightElbow.y, SEG.forearmLength, rS + rE);
    const rightHand = J(rightWrist.x, rightWrist.y, SEG.handLength, rS + rE + rW);
    const leftKnee = J(hip.x, hip.y, SEG.thighLength, lH);
    const leftFoot = J(leftKnee.x, leftKnee.y, SEG.shinLength, lH + lK);
    const leftToe = J(leftFoot.x, leftFoot.y, SEG.footLength, lH + lK + lA - 90);
    const rightKnee = J(hip.x, hip.y, SEG.thighLength, rH);
    const rightFoot = J(rightKnee.x, rightKnee.y, SEG.shinLength, rH + rK);
    const rightToe = J(rightFoot.x, rightFoot.y, SEG.footLength, rH + rK + rA - 90);
    return { hip, shoulder, neck: neckPt, head, leftElbow, leftWrist, leftHand, rightElbow, rightWrist, rightHand, leftKnee, leftFoot, leftToe, rightKnee, rightFoot, rightToe };
  }

  function renderStickman(cp, ctx) {
    const rig = calcRig(cp);
    const sw = num(cp.strokeWidth, 6);
    const body = cp.strokeColor || '#ffffff';
    const left = cp.leftLimbColor || '#ff3b30';
    const L = (a, b, c, w) => `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${c}" stroke-width="${w || sw}"/>`;
    let s = `<g stroke-linecap="round" stroke-linejoin="round" fill="none">`;
    if (cp.shadow !== false) s += `<ellipse cx="0" cy="0" rx="55" ry="9" fill="black" opacity="0.25" stroke="none"/>`;
    s += L(rig.hip, rig.shoulder, body) + L(rig.shoulder, rig.neck, body);
    s += `<circle cx="${rig.head.x.toFixed(1)}" cy="${rig.head.y.toFixed(1)}" r="${SEG.headRadius}" fill="${body}" stroke="${body}" stroke-width="2"/>`;
    // left side (depth colour)
    s += L(rig.shoulder, rig.leftElbow, left) + L(rig.leftElbow, rig.leftWrist, left) + L(rig.leftWrist, rig.leftHand, left, sw * 0.8);
    s += L(rig.hip, rig.leftKnee, left) + L(rig.leftKnee, rig.leftFoot, left) + L(rig.leftFoot, rig.leftToe, left, sw * 0.8);
    // right side
    s += L(rig.shoulder, rig.rightElbow, body) + L(rig.rightElbow, rig.rightWrist, body) + L(rig.rightWrist, rig.rightHand, body, sw * 0.8);
    s += L(rig.hip, rig.rightKnee, body) + L(rig.rightKnee, rig.rightFoot, body) + L(rig.rightFoot, rig.rightToe, body, sw * 0.8);
    if (ctx && ctx.joints !== false) {
      [rig.shoulder, rig.leftElbow, rig.rightElbow, rig.hip, rig.leftKnee, rig.rightKnee, rig.leftWrist, rig.rightWrist, rig.leftFoot, rig.rightFoot]
        .forEach(p => { s += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="white" stroke="none"/>`; });
    }
    return s + '</g>';
  }

  const R = (key, label, min, max, extra) => Object.assign({ key, label, kind: 'range', min, max, step: 1 }, extra || {});
  const STICKMAN_CONTROLS = [
    { group: 'Back & Neck', items: [R('torso', 'TORSO / BACK • -90 upright', -180, 90), R('neck', 'NECK TILT', -60, 60)] },
    { group: 'Arms & Hands', items: [
      R('leftShoulder', 'LEFT SHOULDER', -180, 180, { left: true }), R('leftElbow', 'LEFT ELBOW (rel)', -150, 150, { left: true }), R('leftWrist', 'LEFT HAND / WRIST', -90, 90, { left: true }),
      R('rightShoulder', 'RIGHT SHOULDER', -180, 180), R('rightElbow', 'RIGHT ELBOW (rel)', -150, 150), R('rightWrist', 'RIGHT HAND / WRIST', -90, 90)] },
    { group: 'Legs & Feet', items: [
      R('leftHip', 'LEFT HIP', -90, 180, { left: true }), R('leftKnee', 'LEFT KNEE (rel)', -20, 150, { left: true }), R('leftAnkle', 'LEFT FOOT / ANKLE', -60, 60, { left: true }),
      R('rightHip', 'RIGHT HIP', -90, 180), R('rightKnee', 'RIGHT KNEE (rel)', -20, 150), R('rightAnkle', 'RIGHT FOOT / ANKLE', -60, 60)] },
    { group: 'Style', items: [
      { key: 'facing', label: 'FACING', kind: 'select', options: [[1, '→ Right'], [-1, '← Left']] },
      { key: 'strokeColor', label: 'BODY COLOR', kind: 'color' }, { key: 'leftLimbColor', label: 'LEFT LIMB COLOR', kind: 'color' },
      R('strokeWidth', 'STROKE WIDTH', 2, 14), { key: 'shadow', label: 'GROUND SHADOW', kind: 'checkbox' }] }
  ];

  /* ---------------------------------------------------------------
     ENVIRONMENTS
     --------------------------------------------------------------- */
  function renderSky(cp, ctx) {
    const w = num(cp.width, 1920), h = num(cp.height, 1080), id = 'g_' + ctx.uid;
    let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cp.topColor || '#0b1026'}"/><stop offset="1" stop-color="${cp.bottomColor || '#2a1a3e'}"/></linearGradient></defs>`;
    s += `<rect x="0" y="0" width="${w}" height="${h}" fill="url(#${id})"/>`;
    if (cp.showSun) s += `<circle cx="${num(cp.sunX, 1500)}" cy="${num(cp.sunY, 220)}" r="${num(cp.sunRadius, 70)}" fill="${cp.sunColor || '#ffd60a'}" opacity="0.9"/>`;
    if (cp.stars) { let seed = 7; for (let i = 0; i < 90; i++) { seed = (seed * 9301 + 49297) % 233280; const x = (seed / 233280) * w; seed = (seed * 9301 + 49297) % 233280; const y = (seed / 233280) * h * 0.6; s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(i % 3) * 0.6 + 0.8}" fill="white" opacity="${0.3 + (i % 5) * 0.12}"/>`; } }
    return s;
  }
  function renderFloor(cp) {
    const w = num(cp.width, 1920), c = cp.color || '#2a2a40';
    let s = `<line x1="0" y1="0" x2="${w}" y2="0" stroke="${c}" stroke-width="${num(cp.strokeWidth, 3)}" ${cp.dashed !== false ? 'stroke-dasharray="10 10"' : ''}/>`;
    if (cp.glow) s += `<rect x="0" y="0" width="${w}" height="120" fill="${c}" opacity="0.12"/>`;
    return s;
  }
  function renderHouse(cp) {
    const w = num(cp.width, 340), h = num(cp.height, 240), rh = num(cp.roofHeight, 120);
    const wall = cp.wallColor || '#3b3f5c', roof = cp.roofColor || '#ff3b30', door = cp.doorColor || '#1a1a26', win = cp.windowColor || (cp.windowsLit ? '#ffd60a' : '#64d2ff');
    let s = `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${wall}" stroke="#0a0a0f" stroke-width="3"/>`;
    s += `<polygon points="${-w / 2 - 24},${-h} 0,${-h - rh} ${w / 2 + 24},${-h}" fill="${roof}" stroke="#0a0a0f" stroke-width="3"/>`;
    s += `<rect x="${w / 4}" y="${-h - rh * 0.75}" width="34" height="${rh * 0.55}" fill="${wall}" stroke="#0a0a0f" stroke-width="3"/>`;
    s += `<rect x="-24" y="-90" width="48" height="90" rx="4" fill="${door}" stroke="#0a0a0f" stroke-width="3"/><circle cx="12" cy="-45" r="3" fill="#ffd60a"/>`;
    const wy = -h + 50, ws = 54;
    [-w / 2 + 34, w / 2 - 34 - ws].forEach(x => {
      s += `<rect x="${x}" y="${wy}" width="${ws}" height="${ws}" fill="${win}" stroke="#0a0a0f" stroke-width="3" opacity="${cp.windowsLit ? 0.95 : 0.6}"/>`;
      s += `<line x1="${x + ws / 2}" y1="${wy}" x2="${x + ws / 2}" y2="${wy + ws}" stroke="#0a0a0f" stroke-width="3"/><line x1="${x}" y1="${wy + ws / 2}" x2="${x + ws}" y2="${wy + ws / 2}" stroke="#0a0a0f" stroke-width="3"/>`;
    });
    return s;
  }
  function renderStreet(cp) {
    const w = num(cp.width, 1920), n = Math.max(1, Math.round(num(cp.buildingCount, 9)));
    const sky = cp.skylineColor || '#161626', road = cp.roadColor || '#15151f';
    let s = '', seed = 3;
    const bw = w / n;
    for (let i = 0; i < n; i++) { seed = (seed * 9301 + 49297) % 233280; const bh = 160 + (seed / 233280) * 320; s += `<rect x="${(i * bw).toFixed(0)}" y="${(-bh).toFixed(0)}" width="${(bw - 12).toFixed(0)}" height="${bh.toFixed(0)}" fill="${sky}"/>`;
      for (let r = 0; r < Math.floor(bh / 46); r++) for (let c = 0; c < Math.floor((bw - 12) / 40); c++) { seed = (seed * 9301 + 49297) % 233280; if (seed / 233280 > 0.55) s += `<rect x="${(i * bw + 14 + c * 40).toFixed(0)}" y="${(-bh + 16 + r * 46).toFixed(0)}" width="14" height="20" fill="${cp.windowColor || '#ffd60a'}" opacity="0.55"/>`; } }
    s += `<rect x="0" y="0" width="${w}" height="${num(cp.roadHeight, 90)}" fill="${road}"/>`;
    s += `<rect x="0" y="0" width="${w}" height="10" fill="#2a2a40"/>`;
    s += `<line x1="0" y1="${num(cp.roadHeight, 90) / 2}" x2="${w}" y2="${num(cp.roadHeight, 90) / 2}" stroke="#ffd60a" stroke-width="4" stroke-dasharray="40 30" opacity="0.6"/>`;
    if (cp.lamps !== false) for (let x = 200; x < w; x += 420) s += `<line x1="${x}" y1="0" x2="${x}" y2="-220" stroke="#3a3a5a" stroke-width="6"/><circle cx="${x}" cy="-228" r="12" fill="#ffd60a" opacity="0.9"/><circle cx="${x}" cy="-228" r="40" fill="#ffd60a" opacity="0.08"/>`;
    return s;
  }
  function renderRoom(cp) {
    const w = num(cp.width, 1920), h = num(cp.height, 1080), fy = num(cp.floorY, 820);
    let s = `<rect x="0" y="0" width="${w}" height="${fy}" fill="${cp.wallColor || '#1c1c2e'}"/>`;
    s += `<rect x="0" y="${fy}" width="${w}" height="${h - fy}" fill="${cp.floorColor || '#2a2438'}"/>`;
    s += `<rect x="0" y="${fy - 12}" width="${w}" height="12" fill="#0f0f18"/>`;
    for (let x = 0; x < w; x += 160) s += `<line x1="${x}" y1="${fy}" x2="${x - 200}" y2="${h}" stroke="#0a0a0f" stroke-width="2" opacity="0.4"/>`;
    const wx = num(cp.windowX, 1300), wy = num(cp.windowY, 200), ww = 300, wh = 260;
    s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="${cp.windowLight || '#64d2ff'}" opacity="${num(cp.windowOpacity, 0.35)}" stroke="#0a0a0f" stroke-width="8"/>`;
    s += `<line x1="${wx + ww / 2}" y1="${wy}" x2="${wx + ww / 2}" y2="${wy + wh}" stroke="#0a0a0f" stroke-width="8"/><line x1="${wx}" y1="${wy + wh / 2}" x2="${wx + ww}" y2="${wy + wh / 2}" stroke="#0a0a0f" stroke-width="8"/>`;
    if (cp.picture !== false) s += `<rect x="360" y="260" width="220" height="160" fill="#0f0f18" stroke="#ffd60a" stroke-width="6"/><polygon points="380,400 450,320 500,370 540,340 560,400" fill="#30d158" opacity="0.6"/>`;
    return s;
  }
  function renderTree(cp) {
    const h = num(cp.height, 260), trunk = cp.trunkColor || '#5a3b2e', canopy = cp.canopyColor || '#30d158';
    let s = `<rect x="-14" y="${-h * 0.45}" width="28" height="${h * 0.45}" fill="${trunk}"/>`;
    s += `<circle cx="0" cy="${-h * 0.65}" r="${h * 0.32}" fill="${canopy}" opacity="0.95"/><circle cx="${-h * 0.22}" cy="${-h * 0.5}" r="${h * 0.24}" fill="${canopy}" opacity="0.85"/><circle cx="${h * 0.22}" cy="${-h * 0.52}" r="${h * 0.26}" fill="${canopy}" opacity="0.9"/>`;
    return s;
  }

  /* ---------------------------------------------------------------
     WIDGETS
     --------------------------------------------------------------- */
  function renderTradingChart(cp, ctx) {
    const W = num(cp.width, 560), H = num(cp.height, 300), pad = 44;
    const data = Array.isArray(cp.data) ? cp.data.map(Number).filter(v => !isNaN(v)) : [];
    const n = data.length;
    const reveal = clamp(num(cp.reveal, 1), 0, 1);
    const up = n < 2 || data[n - 1] >= data[0];
    const color = cp.autoColor === false && cp.lineColor ? cp.lineColor : (up ? '#30d158' : '#ff3b30');
    const id = 'tc_' + ctx.uid;
    let s = `<rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="${cp.bg || '#12121a'}" stroke="#24243a" stroke-width="2"/>`;
    s += `<text x="18" y="30" fill="#e8e8ef" font-family="JetBrains Mono, monospace" font-size="16" font-weight="600">${esc(cp.ticker || 'TICKER')}</text>`;
    if (n < 2) return s + `<text x="${W / 2}" y="${H / 2}" fill="#8a8aa0" text-anchor="middle" font-size="12" font-family="JetBrains Mono, monospace">no data</text>`;
    let min = Math.min(...data), max = Math.max(...data); if (cp.showTarget && typeof cp.targetPrice === 'number') { min = Math.min(min, cp.targetPrice); max = Math.max(max, cp.targetPrice); }
    const range = (max - min) || 1; min -= range * 0.08; max += range * 0.08;
    const px = i => pad + (i / (n - 1)) * (W - pad - 18);
    const py = v => H - 30 - ((v - min) / (max - min)) * (H - 80);
    for (let g = 0; g < 4; g++) { const y = 50 + g * ((H - 80) / 3); s += `<line x1="${pad}" y1="${y.toFixed(1)}" x2="${W - 18}" y2="${y.toFixed(1)}" stroke="#24243a" stroke-width="1" stroke-dasharray="4 6"/>`; s += `<text x="${pad - 8}" y="${(y + 4).toFixed(1)}" fill="#8a8aa0" text-anchor="end" font-size="9" font-family="JetBrains Mono, monospace">${(max - ((y - 50) / (H - 80)) * (max - min)).toFixed(0)}</text>`; }
    const k = reveal * (n - 1); const kf = Math.floor(k); const pts = [];
    for (let i = 0; i <= kf; i++) pts.push([px(i), py(data[i])]);
    if (kf < n - 1 && k > kf) { const t = k - kf; pts.push([px(kf) + (px(kf + 1) - px(kf)) * t, py(data[kf]) + (py(data[kf + 1]) - py(data[kf])) * t]); }
    if (pts.length >= 2) {
      const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      s += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity="0.35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>`;
      s += `<path d="${d} L${pts[pts.length - 1][0].toFixed(1)} ${H - 30} L${pts[0][0].toFixed(1)} ${H - 30} Z" fill="url(#${id})"/>`;
      s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
      const last = pts[pts.length - 1]; const lastVal = data[kf] + (kf < n - 1 ? (data[kf + 1] - data[kf]) * (k - kf) : 0);
      s += `<circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="5" fill="${color}"/><circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="11" fill="${color}" opacity="0.25"/>`;
      s += `<text x="${W - 18}" y="30" fill="${color}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="16" font-weight="600">${(cp.currency || '$')}${lastVal.toFixed(num(cp.decimals, 2))}</text>`;
      const chg = ((lastVal - data[0]) / (Math.abs(data[0]) || 1)) * 100;
      s += `<text x="${W - 18}" y="46" fill="${color}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10">${chg >= 0 ? '▲' : '▼'} ${Math.abs(chg).toFixed(2)}%</text>`;
    }
    if (cp.showTarget && typeof cp.targetPrice === 'number') { const ty = py(cp.targetPrice); s += `<line x1="${pad}" y1="${ty.toFixed(1)}" x2="${W - 18}" y2="${ty.toFixed(1)}" stroke="#ffd60a" stroke-width="2" stroke-dasharray="8 6"/><text x="${pad + 4}" y="${(ty - 6).toFixed(1)}" fill="#ffd60a" font-size="10" font-family="JetBrains Mono, monospace">TARGET ${cp.targetPrice}</text>`; }
    return s;
  }
  function renderBarChart(cp) {
    const W = num(cp.width, 520), H = num(cp.height, 300), pad = 30;
    const vals = Array.isArray(cp.values) ? cp.values.map(Number) : [];
    const labels = String(cp.labels || '').split(',').map(x => x.trim());
    const maxV = num(cp.maxValue, 0) > 0 ? cp.maxValue : Math.max(1, ...vals);
    let s = `<rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="${cp.bg || '#12121a'}" stroke="#24243a" stroke-width="2"/>`;
    s += `<text x="18" y="30" fill="#e8e8ef" font-family="JetBrains Mono, monospace" font-size="15" font-weight="600">${esc(cp.title || 'BAR CHART')}</text>`;
    const n = vals.length || 1, slot = (W - pad * 2) / n, bw = slot * 0.62;
    vals.forEach((v, i) => { const h = clamp(v / maxV, 0, 1) * (H - 100); const x = pad + i * slot + (slot - bw) / 2; const y = H - 40 - h;
      s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="4" fill="${cp.barColor || '#64d2ff'}"/>`;
      s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" fill="#e8e8ef" text-anchor="middle" font-size="10" font-family="JetBrains Mono, monospace">${Math.round(v)}</text>`;
      if (labels[i]) s += `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 20}" fill="#8a8aa0" text-anchor="middle" font-size="10" font-family="JetBrains Mono, monospace">${esc(labels[i])}</text>`; });
    return s;
  }
  function renderTextCard(cp) {
    const W = num(cp.width, 640), H = num(cp.height, 160), fs = num(cp.fontSize, 56), align = cp.align || 'center';
    const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';
    const tx = align === 'left' ? 28 : align === 'right' ? W - 28 : W / 2;
    let s = '';
    if (cp.bg && cp.bg !== 'none') s += `<rect x="0" y="0" width="${W}" height="${H}" rx="${num(cp.radius, 16)}" fill="${cp.bg}" stroke="${cp.borderColor || 'none'}" stroke-width="2"/>`;
    s += `<text x="${tx}" y="${H / 2 + (cp.subtitle ? -4 : fs * 0.35)}" fill="${cp.color || '#e8e8ef'}" text-anchor="${anchor}" font-family="${cp.font === 'mono' ? 'JetBrains Mono, monospace' : 'Space Grotesk, system-ui, sans-serif'}" font-size="${fs}" font-weight="700" letter-spacing="${num(cp.letterSpacing, -1)}">${esc(cp.text || 'TITLE')}</text>`;
    if (cp.subtitle) s += `<text x="${tx}" y="${H / 2 + fs * 0.55}" fill="${cp.subtitleColor || '#8a8aa0'}" text-anchor="${anchor}" font-family="JetBrains Mono, monospace" font-size="${fs * 0.32}" letter-spacing="2">${esc(cp.subtitle)}</text>`;
    return s;
  }
  function renderCounter(cp) {
    const fs = num(cp.fontSize, 72), v = num(cp.value, 0);
    const txt = (cp.prefix || '') + v.toFixed(num(cp.decimals, 0)).replace(/\B(?=(\d{3})+(?!\d))/g, cp.thousands === false ? '' : ',') + (cp.suffix || '');
    let s = '';
    if (cp.label) s += `<text x="0" y="${-fs * 0.85}" fill="#8a8aa0" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${fs * 0.22}" letter-spacing="3">${esc(cp.label)}</text>`;
    s += `<text x="0" y="0" fill="${cp.color || '#30d158'}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${fs}" font-weight="600">${esc(txt)}</text>`;
    return s;
  }

  /* ---------------------------------------------------------------
     THREE.JS PRIMITIVES (rendered on the WebGL overlay; SVG placeholder if three fails to load)
     --------------------------------------------------------------- */
  function renderThreePlaceholder(cp) {
    const sz = num(cp.size, 200) / 2;
    return `<g class="three-placeholder"><rect x="${-sz}" y="${-sz}" width="${sz * 2}" height="${sz * 2}" fill="none" stroke="${cp.color || '#bf5af2'}" stroke-width="3" stroke-dasharray="12 8"/><text x="0" y="6" fill="${cp.color || '#bf5af2'}" text-anchor="middle" font-size="16">3D ${esc(cp.shape || 'box')}</text></g>`;
  }
  const THREE_CONTROLS = [
    { group: 'Geometry', items: [{ key: 'shape', label: 'SHAPE', kind: 'select', options: [['box', 'Box'], ['sphere', 'Sphere'], ['torusKnot', 'Torus Knot'], ['cylinder', 'Cylinder'], ['icosahedron', 'Icosahedron']] }, R('size', 'SIZE (px)', 20, 800), R('depth', 'Z DEPTH', -800, 800)] },
    { group: 'Rotation (deg)', items: [R('rotX', 'ROT X', -360, 360), R('rotY', 'ROT Y', -360, 360), R('rotZ', 'ROT Z', -360, 360)] },
    { group: 'Material', items: [{ key: 'color', label: 'COLOR', kind: 'color' }, { key: 'emissive', label: 'EMISSIVE', kind: 'color' }, R('metalness', 'METALNESS', 0, 1, { step: 0.01 }), R('roughness', 'ROUGHNESS', 0, 1, { step: 0.01 }), { key: 'wireframe', label: 'WIREFRAME', kind: 'checkbox' }] }
  ];

  /* ---------------------------------------------------------------
     THE CATALOG
     --------------------------------------------------------------- */
  const base = (x, y) => ({ baseX: x, baseY: y, scale: 1, rotation: 0, opacity: 1 });
  const STICK_STYLE = { strokeColor: '#ffffff', leftLimbColor: '#ff3b30', strokeWidth: 6, facing: 1, shadow: true };
  const CATALOG = [
    /* CHARACTERS */
    { id: 'stickman_fighter', tab: 'characters', type: 'character', componentName: 'AdvancedStickman', name: 'Stickman Fighter', desc: 'FK martial-arts rig • red/white', icon: '🥋', easing: 'spring',
      defaults: Object.assign(base(640, 820), { customProperties: Object.assign({}, GUARD, STICK_STYLE) }), controls: STICKMAN_CONTROLS, render: renderStickman },
    { id: 'stickman_rival', tab: 'characters', type: 'character', componentName: 'AdvancedStickman', name: 'Stickman Rival', desc: 'Mirrored opponent • cyan/white', icon: '🤺', easing: 'spring',
      defaults: Object.assign(base(1280, 820), { customProperties: Object.assign({}, GUARD, STICK_STYLE, { leftLimbColor: '#64d2ff', facing: -1 }) }), controls: STICKMAN_CONTROLS, render: renderStickman },
    { id: 'stickman_ninja', tab: 'characters', type: 'character', componentName: 'AdvancedStickman', name: 'Stickman Ninja', desc: 'Dark silhouette • green accents', icon: '🥷', easing: 'spring',
      defaults: Object.assign(base(960, 820), { customProperties: Object.assign({}, GUARD, STICK_STYLE, { strokeColor: '#bfc3d9', leftLimbColor: '#30d158', strokeWidth: 7 }) }), controls: STICKMAN_CONTROLS, render: renderStickman },
    { id: 'stickman_giant', tab: 'characters', type: 'character', componentName: 'AdvancedStickman', name: 'Stickman Giant', desc: 'Scaled hero rig ×1.6 • amber', icon: '🦾', easing: 'spring',
      defaults: Object.assign(base(960, 820), { scale: 1.6, customProperties: Object.assign({}, GUARD, STICK_STYLE, { leftLimbColor: '#ffd60a', strokeWidth: 7 }) }), controls: STICKMAN_CONTROLS, render: renderStickman },

    /* ENVIRONMENTS */
    { id: 'sky_gradient', tab: 'environments', type: 'environment', componentName: 'SkyGradient', fullFrame: true, name: 'Sky Gradient', desc: 'Full-frame backdrop • sun • stars', icon: '🌌',
      defaults: Object.assign(base(0, 0), { customProperties: { width: 1920, height: 1080, topColor: '#0b1026', bottomColor: '#2a1a3e', showSun: false, sunX: 1500, sunY: 220, sunRadius: 70, sunColor: '#ffd60a', stars: true } }),
      controls: [{ group: 'Colors', items: [{ key: 'topColor', label: 'TOP', kind: 'color' }, { key: 'bottomColor', label: 'BOTTOM', kind: 'color' }, { key: 'stars', label: 'STARS', kind: 'checkbox' }] },
        { group: 'Sun / Moon', items: [{ key: 'showSun', label: 'SHOW', kind: 'checkbox' }, R('sunX', 'SUN X', 0, 1920), R('sunY', 'SUN Y', 0, 1080), R('sunRadius', 'RADIUS', 10, 300), { key: 'sunColor', label: 'COLOR', kind: 'color' }] }], render: renderSky },
    { id: 'floor_line', tab: 'environments', type: 'environment', componentName: 'FloorLine', fullWidth: true, name: 'Floor Line', desc: 'Dashed ground plane (studio floor)', icon: '➖',
      defaults: Object.assign(base(0, 820), { customProperties: { width: 1920, color: '#2a2a40', strokeWidth: 3, dashed: true, glow: true } }),
      controls: [{ group: 'Floor', items: [R('width', 'WIDTH', 100, 4000), { key: 'color', label: 'COLOR', kind: 'color' }, R('strokeWidth', 'THICKNESS', 1, 12), { key: 'dashed', label: 'DASHED', kind: 'checkbox' }, { key: 'glow', label: 'GLOW', kind: 'checkbox' }] }], render: renderFloor },
    { id: 'house', tab: 'environments', type: 'environment', componentName: 'House', name: 'Modular House', desc: 'Walls, roof, door, windows', icon: '🏠',
      defaults: Object.assign(base(1500, 820), { customProperties: { width: 340, height: 240, roofHeight: 120, wallColor: '#3b3f5c', roofColor: '#ff3b30', doorColor: '#1a1a26', windowColor: '#64d2ff', windowsLit: false } }),
      controls: [{ group: 'Shape', items: [R('width', 'WIDTH', 120, 900), R('height', 'HEIGHT', 100, 700), R('roofHeight', 'ROOF HEIGHT', 20, 400)] },
        { group: 'Colors', items: [{ key: 'wallColor', label: 'WALLS', kind: 'color' }, { key: 'roofColor', label: 'ROOF', kind: 'color' }, { key: 'doorColor', label: 'DOOR', kind: 'color' }, { key: 'windowColor', label: 'WINDOWS', kind: 'color' }, { key: 'windowsLit', label: 'WINDOWS LIT', kind: 'checkbox' }] }], render: renderHouse },
    { id: 'street_block', tab: 'environments', type: 'environment', componentName: 'StreetBlock', fullWidth: true, name: 'Street Block', desc: 'Skyline silhouette, road, lamps', icon: '🏙️',
      defaults: Object.assign(base(0, 820), { customProperties: { width: 1920, buildingCount: 9, skylineColor: '#161626', roadColor: '#15151f', roadHeight: 90, windowColor: '#ffd60a', lamps: true } }),
      controls: [{ group: 'Layout', items: [R('width', 'WIDTH', 400, 6000), R('buildingCount', 'BUILDINGS', 1, 30), R('roadHeight', 'ROAD HEIGHT', 20, 400), { key: 'lamps', label: 'LAMP POSTS', kind: 'checkbox' }] },
        { group: 'Colors', items: [{ key: 'skylineColor', label: 'SKYLINE', kind: 'color' }, { key: 'roadColor', label: 'ROAD', kind: 'color' }, { key: 'windowColor', label: 'WINDOWS', kind: 'color' }] }], render: renderStreet },
    { id: 'indoor_room', tab: 'environments', type: 'environment', componentName: 'IndoorRoom', fullFrame: true, name: 'Indoor Room', desc: 'Wall, floor, window, picture', icon: '🛋️',
      defaults: Object.assign(base(0, 0), { customProperties: { width: 1920, height: 1080, floorY: 820, wallColor: '#1c1c2e', floorColor: '#2a2438', windowX: 1300, windowY: 200, windowLight: '#64d2ff', windowOpacity: 0.35, picture: true } }),
      controls: [{ group: 'Room', items: [R('floorY', 'FLOOR Y', 300, 1000), { key: 'wallColor', label: 'WALL', kind: 'color' }, { key: 'floorColor', label: 'FLOOR', kind: 'color' }, { key: 'picture', label: 'PICTURE FRAME', kind: 'checkbox' }] },
        { group: 'Window', items: [R('windowX', 'X', 0, 1600), R('windowY', 'Y', 0, 700), { key: 'windowLight', label: 'LIGHT', kind: 'color' }, R('windowOpacity', 'OPACITY', 0, 1, { step: 0.01 })] }], render: renderRoom },
    { id: 'tree', tab: 'environments', type: 'environment', componentName: 'Tree', name: 'Tree', desc: 'Trunk + canopy blobs', icon: '🌳',
      defaults: Object.assign(base(300, 820), { customProperties: { height: 260, trunkColor: '#5a3b2e', canopyColor: '#30d158' } }),
      controls: [{ group: 'Tree', items: [R('height', 'HEIGHT', 80, 800), { key: 'trunkColor', label: 'TRUNK', kind: 'color' }, { key: 'canopyColor', label: 'CANOPY', kind: 'color' }] }], render: renderTree },

    /* WIDGETS */
    { id: 'trading_chart', tab: 'widgets', type: 'widget', componentName: 'TradingChart', name: 'Trading Chart', desc: 'Line + area, target line, reveal', icon: '📈',
      defaults: Object.assign(base(120, 120), { customProperties: { ticker: 'BTC / USD', data: [100, 104, 101, 108, 112, 109, 118, 124, 121, 130], width: 560, height: 300, reveal: 1, showTarget: true, targetPrice: 125, autoColor: true, lineColor: '#30d158', currency: '$', decimals: 2, bg: '#12121a' } }),
      controls: [{ group: 'Data', items: [{ key: 'ticker', label: 'TICKER', kind: 'text' }, { key: 'data', label: 'DATA SERIES (comma)', kind: 'numlist' }, { key: 'targetPrice', label: 'TARGET PRICE', kind: 'number' }, { key: 'showTarget', label: 'SHOW TARGET LINE', kind: 'checkbox' }, R('reveal', 'REVEAL (draw-in)', 0, 1, { step: 0.01 })] },
        { group: 'Layout', items: [R('width', 'WIDTH', 200, 1800), R('height', 'HEIGHT', 120, 1000), { key: 'currency', label: 'CURRENCY', kind: 'text' }, R('decimals', 'DECIMALS', 0, 4), { key: 'autoColor', label: 'AUTO UP/DOWN COLOR', kind: 'checkbox' }, { key: 'lineColor', label: 'LINE COLOR', kind: 'color' }, { key: 'bg', label: 'CARD BG', kind: 'color' }] }], render: renderTradingChart },
    { id: 'bar_chart', tab: 'widgets', type: 'widget', componentName: 'BarChart', name: 'Bar Chart', desc: 'Animated bars with labels', icon: '📊',
      defaults: Object.assign(base(120, 480), { customProperties: { title: 'REVENUE', values: [40, 65, 52, 80, 96], labels: 'Q1,Q2,Q3,Q4,Q5', maxValue: 0, barColor: '#64d2ff', width: 520, height: 300, bg: '#12121a' } }),
      controls: [{ group: 'Data', items: [{ key: 'title', label: 'TITLE', kind: 'text' }, { key: 'values', label: 'VALUES (comma)', kind: 'numlist' }, { key: 'labels', label: 'LABELS (comma)', kind: 'text' }, { key: 'maxValue', label: 'MAX (0 = auto)', kind: 'number' }] },
        { group: 'Layout', items: [R('width', 'WIDTH', 200, 1800), R('height', 'HEIGHT', 120, 1000), { key: 'barColor', label: 'BAR COLOR', kind: 'color' }, { key: 'bg', label: 'CARD BG', kind: 'color' }] }], render: renderBarChart },
    { id: 'text_card', tab: 'widgets', type: 'text', componentName: 'TextCard', name: 'Text Card', desc: 'Title + subtitle overlay', icon: '🔤',
      defaults: Object.assign(base(640, 60), { customProperties: { text: 'ROUND 1', subtitle: 'FIGHT', fontSize: 64, color: '#e8e8ef', subtitleColor: '#ff3b30', bg: 'none', borderColor: 'none', radius: 16, width: 640, height: 170, align: 'center', font: 'sans', letterSpacing: -1 } }),
      controls: [{ group: 'Content', items: [{ key: 'text', label: 'TEXT', kind: 'text' }, { key: 'subtitle', label: 'SUBTITLE', kind: 'text' }, R('fontSize', 'FONT SIZE', 12, 240), { key: 'align', label: 'ALIGN', kind: 'select', options: [['left', 'Left'], ['center', 'Center'], ['right', 'Right']] }, { key: 'font', label: 'FONT', kind: 'select', options: [['sans', 'Space Grotesk'], ['mono', 'JetBrains Mono']] }] },
        { group: 'Style', items: [{ key: 'color', label: 'TEXT COLOR', kind: 'color' }, { key: 'subtitleColor', label: 'SUBTITLE COLOR', kind: 'color' }, { key: 'bg', label: 'CARD BG (none = transparent)', kind: 'text' }, R('width', 'WIDTH', 100, 1920), R('height', 'HEIGHT', 40, 1080)] }], render: renderTextCard },
    { id: 'counter', tab: 'widgets', type: 'widget', componentName: 'Counter', name: 'Counter', desc: 'Animated number ticker', icon: '🔢',
      defaults: Object.assign(base(1500, 560), { customProperties: { value: 48250, prefix: '$', suffix: '', decimals: 0, fontSize: 72, color: '#30d158', label: 'PORTFOLIO', thousands: true } }),
      controls: [{ group: 'Value', items: [{ key: 'value', label: 'VALUE', kind: 'number' }, { key: 'prefix', label: 'PREFIX', kind: 'text' }, { key: 'suffix', label: 'SUFFIX', kind: 'text' }, R('decimals', 'DECIMALS', 0, 4), { key: 'thousands', label: 'THOUSANDS SEPARATOR', kind: 'checkbox' }] },
        { group: 'Style', items: [{ key: 'label', label: 'LABEL', kind: 'text' }, R('fontSize', 'FONT SIZE', 16, 300), { key: 'color', label: 'COLOR', kind: 'color' }] }], render: renderCounter },

    /* THREE.JS */
    { id: 'three_box', tab: 'three', type: 'three', componentName: 'ThreePrimitive', name: '3D Box', desc: 'three.js mesh • @remotion/three', icon: '🧊',
      defaults: Object.assign(base(1600, 260), { customProperties: { shape: 'box', size: 180, depth: 0, rotX: 25, rotY: 35, rotZ: 0, color: '#bf5af2', emissive: '#000000', metalness: 0.4, roughness: 0.35, wireframe: false } }), controls: THREE_CONTROLS, render: renderThreePlaceholder },
    { id: 'three_sphere', tab: 'three', type: 'three', componentName: 'ThreePrimitive', name: '3D Sphere', desc: 'Smooth PBR sphere', icon: '🔮',
      defaults: Object.assign(base(1600, 260), { customProperties: { shape: 'sphere', size: 180, depth: 0, rotX: 0, rotY: 0, rotZ: 0, color: '#64d2ff', emissive: '#000000', metalness: 0.6, roughness: 0.2, wireframe: false } }), controls: THREE_CONTROLS, render: renderThreePlaceholder },
    { id: 'three_knot', tab: 'three', type: 'three', componentName: 'ThreePrimitive', name: '3D Torus Knot', desc: 'Hero spinning object', icon: '🪢',
      defaults: Object.assign(base(1600, 260), { customProperties: { shape: 'torusKnot', size: 200, depth: 0, rotX: 0, rotY: 0, rotZ: 0, color: '#ff3b30', emissive: '#220000', metalness: 0.5, roughness: 0.3, wireframe: false } }), controls: THREE_CONTROLS, render: renderThreePlaceholder },
    { id: 'three_wire', tab: 'three', type: 'three', componentName: 'ThreePrimitive', name: '3D Wire Icosahedron', desc: 'Sci-fi wireframe accent', icon: '💠',
      defaults: Object.assign(base(320, 260), { customProperties: { shape: 'icosahedron', size: 220, depth: 0, rotX: 0, rotY: 0, rotZ: 0, color: '#30d158', emissive: '#003311', metalness: 0.1, roughness: 0.9, wireframe: true } }), controls: THREE_CONTROLS, render: renderThreePlaceholder },
  ];

  /* ---------------------------------------------------------------
     ASPECT RATIO PRESETS (composition size)
     --------------------------------------------------------------- */
  const ASPECT_PRESETS = [
    { id: '16:9', label: '16:9 Landscape • YouTube / TV', width: 1920, height: 1080 },
    { id: '9:16', label: '9:16 Vertical • Shorts / Reels / TikTok', width: 1080, height: 1920 },
    { id: '1:1', label: '1:1 Square • Instagram feed', width: 1080, height: 1080 },
    { id: '4:5', label: '4:5 Portrait • Instagram / Facebook', width: 1080, height: 1350 },
    { id: '4:3', label: '4:3 Classic TV', width: 1440, height: 1080 },
    { id: '3:4', label: '3:4 Portrait tablet', width: 1080, height: 1440 },
    { id: '21:9', label: '21:9 Ultrawide / Cinematic', width: 2560, height: 1080 },
    { id: '2:3', label: '2:3 Pinterest', width: 1000, height: 1500 },
    { id: '4K', label: '16:9 4K UHD', width: 3840, height: 2160 },
    { id: '9:16-4K', label: '9:16 4K Vertical', width: 2160, height: 3840 },
  ];

  /* ---------------------------------------------------------------
     EXTERNAL / COMMUNITY REMOTION COMPONENTS
     A wrapper = catalog entry + `external` descriptor telling the exporter how to import the
     real component, + `preview` telling the browser how to approximate it in SVG.
       external.importPath : npm package ('@remotion/shapes') or path relative to remotion/ ('./community/Foo')
       external.exportName : named export ('Star') or 'default'
       external.package    : npm package to install in the render project (omit for local files)
       external.sizeMode   : 'style' → pass style={{width,height}} | 'props' → width/height props | 'none'
       external.omitProps  : customProperties keys NOT forwarded to the component
     Assets created from these render in the HTML layer of SceneRenderer (they are React DOM, not SVG).
     --------------------------------------------------------------- */
  function starPoints(cx, cy, outer, inner, n) { const pts = []; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? inner : outer; const a = -Math.PI / 2 + i * Math.PI / n; pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1)); } return pts.join(' '); }
  function renderExternal(cp, ctx) {
    const entry = ctx.entry || {}; const pv = entry.preview || { kind: 'card' };
    const W = num(cp.width, 480), H = num(cp.height, 270);
    const card = (inner, label) => `<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#12121a" stroke="#64d2ff" stroke-width="2" stroke-dasharray="10 6" opacity="0.9"/>${inner}<text x="12" y="${H - 12}" fill="#64d2ff" font-family="JetBrains Mono, monospace" font-size="${Math.max(10, Math.min(14, W / 34))}">${esc(label)}</text>`;
    switch (pv.kind) {
      case 'image': return `<image href="${esc(cp.src || '')}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="${cp.fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'}"/><rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#64d2ff" stroke-width="1" opacity="0.4"/>`;
      case 'video': return card(`<polygon points="${W / 2 - 22},${H / 2 - 28} ${W / 2 + 30},${H / 2} ${W / 2 - 22},${H / 2 + 28}" fill="#64d2ff" opacity="0.8"/><text x="${W / 2}" y="${H / 2 + 56}" fill="#8a8aa0" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12">${esc((cp.src || '').split('/').pop() || 'video source')}</text>`, `<${entry.componentName}> ${entry.external ? entry.external.importPath : ''}`);
      case 'audio': { let bars = ''; for (let i = 0; i < 28; i++) { const h = 12 + Math.abs(Math.sin(i * 1.3)) * (H * 0.5); bars += `<rect x="${(16 + i * (W - 32) / 28).toFixed(1)}" y="${(H / 2 - h / 2).toFixed(1)}" width="${((W - 32) / 28 * 0.55).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="#30d158" opacity="0.7"/>`; } return card(bars, `♪ <Audio> ${(cp.src || '').split('/').pop()} • vol ${num(cp.volume, 1)}`); }
      case 'paper': { const g = num(cp.gridSize, 0), lc = cp.lineColor || 'rgba(76, 101, 128, 0.16)', lw = num(cp.lineWidth, 3.4); let lines = '';
        if (g >= 4) for (let x = 0; x <= W; x += g) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${lc}" stroke-width="${lw}"/>`;
        if (g >= 4) for (let y = 0; y <= H; y += g) lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${lc}" stroke-width="${lw}"/>`;
        return `<rect x="0" y="0" width="${W}" height="${H}" fill="${cp.color || '#ffffff'}"/><rect x="0" y="0" width="${W}" height="${H}" fill="#f3efe6" opacity="0.35"/>${lines}`; }
      case 'hbars': { // Horizontal Bar Chart element: 3 bars reveal (cropRight 1→0, frames 14–47 of each bar, bars start at 8 + i*6)
        const f = num(ctx.frame, 0), data = [['Jonny', 18, true], ['Igor', 17, false], ['Mehmet', 10, false]], pad = 56, gap = 32, bh = Math.round(500 / 3);
        const cl = (v) => Math.max(0, Math.min(1, v)), ease = t => 1 - Math.pow(1 - t, 2.2); let out = `<rect width="${W}" height="${H}" fill="#f5f6f7"/>`;
        const top = H / 2 - (3 * bh + 2 * gap) / 2;
        data.forEach(([label, v, hi], i) => { const lf = f - (8 + i * 6); const reveal = ease(cl((lf - 14) / 33)); const full = (W - pad * 2) * v / 18, w = full * reveal, y = top + i * (bh + gap);
          if (w > 0) out += `<rect x="${pad}" y="${y}" width="${w.toFixed(1)}" height="${bh}" rx="12" fill="${hi ? '#2563eb' : '#d1d5db'}"/>`;
          const la = cl((lf - 26) / 6), va = cl((lf - 32) / 6), col = hi ? '#ffffff' : '#111827';
          out += `<svg x="${pad}" y="${y}" width="${Math.max(0, w).toFixed(1)}" height="${bh}" overflow="hidden"><text x="34" y="${bh / 2 + 14}" fill="${col}" opacity="${la}" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="40">${label}</text><text x="${(full - 34).toFixed(1)}" y="${bh / 2 + 17}" fill="${col}" opacity="${va}" text-anchor="end" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="48">${v}</text></svg>`; });
        return `<svg x="0" y="0" width="${W}" height="${H}" overflow="hidden">${out}</svg>`; }
      case 'linechart': { // Line Chart element: line draws frames 14–58, dots pop in, "74K" badge after 58
        const f = num(ctx.frame, 0), data = [['Mar', 24], ['Apr', 32], ['May', 29], ['Jun', 45], ['Jul', 51], ['Aug', 63], ['Sep', 74]], P = 160, cw = W - P * 2, ch = Math.min(640, H - P * 2 - 112), side = 16;
        const x0 = P, y0 = H / 2 - (ch + 112) / 2, pts = data.map(([l, v], i) => [x0 + side + i / (data.length - 1) * (cw - side * 2), y0 + (80 - v) / 60 * ch]);
        const cl = v => Math.max(0, Math.min(1, v)), draw = 1 - Math.pow(1 - cl((f - 14) / 44), 2); let out = `<rect width="${W}" height="${H}" fill="#f5f6f7"/>`;
        [80, 60, 40, 20].forEach(v => { const y = y0 + (80 - v) / 60 * ch; out += `<line x1="${x0 + side}" x2="${x0 + cw - side}" y1="${y}" y2="${y}" stroke="#d1d5db" stroke-width="2"/>`; });
        let len = 0; const segs = pts.slice(1).map((p, i) => { const d = Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]); len += d; return d; }); let left = len * draw, d = `M${pts[0][0]} ${pts[0][1]}`;
        for (let i = 0; i < segs.length && left > 0; i++) { const t = Math.min(1, left / segs[i]); d += ` L${(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t).toFixed(1)} ${(pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t).toFixed(1)}`; left -= segs[i]; }
        if (draw > 0) out += `<path d="${d}" fill="none" stroke="#2563eb" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
        pts.forEach(([x, y], i) => { const a = i === 0 ? 7 : 14 + i * 7, r = 11 * cl((f - a) / 8); if (r > 0) out += `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="#fff" stroke="#2563eb" stroke-width="8"/>`; });
        data.forEach(([l], i) => { if (i % 2 === 0) out += `<text x="${pts[i][0]}" y="${y0 + ch + 104}" fill="#4b5563" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="40">${l}</text>`; });
        if (f > 58) { const k = cl((f - 58) / 12), [lx, ly] = pts[pts.length - 1]; out += `<g transform="translate(${lx} ${ly - 30}) scale(${k.toFixed(3)})"><rect x="-68" y="-80" width="136" height="80" rx="12" fill="#2563eb"/><text x="0" y="-24" fill="#fff" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="44">74K</text></g>`; }
        return `<svg x="0" y="0" width="${W}" height="${H}" overflow="hidden">${out}</svg>`; }
      case 'callout': { // Wiggling Callout element: blue speech bubble at (80,195) 600×370, rotates 0→10→-7→3→0° over frames 0–26 around its bottom centre
        const f = Math.max(0, Math.min(26, num(ctx.frame, 0))), keys = [[0, 0], [7, 10], [14, -7], [20, 3], [26, 0]], eq = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; let rot = 0;
        for (let i = 0; i < keys.length - 1; i++) if (f >= keys[i][0] && f <= keys[i + 1][0]) { const t = (f - keys[i][0]) / (keys[i + 1][0] - keys[i][0]); rot = keys[i][1] + (keys[i + 1][1] - keys[i][1]) * eq(t); break; }
        const sx = W / 760, sy = H / 640; // component is laid out in absolute px inside its box; scale the preview with the box
        return `<g transform="scale(${sx.toFixed(4)} ${sy.toFixed(4)})"><g transform="rotate(${rot.toFixed(2)} ${80 + 300} ${195 + 370})"><path d="M${80 + 45} 195 H${80 + 555} Q${80 + 600} 195 ${80 + 600} 240 V${195 + 255} Q${80 + 600} ${195 + 300} ${80 + 555} ${195 + 300} H${80 + 365} L${80 + 300} ${195 + 370} L${80 + 235} ${195 + 300} H${80 + 45} Q80 ${195 + 300} 80 ${195 + 255} V240 Q80 195 ${80 + 45} 195 Z" fill="#2563eb"/><text x="${80 + 300}" y="${195 + 150 + 63}" fill="#fff" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="180" letter-spacing="-7">-20%</text></g></g>`; }
      case 'canvasfx': { // Shine / Tear elements: HtmlInCanvas image scaled 0.75 with a shine sweep (0–44) or a tear (15–25)
        const f = num(ctx.frame, 0), style = pv.style || 'shine', src = cp.src || 'https://remotion.media/elements/commerce-tear-a-graphic.png', iw = W * 0.75, ih = H * 0.75, ix = (W - iw) / 2, iy = (H - ih) / 2, id = 'cfx_' + (ctx.uid || 'x');
        let out = `<defs><clipPath id="${id}c"><rect x="${ix}" y="${iy}" width="${iw}" height="${ih}"/></clipPath></defs>`;
        if (style === 'tear') { const p = Math.max(0, Math.min(1, (f - 15) / 10)), e = 1 - Math.pow(1 - p, 3), gapX = e * iw * 0.018, rotd = e * 5, mid = ix + iw / 2; let jag = ''; for (let y = 0, i = 0; y <= ih; y += ih / 9, i++) jag += `${(mid + (i % 2 ? 1 : -1) * iw * 0.035).toFixed(1)},${(iy + y).toFixed(1)} `; // narrow gap, deep zigzag like the real tear
          const pts = jag.trim().split(' '), leftPoly = `${ix},${iy} ${pts.join(' ')} ${ix},${iy + ih}`, rightPoly = `${ix + iw},${iy} ${pts.join(' ')} ${ix + iw},${iy + ih}`;
          out += `<clipPath id="${id}l"><polygon points="${leftPoly}"/></clipPath><clipPath id="${id}r"><polygon points="${rightPoly}"/></clipPath>`;
          out += `<g transform="translate(${-gapX} 0) rotate(${-rotd} ${mid} ${iy + ih})"><image href="${esc(src)}" x="${ix}" y="${iy}" width="${iw}" height="${ih}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}l)"/></g>`;
          out += `<g transform="translate(${gapX} 0) rotate(${rotd} ${mid} ${iy + ih})"><image href="${esc(src)}" x="${ix}" y="${iy}" width="${iw}" height="${ih}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}r)"/></g>`;
          return out; }
        const p = Math.max(0, Math.min(1, f / 44)), bx = ix - iw * 0.4 + p * iw * 1.8;
        out += `<linearGradient id="${id}g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
        out += `<image href="${esc(src)}" x="${ix}" y="${iy}" width="${iw}" height="${ih}" preserveAspectRatio="xMidYMid slice"/>`;
        if (p > 0 && p < 1) out += `<g clip-path="url(#${id}c)"><rect x="${bx.toFixed(1)}" y="${iy - ih}" width="${(iw * 0.25).toFixed(1)}" height="${ih * 3}" fill="url(#${id}g)" transform="rotate(30 ${bx.toFixed(1)} ${iy + ih / 2})"/></g>`;
        return out; }
      case 'pie': { // Pie Chart element: slices sweep 0→360° over frames 8–60, legend rows wipe in from frame 8
        const f = num(ctx.frame, 0), cl = v => Math.max(0, Math.min(1, v)), eio = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const data = [['#2563eb', '#fff', 'Focused work', 42], ['#6b7280', '#fff', 'Meetings', 26], ['#9ca3af', '#111827', 'Planning', 18], ['#d1d5db', '#111827', 'Admin', 14]];
        const pad = 56, size = Math.min(680, H - pad * 2), gap = 72, rowW = W - pad * 2, x0 = pad, cy = H / 2, cx = x0 + size / 2, R = size * 284 / 600, reveal = 360 * eio(cl((f - 8) / 52));
        let out = `<rect width="${W}" height="${H}" fill="#f5f6f7"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#e5e7eb" opacity="${eio(cl(f / 8)).toFixed(2)}"/>`, a = 0;
        const pt = deg => [cx + R * Math.cos((deg - 90) * Math.PI / 180), cy + R * Math.sin((deg - 90) * Math.PI / 180)];
        data.forEach(([c, , , v]) => { const s0 = a, e0 = Math.min(a + v / 100 * 360, reveal); a += v / 100 * 360; if (e0 <= s0) return; const [sx, sy] = pt(s0), [ex, ey] = pt(e0); out += `<path d="M${cx} ${cy} L${sx.toFixed(1)} ${sy.toFixed(1)} A${R} ${R} 0 ${e0 - s0 > 180 ? 1 : 0} 1 ${ex.toFixed(1)} ${ey.toFixed(1)} Z" fill="${c}"/>`; });
        const lx = x0 + size + gap, lw = Math.max(40, rowW - size - gap), lf = f - 8, rows = data.length, rh = 104, rg = 18, ly0 = cy - (rows * rh + (rows - 1) * rg) / 2;
        data.forEach(([c, fg, label, v], i) => { const crop = 1 - eio(cl(lf / 44)), vis = lw * (1 - crop), y = ly0 + i * (rh + rg); if (vis <= 0) return;
          out += `<svg x="${(lx + lw - vis).toFixed(1)}" y="${y}" width="${vis.toFixed(1)}" height="${rh}" overflow="hidden"><g transform="translate(${-(lw - vis).toFixed(1)} 0)"><rect width="${lw}" height="${rh}" rx="12" fill="${c}"/><text x="32" y="${rh / 2 + 13}" fill="${fg}" opacity="${eio(cl((lf - 32) / 12)).toFixed(2)}" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="38">${label}</text><text x="${lw - 32}" y="${rh / 2 + 16}" fill="${fg}" opacity="${eio(cl((lf - 6) / 12)).toFixed(2)}" text-anchor="end" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="46">${v}%</text></g></svg>`; });
        return `<svg x="0" y="0" width="${W}" height="${H}" overflow="hidden">${out}</svg>`; }
      case 'vbars': { // Vertical Bar Chart element: bars grow one after another (start 22 + i*24), values rise above them
        const f = num(ctx.frame, 0), cl = v => Math.max(0, Math.min(1, v)), eo = t => 1 - Math.pow(1 - t, 3);
        const data = [['Jonny', 34, false], ['Igor', 89, false], ['Mehmet', 163, true]], pad = 56, chartW = 1080, left = W / 2 - chartW / 2, bw = 280;
        const labelH = 68, top = pad, bottom = H - pad - labelH, avail = bottom - top; let out = `<rect width="${W}" height="${H}" fill="#f5f6f7"/><rect x="${left}" y="${bottom - 1.5}" width="${chartW}" height="3" fill="#c5cad2"/>`;
        data.forEach(([label, v, hi], i) => { const s0 = 22 + i * 24, e0 = s0 + 16 + Math.round(v / 163 * 8), g = f >= e0 ? 1 : eo(cl((f - s0) / (e0 - s0))), full = avail * v / 163 * 0.9, h = full * g, x = left + i * ((chartW - bw) / 2);
          if (h > 0) out += `<path d="M${x} ${bottom} V${(bottom - h + 12).toFixed(1)} Q${x} ${(bottom - h).toFixed(1)} ${x + 12} ${(bottom - h).toFixed(1)} H${x + bw - 12} Q${x + bw} ${(bottom - h).toFixed(1)} ${x + bw} ${(bottom - h + 12).toFixed(1)} V${bottom} Z" fill="${hi ? '#2563eb' : '#b9c0ca'}"/>`;
          if (f > e0 - 8) out += `<text x="${x + bw / 2}" y="${(bottom - h - 12).toFixed(1)}" fill="#111827" opacity="${cl((f - (e0 - 8)) / 10).toFixed(2)}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="48">${v}</text>`;
          out += `<text x="${x + bw / 2}" y="${bottom + 56}" fill="#111827" opacity="${g.toFixed(2)}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="40">${label}</text>`; });
        return `<svg x="0" y="0" width="${W}" height="${H}" overflow="hidden">${out}</svg>`; }
      case 'numcounter': { // Number Counter element: 0 → 24,813 over 90 frames, ease-out-expo
        const t = Math.max(0, Math.min(1, num(ctx.frame, 0) / 90)), e = 1 - Math.pow(2, -10 * t) /* same as Easing.out(Easing.exp): tops out at 0.99902, so the real counter ends at 24,789 */, v = Math.round(e * 24813).toLocaleString('en-US');
        return `<text x="${W / 2}" y="${H / 2 + 52}" fill="#171717" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="150" letter-spacing="-4.5">${v}</text>`; }
      case 'captions': { // style: basic | rounded | pill — shows the caption page active at the playhead
        const style = pv.style || 'basic', caps = Array.isArray(cp.captions) ? cp.captions : [], tMs = num(ctx.frame, 0) / Math.max(1, num(ctx.fps, 30)) * 1000;
        const wordStyle = style === 'pill' || style === 'highlight' || style === 'pop'; const combine = num(cp.combineTokensWithinMilliseconds, wordStyle ? 800 : 2000), pages = [];
        caps.forEach(c => { const last = pages[pages.length - 1]; if (!last || String(c.text).startsWith(' ') && last.startMs + combine < c.startMs) pages.push({ startMs: c.startMs, tokens: [c] }); else last.tokens.push(c); });
        pages.forEach((p, i) => { p.endMs = i + 1 < pages.length ? pages[i + 1].startMs : p.tokens[p.tokens.length - 1].endMs; });
        const page = pages.find(p => tMs >= p.startMs && tMs < p.endMs);
        const frame = `<rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#ffd60a" stroke-opacity="0.35" stroke-dasharray="8 6"/>`;
        if (!page) return frame + `<text x="${W / 2}" y="${H / 2}" fill="#8a8aa0" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="16">${caps.length ? 'no caption at this frame' : 'no captions set'}</text>`;
        const text = page.tokens.map(t => t.text).join('').trim(), fs = wordStyle ? Math.min(80, W / Math.max(4, text.length * 0.55)) : Math.min(64, W / Math.max(4, text.length * 0.5)), tw = Math.min(W, text.length * fs * 0.52 + 44), th = fs * 1.5;
        if (wordStyle) { let x = W / 2 - (text.length * fs * 0.55) / 2, out = ''; // pill: latest started word; highlight / pop: word being spoken now
          const active = style === 'pill' ? page.tokens.filter(t => t.startMs <= tMs).length - 1 : page.tokens.findIndex(t => tMs >= t.startMs && tMs < t.endMs);
          page.tokens.forEach((t, i) => { const w = String(t.text).trim().length * fs * 0.55, gap = fs * 0.28; if (i === active && style === 'pill') out += `<rect x="${(x - 12).toFixed(1)}" y="${(H / 2 - fs / 2 - 12).toFixed(1)}" width="${(w + 24).toFixed(1)}" height="${(fs + 24).toFixed(1)}" rx="10" fill="#2563eb"/>`;
            const on = i === active && style !== 'pill', k = on && style === 'pop' ? 1.03 : 1, wfs = fs * k;
            out += `<text x="${(x - (w * (k - 1)) / 2).toFixed(1)}" y="${(H / 2 + fs * 0.35).toFixed(1)}" fill="${on ? '#2563eb' : '#fff'}" stroke="#000" stroke-width="${(fs / 7).toFixed(1)}" paint-order="stroke" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="${wfs.toFixed(1)}">${esc(String(t.text).trim())}</text>`; x += w + gap; });
          return frame + out; }
        // basic / rounded: wrap to at most 2 lines like the real components (≈0.52em per character)
        const fs2 = style === 'rounded' ? Math.min(64, H / 3) : 64, maxChars = Math.max(4, Math.floor((W - 44) / (fs2 * 0.52))), lines = [];
        const words = text.split(/\s+/);
        if (text.length <= maxChars) lines.push(text);
        else { let best = 1, bestLen = Infinity; for (let k = 1; k < words.length; k++) { const l = Math.max(words.slice(0, k).join(' ').length, words.slice(k).join(' ').length); if (l < bestLen) { bestLen = l; best = k; } } lines.push(words.slice(0, best).join(' '), words.slice(best).join(' ')); } // balanced, like text-wrap: balance
        const shown = lines.slice(0, 2), lh = fs2 * (style === 'rounded' ? 1.5 : 1.2), boxH = shown.length * lh + (style === 'rounded' ? 0 : 28), y0 = H / 2 - boxH / 2;
        let out = frame;
        shown.forEach((ln, i) => { const lw = Math.min(W, ln.length * fs2 * 0.52 + 44); if (style === 'rounded') out += `<rect x="${(W / 2 - lw / 2).toFixed(1)}" y="${(y0 + i * lh).toFixed(1)}" width="${lw.toFixed(1)}" height="${lh.toFixed(1)}" rx="20" fill="#ffffff"/>`; });
        if (style !== 'rounded') { const bw = Math.min(W, Math.max(...shown.map(l => l.length)) * fs2 * 0.52 + 44); out += `<rect x="${(W / 2 - bw / 2).toFixed(1)}" y="${y0.toFixed(1)}" width="${bw.toFixed(1)}" height="${boxH.toFixed(1)}" fill="rgba(64,64,64,0.75)"/>`; }
        shown.forEach((ln, i) => { out += `<text x="${W / 2}" y="${(y0 + (style === 'rounded' ? 0 : 14) + i * lh + lh * 0.5 + fs2 * 0.35).toFixed(1)}" fill="${style === 'rounded' ? '#000' : '#fff'}" text-anchor="middle" font-family="${style === 'rounded' ? 'Figtree, Arial' : 'Arial, Helvetica'}, sans-serif" font-weight="${style === 'rounded' ? 700 : 400}" font-size="${fs2.toFixed(1)}">${esc(ln)}</text>`; });
        return out; }
      case 'bands': { // style: waves | zigzag | contours — flowing two-colour bands (Moving Waves / Moving Zigzags / Liquid Contours)
        const style = pv.style || 'waves', cols = Array.isArray(cp.colors) && cp.colors.length ? cp.colors : ['#dff4ff', '#7cc6ff'], f = num(ctx.frame, 0), dur = Math.max(1, num(ctx.totalFrames, 120));
        const th = num(cp.thickness, style === 'zigzag' ? 40 : 56), amp = num(cp.amplitude, style === 'zigzag' ? 40 : 24), wl = num(cp.wavelength, 160);
        if (style === 'contours') { const ph = num(cp.phaseStart, 3.23) + (num(cp.phaseEnd, 4.23) - num(cp.phaseStart, 3.23)) * (f / num(cp.phaseFrames, 240)); let out = `<rect width="${W}" height="${H}" fill="${cols[1]}"/>`;
          for (let k = 9; k >= 1; k--) { const r = k / 9, pts = []; for (let i = 0; i < 48; i++) { const a = i / 48 * Math.PI * 2; const rr = r * Math.hypot(W, H) * 0.55 * (1 + 0.12 * Math.sin(a * 3 + ph * 2 + k) + 0.07 * Math.sin(a * 5 - ph * 3)); pts.push(`${(W * 0.45 + rr * Math.cos(a)).toFixed(1)},${(H * 0.55 + rr * 0.7 * Math.sin(a)).toFixed(1)}`); } out += `<polygon points="${pts.join(' ')}" fill="${cols[k % 2]}"/>`; }
          return `<svg x="0" y="0" width="${W}" height="${H}" overflow="hidden">${out}</svg>`; }
        const period = th * cols.length, off = (f / dur) * num(cp.loopDistance, style === 'zigzag' ? 480 : 448); let out = `<rect width="${W}" height="${H}" fill="${cols[0]}"/>`;
        for (let b = -2, y0 = -(off % period) - period; y0 < H + period; b++, y0 += th) { const pts = [], step = style === 'zigzag' ? wl / 2 : 16;
          for (let x = -wl; x <= W + wl; x += step) { const t = x / wl; const dy = style === 'zigzag' ? amp * (2 * Math.abs(2 * (t - Math.floor(t + 0.5))) - 1) : amp * Math.sin(t * Math.PI * 2); pts.push(`${x.toFixed(1)},${(y0 + dy).toFixed(1)}`); }
          const idx = ((b % cols.length) + cols.length) % cols.length; out += `<polygon points="${pts.join(' ')} ${W + wl},${(y0 + th + amp * 2).toFixed(1)} ${-wl},${(y0 + th + amp * 2).toFixed(1)}" fill="${cols[idx]}"/>`; }
        return `<svg x="0" y="0" width="${W}" height="${H}" overflow="hidden">${out}</svg>`; }
      case 'starburst': { const rays = Math.max(2, Math.round(num(cp.rays, 28))), cols = Array.isArray(cp.colors) && cp.colors.length ? cp.colors : ['#dff4ff', '#7cc6ff'];
        const cx = W * num(cp.originX, 0.5), cy = H * num(cp.originY, 0.5), R = Math.hypot(W, H), rot = num(cp.rotationPerFrame, 360 / 2000) * num(ctx.frame, 0); const step = 360 / rays; let wedges = '';
        for (let i = 0; i < rays; i++) { const a0 = (rot + i * step - 90) * Math.PI / 180, a1 = (rot + (i + 1) * step - 90) * Math.PI / 180; wedges += `<polygon points="${cx.toFixed(1)},${cy.toFixed(1)} ${(cx + R * Math.cos(a0)).toFixed(1)},${(cy + R * Math.sin(a0)).toFixed(1)} ${(cx + R * Math.cos(a1)).toFixed(1)},${(cy + R * Math.sin(a1)).toFixed(1)}" fill="${cols[i % cols.length]}"/>`; }
        return `<svg x="0" y="0" width="${W}" height="${H}" overflow="hidden"><rect width="${W}" height="${H}" fill="${cp.color || cols[0]}"/>${wedges}</svg>`; }
      case 'spectrum': { const n = Math.max(3, Math.min(127, Math.round(num(cp.numberOfBars, 65)))), sens = num(cp.sensitivity, 1.5), f = num(ctx.frame, 0), half = Math.ceil(n / 2), col = cp.barColor || '#2563eb';
        const freq = Array.from({ length: half }, (_, i) => { const fall = Math.exp(-i / (half * 0.35)); return Math.max(0, fall * (0.25 + 0.2 * Math.sin(f * 0.4 + i * 0.9) + 0.1 * Math.sin(f * 0.17 + i * 2.3))); });
        const vals = freq.slice(n % 2).reverse().concat(freq); const gap = 8, bw = Math.max(2, (900 - gap * (vals.length - 1)) / vals.length); let bars = '';
        vals.forEach((v, i) => { const h = Math.max(4, Math.min(300, 300 * Math.sqrt(v) * sens)); bars += `<rect x="${(i * (bw + gap)).toFixed(1)}" y="${(150 - h / 2).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="${(bw / 2).toFixed(1)}" fill="${col}"/>`; });
        return `<g transform="scale(${(W / 900).toFixed(4)} ${(H / 300).toFixed(4)})">${bars}<text x="4" y="296" fill="${col}" font-family="JetBrains Mono, monospace" font-size="14" opacity="0.8">preview • real spectrum of ${esc(String(cp.audioSrc || '').split('/').pop())} in render</text></g>`; }
      case 'bars': { const n = Math.max(12, Math.min(96, Math.round(num(cp.numberOfBars, 64)))), gap = Math.max(0, Math.min(8, num(cp.barGap, 5))), amp = num(cp.amplitude, 1), dur = Math.max(1, num(cp.durationInFrames, 271));
        const prog = Math.max(0, Math.min(1, num(ctx.frame, 0) / Math.max(1, dur - 1))), bw = (884 - gap * (n - 1)) / n; let bars = '';
        for (let i = 0; i < n; i++) { const a = 0.18 + 0.5 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11)) + 0.12 * Math.abs(Math.sin(i * 1.9)); const h = Math.max(10, Math.min(210, Math.sqrt(a) * 210 * amp)); const x = 8 + i * (bw + gap);
          bars += `<rect x="${x.toFixed(1)}" y="${(150 - h / 2).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(bw / 2, h / 2).toFixed(1)}" fill="${(x + bw / 2 - 8) / 884 <= prog ? (cp.playedColor || '#2563eb') : (cp.unplayedColor || '#cbd5e1')}"/>`; }
        return `<g transform="scale(${(W / 900).toFixed(4)} ${(H / 300).toFixed(4)})">${bars}<text x="10" y="292" fill="${cp.playedColor || '#2563eb'}" font-family="JetBrains Mono, monospace" font-size="14" opacity="0.8">preview • ${Math.round(prog * 100)}% • real bars from ${esc(String(cp.audioSrc || '').split('/').pop())} in render</text></g>`; }
      case 'waveform': { const lw = num(cp.lineWidth, 6), amp = num(cp.amplitude, 2), f = num(ctx.frame, 0), col = cp.lineColor || '#2563eb', pts = [];
        for (let i = 0; i < 64; i++) { const x = lw * 2 + (i / 63) * (900 - lw * 4); const v = 0.22 * Math.sin(i * 0.55 + f * 0.35) * Math.sin(i * 0.13 + f * 0.07) + 0.08 * Math.sin(i * 1.7 - f * 0.5); pts.push(`${x.toFixed(1)},${(150 + v * 150 * amp).toFixed(1)}`); }
        return `<g transform="scale(${(W / 900).toFixed(4)} ${(H / 300).toFixed(4)})"><rect x="0" y="0" width="900" height="300" fill="none" stroke="${col}" stroke-opacity="0.25" stroke-dasharray="10 6"/><line x1="0" x2="900" y1="150" y2="150" stroke="${col}" stroke-opacity="0.18"/><polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="${lw}" stroke-linecap="round" stroke-linejoin="round"/><text x="10" y="290" fill="${col}" font-family="JetBrains Mono, monospace" font-size="14" opacity="0.8">preview • real waveform of ${esc(String(cp.audioSrc || '').split('/').pop())} in render</text></g>`; }
      case 'text': return `<text x="0" y="${num(cp.fontSize, 48) * 0.8}" fill="${cp.color || '#e8e8ef'}" font-family="${cp.fontFamily || 'Space Grotesk, sans-serif'}" font-size="${num(cp.fontSize, 48)}" font-weight="700">${esc(cp.text || entry.name || 'Text')}</text>`;
      case 'shape': {
        const fill = cp.fill || '#64d2ff'; const shape = pv.shape || cp.shape || 'rect';
        if (shape === 'star') return `<polygon points="${starPoints(num(cp.outerRadius, 120), num(cp.outerRadius, 120), num(cp.outerRadius, 120), num(cp.innerRadius, 50), num(cp.points, 5))}" fill="${fill}"/>`;
        if (shape === 'circle') return `<circle cx="${num(cp.radius, 100)}" cy="${num(cp.radius, 100)}" r="${num(cp.radius, 100)}" fill="${fill}"/>`;
        if (shape === 'triangle') { const l = num(cp.length, 200), h = l * Math.sqrt(3) / 2; return `<polygon points="${l / 2},0 ${l},${h} 0,${h}" fill="${fill}"/>`; }
        if (shape === 'pie') { const r = num(cp.radius, 100), pr = clamp(num(cp.progress, 0.5), 0, 1); if (pr >= 1) return `<circle cx="${r}" cy="${r}" r="${r}" fill="${fill}"/>`; const a = pr * Math.PI * 2; const x = r + r * Math.sin(a), y = r - r * Math.cos(a); return `<path d="M${r} ${r} L${r} 0 A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)} Z" fill="${fill}"/>`; }
        if (shape === 'ellipse') return `<ellipse cx="${num(cp.rx, 150)}" cy="${num(cp.ry, 90)}" rx="${num(cp.rx, 150)}" ry="${num(cp.ry, 90)}" fill="${fill}"/>`;
        return `<rect x="0" y="0" width="${W}" height="${H}" rx="${num(cp.cornerRadius, 0)}" fill="${fill}"/>`;
      }
      default: { const lines = Object.entries(cp).filter(([k]) => !['width', 'height'].includes(k)).slice(0, 5).map(([k, v], i) => `<text x="16" y="${44 + i * 18}" fill="#8a8aa0" font-family="JetBrains Mono, monospace" font-size="11">${esc(k)}: ${esc(typeof v === 'object' ? JSON.stringify(v) : String(v)).slice(0, 40)}</text>`).join(''); return card(`<text x="16" y="24" fill="#e8e8ef" font-family="JetBrains Mono, monospace" font-size="14" font-weight="600">&lt;${esc(entry.componentName || 'Component')} /&gt;</text>${lines}`, (entry.external && entry.external.importPath) || 'external'); }
    }
  }
  const SIZE_CONTROLS = [R('width', 'WIDTH', 20, 4000), R('height', 'HEIGHT', 20, 4000)];
  const EXTERNAL_CATALOG = [
    /* MEDIA — remotion core components */
    { id: 'remotion_img', tab: 'media', type: 'external', componentName: 'Img', name: 'Image <Img>', desc: 'remotion <Img> • any URL or staticFile()', icon: '🖼️', renderTarget: 'html', preview: { kind: 'image' },
      external: { importPath: 'remotion', exportName: 'Img', sizeMode: 'style', omitProps: ['fit', 'radius'], styleMap: { fit: 'objectFit', radius: 'borderRadius' } },
      defaults: Object.assign(base(160, 160), { customProperties: { src: 'https://picsum.photos/seed/remotion/960/540', width: 640, height: 360, fit: 'cover', radius: 16 } }),
      controls: [{ group: 'Image', items: [{ key: 'src', label: 'SRC (URL / staticFile)', kind: 'text' }, { key: 'fit', label: 'OBJECT FIT', kind: 'select', options: [['cover', 'cover'], ['contain', 'contain'], ['fill', 'fill']] }, R('radius', 'CORNER RADIUS', 0, 200)].concat(SIZE_CONTROLS) }] },
    { id: 'remotion_video', tab: 'media', type: 'external', componentName: 'OffthreadVideo', name: 'Video <OffthreadVideo>', desc: 'remotion video layer • trim, volume, rate', icon: '🎬', renderTarget: 'html', preview: { kind: 'video' },
      external: { importPath: 'remotion', exportName: 'OffthreadVideo', sizeMode: 'style', omitProps: ['fit'], styleMap: { fit: 'objectFit' } },
      defaults: Object.assign(base(160, 160), { customProperties: { src: 'https://remotion.dev/bbb.mp4', width: 960, height: 540, startFrom: 0, volume: 1, muted: false, playbackRate: 1, fit: 'cover' } }),
      controls: [{ group: 'Video', items: [{ key: 'src', label: 'SRC', kind: 'text' }, { key: 'startFrom', label: 'START FROM (frames)', kind: 'number' }, R('volume', 'VOLUME', 0, 1, { step: 0.01 }), { key: 'muted', label: 'MUTED', kind: 'checkbox' }, R('playbackRate', 'PLAYBACK RATE', 0.25, 4, { step: 0.05 }), { key: 'fit', label: 'OBJECT FIT', kind: 'select', options: [['cover', 'cover'], ['contain', 'contain']] }].concat(SIZE_CONTROLS) }] },
    { id: 'remotion_audio', tab: 'media', type: 'external', componentName: 'Audio', name: 'Audio <Audio>', desc: 'music / SFX track • no visual output', icon: '🎵', renderTarget: 'html', preview: { kind: 'audio' },
      external: { importPath: 'remotion', exportName: 'Audio', sizeMode: 'none', omitProps: ['width', 'height'] },
      defaults: Object.assign(base(60, 940), { customProperties: { src: 'https://remotion.dev/audio.mp3', volume: 0.8, startFrom: 0, loop: false, width: 420, height: 90 } }),
      controls: [{ group: 'Audio', items: [{ key: 'src', label: 'SRC', kind: 'text' }, R('volume', 'VOLUME', 0, 1, { step: 0.01 }), { key: 'startFrom', label: 'START FROM (frames)', kind: 'number' }, { key: 'loop', label: 'LOOP', kind: 'checkbox' }] }] },
    { id: 'remotion_gif', tab: 'media', type: 'external', componentName: 'Gif', name: 'GIF <Gif>', desc: '@remotion/gif • frame-synced GIF', icon: '🌀', renderTarget: 'html', preview: { kind: 'image' },
      external: { importPath: '@remotion/gif', exportName: 'Gif', package: '@remotion/gif', sizeMode: 'props' },
      defaults: Object.assign(base(200, 200), { customProperties: { src: 'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif', width: 480, height: 270, fit: 'cover' } }),
      controls: [{ group: 'GIF', items: [{ key: 'src', label: 'SRC', kind: 'text' }, { key: 'fit', label: 'FIT', kind: 'select', options: [['cover', 'cover'], ['contain', 'contain'], ['fill', 'fill']] }].concat(SIZE_CONTROLS) }] },

    /* COMMUNITY / OFFICIAL PACKAGES — @remotion/shapes */
    { id: 'shape_star', tab: 'community', type: 'external', componentName: 'Star', name: 'Star (@remotion/shapes)', desc: 'SVG star • points, radii, fill', icon: '⭐', renderTarget: 'html', preview: { kind: 'shape', shape: 'star' },
      external: { importPath: '@remotion/shapes', exportName: 'Star', package: '@remotion/shapes', sizeMode: 'none', omitProps: ['width', 'height'] },
      defaults: Object.assign(base(200, 200), { customProperties: { points: 5, innerRadius: 50, outerRadius: 120, fill: '#ffd60a', width: 240, height: 240 } }),
      controls: [{ group: 'Star', items: [R('points', 'POINTS', 3, 12), R('innerRadius', 'INNER RADIUS', 5, 400), R('outerRadius', 'OUTER RADIUS', 10, 600), { key: 'fill', label: 'FILL', kind: 'color' }] }] },
    { id: 'shape_circle', tab: 'community', type: 'external', componentName: 'Circle', name: 'Circle (@remotion/shapes)', desc: 'SVG circle', icon: '⚪', renderTarget: 'html', preview: { kind: 'shape', shape: 'circle' },
      external: { importPath: '@remotion/shapes', exportName: 'Circle', package: '@remotion/shapes', sizeMode: 'none', omitProps: ['width', 'height'] },
      defaults: Object.assign(base(200, 200), { customProperties: { radius: 100, fill: '#64d2ff', width: 200, height: 200 } }),
      controls: [{ group: 'Circle', items: [R('radius', 'RADIUS', 5, 800), { key: 'fill', label: 'FILL', kind: 'color' }] }] },
    { id: 'shape_triangle', tab: 'community', type: 'external', componentName: 'Triangle', name: 'Triangle (@remotion/shapes)', desc: 'SVG triangle • length, direction', icon: '🔺', renderTarget: 'html', preview: { kind: 'shape', shape: 'triangle' },
      external: { importPath: '@remotion/shapes', exportName: 'Triangle', package: '@remotion/shapes', sizeMode: 'none', omitProps: ['width', 'height'] },
      defaults: Object.assign(base(200, 200), { customProperties: { length: 200, direction: 'up', fill: '#ff3b30', width: 200, height: 174 } }),
      controls: [{ group: 'Triangle', items: [R('length', 'LENGTH', 10, 1000), { key: 'direction', label: 'DIRECTION', kind: 'select', options: [['up', 'up'], ['down', 'down'], ['left', 'left'], ['right', 'right']] }, { key: 'fill', label: 'FILL', kind: 'color' }] }] },
    { id: 'shape_pie', tab: 'community', type: 'external', componentName: 'Pie', name: 'Pie (@remotion/shapes)', desc: 'progress pie • animate progress 0→1', icon: '🥧', renderTarget: 'html', preview: { kind: 'shape', shape: 'pie' },
      external: { importPath: '@remotion/shapes', exportName: 'Pie', package: '@remotion/shapes', sizeMode: 'none', omitProps: ['width', 'height'] },
      defaults: Object.assign(base(200, 200), { customProperties: { radius: 100, progress: 0.65, fill: '#30d158', width: 200, height: 200 } }),
      controls: [{ group: 'Pie', items: [R('radius', 'RADIUS', 5, 800), R('progress', 'PROGRESS', 0, 1, { step: 0.01 }), { key: 'fill', label: 'FILL', kind: 'color' }] }] },
    { id: 'shape_rect', tab: 'community', type: 'external', componentName: 'Rect', name: 'Rect (@remotion/shapes)', desc: 'rounded rectangle', icon: '▭', renderTarget: 'html', preview: { kind: 'shape', shape: 'rect' },
      external: { importPath: '@remotion/shapes', exportName: 'Rect', package: '@remotion/shapes', sizeMode: 'props' },
      defaults: Object.assign(base(200, 200), { customProperties: { width: 400, height: 220, cornerRadius: 24, fill: '#bf5af2' } }),
      controls: [{ group: 'Rect', items: SIZE_CONTROLS.concat([R('cornerRadius', 'CORNER RADIUS', 0, 300), { key: 'fill', label: 'FILL', kind: 'color' }]) }] },
  ];
  EXTERNAL_CATALOG.forEach(e => { e.render = renderExternal; CATALOG.push(e); });

  /** Normalise a community manifest entry (remotion/community/manifest.js or MCP register_component) into a catalog entry. */
  function buildExternalEntry(m) {
    if (!m || !m.id || !m.componentName) throw new Error('component needs id and componentName');
    const cp = Object.assign({ width: 480, height: 270 }, (m.defaults && m.defaults.customProperties) || m.props || {});
    const controls = m.controls && m.controls.length ? m.controls : [{ group: m.componentName, items: Object.entries(cp).map(([k, v]) => typeof v === 'number' ? { key: k, label: k.toUpperCase(), kind: 'number' } : typeof v === 'boolean' ? { key: k, label: k.toUpperCase(), kind: 'checkbox' } : /^#[0-9a-f]{6}$/i.test(String(v)) ? { key: k, label: k.toUpperCase(), kind: 'color' } : { key: k, label: k.toUpperCase(), kind: 'text' }) }];
    return { id: m.id, tab: m.tab || 'community', type: 'external', componentName: m.componentName, name: m.name || m.componentName, desc: m.desc || m.description || (m.external && m.external.importPath) || 'community component', icon: m.icon || '🧩', renderTarget: 'html',
      preview: m.preview || { kind: 'card' }, external: Object.assign({ importPath: './community/' + m.componentName, exportName: m.componentName, sizeMode: 'style' }, m.external || {}),
      defaults: Object.assign(base(200, 200), m.defaults || {}, { customProperties: cp }), controls, render: renderExternal, easing: m.easing, fullFrame: !!m.fullFrame, fullWidth: !!m.fullWidth };
  }

  const CATALOG_BY_ID = Object.fromEntries(CATALOG.map(c => [c.id, c]));

  /* ---------------------------------------------------------------
     MARTIAL ARTS PRESETS  (relative motion: baseX/baseY are deltas from frame 0)
     --------------------------------------------------------------- */
  const G = GUARD;
  const kf = (frame, dx, dy, angles) => ({ frame, dx, dy, angles });
  const PRESETS = {
    guard: { label: 'Guard Stance', desc: 'Basic fighting stance', kf: [kf(0, 0, 0, {})] },
    jab: { label: 'Jab • Snap Punch', desc: 'Wind-up → snap', kf: [
      kf(0, 0, 0, {}), kf(8, 10, 0, { torso: -88, rightShoulder: -45, rightElbow: 90 }), kf(14, 30, 0, { torso: -85, leftShoulder: 130, leftElbow: -40, rightShoulder: -90, rightElbow: 120, leftHip: 78, leftKnee: 25, rightHip: 108, rightKnee: 12 }),
      kf(22, 60, 0, { torso: -80, leftShoulder: 110, leftElbow: -80, rightShoulder: 15, rightElbow: 5, rightWrist: 10, leftHip: 80, leftKnee: 20, rightHip: 110, rightKnee: 10 }), kf(32, 0, 0, {})] },
    cross: { label: 'Cross • Power', desc: 'Torso twist + straight', kf: [
      kf(0, 0, 0, {}), kf(10, -10, 10, { torso: -100, leftShoulder: 110, leftElbow: -50, rightShoulder: -60, rightElbow: 110, leftHip: 70, leftKnee: 35, rightHip: 95, rightKnee: 25 }),
      kf(20, 80, -5, { torso: -70, leftShoulder: 90, leftElbow: -90, rightShoulder: 10, rightElbow: -5, rightWrist: 5, leftHip: 85, leftKnee: 15, rightHip: 115, rightKnee: 5 }), kf(35, 0, 0, {})] },
    hook: { label: 'Hook', desc: 'Wide arc, elbow bent', kf: [
      kf(0, 0, 0, {}), kf(12, 10, 5, { torso: -95, leftShoulder: 100, leftElbow: -40, rightShoulder: 90, rightElbow: -80 }),
      kf(22, 40, 0, { torso: -75, rightShoulder: -20, rightElbow: 80, rightWrist: 20, leftHip: 80, leftKnee: 20, rightHip: 110, rightKnee: 10 }), kf(32, 0, 0, {})] },
    uppercut: { label: 'Uppercut', desc: 'Low to high snap', kf: [
      kf(0, 0, 20, { torso: -95, rightShoulder: 80, rightElbow: -100, leftHip: 80, leftKnee: 40, rightHip: 100, rightKnee: 30 }),
      kf(15, 20, -20, { torso: -75, leftShoulder: 110, leftElbow: -50, rightShoulder: -40, rightElbow: 40, rightWrist: -20 }), kf(25, 0, 0, {})] },
    roundhouse: { label: 'Roundhouse Kick', desc: '180° leg swing', kf: [
      kf(0, 0, 0, {}), kf(10, -20, -10, { torso: -80, leftShoulder: 150, leftElbow: -30, rightShoulder: 20, rightElbow: -90, leftHip: 60, leftKnee: 60 }),
      kf(18, -30, -20, { torso: -70, leftShoulder: 170, leftElbow: -20, rightShoulder: -10, rightElbow: -100, leftHip: 40, leftKnee: 100, rightHip: 20, rightKnee: 20, rightAnkle: 30 }),
      kf(26, 0, -10, { torso: -60, leftShoulder: 180, leftElbow: 0, rightShoulder: -30, rightElbow: -80, leftHip: 30, leftKnee: 30, rightHip: -10, rightKnee: 10, rightAnkle: 40 }), kf(38, 0, 0, {})] },
    lowSweep: { label: 'Low Sweep Kick', desc: 'Crouch + leg flare + balance', kf: [
      kf(0, 0, 0, {}), kf(12, 0, 60, { torso: -65, leftShoulder: 160, leftElbow: -10, rightShoulder: -20, rightElbow: -20, leftHip: 95, leftKnee: 60, rightHip: 110, rightKnee: 50 }),
      kf(20, -10, 80, { torso: -45, leftShoulder: 190, leftElbow: 10, rightShoulder: -50, rightElbow: 20, leftHip: 110, leftKnee: 70, rightHip: 5, rightKnee: 5, rightAnkle: 30 }),
      kf(30, -20, 75, { torso: -30, leftShoulder: 200, leftElbow: 20, rightShoulder: -60, rightElbow: 30, leftHip: 115, leftKnee: 65, rightHip: -60, rightKnee: 15, rightAnkle: 30 }), kf(42, 0, 0, {})] },
    flyingKnee: { label: 'Flying Knee', desc: 'Jump + knee drive', kf: [
      kf(0, 0, 0, {}), kf(10, 50, -20, { torso: -85, leftShoulder: 140, leftElbow: -40, rightShoulder: 40, rightElbow: -50, leftHip: 60, leftKnee: 50, rightHip: 90, rightKnee: 40 }),
      kf(18, 150, -80, { torso: -70, leftShoulder: 180, leftElbow: -10, rightShoulder: 10, rightElbow: -20, leftHip: 20, leftKnee: 100, rightHip: 70, rightKnee: 20 }), kf(28, 250, 0, { torso: -80 }), kf(36, 250, 0, {})] },
    spinning: { label: 'Spinning Back Kick', desc: '360° torque', kf: [
      kf(0, 0, 0, {}), kf(8, -10, -5, { torso: -120, leftShoulder: 90, leftElbow: -80, rightShoulder: 100, rightElbow: -60, leftHip: 60, leftKnee: 40, rightHip: 90, rightKnee: 30 }),
      kf(18, 10, -10, { torso: -200, leftShoulder: 60, leftElbow: -90, rightShoulder: 140, rightElbow: -40, leftHip: 100, leftKnee: 20, rightHip: 40, rightKnee: 60 }),
      kf(26, 60, 0, { torso: -80, rightShoulder: -10, rightElbow: 10, leftHip: 80, leftKnee: 25, rightHip: 15, rightKnee: 5, rightAnkle: 30 }), kf(36, 0, 0, {})] },
    block: { label: 'High Block', desc: 'Guard raise + brace', kf: [
      kf(0, 0, 0, {}), kf(8, -10, 5, { torso: -95, leftShoulder: -120, leftElbow: -100, rightShoulder: -60, rightElbow: -110, leftHip: 80, leftKnee: 35, rightHip: 100, rightKnee: 25 }), kf(20, -10, 5, { torso: -95, leftShoulder: -120, leftElbow: -100, rightShoulder: -60, rightElbow: -110, leftHip: 80, leftKnee: 35, rightHip: 100, rightKnee: 25 }), kf(30, 0, 0, {})] },
    knockdown: { label: 'Knockdown', desc: 'Hit reaction → fall', kf: [
      kf(0, 0, 0, {}), kf(6, -30, -10, { torso: -110, neck: -30, leftShoulder: -150, leftElbow: -30, rightShoulder: -100, rightElbow: -40 }),
      kf(16, -90, 40, { torso: -150, neck: -20, leftShoulder: -170, leftElbow: -20, rightShoulder: -140, rightElbow: -30, leftHip: 40, leftKnee: 80, rightHip: 60, rightKnee: 70 }),
      kf(26, -140, 95, { torso: -175, neck: 10, leftShoulder: -160, leftElbow: 20, rightShoulder: -190, rightElbow: 40, leftHip: 10, leftKnee: 40, rightHip: 25, rightKnee: 60 }), kf(40, -140, 95, { torso: -175, neck: 10, leftShoulder: -160, leftElbow: 20, rightShoulder: -190, rightElbow: 40, leftHip: 10, leftKnee: 40, rightHip: 25, rightKnee: 60 })] },
    walk: { label: 'Walk Cycle', desc: '2-step loop forward', kf: [
      kf(0, 0, 0, { leftShoulder: 100, leftElbow: -30, rightShoulder: 80, rightElbow: -30, leftHip: 60, leftKnee: 20, rightHip: 110, rightKnee: 30 }),
      kf(12, 60, -6, { leftShoulder: 80, leftElbow: -30, rightShoulder: 100, rightElbow: -30, leftHip: 110, leftKnee: 35, rightHip: 60, rightKnee: 15 }),
      kf(24, 120, 0, { leftShoulder: 100, leftElbow: -30, rightShoulder: 80, rightElbow: -30, leftHip: 60, leftKnee: 20, rightHip: 110, rightKnee: 30 }),
      kf(36, 180, -6, { leftShoulder: 80, leftElbow: -30, rightShoulder: 100, rightElbow: -30, leftHip: 110, leftKnee: 35, rightHip: 60, rightKnee: 15 }), kf(48, 240, 0, { leftShoulder: 100, leftElbow: -30, rightShoulder: 80, rightElbow: -30, leftHip: 60, leftKnee: 20, rightHip: 110, rightKnee: 30 })] },
  };

  /* Keyword parser for the prompt choreographer */
  function presetFromPrompt(prompt) {
    const p = prompt.toLowerCase();
    let chosen = 'jab';
    if ((p.includes('sweep') && p.includes('low')) || p.includes('crouch')) chosen = 'lowSweep';
    else if (p.includes('roundhouse') || (p.includes('kick') && p.includes('round'))) chosen = 'roundhouse';
    else if (p.includes('uppercut')) chosen = 'uppercut';
    else if (p.includes('hook')) chosen = 'hook';
    else if (p.includes('cross') || p.includes('straight')) chosen = 'cross';
    else if (p.includes('block') || p.includes('guard up') || p.includes('defend')) chosen = 'block';
    else if (p.includes('knock') || p.includes('fall') || p.includes('hit ')) chosen = 'knockdown';
    else if (p.includes('walk') || p.includes('step')) chosen = 'walk';
    else if (p.includes('jab') || p.includes('punch')) chosen = 'jab';
    else if (p.includes('flying') || p.includes('knee')) chosen = 'flyingKnee';
    else if (p.includes('spin')) chosen = 'spinning';
    else if (p.includes('sweep')) chosen = 'lowSweep';
    else if (p.includes('kick')) chosen = 'roundhouse';
    else if (p.includes('stance') || p.includes('idle') || p.includes('guard')) chosen = 'guard';
    const preset = JSON.parse(JSON.stringify(PRESETS[chosen]));
    if (p.includes('crouch') || p.includes(' low')) preset.kf.forEach(k => { k.dy += 40; k.angles.torso = (k.angles.torso ?? G.torso) - 15; });
    if (p.includes('balance') || p.includes('flare')) preset.kf.forEach(k => { if (k.frame > 0) { k.angles.leftShoulder = (k.angles.leftShoulder ?? G.leftShoulder) + 20; k.angles.rightShoulder = (k.angles.rightShoulder ?? G.rightShoulder) - 20; } });
    if (p.includes('slow')) preset.kf.forEach(k => { k.frame = Math.round(k.frame * 1.6); });
    if (p.includes('fast') || p.includes('quick')) preset.kf.forEach(k => { k.frame = Math.round(k.frame * 0.7); });
    const mirror = p.includes('mirror') || p.includes('left hand') || p.includes('southpaw');
    return { key: chosen, preset, mirror };
  }

  /* ---------------------------------------------------------------
     COMPONENT MODIFIERS — context-aware motion generators.
     Each returns [{offsetFrame, props(sample) => partial properties}]
     `sample` is the asset's sampled properties at the start frame.
     --------------------------------------------------------------- */
  const cpPatch = (o) => ({ customProperties: o });
  const MODIFIERS = {
    character: [
      { id: 'faceRight', label: 'Face →', desc: 'Set facing right', instant: true, steps: s => [{ offset: 0, props: cpPatch({ facing: 1 }) }] },
      { id: 'faceLeft', label: 'Face ←', desc: 'Set facing left', instant: true, steps: s => [{ offset: 0, props: cpPatch({ facing: -1 }) }] },
      { id: 'hold', label: 'Hold Pose', desc: 'Freeze current pose 30f', steps: s => [{ offset: 0, props: {} }, { offset: 30, props: {} }] },
      { id: 'breathe', label: 'Idle Breathe', desc: 'Subtle 60f guard sway', steps: s => [{ offset: 0, props: {} }, { offset: 30, props: { baseY: s.baseY + 6, customProperties: { torso: (s.customProperties.torso ?? -90) - 3, leftShoulder: (s.customProperties.leftShoulder ?? 120) + 6, rightShoulder: (s.customProperties.rightShoulder ?? 60) - 6 } } }, { offset: 60, props: {} }] },
      { id: 'dash', label: 'Dash Forward', desc: 'Lunge 300px in 14f', steps: s => [{ offset: 0, props: {} }, { offset: 7, props: { baseX: s.baseX + 150 * (s.customProperties.facing || 1), baseY: s.baseY + 20, customProperties: { torso: -70 } } }, { offset: 14, props: { baseX: s.baseX + 300 * (s.customProperties.facing || 1) } }] },
    ],
    environment: [
      { id: 'panLeft', label: 'Pan ←', desc: 'Slide 300px left over 60f', steps: s => [{ offset: 0, props: {} }, { offset: 60, props: { baseX: s.baseX - 300 } }] },
      { id: 'panRight', label: 'Pan →', desc: 'Slide 300px right over 60f', steps: s => [{ offset: 0, props: {} }, { offset: 60, props: { baseX: s.baseX + 300 } }] },
      { id: 'zoomIn', label: 'Slow Zoom', desc: 'Scale ×1.25 over 90f', steps: s => [{ offset: 0, props: {} }, { offset: 90, props: { scale: s.scale * 1.25 } }] },
      { id: 'fadeIn', label: 'Fade In', desc: 'Opacity 0→1 in 30f', steps: s => [{ offset: 0, props: { opacity: 0 } }, { offset: 30, props: { opacity: s.opacity } }] },
    ],
    widget: [
      { id: 'bullish', label: 'Bullish Wave', desc: 'Data morphs up-trend 60f', only: 'TradingChart', steps: s => { const d = s.customProperties.data || []; const n = d.length || 10; const start = d[0] || 100; const target = Array.from({ length: n }, (_, i) => start * (1 + i / (n - 1) * 0.4 + Math.sin(i * 1.7) * 0.03)); return [{ offset: 0, props: {} }, { offset: 60, props: cpPatch({ data: target.map(v => +v.toFixed(2)) }) }]; } },
      { id: 'bearish', label: 'Bearish Crash', desc: 'Data morphs down-trend 60f', only: 'TradingChart', steps: s => { const d = s.customProperties.data || []; const n = d.length || 10; const start = d[0] || 100; const target = Array.from({ length: n }, (_, i) => start * (1 - Math.pow(i / (n - 1), 1.6) * 0.45 + Math.sin(i * 2.1) * 0.02)); return [{ offset: 0, props: {} }, { offset: 60, props: cpPatch({ data: target.map(v => +v.toFixed(2)) }) }]; } },
      { id: 'sideways', label: 'Sideways Chop', desc: 'Flat volatile range 60f', only: 'TradingChart', steps: s => { const d = s.customProperties.data || []; const n = d.length || 10; const start = d[0] || 100; const target = Array.from({ length: n }, (_, i) => start * (1 + Math.sin(i * 2.4) * 0.05)); return [{ offset: 0, props: {} }, { offset: 60, props: cpPatch({ data: target.map(v => +v.toFixed(2)) }) }]; } },
      { id: 'reveal', label: 'Draw-In Reveal', desc: 'reveal 0→1 over 60f', only: 'TradingChart', steps: s => [{ offset: 0, props: cpPatch({ reveal: 0 }) }, { offset: 60, props: cpPatch({ reveal: 1 }) }] },
      { id: 'growBars', label: 'Grow Bars', desc: 'Values 0→current in 45f', only: 'BarChart', steps: s => [{ offset: 0, props: cpPatch({ values: (s.customProperties.values || []).map(() => 0) }) }, { offset: 45, props: cpPatch({ values: s.customProperties.values || [] }) }] },
      { id: 'countUp', label: 'Count Up', desc: 'Value 0→current in 60f', only: 'Counter', steps: s => [{ offset: 0, props: cpPatch({ value: 0 }) }, { offset: 60, props: cpPatch({ value: s.customProperties.value }) }] },
      { id: 'popIn', label: 'Pop In', desc: 'Scale 0.6→1.08→1 + fade', steps: s => [{ offset: 0, props: { scale: s.scale * 0.6, opacity: 0 } }, { offset: 12, props: { scale: s.scale * 1.08, opacity: s.opacity } }, { offset: 20, props: { scale: s.scale } }] },
      { id: 'slideUp', label: 'Slide Up', desc: 'From +80px with fade 24f', steps: s => [{ offset: 0, props: { baseY: s.baseY + 80, opacity: 0 } }, { offset: 24, props: { baseY: s.baseY, opacity: s.opacity } }] },
    ],
    text: [
      { id: 'fadeIn', label: 'Fade In', desc: 'Opacity 0→1 in 24f', steps: s => [{ offset: 0, props: { opacity: 0 } }, { offset: 24, props: { opacity: s.opacity } }] },
      { id: 'slideUp', label: 'Slide Up', desc: 'From +80px with fade 24f', steps: s => [{ offset: 0, props: { baseY: s.baseY + 80, opacity: 0 } }, { offset: 24, props: { baseY: s.baseY, opacity: s.opacity } }] },
      { id: 'popIn', label: 'Pop In', desc: 'Scale 0.6→1.08→1 + fade', steps: s => [{ offset: 0, props: { scale: s.scale * 0.6, opacity: 0 } }, { offset: 12, props: { scale: s.scale * 1.08, opacity: s.opacity } }, { offset: 20, props: { scale: s.scale } }] },
      { id: 'punchOut', label: 'Punch Out', desc: 'Scale up + fade out 18f', steps: s => [{ offset: 0, props: {} }, { offset: 18, props: { scale: s.scale * 1.5, opacity: 0 } }] },
    ],
    external: [
      { id: 'fadeIn', label: 'Fade In', desc: 'Opacity 0→1 in 24f', steps: s => [{ offset: 0, props: { opacity: 0 } }, { offset: 24, props: { opacity: s.opacity } }] },
      { id: 'slideUp', label: 'Slide Up', desc: 'From +80px with fade 24f', steps: s => [{ offset: 0, props: { baseY: s.baseY + 80, opacity: 0 } }, { offset: 24, props: { baseY: s.baseY, opacity: s.opacity } }] },
      { id: 'popIn', label: 'Pop In', desc: 'Scale 0.6→1.08→1 + fade', steps: s => [{ offset: 0, props: { scale: s.scale * 0.6, opacity: 0 } }, { offset: 12, props: { scale: s.scale * 1.08, opacity: s.opacity } }, { offset: 20, props: { scale: s.scale } }] },
      { id: 'spin', label: 'Spin 360°', desc: 'Rotation +360 over 60f', steps: s => [{ offset: 0, props: {} }, { offset: 60, props: { rotation: (s.rotation || 0) + 360 } }] },
      { id: 'fillPie', label: 'Fill Progress', desc: 'progress 0→1 in 45f', only: 'Pie', steps: s => [{ offset: 0, props: cpPatch({ progress: 0 }) }, { offset: 45, props: cpPatch({ progress: 1 }) }] },
      { id: 'kenBurns', label: 'Ken Burns', desc: 'Slow zoom + drift 120f', steps: s => [{ offset: 0, props: {} }, { offset: 120, props: { scale: s.scale * 1.15, baseX: s.baseX - 40, baseY: s.baseY - 20 } }] },
    ],
    three: [
      { id: 'spinY', label: 'Spin Y 360°', desc: 'Full turn over 90f', steps: s => [{ offset: 0, props: {} }, { offset: 90, props: cpPatch({ rotY: (s.customProperties.rotY || 0) + 360 }) }] },
      { id: 'tumble', label: 'Tumble', desc: 'X+Y rotation 120f', steps: s => [{ offset: 0, props: {} }, { offset: 120, props: cpPatch({ rotX: (s.customProperties.rotX || 0) + 360, rotY: (s.customProperties.rotY || 0) + 180 }) }] },
      { id: 'bounce', label: 'Bounce', desc: 'Drop, squash, settle 40f', steps: s => [{ offset: 0, props: { baseY: s.baseY - 200 } }, { offset: 16, props: { baseY: s.baseY } }, { offset: 22, props: { baseY: s.baseY - 60 } }, { offset: 32, props: { baseY: s.baseY } }, { offset: 40, props: { baseY: s.baseY } }] },
      { id: 'pulse', label: 'Pulse', desc: 'Scale 1→1.2→1 30f', steps: s => [{ offset: 0, props: {} }, { offset: 15, props: { scale: s.scale * 1.2 } }, { offset: 30, props: { scale: s.scale } }] },
    ]
  };

  global.StudioCatalog = { CATALOG, CATALOG_BY_ID, PRESETS, MODIFIERS, GUARD, JOINT_KEYS, SEG, ASPECT_PRESETS, calcRig, presetFromPrompt, buildExternalEntry, renderExternal, esc };
})(window);
