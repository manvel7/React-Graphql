import React, { useContext, useEffect, useState } from 'react';
import { PoliticalParty } from '@epolitiker/api';
import * as yup from 'yup';
import { useFormik } from 'formik';

import {
	WorkspacePartiesListContainer,
	Modal,
	PartiesListBlock,
	GhostButton,
	DangerButton,
	PrimaryButton,
	Input,
	EditPartyModalContainer,
	EditPartyModalComponentBlock,
	EditPartyModalComponentTitle,
	ModalAutoComplete,
	UploadLogoContainer,
	LogoBlock,
	LogoImg,
	ConfirmModalContent,
	ConfirmModalText
} from './WorkspacePartiesList.style';

import {
	useAddPartyToWorkspaceMutation,
	useAlerts,
	useAllDefaultPartiesLazyQuery,
	useAllPartiesInWorkspaceLazyQuery,
	useDeleteWorkspacePartyMutation,
	useLocalStorage,
	useTranslation,
	useUpdateWorkspacePartyMutation,
	useUploadLogoToWorkspacePartyMutation,
	useDeleteWorkspacePartyLogoMutation
} from '../../../../hooks';
import { PartyNameCard } from '../../../cards';
import { WorkspaceContext } from '../../../../pages';
import { IconType, StorageKey } from '../../../../consts';
import { ButtonSize, LightButton, ModalSizes } from '../../../ui';
import { CropModalContent } from '../../../userProfile/UserGeneralInfo/CropModalContent';

enum PoliticalPartyPositions {
	POSITION = 'POSITION',
	OPPOSITION = 'OPPOSITION'
}

export interface PoliticalPartyValues {
	partyName: string;
	partyPosition: PoliticalPartyPositions;
	partyLeader: string;
	partyCountry: string;
}

export function WorkspacePartiesList() {
	const translate = useTranslation();
	const { setNotification } = useAlerts();
	const { workspace } = useContext(WorkspaceContext);
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [workspaceParties, setWorkspaceParties] = useState<PoliticalParty[]>([]);
	const [, setDefaultParties] = useState<PoliticalParty[]>([]);
	const [partyToEdit, setPartyToEdit] = useState<PoliticalParty | null>(null);
	const [partyToEditName, setPartyToEditName] = useState('');
	const [partyToEditPosition, setPartyToEditPosition] = useState('');
	const [partyToEditCountry, setPartyToEditCountry] = useState('');
	const [showCreatePartyModal, setCreatePartyModal] = useState(false);
	const [showEditPartyModal, setShowEditPartyModal] = useState(false);
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
	const [workspaceAvatarFile, setWorkspaceAvatarFile] = useState<File | null>(null);
	const [step, setStep] = useState<number>(1);
	const [workspacePartyId, setWorkspacePartyId] = useState<string | null>(null);
	const [cropBySquare, setCropBySquare] = useState<boolean>(false);

	const [
		allPartiesInWorkspace,
		{ data: allPartiesInWorkspaceData }
	] = useAllPartiesInWorkspaceLazyQuery();

	const [allDefaultParties, { data: allDefaultPartiesData }] = useAllDefaultPartiesLazyQuery();

	const [
		addPartyToWorkspace,
		{ data: addPartyToWorkspaceData, loading: addPartyToWorkspaceLoading }
	] = useAddPartyToWorkspaceMutation();

	const [
		updateWorkspaceParty,
		{ data: updateWorkspacePartyData, loading: updateWorkspacePartyLoading }
	] = useUpdateWorkspacePartyMutation();

	const [
		deleteWorkspacePartyLogo,
		{ data: deleteWorkspacePartyLogoData, loading: deleteWorkspacePartyLogoLoading }
	] = useDeleteWorkspacePartyLogoMutation();

	const [
		deleteWorkspaceParty,
		{ data: deleteWorkspacePartyData, loading: deleteWorkspacePartyLoading }
	] = useDeleteWorkspacePartyMutation();

	const [
		uploadLogoToWorkspaceParty,
		{ data: uploadLogoToWorkspacePartyData, loading: uploadLogoToWorkspacePartyLoading }
	] = useUploadLogoToWorkspacePartyMutation();

	const [
		updateLogoToWorkspaceParty,
		{ data: updateLogoToWorkspacePartyData, loading: updateLogoToWorkspacePartyLoading }
	] = useUploadLogoToWorkspacePartyMutation();

	useEffect(() => {
		if (workspace) {
			handleGetWorkspaceParties();
			handleGetDefaultParties();
		}
	}, [workspace]);

	const ADD_WORKSPACE_PARTY = yup.object().shape({
		partyName: yup.string().required('Party name is required'),
		partyLeader: yup.string().required('Party Leader is required'),
		partyPosition: yup.string().required('Party Position is required!'),
		partyCountry: yup.string().required('Party Country is required')
	});

	const formik = useFormik({
		initialValues: {
			partyName: '',
			partyLeader: '',
			partyPosition: PoliticalPartyPositions.POSITION,
			partyCountry: ''
		},
		validateOnMount: true,
		validationSchema: ADD_WORKSPACE_PARTY,
		onSubmit: values => handleAddPartyToWorkspace(values)
	});

	const { values, handleChange, errors, touched, handleBlur, setFieldValue } = formik;

	function handleAddPartyToWorkspace(newParty: PoliticalPartyValues) {
		addPartyToWorkspace({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: workspace?.id },
					politicalPartyCreateInput: {
						name: newParty.partyName,
						position: newParty.partyPosition,
						country: newParty.partyCountry
						// leader: newParty.partyLeader,
					}
				}
			}
		});
	}

	useEffect(() => {
		if (addPartyToWorkspaceData) {
			const addPartyToWorkspace = addPartyToWorkspaceData.addPartyToWorkspace;
			setWorkspacePartyId(addPartyToWorkspace.id);
			handleCloseCreatePartyModal();
		}
	}, [addPartyToWorkspaceData]);

	useEffect(() => {
		if (workspacePartyId) {
			handleUploadLogoToWorkspaceParty();
		}
	}, [workspacePartyId]);

	// upload logo to workspace party
	function handleUploadLogoToWorkspaceParty() {
		uploadLogoToWorkspaceParty({
			variables: {
				data: {
					politicalPartyWhereUniqueInput: { id: workspacePartyId },
					workspaceWhereUniqueInput: { id: activeWorkspace?.id },
					logo: workspaceAvatarFile
				}
			}
		});
	}

	useEffect(() => {
		if (uploadLogoToWorkspacePartyData) {
			setNotification({ message: 'Logo uploaded successfully!' });
			setPartyToEdit(uploadLogoToWorkspacePartyData.uploadLogoToWorkspaceParty);
			setWorkspaceAvatarFile(null);
		}
	}, [uploadLogoToWorkspacePartyData]);

	// upload logo to workspace party
	function handleUpdateLogoToWorkspaceParty() {
		updateLogoToWorkspaceParty({
			variables: {
				data: {
					politicalPartyWhereUniqueInput: { id: partyToEdit?.id },
					workspaceWhereUniqueInput: { id: activeWorkspace?.id },
					logo: workspaceAvatarFile
				}
			}
		});
	}

	useEffect(() => {
		if (updateLogoToWorkspacePartyData) {
			setNotification({ message: 'Logo updated successfully!' });
			setWorkspaceAvatarFile(null);
			handleCloseEditPartyModal();
		}
	}, [updateLogoToWorkspacePartyData]);

	// Delete workspace party logo
	function handleDeleteWorkspacePartyLogo() {
		deleteWorkspacePartyLogo({
			variables: {
				data: {
					politicalPartyWhereUniqueInput: { id: partyToEdit?.id },
					workspaceWhereUniqueInput: { id: activeWorkspace?.id }
				}
			}
		});
	}

	useEffect(() => {
		if (deleteWorkspacePartyLogoData) {
			setNotification({ message: 'Party logo was removed!' });
			handleCloseEditPartyModal();
		}
	}, [deleteWorkspacePartyLogoData]);

	// Get workspace parties
	function handleGetWorkspaceParties() {
		allPartiesInWorkspace({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: workspace?.id }
				}
			}
		});
	}

	useEffect(() => {
		if (allPartiesInWorkspaceData) {
			setWorkspaceParties(allPartiesInWorkspaceData.allPartiesInWorkspace);
		}
	}, [allPartiesInWorkspaceData]);

	// Get Default parties
	function handleGetDefaultParties() {
		allDefaultParties({
			variables: { data: {} }
		});
	}

	useEffect(() => {
		if (allDefaultPartiesData) {
			setDefaultParties(allDefaultPartiesData.allDefaultParties);
		}
	}, [allDefaultPartiesData]);

	// Update workspace party
	function handleUpdateWorkspaceParty() {
		updateWorkspaceParty({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: workspace?.id },
					politicalPartyWhereUniqueInput: { id: partyToEdit?.id },
					politicalPartyUpdateInput: {
						name: partyToEditName,
						country: partyToEditCountry,
						position: partyToEditPosition
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateWorkspacePartyData) {
			setNotification({ message: 'Party was updated!' });
			handleCloseEditPartyModal();
		}
	}, [updateWorkspacePartyData]);

	//Delete workspace party
	function handleDeleteWorkspaceParty() {
		deleteWorkspaceParty({
			variables: {
				data: {
					politicalPartyWhereUniqueInput: { id: partyToEdit?.id },
					workspaceWhereUniqueInput: { id: workspace?.id }
				}
			}
		});
	}

	useEffect(() => {
		if (deleteWorkspacePartyData) {
			const deletedPartyId = deleteWorkspacePartyData.deleteWorkspaceParty.id;
			handleCloseConfirmDeleteModal();
			setNotification({ message: 'Party was removed' });
			setWorkspaceParties(state => state.filter(party => party.id !== deletedPartyId));
		}
	}, [deleteWorkspacePartyData]);

	function handleShowCreatePartyModal() {
		setCreatePartyModal(true);
	}

	function handleCloseCreatePartyModal() {
		setCreatePartyModal(false);
		setStep(1);
	}

	useEffect(() => {
		if (partyToEdit) {
			handleShowEditPartyModal();
			setPartyToEditName(partyToEdit.name);
			setPartyToEditCountry(partyToEdit.country);
			setPartyToEditPosition(partyToEdit.position);
		}
	}, [partyToEdit]);

	function handleShowEditPartyModal() {
		setShowEditPartyModal(true);
	}

	function handleCloseEditPartyModal() {
		setShowEditPartyModal(false);
		setPartyToEdit(null);
		setPartyToEditName('');
		setPartyToEditCountry('');
		setStep(1);
	}

	function handleShowConfirmDeleteModal() {
		setShowEditPartyModal(false);
		setShowConfirmDeleteModal(true);
	}

	function handleCloseConfirmDeleteModal() {
		setShowConfirmDeleteModal(false);
		setPartyToEdit(null);
		setPartyToEditName('');
		setPartyToEditCountry('');
		setPartyToEditPosition('');
	}

	function handleChangeLogoStep() {
		setStep(2);
		setCropBySquare(true);
	}
	function handleGetWorkspaceAvatarFile(file: File) {
		setWorkspaceAvatarFile(file);
	}

	if (!workspace) {
		return null;
	}

	return (
		<WorkspacePartiesListContainer>
			<Modal
				size={ModalSizes.SM}
				title={translate(({ buttons }) => buttons.addParty)}
				open={showCreatePartyModal}
				onClose={handleCloseCreatePartyModal}
			>
				<Modal.Body>
					{step === 1 ? (
						<EditPartyModalContainer>
							<EditPartyModalComponentBlock>
								<EditPartyModalComponentTitle>logo</EditPartyModalComponentTitle>
								<UploadLogoContainer>
									<LogoBlock>
										<LogoImg src={partyToEdit?.logo?.url} />
									</LogoBlock>
									<LightButton
										leftIcon={IconType.EpArrowUp}
										title={translate(({ buttons }) => buttons.uploadNew)}
										onClick={handleChangeLogoStep}
										loading={false}
									/>
									<GhostButton
										leftIcon={IconType.EpTrash}
										title={translate(({ buttons }) => buttons.remove)}
										onClick={handleDeleteWorkspacePartyLogo}
										loading={deleteWorkspacePartyLogoLoading}
										disabled={
											!partyToEdit?.logo || deleteWorkspacePartyLogoLoading
										}
									/>
								</UploadLogoContainer>
							</EditPartyModalComponentBlock>

							<EditPartyModalComponentBlock>
								<EditPartyModalComponentTitle>
									party info
								</EditPartyModalComponentTitle>
								<Input
									required
									label={translate(({ inputs }) => inputs.name.label)}
									name="partyName"
									placeholder={translate(({ inputs }) => inputs.name.placeholder)}
									onChange={handleChange}
									value={values.partyName}
									error={touched.partyName ? errors.partyName : undefined}
									onBlur={handleBlur}
								/>
								<Input
									required
									label={translate(({ inputs }) => inputs.country.label)}
									name="partyCountry"
									placeholder={translate(
										({ inputs }) => inputs.country.placeholder
									)}
									onChange={handleChange}
									value={values.partyCountry}
									error={touched.partyCountry ? errors.partyCountry : undefined}
									onBlur={handleBlur}
								/>

								<ModalAutoComplete
									label={'position'}
									placeholder={'Position...'}
									value={values.partyPosition}
								>
									<ModalAutoComplete.Item
										onClick={() =>
											setFieldValue(
												'partyPosition',
												PoliticalPartyPositions.POSITION
											)
										}
									>
										Position
									</ModalAutoComplete.Item>
									<ModalAutoComplete.Item
										onClick={() =>
											setFieldValue(
												'partyPosition',
												PoliticalPartyPositions.OPPOSITION
											)
										}
									>
										Opposition
									</ModalAutoComplete.Item>
								</ModalAutoComplete>

								{/*<ModalAutoComplete*/}
								{/*	label={'leader (optional)'}*/}
								{/*	placeholder={'Name of party leader'}*/}
								{/*	value={values.partyLeader}*/}
								{/*>*/}
								{/*	{workspace.members.map((user: UserAccount) => (*/}
								{/*		<ModalAutoComplete.Item key={user.id} onClick={() => setFieldValue("partyLeader", user.firstName)}>*/}
								{/*			{`${user.firstName} ${user.lastName}`}*/}
								{/*		</ModalAutoComplete.Item>*/}
								{/*	))}*/}
								{/*</ModalAutoComplete>*/}
							</EditPartyModalComponentBlock>
						</EditPartyModalContainer>
					) : null}
					{step === 2 ? (
						<CropModalContent
							getFile={handleGetWorkspaceAvatarFile}
							cropBySquare={cropBySquare}
						/>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<GhostButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleCloseEditPartyModal}
					/>
					{step === 1 ? (
						<PrimaryButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.create)}
							onClick={() => handleAddPartyToWorkspace(values)}
							loading={addPartyToWorkspaceLoading}
							disabled={!workspaceAvatarFile || addPartyToWorkspaceLoading}
						/>
					) : null}
					{step === 2 ? (
						<PrimaryButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.ok)}
							onClick={handleCloseEditPartyModal}
							loading={uploadLogoToWorkspacePartyLoading}
							disabled={uploadLogoToWorkspacePartyLoading}
						/>
					) : null}
				</Modal.Footer>
			</Modal>

			<Modal
				size={ModalSizes.MD}
				title={'Edit party'}
				open={showEditPartyModal}
				onClose={handleCloseEditPartyModal}
			>
				<Modal.Body>
					{step === 1 ? (
						<EditPartyModalContainer>
							<EditPartyModalComponentBlock>
								<EditPartyModalComponentTitle>logo</EditPartyModalComponentTitle>
								<UploadLogoContainer>
									<LogoBlock>
										<LogoImg src={partyToEdit?.logo?.url} />
									</LogoBlock>
									<LightButton
										leftIcon={IconType.EpArrowUp}
										title={translate(({ buttons }) => buttons.uploadNew)}
										onClick={handleChangeLogoStep}
										loading={uploadLogoToWorkspacePartyLoading}
									/>
									<GhostButton
										leftIcon={IconType.EpTrash}
										title={translate(({ buttons }) => buttons.remove)}
										onClick={handleDeleteWorkspacePartyLogo}
										loading={deleteWorkspacePartyLogoLoading}
										disabled={
											!partyToEdit?.logo || deleteWorkspacePartyLogoLoading
										}
									/>
								</UploadLogoContainer>
							</EditPartyModalComponentBlock>

							<EditPartyModalComponentBlock>
								<EditPartyModalComponentTitle>
									party info
								</EditPartyModalComponentTitle>
								<Input
									label={translate(({ inputs }) => inputs.name.label)}
									placeholder={translate(({ inputs }) => inputs.name.placeholder)}
									value={partyToEditName}
									onChange={e => setPartyToEditName(e.target.value)}
								/>
								<Input
									label={translate(({ inputs }) => inputs.country.label)}
									placeholder={translate(
										({ inputs }) => inputs.country.placeholder
									)}
									onChange={e => setPartyToEditCountry(e.target.value)}
									value={partyToEditCountry}
								/>

								<ModalAutoComplete
									label={'position'}
									placeholder={'Position...'}
									value={values.partyPosition}
								>
									<ModalAutoComplete.Item
										onClick={() =>
											setFieldValue(
												'partyPosition',
												PoliticalPartyPositions.POSITION
											)
										}
									>
										Position
									</ModalAutoComplete.Item>
									<ModalAutoComplete.Item
										onClick={() =>
											setFieldValue(
												'partyPosition',
												PoliticalPartyPositions.OPPOSITION
											)
										}
									>
										Opposition
									</ModalAutoComplete.Item>
								</ModalAutoComplete>

								{/*<ModalAutoComplete*/}
								{/*	label={'leader (optional)'}*/}
								{/*	placeholder={'Name of party leader'}*/}
								{/*	value={values.partyLeader}*/}
								{/*>*/}
								{/*	{workspace.members.map((user: UserAccount) => (*/}
								{/*		<ModalAutoComplete.Item key={user.id} onClick={() => setFieldValue("partyLeader", user.firstName)}>*/}
								{/*			{`${user.firstName} ${user.lastName}`}*/}
								{/*		</ModalAutoComplete.Item>*/}
								{/*	))}*/}
								{/*</ModalAutoComplete>*/}
							</EditPartyModalComponentBlock>
						</EditPartyModalContainer>
					) : null}
					{step === 2 ? (
						<CropModalContent getFile={handleGetWorkspaceAvatarFile} />
					) : null}
				</Modal.Body>
				<Modal.Footer>
					{step === 1 ? (
						<DangerButton
							size={ButtonSize.LG}
							leftIcon={IconType.EpTrash}
							title={translate(({ buttons }) => buttons.delete)}
							onClick={handleShowConfirmDeleteModal}
						/>
					) : null}
					{step === 1 ? (
						<GhostButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.cancel)}
							onClick={handleCloseEditPartyModal}
						/>
					) : null}
					{step === 1 ? (
						<PrimaryButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.update)}
							onClick={handleUpdateWorkspaceParty}
							loading={updateWorkspacePartyLoading}
							disabled={updateWorkspacePartyLoading}
						/>
					) : null}
					{step === 2 ? (
						<PrimaryButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.update)}
							onClick={handleUpdateLogoToWorkspaceParty}
							loading={updateLogoToWorkspacePartyLoading}
							disabled={updateLogoToWorkspacePartyLoading}
						/>
					) : null}
				</Modal.Footer>
			</Modal>

			<Modal
				size={ModalSizes.XS}
				title={'Confirm action'}
				open={showConfirmDeleteModal}
				onClose={handleCloseConfirmDeleteModal}
			>
				<Modal.Body>
					<ConfirmModalContent>
						<ConfirmModalText>Are you sure you want to delete party?</ConfirmModalText>
					</ConfirmModalContent>
				</Modal.Body>
				<Modal.Footer>
					<GhostButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleCloseConfirmDeleteModal}
					/>
					<PrimaryButton
						size={ButtonSize.LG}
						title={'Yes, delete'}
						onClick={handleDeleteWorkspaceParty}
						loading={deleteWorkspacePartyLoading}
						disabled={deleteWorkspacePartyLoading}
					/>
				</Modal.Footer>
			</Modal>

			<PartiesListBlock>
				{workspaceParties.length > 0 &&
					workspaceParties.map(party => (
						<PartyNameCard
							key={party.id}
							party={party}
							onEditClick={() => setPartyToEdit(party)}
						/>
					))}
			</PartiesListBlock>
			<GhostButton
				leftIcon={IconType.EpPlus}
				title={translate(({ buttons }) => buttons.addParty)}
				onClick={handleShowCreatePartyModal}
			/>
		</WorkspacePartiesListContainer>
	);
}
