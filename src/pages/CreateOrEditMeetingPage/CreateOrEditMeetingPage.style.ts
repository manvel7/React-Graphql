import styled from 'styled-components';

import { Colors, Fonts, Shadows } from '../../environment';
import { Badge as BaseBadge } from '../../components/ui';

export const PageWrapper = styled.div`
	width: 100%;
	position: relative;
`;

export const PageContainer = styled.div`
	display: flex;
	margin: 0 0.2rem;
`;

export const PageMainContent = styled.section`
	width: 100%;
`;

export const PageSidebar = styled.aside`
	padding: 2.3rem 1.8rem;
`;

export const PageSidebarIconsBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 8.8rem;
	padding: 0.6rem;
`;

export const PageNavContainer = styled.ul`
	display: flex;
	padding: 0 4rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

export const PageNavContent = styled.div`
	width: 100%;
	height: calc(100vh - 11.2rem);
	overflow-y: scroll;
`;

interface PageNavItemProps {
	active: boolean;
}

export const PageNavItem = styled.li<PageNavItemProps>`
	display: flex;
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

export const NexSteptButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	position: absolute;
	bottom: 0;
	// left: 0;
	right: 7.2rem;
	z-index: 10;
	padding-bottom: 1rem;
`;

export const NextStepButton = styled.button`
	width: 35rem;
	height: 4.8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.accentBlue};
	cursor: pointer;
	border-radius: 0.8rem;
	border: none;
	outline: none;
	color: ${Colors.white};
	box-shadow: ${Shadows.popovers};
`;

export const NextStepButtonText = styled.p`
	font-size: 1.6rem;
	color: ${Colors.lightColorWhite};
	margin-right: 2.4rem;
`;

export const NextStepMutedText = styled.span`
	opacity: 0.3;
`;

export const Badge = styled(BaseBadge)`
	margin-left: 0.4rem;
`;
