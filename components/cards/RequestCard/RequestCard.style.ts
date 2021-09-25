import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';
import { Badge as BaseBadge, GhostButton as BaseGhostButton } from '../../ui';

export const RequestCardContainer = styled.div`
	display: flex;
	padding: 2rem 1.8rem 2.6rem 2.2rem;
	border-radius: 1rem;
	margin-bottom: 0.4rem;
	cursor: pointer;

	&:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const IconBlock = styled.div`
	position: absolute;
	bottom: 8rem;
	left: -1rem;
`;

export const CardAvatarBlock = styled.div`
	position: relative;
`;

export const DateTime = styled.p`
	padding-left: 1rem;
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	line-height: 2.1rem;
	margin-bottom: 0;
`;

export const CardSubTitleText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.black[100]};
	line-height: 2.1rem;
	margin-bottom: 0;
`;

export const CardSubTitleSpan = styled.span`
	padding-left: 1rem;
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	line-height: 2.1rem;
	margin-bottom: 0;
`;

export const Badge = styled(BaseBadge)`
	margin: 0 0.4rem;
`;

export const CardActionsBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const CardAttachedFiles = styled.div`
	width: fit-content;
	display: flex;
	align-items: center;
	padding: 0.8rem 2.1rem 0.8rem 1.1rem;
	border: 0.1rem solid ${Colors.borderMidColor};
	border-radius: 1.6rem;
	margin-right: 1.2rem;
`;

export const CardAttachedFilesText = styled.p`
	color: ${Colors.black[100]};
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	margin-left: 0.4rem;
	margin-bottom: 0;
`;

export const CardAttachedFilesBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const CardMainBlock = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin: 0 1.6rem 0 3.2rem;
`;

export const CardSubTitleBlock = styled.div`
	display: flex;
`;

export const CardSubTitle = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	line-height: 2.1rem;
	margin-bottom: 0;
`;

export const CardTitleBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	min-width: 15rem;
	margin-bottom: 1.2rem;
`;

export const CardTitle = styled.p`
	font-family: ${Fonts.title};
	font-size: 1.4rem;
	margin-bottom: 0.2rem;
`;

export const GhostButton = styled(BaseGhostButton)`
	margin-right: 0.8rem;
`;
