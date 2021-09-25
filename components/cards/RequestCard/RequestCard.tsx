import React from 'react';

import {
	RequestCardContainer,
	IconBlock,
	CardAvatarBlock,
	DateTime,
	CardSubTitleText,
	CardSubTitleSpan,
	Badge,
	CardActionsBlock,
	CardAttachedFiles,
	CardAttachedFilesText,
	CardAttachedFilesBlock,
	CardMainBlock,
	CardSubTitle,
	CardSubTitleBlock,
	CardTitle,
	CardTitleBlock,
	GhostButton
} from './RequestCard.style';
import { Avatar, AvatarSize, BadgeTypes, ButtonSize, Dropdown, Icon } from '../../ui';
import { Colors, Images } from '../../../environment';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

export const RequestCard = () => {
	const translate = useTranslation();
	return (
		<RequestCardContainer>
			<CardAvatarBlock>
				<Avatar image={Images.avatar} size={AvatarSize.MD} active={true} />
				<IconBlock>
					<Icon name={IconType.EpCircleHello} />
				</IconBlock>
			</CardAvatarBlock>

			<CardMainBlock>
				<CardTitleBlock>
					<CardSubTitleBlock>
						<CardTitle>Gabriel Newman </CardTitle>
						<DateTime>10 Nov, 10:31</DateTime>
					</CardSubTitleBlock>
					<CardSubTitleBlock>
						<CardSubTitle>Wants to reply on matter</CardSubTitle>
						<Badge title="E-1/20" type={BadgeTypes.Primary} />
						<CardSubTitleText>
							Høyring - Regional planstrategi Møre og Romsdal 2020 - 2024
							<CardSubTitleSpan>from </CardSubTitleSpan>
							Chad Ray
						</CardSubTitleText>
					</CardSubTitleBlock>
				</CardTitleBlock>

				<CardAttachedFilesBlock>
					<CardAttachedFiles>
						<Icon name={IconType.EpDoc} color={Colors.blue[100]} />
						<CardAttachedFilesText>document_name</CardAttachedFilesText>
					</CardAttachedFiles>
					<CardAttachedFiles>
						<Icon name={IconType.EpCalendar} color={Colors.blue[100]} />
						<CardAttachedFilesText>meeting_name</CardAttachedFilesText>
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
		</RequestCardContainer>
	);
};
