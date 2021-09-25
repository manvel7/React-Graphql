import React, { useEffect, useState, useContext } from 'react';

import { Committee } from '@epolitiker/api';
import { CommitteeMembership } from '@epolitiker/api/dist/generated';

import {
	PageContainer,
	PageTitle,
	PageSubTitle,
	PageTypoText,
	AutoComplete,
	SelectCommitteeBlock,
	CommitteeItemBlock,
	CommitteeItemHeader,
	AddCommitteBlock
} from './UserMembership.style';
import { Icon, Dropdown, DropdownPosition, GhostButton } from '../../ui';
import { IconType, StorageKey } from '../../../consts';
import {
	useWorkspaceCommitteesLazyQuery,
	useCommitteeMembershipsLazyQuery,
	useEffectOnce,
	useCreateCommitteeMembershipMutation,
	useDeleteCommitteeMembershipMutation,
	IGroupedMemberships,
	useGroupedCommitteeMemberships,
	useTranslation,
	useAlerts,
	useLocalStorage
} from '../../../hooks';
import { UserContext } from '../../../pages';
import { CommitteeMembershipRow } from './CommitteeMembershipRow';
import { SelectPartyBlock } from './SelectPartyBlock';

export function UserMembership() {
	const { user } = useContext(UserContext);
	const translate = useTranslation();
	const { setNotification } = useAlerts();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [committeesList, setCommitteesList] = useState<Committee[]>([]);
	const [committeeMembershipsList, setCommitteeMembershipsList] = useState<CommitteeMembership[]>(
		[]
	);

	const [searchCommitteeByText, setSearchCommitteeByText] = useState('');
	const [membershipsInCommittee, setMembershipsInCommittee] = useState<IGroupedMemberships[]>([]);
	const [membershipsToDelete, setMembershipsToDelete] = useState<string[]>([]);

	const [
		getWorkspaceCommittees,
		{ data: workspaceCommitteesData, loading: workspaceCommitteesLoading }
	] = useWorkspaceCommitteesLazyQuery();

	const [
		getCommitteeMemberships,
		{ data: committeeMembershipsData }
	] = useCommitteeMembershipsLazyQuery();

	const [
		createCommitteeMembership,
		{ data: createCommitteeMembershipData }
	] = useCreateCommitteeMembershipMutation();

	const [
		deleteCommitteeMembershipForMultiple,
		{ data: deleteCommitteeMembershipForMultipleData }
	] = useDeleteCommitteeMembershipMutation();

	useEffect(() => {
		if (activeWorkspace) {
			getWorkspaceCommittees({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					},
					where: {
						label_contains: searchCommitteeByText
					},
					orderBy: 'label_ASC'
				}
			});
		}
	}, [searchCommitteeByText]);

	useEffect(() => {
		if (workspaceCommitteesData) {
			setCommitteesList(workspaceCommitteesData.workspaceDetails.committees);
		}
	}, [workspaceCommitteesData]);

	useEffectOnce(() => {
		handleGetCommitteeMemberships();
	});

	function handleGetCommitteeMemberships() {
		if (activeWorkspace) {
			getCommitteeMemberships({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						where: { user: { id: user?.id } }
					}
				}
			});
		}
	}

	useEffect(() => {
		if (committeeMembershipsData) {
			setCommitteeMembershipsList(committeeMembershipsData.committeeMemberships);
		}
	}, [committeeMembershipsData]);

	// Make CommitteeMemberships grouped by committee
	useEffect(() => {
		const groupedMemberships = useGroupedCommitteeMemberships(committeeMembershipsList);
		setMembershipsInCommittee(groupedMemberships);
	}, [committeeMembershipsList]);

	function handleAddMembershipInCommittee(committee: Committee) {
		const existInList = membershipsInCommittee.find(
			membershipInCommittee => membershipInCommittee.committee.id === committee.id
		);

		if (!existInList) {
			const newObj: IGroupedMemberships = {
				committee: committee,
				memberships: []
			};

			setMembershipsInCommittee([...membershipsInCommittee, newObj]);
		}
	}

	// Delete CommitteeMemberships Group
	function handleDeleteMembershipInCommittee(committeeMemberships: CommitteeMembership[]) {
		const tempIds: string[] = [];
		committeeMemberships.forEach(committeeMembership => {
			tempIds.push(committeeMembership.id);

			deleteCommitteeMembershipForMultiple({
				variables: {
					data: {
						committeeMembershipWhereUniqueInput: {
							id: committeeMembership.id
						}
					}
				}
			});
			setMembershipsToDelete(tempIds);
		});
	}

	useEffect(() => {
		if (deleteCommitteeMembershipForMultipleData) {
			setNotification({ message: 'Committee memberships deleted!' });

			const tempMembershipsList: CommitteeMembership[] = [];
			committeeMembershipsList.forEach(membership => {
				if (!membershipsToDelete.includes(membership.id)) {
					tempMembershipsList.push(membership);
				}
			});

			setCommitteeMembershipsList(tempMembershipsList);
			setMembershipsToDelete([]);
		}
	}, [deleteCommitteeMembershipForMultipleData]);

	// Create Committee Membership request
	function handleAddCommitteeMembership(committee: Committee) {
		createCommitteeMembership({
			variables: {
				data: {
					user: { connect: { id: user?.id } },
					committee: { connect: { id: committee.id } },
					type: 'REGULAR_MEMBER',
					position: 'NO_POSITION',
					sinceDate: new Date(),
					toDate: new Date()
				}
			}
		});
	}

	// Create Committee Membership response
	useEffect(() => {
		if (createCommitteeMembershipData) {
			setNotification({ message: 'Created new committee membership!' });
			setCommitteeMembershipsList([
				...committeeMembershipsList,
				createCommitteeMembershipData.createCommitteeMembership
			]);
		}
	}, [createCommitteeMembershipData]);

	return (
		<PageContainer>
			<SelectPartyBlock />

			<SelectCommitteeBlock>
				<PageTitle>{translate(({ titles }) => titles.committees)}</PageTitle>
				<PageTypoText>
					{translate(({ titles }) => titles.infoAboutCommitteeMembership)}
				</PageTypoText>

				{membershipsInCommittee.length > 0 &&
					membershipsInCommittee.map(membershipInCommittee => (
						<CommitteeItemBlock key={membershipInCommittee.committee.id}>
							<CommitteeItemHeader>
								<Icon name={IconType.EpAvatarIcon} />
								<PageSubTitle>{membershipInCommittee.committee.label}</PageSubTitle>
								<Dropdown position={DropdownPosition.Left}>
									<Dropdown.Item
										onClick={() =>
											handleDeleteMembershipInCommittee(
												membershipInCommittee.memberships
											)
										}
									>
										{translate(({ buttons }) => buttons.remove)}
									</Dropdown.Item>
								</Dropdown>
							</CommitteeItemHeader>

							{membershipInCommittee.memberships.length > 0 &&
								membershipInCommittee.memberships.map(committeeMembership => (
									<CommitteeMembershipRow
										key={committeeMembership.id}
										committeeMembership={committeeMembership}
										memberships={committeeMembershipsList}
										updateMemberships={setCommitteeMembershipsList}
									/>
								))}

							<GhostButton
								title={translate(({ buttons }) => buttons.addMembershipAndPosition)}
								leftIcon={IconType.EpPlus}
								onClick={() =>
									handleAddCommitteeMembership(membershipInCommittee.committee)
								}
							/>
						</CommitteeItemBlock>
					))}

				<AddCommitteBlock>
					<AutoComplete
						searchLoading={workspaceCommitteesLoading}
						searchValue={searchCommitteeByText}
						getSearchValue={(value: string) => setSearchCommitteeByText(value)}
						searchPlaceholder={translate(({ buttons }) => buttons.searchByName)}
						toggleComponent={() => (
							<GhostButton
								title={translate(({ buttons }) => buttons.addCommittee)}
								leftIcon={IconType.EpPlus}
								onClick={() => {}}
							/>
						)}
					>
						{committeesList.map(committee => (
							<AutoComplete.Item
								key={committee.id}
								onClick={() => handleAddMembershipInCommittee(committee)}
							>
								{committee.label}
							</AutoComplete.Item>
						))}
					</AutoComplete>
				</AddCommitteBlock>
			</SelectCommitteeBlock>
		</PageContainer>
	);
}
