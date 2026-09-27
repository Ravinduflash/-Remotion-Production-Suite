import React from 'react';
import { Composition } from 'remotion';
import { SceneRenderer, SceneState } from './SceneRenderer';
// scene.json is what the studio's "EXPORT JSON" box produces (needs "resolveJsonModule": true — Remotion templates enable it)
import sceneJson from './scene.json';

const scene = sceneJson as unknown as SceneState;

/**
 * Register in src/index.ts:  import { RemotionRoot } from './remotion/Root'; registerRoot(RemotionRoot);
 * Alternative: drop the studio's exported MasterScene.tsx + Root.tsx next to this folder instead of scene.json.
 */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="MasterScene"
      component={SceneRenderer as unknown as React.FC<Record<string, unknown>>}
      durationInFrames={scene.totalFrames}
      fps={scene.fps}
      width={scene.width}
      height={scene.height}
      defaultProps={{ scene }}
    />
  </>
);
