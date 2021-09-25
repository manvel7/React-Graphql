import React from 'react';

import { MeetingMember } from '@epolitiker/api';

import {
	MeetingInvitedMemberCardContainer,
	CardTitleBlock,
	CardTitle,
	CardSubTitle,
	CardInfoBlock
} from './MeetingInvitedMemberCard.style';
import { Avatar, AvatarSize, AvatarBadgeSize } from '../../ui';

interface MeetingInvitedMemberCardProps {
	member: MeetingMember;
}

export function MeetingInvitedMemberCard({ member }: MeetingInvitedMemberCardProps) {
	return (
		<MeetingInvitedMemberCardContainer>
			<Avatar
				image={member.user?.avatar?.url}
				badge={member?.user?.partyMembership?.party?.logo?.url}
				size={AvatarSize.MD}
				badgeSize={AvatarBadgeSize.SM}
				active={true}
			/>
			<CardTitleBlock>
				<CardTitle>{`${member.user?.firstName} ${member.user?.lastName}`}</CardTitle>
				{member.user?.partyMembership && (
					<CardInfoBlock>
						<CardSubTitle>
							{`${member.user.partyMembership?.party?.name}, ${member.user?.partyMembership?.role}`}
						</CardSubTitle>
					</CardInfoBlock>
				)}
			</CardTitleBlock>
		</MeetingInvitedMemberCardContainer>
	);
}
