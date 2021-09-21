import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { MeData, PasswordIsSetData, PasswordIsSetVariables } from '@epolitiker/api';
import gql from 'graphql-tag';
import { UserAccountFragment } from '../fragments/UserAccountFragment';

const fragments = {
	workspaces: gql`
		fragment Workspaces on Workspace {
			id
			name
		}
	`,
	activeWorkspace: gql`
		fragment ActiveWorkspace on Workspace {
			id
			name
		}
	`
};

const ME_QUERY = gql`
	{
		me {
			...UserAccountFragment
		}
	}
	${UserAccountFragment}
`;

const WORKSPACES_QUERY = gql`
	query workspacesQuery {
		me {
			preferences {
				activeWorkspace {
					...ActiveWorkspace
				}
			}
			workspaces {
				...Workspaces
			}
		}
	}
	${fragments.activeWorkspace}
	${fragments.workspaces}
`;

const IS_PASSWORD_SET_QUERY = gql`
	query PasswordIsSet($email: String!) {
		passwordIsSet(email: $email) {
			isSet
		}
	}
`;

export function useMeQuery() {
	return useQuery<MeData>(ME_QUERY);
}

export function useWorkspacesQuery() {
	return useQuery<MeData>(WORKSPACES_QUERY);
}

export function useIsPasswordSetQuery() {
	return useLazyQuery<PasswordIsSetData, PasswordIsSetVariables>(IS_PASSWORD_SET_QUERY, {
		fetchPolicy: 'no-cache'
	});
}
