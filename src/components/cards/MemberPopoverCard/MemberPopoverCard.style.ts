import styled, { css } from 'styled-components';
import { Colors, Shadows } from '../../../environment';
import { PrimaryButton as BasePrimaryButton } from '../../ui';
import { MemberPopoverPlacement } from './MemberPopoverCard';

interface MemberPopoverCardWrapperProps {
	placement: MemberPopoverPlacement;
}

export const MemberPopoverCardWrapper = styled.div<MemberPopoverCardWrapperProps>`
	position: absolute;
	padding-right: 5rem;

	${props =>
		(props.placement === MemberPopoverPlacement.Top &&
			css`
				top: 4rem;
				left: 8rem;
			`) ||
		(props.placement === MemberPopoverPlacement.Bottom &&
			css`
				bottom: 4rem;
				left: 8rem;
			`) ||
		(props.placement === MemberPopoverPlacement.Left &&
			css`
				bottom: -2rem;
				right: 30rem;
			`) ||
		(props.placement === MemberPopoverPlacement.DefaultLeft &&
			css`
				bottom: -2rem;
				right: 43rem;
			`)}
`;

export const CardPopoverContainer = styled.div`
	background-color: ${Colors.white};
	border-radius: 0.4rem;
	box-shadow: ${Shadows.dropDownMenu};
	z-index: 100;
`;

export const PopoverContent = styled.div`
	display: flex;
	padding: 2rem;
`;

export const PopoverAvatarBlock = styled.div`
	margin-right: 3rem;
`;

export const PopoverInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	width: 30rem;
`;

export const PopoverInfoTitle = styled.h5`
	font-weight: 600;
	margin-bottom: 0.2rem;
	color: ${Colors.primaryDark};
`;

export const PopoverInfoItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.2rem;
`;

export const PopoverActionsBlock = styled.div`
	display: flex;
	margin-top: 2.4rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-right: 0.8rem;
`;

export const PopoverInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.neutralBlue[100]};
	margin-right: 0.4rem;
`;

export const PopoverTypoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-right: 0.4rem;
`;

export const PopoverLinkText = styled.p`
	font-size: 1.2rem;
	color: ${Colors.blue[100]};
	margin-right: 0.4rem;
	cursor: pointer;
`;
