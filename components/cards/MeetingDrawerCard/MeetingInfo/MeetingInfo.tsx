import React, { useState } from 'react';
import moment from 'moment';

import { Meeting } from '@epolitiker/api';

import {
	MeetinginfoContainer,
	MeetingInfoHeader,
	MeetingInfoHeaderRow,
	MeetingInfoHeaderRowIconBlock,
	MeetingInfoHeaderRowMainBlock,
	HeaderDatesRow,
	TypoMidText,
	OverlayText,
	HeaderRoomIdBlock,
	HeaderRoomId,
	RepresentorsBlock,
	CardSubTitle,
	InvitedMembersBlock,
	CreatedBlock,
	ImageBlock,
	ParticipationBlock,
	FooterSubTitle
} from './MeetingInfo.style';

import { Icon, Dot, GhostButton, ButtonSize, Avatar, AvatarSize } from '../../../ui';

import { IconType } from '../../../../consts';
import { Colors } from '../../../../environment';
import { MeetingMemberAvatarCard } from '../../MeetingMemberAvatarCard';
import { useIsAdmin, useTranslation } from '../../../../hooks';

interface MeetingInfoProps {
	meeting: Meeting;
}

//TODO: Change Meeting Room ID
export function MeetingInfo({ meeting }: MeetingInfoProps) {
	const translate = useTranslation();
	const isAdmin = useIsAdmin();
	const [copySuccess, setCopySuccess] = useState(false);

	function getDate(date: string) {
		return moment(new Date(date)).format('dddd, D MMM');
	}

	function getDateTime(startDate: string, endDate: string) {
		const startD = moment(new Date(startDate)).format('HH:mm');
		const endD = moment(new Date(endDate)).format('HH:mm');
		return `${startD}-${endD}`;
	}

	function getDateDuration(startDate: string, endDate: string) {
		const duration = new Date(endDate).getTime() - new Date(startDate).getTime();
		return moment.duration(duration).humanize();
	}

	function handleCopyMeetingRoomId() {
		setCopySuccess(true);
		navigator.clipboard.writeText(meeting.id);
		setTimeout(() => setCopySuccess(false), 3000);
	}

	return (
		<MeetinginfoContainer>
			<MeetingInfoHeader>
				<MeetingInfoHeaderRow>
					<MeetingInfoHeaderRowIconBlock>
						<Icon name={IconType.EpClock} color={Colors.neutralBlue[100]} />
					</MeetingInfoHeaderRowIconBlock>
					<MeetingInfoHeaderRowMainBlock>
						{meeting.dates.map(date => (
							<HeaderDatesRow key={date.id}>
								<TypoMidText>{getDate(date.startDate)}</TypoMidText>
								<Dot size={16} />
								<TypoMidText>
									{getDateTime(date.startDate, date.endDate)}
								</TypoMidText>
								<Dot size={16} />
								<OverlayText>
									{getDateDuration(date.startDate, date.endDate)}
								</OverlayText>
							</HeaderDatesRow>
						))}
					</MeetingInfoHeaderRowMainBlock>
				</MeetingInfoHeaderRow>

				<MeetingInfoHeaderRow>
					<MeetingInfoHeaderRowIconBlock>
						<Icon name={IconType.EpCommittees} color={Colors.neutralBlue[100]} />
					</MeetingInfoHeaderRowIconBlock>
					<MeetingInfoHeaderRowMainBlock>
						<TypoMidText>{meeting.location}</TypoMidText>
					</MeetingInfoHeaderRowMainBlock>
				</MeetingInfoHeaderRow>

				<MeetingInfoHeaderRow>
					<MeetingInfoHeaderRowIconBlock>
						<Icon name={IconType.EpRelation} color={Colors.neutralBlue[100]} />
					</MeetingInfoHeaderRowIconBlock>
					<MeetingInfoHeaderRowMainBlock>
						<HeaderRoomIdBlock>
							<TypoMidText>Room id:</TypoMidText>
							<HeaderRoomId>{meeting.id}</HeaderRoomId>
							<GhostButton
								size={ButtonSize.SM}
								title={
									copySuccess
										? translate(({ buttons }) => buttons.copy)
										: translate(({ buttons }) => buttons.copy)
								}
								onClick={handleCopyMeetingRoomId}
								disabled={copySuccess}
							/>
						</HeaderRoomIdBlock>
					</MeetingInfoHeaderRowMainBlock>
				</MeetingInfoHeaderRow>
			</MeetingInfoHeader>

			{!isAdmin ? (
				<CreatedBlock>
					<CardSubTitle>{translate(({ titles }) => titles.created)}</CardSubTitle>
					{meeting.members.slice(0, 4).map(member => (
						<MeetingMemberAvatarCard key={member.id} member={member.user} />
					))}
					<ImageBlock>
						{meeting.members.slice(0, 4).map(({ user }) => (
							<Avatar key={user.id} image={user.avatar?.url} size={AvatarSize.XS} />
						))}
					</ImageBlock>
				</CreatedBlock>
			) : null}

			<RepresentorsBlock>
				<CardSubTitle>{translate(({ titles }) => titles.representors)}</CardSubTitle>
				{meeting.members.slice(0, 4).map(member => (
					<MeetingMemberAvatarCard key={member.id} member={member.user} />
				))}
			</RepresentorsBlock>

			<InvitedMembersBlock>
				<CardSubTitle>{translate(({ titles }) => titles.invited)}</CardSubTitle>
				{meeting.members.map(member => (
					<MeetingMemberAvatarCard key={member.id} member={member.user} />
				))}
			</InvitedMembersBlock>
			{!isAdmin ? (
				<ParticipationBlock>
					<FooterSubTitle>{translate(({ titles }) => titles.areYouGoing)}</FooterSubTitle>
					<GhostButton
						size={ButtonSize.LG}
						leftIcon={IconType.EpCheckRound}
						rounded
						title={translate(({ buttons }) => buttons.going)}
						onClick={() => {}}
					/>
					<GhostButton
						size={ButtonSize.LG}
						leftIcon={IconType.EpTimesRound}
						rounded
						title={translate(({ buttons }) => buttons.notGoing)}
						onClick={() => {}}
					/>
					<GhostButton
						size={ButtonSize.LG}
						rounded
						title={translate(({ buttons }) => buttons.remote)}
						onClick={() => {}}
					/>
				</ParticipationBlock>
			) : null}
		</MeetinginfoContainer>
	);
}
