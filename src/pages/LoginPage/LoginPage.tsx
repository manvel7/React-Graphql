import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import {
	PageMainContent,
	LoginContainer,
	LoginLeftBlock,
	LoginLeftBlockTitle,
	LoginLeftBlockText,
	LoginLeftBlockImg
} from './LoginPage.style';

import {
	useNavigation,
	useLoginMutation,
	useTranslation,
	useAlerts,
	useLocalStorage
} from '../../hooks';
import { StorageKey } from '../../consts';
import { LoginForm } from '../../components/auth';
import { Images } from '../../environment';

export function LoginPage() {
	const { setError } = useAlerts();
	const translate = useTranslation();
	const { navigate, routes } = useNavigation();
	const [authToken, setAuthToken] = useLocalStorage(StorageKey.Token);
	const [, setActiveWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [, setUserRole] = useLocalStorage(StorageKey.UserRole);

	const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
		email: yup
			.string()
			.email(translate(({ inputs }) => inputs.email.invalid))
			.required(translate(({ inputs }) => inputs.email.required)),
		password: yup.string().required(translate(({ inputs }) => inputs.password.required))
	});

	const [login, { data: loginData, loading: loginLoading }] = useLoginMutation();

	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: LOGIN_VALIDATION_SCHEMA,
		onSubmit: ({ email, password }) => handleLogin(email, password)
	});

	function handleLogin(email: string, password: string) {
		if (authToken) {
			setError({
				message: translate(({ messages }) => messages.login.alreadyLoggedIn)
			});
			return;
		}

		login({
			variables: { email, password }
		});
	}

	useEffect(() => {
		if (loginData) {
			const token = loginData.login.token;
			const user = loginData.login.user;
			setAuthToken(token);
			setUserRole(user.role);
			if (user.role === 'SUPER') {
				navigate(routes.workspaces);
			} else if (user.role === 'ADMIN') {
				if (user.owningWorkspaces.length > 0) {
					setActiveWorkspace(user.owningWorkspaces[0]);
					navigate(routes.dashboard);
				} else {
					setError({
						message: translate(({ messages }) => messages.login.workspaceNotFound)
					});
				}
			} else {
				if (user.workspaces.length > 0) {
					setActiveWorkspace(user.workspaces[0]);
					navigate(routes.dashboard);
				} else {
					setError({
						message: translate(({ messages }) => messages.login.workspaceNotFound)
					});
				}
			}
		}
	}, [loginData]);

	return (
		<PageMainContent>
			<LoginContainer>
				<LoginLeftBlock>
					<LoginLeftBlockTitle>
						{translate(({ loginPage }) => loginPage.login)}
					</LoginLeftBlockTitle>
					<LoginLeftBlockText>
						{translate(({ loginPage }) => loginPage.asAnOrganizationMember)}
					</LoginLeftBlockText>
					<LoginLeftBlockImg src={Images.loginPageImg} />
				</LoginLeftBlock>
				<LoginForm formik={formik} loading={loginLoading} />
			</LoginContainer>
		</PageMainContent>
	);
}
