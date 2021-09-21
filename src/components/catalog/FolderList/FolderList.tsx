import React, { Fragment, useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { Folder as FolderType } from '@epolitiker/api';

import {
	useMoveFolderMutation,
	useDeleteFoldersMutation,
	useUpdateFolderMutation
} from '../../../hooks';
import { LightButton } from '../../ui';
import { IconType } from '../../../consts';
import { Folder } from '../Folder';

import { DroppableContainer, DeleteFoldersContainer } from './FolderList.style';

interface FolderListProps {
	items: FolderType[];
	setItems: (items: FolderType[]) => void;
}

export function FolderList({ items, setItems }: FolderListProps) {
	const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
	const [revertFolderIcon, setRevertFolderIcon] = useState(false);

	const [updateFolder, { error: updateFolderError }] = useUpdateFolderMutation();
	const [moveFolder] = useMoveFolderMutation();
	const [
		deleteFolders,
		{ data: deleteFoldersData, loading: deleteFoldersLoading }
	] = useDeleteFoldersMutation();

	function handleChangeItemsData(index: number, newFolder: FolderType) {
		const needsUpdate =
			items[index].kind !== newFolder.kind || items[index].icon.name !== newFolder.icon.name;
		const tempItems = [...items];
		tempItems[index] = newFolder;
		setItems(tempItems);

		if (needsUpdate) {
			updateFolderMutation(newFolder);
		}
	}

	function handleUpdateFolderByIndex(index: number) {
		const item = items[index];
		if (item.name) {
			updateFolderMutation(item);
		}
	}

	function updateFolderMutation(item: FolderType) {
		if (item.name && item.kind && item.icon.name) {
			updateFolder({
				variables: {
					data: {
						index: item.index,
						folder: {
							name: item.name,
							kind: item.kind,
							icon: {
								update: {
									name: item.icon.name,
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
		if (updateFolderError) {
			setRevertFolderIcon(true);
		}
	}, [updateFolderError]);

	function handleSelectFolders(folderIndex: number, checked: boolean) {
		if (checked) {
			setSelectedFolders([...selectedFolders, folderIndex]);
		} else {
			const tempFolders = [...selectedFolders];
			tempFolders.splice(tempFolders.indexOf(folderIndex), 1);
			setSelectedFolders(tempFolders);
		}
	}

	function handleDeleteFolders() {
		deleteFolders({
			variables: {
				data: {
					folderIndexes: selectedFolders
				}
			}
		});
	}

	useEffect(() => {
		if (deleteFoldersData?.deleteFolders) {
			setSelectedFolders([]);
		}
	}, [deleteFoldersData]);

	function handleMoveFolder(oldPosition: number, newPosition: number) {
		moveFolder({
			variables: {
				data: {
					oldPosition,
					newPosition
				}
			}
		});
	}

	function reorder(list: FolderType[], startIndex: number, endIndex: number) {
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
			const tempItems = reorder(items, result.source.index, result.destination.index);

			handleMoveFolder(result.source.index, result.destination.index);
			setItems(tempItems);
		}
	}

	return (
		<Fragment>
			<DeleteFoldersContainer>
				<LightButton
					icon={IconType.EpTrash}
					onClick={handleDeleteFolders}
					loading={deleteFoldersLoading}
					disabled={!selectedFolders.length || deleteFoldersLoading}
				/>
			</DeleteFoldersContainer>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<DroppableContainer
							{...provided.droppableProps}
							ref={provided.innerRef}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{items.map((item: FolderType, index: number) => (
								<Folder
									key={item.id}
									item={item}
									index={index}
									revertIconOnError={revertFolderIcon}
									selected={selectedFolders.includes(item.index)}
									handleChangeItemsData={handleChangeItemsData}
									handleUpdateFolder={handleUpdateFolderByIndex}
									handleSelectFolders={handleSelectFolders}
								/>
							))}
							{provided.placeholder}
						</DroppableContainer>
					)}
				</Droppable>
			</DragDropContext>
		</Fragment>
	);
}
