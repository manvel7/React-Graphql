import React, { useState, useEffect } from 'react';

import { Document, Committee, AzureFolder } from '@epolitiker/api';

import {
	SelectDocumentsContainer,
	NavPanel,
	NavItem,
	NavDivider,
	FolderBlock,
	DocumentBlock
} from './SelectDocuments.style';
import {
	useEffectOnce,
	useTranslation,
	useWorkspaceCommitteesLazyQuery,
	useGetFolderContentsByIdLazyQuery,
	useLocalStorage
} from '../../../hooks';
import { DocumentItemCard, CommitteeItemCard, FolderCard, DocumentCard } from '../../cards';
import { StorageKey } from '../../../consts';

interface SelectDocumentsProps {
	committee: Committee | undefined;
	docsToConnect: string[];
	setDocsToConnect: (docIds: string[]) => void;
}

export function SelectDocuments({
	committee,
	docsToConnect,
	setDocsToConnect
}: SelectDocumentsProps) {
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [activeCommittee, setActiveCommittee] = useState(committee);

	const [documents, setDocuments] = useState<Document[]>([]);
	const [committees, setCommittees] = useState<Committee[]>([]);
	const [folders, setFolder] = useState<AzureFolder[]>([]);
	const [tab, setTab] = useState<'documents' | 'committees' | 'privateSpace'>('documents');

	useEffect(() => {
		setActiveCommittee(committee);
	}, [committee]);

	const [
		workspaceCommittees,
		{ data: workspaceCommitteesData }
	] = useWorkspaceCommitteesLazyQuery();

	const [
		getFolderContentsById,
		{ data: getFolderContentsByIdData }
	] = useGetFolderContentsByIdLazyQuery();

	useEffectOnce(() => {
		handleGetWorkspaceCommittees();
	});

	function handleGetWorkspaceCommittees() {
		if (activeWorkspace) {
			workspaceCommittees({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					}
				}
			});
		}
	}

	useEffect(() => {
		if (workspaceCommitteesData) {
			setCommittees(workspaceCommitteesData.workspaceDetails.committees);
		}
	}, [workspaceCommitteesData]);

	useEffect(() => {
		handleGetFolderContents(activeCommittee?.folder?.id);
	}, [activeCommittee]);

	function handleGetFolderContents(folderId: string | undefined) {
		if (activeCommittee) {
			getFolderContentsById({
				variables: {
					data: {
						azureFolderWhereUniqueInput: { id: folderId }
					}
				}
			});
		}
	}

	useEffect(() => {
		if (getFolderContentsByIdData) {
			setDocuments(getFolderContentsByIdData.getFolderContentsById.documents);
			setFolder(getFolderContentsByIdData.getFolderContentsById.folders);
		}
	}, [getFolderContentsByIdData]);

	function handleCommitteeSelect(newSelectedCommittee: Committee) {
		setActiveCommittee(newSelectedCommittee);
		setTab('documents');
	}

	function handleAddDocumentToCheckedList(checked: boolean, docId: string) {
		if (checked) {
			setDocsToConnect([...docsToConnect, docId]);
		} else {
			setDocsToConnect(docsToConnect.filter(id => id !== docId));
		}
	}

	if (tab === 'committees') {
		return (
			<SelectDocumentsContainer>
				<NavPanel>
					<NavItem onClick={() => setTab('committees')}>
						{translate(({ titles }) => titles.allCommittees)}
					</NavItem>
					<NavDivider>/</NavDivider>
					<NavItem onClick={() => setTab('privateSpace')}>My private documents</NavItem>
				</NavPanel>
				{committees.length > 0 ? (
					committees.map(committee => (
						<CommitteeItemCard
							key={committee.id}
							committee={committee}
							onClick={handleCommitteeSelect}
						/>
					))
				) : (
					<p>No Committees</p>
				)}
			</SelectDocumentsContainer>
		);
	}

	if (tab === 'privateSpace') {
		return (
			<SelectDocumentsContainer>
				<NavPanel>
					<NavItem onClick={() => setTab('committees')}>
						{translate(({ titles }) => titles.allCommittees)}
					</NavItem>
					<NavDivider>/</NavDivider>
					<NavItem onClick={() => setTab('privateSpace')}>My private documents</NavItem>
				</NavPanel>
				<DocumentBlock>
					{documents && documents.length > 0 ? (
						documents.map((document, i) => (
							<DocumentCard key={`awc-${i}`} document={document} />
						))
					) : (
						<p>No Folders</p>
					)}
				</DocumentBlock>
				<FolderBlock>
					{folders && folders.length > 0 ? (
						folders.map((folder, i) => (
							<FolderCard key={`avw-${i}`} folder={folder} onClick={() => {}} />
						))
					) : (
						<p>No Folders</p>
					)}
				</FolderBlock>
			</SelectDocumentsContainer>
		);
	}

	return (
		<SelectDocumentsContainer>
			<NavPanel>
				<NavItem onClick={() => setTab('committees')}>
					{translate(({ titles }) => titles.allCommittees)}
				</NavItem>
				<NavDivider>/</NavDivider>
				<NavItem>{activeCommittee?.label}</NavItem>
				<NavDivider>/</NavDivider>
				<NavItem active onClick={() => setTab('documents')}>
					{translate(({ titles }) => titles.documents)}
				</NavItem>
			</NavPanel>

			{documents.length > 0 ? (
				documents.map((document, i) => (
					<DocumentItemCard
						key={`${document.id}-${i}`}
						document={document}
						checked={docsToConnect.includes(document.id)}
						handleSelect={handleAddDocumentToCheckedList}
					/>
				))
			) : (
				<p>No Documents</p>
			)}
		</SelectDocumentsContainer>
	);
}
