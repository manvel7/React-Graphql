import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Committee } from '@epolitiker/api';
import { PoliticalParty } from '@epolitiker/api/dist/generated';

import {
	FormWrapper,
	FormTabsContainer,
	FormTabItem,
	Form,
	Input,
	AutoComplete,
	GeneralContainer,
	AccessContainer,
	GlobalAccessContainer,
	AccessTitle,
	AccessContainerInfoTextBlock,
	AccessContainerInfoText,
	AccessContainerInfoIconBlock,
	InviteToCommitteeContainer,
	InviteToCommitteeInputsBlock,
	ImportCSVContainer,
	CSVText,
	CSVIconBlock,
	CSVButtonBlock
} from './InviteMemberForm.style';
import {
	useTranslation,
	useWorkspaceCommitteesLazyQuery,
	useAllPartiesInWorkspaceLazyQuery,
	useLocalStorage
} from '../../../hooks';
import { PrimaryButton, Icon, ButtonSize } from '../../ui';
import {
	IconType,
	StorageKey,
	workspacePartyRolesList,
	committeeMemberRolesList,
	NewMemberRole
} from '../../../consts';
import { ButtonTypes } from '../../ui';

export interface InviteMemberFormValues {
	email: string;
	firstName: string;
	lastName: string;
	phone?: string;
	partyRole: string;
	partyId: string;
	committeeRole?: string;
	committeeId?: string;
	memberRole: NewMemberRole;
}

interface InviteMemberFormProps {
	handleInvite: (newMemberData: InviteMemberFormValues) => void;
	submitForm: boolean;
	resetSubmitForm: () => void;
	showErrorInModal: (value: boolean) => void;
	handleSetStep: (step: number) => void;
}

export function InviteMemberForm({
	handleInvite,
	submitForm,
	resetSubmitForm,
	showErrorInModal,
	handleSetStep
}: InviteMemberFormProps) {
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [activeTab, setActiveTab] = useState(1);

	const [searchPartyByText, setSearchPartyByText] = useState('');
	const [workspaceParties, setWorkspaceParties] = useState<PoliticalParty[]>([]);
	const [partyRoles] = useState(workspacePartyRolesList);

	const [searchCommitteeByText, setSearchCommitteeByText] = useState('');
	const [committees, setCommittees] = useState<Committee[]>([]);

	const [
		getWorkspaceCommittees,
		{ data: workspaceCommitteesData, loading: workspaceCommitteesLoading }
	] = useWorkspaceCommitteesLazyQuery();

	const [
		allPartiesInWorkspace,
		{ data: allPartiesInWorkspaceData, loading: allPartiesInWorkspaceLoading }
	] = useAllPartiesInWorkspaceLazyQuery();

	useEffect(() => {
		if (activeWorkspace) {
			allPartiesInWorkspace({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						orderBy: 'name_ASC',
						where: {
							name_contains: searchPartyByText
						}
					}
				}
			});
		}
	}, [searchPartyByText]);

	useEffect(() => {
		if (allPartiesInWorkspaceData) {
			setWorkspaceParties(allPartiesInWorkspaceData.allPartiesInWorkspace);
		}
	}, [allPartiesInWorkspaceData]);

	useEffect(() => {
		if (activeWorkspace) {
			getWorkspaceCommittees({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					},
					where: {
						label_contains: searchPartyByText
					}
				}
			});
		}
	}, [searchPartyByText]);

	useEffect(() => {
		if (workspaceCommitteesData) {
			setCommittees(workspaceCommitteesData.workspaceDetails.committees);
		}
	}, [workspaceCommitteesData]);

	const INVITE_MEMBER_VALIDATION_SCHEMA = yup.object().shape({
		email: yup
			.string()
			.email(translate(({ inputs }) => inputs.email.invalid))
			.required(translate(({ inputs }) => inputs.email.required)),
		firstName: yup.string().required(translate(({ inputs }) => inputs.firstName.required)),
		lastName: yup.string().required(translate(({ inputs }) => inputs.lastName.required)),
		phoneNumber: yup.number().integer(translate(({ inputs }) => inputs.phone.invalid)),
		partyRole: yup.string().required('Party role is required!'),
		partyId: yup.string().required('Party membership is required!'),
		memberRole: yup.string().required('Member Role is required!'),
		committeeRole: yup.string(),
		committeeId: yup.string()
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			partyRole: '',
			partyId: '',
			committeeRole: '',
			committeeId: '',
			memberRole: NewMemberRole.ADMIN
		},
		validateOnMount: true,
		validationSchema: INVITE_MEMBER_VALIDATION_SCHEMA,
		onSubmit: values => handleInvite(values)
	});

	const {
		values,
		handleChange,
		handleSubmit,
		errors,
		touched,
		handleBlur,
		setFieldValue,
		isValid
	} = formik;

	useEffect(() => {
		if (submitForm) {
			handleSubmit();
			resetSubmitForm();
			if (!isValid) {
				showErrorInModal(true);
				setActiveTab(1);
			}
		}
	}, [submitForm]);

	useEffect(() => {
		if (isValid) {
			showErrorInModal(false);
		}
	}, [isValid]);

	function handleChangeModalBodyStep(step: number) {
		handleSetStep(step);
	}

	return (
		<FormWrapper>
			<FormTabsContainer>
				<FormTabItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
					{translate(({ tabs }) => tabs.general)}
				</FormTabItem>
				<FormTabItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
					{translate(({ tabs }) => tabs.accessAndMembership)}
				</FormTabItem>
				<FormTabItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
					{translate(({ tabs }) => tabs.importFromCSV)}
				</FormTabItem>
			</FormTabsContainer>
			{activeTab === 1 && (
				<Form onSubmit={handleSubmit}>
					<GeneralContainer>
						<Input
							required
							label={translate(({ inputs }) => inputs.firstName.label)}
							name="firstName"
							placeholder={translate(({ inputs }) => inputs.firstName.placeholder)}
							onChange={handleChange}
							value={values.firstName}
							error={touched.firstName ? errors.firstName : undefined}
							onBlur={handleBlur}
						/>
						<Input
							required
							label={translate(({ inputs }) => inputs.lastName.label)}
							name="lastName"
							placeholder={translate(({ inputs }) => inputs.lastName.placeholder)}
							onChange={handleChange}
							value={values.lastName}
							error={touched.lastName ? errors.lastName : undefined}
							onBlur={handleBlur}
						/>
						<Input
							required
							label={translate(({ inputs }) => inputs.email.label)}
							name="email"
							placeholder={translate(({ inputs }) => inputs.email.placeholder)}
							onChange={handleChange}
							value={values.email}
							error={touched.email ? errors.email : undefined}
							onBlur={handleBlur}
						/>
						<Input
							label={translate(({ inputs }) => inputs.phone.label)}
							name="phoneNumber"
							placeholder={translate(({ inputs }) => inputs.phone.placeholder)}
							onChange={handleChange}
							value={values.phoneNumber}
							error={touched.phoneNumber ? errors.phoneNumber : undefined}
							onBlur={handleBlur}
						/>
						<AutoComplete
							value={values.memberRole}
							label={translate(({ inputs }) => inputs.memberUserRole.label)}
							required
							placeholder={translate(
								({ inputs }) => inputs.memberUserRole.placeholder
							)}
							searchPlaceholder={translate(
								({ inputs }) => inputs.memberUserRole.text
							)}
						>
							<AutoComplete.Item
								onClick={() => setFieldValue('memberRole', NewMemberRole.ADMIN)}
							>
								ADMIN
							</AutoComplete.Item>
							<AutoComplete.Item
								onClick={() => setFieldValue('memberRole', NewMemberRole.REGULAR)}
							>
								REGULAR
							</AutoComplete.Item>
						</AutoComplete>
					</GeneralContainer>
				</Form>
			)}
			{activeTab === 2 && (
				<Form>
					<AccessContainer>
						<GlobalAccessContainer>
							<AccessTitle>Set global access</AccessTitle>
							<AutoComplete
								value={''}
								label={translate(({ inputs }) => inputs.regularUserAccess.label)}
								required
								placeholder={translate(
									({ inputs }) => inputs.regularUserAccess.placeholder
								)}
								searchValue={searchPartyByText}
								getSearchValue={(value: string) => setSearchPartyByText(value)}
								searchLoading={false}
								searchPlaceholder={translate(
									({ inputs }) => inputs.regularUserAccess.text
								)}
								disabled
							>
								{committees.map(committee => (
									<AutoComplete.Item key={committee.id} onClick={() => {}}>
										{committee.label}
									</AutoComplete.Item>
								))}
							</AutoComplete>
							<AccessContainerInfoTextBlock>
								<AccessContainerInfoIconBlock>
									<Icon name={IconType.EpInfo} />
								</AccessContainerInfoIconBlock>
								<AccessContainerInfoText>
									{translate(({ titles }) => titles.learnMoreAboutGlobal)}
								</AccessContainerInfoText>
							</AccessContainerInfoTextBlock>
						</GlobalAccessContainer>
						<InviteToCommitteeContainer>
							<InviteToCommitteeInputsBlock>
								<AutoComplete
									value={
										workspaceParties.find(party => party.id === values.partyId)
											?.name || ''
									}
									label={translate(({ inputs }) => inputs.memberOfParty.label)}
									placeholder={translate(
										({ inputs }) => inputs.memberOfParty.placeholder
									)}
									searchValue={searchPartyByText}
									getSearchValue={(value: string) => setSearchPartyByText(value)}
									searchLoading={allPartiesInWorkspaceLoading}
									searchPlaceholder={translate(
										({ inputs }) => inputs.memberOfParty.text
									)}
									error={touched.partyId ? errors.partyId : undefined}
								>
									{workspaceParties.length > 0 ? (
										workspaceParties.map(party => (
											<AutoComplete.Item
												key={party.id}
												onClick={() => setFieldValue('partyId', party.id)}
											>
												{party.name}
											</AutoComplete.Item>
										))
									) : (
										<AutoComplete.Item
											key={'workspace-party-list-is-empty'}
											onClick={() => {}}
										>
											No parties
										</AutoComplete.Item>
									)}
								</AutoComplete>

								<AutoComplete
									label={translate(({ inputs }) => inputs.partyRole.label)}
									placeholder={translate(
										({ inputs }) => inputs.partyRole.placeholder
									)}
									value={
										partyRoles.find(
											partyRole => partyRole.value === values.partyRole
										)?.label || ''
									}
									error={touched.partyRole ? errors.partyRole : undefined}
									disabled={!values.partyId}
								>
									{partyRoles.map((partyRole, i) => (
										<AutoComplete.Item
											key={`workspace-member-party-role-${i}`}
											onClick={() =>
												setFieldValue('partyRole', partyRole.value)
											}
										>
											{partyRole.label}
										</AutoComplete.Item>
									))}
								</AutoComplete>
							</InviteToCommitteeInputsBlock>
							<AccessTitle>
								{translate(({ titles }) => titles.inviteUserToCommittee)}
							</AccessTitle>
							<InviteToCommitteeInputsBlock>
								<AutoComplete
									value={
										committees.find(com => com.id === values.committeeId)?.label
									}
									label={translate(({ inputs }) => inputs.search.label)}
									placeholder={translate(
										({ inputs }) => inputs.search.placeholder
									)}
									searchValue={searchCommitteeByText}
									getSearchValue={(value: string) =>
										setSearchCommitteeByText(value)
									}
									searchLoading={workspaceCommitteesLoading}
									searchPlaceholder={translate(
										({ inputs }) => inputs.search.text
									)}
								>
									{committees.map(committee => (
										<AutoComplete.Item
											key={committee.id}
											onClick={() =>
												setFieldValue('committeeId', committee.id)
											}
										>
											{committee.label}
										</AutoComplete.Item>
									))}
								</AutoComplete>
								<AutoComplete
									value={
										committeeMemberRolesList.find(
											r => r.value === values.committeeRole
										)?.label
									}
									label={translate(({ inputs }) => inputs.role.label)}
									placeholder={translate(({ inputs }) => inputs.role.placeholder)}
								>
									{committeeMemberRolesList.map((role, i) => (
										<AutoComplete.Item
											key={`committee-member-role-${i}`}
											onClick={() =>
												setFieldValue('committeeRole', role.value)
											}
										>
											{role.label}
										</AutoComplete.Item>
									))}
								</AutoComplete>
							</InviteToCommitteeInputsBlock>
							<PrimaryButton
								leftIcon={IconType.EpPlus}
								type={ButtonTypes.Button}
								size={ButtonSize.LG}
								title={translate(({ buttons }) => buttons.addOneMoreCommittee)}
								onClick={() => handleChangeModalBodyStep(2)}
							/>
						</InviteToCommitteeContainer>
					</AccessContainer>
				</Form>
			)}
			{activeTab === 3 && (
				<ImportCSVContainer>
					<CSVIconBlock>
						<Icon name={IconType.EpCSVIcon} />
					</CSVIconBlock>
					<CSVText>
						You can invite multiple users to your workspace user database by uploading a
						CSV into file. If you have your users in a spreadsheet, save that sheet as a
						CSV file using a spreadsheet application like Microsoft Excel or Google
						Sheets. You can also export your users from most database systems as a CSV
						file. Make sure the structure in your spreadsheet is apropriated and matches
						with our template
					</CSVText>
					<CSVButtonBlock>
						<PrimaryButton
							leftIcon={IconType.EpUploadDocument}
							type={ButtonTypes.Button}
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.uploadCSVFile)}
							onClick={() => {}}
						/>
					</CSVButtonBlock>
				</ImportCSVContainer>
			)}
		</FormWrapper>
	);
}
