import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CreateUserIdentityData } from '@epolitiker/api';
import { UserAccountFragment } from '../fragments';

const CREATE_USER_IDENTITY_MUTATION = gql`
	mutation CreateUserIdentity($password: String!, $token: String!) {
		createUserIdentity(password: $password, token: $token) {
			token
			user {
				...UserAccountFragment
			}
		}
	}
	${UserAccountFragment}
`;

export function useCreateUserIdentityMutation() {
	return useMutation<CreateUserIdentityData>(CREATE_USER_IDENTITY_MUTATION, {
		onError: () => {}
	});
}
