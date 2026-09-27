// Source: Remotion Elements — "Liquid Contours" (backgrounds/liquid-contours), https://remotion.dev
// Saved verbatim via MCP write_component_file. Registered as catalog id "community_liquid_contours".
// Needs: remotion >= 4.0.5xx (<Solid> + effects), @remotion/effects (same version as remotion).
import {liquidContours} from '@remotion/effects/liquid-contours';
import React from 'react';
import {interpolate, Solid, useCurrentFrame, useVideoConfig} from 'remotion';

export const LiquidContours: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, width} = useVideoConfig();

	return (
		<Solid
			color="#dff4ff"
			width={width}
			height={height}
			effects={[
				liquidContours({
					firstColor: '#dff4ff',
					secondColor: '#7cc6ff',
					phase: interpolate(frame, [0, 240], [3.23, 4.23]),
				}),
			]}
		/>
	);
};
