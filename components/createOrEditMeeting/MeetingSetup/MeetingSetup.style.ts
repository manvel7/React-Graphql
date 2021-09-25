import styled from 'styled-components';

import { Colors } from '../../../environment';
import { Input, Select as BaseSelect } from '../../ui';

export const PageFormContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 4rem;
	margin-top: 3.2rem;
`;

export const MeetingSetupForm = styled.form`
	display: flex;
	justify-content: space-between;
	width: 100%;

	@media (max-width: 1440px) {
		flex-direction: column;
	}
`;

export const PageFormLeftBlock = styled.div`
	width: 45%;

	@media (max-width: 1440px) {
		width: 90%;
	}
`;

export const PageFormRightBlock = styled.div`
	width: 45%;

	@media (max-width: 1440px) {
		width: 90%;
	}
`;

export const FormItem = styled.div`
	display: flex;
	margin-bottom: 4rem;
`;

export const FormItemIconBlock = styled.div`
	min-width: 5.2rem;
	padding: 0.4rem 2.4rem 0.4rem 0.4rem;
`;

export const FormDatesBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FormDateRow = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

interface FormDateTextProps {
	error: boolean;
}

export const FormDateText = styled.p<FormDateTextProps>`
	font-size: 1.5rem;
	color: ${props => (props.error ? Colors.red[100] : Colors.overlay[40])};
`;

export const FormItemRadiosBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FormItemInfoText = styled.p`
	margin: 0.6rem 0 0.6rem 4.2rem;
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const FormItemLinkText = styled.p`
	margin: 0.6rem 0 0 4.2rem;
	font-size: 1.3rem;
	color: ${Colors.blue[100]};
`;

export const ShortInput = styled(Input)`
	width: 13rem;
	min-width: 13rem;
	margin-left: 1.4rem;
`;

export const CalendarBlockDivider = styled.div`
	width: 1.6rem;
	height: 0.1rem;
	background-color: ${Colors.overlay[40]};
	margin: auto 1.2rem auto 0;
`;

export const FormItemHeadingBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 0.8rem 0;
	width: 100%;
	cursor: pointer;
`;

export const FormItemHeadingBlockText = styled.p`
	margin-left: 1.2rem;
	font-weight: 500;
	font-size: 1.4rem;
	color: ${Colors.black[100]};
`;

export const RemindersBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const RemindersBlockTitle = styled.p`
	font-size: 1rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 1.7rem;
`;

export const RemindersRow = styled.div`
	display: flex;
	align-items: flex-start;
	margin-bottom: 1.6rem;
`;

export const RemoveReminderBlock = styled.div`
	margin-left: auto;
`;

export const Select = styled(BaseSelect)`
	margin-right: 0.8rem;
`;

export const CommitteesListIsEmptyBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const CommitteesListIsEmptyTitle = styled.p`
	font-weight: 500;
	color: ${Colors.black[100]};
	margin-bottom: 1rem;
`;

export const CommitteesListIsEmptyLink = styled.p`
	font-size: 1.4rem;
	color: ${Colors.blue[100]};
	cursor: pointer;
`;

export const MeetingInfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;

	@media (max-width: 1440px) {
		flex-direction: column;
	}
`;

export const FooterButtonContent = styled.div`
	display: flex;
`;

export const ButtonLave = styled.div`
	margin-right: 7rem;
`;
