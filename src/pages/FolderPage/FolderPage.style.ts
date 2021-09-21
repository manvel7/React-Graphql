import styled from 'styled-components';
import { Fonts, Colors } from '../../environment';
import {
	GhostButton as BaseGhostButton,
	Switch as BaseSwitch,
	PrimaryButton as BasePrimaryButton,
	Modal as BaseModal
} from '../../components/ui';

import { DocumentCard as BaseDocumentCard } from '../../components/cards';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const PageTopBarBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.2rem 2.4rem 1.2rem 4rem;
`;

export const PageTopBarItem = styled.div`
	display: flex;
	align-items: center;
`;

export const BreadcrumbBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 0.4rem 0;
`;

export const BreadcrumbItem = styled.div`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.typoPlaceholder};
	margin: 0 0.6rem;
`;

export const BreadcrumbDivider = styled.div``;

export const GhostButton = styled(BaseGhostButton)`
	margin-right: 0.8rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 1.6rem;
`;

export const Switch = styled(BaseSwitch)`
	margin-left: auto;
`;

export const PageTitleBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 1.2rem 2.4rem 1.2rem 4rem;
`;

export const PageTitle = styled.h4`
	font-weight: 800;
	margin: 0 1.2rem 0;
	color: ${Colors.black[100]};
`;

export const PageFilters = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1.4rem 2.4rem 1.4rem 4rem;
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

export const FixedHeightModal = styled(BaseModal)`
	height: auto;
	max-height: 80%;
`;

export const RenameFolderModalConent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem 2.4rem 0 2.4rem;
`;

export const ModalAccessContainer = styled.div`
	padding: 2.4rem 0 3.2rem 0;
`;

export const ModalSubTitle = styled.p`
	font-size: 1.1rem;
	color: ${Colors.gray[100]};
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	margin-bottom: 1.6rem;
`;

export const ModalInfoBlockWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ModalInfoBlock = styled.div`
	display: flex;
`;

export const InfoBlockIconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 3.2rem;
	height: 3.2rem;
	border-radius: 50%;
	background-color: ${Colors.blue[8]};
	color: ${Colors.blue[100]};
	margin-right: 0.8rem;
`;

export const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const InfoTitle = styled.p`
	font-size: 1.4rem;
	font-weight: 600;
	color: ${Colors.black[100]};
	margin-bottom: 1.3rem;
`;

export const InfoText = styled.p`
	font-size: 1.3rem;
	line-height: 1.8rem;
	color: ${Colors.typoPlaceholder};
`;

export const MoveModalBodyContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 1rem;
`;

export const MoveFoldersModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const MoveFolderModalNavBlock = styled.div`
	width: 100%;
	padding: 1rem 2rem;
`;

export const AccessModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const ModalTabsContainer = styled.ul`
	padding: 0 3.2rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

interface ModalTabItemProps {
	active: boolean;
}

export const ModalTabItem = styled.li<ModalTabItemProps>`
	float: left;
	list-style: none;
	font-family: ${Fonts.heading};
	font-size: 1.5rem;
	font-weight: 500;
	color: ${props => (props.active ? Colors.blue[100] : Colors.typoPlaceholder)};
	padding: 1.5rem 2.2rem;
	cursor: pointer;
	border-bottom: 0.1rem solid ${props => (props.active ? Colors.blue[100] : Colors.transparent)};

	:hover {
		color: ${Colors.black[100]};
	}
`;

export const MembersListContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2.4rem;
`;

export const ListTitleBlock = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
`;

export const ListIconBlock = styled.div`
	margin-right: 1.6rem;
	border-radius: 50%;
	background-color: ${Colors.blue[8]};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.2rem;
	height: 3.2rem;
`;

export const ListTitle = styled.p`
	font-weight: 600;
	font-size: 1.5rem;
`;

export const MembersList = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 4.8rem;
`;

export const PageMainContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: calc(100% - 16rem);
`;

export const ComponentBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem 2.4rem 1rem 4rem;
	margin-bottom: 2rem;
`;

export const PageSubTitle = styled.p`
	font-weight: 800;
	font-size: 1.5rem;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 2rem;
`;

export const DocumentsList = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const DocumentCard = styled(BaseDocumentCard)`
	margin-right: 2.4rem;
	margin-bottom: 3rem;
`;

export const NestedFoldersList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const EmptyFolder = styled.div`
	display: flex;
	align-items: center;
`;
export const ContentCard = styled.div``;

export const CardTitle = styled.p`
	opacity: 0.5;
	padding-bottom: 0.5rem;
	font-size: 1.3rem;
`;
export const IconContent = styled.div`
	position: absolute;
	top: 21rem;
	left: 29.5rem;
`;

export const PageHeaderBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const FooterBlockContent = styled.div`
	display: flex;
	margin-right: 55%;
`;

//Dropzone Styles

interface FileDropZone {
	active: boolean;
}

export const FileDropZone = styled.div<FileDropZone>`
	padding: 1rem;
	outline: none;
	width: 64rem;
	height: 31rem;
	border: 0.2rem dashed ${props => (props.active ? Colors.blue[100] : '#cccccc')};
`;

export const FileDropInput = styled.input``;

export const FolderModalUpload = styled(BaseModal)`
	height: 55rem;
`;

export const UploadIconContent = styled.div`
	margin-top: 6rem;
`;
