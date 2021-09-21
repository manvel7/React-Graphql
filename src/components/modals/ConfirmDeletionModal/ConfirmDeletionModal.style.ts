import styled from 'styled-components';
import { Colors } from '../../../environment';

export const DeleteModelWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	padding: 0 7rem;
`;

export const ModalTytle = styled.div`
	font-family: 'SF Pro Display Regular', 'Open Sans', -apple-system, sans-serif;
	font-size: 2.5rem;
	margin-bottom: 2rem;
`;

export const HightlightedWord = styled.span`
	color: ${Colors.red[100]};
`;
export const ActionButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 3rem;
`;
