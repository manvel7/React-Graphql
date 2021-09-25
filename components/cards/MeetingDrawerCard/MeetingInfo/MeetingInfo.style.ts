import styled from 'styled-components';
import { Colors } from '../../../../environment';

export const MeetinginfoContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
`;

export const MeetingInfoHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 4rem;
`;

export const MeetingInfoHeaderRow = styled.div`
	display: flex;
	margin-bottom: 1.6rem;
`;

export const MeetingInfoHeaderRowIconBlock = styled.div`
	padding: 0.4rem;
	margin-right: 1.6rem;
`;

export const MeetingInfoHeaderRowMainBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0.4rem 0 0.8rem 0;
`;

export const HeaderDatesRow = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.6rem;
`;

export const HeaderRoomIdBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 0.6rem 1rem 0.6rem 1.5rem;
	border-radius: 0.4rem;
	background-color: ${Colors.overlay[3]};
`;

export const HeaderRoomId = styled.p`
	padding: 0 0.5rem;
	flex: 1;
	font-size: 1.5rem;
	color: ${Colors.blue[100]};
`;

export const TypoMidText = styled.p`
	font-size: 1.5rem;
	color: ${Colors.gray[100]};
`;

export const OverlayText = styled.p`
	font-size: 1.5rem;
	color: ${Colors.overlay[40]};
`;

export const CardSubTitle = styled.p`
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 1.6rem;
`;

export const RepresentorsBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
	margin-bottom: 3.2rem;
`;

export const InvitedMembersBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
	margin-bottom: 3.2rem;
`;

export const CreatedBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
	margin-bottom: 3.2rem;
`;

export const ImageBlock = styled.div`
	display: flex;
	padding: 0 2rem;
	margin-bottom: 3.2rem;
	padding-top: 4rem;
`;
export const ParticipationBlock = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 1rem 2rem;
	margin-bottom: 1rem;
`;

export const FooterSubTitle = styled.p`
	opacity: 0.5;
	font-size: 1.2rem;
`;
