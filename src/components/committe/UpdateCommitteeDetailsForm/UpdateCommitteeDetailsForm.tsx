import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Committee } from '@epolitiker/api';
import { CommitteeVisibility } from '@epolitiker/api/dist/generated';

import { Form, Input, AutoComplete } from './UpdateCommitteeDetailsForm.style';
import { PrimaryButton, ButtonTypes, ButtonSize } from '../../ui/Button';
import { useTranslation } from '../../../hooks';
import { committeeVisibilities } from '../../../consts';

export interface UpdateCommitteeDetailsFormValues {
	label: string;
	description: string;
	visibility: CommitteeVisibility;
}

interface UpdateCommitteeDetailsFormProps {
	handleUpdate: (updatedCommitteeData: UpdateCommitteeDetailsFormValues) => void;
	loading: boolean;
	committeeDetails: Committee;
}

export function UpdateCommitteeDetailsForm({
	committeeDetails,
	handleUpdate,
	loading
}: UpdateCommitteeDetailsFormProps) {
	const translate = useTranslation();

	const UPDATE_COMMITTEE_DETAILS_SCHEMA = yup.object().shape({
		label: yup.string().required(translate(({ inputs }) => inputs.name.required)),
		description: yup.string(),
		visibility: yup.string()
	});

	const formik = useFormik({
		initialValues: {
			label: committeeDetails.label,
			description: committeeDetails.description || '',
			visibility: committeeDetails.visibility
		},
		validateOnMount: true,
		validationSchema: UPDATE_COMMITTEE_DETAILS_SCHEMA,
		onSubmit: values => handleUpdate(values)
	});

	const {
		values,
		handleChange,
		handleSubmit,
		errors,
		touched,
		handleBlur,
		isValid,
		setFieldValue
	} = formik;

	return (
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
			<Input
				label={translate(({ inputs }) => inputs.description.label)}
				placeholder={translate(({ inputs }) => inputs.description.placeholder)}
				name="description"
				onChange={handleChange}
				value={values.description}
				error={touched.description ? errors.description : undefined}
				onBlur={handleBlur}
			/>
			<AutoComplete
				label={translate(({ tabs }) => tabs.visibility)}
				value={committeeVisibilities.find(item => item.value === values.visibility)?.label}
			>
				{committeeVisibilities.map((item, i) => (
					<AutoComplete.Item
						key={`visibility-item-${i}`}
						onClick={() => setFieldValue('visibility', item.value)}
					>
						{item.label}
					</AutoComplete.Item>
				))}
			</AutoComplete>
			<PrimaryButton
				size={ButtonSize.LG}
				type={ButtonTypes.Submit}
				title={translate(({ buttons }) => buttons.update)}
				onClick={handleSubmit}
				loading={loading}
				disabled={!isValid || loading}
			/>
		</Form>
	);
}
