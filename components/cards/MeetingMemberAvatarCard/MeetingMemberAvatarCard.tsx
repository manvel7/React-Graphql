import React, { useState } from 'react';

import { UserAccount } from '@epolitiker/api';

import {
	MeetingMemberAvatarCardContainer,
	CardTitleBlock,
	CardTitle,
	CardSubTitle,
	CardInfoBlock,
	CardInfoItem
} from './MeetingMemberAvatarCard.style';
import { Avatar, AvatarSize, Badge, AvatarBadgeSize } from '../../ui';
import { MemberPopoverCard, MemberPopoverPlacement } from '../MemberPopoverCard';

interface MeetingMemberAvatarCardProps {
	member: UserAccount;
}

export function MeetingMemberAvatarCard({ member }: MeetingMemberAvatarCardProps) {
	const [showPopover, setShowPopover] = useState(false);

	function handleShowPopover() {
		setShowPopover(true);
	}

	function handleHidePopover() {
		setShowPopover(false);
	}

	return (
		<MeetingMemberAvatarCardContainer
			onMouseEnter={handleShowPopover}
			onMouseLeave={handleHidePopover}
		>
			<Avatar
				image={member?.avatar?.url}
				badge={member?.partyMembership?.party?.logo?.url}
				badgeSize={AvatarBadgeSize.SM}
				size={AvatarSize.MD}
				active={true}
			/>
			<CardTitleBlock>
				<CardTitle>{`${member.firstName} ${member.lastName}`}</CardTitle>
				<CardInfoBlock>
					<CardInfoItem>
						<CardSubTitle>{member.partyMembership?.party?.name}</CardSubTitle>
					</CardInfoItem>

					{member.committeeMemberships?.length > 0 && (
						<CardInfoItem>
							<CardSubTitle>
								{member.committeeMemberships[0].committee.label}
							</CardSubTitle>
							<Badge title={member.committeeMemberships[0].position} />
						</CardInfoItem>
					)}
				</CardInfoBlock>
			</CardTitleBlock>
			{showPopover && (
				<MemberPopoverCard member={member} placement={MemberPopoverPlacement.Left} />
			)}
		</MeetingMemberAvatarCardContainer>
	);
}
