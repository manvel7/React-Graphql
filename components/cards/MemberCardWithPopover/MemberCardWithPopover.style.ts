import styled, { css } from 'styled-components';
import { Colors, Fonts } from '../../../environment';

interface MemberCardWithPopoverProps {
	isSelected: boolean;
	disabled: boolean;
}

export const MemberCardWithPopoverContainer = styled.div<MemberCardWithPopoverProps>`
	display: flex;
	padding: 1.5rem;
	position: relative;
	cursor: pointer;
	border-radius: 0.4rem;
	background-color: ${props => (props.isSelected ? Colors.neutralBlue[5] : Colors.white)};

	${props =>
		props.disabled &&
		css`
			opacity: 0.3;
			pointer-events: none;
		`}

	&:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const CardTitleBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	margin: 0 1.6rem 0 3.2rem;
	min-width: 15rem;
	cursor: pointer;
`;

export const CardTitle = styled.p`
	font-family: ${Fonts.heading};
	color: ${Colors.primaryDark};
	font-size: 1.4rem;
	font-weight: 600;
	line-height: 1.7rem;
`;

export const CardSubTitle = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	line-height: 2.1rem;
	margin-right: 1rem;
`;

export const CardInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardInfoItem = styled.div`
	display: flex;
	align-items: center;
`;

export const CardInfoText = styled.p`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	margin: 0 1.2rem;
`;
