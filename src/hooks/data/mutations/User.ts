import { useMutation } from '@apollo/react-hooks';
import {
	UpdateUserPreferencesVariables,
	UpdatePasswordForIdentityVariables,
	LinkAppleIdData,
	LinkAppleIdVariables,
	LoginData,
	LoginVariables,
	CreateUserAccountData,
	UpdateUserAccountDetailsData,
	AddOrRemoveUserAvatarData,
	VerifyEmailData
} from '@epolitiker/api';
import gql from 'graphql-tag';
import { UserAccountFragment } from '../fragments';

const UPDATE_PASSWORD_MUTATION = gql`
	mutation UpdatePassword($password: String!) {
		updatePasswordForIdentity(password: $password)
	}
`;

const UPDATE_USER_PREFERENCES_MUTATION = gql`
	mutation UpdateUserPreferences($workspaceId: String!) {
		createOrUpdateUserPreferences(workspaceId: $workspaceId)
	}
`;

const LINK_APPLE_ID_MUTATION = gql`
	mutation LinkAppleId($appleId: String!, $email: String) {
		linkAppleIdWithIdentity(appleId: $appleId, email: $email) {
			token
		}
	}
`;

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				...UserAccountFragment
			}
		}
	}
	${UserAccountFragment}
`;

const CREATE_USER_ACCOUNT = gql`
	mutation CreateUserAccount($data: UserAccountCreateInput!) {
		createUserAccount(data: $data) {
			token
			user {
				...UserAccountFragment
			}
		}
	}
	${UserAccountFragment}
`;

const VERIFY_EMAIL = gql`
	mutation VerifyEmail($data: VerifyEmailInput!) {
		verifyEmail(data: $data) {
			token
			user {
				...UserAccountFragment
			}
		}
	}
	${UserAccountFragment}
`;

const UPDATE_USER_ACCOUNT_DETAILS = gql`
	mutation UpdateUserAccountDetails($data: UpdateUserAccountDetailsInput!) {
		updateUserAccountDetails(data: $data) {
			...UserAccountFragment
		}
	}
	${UserAccountFragment}
`;

const ADD_OR_REMOVE_USER_AVATAR = gql`
	mutation AddOrRemoveUserAvatar($data: AddOrRemoveUserAvatarInput) {
		addOrRemoveUserAvatar(data: $data) {
			...UserAccountFragment
		}
	}
	${UserAccountFragment}
`;

export function useUpdatePasswordMutation() {
	return useMutation<null, UpdatePasswordForIdentityVariables>(UPDATE_PASSWORD_MUTATION);
}

export function useUpdateUserPreferencesMutation() {
	return useMutation<null, UpdateUserPreferencesVariables>(UPDATE_USER_PREFERENCES_MUTATION, {
		refetchQueries: ['workspacesQuery']
	});
}

export function useLinkAppleIdMutation() {
	return useMutation<LinkAppleIdData, LinkAppleIdVariables>(LINK_APPLE_ID_MUTATION);
}

export function useLoginMutation() {
	return useMutation<LoginData, LoginVariables>(LOGIN_MUTATION, { onError: () => {} });
}

export function useCreateUserAccountMutation() {
	return useMutation<CreateUserAccountData>(CREATE_USER_ACCOUNT, {
		onError: () => {}
	});
}

export function useVerifyEmailMutation() {
	return useMutation<VerifyEmailData>(VERIFY_EMAIL, {
		onError: () => {}
	});
}

export function useUpdateUserAccountDetailsMutation() {
	return useMutation<UpdateUserAccountDetailsData>(UPDATE_USER_ACCOUNT_DETAILS, {
		onError: () => {}
	});
}

export function useAddOrRemoveUserAvatar() {
	return useMutation<AddOrRemoveUserAvatarData>(ADD_OR_REMOVE_USER_AVATAR, {
		onError: () => {}
	});
}
