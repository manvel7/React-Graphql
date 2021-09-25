import styled from 'styled-components';
import { Colors, Fonts } from '../../environment/theme';

export const CookiePageHeader = styled.div``;

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
