import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function PrimaryButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.white}
			backgroundColor={Colors.blue[100]}
			borderColor={Colors.blue[100]}
			hoverColor={Colors.white}
			hoverBackgroundColor={Colors.primaryBtnHover}
		/>
	);
}
