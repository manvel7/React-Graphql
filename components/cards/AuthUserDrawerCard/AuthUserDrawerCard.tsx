import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

import { UserAccount } from '@epolitiker/api';

import {
	MemberDrawerCardContainer,
	CardSubHeadingText,
	CardDefaultText,
	NavTabContainer,
	NavTabItem,
	CardMainContent,
	CardContentItem,
	CardContentEmailPhoneBlock,
	CardContentEmailPhoneItem,
	MembershipCardContainer,
	MembershipCardImageBlock,
	MembershipCardImage,
	MembershipCardTitle,
	MembershipCardTypoText,
	MembershipCardInfoText,
	MembershipCardInfoBlock,
	CommitteesContainer
} from './AuthUserDrawerCard.style';
import {
	IGroupedMemberships,
	useGroupedCommitteeMemberships,
	useTranslation
} from '../../../hooks';
import { DrawerCommitteeCard } from '../MemberDrawerCard/DrawerCommitteeCard';
import { DrawerCardHeader } from '../MemberDrawerCard/DrawerCardHeader';
import { Nullable } from '../../../types';

export enum userDrawerCardProps {
	Craditionals = 'height'
}

interface UserDrawerCardProps {
	user: Nullable<UserAccount>;
	height?: userDrawerCardProps.Craditionals;
}

export function AuthUserDrawerCard({
	user,
	height = userDrawerCardProps.Craditionals
}: UserDrawerCardProps) {
	if (!user) {
		return null;
	}

	const translate = useTranslation();
	const [groupedMemberships, setGroupedMemberships] = useState<IGroupedMemberships[]>([]);
	const [activeTab, setActiveTab] = useState(2);

	useEffect(() => {
		const groupedMemberships = useGroupedCommitteeMemberships(user.committeeMemberships);
		setGroupedMemberships(groupedMemberships);
	}, [user]);

	const getWorkspaceMembershipYear = useCallback((date: string) => {
		const d = new Date(date);
		const year = moment(d).format('YYYY');
		return `Member since ${year} to present`;
	}, []);

	const getWorkspaceMembershipJoinedDate = useCallback((date: string) => {
		const d = new Date(date);
		const joinedDate = moment(d).format('D MMM, YYYY');
		return `Joined on ${joinedDate}`;
	}, []);

	return (
		<MemberDrawerCardContainer height={height}>
			<DrawerCardHeader member={user} membershipGroups={groupedMemberships} />

			<NavTabContainer>
				<NavTabItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
					{translate(({ tabs }) => tabs.activity)}
				</NavTabItem>
				<NavTabItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
					{translate(({ tabs }) => tabs.personalInfo)}
				</NavTabItem>
			</NavTabContainer>
			<CardMainContent>
				{activeTab === 2 && (
					<>
						<CardContentItem>
							<CardContentEmailPhoneBlock>
								<CardContentEmailPhoneItem>
									<CardSubHeadingText>
										{translate(({ titles }) => titles.email)}
									</CardSubHeadingText>
									<CardDefaultText>{user.email}</CardDefaultText>
								</CardContentEmailPhoneItem>

								<CardContentEmailPhoneItem>
									<CardSubHeadingText>
										{translate(({ titles }) => titles.phone)}
									</CardSubHeadingText>
									<CardDefaultText>{user.phoneNumber}</CardDefaultText>
								</CardContentEmailPhoneItem>
							</CardContentEmailPhoneBlock>
						</CardContentItem>
						<CardContentItem>
							<CardSubHeadingText>
								{translate(({ titles }) => titles.personalInfo)}
							</CardSubHeadingText>
							<CardDefaultText>{user.personalInfo}</CardDefaultText>
							{/* <CardLinkText>Show more</CardLinkText> */}
						</CardContentItem>

						<CardContentItem>
							<CardSubHeadingText>
								{translate(({ titles }) => titles.membership)}
							</CardSubHeadingText>
							{user.workspaces.length > 0 &&
								user.workspaces.map(workspace => (
									<MembershipCardContainer key={workspace.id}>
										<MembershipCardImageBlock>
											<MembershipCardImage src={workspace.logo?.url} />
										</MembershipCardImageBlock>
										<MembershipCardInfoBlock>
											<MembershipCardTitle>
												{`${workspace?.name} ${translate(
													({ titles }) => titles.membership
												)}`}
											</MembershipCardTitle>
											<MembershipCardTypoText>
												{getWorkspaceMembershipYear(workspace.createdAt)}
											</MembershipCardTypoText>
											<MembershipCardInfoText>
												{getWorkspaceMembershipJoinedDate(
													workspace.createdAt
												)}
											</MembershipCardInfoText>
										</MembershipCardInfoBlock>
									</MembershipCardContainer>
								))}
						</CardContentItem>

						<CardContentItem>
							<CardSubHeadingText>
								{translate(({ titles }) => titles.committees)}
							</CardSubHeadingText>
							<CommitteesContainer>
								{groupedMemberships.length > 0 &&
									groupedMemberships.map(membershipGroup => (
										<DrawerCommitteeCard
											key={membershipGroup.committee.id}
											membershipGroup={membershipGroup}
										/>
									))}
							</CommitteesContainer>
						</CardContentItem>
					</>
				)}
			</CardMainContent>
		</MemberDrawerCardContainer>
	);
}
