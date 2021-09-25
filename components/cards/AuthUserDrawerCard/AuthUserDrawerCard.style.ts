import styled, { css } from 'styled-components';
import { Colors, Fonts } from '../../../environment';
import { userDrawerCardProps } from './AuthUserDrawerCard';

interface UserDrawerCardProps {
	height: userDrawerCardProps;
}

export const MemberDrawerCardContainer = styled.div<UserDrawerCardProps>`
	display: flex;
	flex-direction: column;
	${props =>
		props.height === userDrawerCardProps.Craditionals &&
		css`
			height: 105rem;
		`}
`;

export const CardLinkText = styled.p`
	font-size: 1.2rem;
	color: ${Colors.blue[100]};
	margin-right: 0.4rem;
	cursor: pointer;
`;

export const CardDefaultText = styled.p`
	color: ${Colors.gray[100]};
	font-size: 1.4rem;
	margin: 1.2rem 0;
`;

export const CardSubHeadingText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
	text-transform: uppercase;
`;

export const NavTabContainer = styled.ul`
	display: flex;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
	justify-content: space-between;
`;

interface NavTabItemProps {
	active: boolean;
}

export const NavTabItem = styled.li<NavTabItemProps>`
	width: 50%;
	text-align: center;
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

export const CardMainContent = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardContentItem = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3.2rem 1.5rem 3.2rem 3rem;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[10]};
`;

export const CardContentEmailPhoneBlock = styled.div`
	display: flex;
`;

export const CardContentEmailPhoneItem = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
`;

export const MembershipCardContainer = styled.div`
	margin-top: 1.4rem;
	display: flex;
`;

export const MembershipCardImageBlock = styled.div``;

export const MembershipCardImage = styled.img`
	width: 2.4rem;
	height: 2.4rem;
`;

export const MembershipCardInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 1.5rem;
`;

export const MembershipCardTitle = styled.p`
	font-size: 1.4rem;
	font-weight: bold;
	color: ${Colors.primaryGray};
	margin-bottom: 0.4rem;
`;

export const MembershipCardTypoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.gray[100]};
	margin-bottom: 0.4rem;
`;

export const MembershipCardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
`;

export const CommitteesContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1.6rem;
`;
