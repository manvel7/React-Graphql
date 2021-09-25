import React, { useEffect, useState } from 'react';
import { Meeting } from '@epolitiker/api';

import {
	OverviewContainer,
	OverviewTitle,
	OverviewList,
	OverviewListHeading
} from './Overview.style';
import {
	useAllMeetingsInWorkspace,
	useEffectOnce,
	useLocalStorage,
	useTranslation
} from '../../hooks';
import { StorageKey } from '../../consts';
import { OverviewCard } from '../cards/OverviewCard';

export function Overview() {
	const translate = useTranslation();

	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
	const [lastUpdatedMeetings, setLastUpdatedMeetings] = useState<Meeting[]>([]);

	const [getMeeting, { data: getMeetingsData }] = useAllMeetingsInWorkspace();

	useEffectOnce(() => {
		handleGetMeetings();
	});

	function handleGetMeetings() {
		if (activeWorkspace) {
			getMeeting({
				variables: {
					data: {
						workspaceId: activeWorkspace.id,
						orderBy: 'startDate_ASC'
					}
				}
			});
		}
	}

	useEffect(() => {
		if (getMeetingsData) {
			const allMettings = getMeetingsData.allMeetingsInWorkspace;
			setUpcomingMeetings(allMettings?.length > 1 ? allMettings.slice(0, 2) : allMettings);
			const lastMeeting = getMeetingsData.allMeetingsInWorkspace;
			const lastUpdatedForMeetings = lastMeeting.sort(
				(a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt)
			);
			setLastUpdatedMeetings(
				lastUpdatedForMeetings?.length > 1
					? lastUpdatedForMeetings.slice(0, -2)
					: lastUpdatedForMeetings
			);
		}
	}, [getMeetingsData]);

	return (
		<OverviewContainer>
			<OverviewTitle>{translate(({ titles }) => titles.overview)}</OverviewTitle>
			<OverviewListHeading>
				{translate(({ titles }) => titles.upcomingEvents)}
			</OverviewListHeading>
			<OverviewList>
				{upcomingMeetings.map(meeting => (
					<OverviewCard key={meeting.id} meeting={meeting} />
				))}
			</OverviewList>

			<OverviewListHeading>
				{translate(({ titles }) => titles.lastUpdated)}
			</OverviewListHeading>
			<OverviewList>
				{lastUpdatedMeetings.map(meeting => (
					<OverviewCard key={meeting.id} meeting={meeting} />
				))}
			</OverviewList>
		</OverviewContainer>
	);
}
