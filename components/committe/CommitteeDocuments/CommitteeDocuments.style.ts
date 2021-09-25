import styled from 'styled-components';
import { Colors } from '../../../environment';

export const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
`;

export const PageTitleBar = styled.div`
	display: flex;
	padding: 2.4rem 0;
`;

export const PageDocumentsContainer = styled.div``;

export const PageFilterBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.7rem 0;
	margin-bottom: 0.8rem;
`;

export const PageFilterBarTitle = styled.p`
	font-size: 1.5rem;
	font-weight: 800;
	color: ${Colors.typoPlaceholder};
`;

export const PageFoldersList = styled.div`
	display: flex;
	flex-direction: column;
`;
