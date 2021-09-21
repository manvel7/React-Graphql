import styled from 'styled-components';

import { Colors, Fonts } from '../../../environment';
import {
	GhostButton,
	DangerButton as BaseDangerButton,
	AutoComplete as BaseAutoComplete,
	PrimaryButton as BasePrimaryButton
} from '../../ui';
import { MemberDefaultCard as BaseMemberDefaultCard } from '../../cards';

export const CommitteeSettingsInvitationsContainer = styled.div`
	margin: 2.1rem 0.4rem;
`;

export const InvitationsSubTitle = styled.h5`
	font-size: 2.4rem;
	font-weight: 8rem;
`;

export const ComponentBlock = styled.div``;

export const ComponentUserBlock = styled.div`
	margin-top: 6rem;
	margin-bottom: 6rem;
`;

export const InvitationsButton = styled(GhostButton)`
	padding-top: 1rem;
	margin-left: -1rem;
`;

export const InvitationsText = styled.p`
	font-weight: 400;
	color: #5a5a5a;
	font-size: 1.5rem;
	padding-top: 1rem;
	opacity: 0.7;
`;

export const InvitationsUserTitle = styled.h4`
	font-weight: 400;
	color: #5a5a5a;
	font-size: 1.5rem;
	opacity: 0.7;
`;
export const ComponentBlockCards = styled.div`
	width: 150rem;
	margin-top: 4rem;
	display: flex;
`;

export const ActionBlock = styled.div`
	display: flex;
`;

export const MemberDefaultCard = styled(BaseMemberDefaultCard)`
	background: transparent;
	&:hover {
		background: transparent;
	}
`;

export const Table = styled.table`
	width: 100%;
`;

export const Thead = styled.thead`
	text-align: left;
	margin-bottom: 0.8rem;
`;

export const TBody = styled.tbody`
	width: 100%;
	padding-top: 2rem;
`;

export const Tr = styled.tr`
	cursor: pointer;
	width: 100%;
`;

export const Th = styled.th`
	color: ${Colors.typoPlaceholder};
	font-family: ${Fonts.heading};
	font-size: 1.3rem;
	font-weight: 500;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
	padding: 1.2rem 1.6rem;
`;

export const Td = styled.td`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	padding: 1.4rem 1.6rem;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
`;

export const ActionsBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const DangerButton = styled(BaseDangerButton)`
	margin-right: 0.8rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 1.6rem;
`;

export const PageInfoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const CommitteeUserMessage = styled.h5`
	display: flex;
	justify-content: center;
	padding-top: 5rem;
`;

//Modal styles

export const ModalBodyContent = styled.div`
	width: 100%;
	padding: 0 2.4rem;
`;

export const ModalOptionsBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.8rem;
`;

export const SelectedUsersBadgeList = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

export const RemovableBadgeContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.2rem 1.2rem;
	margin-right: 0.8rem;
	margin-bottom: 0.8rem;
	border-radius: 7rem;
	background-color: ${Colors.blue[6]};
`;

export const RemovableBadgeTitle = styled.p`
	font-size: 1.2rem;
	color: ${Colors.black[100]};
	margin-right: 0.8rem;
	white-space: nowrap;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	width: auto;
`;

export const CommitteeMembersList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 2rem;
`;
