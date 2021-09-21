import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { Fonts, Colors } from '../../../environment';

export const HeaderContainer = styled.header`
	height: 8.8rem;
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 2.5rem 2rem 8rem;
`;

export const HeaderLogoBlock = styled.div`
	padding: 1.5rem 6.8rem 1.3rem 2rem;
`;

export const LogoImg = styled.img``;

export const HeaderNavBlock = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const NavBar = styled.ul`
	display: flex;
	align-items: center;
`;

export const NavBarItem = styled.li`
	float: left;
	list-style: none;
	margin-right: 3.2rem;
`;

export const NavBarItemDivider = styled.div`
	width: 0.1rem;
	height: 1.8rem;
	background-color: #c4c4c4;
`;

export const NavLink = styled(BaseNavLink)`
	text-decoration: none;
	font-family: ${Fonts.paragraph};
	font-weight: 600;
	font-size: 1.4rem;
	color: ${Colors.black[100]};
`;
