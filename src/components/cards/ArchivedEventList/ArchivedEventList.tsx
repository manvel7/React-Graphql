import React from 'react';
import { Meeting } from '@epolitiker/api';

import { ArchivedEventListContainer } from './ArchivedEventList.style';
import {
	CalendarMeeting,
	CardDateContainer,
	CardInfoContainer,
	CommitteeName,
	CountBlock,
	DateHeading,
	DateSubHeading,
	FolderName,
	FooterBlock,
	FooterIcon,
	MeetingCount,
	SecondPartContainer,
	TextBlock,
	Time,
	Title
} from '../UpComingEventsList/UpComingEventsList.style';
import { Icon } from '../../ui/Icon';
import { IconType } from '../../../consts';
import { LightButton } from '../../ui/Button';
import { Dropdown } from '../../ui/Dropdown';
import { useTranslation } from '../../../hooks/i18n';
import moment from 'moment';

interface ArchivedEventListProps {
	meeting: Meeting;
}

export const ArchivedEventList = ({ meeting }: ArchivedEventListProps) => {
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
		<ArchivedEventListContainer>
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
		</ArchivedEventListContainer>
	);
};
