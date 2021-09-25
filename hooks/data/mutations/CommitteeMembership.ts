import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
	CreateCommitteeMembershipData,
	UpdateCommitteeMembershipData,
	DeleteCommitteeMembershipData
} from '@epolitiker/api';
import { UserAccountFragment } from '../fragments';

const CREATE_COMMITTEE_MEMBERSHIP = gql`
	mutation CreateCommitteeMembership($data: CreateCommitteeMembershipInput!) {
		createCommitteeMembership(data: $data) {
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

const UPDATE_COMMITTEE_MEMBERSHIP = gql`
	mutation UpdateCommitteeMembership($data: UpdateCommitteeMembershipInput!) {
		updateCommitteeMembership(data: $data) {
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

const DELETE_COMMITTEE_MEMBERSHIP = gql`
	mutation DeleteCommitteeMembership($data: DeleteCommitteeMembershipInput!) {
		deleteCommitteeMembership(data: $data) {
			id
		}
	}
`;

export function useCreateCommitteeMembershipMutation() {
	return useMutation<CreateCommitteeMembershipData>(CREATE_COMMITTEE_MEMBERSHIP, {
		onError: () => {}
	});
}

export function useUpdateCommitteeMembershipMutation() {
	return useMutation<UpdateCommitteeMembershipData>(UPDATE_COMMITTEE_MEMBERSHIP, {
		onError: () => {}
	});
}

export function useDeleteCommitteeMembershipMutation() {
	return useMutation<DeleteCommitteeMembershipData>(DELETE_COMMITTEE_MEMBERSHIP, {
		onError: () => {}
	});
}
