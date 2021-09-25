import styled from 'styled-components';
import { Colors } from '../../../../environment';
import {
	GhostButton as BaseGhostButton,
	AutoComplete as BaseAutoComplete,
	PrimaryButton as BasePrimaryButton,
	DangerButton as BaseDangerButton,
	Input as BaseInput,
	Modal as BaseModal
} from '../../../ui';

export const WorkspacePartiesListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Modal = styled(BaseModal)`
	height: auto;
`;

export const ModalAutoComplete = styled(BaseAutoComplete)`
	margin-bottom: 4rem;
`;

export const PartiesListBlock = styled.div`
	margin-bottom: 2.4rem;
`;

export const DefaultPartiesList = styled.div`
	padding: 0 2.4rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 2rem;
`;

export const EditPartyModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.8rem 2.4rem;
`;

export const EditPartyModalComponentBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 3.2rem;
`;

export const EditPartyModalComponentTitle = styled.p`
	font-weight: 500;
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.gray[100]};
	margin-bottom: 2.4rem;
`;

export const GhostButton = styled(BaseGhostButton)`
	margin-left: 0.8rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 1.6rem;
`;

export const DangerButton = styled(BaseDangerButton)`
	margin-right: auto;
`;

export const Input = styled(BaseInput)`
	margin-bottom: 4rem;
`;

export const UploadLogoContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const LogoBlock = styled.div`
	width: 10rem;
	height: 10rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0.1rem solid ${Colors.blue[10]};
	border-radius: 2.6rem;
	margin-right: 3.2rem;
`;

export const LogoImg = styled.img`
	width: 5rem;
`;

export const ConfirmModalContent = styled.div`
	padding: 4rem 2.4rem;
`;

export const ConfirmModalText = styled.p`
	font-size: 1.4rem;
	line-height: 150%;
	color: ${Colors.gray[100]};
`;
