import styled from 'styled-components';
import { Colors } from '../../../environment';

import { GhostButton as BaseGhostButton } from '../../ui';

export const CreateCommitteeFormContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem 2.4rem 0 2.4rem;
`;

export const Form = styled.form``;

export const SelectStructureBlock = styled.div`
	padding: 2.4rem 0 4rem 0;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[10]};
`;

export const SelectItemsList = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 0.5rem;
`;

export const SelectItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.5rem;
`;

export const SelectItemTitle = styled.p`
	font-size: 1.5rem;
	font-weight: 500;
	color: ${Colors.black[100]};
	margin-left: 1.2rem;
`;

export const AccessContainer = styled.div`
	padding: 2.4rem 0 3.2rem 0;
`;

export const SubTitle = styled.p`
	font-size: 1.1rem;
	color: ${Colors.gray[100]};
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	margin-bottom: 1.6rem;
`;

export const InfoBlockWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const InfoBlock = styled.div`
	display: flex;
`;

export const InfoBlockIconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 3.2rem;
	height: 3.2rem;
	border-radius: 50%;
	background-color: ${Colors.blue[8]};
	color: ${Colors.blue[100]};
	margin-right: 0.8rem;
`;

export const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const InfoTitle = styled.p`
	font-size: 1.4rem;
	font-weight: 600;
	color: ${Colors.black[100]};
	margin-bottom: 1.3rem;
`;

export const InfoText = styled.p`
	font-size: 1.3rem;
	line-height: 1.8rem;
	color: ${Colors.typoPlaceholder};
`;

export const GhostButton = styled(BaseGhostButton)`
	margin-right: 0.8rem;
`;
