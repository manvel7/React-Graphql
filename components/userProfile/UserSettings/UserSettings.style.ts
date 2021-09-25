import styled from 'styled-components';
import { Colors } from '../../../environment';
import {
	LightButton as BaseLightButton,
	WarningButton as BaseWarningButton,
	DangerButton as BaseDangerButton
} from '../../ui';

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
	margin-bottom: 1.2rem;
	font-weight: 800;
`;

export const PageSubTitle = styled.p`
	font-weight: bold;
	color: ${Colors.black[100]};
	margin-bottom: 0.4rem;
`;

export const PageTypoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const LightButton = styled(BaseLightButton)`
	margin-top: 1.6rem;
`;

export const WarningButton = styled(BaseWarningButton)`
	margin-bottom: 2.2rem;
`;

export const DangerButton = styled(BaseDangerButton)`
	margin-bottom: 2.2rem;
`;

export const PageHeaderBlock = styled.div`
	display: flex;
	padding-bottom: 4rem;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[10]};
`;

export const PageSettingsBlock = styled.div`
	padding-top: 4rem;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[10]};
`;

export const PageSettingsItem = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 4rem;
`;

export const PageActionsBlock = styled.div`
	// display: flex;
	// flex-direction: column;
`;

export const PageActionsItem = styled.div`
	margin: 2rem 0;
	display: flex;
	flex-direction: column;
`;
