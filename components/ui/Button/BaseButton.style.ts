import { Fonts, Colors } from '../../../environment';
import styled, { css } from 'styled-components';

export const ButtonContainer = styled.div`
	position: relative;
	white-space: nowrap;
`;

interface ButtonProps {
	floating: boolean;
	height: number;
	width?: number;
	rounded: boolean;
}

export const Button = styled.button<ButtonProps>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	align-self: center;
	padding-left: ${props => (props.rounded ? '2rem' : '1.2rem')};
	padding-right: ${props => (props.rounded ? '2rem' : '1.2rem')};
	border-radius: ${props => (props.rounded ? '7.4rem' : '.4rem')};
	cursor: pointer;
	outline: none;
	border: 0.1rem solid;
	height: ${props => props.height + 'px'};

	${props =>
		props.width !== undefined &&
		css`
			width: ${props.width}px;
		`};

	${props =>
		props.floating &&
		css`
			width: 100%;
		`}

	&:disabled {
		opacity: 0.3;
		cursor: default;
	}

	color: ${props => props.theme.color};
	background-color: ${props => props.theme.backgroundColor};
	border-color: ${props => props.theme.borderColor};

	&:hover {
		color: ${props => props.theme.hoverColor};
		background-color: ${props => props.theme.hoverBackgroundColor};
		border-color: ${props => props.theme.hoverBorderColor};
	}
`;

interface TitleProps {
	leftIcon?: string;
	rightIcon?: string;
	isLoading: boolean;
}

export const Title = styled.p<TitleProps>`
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	opacity: ${props => (props.isLoading ? 0 : 1)};
	margin-left: ${props => (props.leftIcon ? '1rem' : 0)};
	margin-right: ${props => (props.rightIcon ? '1rem' : 0)};
	margin-top: 1rem;
`;

export const Loader = styled.div`
	position: absolute;
`;

export const Tooltip = styled.div`
	position: absolute;
	right: 50%;
	margin-top: 1.2rem;
	padding: 0.4rem 0.7rem;
	font-size: 1.3rem;
	font-family: ${Fonts.heading};
	border-radius: 0.3rem;
	background-color: ${Colors.neutralBlue[100]};
	color: ${Colors.white};
	white-space: nowrap;
`;
