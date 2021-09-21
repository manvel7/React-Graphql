import React, { useEffect, useState, Fragment, useRef } from 'react';

import { FolderTypes, Folder as FolderType } from '@epolitiker/api';

import { FolderList } from '../../../components/catalog';
import {
	useCreateDefaultCatalogMutation,
	useDefaultCatalogQuery,
	useCreateFolderMutation,
	useGetFolderIconUploadInfoLazyQuery,
	useAlerts,
	useTranslation
} from '../../../hooks';
import { Dropdown, Input } from '../../../components/ui';
import {
	PageContent,
	CreateFolderContainer,
	CreateFolderTitle,
	CreateFolderElement,
	FolderIconInput,
	FolderIconInputLabel
} from './DefaultCatalogPage.style';
import { FolderTypesList } from '../../../consts';
import { folderIconUploadRequest } from '../../../helpers';

interface NewFolderType {
	name: string;
	kind?: FolderTypes;
	iconName: string;
}

const newFolderInitialState = {
	name: '',
	iconName: ''
};

export function DefaultCatalogPage() {
	const { setError } = useAlerts();
	const translate = useTranslation();
	const [items, setItems] = useState<FolderType[]>([]);
	const [newFolder, setNewFolder] = useState<NewFolderType>({ ...newFolderInitialState });
	const fileUploadRef = useRef<File>();

	const { data: defaultCatalogData } = useDefaultCatalogQuery();
	const [
		getFolderIconUploadInfo,
		{ data: getFolderIconUploadInfoData }
	] = useGetFolderIconUploadInfoLazyQuery();
	const [createDefaultCatalog] = useCreateDefaultCatalogMutation();

	const [createFolder, { data: createFolderData }] = useCreateFolderMutation();

	useEffect(() => {
		if (defaultCatalogData) {
			if (defaultCatalogData?.defaultCatalog) {
				setItems(defaultCatalogData?.defaultCatalog?.items);
			} else {
				createDefaultCatalog();
			}
		}
	}, [defaultCatalogData]);

	function handleGetNewFolderData(field: string, value: string) {
		setNewFolder({ ...newFolder, [field]: value });
	}

	function handleSelectNewFolderIcon(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			fileUploadRef.current = selectedFile;
			getFolderIconUploadInfo({
				variables: {
					data: {
						fileName: selectedFile.name
					}
				}
			});
		}
	}

	useEffect(() => {
		uploadFolderIcon();
	}, [getFolderIconUploadInfoData]);

	async function uploadFolderIcon() {
		if (getFolderIconUploadInfoData?.getFolderIconUploadInfo && fileUploadRef.current) {
			const { uniqueFileName, url } = getFolderIconUploadInfoData.getFolderIconUploadInfo;
			const binaryData = new Blob([fileUploadRef.current]);

			try {
				await folderIconUploadRequest(url, binaryData, fileUploadRef.current.type);
				setNewFolder({ ...newFolder, iconName: uniqueFileName });
			} catch (e) {
				setError({
					message: translate(({ messages }) => messages.fileUpload.couldNotSave)
				});
			}
		}
	}

	function handleCreateFolder() {
		if (newFolder.name && newFolder.kind && newFolder.iconName) {
			createFolder({
				variables: {
					data: {
						position: 0,
						folder: {
							name: newFolder.name,
							kind: newFolder.kind,
							icon: {
								create: {
									name: newFolder.iconName,
									container: ''
								}
							}
						}
					}
				}
			});
		}
	}

	useEffect(() => {
		if (newFolder.kind && newFolder.iconName) {
			handleCreateFolder();
		}
	}, [newFolder.kind, newFolder.iconName]);

	useEffect(() => {
		if (createFolderData) {
			setItems([...createFolderData?.createFolder.items]);
			setNewFolder({ ...newFolderInitialState });
			fileUploadRef.current = undefined;
		}
	}, [createFolderData]);

	return (
		<PageContent>
			<CreateFolderContainer>
				<CreateFolderTitle>Add a new catalog item</CreateFolderTitle>
				<CreateFolderElement>
					<Input
						value={newFolder.name}
						onChange={e => handleGetNewFolderData('name', e.target.value)}
						onBlur={handleCreateFolder}
					/>
				</CreateFolderElement>
				<CreateFolderElement>
					<Dropdown
						toggleComponent={() => (
							<Fragment>
								<Dropdown.Title>
									{newFolder.kind || 'Select item type'}
								</Dropdown.Title>
							</Fragment>
						)}
					>
						{FolderTypesList.map((item: FolderTypes, index: number) => {
							return (
								<Dropdown.Item
									key={`list-item-${index}`}
									onClick={() => handleGetNewFolderData('kind', item)}
								>
									{item}
								</Dropdown.Item>
							);
						})}
					</Dropdown>
				</CreateFolderElement>
				<CreateFolderElement>
					<FolderIconInput
						type="file"
						name="newFolderIcon"
						id="newFolderInput"
						accept="image/*"
						onChange={handleSelectNewFolderIcon}
					/>
					<FolderIconInputLabel htmlFor="newFolderInput">
						Choose Icon
					</FolderIconInputLabel>
				</CreateFolderElement>
			</CreateFolderContainer>
			{items.length > 0 && <FolderList items={items} setItems={setItems} />}
		</PageContent>
	);
}
