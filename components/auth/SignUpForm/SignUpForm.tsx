import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Axios from 'axios';

import { Organization } from '@epolitiker/api';

import {
	useTranslation,
	useEffectOnce,
	useAlerts,
	useCreateUserAccountMutation,
	useCreateUserIdentityMutation,
	useCreateWorkspaceMutation,
	useNavigation,
	useVerifyEmailMutation,
	useLocalStorage
} from '../../../hooks';
import { LightButton, ButtonSize, ButtonTypes } from '../../ui/Button';
import { SignUpFormSchema } from './SignUpFormSchema';

import {
	Form,
	Input,
	FormStepTitle,
	StepBlock,
	StepBlockActiveText,
	StepBlockText,
	FormInfoBlock,
	FormInfoText,
	NavLink,
	FileInputContainer,
	FileInput,
	FileInputLabel,
	FileInputBlock,
	FileInputLabelImg,
	FileInputText
} from './SignUpForm.style';
import { IconType, StorageKey } from '../../../consts';
import { Images } from '../../../environment';

export interface SignUpFormValues {
	country: string;
	firstName: string;
	lastName: string;
	email: string;
	verifyEmail: string;
	phone: string;
	workspace: string;
	organization: string;
	password: string;
	confirmPassword: string;
}

const orgInitialValues = {
	number: '',
	name: '',
	code: '',
	address: ''
};

interface CountryType {
	country_name: string;
	country_calling_code: string;
}

interface SignUpFormProps {
	step: number;
	setStep: (step: number) => void;
}

export function SignUpForm({ step, setStep }: SignUpFormProps) {
	const translate = useTranslation();
	const { routes, navigate } = useNavigation();
	const { setError, setNotification } = useAlerts();
	const [, setStorageToken, removeStorageToken] = useLocalStorage(StorageKey.Token);

	const [org, setOrg] = useState<Organization>(orgInitialValues);
	const [country, setCountry] = useState<CountryType>({
		country_name: '',
		country_calling_code: '+000'
	});

	const [authToken, setAuthToken] = useState('');
	const [workspaceLogo, setWorkspaceLogo] = useState<File | null>(null);

	const [
		createUserAccount,
		{ data: createUserAccountData, loading: createUserAccountLoading }
	] = useCreateUserAccountMutation();

	const [
		verifyEmail,
		{ data: verifyEmailData, loading: verifyEmailLoading }
	] = useVerifyEmailMutation();

	const [
		createUserIdentity,
		{ data: createUserIdentityData, loading: createUserIdentityLoading }
	] = useCreateUserIdentityMutation();

	const [
		createWorkspace,
		{ data: createWorkspaceData, loading: createWorkspaceLoading }
	] = useCreateWorkspaceMutation();

	const SIGNUP_VALIDATION_SCHEMA = SignUpFormSchema();
	const formik = useFormik({
		initialValues: {
			country: '',
			firstName: '',
			lastName: '',
			email: '',
			verifyEmail: '',
			phone: '',
			workspace: '',
			organization: '',
			password: '',
			confirmPassword: ''
		},
		validateOnMount: false,
		validationSchema: SIGNUP_VALIDATION_SCHEMA,
		onSubmit: () => handleCreateWorkspace()
	});

	const { values, handleChange, handleSubmit, errors, touched, handleBlur, isValid } = formik;
	useEffect(() => {
		const orgNumber = values.organization.replace(/\s/g, '');
		if (orgNumber.length === 9) {
			Axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`)
				.then(res => {
					const organizationData: Organization = {
						number: res.data.organisasjonsnummer,
						name: res.data.navn,
						code: res.data.organisasjonsform.kode,
						address: res.data.forretningsadresse.adresse[0]
					};
					setOrg(organizationData);
				})
				.catch(() => {
					setError({
						message: translate(
							({ messages }) => messages.signUp.organizationInfoFailed,
							{ orgNumber }
						)
					});
				});
		}
	}, [values.organization]);

	useEffectOnce(() => {
		async function getCountry() {
			try {
				const { data } = await Axios.get(`https://ipapi.co/json/`);
				setCountry(data);
			} catch (e) {
				setError({
					message: translate(({ messages }) => messages.signUp.countryDetectionFailed)
				});
			}
		}

		getCountry();
	});

	//Step 2
	function handleCreateUserAccount() {
		createUserAccount({
			variables: {
				data: {
					email: values.email,
					firstName: values.firstName,
					lastName: values.lastName,
					phoneNumber: values.phone,
					role: 'ADMIN'
				}
			}
		});
	}

	useEffect(() => {
		if (createUserAccountData) {
			setAuthToken(createUserAccountData.createUserAccount.token);
			setStep(3);
		}
	}, [createUserAccountData]);

	//Step 3
	function handleVerifyEmail() {
		verifyEmail({
			variables: {
				data: {
					code: values.verifyEmail,
					token: authToken
				}
			}
		});
	}

	useEffect(() => {
		if (verifyEmailData) {
			setAuthToken(verifyEmailData.verifyEmail.token);
			setStep(4);
		}
	}, [verifyEmailData]);

	//Step 4
	function handleCreateUserIdentity() {
		createUserIdentity({
			variables: {
				password: values.password,
				token: authToken
			}
		});
	}

	useEffect(() => {
		if (createUserIdentityData) {
			setAuthToken(createUserIdentityData.createUserIdentity.token);
			setStorageToken(createUserIdentityData.createUserIdentity.token);
			setStep(5);
		}
	}, [createUserIdentityData]);

	//Step 5
	function handleCreateWorkspace() {
		createWorkspace({
			variables: {
				data: {
					name: values.workspace,
					organization: {
						number: org.number,
						name: org.name,
						code: org.code,
						address: org.address
					},
					logo: workspaceLogo
				}
			}
		});
	}

	useEffect(() => {
		if (createWorkspaceData) {
			removeStorageToken();
			navigate(routes.login);
			setNotification({ message: translate(({ messages }) => messages.signUp.success) });
		}
	}, [createWorkspaceData]);

	function handleGetWorkspaceLogo(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			setWorkspaceLogo(e.target.files[0]);
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			{step < 5 && (
				<StepBlock>
					<StepBlockText>
						{translate(({ signUpPage }) => signUpPage.step)} &nbsp;
					</StepBlockText>
					<StepBlockActiveText>{step}</StepBlockActiveText>
					<StepBlockText>/5</StepBlockText>
				</StepBlock>
			)}

			{step === 1 && (
				<>
					<FormStepTitle>
						{translate(({ signUpPage }) => signUpPage.verifyOrganization)}
					</FormStepTitle>
					<Input
						required
						label={translate(({ inputs }) => inputs.country.label)}
						onChange={handleChange}
						value={(country && country.country_name) || values.country}
						disabled
					/>
					<Input
						required
						placeholder={`(${country.country_calling_code})  _ _ _ _ _ _`}
						label={translate(({ inputs }) => inputs.phone.label)}
						name="phone"
						onChange={handleChange}
						value={values.phone}
						error={touched.phone ? errors.phone : undefined}
						onBlur={handleBlur}
					/>
					<Input
						required
						label={translate(({ inputs }) => inputs.organization.label)}
						placeholder={translate(({ inputs }) => inputs.organization.placeholder)}
						name="organization"
						onChange={handleChange}
						value={values.organization}
						error={touched.organization ? errors.organization : undefined}
						onBlur={handleBlur}
						helpText={org?.name ? org.name : ''}
					/>
					<LightButton
						floating
						title={translate(({ buttons }) => buttons.next)}
						onClick={() => setStep(2)}
						rightIcon={IconType.EpArrowRight}
						size={ButtonSize.XL}
						type={ButtonTypes.Button}
					/>
				</>
			)}

			{step === 2 && (
				<>
					<FormStepTitle>
						{translate(({ signUpPage }) => signUpPage.createYourAccount)}
					</FormStepTitle>
					<Input
						label={translate(({ inputs }) => inputs.firstName.label)}
						placeholder={translate(({ inputs }) => inputs.firstName.placeholder)}
						name="firstName"
						onChange={handleChange}
						value={values.firstName}
						error={touched.firstName ? errors.firstName : undefined}
						onBlur={handleBlur}
					/>
					<Input
						label={translate(({ inputs }) => inputs.lastName.label)}
						placeholder={translate(({ inputs }) => inputs.lastName.placeholder)}
						name="lastName"
						onChange={handleChange}
						value={values.lastName}
						error={touched.lastName ? errors.lastName : undefined}
						onBlur={handleBlur}
					/>
					<Input
						label={translate(({ inputs }) => inputs.email.label)}
						placeholder={translate(({ inputs }) => inputs.email.placeholder)}
						name="email"
						onChange={handleChange}
						value={values.email}
						error={touched.email ? errors.email : undefined}
						onBlur={handleBlur}
					/>
					<LightButton
						floating
						title={translate(({ buttons }) => buttons.next)}
						onClick={handleCreateUserAccount}
						rightIcon={IconType.EpArrowRight}
						size={ButtonSize.XL}
						type={ButtonTypes.Button}
						loading={createUserAccountLoading}
						disabled={
							createUserAccountLoading ||
							!values.firstName ||
							!values.lastName ||
							!values.email
						}
					/>
				</>
			)}

			{step === 3 && (
				<>
					<FormStepTitle>
						{translate(({ signUpPage }) => signUpPage.verifyEmail)}
					</FormStepTitle>
					<Input
						label={translate(({ inputs }) => inputs.verifyEmail.label)}
						placeholder={translate(({ inputs }) => inputs.verifyEmail.placeholder)}
						name="verifyEmail"
						onChange={handleChange}
						value={values.verifyEmail}
						error={touched.verifyEmail ? errors.verifyEmail : undefined}
						onBlur={handleBlur}
					/>
					<LightButton
						floating
						title={translate(({ buttons }) => buttons.next)}
						onClick={handleVerifyEmail}
						rightIcon={IconType.EpArrowRight}
						size={ButtonSize.XL}
						type={ButtonTypes.Button}
						disabled={!values.verifyEmail || verifyEmailLoading}
						loading={verifyEmailLoading}
					/>
				</>
			)}

			{step === 4 && (
				<>
					<FormStepTitle>
						{translate(({ signUpPage }) => signUpPage.createAPassword)}
					</FormStepTitle>
					<Input
						password
						label={translate(({ inputs }) => inputs.password.label)}
						placeholder={translate(({ inputs }) => inputs.password.placeholder)}
						name="password"
						onChange={handleChange}
						value={values.password}
						error={touched.password ? errors.password : undefined}
						onBlur={handleBlur}
						helpText={translate(({ inputs }) => inputs.password.minLength)}
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
					<LightButton
						floating
						title={translate(({ buttons }) => buttons.continue)}
						onClick={handleCreateUserIdentity}
						rightIcon={IconType.EpArrowRight}
						size={ButtonSize.XL}
						type={ButtonTypes.Button}
						loading={createUserIdentityLoading}
						disabled={createUserIdentityLoading}
					/>
					<FormInfoBlock>
						<FormInfoText>
							{translate(({ loginPage }) => loginPage.termsText)}
							{` `}
							<NavLink to="/privacy-policy">Terms and Conditions</NavLink>
							{` and `}
							<NavLink to="/privacy-policy">Privacy Policy.</NavLink>
						</FormInfoText>
					</FormInfoBlock>
				</>
			)}

			{step === 5 && (
				<>
					<FormInfoText>
						{translate(({ signUpPage }) => signUpPage.yourWorkspaceName)}
					</FormInfoText>
					<Input
						label={translate(({ inputs }) => inputs.workspace.label)}
						name="workspace"
						placeholder={translate(({ inputs }) => inputs.workspace.placeholder)}
						onChange={handleChange}
						value={values.workspace}
						error={touched.workspace ? errors.workspace : undefined}
						onBlur={handleBlur}
					/>

					<FileInputContainer>
						<FileInputBlock>
							<FileInput
								type="file"
								onChange={handleGetWorkspaceLogo}
								accept="image/*"
								id="workspaceLogoUpload"
							/>
							<FileInputLabel htmlFor="workspaceLogoUpload">
								<FileInputLabelImg
									src={
										workspaceLogo
											? URL.createObjectURL(workspaceLogo)
											: Images.test
									}
								/>
							</FileInputLabel>
						</FileInputBlock>

						<FileInputText>
							{translate(({ signUpPage }) => signUpPage.uploadWorkspaceLogo)}
						</FileInputText>
					</FileInputContainer>

					<LightButton
						floating
						size={ButtonSize.XL}
						title={translate(({ buttons }) => buttons.signup)}
						onClick={handleCreateWorkspace}
						loading={createWorkspaceLoading}
						disabled={!isValid || createWorkspaceLoading}
					/>
				</>
			)}
		</Form>
	);
}
