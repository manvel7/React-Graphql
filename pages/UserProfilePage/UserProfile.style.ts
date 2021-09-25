import styled from 'styled-components';

import {
	PrimaryButton as BasePrimaryButton,
	LightButton as BaseLightButton,
	Badge as BaseBadge,
	Icon
} from '../../components/ui';
import { Colors, Fonts } from '../../environment';

export const PageWrapper = styled.div`
	width: 100%;
	position: relative;
`;

export const PageTopBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2rem 2.4rem;
`;

export const PageTopBarItem = styled.div`
	display: flex;
	align-items: center;
`;

export const DropdownIcon = styled(Icon)`
	margin-right: 1.2rem;
`;

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0.2rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 0.8rem;
	margin-right: 2.6rem;
`;

export const LightButton = styled(BaseLightButton)`
	margin-left: 0.8rem;
`;

export const UserCardContainer = styled.div`
	display: flex;
	width: 100%;
	padding: 2.4rem;
`;

export const UserCardAvatarBlock = styled.div``;

export const UserCardInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 2.6rem;
`;

export const UserCardInfoTitle = styled.h4`
	color: ${Colors.black[100]};
	margin-bottom: 1.2rem;
`;

export const UserCardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 0.5rem;
`;

export const PageNavContainer = styled.ul`
	display: flex;
	padding: 0 2.4rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

export const PageNavContent = styled.div`
	width: 100%;
	padding-top: 5rem;
	display: flex;
	justify-content: center;

	height: calc(100vh - 36.8rem);
	overflow-y: scroll;
`;

interface PageNavItemProps {
	active: boolean;
}

export const PageNavItem = styled.li<PageNavItemProps>`
	float: left;
	list-style: none;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	font-weight: 500;
	color: ${props => (props.active ? Colors.black[100] : Colors.typoPlaceholder)};
	padding: 1.95rem 2.45rem;
	cursor: pointer;
	border-bottom: 0.1rem solid ${props => (props.active ? Colors.blue[100] : Colors.transparent)};

	:hover {
		color: ${Colors.black[100]};
	}
`;

export const Badge = styled(BaseBadge)`
	margin-bottom: 0.5rem;
`;
