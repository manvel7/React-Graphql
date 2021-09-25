import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_FILE_FROM_PRIVATE_DIRECTORY = gql`
	query GetFileFromPrivateDirectory($fileId: String!) {
		getFileFromPrivateDirectory(fileId: $fileId) {
			filePath
		}
	}
`;

export function useGetFileFromPrivateDirectoryLazyQuery() {
	return useLazyQuery<any>(GET_FILE_FROM_PRIVATE_DIRECTORY);
}
