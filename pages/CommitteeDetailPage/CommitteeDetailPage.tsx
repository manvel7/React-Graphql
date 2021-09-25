import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

import { Committee, Document } from '@epolitiker/api';

import {
	ButtonSize,
	Dropdown,
	DropdownPosition,
	Icon,
	ModalSizes,
	PageTitlePanel,
	PageTopBar,
	PrimaryButton
} from '../../components/ui';
import { Route } from '../../components/ui/Route';

import {
	CommitteeDetailsContainer,
	ContentIconWithTitle,
	GhostButton,
	IconContent,
	NavLink,
	NavTab,
	NavTabsBlock,
	PageContainer
} from './CommitteeDetailPage.style';
import {
	CommitteeCalendar,
	CommitteeDocuments,
	CommitteeInformation,
	CommitteeMembers,
	CommitteeOverview,
	CommitteePolls,
	UpdateCommitteeDetailsForm,
	UpdateCommitteeDetailsFormValues
} from '../../components/committe';
import {
	useAlerts,
	useBreadcrumbs,
	useCommitteeDetailsLazyQuery,
	useDeleteDocumentMutation,
	useEffectOnce,
	useLocalStorage,
	useNavigation,
	useTranslation,
	useUpdateCommitteeDetailsMutation,
	useUploadOrConnectDocumentsToFolderMutation
} from '../../hooks';
import { IconType, StorageKey } from '../../consts';
import { Nullable } from '../../types';
import { Colors } from '../../environment';
import {
	ComponentBlock,
	Container,
	ContentBlockCard,
	FileDropInput,
	FileDropZone,
	FileSubTitle,
	FileTitle,
	HeaderTitleBlock,
	HeadingBlock,
	IconPlusBlock,
	ModalBlock,
	ModalItemContent,
	ModalMainContent,
	ModalSidebarContent,
	ModalSubHeader,
	ModalSubHeaderTitle,
	PageHeading,
	SidebarItem,
	UploadFileModalContainer,
	UploadIconContent,
	Modal
} from '../../components/SidebarMenu/SidebarMenu.style';
import { UploadFileCard } from '../../components/cards/UploadFileCard';
import { UploadFileRelatedCardItems } from '../../components/cards/UploadFileRelatedCardItems';
import { UploadFileCardWithCheckbox } from '../../components/cards/UploadFileCardItemsWithCheckbox ';
import { FileModalCard } from '../../components/cards/FileModalCard';

enum CommitteeDetailRoutes {
	Overview = '/committees/:id',
	Members = '/committees/:id/members',
	Calendar = '/committees/:id/calendar',
	Documents = '/committees/:id/documents',
	Polls = '/committees/:id/polls',
	Information = '/committees/:id/information'
}

interface ICommitteeContext {
	committee: Nullable<Committee>;
}

export const CommitteeContext = createContext<ICommitteeContext>({
	committee: null
});

export function CommitteeDetailPage() {
	const { id: committeeId } = useParams();
	const { setError, setNotification } = useAlerts();
	const { routes, navigate } = useNavigation();
	const { setBreadcrumbs } = useBreadcrumbs();
	const translate = useTranslation();
	const [committeeDetails, setCommitteeDetails] = useState<Nullable<Committee>>(null);
	const [openUpdateCommitteeDetailsModal, setOpenUpdateCommitteeDetailsModal] = useState(false);

	const [workspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [uploadFileStep, setUploadFileStep] = useState(1);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [documents, setDocuments] = useState<Document[]>([]);
	const [fileInfo, setFileInfo] = useState<File | undefined | null>();
	const [checked, setChecked] = useState<boolean>(false);

	const [getCommitteeDetails, { data: committeeDetailsData }] = useCommitteeDetailsLazyQuery();
	const [
		updateCommitteeDetails,
		{ data: updateCommitteeDetailsData, loading: updateCommitteeDetailsLoading }
	] = useUpdateCommitteeDetailsMutation();

	const [
		deleteDocument,
		{ data: deleteDocumentData, loading: deleteDocumentLoading }
	] = useDeleteDocumentMutation();

	const [
		uploadDocumentsToAzureFolder,
		{ data: uploadDocumentsToAzureFolderData, loading: uploadDocumentsToAzureFolderLoading }
	] = useUploadOrConnectDocumentsToFolderMutation();

	if (committeeId == 'undefined') {
		navigate(routes.committees);
		setError({ message: 'Commitee Details not found' });
		return null;
	}

	const tabsData = [
		{
			title: translate(({ tabs }) => tabs.overview),
			path: routes.committeeOverview(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.calendar),
			path: routes.committeeCalendar(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.documents),
			path: routes.committeeDocuments(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.polls),
			path: routes.committeePolls(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.members),
			path: routes.committeeMembers(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.information),
			path: routes.committeeInformation(committeeId)
		}
	];

	useEffectOnce(() => {
		handleGetCommitteeDetails();
	});

	useMemo(() => {
		if (committeeDetails) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.committees),
					to: routes.committees
				},
				{
					label: committeeDetails.label,
					to: routes.committeeOverview(committeeId),
					active: true
				}
			];

			setBreadcrumbs(breadcrumbsData);
		}
	}, [committeeDetails]);

	function handleGetCommitteeDetails() {
		getCommitteeDetails({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: committeeId
					}
				}
			}
		});
	}

	useEffect(() => {
		if (committeeDetailsData) {
			setCommitteeDetails(committeeDetailsData.committeeDetails);
		}
	}, [committeeDetailsData]);

	function handleUpdateCommitteeDetails(updatedCommitteeData: UpdateCommitteeDetailsFormValues) {
		updateCommitteeDetails({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: committeeId
					},
					committeeDetailsInput: {
						label: updatedCommitteeData.label,
						description: updatedCommitteeData.description,
						visibility: updatedCommitteeData.visibility
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateCommitteeDetailsData) {
			setOpenUpdateCommitteeDetailsModal(false);
		}
	}, [updateCommitteeDetailsData]);

	//upload File

	function handleCheckoutModalStep() {
		setUploadFileStep(3);
	}

	function handleShowUploadModal() {
		setShowUploadModal(true);
	}

	function handleHideUploadModal() {
		setShowUploadModal(false);
		setDocuments([]);
		if (fileInfo) {
			setFileInfo(null);
		}
		setUploadFileStep(1);
	}

	function handleUploadMore() {
		setUploadFileStep(1);
	}

	function handleDeleteDocument(document: Document) {
		deleteDocument({
			variables: {
				data: {
					documentWhereUniqueInput: { id: document.id }
				}
			}
		});
	}
	useEffect(() => {
		if (deleteDocumentData) {
			setNotification({ message: 'Document removed!' });
			if (fileInfo) {
				setFileInfo(null);
			}
			setUploadFileStep(1);
			handleHideUploadModal();
		}
	}, [deleteDocumentData]);

	function handleSetStep(uploadFileStep: number): number {
		setUploadFileStep(uploadFileStep);
		return uploadFileStep;
	}

	function onSelect(checked: boolean) {
		setChecked(checked);
	}

	function handleUploadDocumentToAzureFolder() {
		uploadDocumentsToAzureFolder({
			variables: {
				data: {
					parentFolderWhereUniqueInput: { id: workspace.folder.id },
					workspaceWhereUniqueInput: { id: workspace.id },
					document: { create: {} },
					file: fileInfo
				}
			}
		});
	}

	useEffect(() => {
		if (uploadDocumentsToAzureFolderData) {
			const uploadedDocuments =
				uploadDocumentsToAzureFolderData.uploadOrConnectDocumentsToFolder;
			setDocuments(state => [...state, ...uploadedDocuments]);
			setNotification({ message: 'Document uploaded successfully!' });
			setUploadFileStep(3);
		}
	}, [uploadDocumentsToAzureFolderData]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		multiple: false,
		noKeyboard: true,
		accept: 'application/pdf',
		onDrop: (dropAcceptedFiles: File[]) => {
			if (dropAcceptedFiles.length > 0) {
				const file = dropAcceptedFiles[0];
				setFileInfo(file);
				setUploadFileStep(2);
			} else {
				setError({
					message: translate(({ messages }) => messages.fileUpload.notSupportedType)
				});
			}
		}
	});

	return (
		<PageContainer>
			{committeeDetails && (
				<Modal
					size={ModalSizes.XS}
					title={translate(({ titles }) => titles.committees)}
					open={openUpdateCommitteeDetailsModal}
					onClose={() => setOpenUpdateCommitteeDetailsModal(false)}
				>
					<Modal.Body>
						<UpdateCommitteeDetailsForm
							committeeDetails={committeeDetails}
							handleUpdate={handleUpdateCommitteeDetails}
							loading={updateCommitteeDetailsLoading}
						/>
					</Modal.Body>
				</Modal>
			)}
			<PageTopBar />
			<ContentIconWithTitle>
				<IconContent>
					<Icon name={IconType.EpUser} />
				</IconContent>
				<PageTitlePanel title={committeeDetails ? committeeDetails.label : ''}>
					<Dropdown
						position={DropdownPosition.Left}
						toggleComponent={() => <Icon name={IconType.EpPlus} />}
						tooltip={translate(({ buttons }) => buttons.plus)}
					>
						<Dropdown.Item
							onClick={() => navigate(routes.committeeMembers(committeeId))}
						>
							<Dropdown.ItemIcon name={IconType.EpAddMember} />
							{translate(({ buttons }) => buttons.addMember)}
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item onClick={() => handleShowUploadModal()}>
							<Dropdown.ItemIcon name={IconType.EpUploadFile} />
							{translate(({ buttons }) => buttons.uploadFile)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => {}} disabled>
							<Dropdown.ItemIcon name={IconType.EpNewDocument} />
							{translate(({ buttons }) => buttons.newDocument)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => {}} disabled>
							<Dropdown.ItemIcon name={IconType.EpPage} />
							{translate(({ buttons }) => buttons.page)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => {}}>
							<Dropdown.ItemIcon name={IconType.EpFolder} />
							{translate(({ buttons }) => buttons.folder)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => navigate(routes.createOrEditMeeting)}>
							<Dropdown.ItemIcon name={IconType.EpCalendar} />
							{translate(({ buttons }) => buttons.meeting)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => {}} disabled>
							<Dropdown.ItemIcon
								name={IconType.EpPollFilled}
								color={Colors.blue[100]}
							/>
							{translate(({ buttons }) => buttons.poll)}
						</Dropdown.Item>
					</Dropdown>
					<GhostButton
						size={ButtonSize.SM}
						icon={IconType.EpEdit}
						tooltip={translate(({ buttons }) => buttons.edit)}
						onClick={() => setOpenUpdateCommitteeDetailsModal(true)}
					/>
					<GhostButton
						size={ButtonSize.SM}
						icon={IconType.EpSettings}
						tooltip={translate(({ buttons }) => buttons.settings)}
						onClick={() => navigate(routes.committeeSettingsGeneral(committeeId))}
					/>
				</PageTitlePanel>
			</ContentIconWithTitle>

			<Modal
				size={uploadFileStep !== 4 ? ModalSizes.LG : ModalSizes.XL}
				title={
					uploadFileStep !== 4
						? translate(({ titles }) => titles.uploadContent)
						: translate(({ titles }) => titles.uploadSettings)
				}
				headerLeftIcon={uploadFileStep === 4 ? IconType.EpArrowLeft : ''}
				modalStep={uploadFileStep}
				onBack={handleCheckoutModalStep}
				open={showUploadModal}
				onClose={handleHideUploadModal}
			>
				<Modal.Body>
					<UploadFileModalContainer>
						{uploadFileStep !== 4 ? (
							<ModalSidebarContent>
								<SidebarItem>
									<Icon name={IconType.EpDeviceModal} />
								</SidebarItem>
								<SidebarItem>
									<Icon name={IconType.EpGoogleDisc} />
								</SidebarItem>
								<SidebarItem>
									<Icon name={IconType.EpCloud} />
								</SidebarItem>
								<SidebarItem>
									<Icon name={IconType.EpUploadVector} />
								</SidebarItem>
								<SidebarItem>
									<Icon name={IconType.EpDocumentFile} />
								</SidebarItem>
								<SidebarItem>
									<Icon name={IconType.EpDocumentFileWithSlack} />
								</SidebarItem>
							</ModalSidebarContent>
						) : null}
						<ModalMainContent>
							{uploadFileStep !== 4 ? (
								<ModalSubHeader>
									<Icon name={IconType.EpDeviceUpload} />
									<ModalSubHeaderTitle>
										{translate(({ titles }) => titles.uploadFromDevice)}
									</ModalSubHeaderTitle>
								</ModalSubHeader>
							) : null}

							{uploadFileStep === 1 && (
								<ModalItemContent>
									<FileDropZone {...getRootProps()} active={isDragActive}>
										<FileDropInput {...getInputProps()} />
										<IconPlusBlock>
											<Icon name={IconType.EpPlus} />
										</IconPlusBlock>
										<UploadIconContent>
											<Icon name={IconType.EpFolderUpload} />
										</UploadIconContent>
										<FileTitle>
											{translate(({ titles }) => titles.fileSelect)}
										</FileTitle>
										<FileSubTitle>
											{translate(({ titles }) => titles.fileSelectSubTitle)}
										</FileSubTitle>
									</FileDropZone>
								</ModalItemContent>
							)}
							{uploadFileStep === 2 && fileInfo && (
								<Container>
									<ContentBlockCard>
										<HeaderTitleBlock>
											{translate(({ titles }) => titles.fileSelect)}
										</HeaderTitleBlock>
										<GhostButton
											leftIcon={IconType.EpArrowUp}
											size={ButtonSize.SM}
											title={translate(({ titles }) => titles.uploadMore)}
											onClick={handleUploadMore}
										/>
									</ContentBlockCard>
									<UploadFileCard
										file={fileInfo}
										handleUploadMore={handleUploadMore}
									/>
								</Container>
							)}
							{uploadFileStep === 3 && (
								<ComponentBlock>
									<HeadingBlock>
										<PageHeading>Files</PageHeading>
									</HeadingBlock>
									{console.log(document)}
									{documents.length > 0 &&
										documents.map(document => (
											<UploadFileRelatedCardItems
												key={document.id}
												document={document}
												onDelete={handleDeleteDocument}
												handleSetStep={handleSetStep}
												showAttachedFiles={false}
												onClick={() => {}}
											/>
										))}
								</ComponentBlock>
							)}

							{uploadFileStep === 4 && (
								<ComponentBlock>
									{documents.length > 0 &&
										documents.map(document => (
											<ModalBlock key={document.id}>
												<UploadFileCardWithCheckbox
													document={document}
													isSelect={checked}
													onSelect={onSelect}
													onClick={() => {}}
												/>
												<FileModalCard
													document={document}
													onDelete={handleDeleteDocument}
												/>
											</ModalBlock>
										))}
								</ComponentBlock>
							)}
						</ModalMainContent>
					</UploadFileModalContainer>
				</Modal.Body>
				<Modal.Footer>
					<GhostButton
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={() => handleHideUploadModal()}
					/>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.upload)}
						disabled={
							!fileInfo ||
							uploadDocumentsToAzureFolderLoading ||
							deleteDocumentLoading ||
							uploadFileStep === 3 ||
							uploadFileStep === 4
						}
						loading={uploadDocumentsToAzureFolderLoading}
						onClick={handleUploadDocumentToAzureFolder}
					/>
				</Modal.Footer>
			</Modal>

			<NavTabsBlock>
				{tabsData.map((tab, index) => {
					return (
						<NavTab key={`committee-tab-${index}`}>
							<NavLink exact to={tab.path}>
								{tab.title}
							</NavLink>
						</NavTab>
					);
				})}
			</NavTabsBlock>
			{committeeDetails && (
				<CommitteeContext.Provider value={{ committee: committeeDetails }}>
					<CommitteeDetailsContainer>
						<Route
							exact
							guarded
							path={CommitteeDetailRoutes.Overview}
							component={CommitteeOverview}
						/>
						<Route
							exact
							guarded
							path={CommitteeDetailRoutes.Members}
							component={CommitteeMembers}
						/>
						<Route
							exact
							guarded
							path={CommitteeDetailRoutes.Calendar}
							component={CommitteeCalendar}
						/>
						<Route
							exact
							guarded
							path={CommitteeDetailRoutes.Documents}
							component={CommitteeDocuments}
						/>
						<Route
							exact
							guarded
							path={CommitteeDetailRoutes.Polls}
							component={CommitteePolls}
						/>
						<Route
							exact
							guarded
							path={CommitteeDetailRoutes.Information}
							component={CommitteeInformation}
						/>
					</CommitteeDetailsContainer>
				</CommitteeContext.Provider>
			)}
		</PageContainer>
	);
}
