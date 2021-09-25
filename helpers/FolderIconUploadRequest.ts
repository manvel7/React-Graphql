import Axios from 'axios';

export function folderIconUploadRequest(url: string, data: Blob, contentType: string) {
	return Axios({
		method: 'put',
		headers: {
			'x-ms-blob-type': 'BlockBlob',
			'Content-Type': contentType
		},
		url,
		data
	});
}
