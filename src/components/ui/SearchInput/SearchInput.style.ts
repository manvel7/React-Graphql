import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const SearchInputContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const ToggleButton = styled.button`
	border: none;
	outline: none;
	display: flex;
	align-items: center;
	padding: 0.2rem 0.8rem;
	// width: 12rem;
	cursor: pointer;
	color: ${Colors.typoPlaceholder};
	background-color: ${Colors.transparent};
	opacity: 0.8;
	font-size: 1.3rem;
	font-family: ${Fonts.heading};

	:hover {
		color: ${Colors.gray[100]};
	}
`;

export const TextSearchWrapper = styled.div`
	display: flex;
	align-items: center;
	padding-left: 0.8rem;
`;

export const SearchField = styled.input`
	border: none;
	outline: none;
	width: 15rem;
	font-size: 1.3rem;
	font-family: ${Fonts.heading};
	color: ${Colors.black[100]};
	background-color: transparent;

	placeholder: {
		color: ${Colors.typoPlaceholder};
		opacity: 0.8;
	}
`;
