import styled from 'styled-components';
import { Input as defaultInput } from '../../components/ui';

export const CreateProfileContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Form = styled.form`
	width: 30rem;
	margin: 5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Input = styled(defaultInput)`
	margin-bottom: 5rem;
`;
