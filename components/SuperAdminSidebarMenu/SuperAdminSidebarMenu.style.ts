import styled from 'styled-components';
import { Colors, Fonts } from '../../environment';
import { NavLink as Link } from 'react-router-dom';
import { GhostButton } from '../ui';

export const SidebarContainer = styled.div`
	display: flex;
`;

export const NavigationContainer = styled.nav`
	width: 22rem;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 2.5rem 0;
	background-color: #f2f3f5;
`;

export const NavBar = styled.ul`
	width: 100%;
`;

interface NavItemProps {
	withMarginBottom?: boolean;
}

export const NavItem = styled.li<NavItemProps>`
	margin-bottom: ${props => (props.withMarginBottom ? '2rem' : '.4rem')};
	list-style-type: none;
`;

//TODO Change Color
export const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	padding: 0.6rem 0 0.6rem 3rem;
	margin: 0.1rem;
	color: rgba(93, 119, 157, 0.8);
	border-left: 0.2rem solid ${Colors.transparent};
	text-decoration: none;
	cursor: pointer;

	:hover {
		color: ${Colors.blue[100]};
	}

	&.active {
		color: ${Colors.blue[100]};
		border-left: 0.2rem solid ${Colors.blue[100]};
	}
`;

export const LinkIcon = styled.div``;

export const LinkTitle = styled.p`
	font-family: ${Fonts.heading};
	font-size: 1.5rem;
	margin: 0 1rem;
`;

export const LogoutButton = styled(GhostButton)`
	padding-left: 3rem;
`;
