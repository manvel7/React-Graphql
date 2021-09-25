import styled from 'styled-components';
import { Colors, Fonts } from '../../environment';
import { DocumentCard as BaseDocumentCard } from '../../components/cards';
import { GhostButton as BaseGhostButton } from '../../components/ui';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 0 0 2rem;
	width: 100%;
`;

export const PageTopBar = styled.div`
	padding: 2rem;
	font-size: 1.4rem;
	font-family: ${Fonts.paragraph};
	color: ${Colors.gray[100]};
`;

export const PageWrapper = styled.div`
	display: flex;
	margin-top: 1.6rem;
`;

export const PageSideBarContainer = styled.div`
	min-width: 23rem;
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
`;

export const SideBarItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: fit-content;
	padding: 0.4rem 0.8rem;
	margin-bottom: 1.8rem;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	font-weight: bold;
	color: ${Colors.typoPlaceholder};
	border-radius: 0.6rem;
	background-color: ${Colors.transparent};
	cursor: pointer;

	:hover {
		background-color: ${Colors.neutralBlue[10]};
	}
`;

export const SideBarList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const PageFilterBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 0.5rem;
	margin-bottom: 1.5rem;
	padding: 1.4rem 2rem;
`;

export const FilterBarText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.gray[100]};
`;

export const PageMainContent = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: calc(100vh - 5.6rem);
	overflow-y: scroll;
`;

export const ComponentBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 5rem;
	padding: 0 2rem;
`;

export const HeadingBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.7rem 0;
	margin-bottom: 0.8rem;
`;

export const NavBlock = styled.div`
	width: 7.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const NavButton = styled(BaseGhostButton)``;

export const PageHeading = styled.p`
	font-size: 1.5rem;
	color: ${Colors.typoPlaceholder};
	font-weight: 800;
`;

export const DocumentsContainer = styled.div`
	display: flex;
`;

export const DocumentCard = styled(BaseDocumentCard)`
	margin-right: 2.4rem;
`;

export const GhostButton = styled(BaseGhostButton)`
	margin-top: 1.6rem;
`;
export const AllFolderContent = styled.span`
	font-size: 1.2rem;
	margin-left: 0.5rem;
`;
