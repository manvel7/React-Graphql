import gql from 'graphql-tag';

export const CommitteeMembershipFragment = gql`
	fragment CommitteeMembershipFragment on CommitteeMembership {
		id
		user {
			id
			email
			firstName
			lastName
		}
		committee {
			id
			label
		}
		type
		position
		sinceDate
		toDate
	}
`;
