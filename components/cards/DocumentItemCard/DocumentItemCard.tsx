import React from 'react';
import moment from 'moment';

import { Document } from '@epolitiker/api';

import {
	DocumentItemCardContainer,
	CheckboxBlock,
	CardIconBlock,
	CardIconWrapper,
	CardIcon,
	CardIconBackground,
	CardInfoBlock,
	CardTitle,
	CardInfoText
} from './DocumentItemCard.style';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { Checkbox, Dot } from '../../ui';

interface DocumentItemCardProps {
	document: Document;
	checked: boolean;
	handleSelect: (checked: boolean, id: string) => void;
}

export function DocumentItemCard({ document, checked, handleSelect }: DocumentItemCardProps) {
	function updatedWhenAndFromWhom() {
		const updatedAt = moment(new Date(document.updatedAt)).format('MM/DD/YYYY');
		const updatedBy = `${document.uploadedBy.firstName} ${document.uploadedBy.lastName}`;
		return `Last updated by ${updatedBy} on  ${updatedAt}`;
	}

	return (
		<DocumentItemCardContainer>
			<CheckboxBlock>
				<Checkbox
					checked={checked}
					onChange={e => handleSelect(e.target.checked, document.id)}
				/>
			</CheckboxBlock>

			<CardIconBlock>
				<CardIconWrapper>
					<CardIcon name={IconType.EpDoc} color={Colors.neutralBlue[100]} />
					<CardIconBackground />
				</CardIconWrapper>
			</CardIconBlock>

			<CardInfoBlock>
				<CardTitle>{document.name}</CardTitle>
				<CardInfoText>
					{updatedWhenAndFromWhom()}
					<Dot />
					{`${(document.size / 1000).toFixed(0)}mb`}
					<Dot />
					{document.status === 'NOT_PUBLISHED' && 'not published'}
				</CardInfoText>
			</CardInfoBlock>
		</DocumentItemCardContainer>
	);
}
