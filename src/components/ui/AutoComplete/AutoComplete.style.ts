import styled, { css } from 'styled-components';

import { Colors, Fonts, Shadows } from '../../../environment';
import { AutoCompletePositions } from './AutoComplete';

export const AutoCompleteContainer = styled.div`
	position: relative;
	width: 100%;
`;

interface InputContainerProps {
	disabled: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
	position: relative;
	cursor: pointer;

	${props =>
		props.disabled &&
		css`
			pointer-events: none;
			opacity: 0.3;
		`}

	&:hover {
		color: ${Colors.blue[80]};
	}
`;

export const Label = styled.label`
	font-family: ${Fonts.heading};
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	color: ${Colors.gray[50]};
	position: absolute;
	top: 1.2rem;
	left: 1.2rem;
	pointer-events: none;
`;

interface InputProps {
	withLabel: boolean;
	open: boolean;
	invalid: boolean;
}

export const Input = styled.input<InputProps>`
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	width: 100%;
	color: ${Colors.black[100]};
	background-color: ${Colors.white};
	cursor: pointer;

	padding: ${props => (props.withLabel ? '3.6rem 1.2rem 1.4rem 1.2rem' : '1.4rem 1.2rem')};
	border: 0.1rem solid;
	border-color: ${props =>
		props.invalid ? Colors.red[100] : props.open ? Colors.blue[80] : Colors.neutralBlue[20]};
	border-radius: 0.4rem;
	outline: 0;

	::placeholder {
		font-size: 1.4rem;
		color: ${Colors.gray[50]};
	}

	:hover {
		border-color: ${props => !props.invalid && Colors.blue[80]};
	}
`;

export const InputIconBlock = styled.div`
	position: absolute;
	right: 0.8rem;
	top: 50%;
	transform: translateY(-50%);
`;

export const ErrorLabel = styled.span`
	// position: absolute;
	display: flex;
	max-width: 100%;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	color: ${Colors.red[100]};
	padding: 0.5rem 0 0 1rem;
`;

interface AutoCompleteMenuProps {
	position: AutoCompletePositions;
}

export const AutoCompleteMenu = styled.div<AutoCompleteMenuProps>`
	position: absolute;
	${props =>
		props.position === AutoCompletePositions.Left
			? css`
					left: 0;
			  `
			: css`
					right: 0;
			  `}
	display: flex;
	flex-direction: column;
	min-width: 100%;
	border-radius: 0.5rem;
	margin: 1rem 0 5rem 0;
	padding: 0.5rem;
	z-index: 1000;
	background-color: ${Colors.white};
	box-shadow: ${Shadows.dropDownMenu};

	max-height: 40rem;
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 0.4rem;
	}

	::-webkit-scrollbar-track {
	}

	::-webkit-scrollbar-thumb {
		background-color: ${Colors.primaryColor};
		border-radius: 1rem;
	}
`;

interface AutoCompleteItemProps {
	disabled?: boolean;
}

export const AutoCompleteItem = styled.div<AutoCompleteItemProps>`
	display: flex;
	align-items: center;
	white-space: nowrap;
	cursor: pointer;
	padding: 0.8rem 0.9rem;
	font-size: 1.4rem;
	color: ${Colors.gray[100]};
	font-family: ${Fonts.heading};
	pointer-events: ${props => props.disabled && 'none'};
	opacity: ${props => props.disabled && 0.3};
	border-radius: 0.4rem;

	&:hover {
		color: ${Colors.blue[100]};
		background-color: ${Colors.blue[8]};
	}
`;

export const SearchBlock = styled.div`
	padding: 0.6rem 0 0.8rem 0;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

export const TextSearchWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 4rem;
`;

export const SearchLoaderContainer = styled.div`
	min-width: 2.4rem;
	width: 2.4rem;
	height: 2.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SearchField = styled.input`
	border: none;
	outline: none;
	width: 100%;
	font-size: 1.3rem;
	font-family: ${Fonts.heading};
	color: ${Colors.black[100]};
	background-color: transparent;

	placeholder: {
		color: ${Colors.typoPlaceholder};
		opacity: 0.8;
	}
`;

export const ResultBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 0.8rem 1.5rem;
	font-family: ${Fonts.heading};
	font-size: 1.2rem;
	color: ${Colors.black[100]};
	border-top: 0.1rem solid ${Colors.dividerLight};
`;

export const NoResultsBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3.2rem;
`;

export const NoResulText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.gray[100]};
`;

export const NoResultInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
`;
