import React, { useCallback } from 'react';

import { UserAccount } from '@epolitiker/api';

import {
	MemberCardContainer,
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
} from './MemberCard.style';
import { Icon, Badge, BadgeTypes, Avatar, AvatarSize } from '../../ui';
import { IconType } from '../../../consts';
import { useCommitteeMembershipPositionList, useTranslation } from '../../../hooks';

interface MemberCardProps {
	member: UserAccount;
	onClick: (member: UserAccount) => void;
}

// TODO Change MemberCard View as in figma
export function MemberCard({ member, onClick }: MemberCardProps) {
	const translate = useTranslation();
	const positions = useCommitteeMembershipPositionList();

	function handleOnCardClick() {
		onClick(member);
	}

	const getMembershipFormat = useCallback(() => {
		const label = member.committeeMemberships[0].committee.label;
		const position = positions.find(
			pos => pos.value === member.committeeMemberships[0].position
		)?.title;
		return `${label} ${position}, other roles in committees`;
	}, []);

	return (
		<MemberCardContainer onClick={handleOnCardClick}>
			<CardAvatar>
				<Avatar
					image={member.avatar?.url}
					badge={member.partyMembership?.party?.logo?.url}
					size={AvatarSize.LG}
					active={member.active}
				/>
			</CardAvatar>
			<CardInfo>
				<CardInfoTitle>{`${member.firstName} ${member.lastName}`}</CardInfoTitle>
				{member.partyMembership && (
					<CardInfoSubTitle>{`${member.partyMembership?.party?.name} member`}</CardInfoSubTitle>
				)}
				{member.committeeMemberships.length > 0 && (
					<CardInfoRole>{getMembershipFormat()}</CardInfoRole>
				)}
				<CardInfoEmail>{member.email}</CardInfoEmail>
				{member.active ? (
					<Badge
						type={BadgeTypes.Default}
						title={'Executive director election process (06/01/2020)'}
						leftIcon={IconType.EpCheck}
					/>
				) : (
					<Badge
						type={BadgeTypes.Warning}
						title={'Pending invitation'}
						leftIcon={IconType.EpClockArrow}
					/>
				)}
			</CardInfo>
			<CardOptions>
				<OptionsIconContainer>
					<Icon name={IconType.EpChevronDown} />
				</OptionsIconContainer>
				<OptionsMessageContainer>
					<OptionsMessageTitle>
						{translate(({ buttons }) => buttons.message)}
					</OptionsMessageTitle>
					<Icon name={IconType.EpRegComment} />
				</OptionsMessageContainer>
			</CardOptions>
		</MemberCardContainer>
	);
}
