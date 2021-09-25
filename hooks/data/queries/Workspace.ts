import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AllWorkspacesData, WorkspaceDetailsData } from '@epolitiker/api';
import { UserAccountFragment, CommitteeFragment, WorkspaceFragment } from '../fragments';

const ALL_WORKSPACES = gql`
	query allWorkspaces {
		allWorkspaces(orderBy: createdAt_DESC) {
			name
			owners {
				...UserAccountFragment
			}
			organization {
				name
				code
				address
				number
			}
		}
	}
	${UserAccountFragment}
`;

const WORKSPACE_DETAILS = gql`
	query WorkspaceDetails($data: WorkspaceDetailsInput) {
		workspaceDetails(data: $data) {
			id
			createdAt
			updatedAt
			name
			owners {
				...UserAccountFragment
			}
			organization {
				name
				code
				address
				number
			}
			logo {
				id
				url
			}
			folder {
				id
				name
			}
		}
	}
	${UserAccountFragment}
`;

const WORKSPACE_FULL_DETAILS = gql`
	query WorkspaceDetails($data: WorkspaceDetailsInput) {
		workspaceDetails(data: $data) {
			...WorkspaceFragment
		}
	}
	${WorkspaceFragment}
`;

const WORKSPACE_MEMBERS = gql`
	query WorkspaceDetails(
		$data: WorkspaceDetailsInput
		$where: UserAccountWhereInput
		$orderBy: UserAccountOrderByInput
	) {
		workspaceDetails(data: $data) {
			id
			name
			members(where: $where, orderBy: $orderBy) {
				...UserAccountFragment
			}
		}
	}
	${UserAccountFragment}
`;

const WORKSPACE_COMMITTEES = gql`
	query WorkspaceDetails(
		$data: WorkspaceDetailsInput
		$where: CommitteeWhereInput
		$orderBy: CommitteeOrderByInput
		$skip: Int
	) {
		workspaceDetails(data: $data) {
			id
			name
			committees(where: $where, orderBy: $orderBy, skip: $skip) {
				...CommitteeFragment
			}
		}
	}
	${CommitteeFragment}
`;

export function useAllWorkspacesQuery() {
	return useQuery<AllWorkspacesData>(ALL_WORKSPACES);
}

export function useWorkspaceDetailsQuery() {
	return useLazyQuery<WorkspaceDetailsData>(WORKSPACE_DETAILS);
}

export function useWorkspaceFullDetailsLazyQuery() {
	return useLazyQuery<WorkspaceDetailsData>(WORKSPACE_FULL_DETAILS);
}

export function useWorkspaceMembersLazyQuery() {
	return useLazyQuery<WorkspaceDetailsData>(WORKSPACE_MEMBERS);
}

export function useWorkspaceCommitteesLazyQuery() {
	return useLazyQuery<WorkspaceDetailsData>(WORKSPACE_COMMITTEES);
}
