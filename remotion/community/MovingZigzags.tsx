// Source: Remotion Elements — "Moving Zigzags" (backgrounds/moving-zigzags), https://remotion.dev
// Saved verbatim via MCP write_component_file. Registered as catalog id "community_moving_zigzags".
// Needs: remotion >= 4.0.5xx (<Solid> + effects), @remotion/effects (same version as remotion).
import {zigzag} from '@remotion/effects/zigzag';
import React from 'react';
import {Solid, useCurrentFrame, useVideoConfig} from 'remotion';

export const MovingZigzags: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, height, width} = useVideoConfig();

	return (
		<Solid
			color="#dff4ff"
			width={width}
			height={height}
			effects={[
				zigzag({
					colors: ['#dff4ff', '#7cc6ff'],
					direction: 'horizontal',
					thickness: 40,
					gap: 0,
					angle: 0,
					offset: (frame / durationInFrames) * 480,
					amplitude: 40,
					wavelength: 160,
				}),
			]}
		/>
	);
};
