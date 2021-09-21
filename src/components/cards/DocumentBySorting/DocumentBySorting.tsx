import React, { useState, useEffect } from 'react';
import { Document } from '@epolitiker/api';
import {
	DocumentBySortingContainer,
	DocumentSoeryByContent,
	SharedDocsBlock,
	InCollabrationBlock,
	SharedDocumentsHeader,
	SharedDocumentsTitle
} from './DocumentBySorting.style';
import {
	useEffectOnce,
	// useGetFolderByIdLazyQuery,
	useGetFolderContentsByIdLazyQuery,
	useLocalStorage,
	useTranslation
} from '../../../hooks';
import { IconType, StorageKey } from '../../../consts';
import { MembersPageLoader, Icon, Drawer } from '../../ui';
import { SharedCard } from '../SharedCard';
import { DocumentDrawerCard } from '../DocumentDrawerCard';

export const DocumentBySorting = () => {
	const translate = useTranslation();
	const [documents, setDocuments] = useState<Document[]>([]);
	const [workspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [showDocumentDrawer, setShowDocumentDrawer] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

	const [
		getDocumentBySorting,
		{ data: getDocumentBySortingData, loading: getDocumentBySortingLoading }
	] = useGetFolderContentsByIdLazyQuery();

	function handleGetWorkspaceFolder() {
		getDocumentBySorting({
			variables: {
				data: {
					azureFolderWhereUniqueInput: { id: workspace.folder.id },
					docOptions: {
						orderBy: 'createdAt_DESC',
						pagination: {
							first: 4
						}
					}
				}
			}
		});
	}

	useEffect(() => {
		if (getDocumentBySortingData) {
			const docs = getDocumentBySortingData.getFolderContentsById.documents;
			setDocuments(docs);
		}
	}, [getDocumentBySortingData]);

	useEffectOnce(() => {
		handleGetWorkspaceFolder();
	});

	function handleToggleDocumentDrawer(document: Document) {
		if (selectedDocument && showDocumentDrawer && document.id === selectedDocument.id) {
			setSelectedDocument(null);
			setShowDocumentDrawer(false);
			return;
		}
		setSelectedDocument(document);
		setShowDocumentDrawer(true);
	}

	return (
		<DocumentBySortingContainer>
			<Drawer
				open={showDocumentDrawer}
				onClose={() => setShowDocumentDrawer(false)}
				title={'Document info'}
			>
				<DocumentDrawerCard document={selectedDocument ? selectedDocument : null} />
			</Drawer>
			<DocumentSoeryByContent>
				<SharedDocsBlock>
					<SharedDocumentsHeader>
						<Icon name={IconType.EpMail} color={'#cccccc'} />
						<SharedDocumentsTitle>
							{translate(({ titles }) => titles.newShared)}
						</SharedDocumentsTitle>
					</SharedDocumentsHeader>
					{getDocumentBySortingLoading ? (
						<MembersPageLoader />
					) : (
						documents.length > 0 &&
						documents.map(document => (
							<SharedCard
								key={document.id}
								document={document}
								onClick={doc => handleToggleDocumentDrawer(doc)}
							/>
						))
					)}
				</SharedDocsBlock>

				<InCollabrationBlock>
					<SharedDocumentsHeader>
						<Icon name={IconType.EpUserGroup} color={'#cccccc'} />
						<SharedDocumentsTitle>
							{translate(({ titles }) => titles.InCollaboration)}
						</SharedDocumentsTitle>
					</SharedDocumentsHeader>
					{getDocumentBySortingLoading ? (
						<MembersPageLoader />
					) : (
						documents.length > 0 &&
						documents.map(document => (
							<SharedCard
								key={document.id}
								document={document}
								onClick={doc => handleToggleDocumentDrawer(doc)}
							/>
						))
					)}
				</InCollabrationBlock>
			</DocumentSoeryByContent>
		</DocumentBySortingContainer>
	);
};
