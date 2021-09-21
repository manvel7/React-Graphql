import React from 'react';
import { AzureFolder } from '@epolitiker/api';

import {
	BookmarkFolderListContainer,
	BookmarkFolderListContent,
	FolderConditionals,
	FilderIcon,
	FolderName,
	FolderUpdatedAt
} from './BookmarkFolderList.style';
import { Icon } from '../../ui/Icon';
import { IconType } from '../../../consts';

interface BookmarkDocsListProps {
	folder: AzureFolder;
}

export const BookmarkFolderList = ({ folder }: BookmarkDocsListProps) => {
	return (
		<BookmarkFolderListContainer>
			<BookmarkFolderListContent>
				<FilderIcon>
					<Icon name={IconType.EpFolderBig} />
				</FilderIcon>
				<FolderConditionals>
					<FolderName>{folder.name} </FolderName>
					<FolderUpdatedAt>Last Updated at {folder.updatedAt}</FolderUpdatedAt>
				</FolderConditionals>
			</BookmarkFolderListContent>
		</BookmarkFolderListContainer>
	);
};
