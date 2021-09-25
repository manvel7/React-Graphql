import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
	CreateDefaultPartyData,
	UpdateDefaultPartyData,
	DeleteDefaultPartyData,
	AddPartyToWorkspaceData,
	UpdateWorkspacePartyData,
	DeleteWorkspacePartyData,
	UploadLogoToDefaultPartyData,
	UploadLogoToWorkspacePartyData,
	DeleteLogoFromWorkspacePartyInput
} from '@epolitiker/api';

import { PoliticalPartyFragment } from '../fragments';

const CREATE_DEFAULT_PARTY = gql`
	mutation CreateDefaultParty($data: PoliticalPartyCreateInput!) {
		createDefaultParty(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

const UPDATE_DEFAULT_PARTY = gql`
	mutation UpdateDefaultParty($data: UpdateDefaultPartyInputCustom!) {
		updateDefaultParty(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

const DELETE_DEFAULT_PARTY = gql`
	mutation DeleteDefaultParty($data: PoliticalPartyWhereUniqueInput!) {
		deleteDefaultParty(data: $data) {
			id
		}
	}
`;

const ADD_PARTY_TO_WORKSPACE = gql`
	mutation AddPartyToWorkspace($data: AddPartyToWorkspaceInput!) {
		addPartyToWorkspace(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

const UPDATE_WORKSPACE_PARTY = gql`
	mutation UpdateWorkspaceParty($data: UpdateWorkspacePartyInput!) {
		updateWorkspaceParty(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

const DELETE_WORKSPACE_PARTY = gql`
	mutation DeleteWorkspaceParty($data: DeleteWorkspacePartyInput!) {
		deleteWorkspaceParty(data: $data) {
			id
		}
	}
`;

const UPLOAD_LOGO_TO_DEFAULT_PARTY = gql`
	mutation UploadLogoToDefaultParty($data: UploadLogoToDefaultPartyInput!) {
		uploadLogoToDefaultParty(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

const UPLOAD_LOGO_TO_WORKSPACE_PARTY = gql`
	mutation UploadLogoToWorkspaceParty($data: UploadLogoToWorkspacePartyInput!) {
		uploadLogoToWorkspaceParty(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

const DELETE_PARTY_LOGO = gql`
	mutation DeleteLogoFromWorkspaceParty($data: DeleteLogoFromWorkspacePartyInput!) {
		deleteLogoFromWorkspaceParty(data: $data) {
			id
		}
	}
`;

export function useCreateDefaultPartyMutation() {
	return useMutation<CreateDefaultPartyData>(CREATE_DEFAULT_PARTY, { onError: () => {} });
}

export function useUpdateDefaultPartyMutation() {
	return useMutation<UpdateDefaultPartyData>(UPDATE_DEFAULT_PARTY, { onError: () => {} });
}

export function useDeleteDefaultPartyMutation() {
	return useMutation<DeleteDefaultPartyData>(DELETE_DEFAULT_PARTY, { onError: () => {} });
}

export function useAddPartyToWorkspaceMutation() {
	return useMutation<AddPartyToWorkspaceData>(ADD_PARTY_TO_WORKSPACE, { onError: () => {} });
}

export function useUpdateWorkspacePartyMutation() {
	return useMutation<UpdateWorkspacePartyData>(UPDATE_WORKSPACE_PARTY, { onError: () => {} });
}

export function useDeleteWorkspacePartyMutation() {
	return useMutation<DeleteWorkspacePartyData>(DELETE_WORKSPACE_PARTY, { onError: () => {} });
}

export function useUploadLogoToDefaultPartyMutation() {
	return useMutation<UploadLogoToDefaultPartyData>(UPLOAD_LOGO_TO_DEFAULT_PARTY, {
		onError: () => {}
	});
}

export function useUploadLogoToWorkspacePartyMutation() {
	return useMutation<UploadLogoToWorkspacePartyData>(UPLOAD_LOGO_TO_WORKSPACE_PARTY, {
		onError: () => {}
	});
}

export function useDeleteWorkspacePartyLogoMutation() {
	return useMutation<DeleteLogoFromWorkspacePartyInput>(DELETE_PARTY_LOGO, { onError: () => {} });
}
