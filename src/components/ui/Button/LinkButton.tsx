import React from 'react';

import { BaseButton, ButtonProps } from './BaseButton';
import { Colors } from '../../../environment';

export function LinkButton(props: ButtonProps) {
	return (
		<BaseButton
			{...props}
			color={Colors.gray[100]}
			backgroundColor={Colors.transparent}
			borderColor={Colors.transparent}
			hoverBackgroundColor={Colors.gray[8]}
		/>
	);
}
