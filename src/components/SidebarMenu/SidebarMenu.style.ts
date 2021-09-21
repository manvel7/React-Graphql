import styled from 'styled-components';
import { Colors, Fonts } from '../../environment';
import { NavLink as Link } from 'react-router-dom';
import { Icon } from '../ui';

import { Modal as BaseModal, GhostButton as BaseDangerButton } from '../ui';

export const SidebarContainer = styled.div`
	display: flex;
`;

export const NavigationContainer = styled.nav`
	width: 22rem;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 1.6rem 0;
	background-color: #f2f3f5;
`;

export const MenuHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 1.2rem 2.2rem 1.2rem;
	padding: 0.4rem 0.8rem;
	cursor: pointer;
`;

export const HeaderLogo = styled.img`
	height: 3.4rem;
	border-radius: 50%;
`;

export const HeaderTitle = styled.p`
	color: ${Colors.gray[100]};
	margin: 0 0.8rem;
	flex: 1;
	font-size: 1.4rem;
`;

export const HeaderToggleBlock = styled.div`
	display: flex;
`;

export const QuickSearchBlock = styled.div`
	padding: 0.2rem 0.4rem;
	margin-bottom: 1.6rem;
`;

export const CreateBlock = styled.div`
	display: flex;
	// padding: .4rem .8rem;
	margin: 0 1.2rem 2.4rem 1.2rem;
`;

export const DropdownItemIcon = styled(Icon)`
	margin-right: 1.2rem;
`;

export const NavBar = styled.ul`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

export const NavbarTitle = styled.p`
	font-size: 1.1rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	padding: 0 0 2.8rem 1.8rem;
	color: ${Colors.overlay[40]};
`;

interface NavItemProps {
	withMarginBottom?: boolean;
}

export const NavItem = styled.li<NavItemProps>`
	margin-bottom: ${props => (props.withMarginBottom ? '2rem' : '.4rem')};
	list-style-type: none;
	&:last-child {
		margin-top: auto;
	}
`;

//TODO Change Color
export const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	padding: 0.4rem 0 0.4rem 3rem;
	margin: 0.1rem;
	color: ${Colors.neutralBlue[100]};
	border-left: 0.2rem solid ${Colors.transparent};
	text-decoration: none;
	cursor: pointer;

	:hover {
		color: ${Colors.blue[100]};
	}

	&.active {
		color: #0b55c5;
		border-left: 0.2rem solid ${Colors.blue[100]};
	}
`;

export const LinkIcon = styled.div``;

export const LinkTitle = styled.p`
	font-family: ${Fonts.heading};
	font-size: 1.5rem;
	margin: 0 1rem;
`;

export const NavLinkForLogout = styled.div`
	display: flex;
	align-items: center;
	padding-left: 3.5rem;
	color: ${Colors.neutralBlue[100]};
	cursor: pointer;
	margin-top: 1rem;

	:hover {
		color: ${Colors.blue[100]};
	}
`;

interface ModalStep {
	modalStep?: number;
}
export const Modal = styled(BaseModal)<ModalStep>`
	height: ${props => (props.modalStep === 4 ? '90%' : 'auto')};
`;

export const UploadFileModalContainer = styled.div`
	display: flex;
	width: 100%;
	padding: 1rem 2rem;
	cursor: pointer;
`;

export const ModalSidebarContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 3.2rem;
`;

export const SidebarItem = styled.div`
	margin-bottom: 1rem;
	padding: 0.8rem;
`;

export const ModalMainContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const ModalSubHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
`;

export const ModalSubHeaderTitle = styled.p`
	font-size: 1.5rem;
	margin-left: 1rem;
	color: ${Colors.black[100]};
	margin-bottom: 0;
`;

export const ModalItemContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

export const FileTitle = styled.p`
	font-size: 1.7rem;
	opacity: 0.7;
`;

export const FileSubTitle = styled.p`
	font-size: 1.3rem;
	opacity: 0.4;
`;

export const ComponentBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 5rem;
	padding: 0 2rem;
`;

export const HeadingBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.7rem 0;
	margin-bottom: 0.8rem;
`;

export const PageHeading = styled.p`
	font-size: 1.5rem;
	color: ${Colors.typoPlaceholder};
	font-weight: 800;
`;

export const Container = styled.div``;

export const ContentBlockCard = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
`;

export const HeaderTitleBlock = styled.p`
	font-size: 1.3rem;
	font-weight: 500;
	color: ${Colors.gray[100]};
`;

export const GhostButton = styled(BaseDangerButton)`
	margin-right: 1rem;
`;
export const IconPlusBlock = styled.div`
	position: absolute;
	top: 27rem;
	left: 43.5rem;
	color: ${Colors.blue[100]};
`;

export const ModalBlock = styled.div`
	display: flex;
	height: 30rem;
`;
//Dropzone Styles

interface FileDropZone {
	active: boolean;
}

export const FileDropZone = styled.div<FileDropZone>`
	padding: 1rem;
	outline: none;
	height: 31rem;
	width: 64rem;
	border: 0.2rem dashed ${props => (props.active ? Colors.blue[100] : '#cccccc')};
`;

export const FileDropInput = styled.input``;

export const UploadIconContent = styled.div`
	margin-top: 6rem;
`;
export const UserBlockSidebar = styled.div`
	display: flex;
	align-items: center;
	margin-top: 3rem;
	margin-left: 4rem;
    cursor: pointer;
`;

export const UserNameSidebar = styled.h4`
	margin-left: 1rem;
	margin-bottom: 1rem;
	font-weight: 800;
	font-size: 1.3rem;
	color: #222222;
	padding-top: 1rem;
	cursor: pointer;
`;
