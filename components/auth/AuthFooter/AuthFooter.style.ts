import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { Fonts, Colors } from '../../../environment';

export const FooterContainer = styled.header`
	height: 8.4rem;
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2.5rem 3.2rem 10rem;
`;

export const FooterLogoBlock = styled.div`
	margin-top: 3rem;
`;

export const LogoImg = styled.img`
	margin-bottom: 1rem;
`;

export const LogoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const FooterNavBlock = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const NavBar = styled.ul``;

export const NavBarItem = styled.li`
	float: left;
	list-style: none;
	margin-right: 4rem;
`;

export const NavLink = styled(BaseNavLink)`
	text-decoration: none;
	font-family: ${Fonts.paragraph};
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;
