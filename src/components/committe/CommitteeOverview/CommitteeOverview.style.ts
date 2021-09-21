import styled from 'styled-components';
import { Avatar as BaseAvatar } from '../../ui';
import { Colors, Fonts } from '../../../environment';
import { MeetingCard as BaseMeetingCard } from '../../cards';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PageMembersBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 2.4rem 2rem;
`;

export const PageMembersTitle = styled.h5`
	font-weight: 800;
	color: ${Colors.typoPlaceholder};
	margin-right: 1.4rem;
`;

export const PageMembersAvatarsBlock = styled.div`
	display: flex;
`;

export const Avatar = styled(BaseAvatar)`
	margin-right: 0.8rem;
`;

export const PageLinkText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.neutralBlue[100]};
`;

export const PageMeetingsBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2.4rem 2rem;
	width: 100%;
`;

export const PageMeetingsBlockHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1.6rem;
`;

export const PageMeetingsBlockTitle = styled.p`
	font-size: 2rem;
	font-weight: 800;
	font-family: ${Fonts.heading};
	color: ${Colors.typoPlaceholder};
`;

export const PageMeetingsBlockHeaderNavContent = styled.div`
	display: flex;
	justify-content: space-between;
	width: 7.2rem;
`;

export const MeetingCard = styled(BaseMeetingCard)`
	border: 0.1rem solid ${Colors.neutralBlue[20]};
	border-radius: 2.4rem;
`;

export const PageDocumentsBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2.4rem 2rem;
	width: 100%;
	margin-bottom: 1.5rem;
`;

export const PageDocumentsBlockHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1.6rem;
`;

export const PageSubTitle = styled.p`
	font-size: 1.5rem;
	font-weight: 800;
	font-family: ${Fonts.heading};
	color: ${Colors.typoPlaceholder};
`;

export const PageDocumentsBlockHeaderNavContent = styled.div`
	display: flex;
	justify-content: space-between;
	width: 7.2rem;
`;

export const DocumentsContainer = styled.div`
	display: flex;
	overflow-x: hidden;
`;

export const DocumentsContainerItem = styled.div`
	margin-right: 2.4rem;
`;

export const WorkspaceUpdatesBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
	margin-bottom: 4rem;
`;

export const WorkspaceUpdatesBlockHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.8rem;
	padding: 0.7rem 0;
`;

export const WorkspaceUpdatesList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FoldersBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 2rem 5rem 2rem;
`;

export const FoldersBlockHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.8rem;
	padding: 0.7rem 0;
`;

export const FoldersList = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
`;
