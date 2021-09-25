import styled from 'styled-components';
import { Fonts } from '../../../environment';

export const TableContainer = styled.div`
	padding: 1rem;
	table {
		border-spacing: 0;
		border: 1px solid black;
		width: 100%;
		font-size: 14px;
		font-family: ${Fonts.paragraph};
		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}
		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;
			:last-child {
				border-right: 0;
			}
		}
	}
`;
