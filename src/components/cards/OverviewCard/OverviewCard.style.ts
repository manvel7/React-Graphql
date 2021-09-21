import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const OverviewCardContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 1.8rem 2.5rem;
	border-radius: 2rem;
	background-color: ${Colors.blue[6]};
	margin-bottom: 1.5rem;
	width: 28.5rem;
	cursor: pointer;
`;

export const CardDateContainer = styled.div``;

export const CardInfoContainer = styled.div`
	margin: 0 2.5rem;
`;

//TODO Change Color
export const DateHeading = styled.p`
	font-family: ${Fonts.title};
	font-size: 1.4rem;
	color: #333333;
	margin-left: 0.5rem;
`;

//TODO Change Color
export const DateSubHeading = styled.p`
	font-size: 1.3rem;
	color: #5d779d;
	margin-top: -1rem;
`;

export const Title = styled.p`
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	color: ${Colors.black[100]};
	margin-bottom: 0rem;
`;

export const Time = styled.p`
	font-size: 1.3rem;
	color: #5d779d;
	margin-bottom: 0rem;
`;

export const CommitteeName = styled.p`
	font-size: 1.1rem;
	color: #5d779d;
	margin-bottom: 0.5rem;
`;
