import styled from 'styled-components';
import { Fonts, Colors } from '../../../environment';
import {
	LightButton as BaseLightButton,
	PrimaryButton as BasePrimaryButton,
	AutoComplete as BaseAutoComplete
} from '../../ui';

export const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 4rem;
`;

export const PageNotificationTextBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem 2.4rem;
	margin: 0.4rem 0 0.6rem 0;
	border-radius: 0.4rem;
	background-color: ${Colors.neutralBlue[10]};
	margin: 1rem;
`;

export const PageNotificationText = styled.p`
	display: flex;
	flex: 1;
	font-size: 1.3rem;
	font-family: ${Fonts.paragraph};
	color: ${Colors.gray[100]};
`;

export const PageFilters = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1.4rem 0;
	align-items: center;
`;

export const FiltersLeftBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const FiltersRightBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const FiltersItem = styled.div`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.gray[100]};
	margin-right: 0.8rem;
`;

export const PageFooter = styled.div`
	display: flex;
	margin: 1.6rem 0;
`;

export const InvitedMembersTable = styled.table`
	width: 100%;
`;

export const Thead = styled.thead`
	text-align: left;
	margin-bottom: 0.8rem;
`;

export const Tr = styled.tr`
	cursor: pointer;
`;

export const Th = styled.th`
	color: ${Colors.typoPlaceholder};
	font-family: ${Fonts.heading};
	font-size: 1.3rem;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
	padding: 1.2rem 0;
`;

export const Tbody = styled.tbody`
	padding-top: 2rem;
`;

export const Td = styled.td`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	padding: 1.6rem 0;
`;

export const TableResponseStatusWrapper = styled.div`
	display: flex;
`;

export const TableTimeLeftWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const TableActionsWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

export const TabsContainer = styled.ul`
	display: flex;
	align-items: center;
	margin-bottom: 0.8rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

interface TabItemProps {
	active: boolean;
}

export const TabItem = styled.li<TabItemProps>`
	float: left;
	list-style: none;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	font-weight: 500;
	color: ${props => (props.active ? Colors.black[100] : Colors.typoPlaceholder)};
	padding: 1.95rem 2.45rem;
	cursor: pointer;
	border-bottom: 0.1rem solid ${props => (props.active ? Colors.blue[100] : Colors.transparent)};

	:hover {
		color: ${Colors.black[100]};
	}
`;

export const TabDivider = styled.li`
	float: left;
	list-style: none;
	width: 0.1rem;
	height: 2.4rem;
	background-color: ${Colors.overlay[40]};
	margin: 0 3.2rem;
`;

export const NotRespondedBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 1.2rem 3.2rem 1.2rem 0;
	margin-bottom: 0.8rem;
`;

export const NotRespondedTitle = styled.p`
	display: flex;
	flex: 1;
	font-size: 1.4rem;
	color: ${Colors.gray[100]};
`;

export const TableAccessTypeBlock = styled.div`
	width: 14rem;
`;

export const PageInfoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

// Modal Body components

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

export const CommitteeMembersList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 2rem;
`;

export const LightButton = styled(BaseLightButton)`
	margin-right: 0.8rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 1.6rem;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	width: auto;
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
