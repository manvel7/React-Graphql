import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GetFolderContentsByIdData, GetFolderByIdData } from '@epolitiker/api';

import { DocumentFragment, AzureFolderFragment } from '../fragments';

export const GET_FOLDER_CONTENTS_BY_ID = gql`
	query GetFolderContentsById($data: GetFolderContentsByIdInput!) {
		getFolderContentsById(data: $data) {
			documents {
				...DocumentFragment
			}
			folders {
				...AzureFolderFragment
			}
			documentsCount
		}
	}
	${DocumentFragment}
	${AzureFolderFragment}
`;

export const GET_FOLDER_BY_ID = gql`
	query GetFolderById($data: AzureFolderWhereUniqueInput!) {
		getFolderById(data: $data) {
			...AzureFolderFragment
		}
	}
	${AzureFolderFragment}
`;

export function useGetFolderContentsByIdLazyQuery() {
	return useLazyQuery<GetFolderContentsByIdData>(GET_FOLDER_CONTENTS_BY_ID, {
		fetchPolicy: 'no-cache'
	});
}

export function useGetFolderByIdLazyQuery() {
	return useLazyQuery<GetFolderByIdData>(GET_FOLDER_BY_ID, {
		fetchPolicy: 'no-cache'
	});
}
