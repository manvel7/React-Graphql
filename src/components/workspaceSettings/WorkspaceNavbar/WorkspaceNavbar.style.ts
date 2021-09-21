import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { Colors, Fonts } from '../../../environment';

export const WorkspaceNavbarContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const NavBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 3.4rem;
`;

export const NavTitle = styled.p`
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 1.6rem;
`;

export const NavLink = styled(BaseNavLink)`
	font-size: 1.4rem;
	font-weight: 500;
	font-family: ${Fonts.paragraph};
	color: ${Colors.gray[100]};
	background-color: ${Colors.transparent};
	text-decoration: none;
	padding: 0.8rem;
	margin-bottom: 0.8rem;
	border-radius: 0.4rem;
	transition: 0.2s;
	white-space: nowrap;

	:hover {
		color: ${Colors.blue[100]};
		background-color: ${Colors.ghostBtnBgColor};
	}

	&.active {
		color: ${Colors.blue[100]};
		background-color: ${Colors.ghostBtnBgColor};
	}
`;
