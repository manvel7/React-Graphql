import React, { useMemo, useState } from 'react';

import { Document } from '@epolitiker/api';

import {
	DocumentDrawerCardContainer,
	DrawerCardHeader,
	CardTitleBlock,
	CardHeaderTitle,
	CardHeaderCommitteeBlock,
	NavTabContainer,
	GhostButton,
	NavTabItem,
	CardMainContent,
	FileInfoWrapper,
	FileIconBlock,
	FileInfoTitlesBlock,
	FileInfoValuesBlock,
	SubTitle,
	ValuesText,
	MidDarkText,
	DocTypeBadge,
	AccessMembersList,
	Avatar,
	DrawerItemBlock
} from './FileModalCard.style';
import { AvatarSize, Badge, BadgeTypes, Dropdown, Icon } from '../../ui';
import { Colors } from '../../../environment';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';
import { MemberDefaultCard } from '../MemberDefaultCard';

interface FileModalCard {
	document: Document | null;
	onDelete?: (document: Document) => void;
}

export function FileModalCard({ document, onDelete }: FileModalCard) {
	if (!document) {
		return null;
	}

	const [activeTab, setActiveTab] = useState(1);
	const translate = useTranslation();

	const actionsData = useMemo(
		() => [
			{
				title: translate(({ buttons }) => buttons.rename),
				icon: IconType.EpEdit,
				onClick: () => {},
				disabled: true
			},
			{
				title: translate(({ buttons }) => buttons.createRelation),
				icon: IconType.EpRelation,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.addHighSecurityAttribute),
				icon: IconType.EpSecurity,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.manageAccess),
				icon: IconType.EpGlobe,
				onClick: () => {}
			},

			{
				title: translate(({ buttons }) => buttons.delete),
				icon: IconType.EpTrash,
				onClick: () => onDelete && onDelete(document)
			}
		],
		[document.id]
	);

	return (
		<DocumentDrawerCardContainer>
			<DrawerCardHeader>
				<CardTitleBlock>
					<CardHeaderTitle>{document.name}</CardHeaderTitle>
					<Dropdown>
						{actionsData.map((item, i) => (
							<Dropdown.Item
								key={`file-drawer-card-header-action-item-${i}`}
								onClick={item.onClick}
							>
								<Dropdown.ItemIcon name={item.icon} />
								{item.title}
							</Dropdown.Item>
						))}
					</Dropdown>
				</CardTitleBlock>

				<CardHeaderCommitteeBlock>
					<Badge type={BadgeTypes.Primary} title={document.status} />
				</CardHeaderCommitteeBlock>
			</DrawerCardHeader>

			<NavTabContainer>
				<NavTabItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
					Details
				</NavTabItem>
				<NavTabItem active={activeTab === 2} onClick={() => setActiveTab(3)}>
					Related
				</NavTabItem>
				<NavTabItem active={activeTab === 3} onClick={() => setActiveTab(4)}>
					Activity
				</NavTabItem>
			</NavTabContainer>

			<CardMainContent>
				<FileInfoWrapper>
					<FileIconBlock>
						<Icon name={IconType.EpDoc} color={Colors.blue[100]} />
					</FileIconBlock>

					<FileInfoTitlesBlock>
						<SubTitle>Document type:</SubTitle>
						<SubTitle>File type:</SubTitle>
						<SubTitle>Size:</SubTitle>
					</FileInfoTitlesBlock>

					<FileInfoValuesBlock>
						<DocTypeBadge title={'AMENDMENT'} type={BadgeTypes.Purple} />
						<ValuesText>{document.file.name.slice(-3)}</ValuesText>
						<ValuesText>{`${(document.size / 1000).toFixed(0)} mb`}</ValuesText>
					</FileInfoValuesBlock>
				</FileInfoWrapper>

				<AccessMembersList>
					{document?.accessList.length > 0 &&
						document.accessList.map(access => (
							<Avatar
								key={access.id}
								image={access.user.avatar?.url}
								size={AvatarSize.XS}
							/>
						))}
				</AccessMembersList>

				{document?.uploadedBy && (
					<DrawerItemBlock>
						<SubTitle>Submitted</SubTitle>
						<MemberDefaultCard member={document.uploadedBy} onClick={() => {}} />
					</DrawerItemBlock>
				)}

				{document?.uploadedBy && (
					<DrawerItemBlock>
						<SubTitle>
							{translate(({ titles }) => titles.membersInCollaboration)}
						</SubTitle>
						<GhostButton
							title={translate(({ buttons }) => buttons.add)}
							leftIcon={IconType.EpPlus}
							onClick={() => {}}
						/>
					</DrawerItemBlock>
				)}
				{document?.lastUpdatedBy && (
					<DrawerItemBlock>
						<SubTitle>{translate(({ titles }) => titles.lastUpdated)}</SubTitle>
						<MemberDefaultCard member={document.lastUpdatedBy} onClick={() => {}} />
					</DrawerItemBlock>
				)}

				{document?.description && (
					<DrawerItemBlock>
						<SubTitle>{translate(({ titles }) => titles.lastUpdated)}</SubTitle>
						<MidDarkText>{document.description}</MidDarkText>
					</DrawerItemBlock>
				)}
			</CardMainContent>
		</DocumentDrawerCardContainer>
	);
}
