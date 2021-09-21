import styled from 'styled-components';
import { Fonts, Colors } from '../../../environment/theme';

export const BookmarkFolderListContainer = styled.div`
	width: 36rem;
	padding-top: 2rem;
`;

export const BookmarkFolderListContent = styled.div`
	display: flex;
	align-items: center;
	&:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const FolderConditionals = styled.div`
	padding-top: 1rem;
`;

export const FilderIcon = styled.div``;

export const FolderUpdatedAt = styled.p`
	font-size: 1.4rem;
	font-weight: 400;
	opacity: 0.5;
	margin-left: 1rem;
	color: #0d192c;
`;

export const FolderName = styled.span`
	font-size: 1.5rem;
	font-weight: 600;
	font-family: ${Fonts.paragraph};
	color: ${Colors.black[100]};
	padding: 0;
	margin: 1rem;
`;
