import styled from 'styled-components';

import { Colors } from '../../../environment';
import { Icon as BaseIcon } from '../Icon';

export const CheckboxContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CheckboxLabel = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

export const Icon = styled(BaseIcon)``;

interface CheckboxProps {
	checked: boolean;
	disabled?: boolean;
}

export const StyledCheckbox = styled.div<CheckboxProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.8rem;
	height: 1.8rem;
	background: ${props => (props.checked ? Colors.blue[80] : Colors.transparent)};
	border: 0.1rem solid;
	border-color: ${props => (props.checked ? Colors.blue[80] : Colors.neutralBlue[40])};
	border-radius: 0.2rem;
	transition: all 150ms;
	opacity: ${props => props.disabled && 0.3};

	&:hover {
		border-color: ${Colors.blue[100]};
	}
`;

export const CheckboxTextLabel = styled.p<CheckboxProps>`
	font-size: 1.4rem;
	color: ${props => (props.checked ? Colors.gray[100] : Colors.typoPlaceholder)};
	margin-left: 1.6rem;
	margin-bottom: 0;
`;
