import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const PageContent = styled.section`
	width: 100%;
	overflow-y: scroll;
	height: 100vh;
`;

export const CreateFolderContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: ${Colors.gray[10]};
	width: 60%;
	margin: 2rem auto;
	padding: 2rem;
	border-radius: 1rem;
`;

export const CreateFolderTitle = styled.p`
	position: absolute;
	top: 0.5rem;
	left: 1rem;
	font-family: ${Fonts.heading};
	color: ${Colors.gray[100]};
`;

export const CreateFolderElement = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
`;

export const FolderIconInput = styled.input`
	display: none;
`;

export const FolderIconInputLabel = styled.label`
	display: inline-block;
	border: 0.1rem solid ${Colors.gray[50]};
	cursor: pointer;
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	padding: 1rem;
`;
