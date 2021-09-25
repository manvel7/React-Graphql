import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { Fonts, Colors } from '../../environment';
import { GhostButton as BaseGhostButton } from '../../components/ui';

export const PageContainer = styled.div`
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
`;

export const GhostButton = styled(BaseGhostButton)`
	margin-left: 0.8rem;
`;

export const ContentIconWithTitle = styled.div`
	display: flex;
	align-items: center;
`;

export const IconContent = styled.div`
	margin-top: 2rem;
`;
