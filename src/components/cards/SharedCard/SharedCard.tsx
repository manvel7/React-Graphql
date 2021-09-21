import React from 'react';
import moment from 'moment';

import { Document } from '@epolitiker/api';

import {
	SharedCardContainer,
	CardIconBlock,
	CardMainBlock,
	CardTitleBlock,
	CardTitle,
	CardInfoTextBlock,
	CardInfoText,
	CardActionsBlock,
	ActionsIcon,
	CardIconBackground,
	CardIconWrapper,
	CardIcon
} from './Shared.style';
import { Dropdown, Dot, LightButton, ButtonSize } from '../../ui';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { useTranslation } from '../../../hooks';
import { ButtonLeftBar } from '../BookmarksDocument/BookmarksDocument.style';

interface SharedCardProps {
	document: Document;
	onClick: (document: Document) => void;
}

export function SharedCard({ document, onClick }: SharedCardProps) {
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
		<SharedCardContainer onClick={() => onClick(document)}>
			<CardIconBlock>
				<CardIconWrapper>
					<CardIcon name={IconType.EpDoc} color={Colors.blue[100]} />
					<CardIconBackground />
				</CardIconWrapper>
			</CardIconBlock>
			<CardMainBlock>
				<CardTitleBlock>
					<CardTitle>{document.name}</CardTitle>
					<ButtonLeftBar>
						<LightButton
							size={ButtonSize.SM}
							onClick={() => {}}
							title={translate(({ buttons }) => buttons.case)}
							rounded
						/>
					</ButtonLeftBar>
				</CardTitleBlock>
				<CardInfoTextBlock>
					<CardInfoText>
						{getUploadedFormat()}
						<Dot />
						{`${(document.size / 1024).toFixed(0)}mb`}
					</CardInfoText>
					<CardInfoText>{getAttachedFormat()}</CardInfoText>
				</CardInfoTextBlock>
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
		</SharedCardContainer>
	);
}
