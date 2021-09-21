import React, { Fragment, useState } from 'react';
import moment from 'moment';

import { CommitteeMembership } from '@epolitiker/api/dist/generated';

import {
	CommitteeCardContent,
	CommitteeCardIconBlock,
	CommitteeCardInfoBlock,
	CommitteeCardTitle,
	CommitteeCardDivider,
	CardDefaultText,
	CardTypoText,
	CardLinkText
} from './DrawerCommitteeCard.style';
import { Icon } from '../../../ui';
import { IconType } from '../../../../consts';
import {
	IGroupedMemberships,
	useCommitteeMembershipPositionList,
	useTranslation
} from '../../../../hooks';

interface DrawerCommitteeCardProps {
	membershipGroup: IGroupedMemberships;
}

export function DrawerCommitteeCard({ membershipGroup }: DrawerCommitteeCardProps) {
	const translate = useTranslation();
	const [showMore, setShowMore] = useState(false);

	const positionsList = useCommitteeMembershipPositionList();

	function handleShowMore() {
		setShowMore(true);
	}

	function createMembershipView(membership: CommitteeMembership) {
		const position = positionsList.find(pos => pos.value === membership.position)?.title;
		const sinceD = moment(new Date(membership.sinceDate)).format('DD/MM/YYYY');
		const toD = moment(new Date(membership.toDate)).format('DD/MM/YYYY');
		return `${position} since ${sinceD} to ${toD}`;
	}

	return (
		<CommitteeCardContent>
			<CommitteeCardIconBlock>
				<Icon name={IconType.EpAvatarIcon} />
			</CommitteeCardIconBlock>
			<CommitteeCardInfoBlock>
				<CommitteeCardTitle>{membershipGroup.committee.label}</CommitteeCardTitle>
				{membershipGroup.memberships
					.slice(0, showMore ? membershipGroup.memberships.length : 2)
					.map((membership, i) => (
						<Fragment key={membership.id}>
							{i ? <CommitteeCardDivider /> : null}
							{i ? (
								<CardTypoText>{createMembershipView(membership)}</CardTypoText>
							) : (
								<CardDefaultText>
									{createMembershipView(membership)}
								</CardDefaultText>
							)}
						</Fragment>
					))}
				{membershipGroup.memberships.length > 2 && !showMore && (
					<CardLinkText onClick={handleShowMore}>
						{`${translate(({ buttons }) => buttons.showMore)} (${membershipGroup
							.memberships.length - 2})`}
					</CardLinkText>
				)}
			</CommitteeCardInfoBlock>
		</CommitteeCardContent>
	);
}
