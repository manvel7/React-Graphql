import styled from 'styled-components';
import { Colors } from '../../../environment/theme';

export const ArchivedEventListContainer = styled.div`
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
