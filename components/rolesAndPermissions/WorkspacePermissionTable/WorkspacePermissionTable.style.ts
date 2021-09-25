import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const WorkspacePermissionsTableContainer = styled.div`
	width: 95rem;
`;

export const WorkspacePermissionsHeader = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
`;

export const WorkspacePermissionsTitle = styled.p`
	font-size: 1.6rem;
	font-weight: 700;
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	margin-bottom: 0;
`;
interface ShowAllProps {
	showAll: boolean;
}
export const TableContainer = styled.div<ShowAllProps>`
	display: flex;
	width: 140rem;
	max-width: 100%;
	margin-top: 2rem;
	height: ${props => (props.showAll ? 'auto' : '32rem')};
	overflow: ${props => (props.showAll ? '' : 'hidden')};
`;

export const TableBlock = styled.table`
	width: 95rem;
`;

export const TheadBlock = styled.thead`
	text-align: center;
	margin-bottom: 0.8rem;
`;

export const Tr = styled.tr`
	cursor: pointer;
	width: 100%;
	font-size: 1.3rem;
`;

export const Td = styled.td`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	padding: 1.4rem 1.6rem;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
`;

export const FooterContainer = styled.div`
	margin-top: 2rem;
`;

export const FooterEditContent = styled.div`
	display: flex;
	align-items: center;
	margin-top: 2rem;
`;

export const CancelButton = styled.div`
	margin-left: 2rem;
`;

export const EditMode = styled.div`
	margin-left: 1rem;
`;
