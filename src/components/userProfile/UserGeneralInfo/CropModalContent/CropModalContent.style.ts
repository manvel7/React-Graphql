import styled from 'styled-components';
import { Colors, Fonts } from '../../../../environment';

export const CropModalContentWrapper = styled.div``;

export const FileInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const FileInput = styled.input`
	display: none;
`;

export const FileInputLabel = styled.label`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 12rem;
	height: 12rem;
	border: 0.1rem dashed ${Colors.overlay[40]};
	padding: 2rem;
	border-radius: 1rem;
	font-size: 1.4rem;
	letter-spacing: 0.1rem;
	font-family: ${Fonts.heading};
	color: ${Colors.typoPlaceholder};
	background-color: ${Colors.transparent};
	transition: 0.3s;

	& :hover {
		background-color: ${Colors.overlay[3]};
	}
`;

export const CropContainer = styled.div`
	position: relative;
	width: 50rem;
	height: 30rem;
	margin: 2rem 0;
`;

export const ImagePreviewContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 20rem;
	padding: 2rem;
`;

export const ImagePreviewBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 20rem;
`;

export const ImagePreview = styled.img`
	width: 15rem;
	heigth: 15rem;
	border-radius: 50%;
`;
