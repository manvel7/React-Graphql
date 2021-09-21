import React from 'react';

import { Committee } from '@epolitiker/api';

import {
	CommitteeItemCardContainer,
	IconBlock,
	FolderImage,
	InfoBlock,
	CardTitle,
	CardInfoBlock,
	CardInfoText
} from './CommitteeItemCard.style';

import { Images } from '../../../environment';
import { Dot, Icon } from '../../ui';
import { IconType } from '../../../consts';

interface CommitteeItemCardProps {
	committee: Committee;
	onClick: (committee: Committee) => void;
}

export function CommitteeItemCard({ committee, onClick }: CommitteeItemCardProps) {
	return (
		<CommitteeItemCardContainer onClick={() => onClick(committee)}>
			<IconBlock>
				<FolderImage src={Images.folderImg} />
			</IconBlock>
			<InfoBlock>
				<CardTitle>{committee.label}</CardTitle>
				<CardInfoBlock>
					<CardInfoText>Last updated by Erik Golsby 12 Mar at 9:24</CardInfoText>
					<Dot />
					<Icon name={IconType.EpMembers} />
					<CardInfoText>{committee?.members?.length}</CardInfoText>
				</CardInfoBlock>
			</InfoBlock>
		</CommitteeItemCardContainer>
	);
}
