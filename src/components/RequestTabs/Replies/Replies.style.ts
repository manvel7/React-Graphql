import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const RepliesComponentContainer = styled.div``;

export const FiltersItem = styled.div`
	margin-right: 0.8rem;
	display: flex;
	align-items: center;
`;

export const FiltersItemText = styled.p`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.gray[100]};
	margin-right: 0.8rem;
	margin-left: 4rem;
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

export const PageFilters = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1.4rem 2rem;
	align-items: center;
`;

export const RequestsList = styled.div`
	display: flex;
	flex-direction: column;
	width: 97%;
	margin-left: 4rem;
`;

export const FiltersItemSub = styled.span`
	opacity: 0.5;
	margin-left: 1.5rem;
`;
export const FiltersItemSubDark = styled.span`
	margin-left: 0.5rem;
	color: #222222;
	font-weight: 800;
`;

export const FiltersItemSubDarkFilter = styled.span`
	margin-left: 1.5rem;
	color: #222222;
	font-weight: 800;
`;
