import React from 'react';
import { Composition } from 'remotion';
import { MasterScene, SCENE } from './MasterScene';

/**
 * MasterScene.tsx is (re)written by mcp/server.mjs before every render from the studio's export.
 * The composition metadata (size, fps, duration) always follows the exported SCENE, so a 9:16
 * scene renders as 1080x1920 without touching this file.
 */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="MasterScene"
      component={MasterScene}
      durationInFrames={SCENE.totalFrames}
      fps={SCENE.fps}
      width={SCENE.width}
      height={SCENE.height}
    />
  </>
);
