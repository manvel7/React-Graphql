import styled from 'styled-components';
import { Colors } from '../../../environment';
import { Radio as BaseRadio, Checkbox as BaseCheckbox } from '../../ui';

export const NotificationsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const ComponentBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 4.8rem;
	margin-bottom: 4.8rem;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[20]};
`;

export const PageTitle = styled.h5`
	font-weight: 800;
	color: ${Colors.black[100]};
	margin-bottom: 2rem;
`;

export const FormItem = styled.div`
	display: flex;
	align-items: center;
`;

export const Radio = styled(BaseRadio)`
	margin-bottom: 1.6rem;
`;

export const Checkbox = styled(BaseCheckbox)`
	margin-bottom: 1.6rem;
	justify-content: flex-start;
`;

export const SubItemsBlock = styled.div`
	padding-left: 3.6rem;
	display: flex;
	flex-direction: column;
`;
