import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import {
	useTranslation,
	useCreateUserIdentityMutation,
	useNavigation,
	useAlerts
} from '../../hooks';
import { PrimaryButton, ButtonSize } from '../../components/ui';
import { CreateProfileContainer, Form, Input } from './CreateProfilePage.style';
import { StorageKey } from '../../consts';

export function CreateProfilePage() {
	const { token } = useParams();
	const translate = useTranslation();
	const { navigate, routes } = useNavigation();
	const { setNotification } = useAlerts();

	const [
		createUserIdentity,
		{ data: createUserIdentityData, loading: createUserIdentityLoading }
	] = useCreateUserIdentityMutation();

	const CREATE_PROFILE_VALIDATION_SCHEMA = yup.object().shape({
		password: yup
			.string()
			.required(translate(({ inputs }) => inputs.password.required))
			.min(
				8,
				translate(({ inputs }) => inputs.password.minLength)
			)
			.matches(
				/([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])/,
				translate(({ inputs }) => inputs.password.invalid)
			),
		confirmPassword: yup
			.string()
			.required(translate(({ inputs }) => inputs.confirmPassword.required))
			.oneOf(
				[yup.ref('password'), null],
				translate(({ inputs }) => inputs.confirmPassword.invalid)
			)
	});

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: ''
		},
		validateOnMount: false,
		validationSchema: CREATE_PROFILE_VALIDATION_SCHEMA,
		onSubmit: formValues => handleCreateProfile(formValues.password)
	});

	function handleCreateProfile(password: string) {
		createUserIdentity({
			variables: {
				password,
				token
			}
		});
	}

	useEffect(() => {
		if (createUserIdentityData) {
			setNotification({ message: 'Password saved successfully!' });
			localStorage.setItem(StorageKey.Token, createUserIdentityData.createUserIdentity.token);
			navigate(routes.members);
		}
	}, [createUserIdentityData]);

	const { values, errors, touched, isValid, handleChange, handleBlur, handleSubmit } = formik;

	return (
		<CreateProfileContainer>
			<h1>Create Profile Page</h1>
			<Form onSubmit={handleSubmit}>
				<Input
					password
					label={translate(({ inputs }) => inputs.password.label)}
					placeholder={translate(({ inputs }) => inputs.password.placeholder)}
					name="password"
					onChange={handleChange}
					value={values.password}
					error={touched.password ? errors.password : undefined}
					onBlur={handleBlur}
				/>
				<Input
					password
					label={translate(({ inputs }) => inputs.confirmPassword.label)}
					placeholder={translate(({ inputs }) => inputs.confirmPassword.placeholder)}
					name="confirmPassword"
					onChange={handleChange}
					value={values.confirmPassword}
					error={touched.confirmPassword ? errors.confirmPassword : undefined}
					onBlur={handleBlur}
				/>
				<PrimaryButton
					title={translate(({ buttons }) => buttons.signup)}
					size={ButtonSize.MD}
					onClick={handleSubmit}
					loading={createUserIdentityLoading}
					disabled={!isValid || createUserIdentityLoading}
				/>
			</Form>
		</CreateProfileContainer>
	);
}
