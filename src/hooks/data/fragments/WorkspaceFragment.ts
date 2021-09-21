import gql from 'graphql-tag';

import { UserAccountFragment } from './UserAccountFragment';
import { FileFragment } from './FileFragment';
import { CommitteeFragment } from './CommitteeFragment';
import { PoliticalPartyFragment } from './PoliticalPartyFragment';
import { AzureFolderFragment } from './AzureFolderFragment';

export const WorkspaceFragment = gql`
	fragment WorkspaceFragment on Workspace {
		id
		createdAt
		updatedAt
		name
		storageContainer
		committees {
			...CommitteeFragment
		}
		owners {
			...UserAccountFragment
		}
		organization {
			id
			createdAt
			updatedAt
			name
			code
			address
			number
		}
		members {
			...UserAccountFragment
		}
		admins {
			...UserAccountFragment
		}
		logo {
			...FileFragment
		}
		parties {
			...PoliticalPartyFragment
		}
		folder {
			...AzureFolderFragment
		}
	}
	${CommitteeFragment}
	${UserAccountFragment}
	${FileFragment}
	${PoliticalPartyFragment}
	${AzureFolderFragment}
`;
