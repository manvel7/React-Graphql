import React, { useState, useMemo } from 'react';

import { Meeting } from '@epolitiker/api';

import {
	MemberDrawerCardContainer,
	MemberDrawerCardHeader,
	CardTitleBlock,
	CardHeaderTitle,
	NavTabContainer,
	NavTabItem,
	CardMainContent,
	DropdownItemIcon,
	CardHeaderCommitteeBlock,
	CardHeaderCommitteeIcon,
	CardHeaderActionsBlock,
	LightButton,
	DefaultButton,
	CardTypoText
} from './MeetingDrawerCard.style';
import { Dropdown, PrimaryButton } from '../../ui';
import { IconType } from '../../../consts';
import { useIsAdmin, useNavigation, useTranslation } from '../../../hooks';
import { MeetingInfo } from './MeetingInfo';
import { MeetingRelated } from './MeetingRelated';
import { MeetingDrawerAgenda } from './MeetingDrawerAgenda';
import { MeetingAccess } from './MeetingDrawerAccess';

interface MeetingDrawerCardProps {
	meeting: Meeting | null;
}

export function MeetingDrawerCard({ meeting }: MeetingDrawerCardProps) {
	if (!meeting) {
		return null;
	}

	const [activeTab, setActiveTab] = useState(1);
	const { routes, replace, navigate } = useNavigation();
	const translate = useTranslation();
	const isAdmin = useIsAdmin();

	function handleNavigateToEditCommitteePage() {
		if (meeting) {
			replace(
				`${routes.root}${routes.updateMeetingDetils(meeting?.committee?.id, meeting?.id)}`
			);
		}
	}

	const actionsData = useMemo(
		() => [
			{
				title: translate(({ buttons }) => buttons.open),
				icon: IconType.EpExternalLink,
				onClick: () => navigate(routes.meetingInfo(meeting.id))
			},
			{
				title: translate(({ buttons }) => buttons.edit),
				icon: IconType.EpEdit,
				onClick: handleNavigateToEditCommitteePage
			},
			{
				title: translate(({ buttons }) => buttons.manageAccess),
				icon: IconType.EpGlobe,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.unpublish),
				icon: IconType.EpEyeSlash,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.changeStatus),
				icon: IconType.EpStatus,
				onClick: () => {}
			},
			{
				title: translate(({ buttons }) => buttons.delete),
				icon: IconType.EpTrash,
				onClick: () => {}
			}
		],
		[]
	);

	return (
		<MemberDrawerCardContainer>
			<MemberDrawerCardHeader>
				<CardTitleBlock>
					<CardHeaderTitle>{meeting.label}</CardHeaderTitle>
					{isAdmin ? (
						<Dropdown>
							{actionsData.map((item, i) => (
								<Dropdown.Item
									key={`card-header-action-item-${i}`}
									onClick={item.onClick}
								>
									<DropdownItemIcon name={item.icon} />
									{item.title}
								</Dropdown.Item>
							))}
						</Dropdown>
					) : null}
				</CardTitleBlock>
				{isAdmin ? (
					<CardHeaderCommitteeBlock>
						<CardHeaderCommitteeIcon name={IconType.EpCommittees} />
						<CardTypoText>{meeting?.committee?.label} </CardTypoText>
					</CardHeaderCommitteeBlock>
				) : (
					<CardHeaderCommitteeBlock>
						<CardHeaderCommitteeIcon name={IconType.EpCommittees} />
						<CardTypoText>{meeting?.committee?.label}</CardTypoText>
						<LightButton
							title={translate(({ buttons }) => buttons.upcoming)}
							rounded
							onClick={() => {}}
						/>
					</CardHeaderCommitteeBlock>
				)}
				{isAdmin ? (
					<CardHeaderActionsBlock>
						<DefaultButton
							title={translate(({ buttons }) => buttons.upcoming)}
							leftIcon={IconType.EpStatus}
							rightIcon={IconType.EpChevronDown}
							onClick={() => {}}
						/>
						<LightButton
							title={translate(({ buttons }) => buttons.meetingPage)}
							leftIcon={IconType.EpExternalLink}
							onClick={() => navigate(routes.meetingInfo(meeting.id))}
						/>
						<PrimaryButton
							title={translate(({ buttons }) => buttons.startMeeting)}
							onClick={() => {}}
						/>
					</CardHeaderActionsBlock>
				) : null}
			</MemberDrawerCardHeader>

			{isAdmin ? (
				<NavTabContainer>
					<NavTabItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
						{translate(({ tabs }) => tabs.meetingInfo)}
					</NavTabItem>
					<NavTabItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
						{translate(({ tabs }) => tabs.relatedItems)}
					</NavTabItem>
					<NavTabItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
						{translate(({ tabs }) => tabs.agenda)}
					</NavTabItem>
				</NavTabContainer>
			) : (
				<NavTabContainer>
					<NavTabItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
						{translate(({ tabs }) => tabs.meetingInfo)}
					</NavTabItem>
					<NavTabItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
						{translate(({ tabs }) => tabs.related)}
					</NavTabItem>
					<NavTabItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
						{translate(({ tabs }) => tabs.agenda)}
					</NavTabItem>
					<NavTabItem active={activeTab === 4} onClick={() => setActiveTab(4)}>
						{translate(({ tabs }) => tabs.access)}
					</NavTabItem>
				</NavTabContainer>
			)}

			{isAdmin ? (
				<CardMainContent>
					{activeTab === 1 && <MeetingInfo meeting={meeting} />}
					{activeTab === 2 && <MeetingRelated meeting={meeting} />}
					{activeTab === 3 && <MeetingDrawerAgenda meeting={meeting} />}
				</CardMainContent>
			) : (
				<CardMainContent>
					{activeTab === 1 && <MeetingInfo meeting={meeting} />}
					{activeTab === 2 && <MeetingRelated meeting={meeting} />}
					{activeTab === 3 && <MeetingDrawerAgenda meeting={meeting} />}
					{activeTab === 4 && <MeetingAccess />}
				</CardMainContent>
			)}
		</MemberDrawerCardContainer>
	);
}
