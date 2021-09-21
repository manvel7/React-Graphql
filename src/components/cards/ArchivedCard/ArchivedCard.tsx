import React from 'react';

import { ArchivedCardContainer, ArchivedEventsListBlock } from './ArchivedCard.style';
import { Meeting } from '@epolitiker/api';
import { ArchivedEventList } from '../ArchivedEventList/ArchivedEventList';
import { MembersPageLoader } from '../../ui/Loaders';

interface ArchivedEventsProps {
	getMeetingsLoading: boolean;
	meetings: Meeting[];
}

export const ArchivedCard = ({ getMeetingsLoading, meetings }: ArchivedEventsProps) => {
	return (
		<ArchivedCardContainer>
			<ArchivedEventsListBlock>
				{getMeetingsLoading ? (
					<MembersPageLoader />
				) : (
					meetings.map(meeting => (
						<ArchivedEventList key={meeting.id} meeting={meeting} />
					))
				)}
			</ArchivedEventsListBlock>
		</ArchivedCardContainer>
	);
};
