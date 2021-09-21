import styled from 'styled-components';
import { Input as BaseInput, AutoComplete as BaseAutoComplete } from '../../ui';

export const Form = styled.form`
	width: 100%;
	padding: 2rem;
`;

export const Input = styled(BaseInput)`
	margin-bottom: 1rem;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	margin-bottom: 1rem;
`;
