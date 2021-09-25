import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
	UploadOrConnectDocumentsToFolderData,
	CreateAzureFolderData,
	UpdateAzureFolderData,
	MoveAzureFolderData,
	DeleteFolderData
} from '@epolitiker/api';

import { DocumentFragment, AzureFolderFragment } from '../fragments';

const CREATE_AZURE_FOLDER = gql`
	mutation CreateAzureFolder($data: CreateAzureFolderInput) {
		createAzureFolder(data: $data) {
			...AzureFolderFragment
		}
	}
	${AzureFolderFragment}
`;

const UPDATE_AZURE_FOLDER = gql`
	mutation UpdateAzureFolder($data: UpdateAzureFolderInput) {
		updateAzureFolder(data: $data) {
			...AzureFolderFragment
		}
	}
	${AzureFolderFragment}
`;

const MOVE_AZURE_FOLDER = gql`
	mutation MoveAzureFolder($data: MoveAzureFolderInput!) {
		moveAzureFolder(data: $data) {
			...AzureFolderFragment
		}
	}
	${AzureFolderFragment}
`;

const DELETE_FOLDER = gql`
	mutation DeleteFolder($data: AzureFolderWhereUniqueInput!) {
		deleteFolder(data: $data) {
			id
		}
	}
`;

const UPLOAD_OR_CONNECT_DOCUMENTS_TO_FOLDER = gql`
	mutation UploadOrConnectDocumentsToFolder($data: UploadOrConnectDocumentsToFolderInput) {
		uploadOrConnectDocumentsToFolder(data: $data) {
			...DocumentFragment
		}
	}
	${DocumentFragment}
`;

export function useCreateAzureFolderMutation() {
	return useMutation<CreateAzureFolderData>(CREATE_AZURE_FOLDER, { onError: () => {} });
}

export function useUpdateAzureFolderMutation() {
	return useMutation<UpdateAzureFolderData>(UPDATE_AZURE_FOLDER, { onError: () => {} });
}

export function useMoveAzureFolderMutation() {
	return useMutation<MoveAzureFolderData>(MOVE_AZURE_FOLDER, { onError: () => {} });
}

export function useDeleteAzureFolderMutation() {
	return useMutation<DeleteFolderData>(DELETE_FOLDER, { onError: () => {} });
}

export function useUploadOrConnectDocumentsToFolderMutation() {
	return useMutation<UploadOrConnectDocumentsToFolderData>(
		UPLOAD_OR_CONNECT_DOCUMENTS_TO_FOLDER,
		{ onError: () => {} }
	);
}
