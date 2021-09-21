import styled from 'styled-components';
import { Colors } from '../../../environment';

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const PageHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 2rem;
	margin-bottom: 2rem;
	border-bottom: 0.1rem solid ${Colors.overlay[25]};
`;

export const PageContent = styled.section`
	display: flex;
	margin: 1rem 2rem;
	overflow-y: scroll;
	height: 100vh;
`;

export const DefaultPartiesList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
