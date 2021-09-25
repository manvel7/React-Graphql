import React, { useMemo } from 'react';
import moment from 'moment';

import { AzureFolder } from '@epolitiker/api';

import {
	FormCardContainer,
	IconBlock,
	FolderImage,
	InfoBlock,
	CardTitle,
	CardInfoBlock,
	CardInfoText,
	CardActionBlock,
	FolderIcon
} from './FolderCard.style';
import { Colors, Images } from '../../../environment';
import { Dot, GhostButton, Icon } from '../../ui';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

interface FolderCardProps {
	folder: AzureFolder;
	onClick: () => void;
	selected?: boolean;
	onOpenClick?: (folderId: string) => void;
	withInfo?: boolean;
	iconName?: IconType;
}

export function FolderCard({
	folder,
	onClick,
	selected = false,
	onOpenClick,
	withInfo = true,
	iconName
}: FolderCardProps) {
	const translate = useTranslation();

	const updatedInfo = useMemo(() => {
		const text = translate(({ titles }) => titles.lastUpdatedBy);
		const updatedBy = `${folder.lastUpdatedBy?.firstName || ''} ${folder.lastUpdatedBy
			?.lastName || ''}`;
		const date = moment(new Date(folder.updatedAt)).format('D MMM');
		const time = moment(new Date(folder.updatedAt)).format('k:mm');
		return `${text} ${updatedBy} ${date} at ${time}`;
	}, [folder]);

	const handleOpenClick = () => {
		onOpenClick ? onOpenClick(folder.id) : () => {};
	};

	return (
		<FormCardContainer onClick={onClick} selected={selected}>
			<IconBlock>
				<FolderImage src={Images.folderImg} />
				{iconName && <FolderIcon name={iconName} color={Colors.blue[100]} />}
			</IconBlock>
			<InfoBlock>
				<CardTitle>
					{folder.name === 'meetings'
						? translate(({ titles }) => titles.meetings)
						: folder.name}
				</CardTitle>
				{withInfo && (
					<CardInfoBlock>
						<CardInfoText>{updatedInfo}</CardInfoText>
						<Dot />
						<Icon name={IconType.EpMembers} />
						<CardInfoText>{folder.accessList?.length || 0}</CardInfoText>
					</CardInfoBlock>
				)}
			</InfoBlock>
			<CardActionBlock>
				<GhostButton
					icon={IconType.EpChevronRight}
					onClick={handleOpenClick}
					tooltip={translate(({ buttons }) => buttons.open)}
				/>
			</CardActionBlock>
		</FormCardContainer>
	);
}
