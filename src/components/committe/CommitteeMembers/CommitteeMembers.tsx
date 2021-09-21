import React, { useState, useEffect, useContext } from 'react';

import { UserAccount, CommitteeMember } from '@epolitiker/api';

import {
	CommitteeMembersContainer,
	PageFilters,
	FiltersBlock,
	FiltersItem,
	MembersList
} from './CommitteeMembers.style';

import {
	useAlerts,
	useEffectOnce,
	useAddOrRemoveCommitteePrivateMemberMutation,
	useCommitteePrivateMembersLazyQuery,
	useBreadcrumbs,
	useNavigation,
	useTranslation
} from '../../../hooks';

import { EmptyCard, CommitteeMemberCard, MemberDrawerCard } from '../../cards';

import { ButtonSize, GhostButton, Drawer, MembersPageLoader } from '../../ui';

import { IconType } from '../../../consts';
import { CommitteeContext } from '../../../pages';
import { AddCommiteeMembersModal } from '../../modals/AddCommiteeMembersModal';

export function CommitteeMembers() {
	const { committee } = useContext(CommitteeContext);
	if (!committee) {
		return null;
	}

	const { id: committeeId } = committee;
	const { setNotification } = useAlerts();
	const { setBreadcrumbs } = useBreadcrumbs();
	const { routes } = useNavigation();
	const translate = useTranslation();

	const [committeePrivateMembers, setCommitteePrivateMembers] = useState<CommitteeMember[]>([]);
	const [openAddCommitteeMemberModal, setOpenAddCommitteeMemberModal] = useState(false);
	const [showMemberDrawer, setShowMemberDrawer] = useState(false);
	const [selectedMember, setSelectedMember] = useState<UserAccount | null>(null);

	const [
		getCommitteePrivateMembers,
		{ data: committeePrivateMembersData, loading: committeePrivateMembersLoading }
	] = useCommitteePrivateMembersLazyQuery();

	const [
		removeCommitteePrivateMember,
		{ data: removeCommitteePrivateMemberData, loading: removeCommitteePrivateMemberLoading }
	] = useAddOrRemoveCommitteePrivateMemberMutation();

	useEffect(() => {
		if (committee) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.committees),
					to: routes.committees
				},
				{
					label: committee.label,
					to: routes.committeeOverview(committee.id)
				},
				{
					label: translate(({ titles }) => titles.members),
					to: routes.committeeMembers(committee.id),
					active: true
				}
			];

			setBreadcrumbs(breadcrumbsData);
		}
	}, [committee]);

	useEffectOnce(() => {
		handleGetCommitteePrivateMembers();
	});

	function handleGetCommitteePrivateMembers() {
		getCommitteePrivateMembers({
			variables: {
				data: {
					committeeWhereUniqueInput: { id: committeeId }
				},
				where: {},
				orderBy: 'createdAt_DESC'
			}
		});
	}

	useEffect(() => {
		if (committeePrivateMembersData) {
			setCommitteePrivateMembers(committeePrivateMembersData.committeeDetails.members);
		}
	}, [committeePrivateMembersData]);

	function handleOpenAddCommitteeMemberModal() {
		setOpenAddCommitteeMemberModal(true);
	}

	//Remove Member from committee
	function handleRemoveCommitteePrivateMember(committeeMemberId: string) {
		removeCommitteePrivateMember({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: committeeId
					},
					committeeDetailsInput: {
						members: {
							delete: {
								id: committeeMemberId
							}
						}
					}
				}
			}
		});
	}

	useEffect(() => {
		if (removeCommitteePrivateMemberData) {
			setNotification({ message: 'Member removed from Committee' });
		}
	}, [removeCommitteePrivateMemberData]);

	function handleToggleMemberDrawer(member: UserAccount) {
		if (selectedMember && showMemberDrawer && member.id === selectedMember.id) {
			setSelectedMember(null);
			setShowMemberDrawer(false);
			return;
		}
		setSelectedMember(member);
		setShowMemberDrawer(true);
	}

	return (
		<CommitteeMembersContainer>
			<Drawer
				open={showMemberDrawer}
				onClose={() => setShowMemberDrawer(false)}
				title={translate(({ titles }) => titles.profileInfo)}
			>
				<MemberDrawerCard member={selectedMember ? selectedMember : null} />
			</Drawer>
			<AddCommiteeMembersModal
				openAddCommitteeMemberModal={openAddCommitteeMemberModal}
				setOpenAddCommitteeMemberModal={setOpenAddCommitteeMemberModal}
				committeePrivateMembersLoading={committeePrivateMembersLoading}
				newMemberRole="REGULAR"
			/>
			<PageFilters>
				<FiltersBlock>
					<FiltersItem>{`${translate(({ titles }) => titles.numberOfUsers)} ${
						committeePrivateMembers.length
					}`}</FiltersItem>
				</FiltersBlock>
				<FiltersBlock>
					<FiltersItem>Last updated by me</FiltersItem>
					<FiltersItem>Filter</FiltersItem>
					<FiltersItem>Search</FiltersItem>
					<FiltersItem>
						<GhostButton
							icon={IconType.EpPlus}
							size={ButtonSize.MD}
							onClick={handleOpenAddCommitteeMemberModal}
						/>
					</FiltersItem>
				</FiltersBlock>
			</PageFilters>

			<MembersList>
				{committeePrivateMembersLoading ? (
					<MembersPageLoader />
				) : committeePrivateMembers.length > 0 ? (
					committeePrivateMembers.map(member => (
						<CommitteeMemberCard
							key={member.id}
							member={member}
							removeAction={handleRemoveCommitteePrivateMember}
							removeActionDisabled={removeCommitteePrivateMemberLoading}
							onClick={handleToggleMemberDrawer}
						/>
					))
				) : (
					<EmptyCard
						title={translate(({ titles }) => titles.noMembersCommitteeYet)}
						iconName={IconType.EpMembersEmpty}
						buttonTitle={translate(({ titles }) => titles.addMembers)}
						onCustomClick={handleOpenAddCommitteeMemberModal}
						path={routes.members}
					/>
				)}
			</MembersList>
		</CommitteeMembersContainer>
	);
}
