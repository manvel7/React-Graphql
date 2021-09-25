import styled from 'styled-components';
import { Colors } from '../../../environment';

interface DraggableItemProps {
	isDragging: boolean;
}

export const DraggableItem = styled.div<DraggableItemProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	margin-bottom: 1rem;
	background-color: ${props => (props.isDragging ? Colors.gray[50] : Colors.white)};
`;

export const DraggableHandle = styled.div`
	width: 10rem;
`;

export const DraggableName = styled.div`
	text-align: left;
`;

export const DraggableKind = styled.div`
	text-align: left;
`;

export const DraggableCheck = styled.div`
	text-align: center;
	width: 10rem;
	padding: 1rem;
`;

export const DraggableIconContainer = styled.div`
	width: 30rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const FileIconContainer = styled.div`
	width: 6rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const IconImage = styled.img`
	width: 5rem;
	margin: 1rem;
`;

export const FileDragContainer = styled.div`
	width: 20rem;
	cursor: pointer;
`;

interface FileDropZone {
	active: boolean;
}

export const FileDropZone = styled.div<FileDropZone>`
	padding: 1rem;
	outline: none;
	border: 0.2rem dashed ${props => (props.active ? Colors.blue[100] : Colors.gray[50])};
`;

export const FileDropInput = styled.input``;

export const FileDropText = styled.p``;
