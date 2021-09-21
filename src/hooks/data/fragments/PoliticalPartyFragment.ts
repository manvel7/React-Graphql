import gql from 'graphql-tag';

import { FileFragment } from './FileFragment';

export const PoliticalPartyFragment = gql`
	fragment PoliticalPartyFragment on PoliticalParty {
		id
		createdAt
		updatedAt
		name
		country
		position
		isDefault
		logo {
			...FileFragment
		}
	}
	${FileFragment}
`;
