import styled from 'styled-components';
import { PrimaryButton } from '../../components/ui';
import { Colors } from '../../environment';

export const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 2rem;
`;

export const MembersList = styled.div`
	// display: flex;
	// flex-direction: column;
	overflow-y: scroll;
`;

export const PageFooter = styled.div`
	padding: 2rem;
	display: flex;
	align-items: center;
`;

export const ModalPrimaryButton = styled(PrimaryButton)`
	margin-left: 1.6rem;
`;

export const ModalFooterNotificationBlock = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 1;
`;

export const ModalFooterIconBlock = styled.div`
	padding: 0.4rem;
	border-radius: 0.8rem;
	background-color: ${Colors.red[6]};
	margin-right: 1rem;
`;

export const ModalFooterText = styled.p`
	color: ${Colors.red[100]};
	font-size: 1.3rem;
`;

export const InviteToCommitteeInputsBlockCommittee = styled.div`
	display: block;
`;

export const FormItems = styled.form`
	padding-top: 2rem;
`;
