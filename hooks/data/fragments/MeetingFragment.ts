import gql from 'graphql-tag';

import { UserAccountFragment } from './UserAccountFragment';
import { AgendaItemFragment } from './AgendaItemFragment';
import { AzureFolderFragment } from './AzureFolderFragment';

export const MeetingFragment = gql`
	fragment MeetingFragment on Meeting {
		id
		createdAt
		updatedAt
		label
		description
		location
		status
		isRemote
		deputyAutoReplace
		eventPreviewCounter
		committee {
			id
			label
			visibility
			workspace {
				id
			}
			folder {
				id
				name
			}
		}
		dates {
			id
			startDate
			endDate
		}
		members {
			id
			createdAt
			updatedAt
			status
			reasonNotToAttend
			user {
				...UserAccountFragment
			}
		}
		reminders {
			id
			createdAt
			updatedAt
			type
			frequency
			frequencyType
		}
		agendaItems {
			...AgendaItemFragment
		}
		folder {
			...AzureFolderFragment
		}
	}
	${UserAccountFragment}
	${AgendaItemFragment}
	${AzureFolderFragment}
`;
