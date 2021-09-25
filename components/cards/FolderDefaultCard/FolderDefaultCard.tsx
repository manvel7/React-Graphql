import React, { useEffect, useState } from 'react';

import { AzureFolder } from '@epolitiker/api';

import {
	FolderDefaultCardContainer,
	IconBlock,
	FolderImage,
	InfoBlock,
	CardTitle,
	FolderIcon,
	CardWrapper
} from './FolderDefaultCard.style';
import { IconType } from '../../../consts';
import { Colors, Images } from '../../../environment';
import { ButtonSize, GhostButton } from '../../ui';
import { useEffectOnce, useGetFolderContentsByIdLazyQuery } from '../../../hooks';

interface FolderDefaultCardProps {
	withNestedItems?: boolean;
	folder: AzureFolder;
	onClick: (folder: AzureFolder) => void;
	iconName?: IconType;
}

export function FolderDefaultCard({
	withNestedItems = false,
	folder,
	onClick,
	iconName
}: FolderDefaultCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [subFolders, setSubFolders] = useState<AzureFolder[]>([]);

	const [
		getFolderContentsById,
		{ data: getFolderContentsByIdData }
	] = useGetFolderContentsByIdLazyQuery();

	useEffectOnce(() => {
		if (withNestedItems) {
			getFolderContentsById({
				variables: {
					data: {
						azureFolderWhereUniqueInput: { id: folder.id }
					}
				}
			});
		}
	});

	useEffect(() => {
		if (getFolderContentsByIdData) {
			setSubFolders(getFolderContentsByIdData.getFolderContentsById.folders);
		}
	}, [getFolderContentsByIdData]);

	const handleOnClick = () => {
		onClick(folder);
	};

	if (!withNestedItems) {
		return (
			<FolderDefaultCardContainer
				onClick={handleOnClick}
				expanded={isExpanded}
				isSubItem={false}
			>
				<IconBlock>
					<FolderImage src={Images.folderImg} />
					{iconName && <FolderIcon name={iconName} color={Colors.blue[100]} />}
				</IconBlock>
				<InfoBlock>
					<CardTitle>{folder.name}</CardTitle>
				</InfoBlock>
			</FolderDefaultCardContainer>
		);
	}

	return (
		<CardWrapper>
			<FolderDefaultCardContainer
				onClick={handleOnClick}
				expanded={isExpanded}
				isSubItem={false}
			>
				{subFolders.length > 0 && (
					<GhostButton
						size={ButtonSize.SM}
						icon={isExpanded ? IconType.EpCornerDown : IconType.EpCornerRight}
						onClick={() => setIsExpanded(state => !state)}
					/>
				)}
				<IconBlock>
					<FolderImage src={Images.folderImg} />
					{iconName && <FolderIcon name={iconName} color={Colors.blue[100]} />}
				</IconBlock>
				<InfoBlock>
					<CardTitle>{folder.name}</CardTitle>
				</InfoBlock>
			</FolderDefaultCardContainer>

			{isExpanded &&
				subFolders.map(subFolder => (
					<FolderDefaultCardContainer
						key={subFolder.id}
						onClick={handleOnClick}
						expanded={false}
						isSubItem={true}
					>
						<IconBlock>
							<FolderImage src={Images.folderImg} />
							{iconName && <FolderIcon name={iconName} color={Colors.blue[100]} />}
						</IconBlock>
						<InfoBlock>
							<CardTitle>{subFolder.name}</CardTitle>
						</InfoBlock>
					</FolderDefaultCardContainer>
				))}
		</CardWrapper>
	);
}
