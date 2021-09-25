import React from 'react';
import { useTranslation } from '../../../hooks';

import {
	NotificationsContainer,
	ComponentBlock,
	PageTitle,
	Radio,
	Checkbox,
	SubItemsBlock
} from './WorkspaceNotifications.style';

export function WorkspaceNotifications() {
	const translate = useTranslation();
	return (
		<NotificationsContainer>
			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.adminNotifications)}</PageTitle>
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.emailMe)}:</PageTitle>
				<Radio
					label={translate(
						({ titles }) => titles.notifyMeByEmailAboutAllMembersActivities
					)}
					name="email"
					checked={false}
					value=""
					onChange={() => {}}
				/>
				<Radio
					label={translate(({ titles }) => titles.notifyOnlyOnCertain)}
					name="email"
					checked={true}
					value=""
					onChange={() => {}}
				/>
				<SubItemsBlock>
					<Checkbox
						label={translate(({ titles }) => titles.newItemSubmittedOnReview)}
						name="certain"
						checked={true}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(
							({ titles }) => titles.someoneWantsToReplyOnItemDuringLiveMeeting
						)}
						name="certain"
						checked={false}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(({ titles }) => titles.someoneLeftCommentsOnItems)}
						name="certain"
						checked={true}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(({ titles }) => titles.someoneMentionedMeInComments)}
						name="certain"
						checked={true}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(({ titles }) => titles.anotherAdminInvitedNewMembers)}
						name="certain"
						checked={true}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(
							({ titles }) => titles.deputyMemberIsAcceptedReplacementForAMeeting
						)}
						name="certain"
						checked={false}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(({ titles }) => titles.meetingProtocolIsGenerated)}
						name="certain"
						checked={true}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(({ titles }) => titles.highSecurityDocumentHasBeenViewed)}
						name="certain"
						checked={false}
						onChange={() => {}}
					/>
					<Checkbox
						label={translate(
							({ titles }) => titles.personAcceptedInvitationToTheWorkspace
						)}
						name="certain"
						checked={true}
						onChange={() => {}}
					/>
				</SubItemsBlock>
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.sendMeDigest)}:</PageTitle>
				<Radio
					label={translate(({ titles }) => titles.dailySummaryOfSelectedActivities)}
					name="digest"
					checked={false}
					value=""
					onChange={() => {}}
				/>
				<Radio
					label={translate(({ titles }) => titles.weeklySummaryOfSelectedActivities)}
					name="digest"
					checked={true}
					value=""
					onChange={() => {}}
				/>
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.sendMeReport)}:</PageTitle>
				<Checkbox
					label={translate(({ titles }) => titles.summaryAndResultsWhenPollIsCompleted)}
					name="report"
					checked={true}
					onChange={() => {}}
				/>
				<Checkbox
					label={translate(({ titles }) => titles.attendanceReportWhenMeetingIsEnded)}
					name="report"
					checked={false}
					onChange={() => {}}
				/>
				<Checkbox
					label={translate(({ titles }) => titles.monthlyReportOnEachMember)}
					name="report"
					checked={true}
					onChange={() => {}}
				/>
			</ComponentBlock>
		</NotificationsContainer>
	);
}
