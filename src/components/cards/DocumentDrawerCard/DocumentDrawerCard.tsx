import React, { useMemo, useState } from 'react';

import { Document } from '@epolitiker/api';

import { IconType } from '../../../consts';
import { useDeleteDocumentMutation, useTranslation } from '../../../hooks';
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
} from './DocumentDrawerCard.style';
import { AvatarSize, Badge, BadgeTypes, Dropdown, Icon } from '../../ui';
import { Colors } from '../../../environment';
import { MemberCardWithPopover } from '../MemberCardWithPopover';
import { MeetingInfo } from '../MeetingDrawerCard/MeetingInfo';
import { MeetingRelated } from '../MeetingDrawerCard/MeetingRelated';
import { MeetingDrawerCard } from '../MeetingDrawerCard';

interface DocumentDrawerCardProps {
	document: Document | null;
}

export function DocumentDrawerCard({ document }: DocumentDrawerCardProps) {
	if (!document) {
		return null;
	}

	const [activeTab, setActiveTab] = useState(1);
	const translate = useTranslation();

	const [deleteDocument] = useDeleteDocumentMutation();

	function handleDeleteDocument() {
		deleteDocument({
			variables: {
				data: {
					documentWhereUniqueInput: { id: document?.id }
				}
			}
		});
	}

	const actionsData = useMemo(
		() => [
			{
				title: translate(({ buttons }) => buttons.open),
				icon: IconType.EpExternalLink,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.edit),
				icon: IconType.EpEdit,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.manageAccess),
				icon: IconType.EpGlobe,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.unpublish),
				icon: IconType.EpEyeSlash,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.changeStatus),
				icon: IconType.EpStatus,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.delete),
				icon: IconType.EpTrash,
				onClick: handleDeleteDocument
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
								key={`document-drawer-card-header-action-item-${i}`}
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
				<NavTabItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
					Access
				</NavTabItem>
				<NavTabItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
					Related
				</NavTabItem>
				<NavTabItem active={activeTab === 4} onClick={() => setActiveTab(4)}>
					Activity
				</NavTabItem>
			</NavTabContainer>

			<CardMainContent>
				{/*{activeTab === 1 && <MeetingInfo meeting={meeting} />}*/}
				{/*   {activeTab === 2 && <MeetingRelated meeting={meeting} />}*/}
				{/*   {activeTab === 3 && <MeetingDrawerCard meeting={meeting} />}*/}

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
						<MemberCardWithPopover member={document.uploadedBy} onClick={() => {}} />
					</DrawerItemBlock>
				)}
				{document?.uploadedBy && (
					<DrawerItemBlock>
						<SubTitle>MEMBERS IN COLLABARATION</SubTitle>
						<MemberCardWithPopover member={document.uploadedBy} onClick={() => {}} />
					</DrawerItemBlock>
				)}
				<GhostButton
					title={translate(({ buttons }) => buttons.add)}
					leftIcon={IconType.EpPlus}
					onClick={() => {}}
				/>
				{document?.lastUpdatedBy && (
					<DrawerItemBlock>
						<SubTitle>{translate(({ titles }) => titles.lastUpdated)}</SubTitle>
						<MemberCardWithPopover member={document.lastUpdatedBy} onClick={() => {}} />
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
