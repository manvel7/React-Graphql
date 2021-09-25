import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
	AddAgendaItemInMeetingData,
	UpdateAgendaItemData,
	DeleteAgendaItemData,
	MoveAgendaItemData
} from '@epolitiker/api';

import { AgendaItemFragment } from '../fragments';

const ADD_AGENDA_ITEM_IN_MEETING = gql`
	mutation AddAgendaItemInMeeting($data: AddAgendaItemInMeetingInput!) {
		addAgendaItemInMeeting(data: $data) {
			...AgendaItemFragment
		}
	}
	${AgendaItemFragment}
`;

const UPDATE_AGENDA_ITEM = gql`
	mutation UpdateAgendaItem($data: UpdateAgendaItemInput) {
		updateAgendaItem(data: $data) {
			...AgendaItemFragment
		}
	}
	${AgendaItemFragment}
`;

const DELETE_AGENDA_ITEM = gql`
	mutation DeleteAgendaItem($data: AgendaItemWhereUniqueInput!) {
		deleteAgendaItem(data: $data) {
			id
		}
	}
`;

const MOVE_AGENDA_ITEM = gql`
	mutation MoveAgendaItem($data: MoveAgendaItemInput!) {
		moveAgendaItem(data: $data) {
			...AgendaItemFragment
		}
	}
	${AgendaItemFragment}
`;

export function useAddAgendaItemInMeetingMutation() {
	return useMutation<AddAgendaItemInMeetingData>(ADD_AGENDA_ITEM_IN_MEETING, {
		onError: () => {},
		refetchQueries: ['AllAgendaItemsInMeeting']
	});
}

export function useUpdateAgendaItemMutation() {
	return useMutation<UpdateAgendaItemData>(UPDATE_AGENDA_ITEM, {
		onError: () => {},
		refetchQueries: ['AllAgendaItemsInMeeting']
	});
}

export function useDeleteAgendaItemMutation() {
	return useMutation<DeleteAgendaItemData>(DELETE_AGENDA_ITEM, {
		onError: () => {},
		refetchQueries: ['AllAgendaItemsInMeeeting']
	});
}

export function useMoveAgendaItemMutation() {
	return useMutation<MoveAgendaItemData>(MOVE_AGENDA_ITEM, {
		onError: () => {},
		refetchQueries: ['AllAgendaItemsInMeeting']
	});
}
