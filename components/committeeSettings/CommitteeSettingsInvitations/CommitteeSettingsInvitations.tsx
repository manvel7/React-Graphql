import React, { useContext, useEffect, useState } from 'react';
import { Committee, UserAccount } from '@epolitiker/api';
import {
	CommitteeSettingsInvitationsContainer,
	InvitationsSubTitle,
	ComponentBlock,
	InvitationsButton,
	ComponentUserBlock,
	InvitationsText,
	InvitationsUserTitle,
	ComponentBlockCards,
	CommitteeUserMessage,
	MemberDefaultCard,
	ActionBlock,
	ModalBodyContent,
	ModalOptionsBlock,
	SelectedUsersBadgeList,
	RemovableBadgeContainer,
	RemovableBadgeTitle,
	AutoComplete,
	CommitteeMembersList,
	PageInfoText,
	PrimaryButton,
	Table,
	Thead,
	TBody,
	Th,
	Tr,
	Td
} from './CommitteeSettingsInvitations.style';

import {
	useTranslation,
	useAlerts,
	useNavigation,
	useCommitteePrivateMembersLazyQuery,
	useAddOrRemoveCommitteePrivateMemberMutation
} from '../../../hooks';

import { CommitteeSettingsContext } from '../../../pages';
import { Avatar, AvatarSize, GhostButton, Modal, ButtonSize, DefaultButton } from '../../ui';
import { IconType } from '../../../consts';

export const CommitteeSettingsInvitations = () => {
	const { committee } = useContext(CommitteeSettingsContext);

	if (!committee) {
		return null;
	}

	const { id: committeeId } = committee;
	const translate = useTranslation();
	const { routes, navigate } = useNavigation();
	const { setNotification, setError } = useAlerts();

	const [committeeToInvite, setCommitteeToInvite] = useState<UserAccount[]>([]);
	const [committees] = useState<Committee[]>([]);
	const [committeeMembers, setCommitteeMembers] = useState<UserAccount[]>([]);
	const [workspaceMembersList] = useState<UserAccount[]>([]);
	const [showCommitteeMembersModal, setShowCommitteeMembersModal] = useState(false);
	const [activeCommittee, setActiveCommittee] = useState<Committee>(committee);

	const [
		getCommitteeMembers,
		{ data: committeeMembersData, loading: committeeMembersLoading }
	] = useCommitteePrivateMembersLazyQuery();

	const [
		removeCommitteeSettingsMember,
		{ data: removeCommitteeSettingsMemberData, loading: removeCommitteeSettingsMemberLoading }
	] = useAddOrRemoveCommitteePrivateMemberMutation();

	if (committeeId == undefined) {
		navigate(routes.committees);
		setError({ message: 'Commitee Settings Page not found' });
		return null;
	}

	function handleRemoveCommitteeMember(committeeMemberId: string) {
		removeCommitteeSettingsMember({
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
		if (activeCommittee) {
			handleGetCommitteeMembers();
		} else {
			setCommitteeMembers(workspaceMembersList);
		}
	}, [activeCommittee]);

	function handleShowModal() {
		setShowCommitteeMembersModal(true);
	}

	function handleCloseModal() {
		setShowCommitteeMembersModal(false);
		setCommitteeToInvite([]);
	}

	function handleRemoveUserFromList(user: UserAccount) {
		setCommitteeToInvite(committeeToInvite.filter(member => member.id !== user.id));
	}

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

	function handleAddUserToList(user: UserAccount) {
		if (!committeeToInvite.some(u => u.id === user.id)) {
			setCommitteeToInvite(state => [...state, user]);
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

	useEffect(() => {
		if (removeCommitteeSettingsMemberData) {
			setNotification({ message: 'Member removed from Committee' });
		}
	}, [removeCommitteeSettingsMemberData]);

	return (
		<CommitteeSettingsInvitationsContainer>
			<ComponentBlock>
				<InvitationsSubTitle>
					{translate(({ titles }) => titles.autoInvitation)}
				</InvitationsSubTitle>
				<InvitationsButton
					title={translate(({ buttons }) => buttons.localSettings)}
					leftIcon={IconType.EpPlus}
					onClick={() => {}}
				/>
			</ComponentBlock>
			<ComponentUserBlock>
				<InvitationsSubTitle>
					{translate(({ titles }) => titles.userLists)}
				</InvitationsSubTitle>
				<InvitationsText>
					{translate(({ titles }) => titles.userListRuleText)}
				</InvitationsText>
			</ComponentUserBlock>
			<Modal
				title={translate(({ titles }) => titles.members)}
				open={showCommitteeMembersModal}
				onClose={handleCloseModal}
			>
				<Modal.Body>
					<ModalBodyContent>
						<ModalOptionsBlock>
							<SelectedUsersBadgeList>
								{committeeToInvite.length > 0 &&
									committeeToInvite.map(userAccount => (
										<RemovableBadgeContainer key={userAccount.id}>
											<RemovableBadgeTitle>
												{`${userAccount.firstName} ${userAccount.lastName}`}
											</RemovableBadgeTitle>
											<GhostButton
												size={ButtonSize.SM}
												icon={IconType.EpTimes}
												onClick={() =>
													handleRemoveUserFromList(userAccount)
												}
											/>
										</RemovableBadgeContainer>
									))}
							</SelectedUsersBadgeList>

							<AutoComplete
								value={
									activeCommittee ? activeCommittee.label : 'No-committee members'
								}
								disabled={committeeMembersLoading}
							>
								<AutoComplete.Item
									key={'select-workspace-members'}
									onClick={() => setActiveCommittee(committee)}
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
									<MemberDefaultCard
										key={member.id}
										member={member}
										onClick={() => handleAddUserToList(member)}
										isSelected={committeeMembers.some(
											user => user.id === member.id
										)}
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
					<DefaultButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleCloseModal}
					/>
					<PrimaryButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.invite)}
						onClick={() => {}}
						loading={false}
						disabled={committeeToInvite.length < 1}
					/>
				</Modal.Footer>
			</Modal>

			<ComponentBlockCards>
				<Table>
					<Thead>
						<Tr>
							<Th>
								<InvitationsUserTitle>
									{translate(({ titles }) => titles.user)}
								</InvitationsUserTitle>
							</Th>
							<Th>
								<InvitationsUserTitle>
									{translate(({ titles }) => titles.membersReplace)}
								</InvitationsUserTitle>
							</Th>
						</Tr>
					</Thead>
					<TBody>
						{committee.members && committee.members.length > 0 ? (
							committee.members.map(member => (
								<Tr key={member.id}>
									<Td>
										<MemberDefaultCard
											member={member.user}
											onClick={() => {}}
										/>
									</Td>
									<Td>
										<Avatar
											image={member.user.avatar?.url}
											size={AvatarSize.XS}
										/>
									</Td>
									<Td>
										<ActionBlock>
											<GhostButton
												icon={IconType.EpEdit}
												onClick={() => {}}
											/>
											<GhostButton
												icon={IconType.EpTrash}
												onClick={() =>
													handleRemoveCommitteeMember(member.id)
												}
												loading={removeCommitteeSettingsMemberLoading}
												disabled={removeCommitteeSettingsMemberLoading}
											/>
										</ActionBlock>
									</Td>
								</Tr>
							))
						) : (
							<CommitteeUserMessage>
								{translate(({ titles }) => titles.committeeMemberEmptyMessage)}
							</CommitteeUserMessage>
						)}
					</TBody>
				</Table>
			</ComponentBlockCards>
			<InvitationsButton
				title={translate(({ buttons }) => buttons.addList)}
				leftIcon={IconType.EpPlus}
				onClick={handleShowModal}
			/>
		</CommitteeSettingsInvitationsContainer>
	);
};
