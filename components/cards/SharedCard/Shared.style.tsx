import styled from 'styled-components';
import { Colors, Fonts, Icons } from '../../../environment';
import { Icon } from '../../ui';

export const SharedCardContainer = styled.div`
	display: flex;
	padding: 1.4rem;
	border-radius: 0.8rem;
	margin-bottom: 0.4rem;
	cursor: pointer;

	&:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const CardIconBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;

export const CardIconWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CardIconBackground = styled(Icons.EpFileIcon)``;

export const CardIcon = styled(Icon)`
	position: absolute;
	transform: translateY(-10%);
`;

export const CardMainBlock = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin-left: 1.5rem;
`;

export const CardTitleBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const CardTitle = styled.h6`
	font-family: ${Fonts.title};
	font-size: 1.4rem;
	color: ${Colors.black[100]};
	margin-right: 0.8rem;
`;

export const CardInfoTextBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.2rem;
`;

export const CardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 0.4rem;
	display: flex;
	align-items: center;
`;

export const CardAttachedFilesBlock = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.6rem;
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
`;

export const CardAttachedFilesDarkText = styled.p`
	color: ${Colors.black[100]};
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	margin-left: 0.4rem;
`;

export const CardActionsBlock = styled.div``;

export const ActionsIcon = styled(Icon)`
	margin-right: 1.2rem;
`;
