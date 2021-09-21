import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function WarningButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.orange[100]}
			backgroundColor={Colors.orange[8]}
			borderColor={Colors.transparent}
			hoverColor={Colors.orange[100]}
			hoverBackgroundColor={Colors.orange[10]}
		/>
	);
}
