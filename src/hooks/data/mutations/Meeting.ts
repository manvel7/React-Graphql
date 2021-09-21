import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
	AddMeetingInCommitteeData,
	UpdateMeetingDetailsData,
	AllMeetingsInWorkspaceData
} from '@epolitiker/api';
import { MeetingFragment } from '../fragments';
import { ALL_MEETINGS_IN_WORKSPACE } from '../queries/Meeting';

const ADD_MEETING_IN_COMMITTEE = gql`
	mutation AddMeetingInCommittee($data: AddMeetingInCommitteeInput!) {
		addMeetingInCommittee(data: $data) {
			...MeetingFragment
		}
	}
	${MeetingFragment}
`;

const UPDATE_MEETING_DETAILS = gql`
	mutation UpdateMeetingDetails($data: UpdateMeetingDetailsInput!) {
		updateMeetingDetails(data: $data) {
			...MeetingFragment
		}
	}
	${MeetingFragment}
`;

export function useAddMeetingInCommitteeMutation() {
	return useMutation<AddMeetingInCommitteeData>(ADD_MEETING_IN_COMMITTEE, {
		onError: () => {},
		update: (cache, { data }) => {
			try {
				const result = cache.readQuery<AllMeetingsInWorkspaceData>({
					query: ALL_MEETINGS_IN_WORKSPACE,
					variables: {
						data: {
							workspaceId: data?.addMeetingInCommittee.committee.workspace.id,
							orderBy: 'startDate_ASC',
							where: {
								committee: {},
								OR: [
									{ label_contains: '' },
									{ location_contains: '' },
									{ description_contains: '' },
									{ label_in: [''] },
									{ location_in: [''] },
									{ description_in: [''] }
								]
							}
						}
					}
				});
				if (result) {
					const newCacheData = [
						...result.allMeetingsInWorkspace,
						data?.addMeetingInCommittee
					];

					cache.writeQuery({
						query: ALL_MEETINGS_IN_WORKSPACE,
						variables: {
							data: {
								workspaceId: data?.addMeetingInCommittee.committee.workspace.id,
								orderBy: 'startDate_ASC',
								where: {
									committee: {},
									OR: [
										{ label_contains: '' },
										{ location_contains: '' },
										{ description_contains: '' },
										{ label_in: [''] },
										{ location_in: [''] },
										{ description_in: [''] }
									]
								}
							}
						},
						data: { allMeetingsInWorkspace: newCacheData }
					});
				}
			} catch (e) {
				/* empty */
			}
		}
	});
}

export function useUpdateMeetingDetailsMutation() {
	return useMutation<UpdateMeetingDetailsData>(UPDATE_MEETING_DETAILS, {
		onError: () => {}
		// update: (cache, { data }) => {
		// 	try {
		// 		const result = cache.readQuery<AllMeetingsInWorkspaceData>({
		// 			query: ALL_MEETINGS_IN_WORKSPACE,
		// 			variables: {
		// 				data: {
		// 					workspaceId: data?.updateMeetingDetails.committee.workspace.id,
		// 					orderBy: 'startDate_ASC',
		// 					where: {
		// 						committee: {},
		// 						OR: [
		// 							{ label_contains: '' },
		// 							{ location_contains: '' },
		// 							{ description_contains: '' },
		// 							{ label_in: [''] },
		// 							{ location_in: [''] },
		// 							{ description_in: [''] }
		// 						]
		// 					}
		// 				}
		// 			}
		// 		});
		//
		// 		if (result) {
		// 			const newCacheData = [
		// 				...result.allMeetingsInWorkspace,
		// 				data?.updateMeetingDetails
		// 			];
		// 			cache.writeQuery({
		// 				query: ALL_MEETINGS_IN_WORKSPACE,
		// 				variables: {
		// 					data: {
		// 						workspaceId: data?.updateMeetingDetails.committee.workspace.id,
		// 						orderBy: 'startDate_ASC',
		// 						where: {
		// 							committee: {},
		// 							OR: [
		// 								{ label_contains: '' },
		// 								{ location_contains: '' },
		// 								{ description_contains: '' },
		// 								{ label_in: [''] },
		// 								{ location_in: [''] },
		// 								{ description_in: [''] }
		// 							]
		// 						}
		// 					}
		// 				},
		// 				data: { allMeetingsInWorkspace: newCacheData }
		// 			});
		// 		}
		// 	} catch (e) {
		// 		/* empty */
		// 	}
		// }
	});
}
