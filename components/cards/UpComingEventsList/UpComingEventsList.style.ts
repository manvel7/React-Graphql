import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const UpComingCardContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 1.8rem 2.5rem;
	border-radius: 2rem;
	margin-bottom: 1.5rem;
	background-color: #fafafb;
	width: 100%;
	cursor: pointer;

	:hover {
		background-color: ${Colors.blue[6]};
	}
`;

export const CardDateContainer = styled.div`
	width: 5rem;
	height: 5rem;
	background: #ffffff;
`;

export const CardInfoContainer = styled.div`
	margin: 0 2.5rem;
	width: 40%;
`;

//TODO Change Color
export const DateHeading = styled.p`
	font-family: ${Fonts.title};
	font-size: 1.4rem;
	color: #333333;
	text-align: center;
	padding-top: 0.5rem;
	margin-bottom: 0;
`;

//TODO Change Color
export const DateSubHeading = styled.p`
	font-size: 1.3rem;
	color: #5d779d;
	text-align: center;
	padding-bottom: 1rem;
	margin-bottom: 0;
`;

export const Title = styled.p`
	font-family: ${Fonts.paragraph};
	font-size: 1.5rem;
	font-weight: 600;
	color: ${Colors.black[100]};
	margin-bottom: 0;
	@media (max-width: 1440px) {
		font-size: 1.2rem;
	}
`;

export const Time = styled.p`
	font-size: 1.3rem;
	color: #5d779d;
	margin-bottom: 0.5rem;
`;

export const CommitteeName = styled.p`
	font-size: 1.1rem;
	color: #5d779d;
	margin-bottom: 0.5rem;
`;

export const CalendarMeeting = styled.span`
	margin-left: 1rem;
	font-weight: 600;
	font-size: 1.5rem;
	font-family: ${Fonts.paragraph};
	color: ${Colors.black[100]};
`;

export const FooterBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const FolderName = styled.p`
	font-size: 1.5rem;
	margin-left: 1rem;
	opacity: 0.5;
	margin-bottom: 0;
`;

export const MeetingCount = styled.p`
	opacity: 0.5;
	margin-bottom: 0;
`;

export const CountBlock = styled.div`
	margin-left: 1rem;
`;

export const TextBlock = styled.p`
	font-size: 1.1rem;
	font-weight: 400;
	font-family: ${Fonts.paragraph};
	color: #71747a;
	margin-right: 2rem;
	margin-bottom: 0;
`;

export const SecondPartContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0 auto;
`;

export const FooterIcon = styled.div`
	margin-left: 3rem;
`;
