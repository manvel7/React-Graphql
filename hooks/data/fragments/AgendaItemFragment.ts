import gql from 'graphql-tag';

import { UserAccountFragment } from './UserAccountFragment';
import { AzureFolderFragment } from './AzureFolderFragment';

export const AgendaItemFragment = gql`
	fragment AgendaItemFragment on AgendaItem {
		id
		createdAt
		updatedAt
		title
		description
		duration
		representor {
			...UserAccountFragment
		}
		meeting {
			id
			createdAt
			updatedAt
			label
			committee {
				id
			}
		}
		subItems {
			id
			createdAt
			updatedAt
			title
			description
			duration
			representor {
				...UserAccountFragment
			}
			meeting {
				id
			}
			folder {
				...AzureFolderFragment
			}
		}
		isParent
		folder {
			...AzureFolderFragment
		}
		order
	}
	${UserAccountFragment}
	${AzureFolderFragment}
`;
