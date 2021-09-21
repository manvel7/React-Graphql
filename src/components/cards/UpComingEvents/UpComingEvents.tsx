import React, { useState } from 'react';
import { Meeting } from '@epolitiker/api';
import { UpComingEventsContainer, UpComingEventsCardList } from './UpComingEvents.style';
import { useTranslation } from '../../../hooks';
import { UpComingEventsList } from '../UpComingEventsList';
import { MembersPageLoader } from '../../ui/Loaders';
import { MeetingDrawerCard } from '../MeetingDrawerCard';
import { Drawer } from '../../ui/Drawer';

interface UpComingEventsProps {
	getMeetingsLoading: boolean;
	meetings: Meeting[];
}

export const UpComingEvents = ({ getMeetingsLoading, meetings }: UpComingEventsProps) => {
	const translate = useTranslation();
	const [showMeetingDrawer, setShowMeetingDrawer] = useState(false);
	const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

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
		<UpComingEventsContainer>
			<UpComingEventsCardList>
				{getMeetingsLoading ? (
					<MembersPageLoader />
				) : (
					meetings.map(meeting => (
						<UpComingEventsList
							key={meeting.id}
							meeting={meeting}
							onClick={handleToggleMeetingDrawer}
						/>
					))
				)}
				<Drawer
					open={showMeetingDrawer}
					onClose={() => setShowMeetingDrawer(false)}
					title={translate(({ titles }) => titles.meetingInfo)}
				>
					<MeetingDrawerCard meeting={selectedMeeting ? selectedMeeting : null} />
				</Drawer>
			</UpComingEventsCardList>
		</UpComingEventsContainer>
	);
};
