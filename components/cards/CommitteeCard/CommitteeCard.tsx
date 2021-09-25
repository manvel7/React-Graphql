import React, { useMemo } from 'react';
import moment from 'moment';

import { Committee } from '@epolitiker/api';

import {
	CommitteeCardContainer,
	CommitteeCardIcon,
	CommitteeCardBody,
	CommitteeCardLabel,
	CommitteeCardMembersAvatatarsList,
	CommitteeCardMembersAvatatar,
	CommitteeCardIconContainer,
	CommitteeCardIconName,
	CommitteeCardActionsContainer,
	CommitteeCardMembersMoreCount,
	CommitteeCardUpdatedText,
	CommitteeCardMembersAvatarsBlock
} from './CommitteeCard.style';
import { Avatar, AvatarSize, Dropdown, Dot } from '../../ui';
import { useNavigation, useTranslation } from '../../../hooks';

interface CommitteeCardProps {
	committee: Committee;
	handleDeleteCommittee: (id: string) => void;
}

export function CommitteeCard({ committee, handleDeleteCommittee }: CommitteeCardProps) {
	const { routes, navigate } = useNavigation();
	const translate = useTranslation();

	function handleNavigateCommitteeDetailPage() {
		navigate(routes.committeeOverview(committee.id));
	}

	const getCommitteeUpdatedInfo = useMemo(() => {
		const lastUpdatedBy = translate(({ titles }) => titles.lastUpdatedBy);
		const lastUpdated = translate(({ titles }) => titles.lastUpdated);

		const updatedBy = `${committee?.lastUpdatedBy?.firstName} ${committee?.lastUpdatedBy?.firstName}`;
		const date = moment(new Date(committee?.updatedAt)).format('D MMM');
		const time = moment(new Date(committee?.updatedAt)).format('HH:mm');

		return committee?.lastUpdatedBy
			? `${lastUpdatedBy} ${updatedBy} ${date} at ${time}`
			: `${lastUpdated} ${date} at ${time}`;
	}, []);

	return (
		<CommitteeCardContainer onClick={handleNavigateCommitteeDetailPage}>
			<CommitteeCardIconContainer>
				<CommitteeCardIconName>{committee.label.slice(0, 2)}</CommitteeCardIconName>
				<CommitteeCardIcon />
			</CommitteeCardIconContainer>
			<CommitteeCardBody>
				<CommitteeCardLabel>{committee.label}</CommitteeCardLabel>
				<CommitteeCardMembersAvatatarsList>
					<CommitteeCardUpdatedText>{getCommitteeUpdatedInfo}</CommitteeCardUpdatedText>
					<Dot size={16} />
					<CommitteeCardMembersAvatarsBlock>
						{committee?.members?.length > 0 &&
							committee.members.slice(0, 7).map(member => (
								<CommitteeCardMembersAvatatar key={member.id}>
									<Avatar image={member.user.avatar?.url} size={AvatarSize.XXS} />
								</CommitteeCardMembersAvatatar>
							))}
					</CommitteeCardMembersAvatarsBlock>
					<CommitteeCardMembersMoreCount>
						{committee?.members?.length - 7 > 0
							? `  + ${committee.members.length - 7}`
							: ''}
					</CommitteeCardMembersMoreCount>
				</CommitteeCardMembersAvatatarsList>
			</CommitteeCardBody>
			<CommitteeCardActionsContainer>
				<Dropdown>
					<Dropdown.Item onClick={() => handleDeleteCommittee(committee.id)}>
						Delete
					</Dropdown.Item>
					<Dropdown.Item onClick={() => {}}>Action 2</Dropdown.Item>
					<Dropdown.Item onClick={() => {}}>Action 3</Dropdown.Item>
				</Dropdown>
			</CommitteeCardActionsContainer>
		</CommitteeCardContainer>
	);
}
