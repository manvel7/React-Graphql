import React, { Fragment, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';

import { Folder as FolderType, FolderTypes } from '@epolitiker/api';
import { Input, Dropdown, Checkbox } from '../../ui';

import {
	DraggableItem,
	DraggableName,
	DraggableKind,
	DraggableHandle,
	DraggableCheck,
	DraggableIconContainer,
	FileIconContainer,
	IconImage,
	FileDragContainer,
	FileDropZone,
	FileDropInput,
	FileDropText
} from './Folder.style';
import { FolderTypesList } from '../../../consts';
import { useGetFolderIconUploadInfoLazyQuery, useAlerts, useTranslation } from '../../../hooks';
import { folderIconUploadRequest } from '../../../helpers';

interface FileWithPreview extends File {
	preview: string;
}

interface FolderProps {
	item: FolderType;
	index: number;
	selected: boolean;
	revertIconOnError: boolean;

	handleChangeItemsData: (index: number, newFolder: FolderType) => void;
	handleUpdateFolder: (index: number) => void;
	handleSelectFolders: (folderIndex: number, checked: boolean) => void;
}

export function Folder({
	item,
	index,
	selected,
	revertIconOnError,

	handleChangeItemsData,
	handleUpdateFolder,
	handleSelectFolders
}: FolderProps) {
	const { setError } = useAlerts();
	const translate = useTranslation();
	const [selectedFile, setSelectedFile] = useState<FileWithPreview>();

	const [
		getFolderIconUploadInfo,
		{ data: getFolderIconUploadInfoData }
	] = useGetFolderIconUploadInfoLazyQuery();

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
		multiple: false,
		noKeyboard: true,
		accept: 'image/*',
		onDrop: (dropAcceptedFiles: File[]) => {
			if (dropAcceptedFiles.length > 0) {
				const file = dropAcceptedFiles[0];
				getFolderIconUploadInfo({
					variables: {
						data: {
							fileName: file.name
						}
					}
				});

				setSelectedFile({ ...file, preview: URL.createObjectURL(file) });
			} else {
				setError({
					message: translate(({ messages }) => messages.fileUpload.notSupportedType)
				});
			}
		}
	});

	useEffect(() => {
		if (selectedFile) {
			URL.revokeObjectURL(selectedFile.preview);
		}
	}, [selectedFile]);

	useEffect(() => {
		uploadFolderIcon();
	}, [getFolderIconUploadInfoData]);

	useEffect(() => {
		if (revertIconOnError) {
			setSelectedFile(undefined);
		}
	}, [revertIconOnError]);

	async function uploadFolderIcon() {
		try {
			if (getFolderIconUploadInfoData?.getFolderIconUploadInfo) {
				const { uniqueFileName, url } = getFolderIconUploadInfoData.getFolderIconUploadInfo;
				const file: File = acceptedFiles[0];
				const binaryData = new Blob([file]);
				await folderIconUploadRequest(url, binaryData, file.type);
				handleChangeItemsData(index, {
					...item,
					icon: {
						...item.icon,
						name: uniqueFileName
					}
				});
			}
		} catch (e) {
			setError({ message: translate(({ messages }) => messages.fileUpload.couldNotSave) });
			setSelectedFile(undefined);
		}
	}

	return (
		<Draggable draggableId={item.id} index={index}>
			{(provided, snapshot) => (
				<DraggableItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					style={provided.draggableProps.style}
					isDragging={snapshot.isDragging}
				>
					<DraggableHandle {...provided.dragHandleProps}>
						<p>Drag Handle</p>
					</DraggableHandle>
					<DraggableName>
						<Input
							value={item.name}
							onChange={e =>
								handleChangeItemsData(index, { ...item, name: e.target.value })
							}
							onBlur={() => handleUpdateFolder(index)}
						/>
					</DraggableName>
					<DraggableKind>
						<Dropdown
							toggleComponent={() => (
								<Fragment>
									<Dropdown.Title>{item.kind}</Dropdown.Title>
								</Fragment>
							)}
						>
							{FolderTypesList.map((folderType: FolderTypes, i: number) => {
								return (
									<Dropdown.Item
										key={`list-item-${i}`}
										onClick={() =>
											handleChangeItemsData(index, {
												...item,
												kind: folderType
											})
										}
									>
										{folderType}
									</Dropdown.Item>
								);
							})}
						</Dropdown>
					</DraggableKind>

					<DraggableIconContainer>
						{selectedFile ? (
							<FileIconContainer key={selectedFile.name}>
								<IconImage src={selectedFile.preview} />
							</FileIconContainer>
						) : (
							<FileIconContainer>
								<IconImage src={item.icon.url} />
							</FileIconContainer>
						)}
						<FileDragContainer>
							<FileDropZone {...getRootProps()} active={isDragActive}>
								<FileDropInput {...getInputProps()} />
								<FileDropText>Drag & drop folder icon here</FileDropText>
							</FileDropZone>
						</FileDragContainer>
					</DraggableIconContainer>

					<DraggableCheck>
						<Checkbox
							checked={selected}
							onChange={e => handleSelectFolders(item.index, e.target.checked)}
						/>
					</DraggableCheck>
				</DraggableItem>
			)}
		</Draggable>
	);
}
