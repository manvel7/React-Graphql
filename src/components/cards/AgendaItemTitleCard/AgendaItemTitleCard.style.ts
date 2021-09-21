import styled from 'styled-components';
import { Colors, Shadows } from '../../../environment';

export const AgendaItemTitleCardContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 2.2rem 1.6rem;
`;

export const CardTitle = styled.p<{ exists: boolean }>`
	font-size: 1.5rem;
	font-weight: ${props => (props.exists ? 600 : 400)};
	color: ${props => (props.exists ? Colors.black[100] : Colors.typoPlaceholder)};
	margin-bottom: 0.8rem;
`;

export const CardInfoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const PopoverContainer = styled.div`
	width: auto;
	min-width: 35rem;
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	background-color: ${Colors.white};
	z-index: 100;
	border-radius: 0.5rem;
	border: 0.1rem solid ${Colors.blue[8]};
	box-shadow: ${Shadows.popovers};
`;

export const PopoverHeader = styled.div`
	padding: 1.2rem 1.6rem 1.6rem 1.6rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

export const PopoverContent = styled.div`
	padding: 1.6rem 1rem 2rem 1.6rem;
`;

export const PopoverTitle = styled.h6`
	font-size: 1.3rem;
	font-weight: 600;
	color: ${Colors.black[100]};
`;

export const PopoverText = styled.p`
	font-size: 1.3rem;
	line-height: 150%;
	color: ${Colors.gray[100]};
`;

export const PopoverTitleInput = styled.input`
	width: 100%;
	border: none;
	outline: none;
	font-size: 1.3rem;
	font-weight: 600;
	color: ${Colors.black[100]};
`;

export const PopoverDescriptionTextarea = styled.textarea`
	width: 100%;
	border: none;
	outline: none;
	font-size: 1.3rem;
	line-height: 150%;
	color: ${Colors.gray[100]};
`;
