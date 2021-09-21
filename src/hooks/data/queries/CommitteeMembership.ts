import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CommitteeMembershipsData } from '@epolitiker/api';

import { UserAccountFragment } from '../fragments';

const COMMITTEE_MEMBERSHIPS = gql`
	query CommitteeMemberships($data: CommitteeMembershipsInput) {
		committeeMemberships(data: $data) {
			id
			type
			position
			sinceDate
			toDate
			user {
				...UserAccountFragment
			}
			committee {
				id
				label
				visibility
			}
		}
	}
	${UserAccountFragment}
`;

export function useCommitteeMembershipsLazyQuery() {
	return useLazyQuery<CommitteeMembershipsData>(COMMITTEE_MEMBERSHIPS, {
		fetchPolicy: 'no-cache'
	});
}
