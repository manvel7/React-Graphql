import styled from 'styled-components';
import { Fonts, Colors } from '../../environment';

export const OverviewContainer = styled.div`
	width: 32rem;
	padding: 0 2.5rem;
	background-color: ${Colors.white};
`;

export const OverviewTitle = styled.p`
	font-size: 1.8rem;
	font-family: ${Fonts.heading};
	font-weight: 800;
	color: ${Colors.black[100]};
	margin: 4rem 0 2rem 0;
`;

export const OverviewList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 2rem;
`;

export const OverviewListHeading = styled.p`
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	color: ${Colors.gray[100]};
	opacity: 0.8;
	margin-bottom: 2rem;
`;
