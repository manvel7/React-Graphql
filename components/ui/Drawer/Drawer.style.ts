import styled, { css } from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const DrawerBackground = styled.div<{ open: boolean }>`
	${props =>
		props.open
			? css`
					width: 100%;
					height: 100%;
					position: absolute;
					// background-color: ${Colors.modalBackgroundColor};
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
			  `
			: css`
					width: 0;
					height: 0;
			  `};
`;

export const DrawerContainer = styled.div<{ open: boolean }>`
	display: flex;
	overflow-y: auto;
	justify-content: flex-end;
	width: 100rem;
	height: 100vh;
	z-index: 100;

	position: fixed;
	right: 0;
	top: 0;
	bottom: 0;

	transition: transform 0.3s ease-out;
	transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};
`;

export const DrawerContentBlock = styled.div`
	flex: 0 0 50%;
	height: 100%;
	background-color: ${Colors.lightColorWhite};
`;

export const DrawerHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.2rem 2rem 1rem 3rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
	background-color: ${Colors.lightColorWhite};
`;

export const DrawerTitle = styled.p`
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
`;

export const DrawerContent = styled.div`
	background-color: ${Colors.lightColorWhite};
	box-shadow: 0px 10px 20px rgba(33, 9, 9, 0.05);
	min-height: 100%;
`;
