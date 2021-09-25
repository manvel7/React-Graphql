import React, { useContext, useState, useEffect } from 'react';

import { Meeting } from '@epolitiker/api';

import { CommitteeContext } from '../../../pages';
import {
	useCommitteeMeetingsLazyQuery,
	useEffectOnce,
	useBreadcrumbs,
	useNavigation,
	useTranslation,
	useLanguage
} from '../../../hooks';
import { EmptyCard, MeetingCard, MeetingDrawerCard } from '../../cards';
import { Drawer } from '../../ui';
import { IconType } from '../../../consts';

export function CommitteeCalendar() {
	const { committee } = useContext(CommitteeContext);
	if (!committee) {
		return null;
	}

	const { id: committeeId } = committee;
	const [committeeMeetings, setCommitteeMeetings] = useState<Meeting[]>([]);

	const [showMeetingDrawer, setShowMeetingDrawer] = useState(false);
	const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

	const { setBreadcrumbs } = useBreadcrumbs();
	const { routes } = useNavigation();
	const translate = useTranslation();
	const [language] = useLanguage();

	const [getCommitteeMeetings, { data: committeeMeetingsData }] = useCommitteeMeetingsLazyQuery();

	useEffectOnce(() => {
		handleGetCommitteeMeetings();
	});

	useEffect(() => {
		if (committee) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.committees),
					to: routes.committees
				},
				{
					label: committee.label,
					to: routes.committeeOverview(committee.id)
				},
				{
					label: translate(({ titles }) => titles.meetings),
					to: routes.committeeCalendar(committee.id),
					active: true
				}
			];
			setBreadcrumbs(breadcrumbsData);
		}
	}, [language, committee]);

	function handleGetCommitteeMeetings() {
		getCommitteeMeetings({
			variables: {
				data: {
					committeeWhereUniqueInput: { id: committeeId }
				}
			}
		});
	}

	useEffect(() => {
		if (committeeMeetingsData) {
			setCommitteeMeetings(committeeMeetingsData.committeeDetails.meetings);
		}
	}, [committeeMeetingsData]);

	function handleToggleMeetingDrawer(meeting: Meeting) {
		if (selectedMeeting && showMeetingDrawer && meeting.id === selectedMeeting.id) {
			setSelectedMeeting(null);
			setShowMeetingDrawer(false);
			return;
		}
		setSelectedMeeting(meeting);
		setShowMeetingDrawer(true);
	}

	return (
		<section>
			<Drawer
				open={showMeetingDrawer}
				onClose={() => setShowMeetingDrawer(false)}
				title="Meeting info"
			>
				<MeetingDrawerCard meeting={selectedMeeting ? selectedMeeting : null} />
			</Drawer>
			{committeeMeetings.length ? (
				committeeMeetings.map(meeting => (
					<MeetingCard
						onClick={handleToggleMeetingDrawer}
						key={meeting.id}
						meeting={meeting}
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
		</section>
	);
}
