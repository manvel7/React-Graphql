import styled from 'styled-components';
import { Colors } from '../../../environment';
import { SwitchSizes } from './Switch';

export const SwitchContainer = styled.div``;

export const SwitchInput = styled.input`
	height: 0;
	width: 0;
	visibility: hidden;
`;

interface SwitchLabelProps {
	checked: boolean;
	disabled: boolean;
	size: SwitchSizes;
}

export const SwitchLabel = styled.label<SwitchLabelProps>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	width: ${props => (props.size === SwitchSizes.SM ? '2.8rem' : '4rem')};
	height: ${props => (props.size === SwitchSizes.SM ? '1.6rem' : '2.4rem')};
	background-color: ${props => (props.checked ? Colors.blue[100] : Colors.gray[60])};
	border-radius: ${props => (props.size === SwitchSizes.SM ? '1rem' : '2rem')};
	transition: background-color 0.2s;
	opacity: ${props => props.disabled && 0.3};
`;

interface SwitchButtonProps {
	checked: boolean;
	size: SwitchSizes;
}

export const SwitchButton = styled.span<SwitchButtonProps>`
	content: '';
	position: absolute;
	left: ${props => (props.checked ? 'calc(100% - .2rem)' : '.2rem')};
	width: ${props => (props.size === SwitchSizes.SM ? '1.2rem' : '2rem')};
	height: ${props => (props.size === SwitchSizes.SM ? '1.2rem' : '2rem')};
	border-radius: 50%;
	transition: 0.2s;
	background: ${Colors.white};

	${props => props.checked && 'transform: translateX(-100%);'}
`;
