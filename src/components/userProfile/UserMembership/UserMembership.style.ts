import styled from 'styled-components';
import { Colors } from '../../../environment';
import { AutoComplete as BaseAutoComplete } from '../../ui';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;

	//
	min-width: 71.3rem;
	max-width: 71.3rem;
	margin-bottom: 10rem;
`;

export const PageTitle = styled.h5`
	color: ${Colors.black[100]};
	margin-bottom: 1.6rem;
	font-weight: 800;
`;

export const PageSubTitle = styled.p`
	font-weight: bold;
	color: ${Colors.black[100]};
	margin: 0 0.8rem;
`;

export const PageTypoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const AutoComplete = styled(BaseAutoComplete)`
	margin-right: 1rem;
	width: 20rem;
	max-width: 20rem;
`;

export const SelectCommitteeBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 5.2rem;
	margin-bottom: 2rem;
`;

export const CommitteeItemBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4rem;
	padding-bottom: 4.4rem;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[10]};
`;

export const CommitteeItemHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 3.2rem;
`;

export const AddCommitteBlock = styled.div`
	margin-top: 3.2rem;
`;
