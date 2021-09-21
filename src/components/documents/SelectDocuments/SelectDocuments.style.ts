import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const SelectDocumentsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.5rem 2.4rem;
`;

export const NavPanel = styled.ul`
	display: flex;
	align-items: center;
	padding: 1rem 0;
	border-bottom: 0.1rem solid ${Colors.midLight};
	margin-bottom: 0.8rem;
`;

interface NavItemProps {
	active?: boolean;
}

export const NavItem = styled.li<NavItemProps>`
	list-style: none;
	padding: 0.2rem 0.4rem;
	margin: 0 0.6rem;
	cursor: pointer;
	font-family: ${Fonts.paragraph};
	font-size: 1.4rem;
	color: ${props => (props.active ? Colors.gray[100] : Colors.overlay[40])};

	&:hover {
		color: ${Colors.gray[100]};
		background-color: ${Colors.gray[8]};
	}
`;

export const NavDivider = styled.span`
	font-size: 1.4rem;
	color: ${Colors.gray[60]};
`;

export const FolderBlock = styled.div`
	margin-top: 2rem;
`;

export const DocumentBlock = styled.div`
	margin-left: 2rem;
`;
