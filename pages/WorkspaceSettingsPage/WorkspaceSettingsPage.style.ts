import styled from 'styled-components';
import { Colors } from '../../environment';

export const PageWrapper = styled.div`
	width: 100%;
	padding-left: 4rem;
	background-color: ${Colors.lightColorLight};
`;

export const PageTopBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.4rem 1.4rem 1.4rem 0;
`;

export const PageTitleBlock = styled.div`
	padding: 1rem 0;
`;

export const PageTitle = styled.h4`
	font-weight: 800;
	color: ${Colors.black[100]};
`;

export const PageContainer = styled.div`
	margin-top: 4rem;
	display: flex;
`;

export const PageNavContent = styled.div`
	margin-right: 8rem;
	border-right: 0.1rem solid ${Colors.blue[10]};
	padding-right: 3rem;
`;

export const PageContentWrapper = styled.div`
	width: 100%;
	height: calc(100vh - 14.4rem);
	overflow-y: scroll;
`;

export const PageMainContent = styled.div`
	max-width: 72rem;
	width: 72rem;
`;
