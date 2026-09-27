import React from 'react';
import { useCurrentFrame } from 'remotion';

/**
 * Example of a "community style" component wrapped as a catalog asset.
 * Any component that takes plain props works: the studio passes customProperties as props
 * (+ style={{width,height}} because the manifest sets sizeMode:'style').
 * It receives the composition frame through useCurrentFrame(), exactly like code from remotion.dev
 * or GitHub — paste such components into this folder and register them in manifest.js.
 */
export interface TypewriterTextProps {
  text?: string;
  charsPerFrame?: number;
  fontSize?: number;
  color?: string;
  cursorColor?: string;
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text = '', charsPerFrame = 0.6, fontSize = 56, color = '#e8e8ef', cursorColor = '#30d158', style }) => {
  const frame = useCurrentFrame();
  const shown = Math.min(text.length, Math.floor(frame * charsPerFrame));
  const cursorOn = Math.floor(frame / 15) % 2 === 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: 700, fontSize, color, whiteSpace: 'pre', overflow: 'hidden', ...style }}>
      {text.slice(0, shown)}
      <span style={{ display: 'inline-block', width: fontSize * 0.08, height: fontSize * 0.9, marginLeft: fontSize * 0.08, background: cursorColor, opacity: cursorOn ? 1 : 0 }} />
    </div>
  );
};

export default TypewriterText;
