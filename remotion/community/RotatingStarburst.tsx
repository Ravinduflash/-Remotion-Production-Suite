// Source: Remotion Elements — "Rotating Starburst" (backgrounds/rotating-starburst), https://remotion.dev
// Saved verbatim via MCP write_component_file. Registered as catalog id "community_rotating_starburst".
// Needs: remotion >= 4.0.5xx (<Solid> + effects), @remotion/effects (same version as remotion).
import {starburst} from '@remotion/effects/starburst';
import React from 'react';
import {interpolate, Solid, useCurrentFrame, useVideoConfig} from 'remotion';

export const RotatingStarburst: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, width} = useVideoConfig();

	return (
		<Solid
			color="#dff4ff"
			width={width}
			height={height}
			effects={[
				starburst({
					rays: 28,
					colors: ['#dff4ff', '#7cc6ff'],
					rotation: interpolate(frame, [0, 2000], [0, 360]),
					origin: [0.5, 0.5],
				}),
			]}
		/>
	);
};
