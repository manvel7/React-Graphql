import React from 'react';
import moment from 'moment';

import { Document } from '@epolitiker/api';

import {
	MeetingRelatedItemsCardContainer,
	CardIconBlock,
	CardMainBlock,
	CardTitleBlock,
	CardTitle,
	CardInfoTextBlock,
	CardInfoText,
	CardAttachedFilesBlock,
	CardAttachedFiles,
	CardAttachedFilesDarkText,
	CardAttachedFilesText,
	CardActionsBlock,
	ActionsIcon,
	CardIconBackground,
	CardIconWrapper,
	CardIcon
} from './MeetingRelatedItemsCard.style';
import { Icon, Badge, BadgeTypes, Dropdown, Dot } from '../../ui';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { useTranslation } from '../../../hooks';

interface MeetingRelatedItemsCardProps {
	document: Document;
	showAttachedFiles?: boolean;
	onClick: (document: Document) => void;
}

export function MeetingRelatedItemsCard({
	document,
	showAttachedFiles = true,
	onClick
}: MeetingRelatedItemsCardProps) {
	const translate = useTranslation();
	const cardActions = [
		{
			title: translate(({ buttons }) => buttons.openDocument),
			icon: IconType.EpOpen,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.quickInfo),
			icon: IconType.EpEye,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.viewAccessSettings),
			icon: IconType.EpGlobe,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.rename),
			icon: IconType.EpEdit,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.removeFromAttachments),
			icon: IconType.EpTrash,
			onClick: () => {}
		}
	];

	function getUploadedFormat() {
		const updatedBy = `${document.lastUpdatedBy?.firstName} ${document.lastUpdatedBy?.lastName}`;
		const updatedDate = moment(new Date(document.updatedAt)).format('DD MMM, kk:mm');
		return `${translate(({ titles }) => titles.updatedBy)} ${updatedBy} ${updatedDate}`;
	}

	function getAttachedFormat() {
		const attachedBy = `${document.uploadedBy?.firstName} ${document.uploadedBy?.lastName}`;
		const attachedData = moment(new Date(document.createdAt)).format('D MMM, kk:mm');
		return `${translate(({ titles }) => titles.attachedBy)} ${attachedBy} ${attachedData}`;
	}

	return (
		<MeetingRelatedItemsCardContainer onClick={() => onClick(document)}>
			<CardIconBlock>
				<CardIconWrapper>
					<CardIcon name={IconType.EpDoc} color={Colors.blue[100]} />
					<CardIconBackground />
				</CardIconWrapper>
			</CardIconBlock>
			<CardMainBlock>
				<CardTitleBlock>
					<CardTitle>{document.name}</CardTitle>
					<Badge type={BadgeTypes.Primary} title="CASE" />
				</CardTitleBlock>
				<CardInfoTextBlock>
					<CardInfoText>
						{getUploadedFormat()}
						<Dot />
						{`${(document.size / 1024).toFixed(0)}mb`}
					</CardInfoText>
					<CardInfoText>{getAttachedFormat()}</CardInfoText>
				</CardInfoTextBlock>

				{showAttachedFiles && (
					<CardAttachedFilesBlock>
						<CardAttachedFiles>
							<Icon name={IconType.EpDoc} color={Colors.blue[100]} />
							<Icon name={IconType.EpPollFilled} color={Colors.blue[100]} />
							<CardAttachedFilesText>
								2 documents, 1 poll (related items)
							</CardAttachedFilesText>
						</CardAttachedFiles>
						<CardAttachedFiles>
							<Icon name={IconType.EpAttachment} color={Colors.blue[100]} />
							<Icon name={IconType.EpAttachment} color={Colors.blue[100]} />
							<CardAttachedFilesDarkText>
								Another_meeting_name...
							</CardAttachedFilesDarkText>
						</CardAttachedFiles>
					</CardAttachedFilesBlock>
				)}
			</CardMainBlock>
			<CardActionsBlock>
				<Dropdown>
					{cardActions.map((item, i) => (
						<Dropdown.Item key={`card-action-item-${i}`} onClick={item.onClick}>
							<ActionsIcon name={item.icon} />
							{item.title}
						</Dropdown.Item>
					))}
				</Dropdown>
			</CardActionsBlock>
		</MeetingRelatedItemsCardContainer>
	);
}
