import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { Input as DefaultInput } from '../../ui/Input';
import { Colors, Fonts } from '../../../environment';

export const Input = styled(DefaultInput)`
	margin-bottom: 3.2rem;
`;

export const Form = styled.form`
	// width: 36rem;
`;

export const OrgView = styled.div`
	text-align: center;
	padding: 0 1rem;
	margin-bottom: 4rem;
`;

export const OrgName = styled.p`
	font-size: 1.8rem;
`;

export const OrgAddress = styled.p`
	font-size: 1.6rem;
`;

export const FormStepTitle = styled.h5`
	font-size: 2rem;
	font-weight: 800;
	color: ${Colors.black[100]};
	margin-bottom: 3.2rem;
`;

export const StepBlock = styled.div`
	display: flex;
	margin-bottom: 2.4rem;
`;

export const StepBlockText = styled.p`
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.typoPlaceholder};
`;

export const StepBlockActiveText = styled.p`
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	color: ${Colors.black[100]};
`;

export const FormInfoBlock = styled.div`
	text-align: center;
	margin-top: 2.4rem;
`;

export const FormInfoText = styled.p`
	color: ${Colors.typoPlaceholder};
	font-size: 1.4rem;
	line-height: 150%;
	margin-bottom: 1.6rem;
	text-align: center;
`;

export const NavLink = styled(BaseNavLink)`
	text-decoration: none;
	font-family: ${Fonts.paragraph};
	font-size: 1.5rem;
	color: ${Colors.neutralBlue[100]};
`;

export const FileInputContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 6rem;
`;

export const FileInputBlock = styled.div`
	display: flex;
	border: 0.8rem solid ${Colors.neutralBlue[8]};
	border-radius: 1.4rem;
	margin-bottom: 1.6rem;
`;

export const FileInput = styled.input`
	display: none;
`;

export const FileInputLabel = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	width: 7.2rem;
	height: 7.2rem;
	border: 0.1rem solid ${Colors.neutralBlue[40]};
	border-radius: 1.4rem;
	transition: 0.3s;
	box-shadow: 0px 10px 20px rgba(33, 9, 9, 0.05);
`;

export const FileInputLabelImg = styled.img`
	max-width: 7rem;
	max-height: 7rem;
	border-radius: 1.4rem;
`;

export const FileInputText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.gray[100]};
`;
