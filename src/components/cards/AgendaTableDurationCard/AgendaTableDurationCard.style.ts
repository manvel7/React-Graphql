import styled from 'styled-components';
import { Fonts, Colors } from '../../../environment';

export const AgendaTableDurationCardContainer = styled.div`
	width: 12rem;
	position: relative;
`;

export const Popover = styled.div`
	position: absolute;
	margin-top: 1rem;
	padding: 0.4rem 0.7rem;
	font-size: 1.3rem;
	font-family: ${Fonts.heading};
	border-radius: 0.3rem;
	background-color: ${Colors.neutralBlue[100]};
	color: ${Colors.white};
	white-space: nowrap;
`;
