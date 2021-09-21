import React from 'react';
import { UserAccount } from '@epolitiker/api';
import { Avatar, AvatarSize, Badge, AvatarBadgeSize, BadgeTypes, AutoComplete } from '../../ui';

import {
	MemberAccessCardContainer,
	CardTitleBlock,
	CardTitle,
	CardInfoBlock,
	CardInfoText,
	CardSelectBlock
} from './MemberAccessCard.style';
import { permissionsList } from '../../../consts';

interface MemberAccessCardProps {
	member: UserAccount;
	memberPermission?: string;
	permissionId?: string;
	getPermission: (userId: string, permissionId?: string) => void;
	disabled?: boolean;
}

export function MemberAccessCard({
	member,
	memberPermission,
	permissionId,
	getPermission,
	disabled = false
}: MemberAccessCardProps) {
	return (
		<MemberAccessCardContainer disabled={disabled}>
			<Avatar
				image={member?.avatar?.url}
				badge={member?.partyMembership?.party?.logo?.url}
				badgeSize={AvatarBadgeSize.SM}
				size={AvatarSize.MD}
				active={true}
			/>
			<CardTitleBlock>
				<CardTitle>{`${member.firstName} ${member.lastName}`}</CardTitle>
				{member.partyMembership && (
					<CardInfoBlock>
						<CardInfoText>{member.partyMembership.party?.name}</CardInfoText>
						<Badge type={BadgeTypes.Default} title={member.partyMembership.role} />
					</CardInfoBlock>
				)}
			</CardTitleBlock>

			<CardSelectBlock>
				<AutoComplete
					value={permissionsList.find(p => p.value === memberPermission)?.label || ''}
				>
					<AutoComplete.Item
						onClick={() => getPermission(member.id, permissionId)}
						disabled={true}
					>
						{permissionsList[0].label}
					</AutoComplete.Item>
					<AutoComplete.Item
						onClick={() => getPermission(member.id, permissionId)}
						disabled={!!permissionId}
					>
						{permissionsList[1].label}
					</AutoComplete.Item>
					<AutoComplete.Item
						onClick={() => getPermission(member.id, permissionId)}
						disabled={!permissionId}
					>
						{permissionsList[2].label}
					</AutoComplete.Item>
				</AutoComplete>
			</CardSelectBlock>
		</MemberAccessCardContainer>
	);
}
