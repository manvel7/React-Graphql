import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function DefaultButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.gray[100]}
			backgroundColor={Colors.white}
			borderColor={Colors.neutralBlue[40]}
			hoverColor={Colors.blue[100]}
			hoverBorderColor={Colors.blue[100]}
		/>
	);
}
