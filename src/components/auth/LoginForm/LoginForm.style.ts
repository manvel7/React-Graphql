import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';

import { Input as DefaultInput } from '../../ui/Input';
import { Colors, Fonts } from '../../../environment';

export const Form = styled.form`
	width: 36rem;
`;

export const Input = styled(DefaultInput)`
	margin-bottom: 4rem;
`;

export const ForgotPasswordBlock = styled.div`
	margin: 2.4rem 0;
	text-align: center;
`;

export const FormInfoBlock = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
`;

export const FormInfoText = styled.p`
	color: ${Colors.typoPlaceholder};
	font-size: 1.4rem;
	line-height: 150%;
	text-align: left;
	margin-left: 2rem;
`;

export const NavLink = styled(BaseNavLink)`
	text-decoration: none;
	font-family: ${Fonts.paragraph};
	font-size: 1.5rem;
	color: ${Colors.neutralBlue[100]};
`;
