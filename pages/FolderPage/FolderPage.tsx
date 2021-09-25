import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

import { AzureFolder, UserAccount, UserPermissionOption, Document } from '@epolitiker/api';

import {
	PageContainer,
	PageTopBarBlock,
	PageTopBarItem,
	BreadcrumbBlock,
	BreadcrumbItem,
	BreadcrumbDivider,
	GhostButton,
	PrimaryButton,
	Switch,
	PageTitleBlock,
	PageTitle,
	PageFilters,
	FiltersLeftBlock,
	FiltersRightBlock,
	FiltersItem,
	FixedHeightModal,
	RenameFolderModalConent,
	ModalAccessContainer,
	ModalSubTitle,
	ModalInfoBlockWrapper,
	ModalInfoBlock,
	InfoBlockIconWrapper,
	InfoContainer,
	InfoTitle,
	InfoText,
	MoveModalBodyContainer,
	MoveFolderModalNavBlock,
	MoveFoldersModalContainer,
	AccessModalContainer,
	ModalTabsContainer,
	ModalTabItem,
	MembersListContainer,
	ListTitleBlock,
	ListIconBlock,
	ListTitle,
	MembersList,
	PageMainContent,
	ComponentBlock,
	PageSubTitle,
	DocumentsList,
	DocumentCard,
	PageHeaderBlock,
	FooterBlockContent,
	FileDropZone,
	FileDropInput,
	FolderModalUpload,
	UploadIconContent
} from './FolderPage.style';

import {
	Container,
	ContentBlockCard,
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
	UploadFileModalContainer
} from '../../components/SidebarMenu/SidebarMenu.style';

import {
	useTranslation,
	useGetFolderContentsByIdLazyQuery,
	useDeleteAzureFolderMutation,
	useNavigation,
	useUpdateAzureFolderMutation,
	useLocalStorage,
	useMoveAzureFolderMutation,
	useWorkspaceMembersLazyQuery,
	useGetFolderByIdLazyQuery,
	useUploadOrConnectDocumentsToFolderMutation,
	useAlerts,
	useCreateAzureFolderMutation,
	useDeleteDocumentMutation
} from '../../hooks';
import {
	BadgeTypes,
	Badge,
	ButtonSize,
	Dropdown,
	SortOrFilterMenu,
	SearchInput,
	Modal,
	DefaultButton,
	ModalSizes,
	Input,
	Icon,
	SwitchSizes,
	ListLoader
} from '../../components/ui';
import { DocumentStatusType, IconType, StorageKey } from '../../consts';
import {
	FileModalCard,
	FolderCard,
	MemberAccessCard,
	UploadFileCard,
	UploadFileCardWithCheckbox,
	UploadFileRelatedCardItems
} from '../../components/cards';
import { Colors } from '../../environment';
import { EmptyCard } from '../../components/cards/EmptyCard';

export function FolderPage() {
	const { id: folderId } = useParams<{ id: string | undefined }>();

	const translate = useTranslation();
	const { back } = useNavigation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const { setNotification } = useAlerts();

	const [workspaceMembers, setWorkspaceMembers] = useState<UserAccount[]>([]);

	const [rootFolders, setRootFolders] = useState<AzureFolder[]>([]);
	const [workspaceFolders, setWorkspaceFolders] = useState<AzureFolder[]>([]);
	const [moveToFolder, setMoveToFolder] = useState<AzureFolder | null>(null);

	const [folderDetails, setFolderDetails] = useState<AzureFolder | null>(null);
	const [folderName, setFolderName] = useState<string>('');

	const [, setNestedFolders] = useState<AzureFolder[]>([]);
	const [publishedDocs, setPublishedDocs] = useState<Document[]>([]);
	const [, setUnPublishedDocs] = useState<Document[]>([]);

	const [showRenameModal, setShowRenameModal] = useState(false);
	const [showMoveFolderModal, setShowMoveFolderModal] = useState(false);
	const [showAccessModal, setShowAccessModal] = useState(false);

	const [showUploadModal, setShowUploadModal] = useState(false);
	const [uploadFileStep, setUploadFileStep] = useState(1);
	const [fileInfo, setFileInfo] = useState<File | undefined | null>();
	const [document, setDocuments] = useState<Document[]>([]);
	const [workspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [checked, setChecked] = useState<boolean>(false);

	const [getWorkspaceMembers, { data: getWorkspacemembersData }] = useWorkspaceMembersLazyQuery();

	const [
		getFolderById,
		{ data: getFolderByIdData, loading: getFolderByIdLoading }
	] = useGetFolderByIdLazyQuery();

	const [
		getFolderContentsById,
		{ data: getFolderContentsByIdData }
	] = useGetFolderContentsByIdLazyQuery();

	const [
		getRootFolderContents,
		{ data: getRootFolderContentsData }
	] = useGetFolderContentsByIdLazyQuery();

	const [createAzureFolder, { data: createAzureFolderData }] = useCreateAzureFolderMutation();

	const [
		updateAzureFolder,
		{ data: updateAzureFolderData, loading: updateAzureFolderLoading }
	] = useUpdateAzureFolderMutation();

	const [
		updateAzureFolderIsPrivate,
		{ data: updateAzureFolderIsPrivateData, loading: updateAzureFolderIsPrivateLoading }
	] = useUpdateAzureFolderMutation();

	const [
		updateAzureFolderPermission,
		{ data: updateAzureFolderPermissionData }
	] = useUpdateAzureFolderMutation();

	const [
		moveAzureFolder,
		{ data: moveAzureFolderData, loading: moveAzureFolderLoading }
	] = useMoveAzureFolderMutation();

	const [deleteAzureFolder, { data: deleteAzureFolderData }] = useDeleteAzureFolderMutation();

	// const [
	// 	uploadDocumentsToFolder,
	// 	{ data: uploadDocumentsToFolderData }
	// ] = useUploadOrConnectDocumentsToFolderMutation();

	const [
		deleteDocument,
		{ data: deleteDocumentData, loading: deleteDocumentLoading }
	] = useDeleteDocumentMutation();

	const [
		uploadDocumentsToAzureFolder,
		{ data: uploadDocumentsToAzureFolderData, loading: uploadDocumentsToAzureFolderLoading }
	] = useUploadOrConnectDocumentsToFolderMutation();

	useEffect(() => {
		handleGetFolderDetails();
		handleGetFolderContents();
		handleGetRootFolderContents(activeWorkspace.folder.id);
		handleGetWorkspaceMembers();
	}, [folderId]);

	// Get workspace members
	function handleGetWorkspaceMembers() {
		getWorkspaceMembers({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: activeWorkspace.id }
				}
			}
		});
	}

	useEffect(() => {
		if (getWorkspacemembersData) {
			setWorkspaceMembers(getWorkspacemembersData.workspaceDetails.members);
		}
	}, [getWorkspacemembersData]);

	// Get folder details
	function handleGetFolderDetails() {
		getFolderById({
			variables: {
				data: {
					id: folderId
				}
			}
		});
	}

	useEffect(() => {
		if (getFolderByIdData) {
			const azureFolder = getFolderByIdData.getFolderById;
			setFolderDetails(azureFolder);
			setFolderName(azureFolder.name);
			setPublishedDocs(
				azureFolder.documents.filter(doc => doc.status === DocumentStatusType.PUBLISHED)
			);
			setUnPublishedDocs(
				azureFolder.documents.filter(doc => doc.status === DocumentStatusType.NOT_PUBLISHED)
			);
		}
	}, [getFolderByIdData]);
	// Get Folder Contents
	function handleGetFolderContents() {
		getFolderContentsById({
			variables: {
				data: {
					azureFolderWhereUniqueInput: { id: folderId }
				}
			}
		});
	}
	useEffect(() => {
		if (getFolderContentsByIdData) {
			setNestedFolders(getFolderContentsByIdData.getFolderContentsById.folders);
		}
	}, [getFolderContentsByIdData]);

	// Get Root Folder contents
	function handleGetRootFolderContents(rootFolderId: string) {
		getRootFolderContents({
			variables: {
				data: {
					id: rootFolderId
				}
			}
		});
	}

	useEffect(() => {
		if (getRootFolderContentsData) {
			const rootFolders = getRootFolderContentsData.getFolderContentsById.folders;
			setRootFolders(rootFolders);

			if (workspaceFolders.length === 0) {
				setWorkspaceFolders(rootFolders);
			}
		}
	}, [getRootFolderContentsData]);

	// Create Azure Folder
	function handleCreateAzureFolder() {
		createAzureFolder({
			variables: {
				data: {
					parentFolderWhereUniqueInput: { id: folderId }
				}
			}
		});
	}

	useEffect(() => {
		if (createAzureFolderData) {
			const newNestedFolder = createAzureFolderData.createAzureFolder;
			setNestedFolders(state => [...state, newNestedFolder]);
		}
	}, [createAzureFolderData]);

	// Update Azure folder
	function handleUpdateAzureFolder(name: string) {
		updateAzureFolder({
			variables: {
				data: {
					azureFolderWhereUniqueInput: {
						id: folderDetails?.id
					},
					name: name
				}
			}
		});
	}

	useEffect(() => {
		if (updateAzureFolderData) {
			setFolderDetails(updateAzureFolderData.updateAzureFolder);
			setNotification({ message: 'Folder was updated!' });
			setShowRenameModal(false);
		}
	}, [updateAzureFolderData]);

	// Update Azure folder permission
	function handleUpdateAzureFolderPermission(userId: string, permissionId?: string) {
		if (permissionId) {
			updateAzureFolderPermission({
				variables: {
					data: {
						azureFolderWhereUniqueInput: { id: folderDetails?.id },
						accessList: {
							delete: [{ id: permissionId }]
						}
					}
				}
			});
		} else {
			updateAzureFolderPermission({
				variables: {
					data: {
						azureFolderWhereUniqueInput: { id: folderDetails?.id },
						accessList: {
							create: [{ id: userId }]
						}
					}
				}
			});
		}
	}

	useEffect(() => {
		if (updateAzureFolderPermissionData) {
			setFolderDetails(updateAzureFolderPermissionData.updateAzureFolder);
		}
	}, [updateAzureFolderPermissionData]);

	// Up	date Azure folder is private
	function handleUpdateAzureFolderIsPrivate(isPrivate: boolean) {
		updateAzureFolderIsPrivate({
			variables: {
				data: {
					azureFolderWhereUniqueInput: {
						id: folderDetails?.id
					},
					isPrivate: isPrivate
				}
			}
		});
	}

	useEffect(() => {
		if (updateAzureFolderIsPrivateData) {
			setFolderDetails(updateAzureFolderIsPrivateData.updateAzureFolder);
		}
	}, [updateAzureFolderIsPrivateData]);

	// Move Azure folder
	function handleMoveAzureFolder() {
		moveAzureFolder({
			variables: {
				data: {
					azureFolderWhereUniqueInput: { id: folderDetails?.id },
					moveTo: { id: moveToFolder?.id }
				}
			}
		});
	}

	useEffect(() => {
		if (moveAzureFolderData) {
			setFolderDetails(moveAzureFolderData.moveAzureFolder);
			handleCloseMoveFolderModal();
		}
	}, [moveAzureFolderData]);

	// Delete Azure folder
	function handleDeleteAzureFolder() {
		deleteAzureFolder({
			variables: {
				data: {
					id: folderId
				}
			}
		});
	}

	useEffect(() => {
		if (deleteAzureFolderData) {
			back();
		}
	}, [deleteAzureFolderData]);

	function handleOpenMoveFolderModal() {
		setShowMoveFolderModal(true);
		setRootFolders(workspaceFolders);
	}

	function handleCloseMoveFolderModal() {
		setMoveToFolder(null);
		setShowMoveFolderModal(false);
	}

	function handleShowAccessModal() {
		setShowAccessModal(true);
		setShowRenameModal(false);
	}
	function handleCheckoutModal() {
		setShowAccessModal(false);
		setShowRenameModal(true);
	}

	function handleCloseAccessModal() {
		setShowAccessModal(false);
	}

	const breadcrumbsData: Array<string> = useMemo(() => {
		if (folderDetails && folderDetails.path) {
			const data = folderDetails.path.split('/');
			data.splice(
				1,
				0,
				translate(({ titles }) => titles.privateSpace)
			);
			return data;
		} else {
			return [];
		}
	}, [folderDetails]);

	//Upload modal

	function handleHideUploadModal() {
		setShowUploadModal(false);
		setDocuments([]);
		if (fileInfo) {
			setFileInfo(null);
		}
		setUploadFileStep(1);
	}

	function handleShowUploadModal() {
		setShowUploadModal(true);
	}
	const handleUploadMore = () => {
		setUploadFileStep(1);
	};

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

	//upload with drag en drop

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		multiple: false,
		noKeyboard: true,
		accept: 'application/pdf',
		onDrop: (dropAcceptedFiles: File[]) => {
			if (dropAcceptedFiles.length > 0) {
				const file = dropAcceptedFiles[0];
				setFileInfo(file);
				setUploadFileStep(2);
			}
		}
	});

	function handleSetStep(uploadFileStep: number): number {
		setUploadFileStep(uploadFileStep);
		return uploadFileStep;
	}

	function handleCheckoutModalStep() {
		setUploadFileStep(3);
	}

	function onSelect(checked: boolean) {
		setChecked(checked);
	}

	return (
		<PageContainer>
			<FixedHeightModal
				open={showRenameModal}
				onClose={() => setShowRenameModal(false)}
				title={translate(({ buttons }) => buttons.rename)}
				size={ModalSizes.XS}
			>
				<Modal.Body>
					<RenameFolderModalConent>
						<Input
							label={translate(({ inputs }) => inputs.name.label)}
							placeholder={translate(({ inputs }) => inputs.name.placeholder)}
							value={folderName}
							onChange={e => setFolderName(e.target.value)}
						/>
						<ModalAccessContainer>
							<ModalSubTitle>
								{translate(({ titles }) => titles.accessAndVisibility)}
							</ModalSubTitle>
							<ModalInfoBlockWrapper>
								<ModalInfoBlock>
									<InfoBlockIconWrapper>
										<Icon name={IconType.EpEye} />
									</InfoBlockIconWrapper>
									<InfoContainer>
										<InfoTitle>
											{translate(({ titles }) => titles.hiddenFromEveryone)}
										</InfoTitle>
										<InfoText>
											{translate(
												({ titles }) =>
													titles.newFolderIsHidenForOtherPeople
											)}
										</InfoText>
									</InfoContainer>
								</ModalInfoBlock>
								<GhostButton
									size={ButtonSize.SM}
									leftIcon={IconType.EpGlobe}
									title={translate(({ buttons }) => buttons.manage)}
									onClick={handleShowAccessModal}
								/>
							</ModalInfoBlockWrapper>
						</ModalAccessContainer>
					</RenameFolderModalConent>
				</Modal.Body>
				<Modal.Footer>
					<DefaultButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={() => setShowRenameModal(false)}
					/>
					<PrimaryButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.save)}
						onClick={() => handleUpdateAzureFolder(folderName)}
						loading={updateAzureFolderLoading}
						disabled={updateAzureFolderLoading}
					/>
				</Modal.Footer>
			</FixedHeightModal>

			<Modal
				open={showMoveFolderModal}
				onClose={handleCloseMoveFolderModal}
				title={`${folderDetails?.name} ${translate(({ buttons }) => buttons.move)}`}
				size={ModalSizes.XS}
			>
				<Modal.Body>
					<MoveModalBodyContainer>
						<MoveFolderModalNavBlock>
							<BreadcrumbBlock>
								<BreadcrumbItem>{activeWorkspace.name}</BreadcrumbItem>
								<BreadcrumbDivider>/</BreadcrumbDivider>
								<BreadcrumbItem>{moveToFolder?.name}</BreadcrumbItem>
							</BreadcrumbBlock>
						</MoveFolderModalNavBlock>
						<MoveFoldersModalContainer>
							{rootFolders.length > 0 &&
								rootFolders.map(azureFolder => (
									<FolderCard
										key={azureFolder.id}
										folder={azureFolder}
										onClick={() => setMoveToFolder(azureFolder)}
										selected={azureFolder.id === moveToFolder?.id}
										onOpenClick={id => handleGetRootFolderContents(id)}
										withInfo={false}
									/>
								))}
						</MoveFoldersModalContainer>
					</MoveModalBodyContainer>
				</Modal.Body>
				<Modal.Footer>
					<DefaultButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleCloseMoveFolderModal}
					/>
					<PrimaryButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.move)}
						onClick={handleMoveAzureFolder}
						disabled={!moveToFolder || moveAzureFolderLoading}
						loading={moveAzureFolderLoading}
					/>
				</Modal.Footer>
			</Modal>

			<Modal
				open={showAccessModal}
				onClose={handleCloseAccessModal}
				headerLeftIcon={IconType.EpArrowLeft}
				onBack={handleCheckoutModal}
				title={folderDetails?.name || ''}
				size={ModalSizes.MD}
			>
				<Modal.Body>
					<AccessModalContainer>
						<ModalTabsContainer>
							<ModalTabItem active={true} onClick={() => {}}>
								{translate(({ tabs }) => tabs.access)}
							</ModalTabItem>
							<ModalTabItem active={false} onClick={() => {}}>
								{translate(({ tabs }) => tabs.visibility)}
							</ModalTabItem>
							<ModalTabItem active={false} onClick={() => {}}>
								{translate(({ titles }) => titles.additionalSettings)}
							</ModalTabItem>
						</ModalTabsContainer>

						<MembersListContainer>
							<ListTitleBlock>
								<ListIconBlock>
									<Icon name={IconType.EpEye} color={Colors.blue[100]} />
								</ListIconBlock>
								<ListTitle>
									{translate(({ titles }) => titles.everyoneInThisListHasAccess)}
								</ListTitle>
							</ListTitleBlock>
							<MembersList>
								{folderDetails?.accessList &&
									folderDetails?.accessList.map(
										(userPermission: UserPermissionOption) => (
											<MemberAccessCard
												key={userPermission.id}
												member={userPermission.user}
												memberPermission={userPermission.permissions}
												permissionId={userPermission.id}
												getPermission={handleUpdateAzureFolderPermission}
											/>
										)
									)}
							</MembersList>
						</MembersListContainer>

						<MembersListContainer>
							<ListTitleBlock>
								<ListIconBlock>
									<Icon name={IconType.EpEyeSlash} color={Colors.blue[100]} />
								</ListIconBlock>
								<ListTitle>..except</ListTitle>
							</ListTitleBlock>
							<MembersList>
								{workspaceMembers &&
									workspaceMembers.length > 0 &&
									workspaceMembers.map(member => (
										<MemberAccessCard
											key={member.id}
											member={member}
											getPermission={handleUpdateAzureFolderPermission}
											disabled={folderDetails?.accessList.some(
												({ user }) => user.id === member.id
											)}
										/>
									))}
							</MembersList>
						</MembersListContainer>
					</AccessModalContainer>
				</Modal.Body>
				<Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
					<FooterBlockContent>
						<DefaultButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.unShare)}
							onClick={handleCloseAccessModal}
						/>
					</FooterBlockContent>
					{folderDetails?.accessList && folderDetails?.accessList.length > 0 ? (
						<DefaultButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.cancel)}
							onClick={handleCheckoutModal}
						/>
					) : null}
					{folderDetails?.accessList && folderDetails?.accessList.length > 0 ? (
						<PrimaryButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.showWithNew, {
								access: folderDetails?.accessList.length
							})}
							onClick={handleCheckoutModal}
						/>
					) : (
						<PrimaryButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.done)}
							onClick={handleCheckoutModal}
						/>
					)}
				</Modal.Footer>
			</Modal>

			<PageTopBarBlock>
				<PageTopBarItem>
					<BreadcrumbBlock>
						{breadcrumbsData.map((breadcrumb, i) => (
							<Fragment key={`breadcrumb-item-${i}`}>
								<BreadcrumbItem>{breadcrumb}</BreadcrumbItem>
								<BreadcrumbDivider>/</BreadcrumbDivider>
							</Fragment>
						))}
						<BreadcrumbItem>{folderDetails?.name}</BreadcrumbItem>
						<BreadcrumbItem>
							<GhostButton
								size={ButtonSize.SM}
								icon={IconType.EpMoveFolder}
								tooltip={translate(({ buttons }) => buttons.move)}
								onClick={handleOpenMoveFolderModal}
							/>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Badge title={folderDetails?.status} type={BadgeTypes.Default} />
						</BreadcrumbItem>
					</BreadcrumbBlock>
				</PageTopBarItem>
				<PageTopBarItem>
					<GhostButton
						size={ButtonSize.SM}
						leftIcon={IconType.EpGlobe}
						title={translate(({ buttons }) => buttons.manageAccess)}
						onClick={handleShowAccessModal}
					/>
					<Dropdown>
						<Dropdown.Item onClick={handleCreateAzureFolder}>
							<Dropdown.ItemIcon name={IconType.EpPlus} />
							{translate(({ buttons }) => buttons.addPageFolder)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => {}}>
							<Dropdown.ItemIcon name={IconType.EpOpen} />
							{translate(({ buttons }) => buttons.viewInfo)}
						</Dropdown.Item>
						<Dropdown.Item onClick={() => setShowRenameModal(true)}>
							<Dropdown.ItemIcon name={IconType.EpEdit} />
							{translate(({ buttons }) => buttons.rename)}
						</Dropdown.Item>
						<Dropdown.Item onClick={handleOpenMoveFolderModal}>
							<Dropdown.ItemIcon name={IconType.EpMoveFolder} />
							{translate(({ buttons }) => buttons.move)}
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item onClick={() => {}}>
							<Dropdown.ItemIcon
								name={
									folderDetails?.isPrivate ? IconType.EpEyeSlash : IconType.EpEye
								}
							/>
							{translate(({ buttons }) => buttons.private)}
							<Switch
								checked={!!folderDetails?.isPrivate}
								onChange={e => handleUpdateAzureFolderIsPrivate(e.target.checked)}
								disabled={updateAzureFolderIsPrivateLoading}
								size={SwitchSizes.SM}
							/>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item onClick={handleDeleteAzureFolder} type={'danger'}>
							<Dropdown.ItemIcon name={IconType.EpTrash} />
							{translate(({ buttons }) => buttons.delete)}
						</Dropdown.Item>
					</Dropdown>
				</PageTopBarItem>
			</PageTopBarBlock>

			<PageTitleBlock>
				<PageHeaderBlock>
					<Icon name={IconType.EpUser} />
					<PageTitle>{folderDetails?.name}</PageTitle>
				</PageHeaderBlock>
				<Dropdown toggleComponent={() => <Icon name={IconType.EpPlus} />}>
					<Dropdown.Item onClick={handleShowUploadModal}>
						<Dropdown.ItemIcon name={IconType.EpUploadFile} />
						{translate(({ buttons }) => buttons.upload)}
					</Dropdown.Item>
					<Dropdown.Item disabled onClick={() => {}}>
						<Dropdown.ItemIcon name={IconType.EpNewDocument} />
						{translate(({ buttons }) => buttons.newDocument)}
					</Dropdown.Item>
					<Dropdown.Item onClick={handleCreateAzureFolder}>
						<Dropdown.ItemIcon name={IconType.EpFolder} />
						{translate(({ buttons }) => buttons.newFolder)}
					</Dropdown.Item>
				</Dropdown>

				<GhostButton
					size={ButtonSize.SM}
					icon={IconType.EpEdit}
					tooltip={translate(({ buttons }) => buttons.rename)}
					onClick={() => setShowRenameModal(true)}
				/>
			</PageTitleBlock>

			<PageFilters>
				<FiltersLeftBlock>
					<FiltersItem>
						{translate(({ titles }) => titles.allDocuments)}{' '}
						{folderDetails?.documents.length}
					</FiltersItem>
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

			<FolderModalUpload
				size={uploadFileStep !== 4 ? ModalSizes.LG : ModalSizes.XL}
				title={
					uploadFileStep !== 4
						? translate(({ titles }) => titles.uploadContent)
						: translate(({ titles }) => titles.uploadSettings)
				}
				headerLeftIcon={uploadFileStep === 4 ? IconType.EpArrowLeft : ''}
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
									{document.length > 0 &&
										document.map(document => (
											<UploadFileRelatedCardItems
												key={document.id}
												document={document}
												handleSetStep={handleSetStep}
												onDelete={handleDeleteDocument}
												showAttachedFiles={false}
												onClick={() => {}}
											/>
										))}
								</ComponentBlock>
							)}

							{uploadFileStep === 4 && (
								<ComponentBlock>
									{document.length > 0 &&
										document.map(document => (
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
							uploadFileStep === 3
						}
						loading={uploadDocumentsToAzureFolderLoading}
						onClick={handleUploadDocumentToAzureFolder}
					/>
				</Modal.Footer>
			</FolderModalUpload>

			<PageMainContent>
				<ComponentBlock>
					{publishedDocs.length > 0 ? (
						<PageSubTitle>
							{translate(({ titles }) => titles.published)} {publishedDocs.length}
						</PageSubTitle>
					) : (
						<EmptyCard
							title={translate(({ titles }) => titles.noDocumentUploaded)}
							iconName={IconType.EpEmptyDoc}
							buttonTitle={translate(({ titles }) => titles.upload)}
							onCustomClick={handleShowUploadModal}
						/>
					)}
					<DocumentsList>
						{!getFolderByIdLoading ? (
							publishedDocs.length > 0 &&
							publishedDocs.map(document => (
								<DocumentCard key={document.id} document={document} />
							))
						) : (
							<ListLoader />
						)}
					</DocumentsList>
				</ComponentBlock>
			</PageMainContent>
		</PageContainer>
	);
}
