import React from 'react';
import { AvatarContainer, AvatarMainImage, AvatarBadge, AvatarActiveFlag } from './Avatar.style';
import { Images } from '../../../environment';

export enum AvatarSize {
	XXS = 16,
	XS = 24,
	SM = 32,
	MD = 40,
	LG = 56,
	XL = 64,
	XXL = 90
}

export enum AvatarBadgeSize {
	XS = 16,
	SM = 24,
	MD = 30,
	LG = 32
}

interface AvatarProps {
	className?: string;
	size?: AvatarSize;
	image: string | undefined;
	badge?: string;
	badgeSize?: AvatarBadgeSize;
	active?: boolean;
	onClick?: () => void;
}

export function Avatar({
	className,
	image = Images.avatar,
	size = AvatarSize.MD,
	badge,
	badgeSize = AvatarBadgeSize.LG,
	active,
	onClick
}: AvatarProps) {
	return (
		<AvatarContainer className={className} onClick={onClick}>
			{active && <AvatarActiveFlag />}
			<AvatarMainImage src={image} width={size} height={size} />
			{!!badge && (
				<AvatarBadge
					src={badge}
					width={badgeSize}
					height={badgeSize}
					right={badgeSize / 2}
				/>
			)}
		</AvatarContainer>
	);
}
