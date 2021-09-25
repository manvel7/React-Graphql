import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function DangerButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.red[100]}
			backgroundColor={Colors.red[4]}
			borderColor={Colors.transparent}
			hoverColor={Colors.red[100]}
			hoverBackgroundColor={Colors.red[6]}
		/>
	);
}
