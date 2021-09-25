import styled from 'styled-components';

import { Colors, Fonts, Shadows } from '../../../environment';
import { Icon } from '../../ui';
import {
	LightButton as BaseLightButton,
	DefaultButton as BaseDefaultButton,
	Badge as BaseBadge,
	Avatar as BaseAvatar,
	GhostButton as BaseGhoshButton
} from '../../ui';

export const GhostButton = styled(BaseGhoshButton)`
	margin: 0 3rem 2rem;
`;

export const DocumentDrawerCardContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const DrawerCardHeader = styled.div`
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

export const CardMainContent = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 2.4rem;
`;

export const CardTypoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
`;

export const LightButton = styled(BaseLightButton)`
	margin-right: 1.2rem;
`;

export const DefaultButton = styled(BaseDefaultButton)`
	margin-right: 1.2rem;
`;

export const DocTypeBadge = styled(BaseBadge)`
	margin-bottom: 1.3rem;
`;

export const Avatar = styled(BaseAvatar)`
	margin-right: 0.7rem;
`;

export const SubTitle = styled.p`
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.gray[100]};
	margin-bottom: 1.6rem;
`;
export const ValuesText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.black[100]};
	margin-bottom: 1.3rem;
`;

export const MidDarkText = styled.p`
	font-size: 1.3rem;
	font-weight: 400;
	color: ${Colors.gray[100]};
`;

export const FileInfoWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	padding: 3.2rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

export const FileIconBlock = styled.div`
	margin-right: 3.6rem;
	padding: 1.2rem;
	background-color: ${Colors.white};
	border-radius: 0.2rem;
	box-shadow: ${Shadows.dropDownMenu};
	border-top-right-radius: 2.5rem 2.5rem;
`;

export const FileInfoTitlesBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 1.5rem;
`;

export const FileInfoValuesBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const AccessMembersList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: self-start;
	padding: 2.4rem 3.2rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
	margin-bottom: 3.2rem;
`;

export const DrawerItemBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 3.2rem;
	margin-bottom: 3.6rem;
`;
