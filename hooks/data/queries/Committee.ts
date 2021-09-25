import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CommitteeDetailsData } from '@epolitiker/api';
import { CommitteeFragment, MeetingFragment, CommitteeMemberFragment } from '../fragments';

const COMMITTEE_DETAILS = gql`
	query CommitteeDetails($data: CommitteeDetailsInput) {
		committeeDetails(data: $data) {
			...CommitteeFragment
		}
	}
	${CommitteeFragment}
`;

const COMMITTEE_PRIVATE_MEMBERS = gql`
	query CommitteeDetails(
		$data: CommitteeDetailsInput
		$where: CommitteeMemberWhereInput
		$orderBy: CommitteeMemberOrderByInput
	) {
		committeeDetails(data: $data) {
			id
			label
			description
			visibility
			members(where: $where, orderBy: $orderBy) {
				...CommitteeMemberFragment
			}
		}
	}
	${CommitteeMemberFragment}
`;

const COMMITTEE_MEETINGS = gql`
	query CommitteeDetails(
		$data: CommitteeDetailsInput
		$where: MeetingWhereInput
		$orderBy: MeetingOrderByInput
	) {
		committeeDetails(data: $data) {
			id
			label
			description
			visibility
			meetings(where: $where, orderBy: $orderBy) {
				...MeetingFragment
			}
		}
	}
	${MeetingFragment}
`;

export function useCommitteeDetailsLazyQuery() {
	return useLazyQuery<CommitteeDetailsData>(COMMITTEE_DETAILS);
}

export function useCommitteePrivateMembersLazyQuery() {
	return useLazyQuery<CommitteeDetailsData>(COMMITTEE_PRIVATE_MEMBERS);
}

export function useCommitteeMeetingsLazyQuery() {
	return useLazyQuery<CommitteeDetailsData>(COMMITTEE_MEETINGS);
}
