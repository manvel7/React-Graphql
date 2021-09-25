import React from 'react';
import { UserAccount } from '@epolitiker/api';

import {
	Avatar,
	AvatarSize,
	Badge,
	AvatarBadgeSize,
	ButtonSize,
	GhostButton,
	Checkbox
} from '../../ui';
import {
	MemberDefaultCardContainer,
	CardTitleBlock,
	CardTitle,
	CardSubTitle,
	CardInfoBlock,
	CardInfoItem,
	MemberContent,
	CheckBoxContent
} from './MemberDefaultCardWithCheckbox.style';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

interface MemberDefaultCardWithCheckboxProps {
	member: UserAccount;
	onClick: (member: UserAccount) => void;
	onSelect: (value: boolean, user: UserAccount) => void;
	isSelected?: boolean;
	disabled?: boolean;
	className?: string;
	onAddClick: (user: UserAccount) => void;
}

export function MemberDefaultCardWithCheckbox({
	member,
	onSelect,
	isSelected = false,
	disabled = false,
	className,
	onAddClick
}: MemberDefaultCardWithCheckboxProps) {
	const translate = useTranslation();

	function handleAddClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		onAddClick(member);
	}

	return (
		<MemberDefaultCardContainer
			isSelected={isSelected}
			disabled={disabled}
			className={className}
		>
			<CheckBoxContent>
				<Checkbox checked={isSelected} onChange={e => onSelect(e.target.checked, member)} />
			</CheckBoxContent>
			<Avatar
				image={member?.avatar?.url}
				badge={member?.partyMembership?.party?.logo?.url}
				badgeSize={AvatarBadgeSize.SM}
				size={AvatarSize.MD}
			/>
			<CardTitleBlock>
				<CardTitle>{`${member?.firstName || ''} ${member?.lastName || ''}`}</CardTitle>
				<CardInfoBlock>
					<CardInfoItem>
						<CardSubTitle>{member?.partyMembership?.party?.name}</CardSubTitle>
					</CardInfoItem>

					{member?.committeeMemberships?.length > 0 && (
						<CardInfoItem>
							<CardSubTitle>
								{member.committeeMemberships[0].committee.label}
							</CardSubTitle>
							<Badge title={member.committeeMemberships[0].position} />
						</CardInfoItem>
					)}
				</CardInfoBlock>
			</CardTitleBlock>
			<MemberContent>
				<GhostButton
					size={ButtonSize.SM}
					leftIcon={IconType.EpPlus}
					title={translate(({ buttons }) => buttons.add)}
					onClick={handleAddClick}
				/>
			</MemberContent>
		</MemberDefaultCardContainer>
	);
}
