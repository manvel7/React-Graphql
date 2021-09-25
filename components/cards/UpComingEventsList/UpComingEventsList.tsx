import React from 'react';
import moment from 'moment';

import { Meeting } from '@epolitiker/api';

import {
	UpComingCardContainer,
	CardDateContainer,
	CardInfoContainer,
	DateHeading,
	DateSubHeading,
	Title,
	Time,
	CommitteeName,
	CalendarMeeting,
	FooterBlock,
	FolderName,
	MeetingCount,
	CountBlock,
	TextBlock,
	SecondPartContainer,
	FooterIcon
} from './UpComingEventsList.style';
import { Dropdown, Icon, LightButton } from '../../ui';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

interface UpComingEventsListProps {
	meeting: Meeting;
	onClick: (meeting: Meeting) => void;
}

export function UpComingEventsList({ meeting, onClick }: UpComingEventsListProps) {
	const translate = useTranslation();

	function getDateDay() {
		if (meeting.dates.length > 0) {
			return moment(new Date(meeting.dates[0].startDate)).format('D');
		}

		return moment(new Date()).format('D');
	}

	function getDateDayForMeeting() {
		if (meeting.dates.length > 0) {
			return moment(new Date(meeting.dates[0].startDate)).format('DD/MM/YYYY ');
		}

		return moment(new Date()).format('DD/MM/YYYY ');
	}

	function getDateMonth(startDate: string) {
		if (startDate) {
			return moment(new Date(startDate)).format('MMM');
		}

		return moment(new Date()).format('MMM');
	}

	function getDateTime(startDate: string, endDate: string) {
		if (startDate && endDate) {
			const startD = moment(new Date(startDate)).format('HH:mm');
			const endD = moment(new Date(endDate)).format('HH:mm');
			return `${startD}-${endD}`;
		}
		return '00:00';
	}
	return (
		<UpComingCardContainer onClick={() => onClick(meeting)}>
			<CardDateContainer>
				<DateHeading>{getDateDay()}</DateHeading>
				<DateSubHeading>{getDateMonth(meeting?.dates[0]?.startDate)}</DateSubHeading>
			</CardDateContainer>
			<CardInfoContainer>
				<Title>
					{meeting.label}
					<CalendarMeeting>{getDateDayForMeeting()}</CalendarMeeting>
				</Title>
				<Time>{getDateTime(meeting?.dates[0]?.startDate, meeting?.dates[0]?.endDate)}</Time>
				<CommitteeName>{meeting?.committee?.label}</CommitteeName>
				<FooterBlock>
					<Icon name={IconType.EpFolder} />
					<FolderName>
						{meeting?.folder?.name && meeting?.folder?.name.length > 6
							? meeting?.folder?.name.slice(0, 8)
							: meeting?.folder?.name}
					</FolderName>
					<CountBlock>
						<Icon name={IconType.EpMembers} />
					</CountBlock>
					<MeetingCount>0</MeetingCount>
				</FooterBlock>
			</CardInfoContainer>
			<SecondPartContainer>
				<TextBlock>{translate(({ titles }) => titles.pleaseRespondInTheNext)}</TextBlock>
				<LightButton
					onClick={() => {}}
					title={translate(({ titles }) => titles.IamGoing)}
					leftIcon={IconType.EpCheckRound}
					rounded
				/>
				<FooterIcon>
					<Dropdown>
						<Dropdown.Item onClick={() => {}}>Action 1</Dropdown.Item>
						<Dropdown.Item onClick={() => {}}>Action 2</Dropdown.Item>
						<Dropdown.Item onClick={() => {}}>Action 3</Dropdown.Item>
					</Dropdown>
				</FooterIcon>
			</SecondPartContainer>
		</UpComingCardContainer>
	);
}
