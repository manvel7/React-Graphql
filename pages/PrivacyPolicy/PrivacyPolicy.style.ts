import styled from 'styled-components';
import { Colors, Fonts } from '../../environment/theme';

export const PrivacyPolicyContainer = styled.div`
	padding: 6.6rem 4rem 2rem 4rem;
	margin-bottom: -10rem;
`;

export const PrivacyPolicyBlockContainer = styled.div`
	height: 72vh;
	padding: 6.6rem 80rem 1.2rem 20rem;
	overflow-y: scroll;
	margin-bottom: 6rem;
`;

export const PageNavContainer = styled.ul`
	display: flex;
	padding: 0 4rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
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

export const PrivacyPolicyHeader = styled.div``;

export const PrivacyPolicyTitle = styled.h2`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	color: ${Colors.black[100]};
`;

export const PrivacyPolicyText = styled.p`
	margin: 0 auto;
	padding-top: 1rem;
	text-align: left;
	font-weight: 400;
	color: #5a5a5a;
	font-size: 1, 1rem;
	line-height: 2rem;
`;

export const PrivacyPolicyBlock = styled.div``;

export const PrivacyPolicySubTitle = styled.p`
	margin: 0 auto;
	padding-top: 2rem;
	padding-bottom: 3rem;
	text-align: left;
	font-weight: 600;
	margin-right: 34rem;
	font-family: ${Fonts.heading};
`;

export const PrivacyPolicyTitleOne = styled.h2`
	font-size: 2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleSecond = styled.h2`
	font-size: 2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleThree = styled.h2`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	margin-right: 16%;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleFour = styled.h2`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleFive = styled.h2`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleSix = styled.h2`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	margin-right: -7%;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTextInfo = styled.p`
	// width: 50%;
	// text-align: center;
	// margin: 0 auto;
	padding-top: 1rem;
	text-align: left;
	font-weight: 400;
	color: #5a5a5a;
	font-family: ${Fonts.heading};
`;

export const Span = styled.span`
	font-size: 4rem;
	font-weight: 800;
	color: ${Colors.black[100]};
	display: inline-block;
	vertical-align: baseline;
	margin-right: 1rem;
`;

export const PrivacyPolicyTextInfoContainer = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	margin: 0 auto;
`;

export const SpanText = styled.span`
	font-size: 2rem;
	font-weight: 800;
	color: ${Colors.black[100]};
	display: inline-block;
	vertical-align: baseline;
	margin-right: 1rem;
`;

export const PrivacyPolicyTitleSeven = styled.div`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleEight = styled.div`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleNine = styled.div`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;

export const PrivacyPolicyTitleTen = styled.div`
	font-size: 3.2rem;
	font-weight: 800;
	margin-top: 2rem;
	font-family: ${Fonts.title};
`;
