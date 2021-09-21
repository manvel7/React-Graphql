import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const BookmarksDocumentContainer = styled.div``;

export const BookmarksDocumentContent = styled.div`
	display: flex;
	justify-content: space-between;
	width: 90rem;
	align-items: center;
`;

export const LeftBarDocument = styled.div`
	display: flex;
	width: 45%;
	&:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const RightBarDocument = styled.div`
	display: flex;
	width: 45%;
	&:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const DocumentTime = styled.p`
	font-size: 1.4rem;
	font-weight: 400;
	font-family: ${Fonts.paragraph};
	opacity: 0.5;
`;

export const DocumentContent = styled.div`
	margin-top: 1rem;
`;

export const DocTitle = styled.span`
	font-size: 1.5rem;
	font-weight: 600;
	font-family: ${Fonts.paragraph};
	color: ${Colors.black[100]};
`;

export const HeaderCradBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const ButtonLeftBar = styled.div`
	margin-left: 1rem;
`;
