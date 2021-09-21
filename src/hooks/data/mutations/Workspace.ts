import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
	CreateWorkspaceAsSuperData,
	CreateWorkspaceData,
	ToggleActiveWorkspaceOwnerData,
	InviteWorkspaceMemberData,
	CreateCommitteeInWorkspaceData,
	UpdateWorkspaceLogoInput,
	DeleteWorkspaceLogoInput
} from '@epolitiker/api';

import { UserAccountFragment, CommitteeFragment, WorkspaceFragment } from '../fragments';

const CREATE_WORKSPACE_MUTATION = gql`
	mutation CreateWorkspace($data: CreateWorkspaceInput!) {
		createWorkspace(data: $data) {
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

const CREATE_WORKSPACE_AS_SUPER_MUTATION = gql`
	mutation CreateWorkspaceAsSuper($data: WorkspaceCreateInput!) {
		createWorkspaceAsSuper(data: $data) {
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

const TOGGLE_ACTIVE_WORKSPACE_OWNER = gql`
	mutation ToggleActiveWorkspaceOwner(
		$data: ToggleActiveWorkspaceOwnerInput!
		$where: UserAccountWhereUniqueInput!
	) {
		toggleActiveWorkspaceOwner(data: $data, where: $where) {
			account {
				...UserAccountFragment
			}
			token
		}
	}
	${UserAccountFragment}
`;

const INVITE_WORKSPACE_MEMBER = gql`
	mutation InviteWorkspaceMember($data: InviteWorkspaceMemberInput!) {
		inviteWorkspaceMember(data: $data) {
			id
			members {
				...UserAccountFragment
			}
		}
	}
	${UserAccountFragment}
`;

const CREATE_COMMITTEE_IN_WORKSPACE = gql`
	mutation CreateCommitteeInWorkspace($data: CreateCommitteeInWorkspaceInput!) {
		createCommitteeInWorkspace(data: $data) {
			...CommitteeFragment
		}
	}
	${CommitteeFragment}
`;

const UPDATE_WORKSPACE_LOGO = gql`
	mutation UpdateWorkspaceLogo($data: UpdateWorkspaceLogoInput!) {
		updateWorkspaceLogo(data: $data) {
			...WorkspaceFragment
		}
	}
	${WorkspaceFragment}
`;

const DELETE_WORKSPACE_LOGO = gql`
	mutation DeleteWorkspaceLogo($data: DeleteWorkspaceLogoInput!) {
		deleteWorkspaceLogo(data: $data) {
			...WorkspaceFragment
		}
	}
	${WorkspaceFragment}
`;

export function useCreateWorkspaceMutation() {
	return useMutation<CreateWorkspaceData>(CREATE_WORKSPACE_MUTATION, { onError: () => {} });
}

export function useCreateWorkspaceAsSuperMutation() {
	return useMutation<CreateWorkspaceAsSuperData>(CREATE_WORKSPACE_AS_SUPER_MUTATION, {
		onError: () => {}
	});
}

export function useToggleActiveWorkspaceOwnerMutation() {
	return useMutation<ToggleActiveWorkspaceOwnerData>(TOGGLE_ACTIVE_WORKSPACE_OWNER, {
		onError: () => {}
	});
}

export function useInviteWorkspaceMemberMutation() {
	return useMutation<InviteWorkspaceMemberData>(INVITE_WORKSPACE_MEMBER, {
		onError: () => {},
		refetchQueries: ['WorkspaceDetails']
	});
}

export function useCreateCommitteeInWorkspaceMutation() {
	return useMutation<CreateCommitteeInWorkspaceData>(CREATE_COMMITTEE_IN_WORKSPACE, {
		onError: () => {},
		refetchQueries: ['WorkspaceDetails']
	});
}

export function useCreateWorkspaceAvatarFileMutation() {
	return useMutation<UpdateWorkspaceLogoInput>(UPDATE_WORKSPACE_LOGO, {
		onError: () => {}
	});
}
export function useDeleteWorkspaceLogoMutation() {
	return useMutation<DeleteWorkspaceLogoInput>(DELETE_WORKSPACE_LOGO, {
		onError: () => {}
	});
}
