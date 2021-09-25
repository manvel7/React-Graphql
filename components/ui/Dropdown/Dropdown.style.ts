import styled, { css } from 'styled-components';
import { Colors, Fonts, Shadows } from '../../../environment';
import { Icon } from '../Icon';

interface DropDownContainerProps {
	floating: boolean;
}

export const DropDownContainer = styled.div<DropDownContainerProps>`
	position: relative;
	${props =>
		props.floating &&
		css`
			width: 100%;
		`};
`;

interface DropdownProps {
	open: boolean;
	floating: boolean;
}

export const DropDownButton = styled.button<DropdownProps>`
	display: flex;
	align-items: center;
	justify-content: ${props => (props.floating ? 'flex-start' : 'center')};
	color: ${props => (props.open ? Colors.blue[100] : Colors.gray[100])};
	background-color: ${props => (props.open ? Colors.ghostBtnBgColor : Colors.transparent)};
	border: none;
	border-radius: 0.4rem;
	cursor: pointer;
	outline: none;
	padding: 0.2rem;
	transition: all 0.2s;
	width: 100%;

	&:hover {
		background-color: ${Colors.ghostBtnBgColor};
		color: ${Colors.blue[100]};
	}
`;

export const ButtonTitle = styled.p`
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	margin-top: 1rem;
`;

export const ButtonTitleBold = styled.p`
	font-family: ${Fonts.paragraph};
	font-weight: 600;
	font-size: 1.4rem;
	color: ${Colors.black[100]};
	text-transform: capitalize;
	margin: 0 0.4rem;
`;

interface DropdownMenuProps {
	open: boolean;
	position: string;
}

export const DropdownMenu = styled.ul<DropdownMenuProps>`
	position: absolute;
	${props => `${props.position}: 0`};
	display: flex;
	flex-direction: column;
	min-width: 100%;
	overflow-y: overlay;
	border-radius: 0.5rem;
	margin: 1rem 0 0 0;
	padding: 0.8rem 0;
	z-index: 10;
	background-color: ${Colors.white};
	box-shadow: ${Shadows.dropDownMenu};
`;

interface DropdownItemProps {
	disabled?: boolean;
	type?: string;
}

export const DropdownItem = styled.li<DropdownItemProps>`
	display: flex;
	align-items: center;
	white-space: nowrap;
	cursor: pointer;
	padding: 0.8rem;
	margin: 0 0.8rem;
	font-size: 1.3rem;
	color: ${props => (props.type === 'danger' ? Colors.red[100] : Colors.gray[100])};
	font-family: ${Fonts.paragraph};
	pointer-events: ${props => props.disabled && 'none'};
	opacity: ${props => props.disabled && 0.3};
	border-radius: 0.4rem;

	&:hover {
		color: ${props => (props.type === 'danger' ? Colors.red[100] : Colors.blue[100])};
		background-color: ${props => (props.type === 'danger' ? Colors.red[4] : Colors.blue[8])};
	}
`;

export const DopdownItemIcon = styled(Icon)`
	margin-right: 1.2rem;
`;

export const Tooltip = styled.div`
	position: absolute;
	right: 0;
	margin-top: 1.2rem;
	padding: 0.4rem 0.7rem;
	font-size: 1.3rem;
	font-family: ${Fonts.heading};
	border-radius: 0.3rem;
	background-color: ${Colors.neutralBlue[100]};
	color: ${Colors.white};
	white-space: nowrap;
`;

export const DropdownDivider = styled.div`
	height: 0.1rem;
	width: 100%;
	background-color: ${Colors.gray[10]};
	margin: 0.4rem 0;
`;

export const FileInput = styled.input`
	display: none;
`;

export const FileInputLabel = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 100%;
`;
