import React from 'react';
import moment from 'moment';

import { Meeting } from '@epolitiker/api';

import {
	OverviewCardContainer,
	CardDateContainer,
	CardInfoContainer,
	DateHeading,
	DateSubHeading,
	Title,
	Time,
	CommitteeName
} from './OverviewCard.style';

interface OverviewCardProps {
	meeting: Meeting;
}

export function OverviewCard({ meeting }: OverviewCardProps) {
	function getDateDay() {
		if (meeting.dates.length > 0) {
			return moment(new Date(meeting.dates[0].startDate)).format('D');
		}

		return moment(new Date()).format('D');
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
		<OverviewCardContainer>
			<CardDateContainer>
				<DateHeading>{getDateDay()}</DateHeading>
				<DateSubHeading>{getDateMonth(meeting?.dates[0]?.startDate)}</DateSubHeading>
			</CardDateContainer>
			<CardInfoContainer>
				<Title>{meeting.label}</Title>
				<Time>{getDateTime(meeting?.dates[0]?.startDate, meeting?.dates[0]?.endDate)}</Time>
				<CommitteeName>{meeting?.committee?.label}</CommitteeName>
			</CardInfoContainer>
		</OverviewCardContainer>
	);
}
