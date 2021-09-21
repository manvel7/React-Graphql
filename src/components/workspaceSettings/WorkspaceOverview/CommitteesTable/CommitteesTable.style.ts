import styled from 'styled-components';
import { Colors, Fonts } from '../../../../environment';
import { DangerButton as BaseDangerButton } from '../../../ui';
export const CommitteesTableContainer = styled.div`
	margin-bottom: 2.4rem;
`;
export const Table = styled.table`
	width: 100%;
`;

export const Thead = styled.thead`
	text-align: left;
	margin-bottom: 0.8rem;
`;

export const TBody = styled.tbody`
	width: 100%;
	padding-top: 2rem;
`;

export const Tr = styled.tr`
	cursor: pointer;
	width: 100%;
`;

export const Th = styled.th`
	color: ${Colors.typoPlaceholder};
	font-family: ${Fonts.heading};
	font-size: 1.3rem;
	font-weight: 500;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
	padding: 1.2rem 1.6rem;
`;

export const Td = styled.td`
	font-family: ${Fonts.paragraph};
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	padding: 1.4rem 1.6rem;
	border-bottom: 0.1rem solid ${Colors.blue[8]};
`;

export const ActionsBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const DangerButton = styled(BaseDangerButton)`
	margin-right: 0.8rem;
`;
