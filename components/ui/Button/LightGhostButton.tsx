import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function LightGhostButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.gray[50]}
			backgroundColor={Colors.transparent}
			borderColor={Colors.gray[80]}
			hoverColor={Colors.blue[100]}
			hoverBorderColor={Colors.blue[100]}
		/>
	);
}
