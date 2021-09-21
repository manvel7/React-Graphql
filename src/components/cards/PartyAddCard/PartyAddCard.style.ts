import styled from 'styled-components';
import { Colors } from '../../../environment';

export const PartyAddCardContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 2.4rem;
	margin-bottom: 1rem;
	border-radius: 0.8rem;
	background-color: ${Colors.white};
	cursor: pointer;

	:hover {
		background-color: ${Colors.neutralBlue[10]};
	}
`;

export const CardTitle = styled.p`
	color: ${Colors.black[100]};
`;
