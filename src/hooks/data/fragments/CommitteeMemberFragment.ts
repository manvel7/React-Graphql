import gql from 'graphql-tag';

import { UserAccountFragment } from './UserAccountFragment';

export const CommitteeMemberFragment = gql`
	fragment CommitteeMemberFragment on CommitteeMember {
		id
		createdAt
		updatedAt
		role
		committee {
			id
		}
		user {
			...UserAccountFragment
		}
	}
	${UserAccountFragment}
`;
