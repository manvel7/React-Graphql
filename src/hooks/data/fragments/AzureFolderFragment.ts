import gql from 'graphql-tag';

import { DocumentFragment } from './DocumentFragment';
import { UserAccountFragment } from './UserAccountFragment';

export const AzureFolderFragment = gql`
	fragment AzureFolderFragment on AzureFolder {
		id
		createdAt
		updatedAt
		name
		path
		type
		isPrivate
		status
		documents {
			...DocumentFragment
		}
		lastUpdatedBy {
			...UserAccountFragment
		}
		accessList {
			id
			permissions
			user {
				...UserAccountFragment
			}
		}
	}
	${DocumentFragment}
	${UserAccountFragment}
`;
