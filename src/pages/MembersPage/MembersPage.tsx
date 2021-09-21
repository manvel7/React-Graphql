import React, { useEffect, useState } from 'react';

import { Committee, UserAccount } from '@epolitiker/api';

import {
	ButtonSize,
	DefaultButton,
	Drawer,
	GhostButton,
	Icon,
	MembersPageLoader,
	Modal,
	ModalSizes,
	PageTitlePanel,
	PageTopBar
} from '../../components/ui';
import { MemberCard, MemberDrawerCard } from '../../components/cards';
import {
	FiltersType,
	InviteMemberForm,
	InviteMemberFormValues,
	MembersFilterBar
} from '../../components/members';
import { IconType, StorageKey } from '../../consts';

import {
	useAlerts,
	useBreadcrumbs,
	useCreateCommitteeInWorkspaceMutation,
	useInviteWorkspaceMemberMutation,
	useLocalStorage,
	useNavigation,
	useTranslation,
	useWorkspaceCommitteesLazyQuery,
	useWorkspaceMembersLazyQuery
} from '../../hooks';
import {
	MembersList,
	ModalFooterIconBlock,
	ModalFooterNotificationBlock,
	ModalFooterText,
	ModalPrimaryButton,
	PageContainer,
	PageFooter,
	InviteToCommitteeInputsBlockCommittee,
	FormItems
} from './MembersPage.style';
import { Colors } from '../../environment';
import { EmptyCard } from '../../components/cards/EmptyCard';
import { memberDrawerCardProps } from '../../components/cards/MemberDrawerCard/MemberDrawerCard';
import { CreateCommitteeForm, CreateCommitteeFormValues } from '../../components/committe';

const filtersInitialState = {
	role: ['ADMIN', 'REGULAR'],
	orderBy: 'createdAt_DESC',
	textSearch: ''
};

export function MembersPage() {
	const { setError, setNotification } = useAlerts();
	const { routes, navigate } = useNavigation();
	const { setBreadcrumbs } = useBreadcrumbs();
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [, , removeAuthToken] = useLocalStorage(StorageKey.Token);

	if (!activeWorkspace) {
		setError({ message: 'Can`t find Workspace Members' });
		removeAuthToken();
		navigate(routes.login);
		return null;
	}

	const breadcrumbsData = [
		{
			label: translate(({ titles }) => titles.members),
			to: routes.members
		}
	];

	const [workspaceMembers, setWorkspaceMembers] = useState<UserAccount[]>([]);
	const [filters, setFilters] = useState<FiltersType>(filtersInitialState);

	const [openInviteMemberModal, setOpenInviteMemberModal] = useState(false);
	const [submitFormFromOutside, setSubmitFormFromOutside] = useState(false);
	const [showModalFooterNotification, setShowModalFooterNotification] = useState(false);

	const [showMemberDrawer, setShowMemberDrawer] = useState(false);
	const [selectedMember, setSelectedMember] = useState<UserAccount | null>(null);

	const [, setCommittees] = useState<Committee[]>([]);
	const [modalBodyStep, setModalBodyStep] = useState<number>(1);
	const [submitFromOutside, setSubmitFromOutside] = useState(false);

	const [
		getWorkspaceMembers,
		{ data: workspaceMembersData, loading: workspaceMembersLoading }
	] = useWorkspaceMembersLazyQuery();

	const [
		inviteWorkspaceMember,
		{ data: inviteWorkspaceMemberData, loading: inviteWorkspaceMemberLoading }
	] = useInviteWorkspaceMemberMutation();

	const [
		getWorkspaceCommittees,
		{ data: workspaceCommitteesData }
	] = useWorkspaceCommitteesLazyQuery();

	const [
		createCommitteeInWorkspace,
		{ data: createCommitteeInWorkspaceData, loading: createCommitteeInWorkspaceLoading }
	] = useCreateCommitteeInWorkspaceMutation();

	function handleGetWorkspaceMembers(activeWorkspaceId: string, filterParams: FiltersType) {
		getWorkspaceMembers({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: activeWorkspaceId }
				},
				where: {
					role_in: filterParams.role,
					OR: [
						{ firstName_contains: filterParams.textSearch },
						{ lastName_contains: filterParams.textSearch },
						{ email_contains: filterParams.textSearch },

						{ firstName_in: filterParams.textSearch.split(' ') },
						{ lastName_in: filterParams.textSearch.split(' ') },
						{ email_in: filterParams.textSearch.split(' ') }
					]
				},
				orderBy: filterParams.orderBy
			}
		});
	}

	useEffect(() => {
		if (workspaceMembersData) {
			setWorkspaceMembers(workspaceMembersData.workspaceDetails.members);
		}
	}, [workspaceMembersData]);

	function handleSubmitInviteMemberForm() {
		setSubmitFormFromOutside(true);
	}

	function handleInviteWorkspaceMember(newMemberData: InviteMemberFormValues) {
		inviteWorkspaceMember({
			variables: {
				data: {
					workspaceInput: { id: activeWorkspace.id },
					userAccountInput: {
						email: newMemberData.email,
						firstName: newMemberData.firstName,
						lastName: newMemberData.lastName,
						phoneNumber: newMemberData.phone,
						members: {
							role: newMemberData.memberRole
						},
						partyMembership: {
							create: {
								role: newMemberData.partyRole,
								party: {
									connect: { id: newMemberData.partyId }
								}
							}
						}
					},
					createCommitteeMembersWithoutUserAccount: {
						role: newMemberData.committeeRole,
						committeeWhereUniqueInput: { id: newMemberData.committeeId }
					}
				}
			}
		});
	}

	useEffect(() => {
		if (inviteWorkspaceMemberData) {
			setOpenInviteMemberModal(false);
			setWorkspaceMembers(inviteWorkspaceMemberData.inviteWorkspaceMember.members);

			setNotification({
				message: translate(({ messages }) => messages.inviteMember.success)
			});
		}
	}, [inviteWorkspaceMemberData]);

	function handleGetFiltersParams(field: keyof FiltersType, value: string | string[]) {
		setFilters({ ...filters, [field]: value });
	}

	useEffect(() => {
		handleGetWorkspaceMembers(activeWorkspace.id, filters);
		setBreadcrumbs(breadcrumbsData);
	}, [filters]);

	function handleToggleMemberDrawer(member: UserAccount) {
		if (selectedMember && showMemberDrawer && member.id === selectedMember.id) {
			setSelectedMember(null);
			setShowMemberDrawer(false);
			return;
		}
		setSelectedMember(member);
		setShowMemberDrawer(true);
	}

	//Get committee Workspace
	useEffect(() => {
		if (activeWorkspace) {
			getWorkspaceCommittees({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					}
				}
			});
		}
	}, []);

	useEffect(() => {
		if (workspaceCommitteesData) {
			setCommittees(workspaceCommitteesData.workspaceDetails.committees);
		}
	}, [workspaceCommitteesData]);

	const handleSetStep = () => {
		setModalBodyStep(2);
	};

	function handleCreateCommittee(newCommitteeData: CreateCommitteeFormValues) {
		createCommitteeInWorkspace({
			variables: {
				data: {
					...newCommitteeData,
					workspaceInput: { id: activeWorkspace.id }
				}
			}
		});
	}

	useEffect(() => {
		if (createCommitteeInWorkspaceData) {
			setOpenInviteMemberModal(false);
			setNotification({
				message: translate(({ messages }) => messages.createCommittee.success)
			});
		}
	}, [createCommitteeInWorkspaceData]);

	return (
		<PageContainer>
			<Drawer
				open={showMemberDrawer}
				onClose={() => setShowMemberDrawer(false)}
				title={translate(({ titles }) => titles.profileInfo)}
			>
				<MemberDrawerCard
					member={selectedMember ? selectedMember : null}
					height={memberDrawerCardProps.Craditionals}
				/>
			</Drawer>
			<PageTopBar />
			<PageTitlePanel title={translate(({ titles }) => titles.members)}>
				<GhostButton
					icon={IconType.EpPlus}
					tooltip={translate(({ buttons }) => buttons.invite)}
					size={ButtonSize.SM}
					onClick={() => setOpenInviteMemberModal(true)}
				/>
			</PageTitlePanel>
			{workspaceMembers.length > 0 ? (
				<MembersFilterBar
					count={workspaceMembers.length}
					filters={filters}
					handleFilters={handleGetFiltersParams}
				/>
			) : null}

			<MembersList>
				{workspaceMembersLoading ? (
					<MembersPageLoader />
				) : workspaceMembers.length > 0 ? (
					workspaceMembers.map((member: UserAccount) => (
						<MemberCard
							key={member.id}
							member={member}
							onClick={handleToggleMemberDrawer}
						/>
					))
				) : (
					<EmptyCard
						title={translate(({ titles }) => titles.noMembersCommitteeYet)}
						iconName={IconType.EpMembersEmpty}
						buttonTitle={translate(({ titles }) => titles.addMembers)}
						path={routes.members}
					/>
				)}
			</MembersList>

			<PageFooter>
				<DefaultButton
					title={translate(({ buttons }) => buttons.invite)}
					leftIcon={IconType.EpPlus}
					size={ButtonSize.MD}
					onClick={() => setOpenInviteMemberModal(true)}
				/>
				<Modal
					size={modalBodyStep === 1 ? ModalSizes.LG : ModalSizes.XS}
					headerLeftIcon={IconType.EpMembers}
					title={translate(({ titles }) => titles.addNewUserToWorkspace)}
					open={openInviteMemberModal}
					onClose={() => setOpenInviteMemberModal(false)}
				>
					<Modal.Body withoutScroll>
						{modalBodyStep === 1 ? (
							<InviteMemberForm
								submitForm={submitFormFromOutside}
								resetSubmitForm={() => setSubmitFormFromOutside(false)}
								handleInvite={handleInviteWorkspaceMember}
								showErrorInModal={setShowModalFooterNotification}
								handleSetStep={handleSetStep}
							/>
						) : (
							<InviteToCommitteeInputsBlockCommittee>
								<FormItems>
									<CreateCommitteeForm
										handleCreate={handleCreateCommittee}
										submitFromOutside={submitFromOutside}
										setSubmitFromOutside={setSubmitFromOutside}
									/>
								</FormItems>
							</InviteToCommitteeInputsBlockCommittee>
						)}
					</Modal.Body>
					<Modal.Footer>
						{showModalFooterNotification && (
							<ModalFooterNotificationBlock>
								<ModalFooterIconBlock>
									<Icon name={IconType.EpExciamation} color={Colors.red[100]} />
								</ModalFooterIconBlock>
								<ModalFooterText>
									Some required information is missing...
								</ModalFooterText>
							</ModalFooterNotificationBlock>
						)}
						<DefaultButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.cancel)}
							onClick={() => setOpenInviteMemberModal(false)}
						/>
						{modalBodyStep === 1 ? (
							<ModalPrimaryButton
								size={ButtonSize.LG}
								title={translate(({ buttons }) => buttons.invite)}
								onClick={handleSubmitInviteMemberForm}
								loading={inviteWorkspaceMemberLoading}
								disabled={inviteWorkspaceMemberLoading}
							/>
						) : (
							<ModalPrimaryButton
								size={ButtonSize.MD}
								title={translate(({ buttons }) => buttons.create)}
								onClick={() => setSubmitFromOutside(true)}
								loading={createCommitteeInWorkspaceLoading}
								disabled={createCommitteeInWorkspaceLoading}
							/>
						)}
					</Modal.Footer>
				</Modal>
			</PageFooter>
		</PageContainer>
	);
}
