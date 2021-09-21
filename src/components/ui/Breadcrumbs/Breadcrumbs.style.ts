import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';

import { Fonts, Colors } from '../../../environment';

export const BreadcrumbsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

interface BreadcrumbItemProps {
	color: string;
}

export const BreadcrumbItem = styled(BaseNavLink)<BreadcrumbItemProps>`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	text-decoration: none;
	color: ${props => props.color};
`;

export const BreadcrumbDivider = styled.span`
	margin: 0 0.6rem;
	color: ${Colors.gray[60]};
`;
