import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { UpdateCommitteeDetailsData } from '@epolitiker/api';
import { CommitteeFragment } from '../fragments';

const UPDATE_COMMITTEE_DETAILS = gql`
	mutation UpdateCommitteeDetails($data: UpdateCommitteeDetailsInput!) {
		updateCommitteeDetails(data: $data) {
			...CommitteeFragment
		}
	}
	${CommitteeFragment}
`;

const ADD_OR_REMOVE_COMMITTEE_PRIVATE_MEMBER = gql`
	mutation UpdateCommitteeDetails($data: UpdateCommitteeDetailsInput!) {
		updateCommitteeDetails(data: $data) {
			...CommitteeFragment
		}
	}
	${CommitteeFragment}
`;

const DELETE_COMMITTEE = gql`
	mutation DeleteCommittee($data: DeleteCommitteeInput!) {
		deleteCommittee(data: $data) {
			id
		}
	}
`;

export function useUpdateCommitteeDetailsMutation() {
	return useMutation<UpdateCommitteeDetailsData>(UPDATE_COMMITTEE_DETAILS, {
		onError: () => {},
		refetchQueries: ['CommitteeDetails']
	});
}

export function useAddOrRemoveCommitteePrivateMemberMutation() {
	return useMutation<UpdateCommitteeDetailsData>(ADD_OR_REMOVE_COMMITTEE_PRIVATE_MEMBER, {
		onError: () => {},
		refetchQueries: ['CommitteeDetails']
	});
}

export function useDeleteCommitteeMutation() {
	return useMutation<UpdateCommitteeDetailsData>(DELETE_COMMITTEE, {
		onError: () => {}
	});
}
