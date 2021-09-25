import React, { useContext, useState, useEffect } from 'react';

import { Meeting, AzureFolder } from '@epolitiker/api';

import {
	PageContainer,
	PageMembersBlock,
	PageMembersTitle,
	PageMembersAvatarsBlock,
	Avatar,
	PageLinkText,
	PageMeetingsBlock,
	PageMeetingsBlockHeader,
	PageMeetingsBlockTitle,
	PageMeetingsBlockHeaderNavContent,
	MeetingCard,
	PageDocumentsBlock,
	PageDocumentsBlockHeader,
	PageSubTitle,
	PageDocumentsBlockHeaderNavContent,
	DocumentsContainer,
	DocumentsContainerItem,
	FoldersBlock
} from './CommitteeOverview.style';
import { CommitteeContext } from '../../../pages';
import { AvatarSize, GhostButton, Drawer } from '../../ui';
import { IconType } from '../../../consts';
import { DocumentCard, MeetingDrawerCard } from '../../cards';
import {
	useBreadcrumbs,
	useNavigation,
	useTranslation,
	useGetFolderContentsByIdLazyQuery
} from '../../../hooks';
import { EmptyCard } from '../../cards/EmptyCard';

export function CommitteeOverview() {
	const { committee } = useContext(CommitteeContext);
	if (!committee) {
		return null;
	}

	const { setBreadcrumbs } = useBreadcrumbs();
	const { routes } = useNavigation();
	const translate = useTranslation();

	const [showMeetingDrawer, setShowMeetingDrawer] = useState(false);
	const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
	const [meetingCardToShowIndex, setMeetingCardToShowIndex] = useState(0);
	const [, setCommitteeFolders] = useState<AzureFolder[]>([]);

	const [
		getFolderContentById,
		{ data: getFolderContentByIdData }
	] = useGetFolderContentsByIdLazyQuery();

	useEffect(() => {
		if (committee) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.committees),
					to: routes.committees
				},
				{
					label: committee.label,
					to: routes.committeeOverview(committee.id),
					active: true
				}
			];

			setBreadcrumbs(breadcrumbsData);
			handleGetCommitteeFolders();
		}
	}, [committee]);

	function handleToggleMeetingDrawer(meeting: Meeting) {
		if (selectedMeeting && showMeetingDrawer && meeting.id === selectedMeeting.id) {
			setSelectedMeeting(null);
			setShowMeetingDrawer(false);
			return;
		}
		setSelectedMeeting(meeting);
		setShowMeetingDrawer(true);
	}

	function handleGetCommitteeFolders() {
		getFolderContentById({
			variables: {
				data: {
					azureFolderWhereUniqueInput: { id: committee?.folder?.id }
				}
			}
		});
	}

	useEffect(() => {
		if (getFolderContentByIdData) {
			setCommitteeFolders(getFolderContentByIdData.getFolderContentsById.folders);
		}
	}, [getFolderContentByIdData]);

	return (
		<PageContainer>
			<Drawer
				open={showMeetingDrawer}
				onClose={() => setShowMeetingDrawer(false)}
				title={translate(({ titles }) => titles.meetingInfo)}
			>
				<MeetingDrawerCard meeting={selectedMeeting ? selectedMeeting : null} />
			</Drawer>

			<PageMembersBlock>
				<PageMembersTitle>
					{committee.members.length} {translate(({ titles }) => titles.members)}
				</PageMembersTitle>
				<PageMembersAvatarsBlock>
					{committee.members.slice(0, 16).map(member => (
						<Avatar
							key={member.id}
							size={AvatarSize.XS}
							image={member.user?.avatar?.url}
						/>
					))}
				</PageMembersAvatarsBlock>
				<PageLinkText>
					{`${
						committee.members.length > 16
							? `+${committee.members.slice(16).length}`
							: ''
					}`}
				</PageLinkText>
			</PageMembersBlock>
			<PageMeetingsBlock>
				<PageMeetingsBlockHeader>
					<PageMeetingsBlockTitle>
						{translate(({ buttons }) => buttons.upcoming)}
					</PageMeetingsBlockTitle>
					<PageMeetingsBlockHeaderNavContent>
						<GhostButton
							disabled={meetingCardToShowIndex === 0}
							icon={IconType.EpChevronLeft}
							onClick={() => setMeetingCardToShowIndex(meetingCardToShowIndex - 1)}
						/>
						<GhostButton
							disabled={
								committee?.meetings &&
								meetingCardToShowIndex === committee.meetings.length - 1
							}
							icon={IconType.EpChevronRight}
							onClick={() => setMeetingCardToShowIndex(meetingCardToShowIndex + 1)}
						/>
					</PageMeetingsBlockHeaderNavContent>
				</PageMeetingsBlockHeader>
				{committee?.meetings?.length ? (
					<MeetingCard
						meeting={committee?.meetings[meetingCardToShowIndex]}
						onClick={handleToggleMeetingDrawer}
						withBottomDivider={false}
						showCardOptions={false}
					/>
				) : (
					<EmptyCard
						title={translate(({ titles }) => titles.noCalendarEventsYet)}
						iconName={IconType.EpEmptyCalendar}
						buttonTitle={translate(({ titles }) => titles.createMeeting)}
						path={routes.createOrEditMeeting}
					/>
				)}
			</PageMeetingsBlock>

			<PageDocumentsBlock>
				<PageDocumentsBlockHeader>
					<PageSubTitle>{translate(({ titles }) => titles.recentlyOpened)}</PageSubTitle>
					<PageDocumentsBlockHeaderNavContent>
						<GhostButton icon={IconType.EpChevronLeft} onClick={() => {}} />
						<GhostButton icon={IconType.EpChevronRight} onClick={() => {}} />
					</PageDocumentsBlockHeaderNavContent>
				</PageDocumentsBlockHeader>
				<DocumentsContainer>
					{committee?.folder?.documents ? (
						committee?.folder?.documents.map((document, index) => (
							<DocumentsContainerItem key={`doc-item-${index}`}>
								<DocumentCard document={document} />
							</DocumentsContainerItem>
						))
					) : (
						<EmptyCard
							title={translate(({ titles }) => titles.noDocumentUploaded)}
							iconName={IconType.EpEmptyDoc}
							buttonTitle={translate(({ titles }) => titles.upload)}
							path={routes.documents}
						/>
					)}
				</DocumentsContainer>
			</PageDocumentsBlock>

			{/*<WorkspaceUpdatesBlock>*/}
			{/*	<WorkspaceUpdatesBlockHeader>*/}
			{/*		<PageSubTitle>*/}
			{/*			{translate(({ titles }) => titles.committeeUpdates)}*/}
			{/*		</PageSubTitle>*/}
			{/*		/!* <PageSubTitle>Sort by AZ</PageSubTitle> *!/*/}
			{/*	</WorkspaceUpdatesBlockHeader>*/}
			{/*	<WorkspaceUpdatesList>*/}
			{/*		{committeeFolders.length > 0 &&*/}
			{/*			committeeFolders.map(azureFolder => (*/}
			{/*				<FolderCard*/}
			{/*					key={azureFolder.id}*/}
			{/*					folder={azureFolder}*/}
			{/*					onClick={() => handleNavigateToFolderPage(azureFolder.id)}*/}
			{/*					onOpenClick={handleNavigateToFolderPage}*/}
			{/*				/>*/}
			{/*			))}*/}
			{/*	</WorkspaceUpdatesList>*/}
			{/*</WorkspaceUpdatesBlock>*/}

			<FoldersBlock>
				{/*<FoldersBlockHeader>*/}
				{/*	<PageSubTitle>{translate(({ titles }) => titles.folders)}</PageSubTitle>*/}
				{/*	/!* <PageSubTitle>Sort by AZ</PageSubTitle> *!/*/}
				{/*</FoldersBlockHeader>*/}
				{/*<FoldersList>*/}
				{/*	{committeeFolders.length > 0 &&*/}
				{/*		committeeFolders.map(azureFolder => (*/}
				{/*			<FolderCard*/}
				{/*				key={azureFolder.id}*/}
				{/*				folder={azureFolder}*/}
				{/*				onClick={() => handleNavigateToFolderPage(azureFolder.id)}*/}
				{/*				onOpenClick={handleNavigateToFolderPage}*/}
				{/*			/>*/}
				{/*		))}*/}
				{/*</FoldersList>*/}
				<GhostButton
					title={translate(({ buttons }) => buttons.add)}
					leftIcon={IconType.EpPlus}
					onClick={() => {}}
				/>
			</FoldersBlock>
		</PageContainer>
	);
}
