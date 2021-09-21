import styled from 'styled-components';
import { Colors } from '../../../environment';
import { Switch as BaseSwitch } from '../../ui';

export const HighSecurityContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const PageTitle = styled.h4`
	font-weight: 800;
	color: ${Colors.black[100]};
	margin-bottom: 4rem;
`;

export const ComponentBlock = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 3.2rem;
	margin-bottom: 3.2rem;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[20]};
`;

export const InfoBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Heading = styled.h6`
	font-weight: 600;
	font-size: 1.5rem;
	color: ${Colors.black[100]};
	margin-bottom: 0.8rem;
`;

export const InfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	line-height: 130%;
`;

export const Switch = styled(BaseSwitch)`
	margin-left: 3rem;
`;
