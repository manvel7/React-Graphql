import React, { useState } from 'react';

import { AgendaItem } from '@epolitiker/api';

import {
	AgendaItemExpandingCardContainer,
	CardMainBlock,
	CardTitleBlock,
	CardTitle,
	CardSubTitle,
	CardInfoText,
	CardContentBlock,
	ItemsBlock,
	// SuggestionsBlock,
	RepliesBlock,
	CardDocumentWrapper,
	CardDocumentTitle
} from './AgendaItemExpandingCard.style';
import { GhostButton, ButtonSize, Icon } from '../../ui';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { MemberDefaultCard } from '../MemberDefaultCard';
import { useTranslation } from '../../../hooks';

interface AgendaItemExpandingCardProps {
	agenda: AgendaItem;
}

export function AgendaItemExpandingCard({ agenda }: AgendaItemExpandingCardProps) {
	const translate = useTranslation();
	const [open, setOpen] = useState(false);

	function toggleCard() {
		setOpen(!open);
	}

	return (
		<AgendaItemExpandingCardContainer>
			<CardMainBlock>
				<GhostButton
					icon={open ? IconType.EpCornerDown : IconType.EpCornerRight}
					onClick={toggleCard}
					size={ButtonSize.SM}
				/>
				<CardTitleBlock>
					<CardTitle>{agenda.title}</CardTitle>
					<CardInfoText>{agenda.description}</CardInfoText>
				</CardTitleBlock>
				<GhostButton
					icon={IconType.EpExternalLink}
					onClick={() => {}}
					size={ButtonSize.SM}
				/>
			</CardMainBlock>
			{open && (
				<CardContentBlock>
					<ItemsBlock>
						<CardSubTitle>
							{`${translate(({ titles }) => titles.items)} ${
								agenda.folder?.documents.length
							}`}
						</CardSubTitle>
						{agenda.folder?.documents.map(doc => (
							<CardDocumentWrapper key={doc.id}>
								<Icon
									name={IconType.EpDoc}
									color={Colors.neutralBlue[80]}
									size={24}
								/>
								<CardDocumentTitle>{doc.name}</CardDocumentTitle>
								{/*<CardDocumentTitle>{doc.lastUpdatedBy}</CardDocumentTitle>*/}
								{/*<CardDocumentTitle>{doc.description}</CardDocumentTitle>*/}
								{/*<CardDocumentTitle>{doc.accessList}</CardDocumentTitle>*/}
								<GhostButton
									icon={IconType.EpOpen}
									onClick={() => {}}
									size={ButtonSize.SM}
								/>
							</CardDocumentWrapper>
						))}
					</ItemsBlock>
					{/* <SuggestionsBlock>
						<CardSubTitle>Suggestions 2</CardSubTitle>
					</SuggestionsBlock> */}
					<RepliesBlock>
						<CardSubTitle>{translate(({ titles }) => titles.replies)}1</CardSubTitle>
						<MemberDefaultCard member={agenda.representor} onClick={() => {}} />
					</RepliesBlock>
				</CardContentBlock>
			)}
		</AgendaItemExpandingCardContainer>
	);
}
