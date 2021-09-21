import React, { useState } from 'react';

import { Document, Meeting } from '@epolitiker/api';

import { MeetingRelatedContainer, CardSubTitle, RelatedItemsList } from './MeetingRelated.style';
import { MeetingRelatedItemsCard } from '../../MeetingRelatedItemsCard';
import { useTranslation } from '../../../../hooks';

interface MeetingRelatedProps {
	meeting: Meeting;
}

export function MeetingRelated({ meeting }: MeetingRelatedProps) {
	const [documents] = useState<Document[]>(meeting.folder?.documents || []);
	const translate = useTranslation();

	return (
		<MeetingRelatedContainer>
			<CardSubTitle>{translate(({ titles }) => titles.relatedItems)}</CardSubTitle>
			<RelatedItemsList>
				{documents.length > 0 &&
					documents.map(document => (
						<MeetingRelatedItemsCard
							key={document.id}
							document={document}
							showAttachedFiles={false}
							onClick={() => {}}
						/>
					))}
			</RelatedItemsList>
		</MeetingRelatedContainer>
	);
}
