import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { AdvancedStickman } from './AdvancedStickman';

/**
 * Example 1: Direct Punch Sequence (as described in prompt)
 * Wind-up backward then snap forward using spring physics
 */
export const PunchScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Create a crisp, punchy spring curve for the strike action
  const strikeSpring = spring({
    frame: frame - 10, // Starts at frame 10
    fps,
    config: { damping: 12, mass: 0.5 }, // Snappy, explosive movement
  });

  // 2. Animate the right shoulder angle (Wind up backward, then snap forward)
  const rightShoulderAngle = interpolate(
    strikeSpring,
    [0, 0.2, 1], 
    [-45, -90, 15] // Stretches backward, then drives straight out forward
  );

  // 3. Animate the right elbow angle (Unfolds instantly during the punch)
  const rightElbowAngle = interpolate(
    strikeSpring,
    [0, 0.2, 1],
    [90, 120, 0] // Unfolds from a bent elbow right into a straight arm lock
  );

  const currentAngles = {
    torso: -90,            // Standing upright
    leftShoulder: 120,     // Left arm in guard pose
    leftElbow: -60,
    rightShoulder: rightShoulderAngle,
    rightElbow: rightElbowAngle,
    leftHip: 75,           // Basic fighting stance leg positions
    leftKnee: 30,
    rightHip: 105,
    rightKnee: 15,
  };

  return (
    <svg width={1920} height={1080} style={{ backgroundColor: '#0a0a0f' }}>
      {/* Floor grid */}
      <line x1={0} y1={700} x2={1920} y2={700} stroke="#24243a" strokeWidth={2} strokeDasharray="8 8" />
      <AdvancedStickman baseX={800} baseY={700} angles={currentAngles} />
    </svg>
  );
};

/**
 * Example 2: Crouching Low Sweep Kick
 * Prompt: "Using the <AdvancedStickman /> rig, write a sequence where the character executes a 
 * crouching low sweep kick. Interpolate the baseY position down so they crouch, rotate the torso 
 * forward, swing the left leg 180 degrees using a clean sine wave curve, and make the arms flare 
 * outwards slightly to maintain structural balance."
 */
export const LowSweepKickScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Crouch: baseY goes from 700 down to 780
  const baseY = interpolate(progress, [0, 0.3, 0.7, 1], [700, 760, 780, 700], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Torso rotates forward for balance
  const torso = interpolate(progress, [0, 0.5, 1], [-90, -45, -90]);

  // Left leg 180 degree sweep using sine wave
  // We use interpolate with a sine-like easing
  const sweepWave = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
  const leftHip = interpolate(progress, [0, 0.5, 1], [75, -60, 75]);
  const leftKnee = interpolate(progress, [0, 0.3, 0.7, 1], [30, 60, 10, 30]);

  // Right leg plants and bends to support crouch
  const rightHip = interpolate(progress, [0, 0.5, 1], [105, 115, 105]);
  const rightKnee = interpolate(progress, [0, 0.5, 1], [15, 65, 15]);

  // Arms flare outwards for balance
  const leftShoulder = interpolate(progress, [0, 0.5, 1], [120, 200, 120]);
  const rightShoulder = interpolate(progress, [0, 0.5, 1], [60, -60, 60]);
  const leftElbow = interpolate(progress, [0, 0.5, 1], [-60, 20, -60]);
  const rightElbow = interpolate(progress, [0, 0.5, 1], [-70, 30, -70]);

  const currentAngles = {
    torso,
    leftShoulder,
    leftElbow,
    rightShoulder,
    rightElbow,
    leftHip,
    leftKnee,
    rightHip,
    rightKnee,
  };

  return (
    <svg width={1920} height={1080} style={{ backgroundColor: '#0a0a0f' }}>
      <line x1={0} y1={700} x2={1920} y2={700} stroke="#24243a" strokeWidth={2} strokeDasharray="8 8" />
      <AdvancedStickman baseX={700} baseY={baseY} angles={currentAngles} />
    </svg>
  );
};

/**
 * Example 3: Full Choreography Timeline (Multi-move combo)
 * Demonstrates how to choreograph complex fights using keyframes + interpolation
 */
export const ComboScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define keyframes like in the studio
  const keyframes = [
    { frame: 0, baseX: 700, baseY: 700, angles: { torso: -90, leftShoulder: 120, leftElbow: -60, rightShoulder: 60, rightElbow: -70, leftHip: 75, leftKnee: 30, rightHip: 105, rightKnee: 15 } },
    { frame: 12, baseX: 720, baseY: 700, angles: { torso: -85, leftShoulder: 120, leftElbow: -60, rightShoulder: -45, rightElbow: 90, leftHip: 75, leftKnee: 30, rightHip: 105, rightKnee: 15 } }, // windup jab
    { frame: 20, baseX: 760, baseY: 700, angles: { torso: -80, leftShoulder: 110, leftElbow: -80, rightShoulder: 15, rightElbow: 5, leftHip: 80, leftKnee: 20, rightHip: 110, rightKnee: 10 } }, // jab extend
    { frame: 30, baseX: 740, baseY: 695, angles: { torso: -100, leftShoulder: 90, leftElbow: -80, rightShoulder: 100, rightElbow: -60, leftHip: 60, leftKnee: 40, rightHip: 90, rightKnee: 30 } }, // spin windup
    { frame: 45, baseX: 780, baseY: 700, angles: { torso: -70, leftShoulder: 120, leftElbow: -60, rightShoulder: -10, rightElbow: 10, leftHip: 80, leftKnee: 25, rightHip: 15, rightKnee: 5 } }, // roundhouse
    { frame: 60, baseX: 700, baseY: 700, angles: { torso: -90, leftShoulder: 120, leftElbow: -60, rightShoulder: 60, rightElbow: -70, leftHip: 75, leftKnee: 30, rightHip: 105, rightKnee: 15 } }, // return guard
  ];

  // Find current segment
  let prev = keyframes[0];
  let next = keyframes[keyframes.length - 1];
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame && frame <= keyframes[i + 1].frame) {
      prev = keyframes[i];
      next = keyframes[i + 1];
      break;
    }
  }

  const t = (frame - prev.frame) / Math.max(1, next.frame - prev.frame);
  const eased = spring({ frame: t * 30, fps, config: { damping: 12, mass: 0.5 } });

  const lerp = (a: number, b: number) => interpolate(eased, [0, 1], [a, b]);

  const current = {
    baseX: lerp(prev.baseX, next.baseX),
    baseY: lerp(prev.baseY, next.baseY),
    angles: {
      torso: lerp(prev.angles.torso, next.angles.torso),
      leftShoulder: lerp(prev.angles.leftShoulder, next.angles.leftShoulder),
      leftElbow: lerp(prev.angles.leftElbow, next.angles.leftElbow),
      rightShoulder: lerp(prev.angles.rightShoulder, next.angles.rightShoulder),
      rightElbow: lerp(prev.angles.rightElbow, next.angles.rightElbow),
      leftHip: lerp(prev.angles.leftHip, next.angles.leftHip),
      leftKnee: lerp(prev.angles.leftKnee, next.angles.leftKnee),
      rightHip: lerp(prev.angles.rightHip, next.angles.rightHip),
      rightKnee: lerp(prev.angles.rightKnee, next.angles.rightKnee),
    }
  };

  return (
    <svg width={1920} height={1080} style={{ backgroundColor: '#0a0a0f' }}>
      <AdvancedStickman {...current} />
    </svg>
  );
};
