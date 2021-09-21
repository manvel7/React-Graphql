import React, { useState } from 'react';

import { SignUpForm } from '../../components/auth';
import {
	PageMainContent,
	SignUpContainer,
	SignUpLeftBlock,
	SignUpLeftBlockTitle,
	SignUpLeftBlockText,
	SignUpLeftBlockImg,
	FormContainer,
	PageHeader,
	PageTitleBlock,
	PageTitle,
	PageTitleImg,
	PageSubTitle,
	PageTypoDarkText
} from './SignUpPage.style';
import { Images } from '../../environment';
import { useTranslation } from '../../hooks';

export function SignUpPage() {
	const translate = useTranslation();
	const [step, setStep] = useState(1);

	return (
		<PageMainContent>
			<SignUpContainer>
				{step < 5 && (
					<SignUpLeftBlock>
						<SignUpLeftBlockTitle>
							{translate(({ signUpPage }) => signUpPage.signUp)}
						</SignUpLeftBlockTitle>
						<SignUpLeftBlockText>
							{translate(({ signUpPage }) => signUpPage.asAnOrganizationAdmin)}
						</SignUpLeftBlockText>
						<SignUpLeftBlockImg src={Images.signUpImg} />
					</SignUpLeftBlock>
				)}

				<FormContainer step={step}>
					{step === 5 && (
						<PageHeader>
							<PageTitleBlock>
								<PageTitle>
									{translate(({ signUpPage }) => signUpPage.welcomeTo)}
								</PageTitle>
								<PageTitleImg src={Images.logo} />
							</PageTitleBlock>
							<PageSubTitle>
								{translate(({ signUpPage }) => signUpPage.setUpYourFirstWorkspace)}
							</PageSubTitle>
						</PageHeader>
					)}
					{step === 6 && (
						<PageHeader>
							<PageTitleBlock>
								<PageTitle>
									{translate(({ signUpPage }) => signUpPage.welcomeTo)}
								</PageTitle>
								<PageTitleImg src={Images.logo} />
							</PageTitleBlock>
							<PageTypoDarkText>
								Fill out your profile information. This info will be visible to all
								people in your workspace
							</PageTypoDarkText>
						</PageHeader>
					)}

					<SignUpForm step={step} setStep={setStep} />
				</FormContainer>
			</SignUpContainer>
		</PageMainContent>
	);
}
