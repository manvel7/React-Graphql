import { Committee } from '@epolitiker/api';
import { CommitteeMembership } from '@epolitiker/api/dist/generated';

export interface IGroupedMemberships {
	committee: Committee;
	memberships: CommitteeMembership[];
}

export function useGroupedCommitteeMemberships(memberships: CommitteeMembership[]) {
	const groupedMemberships: IGroupedMemberships[] = [];

	memberships.forEach((committeeMembership: any) => {
		const isExistIndex = groupedMemberships.findIndex(
			membership => membership.committee.id === committeeMembership.committee.id
		);
		if (isExistIndex > -1) {
			groupedMemberships[isExistIndex].memberships.push(committeeMembership);
		} else {
			groupedMemberships.push({
				committee: committeeMembership.committee,
				memberships: [committeeMembership]
			});
		}
	});

	return groupedMemberships;
}
