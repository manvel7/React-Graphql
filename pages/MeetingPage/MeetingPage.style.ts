import styled from 'styled-components';
import { Colors, Fonts } from '../../environment/theme';
import { NavLink as Link } from 'react-router-dom';

export const MeetingContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 4rem;
`;

export const PageMeetingBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.4rem 2.4rem;
`;

export const PageMeetingBarItem = styled.div`
	display: flex;
	align-items: center;
`;

export const HeaderContent = styled.div`
	margin-left: 2rem;
`;

export const MeetingContainerRoutes = styled.div`
	overflow-y: scroll;
	height: calc(100% - 16.2rem);
	padding: 0 2rem;
	display: flex;
`;

export const NavTabsBlock = styled.div`
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
		color: ${Colors.blue[100]};
		border-bottom: 0.1rem solid ${Colors.blue[100]};
	}
`;
