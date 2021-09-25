import React from 'react';
import { FormikProps } from 'formik';

import { useTranslation } from '../../../hooks';
import { ButtonSize, LightButton } from '../../ui/Button';
import {
	Form,
	Input,
	ForgotPasswordBlock,
	FormInfoBlock,
	FormInfoText,
	NavLink
} from './LoginForm.style';
import { IconType } from '../../../consts';

interface LoginFormValues {
	email: string;
	password: string;
}

interface LoginScreenViewProps {
	formik: FormikProps<LoginFormValues>;
	loading: boolean;
}

export function LoginForm({
	formik: { values, handleChange, handleSubmit, errors, touched, handleBlur, isValid },
	loading
}: LoginScreenViewProps) {
	const translate = useTranslation();

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				label={translate(({ inputs }) => inputs.email.label)}
				placeholder={translate(({ inputs }) => inputs.email.placeholder)}
				name="email"
				onChange={handleChange}
				value={values.email}
				error={touched.email ? errors.email : undefined}
				onBlur={handleBlur}
			/>
			<Input
				password
				label={translate(({ inputs }) => inputs.password.label)}
				placeholder={translate(({ inputs }) => inputs.password.enterPassword)}
				name="password"
				onChange={handleChange}
				value={values.password}
				error={touched.password ? errors.password : undefined}
				onBlur={handleBlur}
			/>
			<LightButton
				floating
				disabled={!isValid}
				title={translate(({ buttons }) => buttons.login)}
				size={ButtonSize.XL}
				onClick={handleSubmit}
				loading={loading}
				rightIcon={IconType.EpArrowRight}
			/>

			<ForgotPasswordBlock>
				<NavLink to="/">{translate(({ loginPage }) => loginPage.forgotPassword)}</NavLink>
			</ForgotPasswordBlock>
			<FormInfoBlock>
				<FormInfoText>
					{translate(({ loginPage }) => loginPage.termsText)}
					{` `}
					<NavLink to="/privacy-policy">Terms and Conditions</NavLink>
					{` and `}
					<NavLink to="/privacy-policy">Privacy Policy.</NavLink>
				</FormInfoText>
			</FormInfoBlock>
		</Form>
	);
}
