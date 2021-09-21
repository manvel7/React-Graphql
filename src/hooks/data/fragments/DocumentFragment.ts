import gql from 'graphql-tag';

import { UserAccountFragment } from './UserAccountFragment';
import { FileFragment } from './FileFragment';

export const DocumentFragment = gql`
	fragment DocumentFragment on Document {
		id
		createdAt
		updatedAt
		name
		description
		size
		status
		protocol
		isPrivate
		uploadedBy {
			...UserAccountFragment
		}
		lastUpdatedBy {
			...UserAccountFragment
		}
		file {
			...FileFragment
		}
		accessList {
			id
			permissions
			user {
				...UserAccountFragment
			}
		}
	}
	${UserAccountFragment}
	${FileFragment}
`;
