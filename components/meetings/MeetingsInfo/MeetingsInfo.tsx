import React, { useContext } from 'react';

import {
	ContentBlock,
	MeetingInfoBlock,
	MeetingTitle,
	ContentButton,
	MeetingInfoSub,
	MeetingDateTimeBlock,
	MeetingTime,
	MeetingDayOfWeek,
	BlockContent,
	MeetingSubTitle,
	HeaderRoomId,
	RoomBlockContent,
	TypoMidText,
	RoomContent,
	ButtonBlockContent,
	SubButton,
	AgendaTableContent
} from './MeetingsInfo.style';

import { useTranslation } from '../../../hooks';

import { MeetingContext } from '../../../pages/MeetingPage';
import { Colors } from '../../../environment/theme';
import { Icon } from '../../ui/Icon';
import { ButtonSize, LightButton } from '../../ui/Button';
import { IconType } from '../../../consts';
import { getDataTime, getDayOfWeek, getDuration } from '../../../hooks/utils/getTimesAndDates';
import { MeetingsTable } from '../MeetingsTable/MeetingsTable';

export function MeetingsInfo() {
	const translate = useTranslation();
	const { meeting } = useContext(MeetingContext);

	if (!meeting) {
		return null;
	}

	return (
		<ContentBlock>
			<MeetingInfoBlock>
				<Icon name={IconType.EpEvent} color={Colors.neutralBlue[100]} />
				<MeetingTitle>{meeting?.label}</MeetingTitle>
				<ContentButton>
					<LightButton
						size={ButtonSize.SM}
						title={translate(({ buttons }) => buttons.caseAndSeggestions)}
						onClick={() => {}}
						rounded
					/>
				</ContentButton>
			</MeetingInfoBlock>
			<MeetingInfoSub>
				<Icon name={IconType.EpClock} color={Colors.neutralBlue[100]} />
				<MeetingDateTimeBlock>
					<MeetingDayOfWeek>{getDayOfWeek(meeting.dates[0].startDate)}</MeetingDayOfWeek>
					<MeetingDayOfWeek>
						{getDataTime(meeting?.dates[0].startDate, meeting?.dates[0].endDate)}
					</MeetingDayOfWeek>
					<MeetingTime>
						Duration:{' '}
						{getDuration(meeting?.dates[0].startDate, meeting?.dates[0].endDate)} min
					</MeetingTime>
				</MeetingDateTimeBlock>
			</MeetingInfoSub>
			<BlockContent>
				<Icon name={IconType.EpLocation} color={Colors.neutralBlue[100]} />
				<MeetingSubTitle>{meeting?.location}</MeetingSubTitle>
			</BlockContent>
			<BlockContent>
				<Icon name={IconType.EpCommittees} color={Colors.neutralBlue[100]} />
				<MeetingSubTitle>{meeting?.location}</MeetingSubTitle>
			</BlockContent>
			<RoomBlockContent>
				<Icon name={IconType.EpCamera} color={Colors.neutralBlue[100]} />
				<RoomContent>
					<TypoMidText>Room id:</TypoMidText>
					<HeaderRoomId>{meeting.id}</HeaderRoomId>
				</RoomContent>
			</RoomBlockContent>
			<RoomBlockContent>
				<Icon name={IconType.EpRelation} color={Colors.neutralBlue[100]} />
				<MeetingSubTitle>
					{translate(({ titles }) => titles.meetingRelatedTo)}
				</MeetingSubTitle>
			</RoomBlockContent>
			<ButtonBlockContent>
				<LightButton
					title={translate(({ buttons }) => buttons.meetingName)}
					onClick={() => {}}
					rounded
				/>
				<SubButton>
					<LightButton
						title={translate(({ buttons }) => buttons.documentName)}
						onClick={() => {}}
						rounded
					/>
				</SubButton>
			</ButtonBlockContent>
			<AgendaTableContent>
				<MeetingsTable meeting={meeting} />
			</AgendaTableContent>
		</ContentBlock>
	);
}
