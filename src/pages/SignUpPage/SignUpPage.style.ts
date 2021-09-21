import styled from 'styled-components';
import { Fonts, Colors } from '../../environment';

export const PageMainContent = styled.main`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SignUpContainer = styled.div`
	display: flex;
`;

export const SignUpLeftBlock = styled.div`
	margin-right: 3.2rem;
	margin-bottom: 3rem;

	min-width: 25.4rem;
`;

export const SignUpLeftBlockTitle = styled.h1`
	font-size: 3.2rem;
	font-weight: 800;
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	margin-bottom: 1rem;
`;

export const SignUpLeftBlockText = styled.p`
	font-size: 1.8rem;
	color: ${Colors.gray[100]};
`;

export const SignUpLeftBlockImg = styled.img`
	max-width: 100%;
	margin-left: -5.7rem;
`;

interface FormContainerProps {
	step: number;
}

export const FormContainer = styled.div<FormContainerProps>`
	width: ${props => (props.step > 4 ? '66rem' : '36rem')};
`;

export const PageHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 6.4rem;
`;

export const PageTitleBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const PageTitle = styled.h4`
	font-weight: 800;
	font-family: ${Fonts.title};
	color: ${Colors.black[100]};
	margin-right: 1.3rem;
`;

export const PageTitleImg = styled.img``;

export const PageSubTitle = styled.h4`
	color: ${Colors.gray[100]};
	font-weight: 400;
	margin-top: 1.3rem;
`;

export const PageTypoDarkText = styled.p`
	font-size: 1.5rem;
	color: ${Colors.gray[100]};
	margin-top: 1.8rem;
`;
