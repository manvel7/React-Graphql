import React from 'react';
import { AgendaItem } from '@epolitiker/api';

import {
	AgendaTableRepliesCardContainer,
	AgendaItemAvatarCardBlock,
	AgendaItemAvatarPart
} from './AgendaTableRepilesCard.style';
import { Avatar, AvatarSize, Icon } from '../../ui';
import { IconType } from '../../../consts';

interface AgendaTableRepliesCard {
	agendaItem: AgendaItem;
}

export const AgendaTableRepliesCard = ({ agendaItem }: AgendaTableRepliesCard) => {
	return (
		<AgendaTableRepliesCardContainer>
			<AgendaItemAvatarCardBlock>
				<Icon name={IconType.EpHello} />
				<AgendaItemAvatarPart>
					<Avatar image={agendaItem.representor?.avatar?.url} size={AvatarSize.XS} />
				</AgendaItemAvatarPart>
			</AgendaItemAvatarCardBlock>
		</AgendaTableRepliesCardContainer>
	);
};
