import gql from 'graphql-tag';

export const FileFragment = gql`
	fragment FileFragment on File {
		id
		createdAt
		updatedAt
		container
		name
		url
	}
`;
