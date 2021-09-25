import styled from 'styled-components';
import { Fonts, Colors } from '../../environment';

export const PageMainContent = styled.main`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LoginContainer = styled.div`
	display: flex;
`;

export const LoginLeftBlock = styled.div`
	margin-right: 3.2rem;
	margin-bottom: 3rem;

	min-width: 29.2rem;
`;

export const LoginLeftBlockTitle = styled.h1`
	font-size: 3.2rem;
	font-weight: 800;
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	margin-bottom: 1rem;
`;

export const LoginLeftBlockText = styled.p`
	font-size: 1.8rem;
	color: ${Colors.gray[100]};
`;

export const LoginLeftBlockImg = styled.img`
	max-width: 100%;
`;
