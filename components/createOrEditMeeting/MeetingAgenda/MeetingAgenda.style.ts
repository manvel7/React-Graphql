import styled, { css } from 'styled-components';
import { PrimaryButton as BasePrimaryButton, Icon, Modal } from '../../../components/ui';
import { Fonts, Colors } from '../../../environment';

export const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 4rem;
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

export const MeetingAgendaTable = styled.table`
	width: 100%;
	margin-bottom: 1.6rem;
	margin-top: 1.2rem;
`;

export const Thead = styled.thead`
	text-align: left;
	margin-bottom: 0.8rem;
`;

interface TRowProps {
	isDragging?: boolean;
}

export const Tr = styled.tr<TRowProps>`
	cursor: pointer;
	width: 100%;
	background-color: ${props => (props.isDragging ? Colors.blue[10] : Colors.transparent)};
	${props =>
		props.isDragging &&
		css`
			display: flex;
			justify-content: space-between;
			align-items: center;
			opacity: 1;
		`}
`;

export const Th = styled.th`
	color: ${Colors.typoPlaceholder};
	font-family: ${Fonts.heading};
	font-size: 1.3rem;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
	border-right: 0.1rem solid ${Colors.blue[8]};
	padding: 1.2rem 1.5rem;
`;

export const Td = styled.td`
	font-family: ${Fonts.paragraph};
	font-size: 1.5rem;
	color: ${Colors.overlay[40]};
	padding: 0 1.5rem;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
	border-right: 0.1rem solid ${Colors.blue[8]};
`;

export const TableActionsWrapper = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 1.6rem;
`;

export const TitleColumnContainer = styled.div<{ subItem?: boolean }>`
	display: flex;
	align-items: center;
	padding-left: ${props => (props.subItem ? '5rem' : '0')};
`;

export const DragIcon = styled(Icon)`
	margin-right: 0.8rem;
`;

export const DroppableTableBody = styled.tbody`
	width: 100%;
	padding-top: 2rem;
`;

export const DragHandleContainer = styled.div<{ disabled?: boolean }>`
	width: 2.4rem;
	height: 2.4rem;
	display: flex;
	justify-content: center;
	align-items: center;

	${props =>
		props.disabled &&
		css`
			opacity: 0.5;
			pointer-events: none;
		`};
`;

export const ExpandRowBlock = styled.div`
	width: 3rem;
`;

//Styles for Meeting Agenta (Regular User)

export const MeetingAgentaTitle = styled.h5``;

export const SubmitAction = styled.h5`
	font-size: ${Fonts.heading};
	font-weight: 500;
	color: ${Colors.black[100]};
	margin-left: 3rem;
`;

export const ReplayAction = styled.h5`
	font-size: ${Fonts.heading};
	font-weight: 500;
	color: ${Colors.black[100]};
	margin-left: 3rem;
`;

export const ConfirmModal = styled(Modal)`
	height: auto;
`;

export const ConfirmBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin: 3rem;
`;

export const ConfirmBlockText = styled.p`
	color: ${Colors.black[100]};
`;
