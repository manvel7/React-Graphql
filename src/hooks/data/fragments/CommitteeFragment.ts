import gql from 'graphql-tag';

import { MeetingFragment } from './MeetingFragment';
import { CommitteeMemberFragment } from './CommitteeMemberFragment';
import { AzureFolderFragment } from './AzureFolderFragment';
import { UserAccountFragment } from './UserAccountFragment';

export const CommitteeFragment = gql`
	fragment CommitteeFragment on Committee {
		id
		createdAt
		updatedAt
		label
		description
		visibility
		timezone
		defaultLanguage
		members {
			...CommitteeMemberFragment
		}
		meetings {
			...MeetingFragment
		}
		folder {
			...AzureFolderFragment
		}
		lastUpdatedBy {
			...UserAccountFragment
		}
	}
	${CommitteeMemberFragment}
	${MeetingFragment}
	${AzureFolderFragment}
	${UserAccountFragment}
`;
