import React from 'react';

/**
 * Data-driven widgets (charts, text, counters). Local-coordinate SVG fragments — the
 * SceneRenderer positions them. Numeric props (data arrays, values, reveal) are interpolated
 * between keyframes by SceneRenderer.sampleAsset, so a "Bullish Wave" is just two keyframes
 * with different data arrays.
 */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const MONO = 'JetBrains Mono, monospace';

export interface TradingChartProps {
  uid?: string; ticker?: string; data?: number[]; width?: number; height?: number; reveal?: number;
  showTarget?: boolean; targetPrice?: number; autoColor?: boolean; lineColor?: string; currency?: string; decimals?: number; bg?: string;
}
export const TradingChart: React.FC<TradingChartProps> = ({ uid = 'tc', ticker = 'TICKER', data = [], width: W = 560, height: H = 300, reveal = 1, showTarget = false, targetPrice, autoColor = true, lineColor, currency = '$', decimals = 2, bg = '#12121a' }) => {
  const pad = 44;
  const series = data.map(Number).filter(v => !isNaN(v));
  const n = series.length;
  const rv = clamp(reveal, 0, 1);
  const up = n < 2 || series[n - 1] >= series[0];
  const color = !autoColor && lineColor ? lineColor : up ? '#30d158' : '#ff3b30';
  const id = `tc_${uid}`;
  const frame = (
    <>
      <rect x={0} y={0} width={W} height={H} rx={14} fill={bg} stroke="#24243a" strokeWidth={2} />
      <text x={18} y={30} fill="#e8e8ef" fontFamily={MONO} fontSize={16} fontWeight={600}>{ticker}</text>
    </>
  );
  if (n < 2) return <>{frame}<text x={W / 2} y={H / 2} fill="#8a8aa0" textAnchor="middle" fontSize={12} fontFamily={MONO}>no data</text></>;

  let min = Math.min(...series), max = Math.max(...series);
  if (showTarget && typeof targetPrice === 'number') { min = Math.min(min, targetPrice); max = Math.max(max, targetPrice); }
  const range = max - min || 1; min -= range * 0.08; max += range * 0.08;
  const px = (i: number) => pad + (i / (n - 1)) * (W - pad - 18);
  const py = (v: number) => H - 30 - ((v - min) / (max - min)) * (H - 80);

  const k = rv * (n - 1), kf = Math.floor(k);
  const pts: [number, number][] = [];
  for (let i = 0; i <= kf; i++) pts.push([px(i), py(series[i])]);
  if (kf < n - 1 && k > kf) { const t = k - kf; pts.push([px(kf) + (px(kf + 1) - px(kf)) * t, py(series[kf]) + (py(series[kf + 1]) - py(series[kf])) * t]); }
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];
  const lastVal = series[kf] + (kf < n - 1 ? (series[kf + 1] - series[kf]) * (k - kf) : 0);
  const chg = ((lastVal - series[0]) / (Math.abs(series[0]) || 1)) * 100;
  const grid = [0, 1, 2, 3].map(g => 50 + g * ((H - 80) / 3));

  return (
    <>
      {frame}
      {grid.map((y, i) => (
        <g key={i}>
          <line x1={pad} y1={y} x2={W - 18} y2={y} stroke="#24243a" strokeWidth={1} strokeDasharray="4 6" />
          <text x={pad - 8} y={y + 4} fill="#8a8aa0" textAnchor="end" fontSize={9} fontFamily={MONO}>{(max - ((y - 50) / (H - 80)) * (max - min)).toFixed(0)}</text>
        </g>
      ))}
      {pts.length >= 2 && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity={0.35} />
              <stop offset="1" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={`${d} L${last[0].toFixed(1)} ${H - 30} L${pts[0][0].toFixed(1)} ${H - 30} Z`} fill={`url(#${id})`} />
          <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={last[0]} cy={last[1]} r={5} fill={color} />
          <circle cx={last[0]} cy={last[1]} r={11} fill={color} opacity={0.25} />
          <text x={W - 18} y={30} fill={color} textAnchor="end" fontFamily={MONO} fontSize={16} fontWeight={600}>{currency}{lastVal.toFixed(decimals)}</text>
          <text x={W - 18} y={46} fill={color} textAnchor="end" fontFamily={MONO} fontSize={10}>{chg >= 0 ? '▲' : '▼'} {Math.abs(chg).toFixed(2)}%</text>
        </>
      )}
      {showTarget && typeof targetPrice === 'number' && (
        <>
          <line x1={pad} y1={py(targetPrice)} x2={W - 18} y2={py(targetPrice)} stroke="#ffd60a" strokeWidth={2} strokeDasharray="8 6" />
          <text x={pad + 4} y={py(targetPrice) - 6} fill="#ffd60a" fontSize={10} fontFamily={MONO}>TARGET {targetPrice}</text>
        </>
      )}
    </>
  );
};

export interface BarChartProps { title?: string; values?: number[]; labels?: string; maxValue?: number; barColor?: string; width?: number; height?: number; bg?: string }
export const BarChart: React.FC<BarChartProps> = ({ title = 'BAR CHART', values = [], labels = '', maxValue = 0, barColor = '#64d2ff', width: W = 520, height: H = 300, bg = '#12121a' }) => {
  const pad = 30;
  const vals = values.map(Number);
  const labs = String(labels).split(',').map(x => x.trim());
  const maxV = maxValue > 0 ? maxValue : Math.max(1, ...vals);
  const n = vals.length || 1, slot = (W - pad * 2) / n, bw = slot * 0.62;
  return (
    <>
      <rect x={0} y={0} width={W} height={H} rx={14} fill={bg} stroke="#24243a" strokeWidth={2} />
      <text x={18} y={30} fill="#e8e8ef" fontFamily={MONO} fontSize={15} fontWeight={600}>{title}</text>
      {vals.map((v, i) => {
        const h = clamp(v / maxV, 0, 1) * (H - 100), x = pad + i * slot + (slot - bw) / 2, y = H - 40 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx={4} fill={barColor} />
            <text x={x + bw / 2} y={y - 6} fill="#e8e8ef" textAnchor="middle" fontSize={10} fontFamily={MONO}>{Math.round(v)}</text>
            {labs[i] && <text x={x + bw / 2} y={H - 20} fill="#8a8aa0" textAnchor="middle" fontSize={10} fontFamily={MONO}>{labs[i]}</text>}
          </g>
        );
      })}
    </>
  );
};

export interface TextCardProps { text?: string; subtitle?: string; fontSize?: number; color?: string; subtitleColor?: string; bg?: string; borderColor?: string; radius?: number; width?: number; height?: number; align?: 'left' | 'center' | 'right'; font?: 'sans' | 'mono'; letterSpacing?: number }
export const TextCard: React.FC<TextCardProps> = ({ text = 'TITLE', subtitle, fontSize: fs = 56, color = '#e8e8ef', subtitleColor = '#8a8aa0', bg = 'none', borderColor = 'none', radius = 16, width: W = 640, height: H = 160, align = 'center', font = 'sans', letterSpacing = -1 }) => {
  const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';
  const tx = align === 'left' ? 28 : align === 'right' ? W - 28 : W / 2;
  return (
    <>
      {bg && bg !== 'none' && <rect x={0} y={0} width={W} height={H} rx={radius} fill={bg} stroke={borderColor} strokeWidth={2} />}
      <text x={tx} y={H / 2 + (subtitle ? -4 : fs * 0.35)} fill={color} textAnchor={anchor} fontFamily={font === 'mono' ? MONO : 'Space Grotesk, system-ui, sans-serif'} fontSize={fs} fontWeight={700} letterSpacing={letterSpacing}>{text}</text>
      {subtitle && <text x={tx} y={H / 2 + fs * 0.55} fill={subtitleColor} textAnchor={anchor} fontFamily={MONO} fontSize={fs * 0.32} letterSpacing={2}>{subtitle}</text>}
    </>
  );
};

export interface CounterProps { value?: number; prefix?: string; suffix?: string; decimals?: number; fontSize?: number; color?: string; label?: string; thousands?: boolean }
export const Counter: React.FC<CounterProps> = ({ value = 0, prefix = '', suffix = '', decimals = 0, fontSize: fs = 72, color = '#30d158', label, thousands = true }) => {
  const txt = prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, thousands ? ',' : '') + suffix;
  return (
    <>
      {label && <text x={0} y={-fs * 0.85} fill="#8a8aa0" textAnchor="middle" fontFamily={MONO} fontSize={fs * 0.22} letterSpacing={3}>{label}</text>}
      <text x={0} y={0} fill={color} textAnchor="middle" fontFamily={MONO} fontSize={fs} fontWeight={600}>{txt}</text>
    </>
  );
};
