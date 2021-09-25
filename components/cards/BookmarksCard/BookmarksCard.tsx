import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

import { AzureFolder, Document } from '@epolitiker/api';
import {
	BookmarksCardContainer,
	BookmarksCardHeader,
	BookmarkscardTitle,
	BookmarksContent,
	BookmarksContentHeader,
	DirectoriesTitle,
	DocsTitle,
	BookmarksBlock,
	FolderBar,
	DocumentBar
} from './BookmarksCard.style';
import { Drawer, Icon, MembersPageLoader } from '../../ui';
import { IconType, StorageKey } from '../../../consts';
import {
	useEffectOnce,
	useGetFolderContentsByIdLazyQuery,
	useLocalStorage,
	useTranslation
} from '../../../hooks';
import { BookmarkFolderList } from '../BookmarkDocsList';
import { BookmarksDocument } from '../BookmarksDocument';
import { DocumentDrawerCard } from '../DocumentDrawerCard';

export const BookmarksCard = () => {
	const translate = useTranslation();
	const [folder, setFolder] = useState<AzureFolder[]>([]);
	const [documents, setDocuments] = useState<Document[]>([]);
	const [workspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [showDocumentDrawer, setShowDocumentDrawer] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
	const [allDocsCount, setAllDocsCount] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const docsCountPerPage = 5;
	const [, setPaginationCount] = useState<number>(0);

	const [
		getDocumentContents,
		{ data: getDocumentContentsData, loading: getDocumentContentsLoading }
	] = useGetFolderContentsByIdLazyQuery();

	function handleToggleDocumentDrawer(document: Document) {
		if (selectedDocument && showDocumentDrawer && document.id === selectedDocument.id) {
			setSelectedDocument(null);
			setShowDocumentDrawer(false);
			return;
		}
		setSelectedDocument(document);
		setShowDocumentDrawer(true);
	}

	function handleGetWorkspaceFolderContents() {
		getDocumentContents({
			variables: {
				data: {
					azureFolderWhereUniqueInput: { id: workspace.folder.id },
					docOptions: {
						orderBy: 'createdAt_ASC',
						pagination: {
							page: currentPage,
							first: 5
						}
					}
				}
			}
		});
	}

	useEffect(() => {
		if (getDocumentContentsData) {
			const docs = getDocumentContentsData.getFolderContentsById.documents;
			const docsCount = getDocumentContentsData.getFolderContentsById.documentsCount;
			const folder = getDocumentContentsData.getFolderContentsById.folders;
			const folderSlice = folder.slice(0, 6);
			setFolder(folderSlice);
			setDocuments(docs);
			setAllDocsCount(docsCount);
		}
	}, [getDocumentContentsData]);

	useEffect(() => {
		const maxPage = Math.trunc(allDocsCount / docsCountPerPage);
		setPaginationCount(maxPage);
	});

	function handlePageChange(pageNumber: number) {
		setCurrentPage(pageNumber);
	}

	useEffect(() => {
		handlePageChange(currentPage);
		handleGetWorkspaceFolderContents();
	}, [currentPage]);

	useEffectOnce(() => {
		handleGetWorkspaceFolderContents();
	});

	return (
		<BookmarksCardContainer>
			<BookmarksCardHeader>
				<Icon name={IconType.EpBookmarks} />
				<BookmarkscardTitle>
					{translate(({ titles }) => titles.bookmarks)}
				</BookmarkscardTitle>
			</BookmarksCardHeader>
			<BookmarksContent>
				<BookmarksContentHeader>
					<DirectoriesTitle>
						{translate(({ titles }) => titles.directories)}
					</DirectoriesTitle>
					<DocsTitle>{translate(({ titles }) => titles.docs)}</DocsTitle>
				</BookmarksContentHeader>
				<BookmarksBlock>
					<FolderBar>
						{getDocumentContentsLoading ? (
							<MembersPageLoader />
						) : (
							folder.length > 0 &&
							folder.map(folder => (
								<BookmarkFolderList key={folder.id} folder={folder} />
							))
						)}
					</FolderBar>
					<DocumentBar>
						{getDocumentContentsLoading ? (
							<MembersPageLoader />
						) : (
							documents.length > 0 &&
							documents.map(document => (
								<BookmarksDocument
									document={document}
									key={document.id}
									onClick={doc => handleToggleDocumentDrawer(doc)}
								/>
							))
						)}
					</DocumentBar>
				</BookmarksBlock>
				<Pagination
					style={{ textAlign: 'center' }}
					size="small"
					total={allDocsCount}
					pageSize={docsCountPerPage}
					defaultCurrent={currentPage}
					onChange={(currentPage: number) => handlePageChange(currentPage)}
				/>

				<Drawer
					open={showDocumentDrawer}
					onClose={() => setShowDocumentDrawer(false)}
					title={'Document info'}
				>
					<DocumentDrawerCard document={selectedDocument ? selectedDocument : null} />
				</Drawer>
			</BookmarksContent>
		</BookmarksCardContainer>
	);
};
