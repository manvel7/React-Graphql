import React from 'react';

import { BadgeContainer, BadgeTitle, BadgeIcon } from './Badge.style';

export enum BadgeTypes {
	Default = 'default',
	Primary = 'primary',
	Warning = 'warning',
	Success = 'success',
	Purple = 'purple'
}

interface BadgeProps {
	className?: string;
	title?: string;
	type?: string;
	leftIcon?: string;
}

export function Badge({ title, type = BadgeTypes.Primary, leftIcon, className }: BadgeProps) {
	return (
		<BadgeContainer className={className} type={type}>
			{!!leftIcon && <BadgeIcon name={leftIcon} size={16} />}
			<BadgeTitle>{title}</BadgeTitle>
		</BadgeContainer>
	);
}
