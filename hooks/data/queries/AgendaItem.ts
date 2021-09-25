import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AllAgendaItemsInMeetingData } from '@epolitiker/api';

import { AgendaItemFragment } from '../fragments';

const ALL_AGENDA_ITEMS_IN_MEETING = gql`
	query AllAgendaItemsInMeeting($data: AllAgendaItemsInMeetingInput) {
		allAgendaItemsInMeeting(data: $data) {
			...AgendaItemFragment
		}
	}
	${AgendaItemFragment}
`;

export function useAllAgendaItemsInMeetingLazyQuery() {
	return useLazyQuery<AllAgendaItemsInMeetingData>(ALL_AGENDA_ITEMS_IN_MEETING, {
		fetchPolicy: 'no-cache'
	});
}
