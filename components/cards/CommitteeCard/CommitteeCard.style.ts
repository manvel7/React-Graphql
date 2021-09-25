import styled from 'styled-components';
import { Colors, Fonts, Icons } from '../../../environment';

export const CommitteeCardIconContainer = styled.div`
	position: relative;
	height: 5.7rem;
`;

export const CommitteeCardIcon = styled(Icons.EpCommitteeIcon)``;

export const CommitteeCardIconName = styled.p`
	position: absolute;
	color: ${Colors.blue[100]};
	margin: auto;
	font-size: 1.5rem;
	font-family: ${Fonts.heading};
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const CommitteeCardBody = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	margin-left: 2.4rem;
`;

export const CommitteeCardLabel = styled.p`
	font-family: ${Fonts.heading};
	font-weight: 600;
	margin-bottom: 1rem;
`;

export const CommitteeCardMembersAvatatarsList = styled.div`
	display: flex;
	align-items: center;
`;

export const CommitteeCardMembersAvatarsBlock = styled.div`
	display: flex;
	align-items: center;
	min-width: 14rem;
`;

export const CommitteeCardMembersAvatatar = styled.div`
	margin-right: 0.4rem;
`;

export const CommitteeCardMembersMoreCount = styled.p`
	color: ${Colors.neutralBlue[100]};
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	margin-left: 1rem;
`;

export const CommitteeCardUpdatedText = styled.p`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 0;
`;

export const CommitteeCardActionsContainer = styled.div`
	margin-left: auto;
	opacity: 0;
`;

export const CommitteeCardContainer = styled.div`
	display: flex;
	padding: 1.9rem 1.7rem 2.9rem 1.7rem;
	cursor: pointer;
	border-radius: 1rem;

	:hover {
		background-color: ${Colors.blue[6]};
		${CommitteeCardActionsContainer} {
			opacity: 1;
		}
	}
`;
