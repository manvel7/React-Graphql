import styled, { css } from 'styled-components';
import { BadgeTypes } from './Badge';
import { Fonts, Colors } from '../../../environment';
import { Icon as BaseIcon } from '../Icon';

const Primary = css`
	background-color: ${Colors.blue[8]};
	color: ${Colors.blue[100]};
`;

const Warning = css`
	background-color: ${Colors.orange[8]};
	color: ${Colors.orange[100]};
`;

//Change BG Color
const Success = css`
	background-color: rgba(39, 174, 96, 0.08);
	color: ${Colors.green};
`;

//Change BG Color
const Purple = css`
	background-color: rgba(168, 74, 255, 0.08);
	color: ${Colors.purple};
`;

const Default = css`
	background-color: ${Colors.blue[8]};
	color: ${Colors.neutralBlue[100]};
`;

interface BadgeContainerProps {
	type: string;
}

export const BadgeContainer = styled.div<BadgeContainerProps>`
	padding: 0.2rem 1.2rem;
	border-radius: 7rem;
	display: flex;
	align-items: center;
	width: fit-content;
	white-space: nowrap;

	${props =>
		(props.type === BadgeTypes.Primary && Primary) ||
		(props.type === BadgeTypes.Warning && Warning) ||
		(props.type === BadgeTypes.Success && Success) ||
		(props.type === BadgeTypes.Purple && Purple) ||
		(props.type === BadgeTypes.Default && Default)};
`;

export const BadgeTitle = styled.p`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	margin-bottom: 0;
`;

export const BadgeIcon = styled(BaseIcon)`
	margin-right: 1rem;
`;
