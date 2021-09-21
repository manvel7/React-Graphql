import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

interface DotBlockProps {
	size: number;
}

export const DotBlock = styled.span<DotBlockProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${props => props.size + 'px'};
	height: ${props => props.size + 'px'};
	background-color: ${Colors.transparent};
`;

export const DotContent = styled.span`
	width: 0.2rem;
	height: 0.2rem;
	border-radius: 50%;
	background-color: ${props => props.color};
`;

export const NotificationContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem 2.4rem;
	margin: 0.4rem 0 0.6rem 0;
	border-radius: 0.4rem;
	background-color: ${Colors.neutralBlue[10]};
	margin: 2rem;
`;

export const NotificationText = styled.p`
	display: flex;
	flex: 1;
	font-size: 1.3rem;
	font-family: ${Fonts.paragraph};
	color: ${Colors.gray[100]};
`;
