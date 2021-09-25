import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CommitteeDetailsData, AllMeetingsInWorkspaceData } from '@epolitiker/api';
import { MeetingFragment } from '../fragments';

export const ALL_MEETINGS_IN_WORKSPACE = gql`
	query AllMeetingsInWorkspace($data: AllMeetingsInWorkspaceInput) {
		allMeetingsInWorkspace(data: $data) {
			...MeetingFragment
		}
	}
	${MeetingFragment}
`;

export const MEETING_DETAILS = gql`
	query CommitteeDetails($data: CommitteeDetailsInput, $where: MeetingWhereInput) {
		committeeDetails(data: $data) {
			id
			visibility
			meetings(where: $where) {
				...MeetingFragment
			}
		}
	}
	${MeetingFragment}
`;

export function useAllMeetingsInWorkspace() {
	return useLazyQuery<AllMeetingsInWorkspaceData>(ALL_MEETINGS_IN_WORKSPACE);
}

export function useMeetingDetailsLazyQuery() {
	return useLazyQuery<CommitteeDetailsData>(MEETING_DETAILS);
}
