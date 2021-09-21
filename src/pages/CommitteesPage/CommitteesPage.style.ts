import styled from 'styled-components';

import { PrimaryButton as BasePrimaryButton } from '../../components/ui';

export const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
`;

export const CommitteesList = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	height: 100%;
`;

export const PageFooter = styled.div`
	padding: 2rem;
	display: flex;
	align-items: center;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 1.6rem;
`;
