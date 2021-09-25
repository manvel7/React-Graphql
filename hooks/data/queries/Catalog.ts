import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CatalogData, GetFolderIconUploadInfoData } from '@epolitiker/api';

const DEFAULT_CATALOG = gql`
	query DefaultCatalog {
		defaultCatalog {
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

const GET_FOLDER_ICON_UPLOAD_INFO = gql`
	query GetFolderIconUploadInfo($data: FolderIconUploadInfoInput) {
		getFolderIconUploadInfo(data: $data) {
			url
			uniqueFileName
		}
	}
`;

export function useDefaultCatalogQuery() {
	return useQuery<CatalogData>(DEFAULT_CATALOG);
}

export function useGetFolderIconUploadInfoLazyQuery() {
	return useLazyQuery<GetFolderIconUploadInfoData>(GET_FOLDER_ICON_UPLOAD_INFO);
}
