import styled from 'styled-components';
import { AutoComplete as BaseAutoComplete } from '../../../ui';

export const CommitteeItemRow = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 3.2rem;
`;

export const CommitteeItemRowInputsBlock = styled.div`
	position: relative;
	display: flex;
	padding: 0 1rem;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	margin-right: 1rem;
	width: 20rem;
	max-width: 20rem;
`;
