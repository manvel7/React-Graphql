import React from 'react';

import { UserAccount, CommitteeMember } from '@epolitiker/api';

import {
	CommitteeMemberCardContainer,
	CardAvatar,
	CardInfo,
	CardInfoTitle,
	CardInfoSubTitle,
	CardInfoRole,
	CardInfoEmail,
	CardOptions,
	OptionsIconContainer,
	OptionsMessageContainer,
	OptionsMessageTitle
} from './CommitteeMemberCard.style';
import { Icon, Badge, BadgeTypes, Avatar, AvatarSize, Dropdown } from '../../ui';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

interface CommitteeMemberCardProps {
	member: CommitteeMember;
	removeAction: (memberID: string) => void;
	removeActionDisabled: boolean;
	onClick: (member: UserAccount) => void;
}

export function CommitteeMemberCard({
	member,
	removeAction,
	removeActionDisabled,
	onClick
}: CommitteeMemberCardProps) {
	const translate = useTranslation();

	return (
		<CommitteeMemberCardContainer onClick={() => onClick(member.user)}>
			<CardAvatar>
				<Avatar
					image={member.user.avatar?.url}
					badge={member?.user.partyMembership?.party?.logo?.url}
					size={AvatarSize.LG}
					active={member.user.active}
				/>
			</CardAvatar>
			<CardInfo>
				<CardInfoTitle>{`${member.user.firstName} ${member.user.lastName}`}</CardInfoTitle>
				<CardInfoSubTitle>Hoyre member</CardInfoSubTitle>
				<CardInfoRole>Finansutval Secretar, other roles in committes</CardInfoRole>
				<CardInfoEmail>{member.user.email}</CardInfoEmail>
				<Badge
					type={BadgeTypes.Default}
					title={'Executive director election process (06/01/2020)'}
					leftIcon={IconType.EpCheck}
				/>
			</CardInfo>
			<CardOptions>
				<OptionsIconContainer>
					<Dropdown>
						<Dropdown.Item onClick={() => {}}>Action 1</Dropdown.Item>
						<Dropdown.Item
							disabled={removeActionDisabled}
							onClick={() => removeAction(member.id)}
						>
							{translate(({ buttons }) => buttons.remove)}
						</Dropdown.Item>
					</Dropdown>
				</OptionsIconContainer>
				<OptionsMessageContainer>
					<OptionsMessageTitle>
						{translate(({ buttons }) => buttons.message)}
					</OptionsMessageTitle>
					<Icon name={IconType.EpRegComment} size={16} />
				</OptionsMessageContainer>
			</CardOptions>
		</CommitteeMemberCardContainer>
	);
}
