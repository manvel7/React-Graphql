import styled from 'styled-components';

import { Colors, Fonts } from '../../../environment';
import { Icon } from '../../ui';
import { LightButton as BaseLightButton, DefaultButton as BaseDefaultButton } from '../../ui';

export const MemberDrawerCardContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const MemberDrawerCardHeader = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2.5rem 3rem;
`;

export const CardTitleBlock = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const CardHeaderTitle = styled.h5`
	font-weight: 600;
	margin-bottom: 0.2rem;
`;

export const CardHeaderCommitteeBlock = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.2rem;
`;

export const CardHeaderCommitteeIcon = styled(Icon)`
	margin-right: 0.4rem;
`;

export const CardHeaderActionsBlock = styled.div`
	display: flex;
	margin-bottom: 2.3rem;
`;

export const NavTabContainer = styled.ul`
	display: flex;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
	justify-content: space-between;
`;

interface NavTabItemProps {
	active: boolean;
}

export const NavTabItem = styled.li<NavTabItemProps>`
	width: 50%;
	text-align: center;
	float: left;
	list-style: none;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	font-weight: 500;
	color: ${props => (props.active ? Colors.black[100] : Colors.typoPlaceholder)};
	padding: 1.4rem 2.45rem;
	cursor: pointer;
	border-bottom: 0.1rem solid ${props => (props.active ? Colors.blue[100] : Colors.transparent)};

	:hover {
		color: ${Colors.black[100]};
	}
`;

export const DropdownItemIcon = styled(Icon)`
	margin-right: 1.2rem;
`;

export const CardMainContent = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 2.4rem;
`;

export const CardTypoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-right: 2rem;
	margin-bottom: 0;
`;

export const LightButton = styled(BaseLightButton)`
	margin-right: 1.2rem;
`;

export const DefaultButton = styled(BaseDefaultButton)`
	margin-right: 1.2rem;
`;
