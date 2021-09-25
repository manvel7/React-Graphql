import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function LightButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.blue[100]}
			backgroundColor={Colors.blue[8]}
			borderColor={Colors.blue[8]}
			hoverBackgroundColor={Colors.lightBtnHover}
		/>
	);
}
