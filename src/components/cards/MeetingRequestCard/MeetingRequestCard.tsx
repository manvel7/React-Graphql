import React from 'react';

import {
	MeetingRequestCardContainer,
	CardAvatarBlock,
	CardMainBlock,
	CardTitleBlock,
	CardTitle,
	CardSubTitle,
	CardSubTitleBlock,
	CardInfoBlock,
	CardInfoText,
	CardLinkText,
	CardOverlayText,
	Badge,
	CardAttachedFilesBlock,
	CardAttachedFiles,
	CardAttachedFilesText,
	CardActionsBlock,
	GhostButton
} from './MeetingRequestCard.style';
import { Avatar, AvatarSize, BadgeTypes, Dot, Icon, ButtonSize, Dropdown } from '../../ui';
import { Images, Colors } from '../../../environment';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

export function MeetingRequestCard() {
	const translate = useTranslation();
	return (
		<MeetingRequestCardContainer>
			<CardAvatarBlock>
				<Avatar
					image={Images.avatar}
					badge={'https://ui-avatars.com/api/?background=0D8ABC&color=fff'}
					size={AvatarSize.MD}
					active={true}
				/>
			</CardAvatarBlock>

			<CardMainBlock>
				<CardTitleBlock>
					<CardTitle>Gabriel Newman</CardTitle>
					<CardSubTitleBlock>
						<CardSubTitle>Hoyr, Fylkesutval</CardSubTitle>
						<Badge title="secretary" />
					</CardSubTitleBlock>
				</CardTitleBlock>
				<CardInfoBlock>
					<CardInfoText>Proposed</CardInfoText>
					<Badge title="AMEDMENT" type={BadgeTypes.Purple} />
					<CardInfoText>for</CardInfoText>
					<Badge title="CASE 1" type={BadgeTypes.Primary} />
					<CardLinkText>section #3</CardLinkText>
					<Dot size={16} />
					<CardOverlayText>requested 1 min ago</CardOverlayText>
				</CardInfoBlock>
				<CardAttachedFilesBlock>
					<CardAttachedFiles>
						<Icon name={IconType.EpDoc} color={Colors.blue[100]} />
						<CardAttachedFilesText>document_name</CardAttachedFilesText>
					</CardAttachedFiles>
				</CardAttachedFilesBlock>
			</CardMainBlock>
			<CardActionsBlock>
				<GhostButton
					rounded
					title={translate(({ buttons }) => buttons.approve)}
					tooltip={translate(({ tooltips }) => tooltips.addToAgenda)}
					leftIcon={IconType.EpCheck}
					size={ButtonSize.SM}
					onClick={() => {}}
				/>

				<Dropdown>
					<Dropdown.Item onClick={() => {}}>Action 1</Dropdown.Item>
					<Dropdown.Item onClick={() => {}}>Action 1</Dropdown.Item>
					<Dropdown.Item onClick={() => {}}>Action 1</Dropdown.Item>
				</Dropdown>
			</CardActionsBlock>
		</MeetingRequestCardContainer>
	);
}
