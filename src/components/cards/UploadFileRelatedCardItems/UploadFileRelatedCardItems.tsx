import React from 'react';

import { Document } from '@epolitiker/api';

import {
	UploadfileRelatedContainer,
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
} from './UploadFileRelatedCardItems.style';

import { Icon, Dropdown } from '../../ui';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { useTranslation } from '../../../hooks';

interface UploadFileRelatedCardItemsProps {
	document: Document;
	handleSetStep?: (uploadFileStep: number) => number;
	onDelete: (document: Document) => void;
	showAttachedFiles?: boolean;
	onClick: (document: Document) => void;
}

export function UploadFileRelatedCardItems({
	document,
	onDelete,
	handleSetStep,
	showAttachedFiles = true,
	onClick
}: UploadFileRelatedCardItemsProps) {
	const translate = useTranslation();

	const cardActions = [
		{
			title: translate(({ buttons }) => buttons.rename),
			icon: IconType.EpEdit,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.createRelation),
			icon: IconType.EpRelation,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.addSecurity),
			icon: IconType.EpSecurity,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.manageAccess),
			icon: IconType.EpGlobe,
			onClick: () => (handleSetStep ? handleSetStep(4) : 1)
		},
		{
			title: translate(({ buttons }) => buttons.remove),
			icon: IconType.EpTrash,
			onClick: () => onDelete(document)
		}
	];

	function getUploadedFormat() {
		const updatedBy = `${document.lastUpdatedBy?.firstName} ${document.lastUpdatedBy?.lastName}`;
		return `${translate(({ titles }) => titles.updatedBy)} ${updatedBy}`;
	}

	return (
		<UploadfileRelatedContainer onClick={() => onClick(document)}>
			<CardIconBlock>
				<CardIconWrapper>
					<CardIcon name={IconType.EpDoc} color={Colors.blue[100]} />
					<CardIconBackground />
				</CardIconWrapper>
			</CardIconBlock>
			<CardMainBlock>
				<CardTitleBlock>
					<CardTitle>{document.name}</CardTitle>
				</CardTitleBlock>
				<CardInfoTextBlock>
					<CardInfoText>
						{getUploadedFormat()}
						{`  ${(document.size / 1024 / 1024).toFixed(2)}mb`}
					</CardInfoText>
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
		</UploadfileRelatedContainer>
	);
}
