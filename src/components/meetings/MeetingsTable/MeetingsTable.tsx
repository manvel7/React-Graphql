import React, { useState, useEffect } from 'react';

import { DragDropContext, Droppable, DropResult, Draggable } from 'react-beautiful-dnd';
import { Meeting, AgendaItem } from '@epolitiker/api';
import {
	DragHandleContainer,
	DroppableTableBody,
	ExpandRowBlock,
	MeetingAgendaTable,
	PageContainer,
	PageHeader,
	PageFooter,
	PrimaryButton,
	TableActionsWrapper,
	TableTitle,
	Td,
	Tr,
	Th,
	Thead,
	TitleColumnContainer,
	IconBlock
} from './MeetingsTable.style';

import { GhostButton, Dropdown, Icon, Modal, ModalSizes, ButtonSize, Notification } from '../../ui';
import { IconType, StorageKey } from '../../../consts';
import { Colors } from '../../../environment';
import {
	AgendaTableRepresentorCard,
	AgendaItemTitleCard,
	AgendaTableDocumentsCard,
	AgendaTableDurationCard,
	AgendaTableRepliesCard
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

interface MeetingAgendaTableProps {
	meeting: Meeting | null;
}

export function MeetingsTable({ meeting }: MeetingAgendaTableProps) {
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const { setNotification } = useAlerts();

	const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
	const [agendaItemToUpdate, setAgendaItemToUpdate] = useState<AgendaItem | null>(null);

	const [showDocsPopoverById, setShowDocsPopoverById] = useState('');
	const [showSelectDocsModal, setShowSelectDocsModal] = useState(false);
	const [hideDocsPopover, setHideDocsPopover] = useState(false);
	const [closeRepresentorModalFromOutside, setCloseRepresentorModalFromOutside] = useState(false);
	const [docsToConnect, setDocsToConnect] = useState<string[]>([]);

	const [expandedRows, setExpandedRows] = useState<string[]>([]);

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
		{ data: uploadDocumentToFolderData }
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

	//Connect Documents To Agenda Item
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

	// Upload document to Agenda
	function handleUploadDocumentToMeetingAgendaFolder(file: File, agenda: AgendaItem) {
		console.log(agenda);
		if (activeWorkspace) {
			uploadDocumentToFolder({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						parentFolderWhereUniqueInput: { id: agenda.folder?.id },
						file: file,
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
			setNotification({ message: 'Document uploaded to Agenda item successfully!' });
			setHideDocsPopover(true);
		}
	}, [uploadDocumentToFolderData]);

	//Delete Agenda
	function handleDeleteAgendaItem(agendaId: string) {
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

	return (
		<PageContainer>
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
			<PageHeader>
				<TableTitle>{translate(({ titles }) => titles.agenda)}</TableTitle>
			</PageHeader>
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
									<Th>{translate(({ columns }) => columns.admin.replies)}</Th>
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
																	{/*<DragIcon*/}
																	{/*    name={*/}
																	{/*        IconType.EpDragHandle*/}
																	{/*    }*/}
																	{/*/>*/}
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
																openSelectDocsModal={
																	handleOpenModal
																}
																uploadFileToAgendaItem={
																	handleUploadDocumentToMeetingAgendaFolder
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
															<AgendaTableRepliesCard
																agendaItem={agenda}
															/>
														</Td>
														<Td>
															<TableActionsWrapper>
																<IconBlock>
																	<Icon
																		name={IconType.EpArrowUp}
																	/>
																</IconBlock>
																<Icon name={IconType.EpHello} />
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
																			{/*<DragIcon*/}
																			{/*    name={*/}
																			{/*        IconType.EpDragHandle*/}
																			{/*    }*/}
																			{/*/>*/}
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
																		openSelectDocsModal={
																			handleOpenModal
																		}
																		uploadFileToAgendaItem={
																			handleUploadDocumentToMeetingAgendaFolder
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
																					handleDeleteAgendaItem(
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
					title={translate(({ buttons }) => buttons.submitDocument)}
					onClick={() => handleAddAgendaItem()}
					disabled={!meeting || addAgendaItemInMeetingLoading}
					loading={addAgendaItemInMeetingLoading}
				/>
			</PageFooter>
		</PageContainer>
	);
}
