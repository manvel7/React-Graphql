import React, { useState, useEffect } from 'react';

import { Document, AzureFolder } from '@epolitiker/api';

import {
	useAlerts,
	useCreateAzureFolderMutation,
	useDeleteDocumentMutation,
	useEffectOnce,
	useGetFolderByIdLazyQuery,
	useGetFolderContentsByIdLazyQuery,
	useLocalStorage,
	useNavigation,
	useTranslation,
	useUploadOrConnectDocumentsToFolderMutation
} from '../../hooks';
import {
	PageContainer,
	PageTopBar,
	PageFilterBar,
	PageWrapper,
	PageSideBarContainer,
	SideBarList,
	SideBarItem,
	FilterBarText,
	PageMainContent,
	ComponentBlock,
	HeadingBlock,
	PageHeading,
	DocumentCard,
	DocumentsContainer,
	NavBlock,
	NavButton,
	AllFolderContent
} from './DocumentsPage.style';
import {
	ButtonSize,
	Drawer,
	Dropdown,
	Icon,
	ListLoader,
	ModalSizes,
	PageTitlePanel,
	PrimaryButton,
	SearchInput
} from '../../components/ui';
import { AzureFolderType, IconType, StorageKey } from '../../consts';
import {
	DocumentDrawerCard,
	FileModalCard,
	FolderDefaultCard,
	MeetingRelatedItemsCard,
	UploadFileCard,
	UploadFileCardWithCheckbox,
	UploadFileRelatedCardItems
} from '../../components/cards';
import {
	Container,
	ContentBlockCard,
	FileDropInput,
	FileDropZone,
	FileSubTitle,
	FileTitle,
	GhostButton,
	HeaderTitleBlock,
	IconPlusBlock,
	ModalBlock,
	ModalItemContent,
	ModalMainContent,
	ModalSidebarContent,
	ModalSubHeader,
	ModalSubHeaderTitle,
	SidebarItem,
	Modal,
	UploadFileModalContainer,
	UploadIconContent
} from '../../components/SidebarMenu/SidebarMenu.style';
import { useDropzone } from 'react-dropzone';

export function DocumentsPage() {
	const translate = useTranslation();
	const { routes, navigate } = useNavigation();
	const [workspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const { setNotification, setError } = useAlerts();

	const [documents, setDocuments] = useState<Document[]>([]);
	const [, setRootFolders] = useState<AzureFolder[]>([]);
	const [privateFolders, setPrivateFolders] = useState<AzureFolder[]>([]);
	const [sharedFolders, setSharedFolders] = useState<AzureFolder[]>([]);
	const [committeesFolders, setCommitteesFolders] = useState<AzureFolder[]>([]);

	const [docsNavIndex, setDocsNavIndex] = useState(0);
	const [navIsDisabled, setNavIsDisabled] = useState(false);
	const [activeTab, setActiveTab] = useState(0);

	const [showDocumentDrawer, setShowDocumentDrawer] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

	const [showUploadModal, setShowUploadModal] = useState(false);
	const [documentsModal, setDocumentsModal] = useState<Document[]>([]);
	const [fileInfo, setFileInfo] = useState<File | undefined | null>();
	const [uploadFileStep, setUploadFileStep] = useState(1);

	const [checked, setChecked] = useState<boolean>(false);

	const [getFolderById, { data: getFolderByIdData }] = useGetFolderByIdLazyQuery();

	const [
		getFolderContents,
		{ data: getFolderContentsData, loading: getFolderContentsLoading }
	] = useGetFolderContentsByIdLazyQuery();

	const [
		uploadDocumentsToAzureFolder,
		{ data: uploadDocumentsToAzureFolderData, loading: uploadDocumentsToAzureFolderLoading }
	] = useUploadOrConnectDocumentsToFolderMutation();

	const [
		deleteDocument,
		{ data: deleteDocumentData, loading: deleteDocumentLoading }
	] = useDeleteDocumentMutation();

	const [createAzureFolder, { data: createAzureFolderData }] = useCreateAzureFolderMutation();

	useEffectOnce(() => {
		handleGetWorkspaceFolder();
		handleGetWorkspaceFolderContents();
	});

	//Get workspace folder
	function handleGetWorkspaceFolder() {
		getFolderById({
			variables: {
				data: {
					id: workspace.folder.id
				}
			}
		});
	}

	useEffect(() => {
		if (getFolderByIdData) {
			setDocuments(getFolderByIdData.getFolderById.documents);
		}
	}, [getFolderByIdData]);

	// Get workspace folder contents
	function handleGetWorkspaceFolderContents() {
		getFolderContents({
			variables: {
				data: {
					azureFolderWhereUniqueInput: { id: workspace.folder.id }
				}
			}
		});
	}

	useEffect(() => {
		if (getFolderContentsData) {
			const folders = getFolderContentsData.getFolderContentsById.folders;
			setRootFolders(folders);
			setPrivateFolders(folders.filter(folder => folder.isPrivate === true));
			setSharedFolders(folders.filter(folder => folder.isPrivate === false));
			setCommitteesFolders(
				folders.filter(folder => folder.type === AzureFolderType.COMMITTEE)
			);
		}
	}, [getFolderContentsData]);

	// Create Azure Folder
	function handleCreateAzureFolder() {
		createAzureFolder({
			variables: {
				data: {
					parentFolderWhereUniqueInput: { id: workspace.folder.id }
				}
			}
		});
	}

	useEffect(() => {
		if (createAzureFolderData) {
			const folder = createAzureFolderData.createAzureFolder;
			navigate(routes.folder(folder.id));
		}
	}, [createAzureFolderData]);

	// function handleNavigateToFolderPage(folderId: string) {
	// 	navigate(routes.folder(folderId));
	// }

	function handleDocsPrev() {
		setNavIsDisabled(true);
		setDocsNavIndex(i => i - 1);
	}

	function handleDocsNext() {
		setNavIsDisabled(true);
		setDocsNavIndex(i => i + 1);
	}

	useEffect(() => {
		if (navIsDisabled) {
			const timer = setTimeout(() => setNavIsDisabled(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [navIsDisabled]);

	const toMS = (date: string) => new Date(date).getTime();

	function handleToggleDocumentDrawer(document: Document) {
		if (selectedDocument && showDocumentDrawer && document.id === selectedDocument.id) {
			setSelectedDocument(null);
			setShowDocumentDrawer(false);
			return;
		}
		setSelectedDocument(document);
		setShowDocumentDrawer(true);
	}

	//Upload file with modal

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

	const handleUploadMore = () => {
		setUploadFileStep(1);
	};

	function handleShowUploadModal() {
		setShowUploadModal(true);
	}

	function handleHideUploadModal() {
		setShowUploadModal(false);
		setDocumentsModal([]);
		if (fileInfo) {
			setFileInfo(null);
		}
		setUploadFileStep(1);
	}

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
			setDocumentsModal(state => [...state, ...uploadedDocuments]);
			setNotification({ message: 'Document uploaded successfully!' });
			setUploadFileStep(3);
		}
	}, [uploadDocumentsToAzureFolderData]);

	return (
		<PageContainer>
			<Drawer
				open={showDocumentDrawer}
				onClose={() => setShowDocumentDrawer(false)}
				title={'Document info'}
			>
				<DocumentDrawerCard document={selectedDocument ? selectedDocument : null} />
			</Drawer>
			<PageTopBar>{translate(({ titles }) => titles.documents)}</PageTopBar>

			<PageWrapper>
				<PageSideBarContainer>
					<SideBarItem onClick={() => setActiveTab(tab => (tab === 1 ? 0 : 1))}>
						Private space <AllFolderContent>{privateFolders.length}</AllFolderContent>
					</SideBarItem>
					<SideBarList>
						{activeTab === 1 &&
							privateFolders.length > 0 &&
							privateFolders.map(folder => (
								<FolderDefaultCard
									withNestedItems
									key={folder.id}
									folder={folder}
									onClick={() => {}}
									iconName={IconType.EpLock}
								/>
							))}
					</SideBarList>
					<SideBarItem onClick={() => setActiveTab(tab => (tab === 2 ? 0 : 2))}>
						Shared folders <AllFolderContent>{sharedFolders.length}</AllFolderContent>
					</SideBarItem>
					<SideBarList>
						{activeTab === 2 &&
							sharedFolders.length > 0 &&
							sharedFolders.map(folder => (
								<FolderDefaultCard
									withNestedItems
									key={folder.id}
									folder={folder}
									onClick={() => {}}
									iconName={IconType.EpMembersColored}
								/>
							))}
					</SideBarList>
					<SideBarItem onClick={() => setActiveTab(tab => (tab === 3 ? 0 : 3))}>
						Committees <AllFolderContent>{committeesFolders.length}</AllFolderContent>
					</SideBarItem>
					<SideBarList>
						{activeTab === 3 &&
							committeesFolders.length > 0 &&
							committeesFolders.map(folder => (
								<FolderDefaultCard
									withNestedItems
									key={folder.id}
									folder={folder}
									onClick={() => {}}
									iconName={IconType.EpSync}
								/>
							))}
					</SideBarList>
				</PageSideBarContainer>

				<PageMainContent>
					<PageTitlePanel title={translate(({ titles }) => titles.documents)}>
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
					</PageTitlePanel>

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
													{translate(
														({ titles }) => titles.fileSelectSubTitle
													)}
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
													title={translate(
														({ titles }) => titles.uploadMore
													)}
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
											{documentsModal.length > 0 &&
												documentsModal.map(document => (
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
											{documentsModal.length > 0 &&
												documentsModal.map(document => (
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

					<PageFilterBar>
						<FilterBarText>
							{translate(({ titles }) => titles.allFolders)} {documents.length}
						</FilterBarText>
						<SearchInput
							value=""
							onChange={() => {}}
							placeholder={translate(({ buttons }) => buttons.search)}
						/>
					</PageFilterBar>

					<ComponentBlock>
						<HeadingBlock>
							<PageHeading>
								{`${translate(({ titles }) => titles.recentlyOpened)} ${
									documents.length
								}`}
							</PageHeading>
							<NavBlock>
								<NavButton
									icon={IconType.EpChevronLeft}
									onClick={handleDocsPrev}
									disabled={navIsDisabled || docsNavIndex === 0}
								/>
								<NavButton
									icon={IconType.EpChevronRight}
									onClick={handleDocsNext}
									disabled={
										navIsDisabled || documents.length / 4 <= docsNavIndex + 1
									}
								/>
							</NavBlock>
						</HeadingBlock>
						<DocumentsContainer>
							{documents.length > 0 &&
								documents
									.sort((a, b) => toMS(b.createdAt) - toMS(a.createdAt))
									.slice(docsNavIndex * 4, docsNavIndex * 4 + 4)
									.map(doc => <DocumentCard key={doc.id} document={doc} />)}
						</DocumentsContainer>
					</ComponentBlock>

					<ComponentBlock>
						<HeadingBlock>
							<PageHeading>Files</PageHeading>
						</HeadingBlock>
						{!getFolderContentsLoading ? (
							documents.length > 0 &&
							documents.map(document => (
								<MeetingRelatedItemsCard
									key={document.id}
									document={document}
									showAttachedFiles={false}
									onClick={doc => handleToggleDocumentDrawer(doc)}
								/>
							))
						) : (
							<ListLoader />
						)}
					</ComponentBlock>

					{/* <ComponentBlock>
						<HeadingBlock>
							<PageHeading>
								{`${translate(({ titles }) => titles.privateSpace)} ${
									privateFolders.length
								}`}
							</PageHeading>
						</HeadingBlock>
						{!getFolderContentsLoading ? (
							privateFolders.length > 0 &&
							privateFolders.map(folder => (
								<FolderCard
									key={folder.id}
									folder={folder}
									iconName={IconType.EpLock}
									onClick={() => handleNavigateToFolderPage(folder.id)}
									onOpenClick={handleNavigateToFolderPage}
								/>
							))
						) : (
							<ListLoader />
						)}
						<GhostButton
							leftIcon={IconType.EpPlus}
							title={translate(({ buttons }) => buttons.folder)}
							onClick={handleCreateAzureFolder}
							loading={createAzureFolderLoading}
							disabled={createAzureFolderLoading}
						/>
					</ComponentBlock> */}

					{/* <ComponentBlock>
						<HeadingBlock>
							<PageHeading>
								{`${translate(({ titles }) => titles.sharedFolders)} ${
									sharedFolders.length
								}`}
							</PageHeading>
						</HeadingBlock>
						{!getFolderContentsLoading ? (
							sharedFolders.length > 0 &&
							sharedFolders.map(folder => (
								<FolderCard
									key={folder.id}
									folder={folder}
									iconName={IconType.EpMembersColored}
									onClick={() => handleNavigateToFolderPage(folder.id)}
									onOpenClick={handleNavigateToFolderPage}
								/>
							))
						) : (
							<ListLoader />
						)}
						<GhostButton
							leftIcon={IconType.EpPlus}
							title={translate(({ buttons }) => buttons.folder)}
							onClick={() => {}}
						/>
					</ComponentBlock> */}

					{/* <ComponentBlock>
						<HeadingBlock>
							<PageHeading>{translate(({ titles }) => titles.committees)}</PageHeading>
						</HeadingBlock>
						{!getFolderContentsLoading ? (
							committeesFolders.length > 0 &&
							committeesFolders.map(folder => (
								<FolderCard
									key={folder.id}
									folder={folder}
									iconName={IconType.EpSync}
									onClick={() => handleNavigateToFolderPage(folder.id)}
									onOpenClick={handleNavigateToFolderPage}
								/>
							))
						) : (
							<ListLoader />
						)}
					</ComponentBlock> */}
				</PageMainContent>
			</PageWrapper>
		</PageContainer>
	);
}
