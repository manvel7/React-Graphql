import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';
import {
	PrimaryButton as BasePrimaryButton,
	LightButton as BaseLightButton
} from '../../../components/ui';

export const PageTopBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2rem 2.4rem 1.2rem 4rem;
`;

export const PageTopBarItem = styled.div`
	display: flex;
	align-items: center;
`;

export const BreadcrumbBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 0.4rem 0;
`;

export const BreadcrumbItem = styled.div`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.typoPlaceholder};
	margin: 0 0.6rem;
`;

export const BreadcrumbDivider = styled.div``;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 0.8rem;
	margin-right: 2.6rem;
`;

export const LightButton = styled(BaseLightButton)`
	margin-left: 0.8rem;
`;
