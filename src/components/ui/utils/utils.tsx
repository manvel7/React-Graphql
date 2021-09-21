import React from 'react';

import { DotBlock, DotContent, NotificationContainer, NotificationText } from './utils.style';
import { Colors } from '../../../environment';

interface DotProps {
	className?: string;
	color?: string;
	size?: number;
}

export function Dot({ className, color = Colors.overlay[40], size = 10 }: DotProps) {
	return (
		<DotBlock size={size} className={className}>
			<DotContent color={color} />
		</DotBlock>
	);
}

interface NotificationProps {
	children: React.ReactNode;
}

export function Notification({ children }: NotificationProps) {
	return (
		<NotificationContainer>
			<NotificationText>{children}</NotificationText>
		</NotificationContainer>
	);
}
