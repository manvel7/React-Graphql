import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { DeleteDocumentData, UpdateDocumentData } from '@epolitiker/api';
import { DocumentFragment } from '../fragments';

const UPDATE_DOCUMENT = gql`
	mutation UpdateDocument($data: UpdateDocumentInput!) {
		updateDocument(data: $data) {
			...DocumentFragment
		}
	}
	${DocumentFragment}
`;

const DELETE_DOCUMENT = gql`
	mutation DeleteDocument($data: DeleteDocumentInput!) {
		deleteDocument(data: $data) {
			id
		}
	}
`;

export function useUpdateDocumentMutation() {
	return useMutation<UpdateDocumentData>(UPDATE_DOCUMENT, {
		onError: () => {}
	});
}

export function useDeleteDocumentMutation() {
	return useMutation<DeleteDocumentData>(DELETE_DOCUMENT, {
		onError: () => {}
	});
}
