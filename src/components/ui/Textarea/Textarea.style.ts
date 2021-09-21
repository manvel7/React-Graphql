import styled from 'styled-components';

import { Colors, Fonts } from '../../../environment';

export const Container = styled.div`
	width: 100%;
	position: relative;
	margin-botton: 3rem;
`;

export const Label = styled.label`
	font-family: ${Fonts.heading};
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	color: ${Colors.typoPlaceholder};
	position: absolute;
	top: 1.2rem;
	left: 1.2rem;
	pointer-events: none;
`;

interface TextareaProps {
	invalid: boolean;
	focus: boolean;
	withLabel: boolean;
}

export const BaseTextarea = styled.textarea<TextareaProps>`
	resize: none;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	width: 100%;
	min-width: 28rem;
	color: ${Colors.black[100]};
	background-color: ${Colors.white};

	padding: ${props => (props.withLabel ? '3.6rem 1.2rem 1.4rem 1.2rem' : '1.4rem 1.2rem')};
	border: 0.1rem solid;
	border-radius: 0.4rem;
	outline: 0;

	::placeholder {
		font-size: 1.4rem;
		color: ${Colors.overlay[40]};
	}

	border-color: ${props =>
		props.invalid ? Colors.red[100] : props.focus ? Colors.blue[100] : Colors.neutralBlue[40]};

	:hover {
		border-color: ${props => !props.focus && Colors.neutralBlue[80]};
	}
`;

export const ErrorLabel = styled.span`
	display: flex;
	max-width: fit-content;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	color: ${Colors.red[100]};
	padding: 1rem 1.2rem 0;
`;

interface HelpTextProps {
	direction: 'start' | 'end';
}

export const HelpText = styled.span<HelpTextProps>`
	// position: absolute;
	display: flex;
	justify-content: ${props => `flex-${props.direction}`};
	max-width: 100%;
	font-family: ${Fonts.paragraph};
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	padding: 0.5rem 0 0 1rem;
`;
