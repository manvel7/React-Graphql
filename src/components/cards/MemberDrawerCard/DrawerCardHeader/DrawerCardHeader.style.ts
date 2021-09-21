import styled from 'styled-components';
import { PrimaryButton as BasePrimaryButton, LightButton as BaseLightButton } from '../../../ui';
import { Colors } from '../../../../environment';

export const DrawerCardHeaderContainer = styled.div`
	display: flex;
	padding: 2.5rem 3rem;
`;

export const CardHeaderAvatarBlock = styled.div`
	margin-right: 3rem;
`;

export const CardHeaderInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardHeaderInfoTitle = styled.h5`
	font-weight: 600;
	margin-bottom: 0.2rem;
`;

export const CardHeaderInfoItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.2rem;
	padding: 0.2rem 0;
`;

export const CardHeaderActionsBlock = styled.div`
	display: flex;
	margin-top: 2.4rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-right: 0.8rem;
`;

export const LightButton = styled(BaseLightButton)`
	margin-right: 0.8rem;
`;

export const CardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.neutralBlue[100]};
	margin-right: 0.4rem;
	margin-bottom: 0.2rem;
`;

export const CardTypoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-right: 0.4rem;
	margin-bottom: 0.2rem;
`;

export const CardLinkText = styled.p`
	font-size: 1.2rem;
	color: ${Colors.blue[100]};
	margin-right: 0.4rem;
	margin-bottom: 0.2rem;
	cursor: pointer;
`;
