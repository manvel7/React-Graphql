import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { Fonts, Colors } from '../../environment';
import { PrimaryButton as BasePrimaryButton } from '../../components/ui';

export const CommiteeSettingsPageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
`;

export const NavTabsBlock = styled.ul`
	display: flex;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
	margin-bottom: 2.4rem;
`;

export const NavTab = styled.li`
	display: flex;
	float: left;
	list-style: none;
`;

export const NavLink = styled(Link)`
	text-decoration: none;
	font-family: ${Fonts.heading};
	font-size: 1.5rem;
	font-weight: 500;
	color: ${Colors.typoPlaceholder};
	cursor: pointer;
	border-bottom: 0.1rem solid ${Colors.transparent};
	padding: 1.9rem 2.45rem;

	&.active {
		color: ${Colors.black[100]};
		border-bottom: 0.1rem solid ${Colors.blue[100]};
	}
`;

export const CommitteeDetailsContainer = styled.div`
	overflow-y: scroll;
	height: calc(100% - 16.2rem);
	padding: 0 2rem;
	display: flex;
`;

export const PageTopBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.4rem 2.4rem;
`;

export const PageTopBarItem = styled.div`
	display: flex;
	align-items: center;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-right: 2.4rem;
`;
