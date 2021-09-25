import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
	CreateCatalogData,
	CreateFolderData,
	UpdateFolderData,
	DeleteFoldersData,
	MoveFolderData
} from '@epolitiker/api';

const CREATE_DEFAULT_CATALOG_MUTATION = gql`
	mutation CreateDefaultCatalog {
		createDefaultCatalog {
			id
		}
	}
`;

const CREATE_FOLDER_MUTATION = gql`
	mutation CreateFolder($data: CreateFolderInput!) {
		createFolder(data: $data) {
			id
			items {
				id
				name
				kind
				index
				icon {
					name
					url
				}
			}
		}
	}
`;

const UPDATE_FOLDER_MUTATION = gql`
	mutation UpdateFolder($data: UpdateFolderInput!) {
		updateFolder(data: $data) {
			id
			items {
				id
				name
				kind
				index
				icon {
					name
					url
				}
			}
		}
	}
`;

const DELETE_FOLDERS_MUTATION = gql`
	mutation DeleteFolders($data: DeleteFoldersInput!) {
		deleteFolders(data: $data) {
			id
			items {
				id
				name
				kind
				index
				icon {
					name
					url
				}
			}
		}
	}
`;

const MOVE_FOLDER_MUTATION = gql`
	mutation MoveFolder($data: MoveFolderInput!) {
		moveFolder(data: $data) {
			id
			items {
				id
				name
				kind
				index
				icon {
					name
					url
				}
			}
		}
	}
`;

export function useCreateDefaultCatalogMutation() {
	return useMutation<CreateCatalogData>(CREATE_DEFAULT_CATALOG_MUTATION, { onError: () => {} });
}

export function useCreateFolderMutation() {
	return useMutation<CreateFolderData>(CREATE_FOLDER_MUTATION, { onError: () => {} });
}

export function useUpdateFolderMutation() {
	return useMutation<UpdateFolderData>(UPDATE_FOLDER_MUTATION, { onError: () => {} });
}

export function useDeleteFoldersMutation() {
	return useMutation<DeleteFoldersData>(DELETE_FOLDERS_MUTATION, { onError: () => {} });
}

export function useMoveFolderMutation() {
	return useMutation<MoveFolderData>(MOVE_FOLDER_MUTATION, { onError: () => {} });
}
