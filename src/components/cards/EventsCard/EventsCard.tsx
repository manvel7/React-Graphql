import React, { useState, useEffect } from 'react';

import {
	EventsCardContainer,
	EventsCardHeader,
	EventsCardTitle,
	EventsCardContent,
	LeftSide,
	RightSide,
	CircleProgressBar,
	CircleContentIcon,
	RightBarCount,
	RightBarText,
	RightBarSubText,
	RightBarContainer,
	RightBarContainerBlock,
	RightBarContainerSecond,
	RightBarContainerThree,
	RightBarCountSecond,
	RightBarTextSecond,
	RightBarCountThree,
	RightBarTextThree,
	RightBarSubTextSecond,
	NavTabContainer,
	CardMainContent,
	NavTabItem,
	Badge
} from './EventsCard.style';
import { useAllMeetingsInWorkspace, useEffectOnce, useLocalStorage } from '../../../hooks';
import { Meeting } from '@epolitiker/api';
import { StorageKey } from '../../../consts';
import { Icon, BadgeTypes } from '../../ui';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';
import { UpComingEvents } from '../UpComingEvents';
import { ArchivedCard } from '../ArchivedCard';

export const EventsCard = () => {
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [activeTab, setActiveTab] = useState<number>(1);

	const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
	const [completedMeetings, setCompletedMeetings] = useState<Meeting[]>([]);

	const [
		getMeeting,
		{ data: getMeetingsData, loading: getMeetingsLoading }
	] = useAllMeetingsInWorkspace();

	useEffectOnce(() => {
		handleGetMeetings();
	});

	function handleGetMeetings() {
		if (activeWorkspace) {
			getMeeting({
				variables: {
					data: {
						workspaceId: activeWorkspace.id,
						orderBy: 'createdAt_ASC'
					}
				}
			});
		}
	}

	useEffect(() => {
		if (getMeetingsData) {
			getMeetingsData.allMeetingsInWorkspace.forEach(meeting => {
				if (Date.now() < new Date(meeting.dates[0].endDate).getTime()) {
					setUpcomingMeetings(prevState => [...prevState, meeting]);
				} else {
					setCompletedMeetings(prevState => [...prevState, meeting]);
				}
			});
		}
	}, [getMeetingsData]);

	return (
		<EventsCardContainer>
			<EventsCardHeader>
				<Icon name={IconType.EpCalendar} />
				<EventsCardTitle>{translate(({ titles }) => titles.events)}</EventsCardTitle>
			</EventsCardHeader>
			<EventsCardContent>
				<LeftSide>
					<NavTabContainer>
						<NavTabItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
							{translate(({ tabs }) => tabs.upComing)}
							<Badge
								title={upcomingMeetings.length.toString()}
								type={BadgeTypes.Default}
							/>
						</NavTabItem>
						<NavTabItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
							{translate(({ tabs }) => tabs.archived)}
							<Badge
								title={completedMeetings.length.toString()}
								type={BadgeTypes.Default}
							/>
						</NavTabItem>
					</NavTabContainer>
					<CardMainContent>
						{activeTab === 1 && (
							<UpComingEvents
								getMeetingsLoading={getMeetingsLoading}
								meetings={upcomingMeetings}
							/>
						)}
						{activeTab === 2 && (
							<ArchivedCard
								getMeetingsLoading={getMeetingsLoading}
								meetings={completedMeetings}
							/>
						)}
					</CardMainContent>
				</LeftSide>
				<RightSide>
					<RightBarContainer>
						<CircleProgressBar>
							<CircleContentIcon>
								<Icon name={IconType.EpCalendar} />
							</CircleContentIcon>
						</CircleProgressBar>
						<RightBarCount>4/8</RightBarCount>
						<RightBarText>
							{translate(({ titles }) => titles.yourAttendance)}
						</RightBarText>
						<RightBarSubText>
							{translate(({ titles }) => titles.forLastDays)}
						</RightBarSubText>
					</RightBarContainer>
					<RightBarContainerBlock>
						<RightBarContainerSecond>
							<CircleProgressBar>
								<CircleContentIcon>
									<Icon name={IconType.EpCalendar} />
								</CircleContentIcon>
							</CircleProgressBar>
							<RightBarCountSecond>4/8</RightBarCountSecond>
							<RightBarTextSecond>
								{translate(({ titles }) => titles.yourAttendance)}
							</RightBarTextSecond>
							<RightBarSubTextSecond>
								{translate(({ titles }) => titles.forLastDays)}
							</RightBarSubTextSecond>
						</RightBarContainerSecond>
						<RightBarContainerThree>
							<CircleProgressBar>
								<CircleContentIcon>
									<Icon name={IconType.EpCalendar} />
								</CircleContentIcon>
							</CircleProgressBar>
							<RightBarCountThree>4/8</RightBarCountThree>
							<RightBarTextThree>
								{translate(({ titles }) => titles.yourAttendance)}
							</RightBarTextThree>
							<RightBarSubTextSecond>
								{translate(({ titles }) => titles.forLastDays)}
							</RightBarSubTextSecond>
						</RightBarContainerThree>
					</RightBarContainerBlock>
				</RightSide>
			</EventsCardContent>
		</EventsCardContainer>
	);
};
