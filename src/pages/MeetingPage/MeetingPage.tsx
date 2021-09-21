import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Meeting } from '@epolitiker/api';

import { Route } from '../../components/ui/Route';
import { MeetingsInfo, MeetingsParticipants, MeetingsRelated } from '../../components/meetings';

import {
	MeetingContainer,
	PageMeetingBar,
	PageMeetingBarItem,
	HeaderContent,
	MeetingContainerRoutes,
	NavTabsBlock,
	NavLink,
	NavTab
} from './MeetingPage.style';

import {
	useEffectOnce,
	useAllMeetingsInWorkspace,
	useTranslation,
	useLocalStorage,
	useBreadcrumbs,
	useNavigation
} from '../../hooks';

import { IconType, StorageKey } from '../../consts';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ButtonSize, LightButton } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { Nullable } from '../../types';

enum MeetingsRoutes {
	MeetingInfo = '/meetings/:id',
	Participants = '/meetings/:id/participants',
	Related = '/meetings/:id/related-items'
}

interface IMeetingContext {
	meeting: Nullable<Meeting>;
}

export const MeetingContext = createContext<IMeetingContext>({
	meeting: null
});

export function MeetingPage() {
	const translate = useTranslation();
	const { id: meetingId } = useParams();
	const { routes } = useNavigation();
	const { setBreadcrumbs } = useBreadcrumbs();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [meeting, setMeeting] = useState<Meeting | null>(null);

	const [
		allMeetingsInWorkspace,
		{ data: allMeetingsInWorkspaceData }
	] = useAllMeetingsInWorkspace();

	useEffectOnce(() => {
		if (meetingId) {
			handleGetAllMeetingsInWorkspace();
		}
	});

	function handleGetAllMeetingsInWorkspace() {
		allMeetingsInWorkspace({
			variables: {
				data: {
					workspaceId: activeWorkspace.id,
					where: {
						id: meetingId
					}
				}
			}
		});
	}

	useEffect(() => {
		if (allMeetingsInWorkspaceData) {
			setMeeting(allMeetingsInWorkspaceData.allMeetingsInWorkspace[0]);
		}
	}, [allMeetingsInWorkspaceData]);

	useEffect(() => {
		if (meeting) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.committees),
					to: routes.committees,
					active: true
				},
				{
					label: translate(({ titles }) => titles.meetings),
					to: routes.meetingInfo(meetingId),
					active: false
				},
				{
					label: meeting.label,
					to: routes.meetingInfo(meetingId),
					active: false
				}
			];
			setBreadcrumbs(breadcrumbsData);
		}
	}, [meeting]);

	const tabData = [
		{
			title: translate(({ tabs }) => tabs.meetingInfo),
			path: routes.meetingInfo(meetingId)
		},
		{
			title: translate(({ tabs }) => tabs.participants),
			path: routes.participants(meetingId)
		},
		{
			title: translate(({ tabs }) => tabs.related),
			path: routes.related(meetingId)
		}
	];

	return (
		<MeetingContainer>
			<PageMeetingBar>
				<PageMeetingBarItem>
					<Breadcrumbs />
					<HeaderContent>
						<LightButton
							title={translate(({ buttons }) => buttons.upcoming)}
							size={ButtonSize.SM}
							onClick={() => {}}
							rounded
						/>
					</HeaderContent>
				</PageMeetingBarItem>
				<Icon name={IconType.EpTimes} />
			</PageMeetingBar>
			<NavTabsBlock>
				{tabData.map((tab, index) => (
					<NavTab key={`meeting-tab-${index}`}>
						<NavLink exact to={tab.path}>
							{tab.title}
						</NavLink>
					</NavTab>
				))}
			</NavTabsBlock>
			{meeting && (
				<MeetingContext.Provider value={{ meeting: meeting }}>
					<MeetingContainerRoutes>
						<Route
							exact
							guarded
							path={MeetingsRoutes.MeetingInfo}
							component={MeetingsInfo}
						/>
						<Route
							exact
							guarded
							path={MeetingsRoutes.Participants}
							component={MeetingsParticipants}
						/>
						<Route
							exact
							guarded
							path={MeetingsRoutes.Related}
							component={MeetingsRelated}
						/>
					</MeetingContainerRoutes>
				</MeetingContext.Provider>
			)}
		</MeetingContainer>
	);
}
