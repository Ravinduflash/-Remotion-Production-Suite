import React from 'react';

/**
 * three.js primitives rendered inside <ThreeCanvas> from @remotion/three (react-three-fiber JSX).
 * Requires: npm i three @react-three/fiber @remotion/three
 *
 * Coordinate contract (shared with the studio's WebGL overlay):
 *   - Orthographic camera: left=-W/2 right=W/2 top=H/2 bottom=-H/2, position z=1000
 *   - position = [baseX - W/2, H/2 - baseY, depth]  → composition pixels map 1:1 to world units
 *   - mesh scale = size * scale (geometry is unit-sized)
 */

const rad = (deg: number) => (deg * Math.PI) / 180;

export type ThreeShape = 'box' | 'sphere' | 'torusKnot' | 'cylinder' | 'icosahedron';

export interface ThreePrimitiveProps {
  shape?: ThreeShape;
  size?: number;
  color?: string;
  emissive?: string;
  metalness?: number;
  roughness?: number;
  wireframe?: boolean;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  /** filled in by SceneRenderer */
  position?: [number, number, number];
  scale?: number;
  rotation2D?: number;
  opacity?: number;
}

export const ThreePrimitive: React.FC<ThreePrimitiveProps> = ({
  shape = 'box', size = 200, color = '#bf5af2', emissive = '#000000', metalness = 0.4, roughness = 0.35, wireframe = false,
  rotX = 0, rotY = 0, rotZ = 0, position = [0, 0, 0], scale = 1, rotation2D = 0, opacity = 1,
}) => {
  const s = size * scale;
  return (
    <mesh position={position} rotation={[rad(rotX), rad(rotY), rad(rotZ - rotation2D)]} scale={[s, s, s]}>
      {shape === 'sphere' && <sphereGeometry args={[0.5, 48, 32]} />}
      {shape === 'torusKnot' && <torusKnotGeometry args={[0.32, 0.1, 160, 24]} />}
      {shape === 'cylinder' && <cylinderGeometry args={[0.4, 0.4, 1, 48]} />}
      {shape === 'icosahedron' && <icosahedronGeometry args={[0.55, 1]} />}
      {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial color={color} emissive={emissive} metalness={metalness} roughness={roughness} wireframe={wireframe} transparent opacity={opacity} />
    </mesh>
  );
};

/** Default light rig used by SceneRenderer — matches the studio preview. */
export const StudioLights: React.FC = () => (
  <>
    <ambientLight intensity={0.7} />
    <directionalLight position={[400, 600, 1000]} intensity={1.2} />
    <directionalLight position={[-600, -200, 400]} intensity={0.4} color="#64d2ff" />
  </>
);
