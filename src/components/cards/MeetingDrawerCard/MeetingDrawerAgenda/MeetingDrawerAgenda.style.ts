import styled from 'styled-components';
import { Colors } from '../../../../environment';

export const MeetingDrawerAgendaContainer = styled.div`
    width: 100%
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
`;

export const CardSubTitle = styled.p`
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 1.6rem;
`;

export const MeetingDrawerAgendaList = styled.div`
	display: flex;
	flex-direction: column;
`;
