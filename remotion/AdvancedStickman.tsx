import React from 'react';

// Helper function to calculate the X/Y coordinates of a joint based on length and angle
const getJointCoords = (startX: number, startY: number, length: number, angleDegrees: number) => {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: startX + length * Math.cos(radians),
    y: startY + length * Math.sin(radians),
  };
};

/**
 * Joint angles. Core joints are required (backwards compatible with the original rig);
 * neck / wrists / ankles are optional extensions used by the Production Suite so the
 * hands, feet, neck and back can each be posed independently.
 * Convention: 90 = straight down, 0 = straight right. Child joints are RELATIVE to their parent.
 */
export interface StickmanAngles {
  torso: number;
  leftShoulder: number;
  leftElbow: number;
  rightShoulder: number;
  rightElbow: number;
  leftHip: number;
  leftKnee: number;
  rightHip: number;
  rightKnee: number;
  neck?: number;       // head tilt relative to torso
  leftWrist?: number;  // hand relative to forearm
  rightWrist?: number;
  leftAnkle?: number;  // foot relative to shin (0 = perpendicular / flat)
  rightAnkle?: number;
}

export interface StickmanProps {
  baseX: number;
  baseY: number;
  angles: StickmanAngles;
  strokeColor?: string;
  leftLimbColor?: string;
  strokeWidth?: number;
  shadow?: boolean;
  showJoints?: boolean;
}

// Segment lengths - tuned for martial arts proportions (shared with catalog.js SEG)
export const SEGMENTS = {
  headRadius: 22,
  neckLength: 15,
  torsoLength: 90,
  upperArmLength: 45,
  forearmLength: 40,
  thighLength: 55,
  shinLength: 50,
  handLength: 12,
  footLength: 18,
};

export const AdvancedStickman: React.FC<StickmanProps> = ({
  baseX,
  baseY,
  angles,
  strokeColor = 'white',
  leftLimbColor = '#ff3b30',
  strokeWidth = 6,
  shadow = true,
  showJoints = true,
}) => {
  const S = SEGMENTS;
  const neck = angles.neck ?? 0;
  const lW = angles.leftWrist ?? 0, rW = angles.rightWrist ?? 0;
  const lA = angles.leftAnkle ?? 0, rA = angles.rightAnkle ?? 0;

  // Spine
  const hipX = baseX;
  const hipY = baseY;
  const shoulder = getJointCoords(hipX, hipY, S.torsoLength, angles.torso);
  const neckPt = getJointCoords(shoulder.x, shoulder.y, S.neckLength, angles.torso + neck);
  const headCenter = getJointCoords(neckPt.x, neckPt.y, S.headRadius, angles.torso + neck);

  // Left arm (Shoulder -> Elbow -> Wrist -> Hand) — forward kinematics, each child inherits parent rotation
  const leftElbow = getJointCoords(shoulder.x, shoulder.y, S.upperArmLength, angles.leftShoulder);
  const leftWrist = getJointCoords(leftElbow.x, leftElbow.y, S.forearmLength, angles.leftShoulder + angles.leftElbow);
  const leftHand = getJointCoords(leftWrist.x, leftWrist.y, S.handLength, angles.leftShoulder + angles.leftElbow + lW);

  // Right arm
  const rightElbow = getJointCoords(shoulder.x, shoulder.y, S.upperArmLength, angles.rightShoulder);
  const rightWrist = getJointCoords(rightElbow.x, rightElbow.y, S.forearmLength, angles.rightShoulder + angles.rightElbow);
  const rightHand = getJointCoords(rightWrist.x, rightWrist.y, S.handLength, angles.rightShoulder + angles.rightElbow + rW);

  // Left leg (Hip -> Knee -> Foot -> Toe)
  const leftKnee = getJointCoords(hipX, hipY, S.thighLength, angles.leftHip);
  const leftFoot = getJointCoords(leftKnee.x, leftKnee.y, S.shinLength, angles.leftHip + angles.leftKnee);
  const leftToe = getJointCoords(leftFoot.x, leftFoot.y, S.footLength, angles.leftHip + angles.leftKnee + lA - 90);

  // Right leg
  const rightKnee = getJointCoords(hipX, hipY, S.thighLength, angles.rightHip);
  const rightFoot = getJointCoords(rightKnee.x, rightKnee.y, S.shinLength, angles.rightHip + angles.rightKnee);
  const rightToe = getJointCoords(rightFoot.x, rightFoot.y, S.footLength, angles.rightHip + angles.rightKnee + rA - 90);

  const L = (a: { x: number; y: number }, b: { x: number; y: number }, color: string, w = strokeWidth) => (
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={w} />
  );

  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      {shadow && <ellipse cx={hipX} cy={baseY} rx={55} ry={9} fill="black" opacity={0.25} stroke="none" />}

      {/* Spine / Torso / Neck */}
      {L({ x: hipX, y: hipY }, shoulder, strokeColor)}
      {L(shoulder, neckPt, strokeColor)}
      <circle cx={headCenter.x} cy={headCenter.y} r={S.headRadius} fill={strokeColor} stroke={strokeColor} strokeWidth={2} />

      {/* Left side - depth colour */}
      {L(shoulder, leftElbow, leftLimbColor)}
      {L(leftElbow, leftWrist, leftLimbColor)}
      {L(leftWrist, leftHand, leftLimbColor, strokeWidth * 0.8)}
      {L({ x: hipX, y: hipY }, leftKnee, leftLimbColor)}
      {L(leftKnee, leftFoot, leftLimbColor)}
      {L(leftFoot, leftToe, leftLimbColor, strokeWidth * 0.8)}

      {/* Right side */}
      {L(shoulder, rightElbow, strokeColor)}
      {L(rightElbow, rightWrist, strokeColor)}
      {L(rightWrist, rightHand, strokeColor, strokeWidth * 0.8)}
      {L({ x: hipX, y: hipY }, rightKnee, strokeColor)}
      {L(rightKnee, rightFoot, strokeColor)}
      {L(rightFoot, rightToe, strokeColor, strokeWidth * 0.8)}

      {showJoints &&
        [shoulder, leftElbow, rightElbow, { x: hipX, y: hipY }, leftKnee, rightKnee, leftWrist, rightWrist, leftFoot, rightFoot].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="white" stroke="none" />
        ))}
    </g>
  );
};

export default AdvancedStickman;
