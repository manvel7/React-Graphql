import React from 'react';

import { UserAccount } from '@epolitiker/api';

import {
	MemberPopoverCardWrapper,
	CardPopoverContainer,
	PopoverContent,
	PopoverAvatarBlock,
	PopoverInfoBlock,
	PopoverInfoTitle,
	PopoverInfoItem,
	PopoverTypoText,
	PopoverInfoText,
	PopoverLinkText,
	PrimaryButton,
	PopoverActionsBlock
} from './MemberPopoverCard.style';
import { Avatar, AvatarSize, Badge, LightButton } from '../../ui';
import { IconType } from '../../../consts';
import { useNavigation, useTranslation } from '../../../hooks';

export enum MemberPopoverPlacement {
	Top = 'top',
	Bottom = 'bottom',
	Left = 'left',
	DefaultLeft = 'DefaultLeft'
}

interface MemberPopoverCardProps {
	member: UserAccount;
	placement?: MemberPopoverPlacement;
}

export function MemberPopoverCard({
	member,
	placement = MemberPopoverPlacement.Top
}: MemberPopoverCardProps) {
	const { navigate, routes } = useNavigation();
	const translate = useTranslation();

	function handleNavigateToMemberProfilePage() {
		navigate(routes.userProfile(member.id));
	}

	return (
		<MemberPopoverCardWrapper placement={placement}>
			<CardPopoverContainer>
				<PopoverContent>
					<PopoverAvatarBlock>
						<Avatar
							image={member.avatar?.url}
							badge={member?.partyMembership?.party?.logo?.url}
							size={AvatarSize.LG}
						/>
					</PopoverAvatarBlock>
					<PopoverInfoBlock>
						<PopoverInfoTitle>{`${member.firstName} ${member.lastName}`}</PopoverInfoTitle>
						{member.partyMembership && (
							<PopoverInfoItem>
								<PopoverTypoText>
									{member.partyMembership?.party?.name}
								</PopoverTypoText>
								<Badge title={member.partyMembership.role} />
							</PopoverInfoItem>
						)}
						{member.committeeMemberships.length > 0 &&
							member.committeeMemberships.slice(0, 1).map(committeeMembership => (
								<PopoverInfoItem key={committeeMembership.id}>
									<PopoverInfoText>
										{committeeMembership.committee.label}
									</PopoverInfoText>
									<Badge title={committeeMembership.position} />
								</PopoverInfoItem>
							))}
						{member.committeeMemberships.length > 1 && (
							<PopoverInfoItem>
								<PopoverLinkText>
									{`+${member.committeeMemberships.length - 1} more`}
								</PopoverLinkText>
							</PopoverInfoItem>
						)}

						<PopoverInfoItem>
							<PopoverTypoText>Last activity 5 min ago</PopoverTypoText>
						</PopoverInfoItem>
						<PopoverActionsBlock>
							<PrimaryButton
								title={translate(({ buttons }) => buttons.message)}
								leftIcon={IconType.EpRegComment}
								onClick={() => {}}
							/>
							<LightButton
								title={translate(({ buttons }) => buttons.profilePage)}
								leftIcon={IconType.EpEye}
								onClick={handleNavigateToMemberProfilePage}
							/>
						</PopoverActionsBlock>
					</PopoverInfoBlock>
				</PopoverContent>
			</CardPopoverContainer>
		</MemberPopoverCardWrapper>
	);
}
