import styled from 'styled-components';
import { Colors, Fonts, Shadows } from '../../../environment';
import { SelectSize } from './Select';

export const SelectContainer = styled.div`
	position: relative;
`;

interface SelectButtonProps {
	open: boolean;
	disabled: boolean;
	size: SelectSize;
}

export const SelectButton = styled.button<SelectButtonProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: ${Colors.typoPlaceholder};
	background-color: transparent;
	border: 0.1rem solid ${props => (props.open ? Colors.primaryBtnHover : Colors.neutralBlue[20])};
	border-radius: 0.4rem;
	cursor: pointer;
	outline: none;
	transition: all 0.2s;
	width: 100%;
	white-space: nowrap;
	opacity: ${props => props.disabled && 0.3};
	padding: ${props =>
		(props.size === SelectSize.SM && '.1rem .8rem;') ||
		(props.size === SelectSize.MD && '.3rem .4rem;') ||
		(props.size === SelectSize.LG && '.7rem .4rem;') ||
		(props.size === SelectSize.XL && '1rem .4rem;')};

	&:hover {
		background-color: ${Colors.neutralBlue[2]};
		border-color: ${Colors.primaryBtnHover};
		color: ${Colors.blue[100]};
	}
`;

export const SelectButtonTitle = styled.p`
	font-size: 1.4rem;
	color: ${Colors.gray[100]};
	padding: 0 0.8rem;
`;

interface SelectMenuProps {
	open: boolean;
}

export const SelectMenu = styled.div<SelectMenuProps>`
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	min-width: 100%;
	overflow-y: overlay;
	border-radius: 0.5rem;
	margin: 1rem 0 0 0;
	padding: 0.8rem;
	z-index: 10;
	background-color: ${Colors.white};
	box-shadow: ${Shadows.dropDownMenu};
`;

interface SelectItemProps {
	disabled?: boolean;
}

export const SelectItem = styled.div<SelectItemProps>`
	display: flex;
	align-items: center;
	white-space: nowrap;
	cursor: pointer;
	padding: 0.8rem;
	font-size: 1.3rem;
	color: ${Colors.gray[100]};
	font-family: ${Fonts.paragraph};
	pointer-events: ${props => props.disabled && 'none'};
	opacity: ${props => props.disabled && 0.3};
	border-radius: 0.4rem;

	&:hover {
		color: ${Colors.blue[100]};
		background-color: ${Colors.blue[8]};
	}
`;
