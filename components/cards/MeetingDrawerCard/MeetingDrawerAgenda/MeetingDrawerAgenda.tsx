import React from 'react';

import { Meeting } from '@epolitiker/api';

import {
	MeetingDrawerAgendaContainer,
	CardSubTitle,
	MeetingDrawerAgendaList
} from './MeetingDrawerAgenda.style';
import { AgendaItemExpandingCard } from '../../AgendaItemExpandingCard';
import { useTranslation } from '../../../../hooks';

interface MeetingDrawerAgendaProps {
	meeting: Meeting;
}

export function MeetingDrawerAgenda({ meeting }: MeetingDrawerAgendaProps) {
	const translate = useTranslation();

	return (
		<MeetingDrawerAgendaContainer>
			<CardSubTitle>{translate(({ titles }) => titles.agendaItems)}</CardSubTitle>
			<MeetingDrawerAgendaList>
				{meeting.agendaItems.length > 0 &&
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					meeting.agendaItems.sort((a, b) => a.order! - b.order!) &&
					meeting.agendaItems.map(agendaItem => (
						<AgendaItemExpandingCard key={agendaItem.id} agenda={agendaItem} />
					))}
			</MeetingDrawerAgendaList>
		</MeetingDrawerAgendaContainer>
	);
}
