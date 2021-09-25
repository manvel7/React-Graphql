import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { PoliticalParty } from '@epolitiker/api/dist/generated';

import { FormContainer, Form, FormItem } from './CreateUpdateDefaultPartyForm.style';
import { Input, PrimaryButton, AutoComplete } from '../../ui';
import { ModalAutoComplete } from '../../workspaceSettings/WorkspaceOverview/WorkspacePartiesList/WorkspacePartiesList.style';

const counteries = [
	'Norway',
	'Finland',
	'Danmark',
	'Sweden',
	'Deautchland',
	'France',
	'Italy',
	'Spain'
];
enum DefaultPartyPositions {
	POSITION = 'POSITION',
	OPPOSITION = 'OPPOSITION'
}

export interface CreateUpdateDefaultPartyFormValues {
	id: string;
	name: string;
	country: string;
	position: DefaultPartyPositions;
}

interface CreateUpdateDefaultPartyFormProps {
	party: PoliticalParty | null;
	handleCreateOrUpdate: (values: CreateUpdateDefaultPartyFormValues) => void;
	loading: boolean;
}

export function CreateUpdateDefaultPartyForm({
	party,
	handleCreateOrUpdate,
	loading
}: CreateUpdateDefaultPartyFormProps) {
	const [searchCountriesByText, setSearchCountriesByText] = useState('');

	const CREATE_UPDATE_PARTY_VALIDATION_SCHEMA = yup.object().shape({
		id: yup.string(),
		name: yup.string().required('Party name is required'),
		country: yup.string().required('Country name is required'),
		position: yup.string().required('position name is required')
	});

	const formik = useFormik({
		initialValues: {
			id: party ? party.id : '',
			name: party ? party.name : '',
			country: party ? party.country : '',
			position: DefaultPartyPositions.POSITION
		},
		validateOnMount: false,
		validationSchema: CREATE_UPDATE_PARTY_VALIDATION_SCHEMA,
		onSubmit: values => handleCreateOrUpdate(values)
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

	function handleGetCountryValue(country: string) {
		setFieldValue('country', country);
	}

	return (
		<FormContainer>
			<Form>
				<FormItem>
					<Input
						required
						label={'Party name'}
						placeholder={'Enter party name...'}
						name="name"
						onChange={handleChange}
						value={values.name}
						error={touched.name ? errors.name : undefined}
						onBlur={handleBlur}
					/>
				</FormItem>
				<FormItem>
					<AutoComplete
						required
						label={'Country'}
						placeholder={'Enter country name...'}
						name="country"
						value={values.country}
						error={touched.country ? errors.country : undefined}
						searchLoading={false}
						searchValue={searchCountriesByText}
						getSearchValue={value => setSearchCountriesByText(value)}
						searchPlaceholder={'Search by name...'}
					>
						{counteries.map((country, i) => (
							<AutoComplete.Item
								key={`country-list-item-${i}`}
								onClick={() => handleGetCountryValue(country)}
							>
								{country}
							</AutoComplete.Item>
						))}
					</AutoComplete>
				</FormItem>
				<FormItem>
					<ModalAutoComplete
						label={'position'}
						placeholder={'Position...'}
						value={values.position}
					>
						<ModalAutoComplete.Item
							onClick={() =>
								setFieldValue('position', DefaultPartyPositions.POSITION)
							}
						>
							Position
						</ModalAutoComplete.Item>
						<ModalAutoComplete.Item
							onClick={() =>
								setFieldValue('position', DefaultPartyPositions.OPPOSITION)
							}
						>
							Opposition
						</ModalAutoComplete.Item>
					</ModalAutoComplete>
				</FormItem>
				<FormItem>
					<PrimaryButton
						title={party ? 'Update' : 'Create'}
						onClick={handleSubmit}
						disabled={!isValid || loading}
						loading={loading}
					/>
				</FormItem>
			</Form>
		</FormContainer>
	);
}
