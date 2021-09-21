import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { FileFragment } from '../fragments/FileFragment';

const UPLOAD_FILE_IN_USER_PRIVATE_DIRECTORY = gql`
	mutation UploadFileInUserPrivateDirectory($file: Upload!) {
		uploadFileInUserPrivateDirectory(file: $file) {
			...FileFragment
		}
	}
	${FileFragment}
`;

export function useUploadFileInUserPrivateDirectoryMutation() {
	return useMutation<any>(UPLOAD_FILE_IN_USER_PRIVATE_DIRECTORY, {
		onError: () => {}
	});
}
