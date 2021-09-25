import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function GhostButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.typoPlaceholder}
			backgroundColor={Colors.transparent}
			borderColor={Colors.transparent}
			hoverColor={Colors.blue[100]}
			hoverBackgroundColor={'rgba(16, 90, 202, 0.08)'}
		/>
	);
}
