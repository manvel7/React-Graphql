import styled from 'styled-components';
import { Colors } from '../../../environment';

export const FileInputLabel = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
`;

export const Input = styled.input`
	display: none;
`;

export const Toggler = styled.div`
	z-index: 1000;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: ${Colors.transparent};
`;
