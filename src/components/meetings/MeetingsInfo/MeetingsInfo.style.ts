import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment/theme';

export const ContentBlock = styled.div`
	margin-top: 5rem;
`;

export const MeetingInfoBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const MeetingTitle = styled.h5`
	font-size: ${Fonts.heading};
	font-weight: 800;
	margin-left: 3rem;
`;

export const ContentButton = styled.div`
	margin-left: 2rem;
`;

export const MeetingInfoSub = styled.div`
	display: flex;
	align-items: center;
	margin-top: 4rem;
`;

export const MeetingDateTimeBlock = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-left: 2rem;
`;

export const MeetingDayOfWeek = styled.p`
	padding-left: 1rem;
	cursor: pointer;
	color: ${Colors.black[100]};
	font-size: 1.6rem;
	font-weight: 500;
	font-family: ${Fonts.heading};
`;

export const MeetingTime = styled.p`
	padding-left: 1rem;
	cursor: pointer;
	opacity: 0.5;
	font-size: 1.6rem;
	font-weight: 500;
	font-family: ${Fonts.heading};
`;

export const BlockContent = styled.div`
	display: flex;
	align-items: center;
	margin-top: 2rem;
`;

export const MeetingSubTitle = styled.p`
	margin-left: 3rem;
	opacity: 0.6;
	font-size: 1.6rem;
	font-weight: 500;
	font-family: ${Fonts.heading};
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

export const RoomBlockContent = styled.div`
	display: flex;
	align-items: center;
	margin-top: 4rem;
`;

export const RoomContent = styled.div`
	display: flex;
	margin-left: 3rem;
`;

export const ButtonBlockContent = styled.div`
	display: flex;
	margin: 2rem 0 0 3rem;
`;

export const SubButton = styled.div`
	margin-left: 1rem;
`;

export const AgendaTableContent = styled.div`
	display: flex;
	width: 140rem;
	max-width: 100%;
	margin-top: 8rem;
`;
