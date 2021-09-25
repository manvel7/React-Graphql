import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import {
	CreateCommitteeFormContainer,
	Form,
	AccessContainer,
	SubTitle,
	InfoBlockWrapper,
	InfoBlock,
	InfoBlockIconWrapper,
	InfoContainer,
	InfoTitle,
	InfoText,
	GhostButton,
	SelectStructureBlock,
	SelectItemsList,
	SelectItem,
	SelectItemTitle
} from './CreateCommitteeForm.style';
import { useTranslation } from '../../../hooks';
import { Input, Icon, ButtonSize, Checkbox } from '../../ui';
import { IconType } from '../../../consts';

export interface CreateCommitteeFormValues {
	label: string;
}

interface CreateCommitteeFormProps {
	handleCreate: (newCommitteeData: CreateCommitteeFormValues) => void;
	submitFromOutside: boolean;
	setSubmitFromOutside: (value: boolean) => void;
}

export function CreateCommitteeForm({
	handleCreate,
	submitFromOutside,
	setSubmitFromOutside
}: CreateCommitteeFormProps) {
	const translate = useTranslation();

	const committeeStructureData = [
		{
			title: translate(({ titles }) => titles.committeOverviewPage),
			checked: true
		},
		{
			title: translate(({ titles }) => titles.membersPage),
			checked: true
		},
		{
			title: translate(({ titles }) => titles.calendar),
			checked: true
		},
		{
			title: translate(({ titles }) => titles.generalDocuments),
			checked: true
		}
		// {
		// 	title: translate(({ titles }) => titles.committeProtocols),
		// 	checked: false
		// }
	];

	const CREATE_COMMITTEE_SCHEMA = yup.object().shape({
		label: yup.string().required(translate(({ inputs }) => inputs.name.required))
	});

	const formik = useFormik({
		initialValues: {
			label: ''
		},
		validateOnMount: true,
		validationSchema: CREATE_COMMITTEE_SCHEMA,
		onSubmit: values => handleCreate({ ...values })
	});

	const { values, handleChange, handleSubmit, errors, touched, handleBlur } = formik;

	useEffect(() => {
		if (submitFromOutside) {
			handleSubmit();
			setSubmitFromOutside(false);
		}
	}, [submitFromOutside]);

	return (
		<CreateCommitteeFormContainer>
			<Form onSubmit={handleSubmit}>
				<Input
					label={translate(({ inputs }) => inputs.name.label)}
					placeholder={translate(({ inputs }) => inputs.name.placeholder)}
					name="label"
					onChange={handleChange}
					value={values.label}
					error={touched.label ? errors.label : undefined}
					onBlur={handleBlur}
				/>
			</Form>

			<SelectStructureBlock>
				<SubTitle>
					{translate(({ titles }) => titles.selectBlocksForCommitteeStructure)}
				</SubTitle>
				<SelectItemsList>
					{committeeStructureData.map((str, i) => (
						<SelectItem key={`committee-structure-item-${i}`}>
							<Checkbox checked={str.checked} onChange={() => {}} />
							<SelectItemTitle>{str.title}</SelectItemTitle>
						</SelectItem>
					))}
				</SelectItemsList>
			</SelectStructureBlock>

			<AccessContainer>
				<SubTitle>{translate(({ titles }) => titles.accessAndVisibility)}</SubTitle>
				<InfoBlockWrapper>
					<InfoBlock>
						<InfoBlockIconWrapper>
							<Icon name={IconType.EpEye} />
						</InfoBlockIconWrapper>
						<InfoContainer>
							<InfoTitle>
								{translate(({ titles }) => titles.hidenFromEveryone)}
							</InfoTitle>
							<InfoText>
								{translate(({ titles }) => titles.newFolderIsHidenForOtherPeople)}
							</InfoText>
						</InfoContainer>
					</InfoBlock>
					<GhostButton
						size={ButtonSize.SM}
						leftIcon={IconType.EpGlobe}
						title={translate(({ buttons }) => buttons.manage)}
						onClick={() => {}}
					/>
				</InfoBlockWrapper>
			</AccessContainer>
		</CreateCommitteeFormContainer>
	);
}
