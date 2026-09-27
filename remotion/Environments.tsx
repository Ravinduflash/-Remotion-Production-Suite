import React from 'react';

/**
 * Environment components. Each renders in LOCAL coordinates; the SceneRenderer wraps it in
 * <g transform="translate(baseX baseY) rotate(r) scale(s)"> and passes the asset's
 * customProperties as props. Geometry mirrors catalog.js so the browser preview matches the render.
 */

// Deterministic LCG so "random" windows/buildings are identical on every frame and machine
const lcg = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export interface SkyGradientProps { uid?: string; width?: number; height?: number; topColor?: string; bottomColor?: string; showSun?: boolean; sunX?: number; sunY?: number; sunRadius?: number; sunColor?: string; stars?: boolean }
export const SkyGradient: React.FC<SkyGradientProps> = ({ uid = 'sky', width = 1920, height = 1080, topColor = '#0b1026', bottomColor = '#2a1a3e', showSun = false, sunX = 1500, sunY = 220, sunRadius = 70, sunColor = '#ffd60a', stars = true }) => {
  const id = `g_${uid}`;
  const rnd = lcg(7);
  const starPts = stars ? Array.from({ length: 90 }, (_, i) => ({ x: rnd() * width, y: rnd() * height * 0.6, r: (i % 3) * 0.6 + 0.8, o: 0.3 + (i % 5) * 0.12 })) : [];
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={topColor} />
          <stop offset="1" stopColor={bottomColor} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={width} height={height} fill={`url(#${id})`} />
      {showSun && <circle cx={sunX} cy={sunY} r={sunRadius} fill={sunColor} opacity={0.9} />}
      {starPts.map((p, i) => <circle key={i} cx={Math.round(p.x)} cy={Math.round(p.y)} r={p.r} fill="white" opacity={p.o} />)}
    </>
  );
};

export interface FloorLineProps { width?: number; color?: string; strokeWidth?: number; dashed?: boolean; glow?: boolean }
export const FloorLine: React.FC<FloorLineProps> = ({ width = 1920, color = '#2a2a40', strokeWidth = 3, dashed = true, glow = true }) => (
  <>
    <line x1={0} y1={0} x2={width} y2={0} stroke={color} strokeWidth={strokeWidth} strokeDasharray={dashed ? '10 10' : undefined} />
    {glow && <rect x={0} y={0} width={width} height={120} fill={color} opacity={0.12} />}
  </>
);

export interface HouseProps { width?: number; height?: number; roofHeight?: number; wallColor?: string; roofColor?: string; doorColor?: string; windowColor?: string; windowsLit?: boolean }
export const House: React.FC<HouseProps> = ({ width: w = 340, height: h = 240, roofHeight: rh = 120, wallColor = '#3b3f5c', roofColor = '#ff3b30', doorColor = '#1a1a26', windowColor, windowsLit = false }) => {
  const win = windowColor || (windowsLit ? '#ffd60a' : '#64d2ff');
  const wy = -h + 50, ws = 54;
  const windows = [-w / 2 + 34, w / 2 - 34 - ws];
  return (
    <>
      <rect x={-w / 2} y={-h} width={w} height={h} fill={wallColor} stroke="#0a0a0f" strokeWidth={3} />
      <polygon points={`${-w / 2 - 24},${-h} 0,${-h - rh} ${w / 2 + 24},${-h}`} fill={roofColor} stroke="#0a0a0f" strokeWidth={3} />
      <rect x={w / 4} y={-h - rh * 0.75} width={34} height={rh * 0.55} fill={wallColor} stroke="#0a0a0f" strokeWidth={3} />
      <rect x={-24} y={-90} width={48} height={90} rx={4} fill={doorColor} stroke="#0a0a0f" strokeWidth={3} />
      <circle cx={12} cy={-45} r={3} fill="#ffd60a" />
      {windows.map((x, i) => (
        <g key={i}>
          <rect x={x} y={wy} width={ws} height={ws} fill={win} stroke="#0a0a0f" strokeWidth={3} opacity={windowsLit ? 0.95 : 0.6} />
          <line x1={x + ws / 2} y1={wy} x2={x + ws / 2} y2={wy + ws} stroke="#0a0a0f" strokeWidth={3} />
          <line x1={x} y1={wy + ws / 2} x2={x + ws} y2={wy + ws / 2} stroke="#0a0a0f" strokeWidth={3} />
        </g>
      ))}
    </>
  );
};

export interface StreetBlockProps { width?: number; buildingCount?: number; skylineColor?: string; roadColor?: string; roadHeight?: number; windowColor?: string; lamps?: boolean }
export const StreetBlock: React.FC<StreetBlockProps> = ({ width: w = 1920, buildingCount = 9, skylineColor = '#161626', roadColor = '#15151f', roadHeight = 90, windowColor = '#ffd60a', lamps = true }) => {
  const n = Math.max(1, Math.round(buildingCount));
  const bw = w / n;
  const rnd = lcg(3);
  const buildings: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const bh = 160 + rnd() * 320;
    buildings.push(<rect key={`b${i}`} x={Math.round(i * bw)} y={Math.round(-bh)} width={Math.round(bw - 12)} height={Math.round(bh)} fill={skylineColor} />);
    for (let r = 0; r < Math.floor(bh / 46); r++) for (let c = 0; c < Math.floor((bw - 12) / 40); c++) {
      if (rnd() > 0.55) buildings.push(<rect key={`w${i}_${r}_${c}`} x={Math.round(i * bw + 14 + c * 40)} y={Math.round(-bh + 16 + r * 46)} width={14} height={20} fill={windowColor} opacity={0.55} />);
    }
  }
  const lampXs: number[] = []; if (lamps) for (let x = 200; x < w; x += 420) lampXs.push(x);
  return (
    <>
      {buildings}
      <rect x={0} y={0} width={w} height={roadHeight} fill={roadColor} />
      <rect x={0} y={0} width={w} height={10} fill="#2a2a40" />
      <line x1={0} y1={roadHeight / 2} x2={w} y2={roadHeight / 2} stroke="#ffd60a" strokeWidth={4} strokeDasharray="40 30" opacity={0.6} />
      {lampXs.map(x => (
        <g key={x}>
          <line x1={x} y1={0} x2={x} y2={-220} stroke="#3a3a5a" strokeWidth={6} />
          <circle cx={x} cy={-228} r={12} fill="#ffd60a" opacity={0.9} />
          <circle cx={x} cy={-228} r={40} fill="#ffd60a" opacity={0.08} />
        </g>
      ))}
    </>
  );
};

export interface IndoorRoomProps { width?: number; height?: number; floorY?: number; wallColor?: string; floorColor?: string; windowX?: number; windowY?: number; windowLight?: string; windowOpacity?: number; picture?: boolean }
export const IndoorRoom: React.FC<IndoorRoomProps> = ({ width: w = 1920, height: h = 1080, floorY: fy = 820, wallColor = '#1c1c2e', floorColor = '#2a2438', windowX: wx = 1300, windowY: wy = 200, windowLight = '#64d2ff', windowOpacity = 0.35, picture = true }) => {
  const ww = 300, wh = 260;
  const planks: number[] = []; for (let x = 0; x < w; x += 160) planks.push(x);
  return (
    <>
      <rect x={0} y={0} width={w} height={fy} fill={wallColor} />
      <rect x={0} y={fy} width={w} height={h - fy} fill={floorColor} />
      <rect x={0} y={fy - 12} width={w} height={12} fill="#0f0f18" />
      {planks.map(x => <line key={x} x1={x} y1={fy} x2={x - 200} y2={h} stroke="#0a0a0f" strokeWidth={2} opacity={0.4} />)}
      <rect x={wx} y={wy} width={ww} height={wh} fill={windowLight} opacity={windowOpacity} stroke="#0a0a0f" strokeWidth={8} />
      <line x1={wx + ww / 2} y1={wy} x2={wx + ww / 2} y2={wy + wh} stroke="#0a0a0f" strokeWidth={8} />
      <line x1={wx} y1={wy + wh / 2} x2={wx + ww} y2={wy + wh / 2} stroke="#0a0a0f" strokeWidth={8} />
      {picture && (
        <>
          <rect x={360} y={260} width={220} height={160} fill="#0f0f18" stroke="#ffd60a" strokeWidth={6} />
          <polygon points="380,400 450,320 500,370 540,340 560,400" fill="#30d158" opacity={0.6} />
        </>
      )}
    </>
  );
};

export interface TreeProps { height?: number; trunkColor?: string; canopyColor?: string }
export const Tree: React.FC<TreeProps> = ({ height: h = 260, trunkColor = '#5a3b2e', canopyColor = '#30d158' }) => (
  <>
    <rect x={-14} y={-h * 0.45} width={28} height={h * 0.45} fill={trunkColor} />
    <circle cx={0} cy={-h * 0.65} r={h * 0.32} fill={canopyColor} opacity={0.95} />
    <circle cx={-h * 0.22} cy={-h * 0.5} r={h * 0.24} fill={canopyColor} opacity={0.85} />
    <circle cx={h * 0.22} cy={-h * 0.52} r={h * 0.26} fill={canopyColor} opacity={0.9} />
  </>
);
