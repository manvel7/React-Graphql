import React from 'react';
import { UserAccount } from '@epolitiker/api';

import { Avatar, AvatarSize, Badge, AvatarBadgeSize } from '../../ui';
import {
	MemberDefaultCardContainer,
	CardTitleBlock,
	CardTitle,
	CardSubTitle,
	CardInfoBlock,
	CardInfoItem
} from './MemberDefaultCard.style';
// import { MemberPopoverCard, MemberPopoverPlacement } from '../MemberPopoverCard';

interface MemberDefaultCardProps {
	member: UserAccount;
	onClick: (member: UserAccount) => void;
	isSelected?: boolean;
	disabled?: boolean;
	className?: string;
}

export function MemberDefaultCard({
	member,
	onClick,
	isSelected = false,
	disabled = false,
	className
}: MemberDefaultCardProps) {
	// const [showPopover, setShowPopover] = useState(false);

	// function handleShowPopover() {
	// 	setShowPopover(true);
	// }
	// function handleHidePopover() {
	// 	setShowPopover(false);
	// }

	function handleCardClick() {
		onClick(member);
	}

	return (
		<MemberDefaultCardContainer
			isSelected={isSelected}
			onClick={handleCardClick}
			disabled={disabled}
			className={className}
			// onMouseOver={handleShowPopover}
			// onMouseLeave={handleHidePopover}
		>
			<Avatar
				image={member?.avatar?.url}
				badge={member?.partyMembership?.party?.logo?.url}
				badgeSize={AvatarBadgeSize.SM}
				size={AvatarSize.MD}
			/>
			<CardTitleBlock>
				<CardTitle>{`${member?.firstName || ''} ${member?.lastName || ''}`}</CardTitle>
				<CardInfoBlock>
					<CardInfoItem>
						<CardSubTitle>{member?.partyMembership?.party?.name}</CardSubTitle>
					</CardInfoItem>

					{member?.committeeMemberships?.length > 0 && (
						<CardInfoItem>
							<CardSubTitle>
								{member.committeeMemberships[0].committee.label}
							</CardSubTitle>
							<Badge title={member.committeeMemberships[0].position} />
						</CardInfoItem>
					)}
				</CardInfoBlock>
			</CardTitleBlock>
			{/*{showPopover && (*/}
			{/*	<MemberPopoverCard member={member} placement={MemberPopoverPlacement.DefaultLeft} />*/}
			{/*)}*/}
		</MemberDefaultCardContainer>
	);
}
