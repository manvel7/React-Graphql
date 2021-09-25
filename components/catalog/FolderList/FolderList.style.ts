import styled from 'styled-components';
import { Colors } from '../../../environment';

interface DroppableContainerProps {
	isDraggingOver: boolean;
}

export const DroppableContainer = styled.div<DroppableContainerProps>`
	margin: 2rem auto;
	background-color: ${props => (props.isDraggingOver ? Colors.blue[8] : Colors.gray[10])};
	padding: 2rem;
	width: 80%;
`;

export const DeleteFoldersContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 1rem auto;
	width: 80%;
`;
