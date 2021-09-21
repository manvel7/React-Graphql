import styled from 'styled-components';
import { Colors } from '../../../../environment';
import { AutoComplete as BaseAutoComplete } from '../../../ui';

export const SelectPartyBlockContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[10]};
`;

export const SelectPartyInputsBlock = styled.div`
	display: flex;
	margin-top: 2.8rem;
	margin-bottom: 4.8rem;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	margin-right: 1rem;
	width: 20rem;
	max-width: 20rem;
`;

export const PageTitle = styled.h5`
	color: ${Colors.black[100]};
	margin-bottom: 1.6rem;
	font-weight: 800;
`;

export const PageTypoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;
