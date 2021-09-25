import React, { useState, useEffect } from 'react';

import { UserAccount } from '@epolitiker/api';

import {
	DrawerCardHeaderContainer,
	CardHeaderAvatarBlock,
	CardHeaderInfoBlock,
	CardHeaderInfoTitle,
	CardHeaderInfoItem,
	CardTypoText,
	CardInfoText,
	CardLinkText,
	CardHeaderActionsBlock,
	PrimaryButton,
	LightButton
} from './DrawerCardHeader.style';
import { Avatar, AvatarSize, Dropdown, Badge } from '../../../ui';
import { IconType } from '../../../../consts';
import {
	useNavigation,
	IGroupedMemberships,
	useCommitteeMembershipPositionList,
	useTranslation
} from '../../../../hooks';

interface DrawerCardHeaderProps {
	member: UserAccount;
	membershipGroups: IGroupedMemberships[];
}

export function DrawerCardHeader({ member, membershipGroups }: DrawerCardHeaderProps) {
	const { navigate, routes } = useNavigation();
	const translate = useTranslation();
	const committeePositions = useCommitteeMembershipPositionList();
	const [showMore, setShowMore] = useState(false);

	function handleNavigateToMemberProfilePage() {
		if (member) {
			navigate(routes.userProfile(member.id));
		}
	}

	function handleShowMore() {
		setShowMore(true);
	}

	useEffect(() => {
		return () => setShowMore(false);
	}, [member]);

	return (
		<DrawerCardHeaderContainer>
			<CardHeaderAvatarBlock>
				<Avatar
					image={member?.avatar?.url}
					badge={member?.partyMembership?.party?.logo?.url}
					size={AvatarSize.LG}
				/>
			</CardHeaderAvatarBlock>
			<CardHeaderInfoBlock>
				<CardHeaderInfoTitle>
					{`${member.firstName} ${member.lastName}`}
				</CardHeaderInfoTitle>
				{member.partyMembership && (
					<CardHeaderInfoItem>
						<CardTypoText>{member.partyMembership.party?.name}</CardTypoText>
						<Badge title={member.partyMembership.role} />
					</CardHeaderInfoItem>
				)}
				{membershipGroups
					.slice(0, showMore ? membershipGroups.length : 1)
					.map(membershipGroup => (
						<CardHeaderInfoItem key={membershipGroup.committee.id}>
							<CardInfoText>{membershipGroup.committee.label}</CardInfoText>
							<Badge
								title={
									committeePositions.find(
										position =>
											position.value ===
											membershipGroup.memberships[0].position
									)?.title
								}
							/>
						</CardHeaderInfoItem>
					))}

				{membershipGroups.length > 1 && !showMore && (
					<CardLinkText onClick={handleShowMore}>
						{`${translate(
							({ buttons }) => buttons.showMore
						)} (${membershipGroups.length - 1})`}
					</CardLinkText>
				)}

				<CardHeaderActionsBlock>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.message)}
						leftIcon={IconType.EpRegComment}
						onClick={() => {}}
					/>
					<LightButton
						title={translate(({ buttons }) => buttons.profilePage)}
						leftIcon={IconType.EpExternalLink}
						onClick={handleNavigateToMemberProfilePage}
					/>
					<Dropdown>
						<Dropdown.Item onClick={handleNavigateToMemberProfilePage}>
							{translate(({ buttons }) => buttons.edit)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => {}}>
							{translate(({ buttons }) => buttons.deactivateAccount)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => {}}>
							{translate(({ buttons }) => buttons.delete)}
						</Dropdown.Item>
					</Dropdown>
				</CardHeaderActionsBlock>
			</CardHeaderInfoBlock>
		</DrawerCardHeaderContainer>
	);
}
