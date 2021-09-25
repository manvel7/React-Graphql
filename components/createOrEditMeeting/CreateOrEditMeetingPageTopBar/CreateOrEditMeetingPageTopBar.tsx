import React from 'react';

import { Meeting } from '@epolitiker/api';

import {
	PageTopBarContainer,
	PageTopBarItem,
	BreadcrumbBlock,
	BreadcrumbItem,
	BreadcrumbDivider,
	PrimaryButton,
	LightButton
} from './CreateOrEditMeetingPageTopBar.style';
import { Dropdown, Badge, GhostButton, ButtonSize, BadgeTypes, Icon } from '../../ui';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

interface CreateOrEditMeetingPageTopBarProps {
	meetingDetails: Meeting | null;
	isEditMode: boolean | undefined;
	updateMeetingDetailsLoading: boolean;
	addMeetingInCommitteeLoading: boolean;
	handleDeleteMeeting: () => void;
	setSubmitFromOutside: (value: boolean) => void;
}

export function CreateOrEditMeetingPageTopBar({
	meetingDetails,
	isEditMode,
	updateMeetingDetailsLoading,
	addMeetingInCommitteeLoading,
	handleDeleteMeeting,
	setSubmitFromOutside
}: CreateOrEditMeetingPageTopBarProps) {
	const translate = useTranslation();
	return (
		<PageTopBarContainer>
			<PageTopBarItem>
				<BreadcrumbBlock>
					<BreadcrumbItem>
						<Icon name={IconType.EpNewDocument} />
					</BreadcrumbItem>
					<BreadcrumbItem>{meetingDetails?.committee.label}</BreadcrumbItem>
					<BreadcrumbDivider>/</BreadcrumbDivider>
					<BreadcrumbItem>{translate(({ titles }) => titles.meetings)}</BreadcrumbItem>
					<BreadcrumbDivider>/</BreadcrumbDivider>
					<BreadcrumbItem>
						{meetingDetails
							? meetingDetails.label
							: translate(({ buttons }) => buttons.createMeeting)}
					</BreadcrumbItem>
					{isEditMode && (
						<BreadcrumbItem>
							<Dropdown>
								<Dropdown.Item onClick={() => {}}>
									<Dropdown.ItemIcon name={IconType.EpGlobe} />
									{translate(({ buttons }) => buttons.manageAccess)}
								</Dropdown.Item>
								<Dropdown.Item onClick={() => {}}>
									<Dropdown.ItemIcon name={IconType.EpEyeSlash} />
									{translate(({ buttons }) => buttons.unpublish)}
								</Dropdown.Item>
								<Dropdown.Item onClick={handleDeleteMeeting}>
									<Dropdown.ItemIcon name={IconType.EpTrash} />
									{translate(({ buttons }) => buttons.delete)}
								</Dropdown.Item>
							</Dropdown>
						</BreadcrumbItem>
					)}
					<BreadcrumbItem>
						<Badge
							title={
								meetingDetails
									? meetingDetails.status
									: translate(({ titles }) => titles.draft)
							}
							type={BadgeTypes.Default}
						/>
					</BreadcrumbItem>
				</BreadcrumbBlock>
			</PageTopBarItem>
			<PageTopBarItem>
				<GhostButton
					size={ButtonSize.SM}
					title={translate(({ buttons }) => buttons.manageAccess)}
					onClick={() => {}}
					rightIcon={IconType.EpGlobe}
				/>
				<LightButton
					size={ButtonSize.SM}
					title={translate(({ buttons }) => buttons.preview)}
					leftIcon={IconType.EpEye}
					onClick={() => {}}
				/>
				{isEditMode ? (
					<PrimaryButton
						size={ButtonSize.SM}
						title={translate(({ buttons }) => buttons.update)}
						onClick={() => setSubmitFromOutside(true)}
						loading={updateMeetingDetailsLoading}
						disabled={updateMeetingDetailsLoading}
					/>
				) : (
					<PrimaryButton
						size={ButtonSize.SM}
						title={translate(({ buttons }) => buttons.create)}
						onClick={() => setSubmitFromOutside(true)}
						loading={addMeetingInCommitteeLoading}
						disabled={addMeetingInCommitteeLoading}
					/>
				)}
				<GhostButton icon={IconType.EpTimes} onClick={() => {}} />
			</PageTopBarItem>
		</PageTopBarContainer>
	);
}
