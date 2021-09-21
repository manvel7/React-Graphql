import styled from 'styled-components';
import { Fonts, Colors } from '../../../environment';
import { ModalSizes } from './Modal';

export const ModalBackground = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: ${Colors.modalBackgroundColor};
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

interface ModalContainerProps {
	size: ModalSizes;
	height: string;
}

export const ModalContainer = styled.div<ModalContainerProps>`
	position: relative;
	z-index: 10;
	width: ${props =>
		(props.size === ModalSizes.XS && '46rem') ||
		(props.size === ModalSizes.SM && '55rem') ||
		(props.size === ModalSizes.MD && '64rem') ||
		(props.size === ModalSizes.LG && '80rem') ||
		(props.size === ModalSizes.XL && '98rem')};
	height: ${props => props.height};
	background-color: ${Colors.white};
	border-radius: 0.8rem;
	outline: 0;
	display: flex;
	flex-direction: column;
	margin: 8rem auto 0;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
	padding: 2.5rem;
	margin-bottom: 0.8rem;
`;

export const HeaderLeftIcon = styled.div`
	font-size: 2.5rem;
	font-family: ${Fonts.title};
	cursor: pointer;
	margin-right: 2rem;
`;

export const HeaderTitle = styled.h5`
	font-weight: 500;
	color: ${Colors.black[100]};
	margin-bottom: 0;
`;

export const HeaderRightIcon = styled.div`
	font-size: 2.5rem;
	font-family: ${Fonts.title};
	color: ${Colors.gray[50]};
	position: absolute;
	right: 2.5rem;
	top: 2.5rem;
	cursor: pointer;
`;

interface ModalBodyProps {
	withoutScroll?: boolean;
}

export const ModalBody = styled.div<ModalBodyProps>`
	display: flex;
	justify-content: center;
	flex: 1 1 auto;
	overflow-y: ${props => (props.withoutScroll ? 'visiable' : 'scroll')};

	::-webkit-scrollbar {
		width: 0.4rem;
	}
	::-webkit-scrollbar-thumb {
		background: ${Colors.gray[50]};
		opacity: 0.2;
		border-radius: 1rem;
	}
	::-webkit-scrollbar-thumb:hover {
		background: ${Colors.gray[80]};
	}
`;

export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-top: 0.1rem solid ${Colors.gray[7]};
	padding: 1.6rem 3.2rem;
`;
