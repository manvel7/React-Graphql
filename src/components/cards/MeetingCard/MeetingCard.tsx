import React from 'react';
import moment from 'moment';

import { Meeting } from '@epolitiker/api';

import {
	CardLeftBlock,
	CardRightBlock,
	CardFooter,
	DividerBlock,
	Divider,
	CardTitle,
	CardBlocksContainer,
	MeetingCardWrapper,
	CardIconBlock,
	CardIconBlockDivider,
	CardIconBlockTitle,
	CardIconBlockSubTitle,
	CardDetailsBlock,
	CardDetailsTime,
	CardDetailsPlace,
	CardAttachedFiles,
	CardAttachedFilesText,
	CardAttachedFilesDarkText,
	CardInfoBlock,
	InfoContent,
	InfoContentItem,
	InfoContentItemText,
	CardOptionsBlock,
	OptionsIcon,
	CardAttachedFilesBlock
} from './MeetingCard.style';
import { Badge, Icon, Dropdown, Dot } from '../../ui';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { useNavigation, useTranslation, useIsAdmin } from '../../../hooks';

interface MeetingCardProps {
	meeting: Meeting;
	onClick: (meeting: Meeting) => void;
	className?: string;
	withBottomDivider?: boolean;
	showCardOptions?: boolean;
}

export function MeetingCard({
	meeting,
	onClick,
	className,
	withBottomDivider = true,
	showCardOptions = true
}: MeetingCardProps) {
	const { routes, replace, navigate } = useNavigation();
	const translate = useTranslation();
	const isAdmin = useIsAdmin();

	const optionsData = [
		{
			title: translate(({ buttons }) => buttons.open),
			icon: IconType.EpOpen,
			onClick: () => navigate(routes.meetingInfo(meeting.id))
		},
		{
			title: translate(({ buttons }) => buttons.quickInfo),
			icon: IconType.EpEye,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.edit),
			icon: IconType.EpEdit,
			onClick: () =>
				replace(
					`${routes.root}${routes.updateMeetingDetils(
						meeting?.committee?.id,
						meeting?.id
					)}`
				)
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
			title: translate(({ buttons }) => buttons.temporaryHide),
			icon: IconType.EpEyeSlash,
			onClick: () => {}
		},
		{
			title: translate(({ buttons }) => buttons.delete),
			icon: IconType.EpTrash,
			onClick: () => {}
		}
	];

	const optionsDataForRegularUser = [
		{
			title: translate(({ buttons }) => buttons.open),
			icon: IconType.EpOpen,
			onClick: () => navigate(routes.meetingInfo(meeting?.id))
		},
		{
			title: translate(({ buttons }) => buttons.quickInfo),
			icon: IconType.EpEye,
			onClick: () => {}
		}
	];

	function getDateTime(startDate: string, endDate: string) {
		if (startDate && endDate) {
			const startD = moment(new Date(startDate)).format('HH:mm');
			const endD = moment(new Date(endDate)).format('HH:mm');
			return `${startD}-${endD}`;
		}
		return '00:00';
	}

	function getDateDay(startDate: string) {
		if (startDate) {
			return moment(new Date(startDate)).format('D');
		}

		return moment(new Date()).format('D');
	}

	function getDateMonth(startDate: string) {
		if (startDate) {
			return moment(new Date(startDate)).format('MMM');
		}

		return moment(new Date()).format('MMM');
	}

	return (
		<MeetingCardWrapper onClick={() => onClick(meeting)}>
			<CardBlocksContainer className={className}>
				<CardLeftBlock>
					<CardIconBlock>
						<CardIconBlockDivider />
						<CardIconBlockTitle>
							{getDateDay(meeting?.dates[0]?.startDate)}
						</CardIconBlockTitle>
						<CardIconBlockSubTitle>
							{getDateMonth(meeting?.dates[0]?.startDate)}
						</CardIconBlockSubTitle>
					</CardIconBlock>
					<Badge title={meeting?.status} />
				</CardLeftBlock>
				<CardRightBlock>
					<CardTitle>{meeting?.label}</CardTitle>
					<CardDetailsBlock>
						<Icon name={IconType.EpClock} />
						<CardDetailsTime>
							{getDateTime(meeting?.dates[0]?.startDate, meeting?.dates[0]?.endDate)}
						</CardDetailsTime>
						<Dot />
						<CardDetailsPlace>{meeting?.location}</CardDetailsPlace>
					</CardDetailsBlock>

					<CardAttachedFilesBlock>
						<CardAttachedFiles>
							<Icon name={IconType.EpText} color={Colors.blue[100]} />
							<CardAttachedFilesText>
								{`${meeting?.agendaItems.length} ${translate(
									({ titles }) => titles.topics
								)}`}
							</CardAttachedFilesText>
						</CardAttachedFiles>
						<CardAttachedFiles>
							<Icon name={IconType.EpDoc} color={Colors.blue[100]} />
							<CardAttachedFilesText>
								{meeting?.folder?.documents.length}
							</CardAttachedFilesText>
							<Icon name={IconType.EpPollFilled} color={Colors.blue[100]} />
							<CardAttachedFilesText>
								{/*{meeting.folder?.documents.length}*/}0
							</CardAttachedFilesText>
						</CardAttachedFiles>
						<CardAttachedFiles>
							<Icon name={IconType.EpAttachment} color={Colors.blue[100]} />
							<CardAttachedFilesDarkText>
								Protocol_County_Council_Oct
							</CardAttachedFilesDarkText>
						</CardAttachedFiles>
					</CardAttachedFilesBlock>

					<CardInfoBlock>
						<InfoContent>
							<InfoContentItem>
								<Icon name={IconType.EpFolderDefault} color={Colors.overlay[40]} />
								<InfoContentItemText>
									{meeting?.committee?.label}
								</InfoContentItemText>
							</InfoContentItem>
							<Dot />
							<InfoContentItem>
								<Icon name={IconType.EpMembers} />
								<InfoContentItemText>
									{meeting?.members ? meeting.members.length : '0'}
								</InfoContentItemText>
							</InfoContentItem>
							{/* <InfoContentItem>
								<Icon name={IconType.EpCheck} color={Colors.overlay[40]} />
								<InfoContentItemText>10</InfoContentItemText>
							</InfoContentItem>
							<InfoContentItem>
								<Icon name={IconType.EpMinus} />
								<InfoContentItemText>15</InfoContentItemText>
							</InfoContentItem>
							<InfoContentItem>
								<Icon name={IconType.EpClock} />
								<InfoContentItemText>2</InfoContentItemText>
							</InfoContentItem> */}
							<Dot />
							<InfoContentItem>
								<InfoContentItemText>{meeting?.status}</InfoContentItemText>
							</InfoContentItem>
						</InfoContent>
					</CardInfoBlock>
				</CardRightBlock>
			</CardBlocksContainer>

			{isAdmin ? (
				showCardOptions && (
					<CardOptionsBlock>
						<Dropdown>
							{optionsData.map((option, index) => (
								<Dropdown.Item
									key={`options-item-${index}`}
									onClick={option.onClick}
								>
									<OptionsIcon name={option.icon} />
									{option.title}
								</Dropdown.Item>
							))}
						</Dropdown>
					</CardOptionsBlock>
				)
			) : (
				<CardOptionsBlock>
					<Dropdown>
						{optionsDataForRegularUser.map((option, index) => (
							<Dropdown.Item key={`options-item-${index}`} onClick={option.onClick}>
								<OptionsIcon name={option.icon} />
								{option.title}
							</Dropdown.Item>
						))}
					</Dropdown>
				</CardOptionsBlock>
			)}

			{withBottomDivider && (
				<CardFooter>
					<DividerBlock>
						<Divider />
					</DividerBlock>
				</CardFooter>
			)}
		</MeetingCardWrapper>
	);
}
