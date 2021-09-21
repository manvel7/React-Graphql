import React, { useState, useEffect } from 'react';

import { Meeting } from '@epolitiker/api';

import { PageContainer, MeetingsList, HeaderButtonsBlock } from './CalendarPage.style';
import {
	PageTopBar,
	PageTitlePanel,
	GhostButton,
	ButtonSize,
	Drawer,
	CalendarPageLoader
} from '../../components/ui';
import {
	useNavigation,
	useAllMeetingsInWorkspace,
	useBreadcrumbs,
	useTranslation,
	useLocalStorage,
	useIsAdmin,
	useLanguage
} from '../../hooks';
import { CalendarFilterBar } from '../../components/calendar';
import { MeetingCard, MeetingDrawerCard } from '../../components/cards';
import { StorageKey, IconType } from '../../consts';
import { CalendarFiltersType } from '../../components/calendar/CalendarFilterBar/CalendarFilterBar';
import { EmptyCard } from '../../components/cards/EmptyCard';

const calendarFiltersInitialState: CalendarFiltersType = {
	textSearch: '',
	orderBy: 'startDate_ASC',
	where: {},
	committeeId: '',
	status: ''
};

export function CalendarPage() {
	const { routes, navigate } = useNavigation();
	const { setBreadcrumbs } = useBreadcrumbs();
	const translate = useTranslation();
	const [language] = useLanguage();
	const isAdmin = useIsAdmin();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [workspaceMeetings, setWorkspaceMeetings] = useState<Meeting[]>([]);
	const [filters, setFilters] = useState<CalendarFiltersType>(calendarFiltersInitialState);

	const [showMeetingDrawer, setShowMeetingDrawer] = useState(false);
	const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

	const breadcrumbsData = [
		{
			label: translate(({ titles }) => titles.calendar),
			to: routes.calendar,
			active: true
		}
	];

	useEffect(() => {
		setBreadcrumbs(breadcrumbsData);
	}, [language]);

	const [
		getWorkspaceMeetings,
		{ data: workspaceMeetingsData, loading: workspaceMeetingsLoading }
	] = useAllMeetingsInWorkspace();

	function handleGetWorkspaceMeetings() {
		if (activeWorkspace) {
			getWorkspaceMeetings({
				variables: {
					data: {
						workspaceId: activeWorkspace.id,
						orderBy: filters.orderBy,
						where: {
							committee: filters.committeeId ? { id: filters.committeeId } : {},
							...(filters.status ? { status: filters.status } : null),
							OR: [
								{ label_contains: filters.textSearch },
								{ location_contains: filters.textSearch },
								{ description_contains: filters.textSearch },

								{ label_in: filters.textSearch.split(' ') },
								{ location_in: filters.textSearch.split(' ') },
								{ description_in: filters.textSearch.split(' ') }
							]
						}
					}
				}
			});
		}
	}

	useEffect(() => {
		if (workspaceMeetingsData) {
			setWorkspaceMeetings(workspaceMeetingsData.allMeetingsInWorkspace);
		}
	}, [workspaceMeetingsData]);

	function handleNavigateToCreateOrEditMeetingPage() {
		navigate(routes.createOrEditMeeting);
	}

	function handleToggleMeetingDrawer(meeting: Meeting) {
		if (selectedMeeting && showMeetingDrawer && meeting.id === selectedMeeting.id) {
			setSelectedMeeting(null);
			setShowMeetingDrawer(false);
			return;
		}
		setSelectedMeeting(meeting);
		setShowMeetingDrawer(true);
	}

	function handleGetFiltersParams(field: keyof CalendarFiltersType, value: string) {
		setFilters({ ...filters, [field]: value });
	}

	useEffect(() => {
		handleGetWorkspaceMeetings();
		setBreadcrumbs(breadcrumbsData);
	}, [filters]);

	return (
		<PageContainer>
			{!isAdmin ? (
				<Drawer
					open={showMeetingDrawer}
					onClose={() => setShowMeetingDrawer(false)}
					title=""
				>
					<HeaderButtonsBlock>
						<GhostButton
							size={ButtonSize.LG}
							rounded
							leftIcon={IconType.EpArrowUp}
							title={translate(({ buttons }) => buttons.submitToAgenta)}
							onClick={() => {}}
						/>
						<GhostButton
							size={ButtonSize.LG}
							leftIcon={IconType.EpOpen}
							rounded
							title={translate(({ buttons }) => buttons.open)}
							onClick={() => {}}
						/>
					</HeaderButtonsBlock>
					<MeetingDrawerCard meeting={selectedMeeting ? selectedMeeting : null} />
				</Drawer>
			) : (
				<Drawer
					open={showMeetingDrawer}
					onClose={() => setShowMeetingDrawer(false)}
					title={translate(({ titles }) => titles.meetingInfo)}
				>
					<MeetingDrawerCard meeting={selectedMeeting ? selectedMeeting : null} />
				</Drawer>
			)}

			<PageTopBar />

			<PageTitlePanel title={translate(({ titles }) => titles.calendar)}>
				{isAdmin ? (
					<GhostButton
						icon={IconType.EpPlus}
						tooltip={translate(({ tooltips }) => tooltips.newMeeting)}
						size={ButtonSize.SM}
						onClick={handleNavigateToCreateOrEditMeetingPage}
					/>
				) : null}
			</PageTitlePanel>
			<CalendarFilterBar
				count={workspaceMeetings.length}
				filters={filters}
				handleFilters={handleGetFiltersParams}
			/>

			<MeetingsList>
				{workspaceMeetingsLoading ? (
					<CalendarPageLoader />
				) : workspaceMeetings.length > 0 ? (
					workspaceMeetings.map(meeting => (
						<MeetingCard
							onClick={handleToggleMeetingDrawer}
							meeting={meeting}
							key={meeting.id}
						/>
					))
				) : (
					<EmptyCard
						title={translate(({ titles }) => titles.noCalendarEventsYet)}
						iconName={IconType.EpEmptyCalendar}
						buttonTitle={translate(({ titles }) => titles.createMeeting)}
						path={routes.createOrEditMeeting}
					/>
				)}
			</MeetingsList>
		</PageContainer>
	);
}
