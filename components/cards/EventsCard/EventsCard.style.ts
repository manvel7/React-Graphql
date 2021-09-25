import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment/theme';
import { Badge as BaseBadge } from '../../../components/ui';

export const EventsCardContainer = styled.div`
	width: 100%;
	margin-top: 7rem;
`;

export const EventsCardHeader = styled.div`
	display: flex;
	align-items: center;
`;

export const EventsCardTitle = styled.h4`
	margin-left: 1rem;
	font-size: 2rem;
	opacity: 0.5;
	margin-bottom: 0;
`;

export const EventsCardContent = styled.div`
	display: flex;
	// flex-wrap: wrap;
	margin-top: 4rem;
	@media (max-width: 1440px) {
		display: block;
	}
`;

export const LeftSide = styled.div`
	width: 70%;
	height: auto;
	background: #ffffff;
	box-shadow: 0px 10px 20px rgba(33, 9, 9, 0.05);
	border-radius: 12px;
	padding: 2rem 2rem;

	@media (max-width: 1440px) {
		width: 75%;
	}
`;

export const RightSide = styled.div`
	width: 30%;
	@media (max-width: 1440px) {
		margin-top: 2rem;
		display: flex;
		align-items: center;
	}
`;

export const EventsCardsTab = styled.div`
	overflow-y: scroll;
`;

export const CircleProgressBar = styled.div`
	width: 8.4rem;
	height: 8.4rem;
	border-left: 3px solid rgba(107, 71, 154, 0.2);
	border-right: 3px solid #6b479a;
	border-radius: 50%;
`;

export const CircleContentIcon = styled.div`
	position: relative;
	top: 3rem;
	left: 2.5rem;
`;

export const RightBarCount = styled.p`
	margin: 1rem 0 0 2rem;
	font-weight: 800;
	font-size: 1.8rem;
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	margin-top: 1.5rem;
`;

export const RightBarText = styled.p`
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	font-size: 2.4rem;
	margin: 1rem 0 0 2rem;
	margin-top: 1.5rem;
`;

export const RightBarCountSecond = styled.p`
	margin: 1rem 0 0 0;
	font-weight: 800;
	font-size: 1.8rem;
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	margin-top: 1.5rem;
`;

export const Badge = styled(BaseBadge)`
	margin-left: 0.4rem;
`;

export const RightBarTextSecond = styled.p`
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	font-size: 1.8rem;
	margin: 1rem 0 0 0;
	margin-top: 1.5rem;
`;

export const RightBarCountThree = styled.p`
	margin: 1rem 0 0 0;
	font-weight: 800;
	font-size: 1.8rem;
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	margin-top: 1.5rem;
`;

export const RightBarTextThree = styled.p`
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	font-size: 1.8rem;
	margin: 1rem 0 0 0;
	margin-top: 1.5rem;
`;

export const RightBarSubText = styled.span`
	font-size: 1.5rem;
	opacity: 0.5;
	font-weight: 400;
	margin: 0 2rem 0.5rem;
`;

export const RightBarSubTextSecond = styled.span`
	font-size: 1.5rem;
	opacity: 0.5;
	font-weight: 400;
	margin: 0 2rem 0 0;
`;

export const RightBarContainer = styled.div`
	max-width: 100%;
	margin-left: 2rem;
	background: #eae0f7;
	box-shadow: 0px 10px 20px rgba(33, 9, 9, 0.05);
	border-radius: 12px;
	padding: 3rem 3.6rem;

	//p
`;

export const RightBarContainerBlock = styled.div`
	display: flex;
	margin-top: 3rem;
`;

export const RightBarContainerSecond = styled.div`
	max-width: 46%;
	margin-left: 2rem;
	max-height: 35%;
	background: #eae0f7;
	box-shadow: 0px 10px 20px rgba(33, 9, 9, 0.05);
	border-radius: 12px;
	padding: 3rem 3.6rem;
`;

export const RightBarContainerThree = styled.div`
	max-width: 46%;
	margin-left: 1rem;
	max-height: 35%;
	background: #eae0f7;
	box-shadow: 0px 10px 20px rgba(33, 9, 9, 0.05);
	border-radius: 12px;
	padding: 3rem 3.6rem;
`;

export const CardMainContent = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 2.4rem;
`;

export const NavTabContainer = styled.ul`
	display: flex;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

interface NavTabItemProps {
	active: boolean;
}

export const NavTabItem = styled.li<NavTabItemProps>`
	display: flex;
	text-align: center;
	float: left;
	list-style: none;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	font-weight: 500;
	color: ${props => (props.active ? Colors.black[100] : Colors.typoPlaceholder)};
	padding: 1.4rem 2.45rem;
	cursor: pointer;
	border-bottom: 0.1rem solid ${props => (props.active ? Colors.blue[100] : Colors.transparent)};

	:hover {
		color: ${Colors.black[100]};
	}
`;
