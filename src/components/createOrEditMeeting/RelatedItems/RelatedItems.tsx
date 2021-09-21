import React, { useEffect, useState } from 'react';

import { Meeting, Document } from '@epolitiker/api';

import {
	PageContainer,
	PageFilters,
	FiltersLeftBlock,
	FiltersRightBlock,
	FiltersItem,
	RelatedItemsList,
	PageFooter,
	FiltersItemText,
	FileInputContainer,
	FileInput,
	FileInputLabel,
	PrimaryButton,
	LightButton,
	PopoverContainer,
	PopoverActionsBlock,
	PopoverFooter
} from './RelatedItems.style';
import {
	SortOrFilterMenu,
	SearchInput,
	GhostButton,
	ButtonSize,
	Modal,
	ModalSizes,
	Notification
} from '../../ui';
import { MeetingRelatedItemsCard } from '../../cards';
import { IconType, StorageKey } from '../../../consts';
import {
	useAlerts,
	useTranslation,
	useOutsideClick,
	useMeasure,
	useUploadOrConnectDocumentsToFolderMutation,
	useLocalStorage
} from '../../../hooks';
import { SelectDocuments } from '../../documents';

interface RelatedItemsProps {
	meeting: Meeting | null;
}

export function RelatedItems({ meeting }: RelatedItemsProps) {
	const [popupRef] = useMeasure<HTMLDivElement>();
	const { setNotification } = useAlerts();
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [meetingDocuments, setMeetingDocuments] = useState<Document[]>([]);

	const [showSelectDocsModal, setShowSelectDocsModal] = useState(false);
	const [showAddPopover, setShowAddPopover] = useState(false);
	const [docsToConnect, setDocsToConnect] = useState<string[]>([]);

	const [
		connectDocumentsToFolder,
		{ data: connectDocumentsToFolderData, loading: connectDocumentsToFolderLoading }
	] = useUploadOrConnectDocumentsToFolderMutation();

	const [
		uploadDocumentToFolder,
		{ data: uploadDocumentToFolderData }
	] = useUploadOrConnectDocumentsToFolderMutation();

	useEffect(() => {
		if (meeting?.folder) {
			setMeetingDocuments(meeting.folder.documents);
		}
	}, [meeting]);

	// Connect Documents
	function handleConnectDocumentsToMeetingFolder() {
		if (activeWorkspace) {
			connectDocumentsToFolder({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						parentFolderWhereUniqueInput: { id: meeting?.folder?.id },
						document: {
							connect: docsToConnect.map(id => ({ id: id }))
						}
					}
				}
			});
		}
	}

	useEffect(() => {
		if (connectDocumentsToFolderData) {
			setNotification({ message: 'Documents connected successfully!' });
			setMeetingDocuments(state => [
				...state,
				...connectDocumentsToFolderData.uploadOrConnectDocumentsToFolder
			]);
		}
		setShowSelectDocsModal(false);
		setShowAddPopover(false);
	}, [connectDocumentsToFolderData]);

	//Upload Document
	function handleUploadDocumentToMeetingFolder(file: File) {
		if (activeWorkspace) {
			uploadDocumentToFolder({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						parentFolderWhereUniqueInput: { id: meeting?.folder?.id },
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
			setNotification({ message: 'Document uploaded successfully!' });
			setShowAddPopover(false);
			setMeetingDocuments(state => [
				...state,
				...uploadDocumentToFolderData.uploadOrConnectDocumentsToFolder
			]);
		}
	}, [uploadDocumentToFolderData]);

	function handleGetFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files?.length > 0) {
			handleUploadDocumentToMeetingFolder(e.target.files[0]);
			setShowAddPopover(false);
		}
	}

	function handleOpenModal() {
		setShowSelectDocsModal(true);
		setShowAddPopover(false);
	}

	function handleCloseModal() {
		setDocsToConnect([]);
		setShowSelectDocsModal(false);
	}

	function handleOutsideClick(e: Event) {
		if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
			setShowAddPopover(false);
		}
	}
	useOutsideClick(handleOutsideClick);

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
				title={'Documents'}
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
						onClick={handleConnectDocumentsToMeetingFolder}
						size={ButtonSize.LG}
						disabled={docsToConnect.length < 1 || connectDocumentsToFolderLoading}
						loading={connectDocumentsToFolderLoading}
					/>
				</Modal.Footer>
			</Modal>

			<PageFilters>
				<FiltersLeftBlock>
					<FiltersItem>
						<FiltersItemText>
							{translate(({ titles }) => titles.allEntitiesAttachedOrRelated)}{' '}
							{meetingDocuments.length}
						</FiltersItemText>
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
			<RelatedItemsList>
				{meetingDocuments.length > 0 &&
					meetingDocuments.map((document, i) => (
						<MeetingRelatedItemsCard
							key={`${document.id}-${i}`}
							document={document}
							onClick={() => {}}
						/>
					))}
			</RelatedItemsList>
			<PageFooter>
				<GhostButton
					title={translate(({ buttons }) => buttons.addRelatedItem)}
					leftIcon={IconType.EpPlus}
					onClick={() => setShowAddPopover(true)}
					disabled={!meeting}
				/>
				{showAddPopover && (
					<PopoverContainer ref={popupRef}>
						<PopoverActionsBlock>
							<LightButton
								floating
								leftIcon={IconType.EpAttachment}
								title={translate(({ buttons }) => buttons.selectDocuments)}
								onClick={handleOpenModal}
							/>

							<FileInputContainer>
								<FileInput
									type="file"
									onChange={handleGetFile}
									accept="application/pdf"
									id="uploadDocToMeetingRelated"
								/>
								<FileInputLabel htmlFor="uploadDocToMeetingRelated">
									{translate(({ buttons }) => buttons.uploadNew)}
								</FileInputLabel>
							</FileInputContainer>
						</PopoverActionsBlock>
						<PopoverFooter>
							<GhostButton
								floating
								leftIcon={IconType.EpPlus}
								title={translate(({ buttons }) => buttons.create)}
								onClick={() => {}}
							/>
						</PopoverFooter>
					</PopoverContainer>
				)}
			</PageFooter>
		</PageContainer>
	);
}
