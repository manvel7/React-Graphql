import styled, { css } from 'styled-components';
import { Colors, Fonts } from '../../../environment';

interface MemberAccessCardContainerProps {
	disabled: boolean;
}

export const MemberAccessCardContainer = styled.div<MemberAccessCardContainerProps>`
	display: flex;
	align-items: center;
	padding: 1.4rem 2.2rem 1.2rem 1.4rem;
	cursor: pointer;
	border-radius: 1rem;
	${props =>
			props.disabled &&
			css`
				opacity: 0.3;
				pointer-events: none;
			`}
		:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const CardTitleBlock = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: space-evenly;
	margin-left: 2.6rem;
`;

export const CardTitle = styled.p`
	font-family: ${Fonts.heading};
	color: ${Colors.primaryDark};
	font-size: 1.4rem;
	font-weight: 600;
	line-height: 1.7rem;
`;

export const CardInfoBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const CardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-right: 0.4rem;
	white-space: nowrap;
`;

export const CardSelectBlock = styled.div`
	width: 10rem;
`;
