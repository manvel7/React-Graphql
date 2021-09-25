import React, { useState, useEffect } from 'react';

import { Committee } from '@epolitiker/api';
import { CommitteeVisibility } from '@epolitiker/api/dist/generated';

import { PageContainer, CommitteesList, PageFooter, PrimaryButton } from './CommitteesPage.style';
import {
	Modal,
	GhostButton,
	ButtonSize,
	PageTopBar,
	PageTitlePanel,
	DefaultButton,
	ModalSizes,
	MembersPageLoader
} from '../../components/ui';
import { CommitteeCard } from '../../components/cards';

import {
	useNavigation,
	useAlerts,
	useWorkspaceCommitteesLazyQuery,
	useCreateCommitteeInWorkspaceMutation,
	useTranslation,
	useBreadcrumbs,
	useLocalStorage,
	useDeleteCommitteeMutation
} from '../../hooks';
import {
	CreateCommitteeForm,
	CreateCommitteeFormValues,
	CommitteesFilterBar,
	CommitteesFiltersType
} from '../../components/committe';
import { StorageKey, IconType } from '../../consts';
import { EmptyCard } from '../../components/cards/EmptyCard';

const commiitteesPageOrderBy = localStorage.getItem(StorageKey.CommitteesPageOrderBy);

const filtersInitialState: CommitteesFiltersType = {
	visibility: ['PUBLIC_OPEN', 'PUBLIC_LOCKED', 'PRIVATE_HIDDEN'],
	textSearch: '',
	orderBy: commiitteesPageOrderBy === null ? 'createdAt_DESC' : commiitteesPageOrderBy
};

export function CommitteesPage() {
	const { navigate, routes } = useNavigation();
	const { setNotification } = useAlerts();
	const { setBreadcrumbs } = useBreadcrumbs();
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [, setRequestOrderBy] = useLocalStorage(StorageKey.CommitteesPageOrderBy);

	const [openCreateCommitteeModal, setOpenCreateCommitteeModal] = useState(false);
	const [submitFromOutside, setSubmitFromOutside] = useState(false);
	const [committees, setCommittees] = useState<Committee[]>([]);

	const [filters, setFilters] = useState<CommitteesFiltersType>(filtersInitialState);

	const [
		getWorkspaceCommittees,
		{ data: workspaceCommitteesData, loading: workspaceCommitteesLoading }
	] = useWorkspaceCommitteesLazyQuery();

	const [
		createCommitteeInWorkspace,
		{ data: createCommitteeInWorkspaceData, loading: createCommiteeLoading }
	] = useCreateCommitteeInWorkspaceMutation();

	const [deleteCommittee, { data: deleteCommitteeData }] = useDeleteCommitteeMutation();

	if (!activeWorkspace) {
		navigate(routes.login);
		return null;
	}

	const breadcrumbsData = [
		{
			label: translate(({ titles }) => titles.agenda),
			to: routes.committees,
			active: true
		}
	];

	function handleGetWorkspaceCommittees(
		activeWorkspaceId: string,
		filterParams: CommitteesFiltersType
	) {
		getWorkspaceCommittees({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: activeWorkspaceId }
				},
				where: {
					visibility_in: filterParams.visibility,
					OR: [
						{ label_contains: filterParams.textSearch },
						{ description_contains: filterParams.textSearch },

						{ label_in: filterParams.textSearch.split(' ') },
						{ description_in: filterParams.textSearch.split(' ') }
					]
				},
				orderBy: filterParams.orderBy
			}
		});

		setRequestOrderBy(filterParams.orderBy);
	}

	useEffect(() => {
		if (workspaceCommitteesData) {
			setCommittees(workspaceCommitteesData.workspaceDetails.committees);
		}
	}, [workspaceCommitteesData]);

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
			setOpenCreateCommitteeModal(false);
			setNotification({
				message: translate(({ messages }) => messages.createCommittee.success)
			});
		}
	}, [createCommitteeInWorkspaceData]);

	function handleGetFiltersParams(
		field: keyof CommitteesFiltersType,
		value: string | CommitteeVisibility[]
	) {
		setFilters({ ...filters, [field]: value });
	}

	useEffect(() => {
		handleGetWorkspaceCommittees(activeWorkspace.id, filters);
		setBreadcrumbs(breadcrumbsData);
	}, [filters]);

	function handleDeleteCommittee(id: string) {
		deleteCommittee({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: id
					}
				}
			}
		});
	}
	useEffect(() => {
		if (deleteCommitteeData) {
			setNotification({
				message: 'Committee Deleted Successfully!'
			});
			handleGetWorkspaceCommittees(activeWorkspace.id, filters);
		}
	}, [deleteCommitteeData]);

	return (
		<PageContainer>
			<PageTopBar />
			<PageTitlePanel title={translate(({ titles }) => titles.committees)}>
				<GhostButton
					icon={IconType.EpPlus}
					tooltip={translate(({ tooltips }) => tooltips.addPageFolderOrCommittee)}
					size={ButtonSize.SM}
					onClick={() => setOpenCreateCommitteeModal(true)}
				/>
			</PageTitlePanel>
			<CommitteesFilterBar
				count={committees.length}
				filters={filters}
				handleFilters={handleGetFiltersParams}
			/>

			<CommitteesList>
				{workspaceCommitteesLoading ? (
					<MembersPageLoader />
				) : committees.length > 0 ? (
					committees.map(committee => (
						<CommitteeCard
							key={committee.id}
							committee={committee}
							handleDeleteCommittee={() => handleDeleteCommittee(committee.id)}
						/>
					))
				) : (
					<EmptyCard
						title={translate(
							({ titles }) => titles.noCommitteesAndSharedDirectoriesYet
						)}
						iconName={IconType.EpCommitteeFolder}
						buttonTitle={translate(({ titles }) => titles.createDirectory)}
						path={routes.documents}
					/>
				)}
			</CommitteesList>

			<PageFooter>
				<GhostButton
					leftIcon={IconType.EpPlus}
					title={translate(({ tooltips }) => tooltips.addPageFolderOrCommittee)}
					onClick={() => setOpenCreateCommitteeModal(true)}
				/>

				<Modal
					title={translate(({ titles }) => titles.newCommittee)}
					headerLeftIcon={IconType.EpAvatarIcon}
					open={openCreateCommitteeModal}
					onClose={() => setOpenCreateCommitteeModal(false)}
					size={ModalSizes.XS}
				>
					<Modal.Body>
						<CreateCommitteeForm
							handleCreate={handleCreateCommittee}
							submitFromOutside={submitFromOutside}
							setSubmitFromOutside={setSubmitFromOutside}
						/>
					</Modal.Body>
					<Modal.Footer>
						<DefaultButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.cancel)}
							onClick={() => setOpenCreateCommitteeModal(false)}
						/>
						<PrimaryButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.create)}
							onClick={() => setSubmitFromOutside(true)}
							loading={createCommiteeLoading}
							disabled={createCommiteeLoading}
						/>
					</Modal.Footer>
				</Modal>
			</PageFooter>
		</PageContainer>
	);
}
