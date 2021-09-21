import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult, Draggable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import { Meeting, AgendaItem, Document } from '@epolitiker/api';

import {
	PageContainer,
	PageFilters,
	FiltersLeftBlock,
	FiltersItem,
	FiltersRightBlock,
	PageFooter,
	MeetingAgendaTable,
	Thead,
	Tr,
	Th,
	Td,
	TableActionsWrapper,
	PrimaryButton,
	TitleColumnContainer,
	DragIcon,
	DroppableTableBody,
	DragHandleContainer,
	ExpandRowBlock,
	ConfirmBlock,
	ConfirmBlockText,
	ConfirmModal
} from './MeetingAgenda.style';
import {
	SearchInput,
	SortOrFilterMenu,
	GhostButton,
	Dropdown,
	Icon,
	ModalSizes,
	ButtonSize,
	Notification
} from '../../ui';
import { IconType, StorageKey } from '../../../consts';
import { Colors } from '../../../environment';
import {
	AgendaTableRepresentorCard,
	AgendaItemTitleCard,
	AgendaTableDocumentsCard,
	AgendaTableDurationCard,
	UploadFileCard,
	UploadFileRelatedCardItems,
	UploadFileCardWithCheckbox,
	FileModalCard
} from '../../cards';
import {
	useAddAgendaItemInMeetingMutation,
	useTranslation,
	useDeleteAgendaItemMutation,
	useAlerts,
	useUpdateAgendaItemMutation,
	useDeleteDocumentMutation,
	useUploadOrConnectDocumentsToFolderMutation,
	useLocalStorage,
	useMoveAgendaItemMutation,
	useAllAgendaItemsInMeetingLazyQuery,
	useEffectOnce
} from '../../../hooks';
import { SelectDocuments } from '../../documents';
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
} from '../../SidebarMenu/SidebarMenu.style';

interface MeetingAgendaProps {
	meeting: Meeting | null;
}

export function MeetingAgenda({ meeting }: MeetingAgendaProps) {
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const { setNotification, setError } = useAlerts();

	const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
	const [agendaItemToUpdate, setAgendaItemToUpdate] = useState<AgendaItem | null>(null);

	const [showDocsPopoverById, setShowDocsPopoverById] = useState('');
	const [showSelectDocsModal, setShowSelectDocsModal] = useState(false);
	const [hideDocsPopover, setHideDocsPopover] = useState(false);
	const [closeRepresentorModalFromOutside, setCloseRepresentorModalFromOutside] = useState(false);
	const [docsToConnect, setDocsToConnect] = useState<string[]>([]);

	const [expandedRows, setExpandedRows] = useState<string[]>([]);

	const [confirm, setConfirm] = useState(false);
	const [agenda, setAgenda] = useState<string | undefined>(undefined);
	const [agendaWhereToUpload, setAgendaWhereToUpload] = useState<AgendaItem | null>(null);

	const [showUploadModal, setShowUploadModal] = useState(false);
	const [documents, setDocuments] = useState<Document[]>([]);
	const [fileInfo, setFileInfo] = useState<File | undefined | null>();
	const [uploadFileStep, setUploadFileStep] = useState(1);

	const [checked, setChecked] = useState<boolean>(false);

	const [
		allAgendaItemsInMeeting,
		{ data: allAgendaItemsInMeetingData }
	] = useAllAgendaItemsInMeetingLazyQuery();

	const [
		addAgendaItemInMeeting,
		{ data: addAgendaItemInMeetingData, loading: addAgendaItemInMeetingLoading }
	] = useAddAgendaItemInMeetingMutation();

	const [
		updateAgendaItem,
		{ data: updateAgendaItemData, loading: updateAgendaItemLoading }
	] = useUpdateAgendaItemMutation();

	const [
		uploadDocumentToFolder,
		{ data: uploadDocumentToFolderData, loading: uploadDocumentToFolderLoading }
	] = useUploadOrConnectDocumentsToFolderMutation();

	const [
		connectDocumentsToFolder,
		{ data: connectDocumentsToFolderData, loading: connectDocumentsToFolderLoading }
	] = useUploadOrConnectDocumentsToFolderMutation();

	const [
		deleteAgendaItem,
		{ data: deleteAgendaItemData, loading: deleteAgendaItemLoading }
	] = useDeleteAgendaItemMutation();

	const [moveAgendaItem] = useMoveAgendaItemMutation();

	const [deleteDocument, { data: deleteDocumentData }] = useDeleteDocumentMutation();

	function handleShowConfirmModal(agendaId: string) {
		setAgenda(agendaId);
		setConfirm(true);
	}

	function handleCloseConfirmModal() {
		setConfirm(false);
	}
	useEffectOnce(() => {
		if (meeting) {
			handleGetAllAgendaItems();
		}
	});

	// Get meeting Agenda items
	function handleGetAllAgendaItems() {
		allAgendaItemsInMeeting({
			variables: {
				data: {
					meetingWhereUniqueInput: { id: meeting?.id },
					orderBy: 'order_ASC',
					where: {
						isParent: true
					}
				}
			}
		});
	}

	useEffect(() => {
		if (allAgendaItemsInMeetingData) {
			setAgendaItems(allAgendaItemsInMeetingData.allAgendaItemsInMeeting);
		}
	}, [allAgendaItemsInMeetingData]);

	//ADD Agenda
	function handleAddAgendaItem(agendaParentId?: string) {
		if (agendaParentId) {
			// Create agenda Sub item
			addAgendaItemInMeeting({
				variables: {
					data: {
						agendaItemCreateInput: {
							meeting: { connect: { id: meeting?.id } },
							isParent: false
						},
						parentItemWhereUniqueInput: { id: agendaParentId }
					}
				}
			});
		} else {
			// Create agenda item
			addAgendaItemInMeeting({
				variables: {
					data: {
						agendaItemCreateInput: {
							meeting: { connect: { id: meeting?.id } },
							isParent: true
						}
					}
				}
			});
		}
	}

	useEffect(() => {
		if (addAgendaItemInMeetingData) {
			if (meeting) {
				const newAgenda = addAgendaItemInMeetingData.addAgendaItemInMeeting;
				if (newAgenda.isParent) {
					setAgendaItems(state => [...state, newAgenda]);
				}
				setNotification({ message: 'Agenda item added successfully!' });
			}
		}
	}, [addAgendaItemInMeetingData]);

	// //Connect Documents To Agenda Item
	function handleConnectDocumentsToMeetingAgendaFolder() {
		if (activeWorkspace) {
			connectDocumentsToFolder({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						parentFolderWhereUniqueInput: { id: agendaItemToUpdate?.folder?.id },
						document: {
							connect: docsToConnect.map(id => ({ id: id }))
						},
						file: {}
					}
				}
			});
		}
	}

	useEffect(() => {
		if (connectDocumentsToFolderData) {
			setNotification({ message: 'Document connected successfully!' });
			setAgendaItemToUpdate(null);
			handleCloseModal();
			handleGetAllAgendaItems();
		}
	}, [connectDocumentsToFolderData]);

	//Upload with Modal
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

	// // Upload document to Agenda
	function handleUploadDocumentToMeetingAgendaFolder() {
		if (activeWorkspace) {
			uploadDocumentToFolder({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						parentFolderWhereUniqueInput: { id: agendaWhereToUpload?.folder?.id },
						file: fileInfo,
						document: {
							create: {}
						}
					}
				}
			});
		}
	}

	useEffect(() => {
		if (uploadDocumentToFolderData) {
			handleGetAllAgendaItems();
			const uploadedDocuments = uploadDocumentToFolderData.uploadOrConnectDocumentsToFolder;
			setDocuments(state => [...state, ...uploadedDocuments]);
			setNotification({ message: 'Document uploaded to Agenda item successfully!' });
			setHideDocsPopover(true);
			setUploadFileStep(3);
		}
	}, [uploadDocumentToFolderData]);

	//Delete Agenda
	function handleDeleteAgendaItem() {
		deleteAgendaItem({
			variables: {
				data: {
					id: agenda
				}
			}
		});
	}

	function handleDeleteSubAgentaItem(agendaId: string) {
		deleteAgendaItem({
			variables: {
				data: {
					id: agendaId
				}
			}
		});
	}

	useEffect(() => {
		if (deleteAgendaItemData) {
			setNotification({ message: 'Agenda was removed!' });
			handleCloseConfirmModal();
			handleGetAllAgendaItems();
		}
	}, [deleteAgendaItemData]);

	//Delete Agenda Item Document
	function handleDeleteAgedaItemDocument(docId: string) {
		deleteDocument({
			variables: {
				data: {
					documentWhereUniqueInput: { id: docId }
				}
			}
		});
	}

	useEffect(() => {
		if (deleteDocumentData) {
			setNotification({ message: 'Document removed!' });
			handleGetAllAgendaItems();
		}
	}, [deleteDocumentData]);

	// Update Agenda Item
	function handleUpdateAgedaItem(agendaId: string, dataToUpdate: any) {
		updateAgendaItem({
			variables: {
				data: {
					agendaItemWhereUniqueInput: { id: agendaId },
					agendaItemUpdateInput: dataToUpdate
				}
			}
		});
	}

	useEffect(() => {
		if (updateAgendaItemData) {
			handleGetAllAgendaItems();
			setNotification({ message: 'Agenda updated!' });
			setCloseRepresentorModalFromOutside(true);
		}
	}, [updateAgendaItemData]);

	function handleOpenModal() {
		setShowSelectDocsModal(true);
	}

	function handleCloseModal() {
		setDocsToConnect([]);
		setShowSelectDocsModal(false);
	}

	// Change Agenda Order in list
	function handleChangeAgendaOrder(agendaId: string, oldPosition: number, newPosition: number) {
		moveAgendaItem({
			variables: {
				data: {
					oldPosition: oldPosition,
					newPosition: newPosition,
					agendaItem: { id: agendaId },
					meeting: { id: meeting?.id }
				}
			}
		});
	}

	// Reordering drag&drop list
	function reorder(list: AgendaItem[], startIndex: number, endIndex: number) {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	}

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		if (result.source.index !== result.destination.index) {
			const tempAgendaItems = reorder(
				agendaItems,
				result.source.index,
				result.destination.index
			);
			const agendaToPushId = agendaItems[result.source.index].id;
			handleChangeAgendaOrder(agendaToPushId, result.source.index, result.destination.index);
			setAgendaItems(tempAgendaItems);
		}
	}

	function handleToggleRow(itemId: string) {
		if (expandedRows.includes(itemId)) {
			setExpandedRows(state => state.filter(id => id !== itemId));
		} else {
			setExpandedRows(state => [...state, itemId]);
		}
	}

	if (!meeting) {
		return (
			<Notification>
				{translate(({ titles }) => titles.saveMeetingAfterYouCanManage)}
			</Notification>
		);
	}

	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
	return (
		<PageContainer>
			<ConfirmModal
				size={ModalSizes.XS}
				title={translate(({ titles }) => titles.confirm)}
				open={confirm}
				onClose={handleCloseConfirmModal}
			>
				<Modal.Body>
					<ConfirmBlock>
						<ConfirmBlockText>
							{translate(({ titles }) => titles.confirmMessage)}
						</ConfirmBlockText>
					</ConfirmBlock>
				</Modal.Body>
				<Modal.Footer>
					<GhostButton
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleCloseConfirmModal}
						size={ButtonSize.LG}
					/>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.delete)}
						onClick={handleDeleteAgendaItem}
						size={ButtonSize.LG}
						loading={deleteAgendaItemLoading}
						disabled={deleteAgendaItemLoading}
					/>
				</Modal.Footer>
			</ConfirmModal>
			<Modal
				size={ModalSizes.MD}
				headerLeftIcon={IconType.EpDocumentFilled}
				title={translate(({ titles }) => titles.documents)}
				open={showSelectDocsModal}
				onClose={handleCloseModal}
			>
				<Modal.Body>
					<SelectDocuments
						committee={meeting?.committee}
						docsToConnect={docsToConnect}
						setDocsToConnect={setDocsToConnect}
					/>
				</Modal.Body>
				<Modal.Footer>
					<GhostButton
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleCloseModal}
						size={ButtonSize.LG}
					/>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.select)}
						onClick={handleConnectDocumentsToMeetingAgendaFolder}
						size={ButtonSize.LG}
						disabled={docsToConnect.length < 1 || connectDocumentsToFolderLoading}
						loading={connectDocumentsToFolderLoading}
					/>
				</Modal.Footer>
			</Modal>
			<PageFilters>
				<FiltersLeftBlock>
					<FiltersItem>
						{`${translate(({ titles }) => titles.agendaList)} ${agendaItems.length}`}
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

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="agendaListDroppable">
					{provided => (
						<MeetingAgendaTable>
							<Thead>
								<Tr>
									<Th>
										{translate(
											({ columns }) => columns.admin.titleAndDescription
										)}
									</Th>
									<Th>{translate(({ columns }) => columns.admin.representor)}</Th>
									<Th>
										{translate(
											({ columns }) => columns.admin.documentsAndPolls
										)}
									</Th>
									<Th>{translate(({ columns }) => columns.admin.duration)}</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<DroppableTableBody
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{agendaItems.length > 0 &&
									agendaItems.map((agenda, index) => (
										<Draggable
											draggableId={agenda.id}
											index={index}
											key={agenda.id}
										>
											{(provided, snapshot) => (
												<>
													<Tr
														onClick={() =>
															setAgendaItemToUpdate(agenda)
														}
														ref={provided.innerRef}
														{...provided.draggableProps}
														style={provided.draggableProps.style}
														isDragging={snapshot.isDragging}
													>
														<Td>
															<TitleColumnContainer>
																<DragHandleContainer
																	disabled={false}
																	{...provided.dragHandleProps}
																>
																	<DragIcon
																		name={IconType.EpDragHandle}
																	/>
																</DragHandleContainer>

																<ExpandRowBlock>
																	{agenda.subItems?.length >
																		0 && (
																		<GhostButton
																			size={ButtonSize.SM}
																			icon={
																				expandedRows.includes(
																					agenda.id
																				)
																					? IconType.EpCornerDown
																					: IconType.EpCornerRight
																			}
																			onClick={() =>
																				handleToggleRow(
																					agenda.id
																				)
																			}
																		/>
																	)}
																</ExpandRowBlock>

																<AgendaItemTitleCard
																	order={`${index + 1}.`}
																	handleUpdate={
																		handleUpdateAgedaItem
																	}
																	agenda={agenda}
																/>
															</TitleColumnContainer>
														</Td>
														<Td>
															<AgendaTableRepresentorCard
																committeeId={meeting?.committee.id}
																agendaItem={agenda}
																handleUpdate={handleUpdateAgedaItem}
																updateLoading={
																	updateAgendaItemLoading
																}
																closeRepresentorModalFromOutside={
																	closeRepresentorModalFromOutside
																}
																setCloseRepresentorModalFromOutside={
																	setCloseRepresentorModalFromOutside
																}
															/>
														</Td>
														<Td>
															<AgendaTableDocumentsCard
																agenda={agenda}
																openSelectModal={
																	handleShowUploadModal
																}
																openSelectDocsModal={
																	handleOpenModal
																}
																setWhereToUpload={
																	setAgendaWhereToUpload
																}
																showFromOutside={
																	showDocsPopoverById
																}
																setShowFromOutside={
																	setShowDocsPopoverById
																}
																deleteAgendaDocument={
																	handleDeleteAgedaItemDocument
																}
																hideFromOutside={hideDocsPopover}
																setHideFromOutside={
																	setHideDocsPopover
																}
															/>
														</Td>
														<Td>
															<AgendaTableDurationCard
																agendaItem={agenda}
																handleUpdate={handleUpdateAgedaItem}
															/>
														</Td>
														<Td>
															<TableActionsWrapper>
																<Dropdown
																	toggleComponent={() => (
																		<Icon
																			name={IconType.EpPlus}
																		/>
																	)}
																>
																	<Dropdown.Item
																		onClick={() =>
																			setShowDocsPopoverById(
																				agenda.id
																			)
																		}
																	>
																		<Dropdown.ItemIcon
																			name={
																				IconType.EpDocumentFilled
																			}
																		/>
																		{translate(
																			({ buttons }) =>
																				buttons.addDocument
																		)}
																	</Dropdown.Item>
																	<Dropdown.Item
																		onClick={() =>
																			setShowDocsPopoverById(
																				agenda.id
																			)
																		}
																	>
																		<Dropdown.ItemIcon
																			name={
																				IconType.EpPollFilled
																			}
																			color={Colors.blue[100]}
																		/>
																		{translate(
																			({ buttons }) =>
																				buttons.addPoll
																		)}
																	</Dropdown.Item>
																	<Dropdown.Item
																		onClick={() =>
																			handleAddAgendaItem(
																				agenda.id
																			)
																		}
																	>
																		<Dropdown.ItemIcon
																			name={
																				IconType.EpSubItem
																			}
																		/>
																		{translate(
																			({ buttons }) =>
																				buttons.addSubItem
																		)}
																	</Dropdown.Item>
																</Dropdown>

																<Dropdown>
																	<Dropdown.Item
																		onClick={() => {}}
																	>
																		<Dropdown.ItemIcon
																			name={IconType.EpEye}
																		/>
																		{translate(
																			({ buttons }) =>
																				buttons.profilePage
																		)}
																	</Dropdown.Item>
																	<Dropdown.Item
																		disabled={
																			deleteAgendaItemLoading
																		}
																		onClick={() =>
																			handleShowConfirmModal(
																				agenda.id
																			)
																		}
																	>
																		<Dropdown.ItemIcon
																			name={IconType.EpTrash}
																		/>
																		{translate(
																			({ buttons }) =>
																				buttons.delete
																		)}
																	</Dropdown.Item>
																</Dropdown>
															</TableActionsWrapper>
														</Td>
													</Tr>
													{agenda.subItems.length > 0 &&
														expandedRows.includes(agenda.id) &&
														agenda.subItems.map((subAgenda, i) => (
															<Tr
																key={subAgenda.id}
																onClick={() =>
																	setAgendaItemToUpdate(subAgenda)
																}
															>
																<Td>
																	<TitleColumnContainer subItem>
																		<DragHandleContainer>
																			<DragIcon
																				name={
																					IconType.EpDragHandle
																				}
																			/>
																		</DragHandleContainer>
																		<AgendaItemTitleCard
																			order={`${index +
																				1}.${i + 1}`}
																			handleUpdate={
																				handleUpdateAgedaItem
																			}
																			agenda={subAgenda}
																		/>
																	</TitleColumnContainer>
																</Td>
																<Td>
																	<AgendaTableRepresentorCard
																		committeeId={
																			meeting?.committee.id
																		}
																		agendaItem={subAgenda}
																		handleUpdate={
																			handleUpdateAgedaItem
																		}
																		updateLoading={
																			updateAgendaItemLoading
																		}
																		closeRepresentorModalFromOutside={
																			closeRepresentorModalFromOutside
																		}
																		setCloseRepresentorModalFromOutside={
																			setCloseRepresentorModalFromOutside
																		}
																	/>
																</Td>
																<Td>
																	<AgendaTableDocumentsCard
																		agenda={subAgenda}
																		openSelectModal={
																			handleShowUploadModal
																		}
																		openSelectDocsModal={
																			handleOpenModal
																		}
																		showFromOutside={
																			showDocsPopoverById
																		}
																		setShowFromOutside={
																			setShowDocsPopoverById
																		}
																		deleteAgendaDocument={
																			handleDeleteAgedaItemDocument
																		}
																		hideFromOutside={
																			hideDocsPopover
																		}
																		setHideFromOutside={
																			setHideDocsPopover
																		}
																		setWhereToUpload={
																			setAgendaWhereToUpload
																		}
																	/>
																</Td>
																<Td>
																	<AgendaTableDurationCard
																		agendaItem={subAgenda}
																		handleUpdate={
																			handleUpdateAgedaItem
																		}
																	/>
																</Td>
																<Td>
																	<TableActionsWrapper>
																		<Dropdown
																			toggleComponent={() => (
																				<Icon
																					name={
																						IconType.EpPlus
																					}
																				/>
																			)}
																		>
																			<Dropdown.Item
																				onClick={() =>
																					setShowDocsPopoverById(
																						subAgenda.id
																					)
																				}
																			>
																				<Dropdown.ItemIcon
																					name={
																						IconType.EpDocumentFilled
																					}
																				/>
																				{translate(
																					({ buttons }) =>
																						buttons.addDocument
																				)}
																			</Dropdown.Item>
																			<Dropdown.Item
																				onClick={() =>
																					setShowDocsPopoverById(
																						subAgenda.id
																					)
																				}
																			>
																				<Dropdown.ItemIcon
																					name={
																						IconType.EpPollFilled
																					}
																					color={
																						Colors
																							.blue[100]
																					}
																				/>
																				{translate(
																					({ buttons }) =>
																						buttons.addPoll
																				)}
																			</Dropdown.Item>
																		</Dropdown>

																		<Dropdown>
																			<Dropdown.Item
																				onClick={() => {}}
																			>
																				<Dropdown.ItemIcon
																					name={
																						IconType.EpEye
																					}
																				/>
																				{translate(
																					({ buttons }) =>
																						buttons.profilePage
																				)}
																			</Dropdown.Item>
																			<Dropdown.Item
																				disabled={
																					deleteAgendaItemLoading
																				}
																				onClick={() =>
																					handleDeleteSubAgentaItem(
																						subAgenda.id
																					)
																				}
																			>
																				<Dropdown.ItemIcon
																					name={
																						IconType.EpTrash
																					}
																				/>
																				{translate(
																					({ buttons }) =>
																						buttons.delete
																				)}
																			</Dropdown.Item>
																		</Dropdown>
																	</TableActionsWrapper>
																</Td>
															</Tr>
														))}
												</>
											)}
										</Draggable>
									))}
								{provided.placeholder}
							</DroppableTableBody>
						</MeetingAgendaTable>
					)}
				</Droppable>
			</DragDropContext>

			<PageFooter>
				<GhostButton
					leftIcon={IconType.EpPlus}
					title={translate(({ buttons }) => buttons.addAgendaItem)}
					onClick={() => handleAddAgendaItem()}
					disabled={!meeting || addAgendaItemInMeetingLoading}
					loading={addAgendaItemInMeetingLoading}
				/>
			</PageFooter>
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
												onDelete={handleDeleteAgendaItem}
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
													onDelete={handleDeleteAgendaItem}
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
							uploadDocumentToFolderLoading ||
							deleteAgendaItemLoading ||
							uploadFileStep === 3 ||
							uploadFileStep === 4
						}
						loading={uploadDocumentToFolderLoading}
						onClick={() => handleUploadDocumentToMeetingAgendaFolder()}
					/>
				</Modal.Footer>
			</Modal>
		</PageContainer>
	);
}
