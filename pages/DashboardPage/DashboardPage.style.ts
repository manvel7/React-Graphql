import styled from 'styled-components';
import { Colors, Fonts, Shadows } from '../../environment';

export const DashboardPageContainer = styled.div`
	width: 100%;
	padding: 6.6rem 4rem 1.2rem 4rem;
	background-color: #fafafb;
	overflow: scroll;

	@media (max-width: 1440px) {
		flex-direction: column;
	}
`;

export const DashboardHeaderTitle = styled.p`
	opacity: 0.5;
`;

export const DashboardPageHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const UserBlock = styled.div`
	display: flex;
	align-items: center;
	margin-top: 3rem;
`;

export const UserName = styled.h4`
	margin-left: 2rem;
	font-weight: 800;
	font-size: 2.8rem;
	color: ${Colors.black[100]};
	font-family: ${Fonts.title};
	padding-top: 1rem;
`;

export const ActionBlock = styled.div`
	display: flex;
	align-items: center;
	margin-top: 3rem;
`;

export const ActionBlockButton = styled.div`
	margin-left: 1rem;
`;

export const SettingsIcon = styled.div`
	margin-left: 8rem;
`;

export const DashboardCardContent = styled.div``;

export const DashboardContentHeaderPart = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 102%;
`;

export const NavBarItemDashboardPage = styled.div`
	display: flex;
	flex-direction: row-reverse;
	margin-top: -4rem;
`;

export const CardPopoverContainer = styled.div`
	background-color: ${Colors.white};
	border-radius: 0.4rem;
	box-shadow: ${Shadows.dropDownMenu};
	z-index: 100;
	position: fixed;
	right: 4rem;
	bottom: 5rem;
`;
