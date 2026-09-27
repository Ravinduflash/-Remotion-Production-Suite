// Source: Remotion Elements — "Number Counter" (data/number-counter), https://remotion.dev
// Saved verbatim via MCP write_component_file. Registered as catalog id "community_number_counter".
// Needs: remotion >= 4.0.5xx (Interactive.Div), @remotion/google-fonts (Inter, loaded at render time).
import {loadFont} from '@remotion/google-fonts/Inter';
import React from 'react';
import {Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';

loadFont('normal', {
	subsets: ['latin'],
	weights: ['800'],
});

export const NumberCounter: React.FC = () => {
	const frame = useCurrentFrame();

	const progress = interpolate(frame, [0, 90], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.exp),
	});

	const current = Math.round(progress * 24813);

	return (
		<Interactive.Div
			name="Container"
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'Inter',
				fontSize: 150,
				fontWeight: 800,
				color: '#171717',
				fontVariantNumeric: 'tabular-nums',
				letterSpacing: '-0.03em',
				lineHeight: 1,
			}}
		>
			{current.toLocaleString('en-US')}
		</Interactive.Div>
	);
};
