import styled from 'styled-components';
import { Colors, Fonts, Shadows } from '../../../environment';

export const PartyName = styled.span`
	font-size: 1.4rem;
	color: ${Colors.gray[100]};
	font-family: ${Fonts.paragraph};
	margin-right: 0.8rem;
	margin-bottom: 0.6rem;
	cursor: pointer;
`;

export const PartyNameCardContainer = styled.div`
	display: inline-block;
	position: relative;

	:hover {
		${PartyName} {
			color: ${Colors.blue[100]};
		}
	}
`;

export const PopoverWrapper = styled.div`
	width: 30rem;
	display: flex;
	align-items: flex-start;
	position: absolute;
	// top: 2.5rem;
	background-color: ${Colors.white};
	border-radius: 0.4rem;
	box-shadow: ${Shadows.dropDownMenu};
	padding: 2rem;
	z-index: 10;
`;

export const PartyLogoBlock = styled.div`
	padding: 0.4rem;
	margin-right: 2.4rem;
	background-color: ${Colors.white};
	border-radius: 0.8rem;
	box-shadow: ${Shadows.meetingCard};
`;

export const PartyLogo = styled.img`
	width: 4.8rem;
`;

export const PartyInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PopoverTitle = styled.h5`
	color: ${Colors.primaryDark};
	font-weight: 600;
	margin-bottom: 0.2rem;
`;

export const PopoverSubTitle = styled.p`
	color: ${Colors.typoPlaceholder};
	font-size: 1.3rem;
	margin-bottom: 0.2rem;
`;

export const PopoverLinkText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.neutralBlue};
	margin-bottom: 0.2rem;
`;

export const PopoverInfoText = styled.p`
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 2.4rem;
`;
