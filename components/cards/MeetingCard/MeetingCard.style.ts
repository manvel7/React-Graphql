import styled from 'styled-components';

import { Colors, Shadows, Fonts } from '../../../environment';
import { Icon } from '../../ui';

export const MeetingCardWrapper = styled.div`
	position: relative;
	width: 100%;
`;

export const CardBlocksContainer = styled.div`
	border-radius: 1rem;
	display: flex;
	cursor: pointer;

	:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const CardLeftBlock = styled.div`
	display: flex;
	flex-direction: column;
	width: 11.6rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const CardIconBlock = styled.div`
	background-color: ${Colors.white};
	border-radius: 1.2rem;
	box-shadow: ${Shadows.meetingCard};
	width: 6.4rem;
	height: 6.4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.2rem;
`;

export const CardIconBlockDivider = styled.div`
	width: 100%;
	height: 0.1rem;
	background-color: ${Colors.neutralBlue[10]};
	margin: 1.3rem 0 0.8rem 0;
`;

export const CardIconBlockTitle = styled.p`
	font-size: 1.5rem;
	font-weight: 900;
	color: ${Colors.black[100]};
	margin-top: 0.2rem;
`;

export const CardIconBlockSubTitle = styled.p`
	font-size: 1.5rem;
	color: ${Colors.typoPlaceholder};
	margin-top: -1.8rem;
`;

export const CardRightBlock = styled.div`
	padding: 3.2rem 0 2.6rem 0;
	width: 100%;
`;

export const CardTitle = styled.h5`
	font-weight: bold;
	color: ${Colors.black[100]};
	margin-bottom: 0.8rem;
`;

export const CardDetailsBlock = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.6rem;
`;

export const CardDetailsTime = styled.p`
	font-family: ${Fonts.paragraph};
	font-size: 1.3rem;
	color: ${Colors.gray[100]};
	margin: 0 1rem 0 0.5rem;
`;

export const CardDetailsPlace = styled.p`
	margin-left: 1rem;
	font-family: ${Fonts.paragraph};
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
`;

export const CardAttachedFilesBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const CardAttachedFiles = styled.div`
	width: fit-content;
	display: flex;
	align-items: center;
	padding: 1.1rem 2.1rem 1.1rem 1.1rem;
	border: 0.1rem solid ${Colors.borderMidColor};
	border-radius: 1.6rem;
	margin-bottom: 2rem;
	margin-right: 1.2rem;
`;

export const CardAttachedFilesText = styled.p`
	color: ${Colors.typoPlaceholder};
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	margin-left: 0.4rem;
	margin-top: 1rem;
`;

export const CardAttachedFilesDarkText = styled.p`
	color: ${Colors.black[100]};
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	margin-left: 0.4rem;
	margin-top: 1rem;
`;

export const CardInfoBlock = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: 0.4rem;
	white-space: nowrap;
`;

export const InfoContent = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
`;

export const InfoContentItem = styled.div`
	margin: 0 0.6rem;
	display: flex;
	align-items: center;
`;

export const InfoContentItemText = styled.p`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	color: ${Colors.overlay[40]};
	margin-top: 1rem;
`;

export const CardOptionsBlock = styled.div`
	position: absolute;
	right: 1.6rem;
	top: 1.4rem;
`;

export const OptionsIcon = styled(Icon)`
	margin-right: 1.2rem;
`;

export const CardFooter = styled.div`
	width: 100%;
	height: 3.2rem;
	display: flex;
	justify-content: flex-end;
`;

export const DividerBlock = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
`;

export const Divider = styled.div`
	height: 0.1rem;
	width: 100%;
	background-color: ${Colors.neutralBlue[10]};
`;
