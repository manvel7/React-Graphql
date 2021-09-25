import styled from 'styled-components';
import { Colors, Fonts } from '../../environment/theme';

export const CookieHeaderContainer = styled.div``;

export const CookiePageHeader = styled.div`
	width: 100%;
	padding: 3rem 60rem 10rem 6rem;
	height: 100vh;
	overflow: scroll;
`;

export const NavBarItemCookiesPageDashboard = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;
	padding: 2rem 5rem;
`;

export const CookiesTitleHeader = styled.p`
	font-size: 1.8rem;
	font-weight: 800;
	color: #222222;
`;

export const CookiesTitle = styled.h2`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	color: ${Colors.black[100]};
`;

export const CookiesText = styled.p`
	margin: 0 auto;
	padding-top: 1rem;
	text-align: left;
	font-weight: 400;
	color: #5a5a5a;
	font-size: 1, 1rem;
	line-height: 2rem;
`;

export const CookiesSubTitle = styled.p`
	margin: 0 auto;
	padding-top: 2rem;
	padding-bottom: 3rem;
	text-align: left;
	font-weight: 600;
	margin-right: 34rem;
	font-family: ${Fonts.heading};
`;
