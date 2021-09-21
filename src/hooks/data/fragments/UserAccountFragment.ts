import gql from 'graphql-tag';

import { PoliticalPartyFragment } from './PoliticalPartyFragment';
import { FileFragment } from './FileFragment';
import { CommitteeMembershipFragment } from './CommitteeMembershipFragment';

export const UserAccountFragment = gql`
	fragment UserAccountFragment on UserAccount {
		id
		createdAt
		updatedAt
		firstName
		lastName
		email
		phoneNumber
		role
		personalInfo
		active
		partyMembership {
			id
			createdAt
			role
			party {
				...PoliticalPartyFragment
			}
		}
		committeeMemberships {
			...CommitteeMembershipFragment
		}
		avatar {
			...FileFragment
		}
		workspaces {
			id
			createdAt
			updatedAt
			name
			logo {
				id
				url
			}
			folder {
				id
				name
			}
		}
		owningWorkspaces {
			id
			createdAt
			updatedAt
			name
			logo {
				id
				url
			}
			folder {
				id
				name
			}
		}
		preferences {
			id
			createdAt
			updatedAt
			language
			activeParty {
				...PoliticalPartyFragment
			}
			activeWorkspace {
				id
				createdAt
				updatedAt
				name
				logo {
					id
					url
				}
				folder {
					id
					name
				}
			}
		}
	}
	${PoliticalPartyFragment}
	${CommitteeMembershipFragment}
	${FileFragment}
`;
