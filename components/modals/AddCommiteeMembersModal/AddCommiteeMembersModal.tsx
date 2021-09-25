import React, { useState, useEffect, useContext } from 'react';

import { UserAccount, Committee } from '@epolitiker/api';
import { CommitteeMemberRole } from '@epolitiker/api/dist/generated';

import {
	ModalButtonContent,
	AutoComplete,
	CommitteeMembersList,
	ModalBodyContent,
	ModalOptionsBlock,
	PageInfoText,
	RemovableBadgeContainer,
	RemovableBadgeTitle,
	SelectedUsersBadgeList
} from './AddCommiteeMembersModal.style';

import {
	useAlerts,
	useEffectOnce,
	useWorkspaceMembersLazyQuery,
	useAddOrRemoveCommitteePrivateMemberMutation,
	useCommitteePrivateMembersLazyQuery,
	useBreadcrumbs,
	useNavigation,
	useTranslation,
	useLocalStorage,
	useWorkspaceCommitteesLazyQuery
} from '../../../hooks';

import { MemberDefaultCardWithCheckbox } from '../../cards';

import { ButtonSize, Modal, PrimaryButton, GhostButton, DefaultButton } from '../../ui';

import { IconType, StorageKey } from '../../../consts';
import { CommitteeContext } from '../../../pages';

interface IAddCommiteeMembersModalProps {
	openAddCommitteeMemberModal: boolean;
	setOpenAddCommitteeMemberModal: (openAddCommitteeMemberModal: boolean) => void;
	committeePrivateMembersLoading?: boolean;
	newMemberRole: CommitteeMemberRole;
}

export function AddCommiteeMembersModal({
	openAddCommitteeMemberModal,
	setOpenAddCommitteeMemberModal,
	committeePrivateMembersLoading,
	newMemberRole
}: IAddCommiteeMembersModalProps) {
	const { committee } = useContext(CommitteeContext);
	if (!committee) {
		return null;
	}

	const { id: committeeId } = committee;
	const { setNotification } = useAlerts();
	const { setBreadcrumbs } = useBreadcrumbs();
	const { routes } = useNavigation();
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [addedPrivateMember] = useState<UserAccount>();

	const [usersToInvite, setUsersToInvite] = useState<UserAccount[]>([]);
	const [activeCommittee, setActiveCommittee] = useState<Committee | undefined>(undefined);
	const [committees, setCommittees] = useState<Committee[]>([]);
	const [committeeMembers, setCommitteeMembers] = useState<UserAccount[]>([]);
	const [workspaceMembersList, setWorkspaceMembersList] = useState<UserAccount[]>([]);

	const [
		getCommitteeMembers,
		{ data: committeeMembersData, loading: committeeMembersLoading }
	] = useCommitteePrivateMembersLazyQuery();

	const [getWorkspaceMembers, { data: workspaceMembersData }] = useWorkspaceMembersLazyQuery();

	const [
		addCommitteePrivateMember,
		{ data: addCommitteePrivateMemberData, loading: addCommitteePrivateMemberLoading }
	] = useAddOrRemoveCommitteePrivateMemberMutation();

	const [
		workspaceCommittees,
		{ data: workspaceCommitteesData }
	] = useWorkspaceCommitteesLazyQuery();

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
		handleGetWorkspaceMembers();
		handleGetCommittees();
	});

	useEffect(() => {
		if (addedPrivateMember) {
			handleAddCommitteePrivateMember();
		}
	}, [addedPrivateMember]);

	// Get workspace members
	function handleGetWorkspaceMembers() {
		if (activeWorkspace) {
			getWorkspaceMembers({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					}
				}
			});
		}
	}

	useEffect(() => {
		if (workspaceMembersData) {
			setWorkspaceMembersList(workspaceMembersData.workspaceDetails.members);
			setCommitteeMembers(workspaceMembersData.workspaceDetails.members);
		}
	}, [workspaceMembersData]);

	// Add committee member
	function handleAddCommitteePrivateMember() {
		addCommitteePrivateMember({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: committeeId
					},
					committeeDetailsInput: {
						members: {
							create: usersToInvite.map(userAccount => ({
								role: newMemberRole,
								user: {
									connect: { id: userAccount.id }
								}
							}))
						}
					}
				}
			}
		});
	}

	function handleAddSingleCommitteePrivateMember(user: UserAccount) {
		addCommitteePrivateMember({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: committeeId
					},
					committeeDetailsInput: {
						members: {
							create: [
								{
									role: newMemberRole,
									user: {
										connect: { id: user.id }
									}
								}
							]
						}
					}
				}
			}
		});
	}

	useEffect(() => {
		if (addCommitteePrivateMemberData) {
			setNotification({ message: 'User Account Added to Committee' });
			setOpenAddCommitteeMemberModal(false);
		}
	}, [addCommitteePrivateMemberData]);

	function handleAddUserToList(user: UserAccount) {
		if (!usersToInvite.some(u => u.id === user.id)) {
			setUsersToInvite(state => [...state, user]);
		}
	}

	function handleRemoveUserFromList(user: UserAccount) {
		setUsersToInvite(usersToInvite.filter(member => member.id !== user.id));
	}

	// Get workspace committees
	function handleGetCommittees() {
		if (activeWorkspace) {
			workspaceCommittees({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					}
				}
			});
		}
	}
	useEffect(() => {
		if (workspaceCommitteesData) {
			setCommittees(workspaceCommitteesData.workspaceDetails.committees);
		}
	}, [workspaceCommitteesData]);

	useEffect(() => {
		if (activeCommittee) {
			handleGetCommitteeMembers();
		} else {
			setCommitteeMembers(workspaceMembersList);
		}
	}, [activeCommittee]);

	function handleGetCommitteeMembers() {
		if (activeCommittee) {
			getCommitteeMembers({
				variables: {
					data: {
						committeeWhereUniqueInput: { id: activeCommittee.id }
					}
				}
			});
		}
	}

	useEffect(() => {
		if (committeeMembersData) {
			const tempMembers: UserAccount[] = [];

			committeeMembersData.committeeDetails.members.forEach(committeeMember => {
				tempMembers.push(committeeMember.user);
			});

			setCommitteeMembers(tempMembers);
		}
	}, [committeeMembersData]);

	function onSelect(checked: boolean, user: UserAccount) {
		if (checked) {
			handleAddUserToList(user);
		} else {
			handleRemoveUserFromList(user);
		}
	}

	return (
		<Modal
			title={translate(({ titles }) => titles.members)}
			open={openAddCommitteeMemberModal}
			onClose={() => setOpenAddCommitteeMemberModal(false)}
		>
			<Modal.Body>
				<ModalBodyContent>
					<ModalOptionsBlock>
						<SelectedUsersBadgeList>
							{usersToInvite.length > 0 &&
								usersToInvite.map(userAccount => (
									<RemovableBadgeContainer key={userAccount.id}>
										<RemovableBadgeTitle>
											{`${userAccount.firstName} ${userAccount.lastName}`}
										</RemovableBadgeTitle>
										<GhostButton
											size={ButtonSize.SM}
											icon={IconType.EpTimes}
											onClick={() => handleRemoveUserFromList(userAccount)}
										/>
									</RemovableBadgeContainer>
								))}
						</SelectedUsersBadgeList>

						<AutoComplete
							value={activeCommittee ? activeCommittee.label : 'No-committee members'}
							disabled={committeePrivateMembersLoading || committeeMembersLoading}
						>
							<AutoComplete.Item
								key={'select-workspace-members'}
								onClick={() => setActiveCommittee(undefined)}
							>
								No-committee members
							</AutoComplete.Item>
							{committees.map(committee => (
								<AutoComplete.Item
									key={committee.id}
									onClick={() => setActiveCommittee(committee)}
								>
									{committee.label}
								</AutoComplete.Item>
							))}
						</AutoComplete>
					</ModalOptionsBlock>

					<CommitteeMembersList>
						{committeeMembers.length > 0 ? (
							committeeMembers.map(member => (
								<MemberDefaultCardWithCheckbox
									key={member.id}
									member={member}
									onClick={() => handleAddUserToList(member)}
									onAddClick={() => handleAddSingleCommitteePrivateMember(member)}
									onSelect={(checked, user) => onSelect(checked, user)}
									isSelected={usersToInvite.some(user => user.id === member.id)}
									disabled={committee?.members.some(
										committeeMember => committeeMember.user.id === member.id
									)}
								/>
							))
						) : (
							<PageInfoText>No committee Members</PageInfoText>
						)}
					</CommitteeMembersList>
				</ModalBodyContent>
			</Modal.Body>
			<Modal.Footer>
				<ModalButtonContent>
					<DefaultButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={() => setOpenAddCommitteeMemberModal(false)}
					/>
				</ModalButtonContent>
				<PrimaryButton
					size={ButtonSize.LG}
					title={translate(({ buttons }) => buttons.invite)}
					onClick={handleAddCommitteePrivateMember}
					loading={addCommitteePrivateMemberLoading}
					disabled={usersToInvite.length < 1 || addCommitteePrivateMemberLoading}
				/>
			</Modal.Footer>
		</Modal>
	);
}
