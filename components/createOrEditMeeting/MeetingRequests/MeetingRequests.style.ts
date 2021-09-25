import styled from 'styled-components';
import { Fonts, Colors } from '../../../environment';

export const PageContainer = styled.div`
    widthL 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem 0 4rem;
`;

export const PageFilters = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1.4rem 2rem;
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
	margin-right: 0.8rem;
	display: flex;
	align-items: center;
`;

export const FiltersItemText = styled.p`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.gray[100]};
	margin-right: 0.8rem;
`;

export const RequestsList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
