import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { Workspace, Document, UserAccount } from '@epolitiker/api';

import {
	SidebarContainer,
	NavigationContainer,
	NavBar,
	NavItem,
	NavLink,
	LinkIcon,
	LinkTitle,
	MenuHeader,
	HeaderLogo,
	HeaderTitle,
	QuickSearchBlock,
	CreateBlock,
	NavbarTitle,
	DropdownItemIcon,
	NavLinkForLogout,
	Modal,
	UploadFileModalContainer,
	ModalSidebarContent,
	SidebarItem,
	ModalMainContent,
	ModalSubHeader,
	ModalSubHeaderTitle,
	FileTitle,
	FileSubTitle,
	ModalItemContent,
	ComponentBlock,
	HeadingBlock,
	PageHeading,
	Container,
	ContentBlockCard,
	HeaderTitleBlock,
	GhostButton,
	IconPlusBlock,
	ModalBlock,
	FileDropZone,
	FileDropInput,
	UploadIconContent,
	UserBlockSidebar,
	UserNameSidebar
} from './SidebarMenu.style';
import { IconType, StorageKey } from '../../consts';
import {
	useNavigation,
	useTranslation,
	useWorkspaceDetailsQuery,
	useEffectOnce,
	useCreateAzureFolderMutation,
	useUploadOrConnectDocumentsToFolderMutation,
	useLocalStorage,
	useIsAdmin,
	useAlerts,
	useDeleteDocumentMutation
} from '../../hooks';

import {
	Icon,
	Dropdown,
	SearchInput,
	DropdownPosition,
	ModalSizes,
	PrimaryButton,
	ButtonSize,
	Avatar,
	AvatarSize,
	Drawer
} from '../ui';

import {
	AuthUserDrawerCard,
	FileModalCard,
	UploadFileCard,
	UploadFileCardWithCheckbox,
	UploadFileRelatedCardItems
} from '../cards';

import { Overview } from '../Overview';
import { useAuthUser } from '../../hooks/ui/useAuthUser';
import { userDrawerCardProps } from '../cards/AuthUserDrawerCard';
import { Nullable } from '../../types';

interface SidebarMenuProps {
	withOverview: boolean;
}

export function SidebarMenu({ withOverview }: SidebarMenuProps) {
	const translate = useTranslation();
	const { routes, navigate } = useNavigation();
	const { setNotification, setError } = useAlerts();
	const [storageActiveWorkspace, , removeStorageActiveWorkspace] = useLocalStorage(
		StorageKey.ActiveWorkspace
	);
	const [, , removeAuthToken] = useLocalStorage(StorageKey.Token);
	const [workspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const { authUser } = useAuthUser();
	const isLoggedAdmin = useIsAdmin();

	const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [documents, setDocuments] = useState<Document[]>([]);
	const [fileInfo, setFileInfo] = useState<File | undefined | null>();
	const [uploadFileStep, setUploadFileStep] = useState(1);
	const [checked, setChecked] = useState<boolean>(false);
	const [showMemberDrawer, setShowMemberDrawer] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

	const [getWorkspaceDetails, { data: workspaceDetailsData }] = useWorkspaceDetailsQuery();

	const [
		createAzureFolder,
		{ data: createAzureFolderData, loading: createAzureFolderLoading }
	] = useCreateAzureFolderMutation();

	const [
		uploadDocumentsToAzureFolder,
		{ data: uploadDocumentsToAzureFolderData, loading: uploadDocumentsToAzureFolderLoading }
	] = useUploadOrConnectDocumentsToFolderMutation();

	const [
		deleteDocument,
		{ data: deleteDocumentData, loading: deleteDocumentLoading }
	] = useDeleteDocumentMutation();

	//Dropzone Upload

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
			setDocuments(state => [...state, ...uploadedDocuments]);
			setNotification({ message: 'Document uploaded successfully!' });
			setUploadFileStep(3);
		}
	}, [uploadDocumentsToAzureFolderData]);

	const navigationData =
		isLoggedAdmin === true
			? [
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.dashboard),
						icon: IconType.EpWorkspaceSidebar,
						path: routes.dashboard,
						withMarginBottom: true
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.requests),
						icon: IconType.EpRequests,
						path: routes.requests,
						withMarginBottom: true
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.calendar),
						icon: IconType.EpCalendarSidebar,
						path: routes.calendar,
						withMarginBottom: false
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.members),
						icon: IconType.EpMembersSidebar,
						path: routes.members,
						withMarginBottom: false
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.committees),
						icon: IconType.EpCommitteesSidebar,
						path: routes.committees,
						withMarginBottom: true
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.documents),
						icon: IconType.EpDocsSidebar,
						path: routes.documents,
						withMarginBottom: false
					},
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.protocols),
					// 	icon: IconType.EpDocument,
					// 	path: '/protocols',
					// 	withMarginBottom: false
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.polls),
					// 	icon: IconType.EpPolls,
					// 	path: '/polls',
					// 	withMarginBottom: false
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.uploadsHistory),
					// 	icon: IconType.EpPolls,
					// 	path: '/polls',
					// 	withMarginBottom: true
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.communication),
					// 	icon: IconType.EpRegComment,
					// 	path: '/communication',
					// 	withMarginBottom: false
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.news),
					// 	icon: IconType.EpMegaphone,
					// 	path: '/news-room',
					// 	withMarginBottom: false
					// },
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.settings),
						icon: IconType.EpSettingsSidebar,
						path: routes.workspaceSettings,
						withMarginBottom: false
					}
			  ]
			: [
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.dashboard),
						icon: IconType.EpWorkspaceSidebar,
						path: routes.calendar,
						withMarginBottom: true
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.calendar),
						icon: IconType.EpCalendarSidebar,
						path: routes.calendar,
						withMarginBottom: false
					},
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.attendance),
					// 	icon: IconType.EpAttendance,
					// 	path: '/attendance',
					// 	withMarginBottom: true
					// },
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.members),
						icon: IconType.EpMembersSidebar,
						path: routes.members,
						withMarginBottom: false
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.committees),
						icon: IconType.EpCommitteesSidebar,
						path: routes.committees,
						withMarginBottom: true
					},
					{
						title: translate(({ sideMenuLinks }) => sideMenuLinks.documents),
						icon: IconType.EpDocsSidebar,
						path: routes.documents,
						withMarginBottom: false
					}
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.protocols),
					// 	icon: IconType.EpDocument,
					// 	path: '/protocols',
					// 	withMarginBottom: false
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.polls),
					// 	icon: IconType.EpPolls,
					// 	path: '/polls',
					// 	withMarginBottom: false
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.uploadsHistory),
					// 	icon: IconType.EpPolls,
					// 	path: '/polls',
					// 	withMarginBottom: true
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.communication),
					// 	icon: IconType.EpRegComment,
					// 	path: '/communication',
					// 	withMarginBottom: false
					// },
					// {
					// 	title: translate(({ sideMenuLinks }) => sideMenuLinks.news),
					// 	icon: IconType.EpMegaphone,
					// 	path: '/news-room',
					// 	withMarginBottom: false
					// }
			  ];

	const createDropDownItems = [
		{
			title: translate(({ buttons }) => buttons.uploadFile),
			icon: IconType.EpUploadFile,
			onClick: () => handleShowUploadModal(),
			disabled: false
		},
		{
			title: translate(({ buttons }) => buttons.newDocument),
			icon: IconType.EpNewDocument,
			onClick: () => handleNavigateTo(''),
			disabled: true
		},
		{
			title: translate(({ buttons }) => buttons.page),
			icon: IconType.EpPage,
			onClick: () => handleNavigateTo(''),
			disabled: true
		},
		{
			title: translate(({ buttons }) => buttons.folder),
			icon: IconType.EpFolder,
			onClick: () => handleCreateAzureFolder(),
			disabled: createAzureFolderLoading
		},
		{
			title: translate(({ buttons }) => buttons.directory),
			icon: IconType.EpMembers,
			onClick: () => handleNavigateTo(routes.committees),
			disabled: false
		},
		{
			title: translate(({ buttons }) => buttons.event),
			icon: IconType.EpEvent,
			onClick: () => handleNavigateTo(routes.createOrEditMeeting),
			disabled: false
		},
		{
			title: translate(({ buttons }) => buttons.poll),
			icon: IconType.EpPollFilled,
			onClick: () => handleNavigateTo(''),
			disabled: true
		}
	];

	useEffectOnce(() => {
		handleGetWorkspaceDetails();
		// handleGetWorkspaceFolderContents();
	});

	function handleGetWorkspaceDetails() {
		if (storageActiveWorkspace) {
			getWorkspaceDetails({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: storageActiveWorkspace.id }
					}
				}
			});
		}
	}

	useEffect(() => {
		if (workspaceDetailsData) {
			setActiveWorkspace(workspaceDetailsData.workspaceDetails);
		}
	}, [workspaceDetailsData]);

	function logOut() {
		removeAuthToken();
		removeStorageActiveWorkspace();
		navigate(routes.login);
	}

	function handleNavigateTo(routerPath: string) {
		navigate(routerPath);
	}

	function handleCreateAzureFolder() {
		createAzureFolder({
			variables: {
				data: {
					parentFolderWhereUniqueInput: { id: activeWorkspace?.folder?.id }
				}
			}
		});
	}

	useEffect(() => {
		if (createAzureFolderData) {
			const folderId = createAzureFolderData.createAzureFolder.id;
			handleNavigateTo(routes.folder(folderId));
		}
	}, [createAzureFolderData]);

	//Delete Uploaded File
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
		setDocuments([]);
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

	function handleNavigateToDashboard() {
		navigate(routes.dashboard);
	}

	function handleToggleMemberDrawer(user: Nullable<UserAccount>) {
		if (selectedUser && showMemberDrawer && user!.id === selectedUser.id) {
			setSelectedUser(null);
			setShowMemberDrawer(false);
			return;
		}
		setSelectedUser(user);
		setShowMemberDrawer(true);
	}

	// @ts-ignore
	return (
		<SidebarContainer>
			<NavigationContainer>
				<MenuHeader onClick={handleNavigateToDashboard}>
					<HeaderLogo src={authUser?.avatar?.url} />
					<HeaderTitle>{authUser?.firstName}</HeaderTitle>
				</MenuHeader>

				<QuickSearchBlock>
					<SearchInput
						value={''}
						onChange={() => {}}
						placeholder={translate(({ buttons }) => buttons.quickSearch)}
					/>
				</QuickSearchBlock>

				<CreateBlock>
					<Dropdown
						floating
						position={DropdownPosition.Left}
						toggleComponent={() => (
							<>
								<Icon name={IconType.EpPlus} />
								<Dropdown.Title>
									{translate(({ buttons }) => buttons.create)}
								</Dropdown.Title>
							</>
						)}
					>
						{createDropDownItems.map((item, index) => (
							<Dropdown.Item
								key={`create-option-${index}`}
								onClick={item.onClick}
								disabled={item.disabled}
							>
								<DropdownItemIcon name={item.icon} />
								{item.title}
							</Dropdown.Item>
						))}
					</Dropdown>

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
				</CreateBlock>
				<Drawer
					open={showMemberDrawer}
					onClose={() => setShowMemberDrawer(false)}
					title={translate(({ titles }) => titles.profileInfo)}
				>
					<AuthUserDrawerCard
						user={selectedUser ? selectedUser : null}
						height={userDrawerCardProps.Craditionals}
					/>
				</Drawer>
				<NavBar>
					<NavbarTitle>{translate(({ titles }) => titles.workspace)}</NavbarTitle>
					{navigationData.map((item, index) => {
						return (
							<NavItem
								key={`nav-item-${index}`}
								withMarginBottom={item.withMarginBottom}
							>
								<NavLink to={item.path}>
									<LinkIcon>
										<Icon name={item.icon} />
									</LinkIcon>
									<LinkTitle>{item.title}</LinkTitle>
								</NavLink>
							</NavItem>
						);
					})}

					<NavItem>
						<UserBlockSidebar onClick={() => handleToggleMemberDrawer(authUser)}>
							<Avatar
								image={authUser?.avatar?.url}
								size={AvatarSize.XS}
							/>
							<UserNameSidebar>{authUser?.firstName}</UserNameSidebar>
						</UserBlockSidebar>
						<NavLinkForLogout onClick={logOut}>
							<LinkTitle>{translate(({ buttons }) => buttons.logout)}</LinkTitle>
						</NavLinkForLogout>
					</NavItem>
				</NavBar>
			</NavigationContainer>
			{withOverview && <Overview />}
		</SidebarContainer>
	);
}
