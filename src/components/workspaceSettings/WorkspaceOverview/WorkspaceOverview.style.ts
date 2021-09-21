import styled from 'styled-components';
import { Colors } from '../../../environment';
import {
	GhostButton as BaseGhostButton,
	AutoComplete as BaseAutoComplete,
	PrimaryButton as BasePrimaryButton,
	DangerButton as BaseDangerButton,
	Input as BaseInput,
	Modal as BaseModal
} from '../../ui';

import { MemberDefaultCard as BaseMemberDefaultCard } from '../../cards';

export const MemberDefaultCard = styled(BaseMemberDefaultCard)`
	background: transparent;
	&:hover {
		background: transparent;
	}
`;

export const OverviewContainer = styled.div`
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

export const PageInfoText = styled.p`
	font-size: 1.5rem;
	color: ${Colors.gray[100]};
	line-height: 150%;
`;

export const PageTypoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
	line-height: 150%;
	margin-bottom: 2.5rem;
`;

export const UploadLogoContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 5rem;
`;

export const LogoBlock = styled.div`
	width: 12rem;
	height: 12rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0.1rem solid ${Colors.blue[10]};
	border-radius: 2.6rem;
	margin-right: 3.2rem;
`;

export const LogoImg = styled.img`
	width: 6rem;
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

export const WorkspaceInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const WorkspaceTitleBlock = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const WorkspaceTitle = styled.h4`
	font-weight: 800;
	color: ${Colors.black[100]};
`;

export const WorkspaceDescriptionBlock = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 60rem;
`;

export const OwnerCardContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const OwnerCardContainerSelectBlock = styled.div`
	widhth: 9rem;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	width: 26rem;
`;

export const Modal = styled(BaseModal)`
	height: auto;
`;

export const RenameModalContent = styled.div`
	padding: 0 2.4rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 2rem;
`;

export const ConfirmModalContent = styled.div`
	padding: 0.8rem 2.4rem 4rem 2.4rem;
`;

export const ConfirmModalText = styled.p`
	font-size: 1.4rem;
	line-height: 150%;
	color: ${Colors.gray[100]};
`;
