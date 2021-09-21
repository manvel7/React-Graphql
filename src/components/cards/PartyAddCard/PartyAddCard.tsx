import React from 'react';

import { PoliticalParty } from '@epolitiker/api';

import { PartyAddCardContainer, CardTitle } from './PartyAddCard.style';
import { ButtonSize, PrimaryButton } from '../../ui';
import { IconType } from '../../../consts';

interface PartyAddCardProps {
	party: PoliticalParty;
	onAddClick: (partyId: string) => void;
	disabled?: boolean;
}

export function PartyAddCard({ party, onAddClick, disabled = false }: PartyAddCardProps) {
	return (
		<PartyAddCardContainer>
			<CardTitle>{party.name}</CardTitle>
			<PrimaryButton
				size={ButtonSize.SM}
				icon={IconType.EpPlus}
				onClick={() => onAddClick(party.id)}
				disabled={disabled}
			/>
		</PartyAddCardContainer>
	);
}
