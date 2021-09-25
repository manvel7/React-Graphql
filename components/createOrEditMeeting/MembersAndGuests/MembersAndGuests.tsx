import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';

import { Meeting, MeetingMember, Committee, UserAccount } from '@epolitiker/api';

import {
	PageContainer,
	PageFilters,
	FiltersLeftBlock,
	FiltersItem,
	FiltersRightBlock,
	InvitedMembersTable,
	Thead,
	Th,
	Tr,
	Tbody,
	Td,
	TableTimeLeftWrapper,
	TableResponseStatusWrapper,
	TableActionsWrapper,
	PageFooter,
	PageNotificationTextBlock,
	PageNotificationText,
	TabsContainer,
	TabItem,
	TabDivider,
	NotRespondedBlock,
	NotRespondedTitle,
	LightButton,
	PrimaryButton,
	AutoComplete,
	TableAccessTypeBlock,
	CommitteeMembersList,
	PageInfoText,
	ModalBodyContent,
	ModalOptionsBlock,
	SelectedUsersBadgeList,
	RemovableBadgeContainer,
	RemovableBadgeTitle
} from './MembersAndGuests.style';
import {
	SearchInput,
	SortOrFilterMenu,
	Badge,
	Icon,
	Dropdown,
	GhostButton,
	ButtonSize,
	Drawer,
	Modal,
	DefaultButton,
	Notification
} from '../../ui';
import { MeetingInvitedMemberCard, MemberDefaultCard } from '../../cards';
import { IconType, MeetingMemberStatuses, StorageKey } from '../../../consts';
import { MemberDrawerCard } from '../../cards/MemberDrawerCard';
import {
	useTranslation,
	useUpdateMeetingDetailsMutation,
	useCommitteePrivateMembersLazyQuery,
	useWorkspaceCommitteesLazyQuery,
	useEffectOnce,
	useWorkspaceMembersLazyQuery,
	useAlerts,
	useLocalStorage
} from '../../../hooks';

interface MembersAndGuestsProps {
	meeting: Meeting | null;
	setMeeting: (meeting: Meeting) => void;
}

export function MembersAndGuests({ meeting, setMeeting }: MembersAndGuestsProps) {
	const translate = useTranslation();
	const { setNotification } = useAlerts();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [showMemberDrawer, setShowMemberDrawer] = useState(false);
	const [selectedMember, setSelectedMember] = useState<MeetingMember | null>(null);

	const [showNotification, setShowNotification] = useState(true);
	const [showCommitteeMembersModal, setShowCommitteeMembersModal] = useState(false);

	const [usersToInvite, setUsersToInvite] = useState<UserAccount[]>([]);
	const [activeCommittee, setActiveCommittee] = useState<Committee | undefined>(
		meeting?.committee
	);

	const [workspaceMembersList, setWorkspaceMembersList] = useState<UserAccount[]>([]);
	const [committeeMembers, setCommitteeMembers] = useState<UserAccount[]>([]);
	const [committees, setCommittees] = useState<Committee[]>([]);

	const [
		updateMeetingDetails,
		{ data: updateMeetingDetailsData, loading: updateMeetingDetailsLoading }
	] = useUpdateMeetingDetailsMutation();

	const [
		deleteMeetingMembers,
		{ data: deleteMeetingMembersData }
	] = useUpdateMeetingDetailsMutation();

	const [
		committeePrivateMembers,
		{ data: committeePrivateMembersData, loading: committeePrivateMembersLoading }
	] = useCommitteePrivateMembersLazyQuery();

	const [
		workspaceCommittees,
		{ data: workspaceCommitteesData }
	] = useWorkspaceCommitteesLazyQuery();

	const [
		workspaceMembers,
		{ data: workspaceMembersData, loading: workspaceMembersLoading }
	] = useWorkspaceMembersLazyQuery();

	useEffectOnce(() => {
		handleGetCommittees();
		handleGetWorkspaceMembers();
	});

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

	// Get workspace members
	function handleGetWorkspaceMembers() {
		if (activeWorkspace) {
			workspaceMembers({
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
		}
	}, [workspaceMembersData]);

	function handleGetCommitteeMembers() {
		if (activeCommittee) {
			committeePrivateMembers({
				variables: {
					data: {
						committeeWhereUniqueInput: { id: activeCommittee.id }
					}
				}
			});
		}
	}

	useEffect(() => {
		if (committeePrivateMembersData) {
			const tempMembers: UserAccount[] = [];

			committeePrivateMembersData.committeeDetails.members.forEach(committeeMember => {
				tempMembers.push(committeeMember.user);
			});

			setCommitteeMembers(tempMembers);
		}
	}, [committeePrivateMembersData]);

	//Toggle Member Drawer
	function handleToggleMemberDrawer(member: MeetingMember) {
		if (selectedMember && showMemberDrawer && member.id === selectedMember.id) {
			setSelectedMember(null);
			setShowMemberDrawer(false);
			return;
		}
		setSelectedMember(member);
		setShowMemberDrawer(true);
	}

	//Invite members to Meeting
	function handleCreateMeetingMembers() {
		updateMeetingDetails({
			variables: {
				data: {
					meetingWhereUniqueInput: { id: meeting?.id },
					meetingDetailsInput: {
						members: {
							create: usersToInvite.map(userAccount => ({
								user: { connect: { id: userAccount.id } }
							}))
						}
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateMeetingDetailsData) {
			setMeeting(updateMeetingDetailsData.updateMeetingDetails);
			setNotification({ message: 'Member invited successfully!' });
			handleCloseModal();
		}
	}, [updateMeetingDetailsData]);

	// Delete Meeting member
	function handleDeleteMeetingMember(meetingMemberId: string) {
		deleteMeetingMembers({
			variables: {
				data: {
					meetingWhereUniqueInput: { id: meeting?.id },
					meetingDetailsInput: {
						members: {
							delete: [{ id: meetingMemberId }]
						}
					}
				}
			}
		});
	}

	useEffect(() => {
		if (deleteMeetingMembersData) {
			setMeeting(deleteMeetingMembersData.updateMeetingDetails);
			setNotification({ message: 'Member removed!' });
		}
	}, [deleteMeetingMembersData]);

	const getMeetingMemberInvitedDate = useCallback((date: string) => {
		const d = moment(new Date(date)).format('D MMM, HH:mm');
		return d;
	}, []);

	function handleShowModal() {
		setShowCommitteeMembersModal(true);
	}

	function handleCloseModal() {
		setShowCommitteeMembersModal(false);
		setUsersToInvite([]);
	}

	function handleAddUserToList(user: UserAccount) {
		if (!usersToInvite.some(u => u.id === user.id)) {
			setUsersToInvite(state => [...state, user]);
		}
	}

	function handleRemoveUserFromList(user: UserAccount) {
		setUsersToInvite(usersToInvite.filter(member => member.id !== user.id));
	}

	if (!meeting) {
		return (
			<Notification>
				{translate(({ titles }) => titles.saveMeetingAfterYouCanManage)}
			</Notification>
		);
	}

	return (
		<PageContainer>
			<Drawer
				open={showMemberDrawer}
				onClose={() => setShowMemberDrawer(false)}
				title={translate(({ titles }) => titles.profileInfo)}
			>
				<MemberDrawerCard member={selectedMember ? selectedMember.user : null} />
			</Drawer>

			<Modal
				title={translate(({ titles }) => titles.members)}
				open={showCommitteeMembersModal}
				onClose={handleCloseModal}
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
								disabled={committeePrivateMembersLoading || workspaceMembersLoading}
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
									<MemberDefaultCard
										key={member.id}
										member={member}
										onClick={() => handleAddUserToList(member)}
										isSelected={usersToInvite.some(
											user => user.id === member.id
										)}
										disabled={meeting?.members.some(
											meetingMember => meetingMember.user.id === member.id
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
						onClick={handleCreateMeetingMembers}
						loading={updateMeetingDetailsLoading}
						disabled={usersToInvite.length < 1 || updateMeetingDetailsLoading}
					/>
				</Modal.Footer>
			</Modal>

			<PageFilters>
				<FiltersLeftBlock>
					<FiltersItem>
						{`${translate(({ titles }) => titles.invitedMembers)} ${
							meeting?.members?.length ? meeting.members.length : 0
						}`}
					</FiltersItem>
					<GhostButton
						size={ButtonSize.SM}
						icon={IconType.EpPlus}
						tooltip={translate(({ buttons }) => buttons.invite)}
						onClick={handleShowModal}
						disabled={!meeting}
					/>
				</FiltersLeftBlock>
				<FiltersRightBlock>
					<FiltersItem>
						<SortOrFilterMenu
							orderByData={[]}
							orderByValue={''}
							getOrderByValue={() => {}}
						/>
					</FiltersItem>
					<FiltersItem>
						<SearchInput
							placeholder={translate(({ buttons }) => buttons.search)}
							value={''}
							onChange={() => {}}
						/>
					</FiltersItem>
				</FiltersRightBlock>
			</PageFilters>
			{showNotification && (
				<PageNotificationTextBlock>
					<PageNotificationText>
						{translate(({ titles }) => titles.meetingMembersAndGuestsMessage)}
					</PageNotificationText>
					<GhostButton
						title={translate(({ buttons }) => buttons.ok)}
						onClick={() => setShowNotification(false)}
						size={ButtonSize.SM}
					/>
				</PageNotificationTextBlock>
			)}

			<TabsContainer>
				<TabItem active={true} onClick={() => {}}>
					{`${translate(({ tabs }) => tabs.allInvited)} (${
						meeting?.members?.length ? meeting.members.length : 0
					})`}
				</TabItem>
				<TabItem active={false} onClick={() => {}}>
					{translate(({ tabs }) => tabs.guests)}
				</TabItem>
				<TabDivider />
				<TabItem active={false} onClick={() => {}}>
					{translate(({ tabs }) => tabs.goingToAteend)}
				</TabItem>
				<TabItem active={false} onClick={() => {}}>
					{translate(({ tabs }) => tabs.notGoing)}
				</TabItem>
				<TabItem active={false} onClick={() => {}}>
					{translate(({ tabs }) => tabs.noResponseYet)}
				</TabItem>
				<TabDivider />
				<TabItem active={false} onClick={() => {}}>
					{translate(({ tabs }) => tabs.meetingHosts)}
				</TabItem>
			</TabsContainer>

			<NotRespondedBlock>
				<NotRespondedTitle>
					{translate(({ titles }) => titles.userNotRespondedYet)}
				</NotRespondedTitle>
				<LightButton
					leftIcon={IconType.EpBell}
					title={`${translate(({ buttons }) => buttons.reminder)} (12)`}
					onClick={() => {}}
				/>
				<GhostButton
					leftIcon={IconType.EpTimesRound}
					title={`${translate(({ buttons }) => buttons.cancel)} (12)`}
					onClick={() => {}}
				/>
			</NotRespondedBlock>

			<InvitedMembersTable>
				<Thead>
					<Tr>
						<Th>{translate(({ columns }) => columns.admin.user)}</Th>
						<Th>{translate(({ columns }) => columns.admin.status)}</Th>
						<Th>{translate(({ columns }) => columns.admin.timeLeft)}</Th>
						<Th>{translate(({ columns }) => columns.admin.invited)}</Th>
						<Th>{translate(({ columns }) => columns.admin.reason)}</Th>
						<Th>{translate(({ columns }) => columns.admin.accessRights)}</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{meeting &&
						meeting?.members.length > 0 &&
						meeting?.members.map((member: MeetingMember) => (
							<Tr key={member.id} onClick={() => handleToggleMemberDrawer(member)}>
								<Td>
									<MeetingInvitedMemberCard member={member} />
								</Td>
								<Td>
									<TableResponseStatusWrapper>
										<Badge
											title={
												MeetingMemberStatuses.find(
													el => el.value === member.status
												)?.label
											}
											type={
												MeetingMemberStatuses.find(
													el => el.value === member.status
												)?.badgeType
											}
										/>
									</TableResponseStatusWrapper>
								</Td>
								<Td>
									<TableTimeLeftWrapper>
										<Icon name={IconType.EpClock} />
										3:23:45
									</TableTimeLeftWrapper>
								</Td>
								<Td>{getMeetingMemberInvitedDate(member.createdAt)}</Td>
								<Td></Td>
								<Td>
									<TableAccessTypeBlock>
										<AutoComplete value={'View'}>
											<AutoComplete.Item onClick={() => {}}>
												View
											</AutoComplete.Item>
											<AutoComplete.Item onClick={() => {}}>
												Edit and reffer to
											</AutoComplete.Item>
										</AutoComplete>
									</TableAccessTypeBlock>
								</Td>
								<Td>
									<TableActionsWrapper>
										<Dropdown>
											<Dropdown.Item onClick={() => {}}>
												<Dropdown.ItemIcon name={IconType.EpEye} />
												{translate(({ buttons }) => buttons.viewProfile)}
											</Dropdown.Item>
											<Dropdown.Item onClick={() => {}}>
												<Dropdown.ItemIcon name={IconType.EpOpen} />
												{translate(
													({ buttons }) => buttons.reviewAndConfirmReason
												)}
											</Dropdown.Item>
											<Dropdown.Item
												onClick={() => handleDeleteMeetingMember(member.id)}
											>
												<Dropdown.ItemIcon name={IconType.EpTrash} />
												{translate(({ buttons }) => buttons.remove)}
											</Dropdown.Item>
										</Dropdown>
									</TableActionsWrapper>
								</Td>
							</Tr>
						))}
				</Tbody>
			</InvitedMembersTable>
			<PageFooter>
				<GhostButton
					leftIcon={IconType.EpPlus}
					title={translate(({ buttons }) => buttons.invite)}
					onClick={handleShowModal}
					disabled={!meeting}
				/>
			</PageFooter>
		</PageContainer>
	);
}
