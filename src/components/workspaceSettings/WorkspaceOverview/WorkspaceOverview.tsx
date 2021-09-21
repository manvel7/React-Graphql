import React, { useContext, useState, useEffect } from 'react';
import { IconType, StorageKey, workspaceTimeZonesList } from '../../../consts';
import {
	useAlerts,
	useCreateWorkspaceAvatarFileMutation,
	useDeleteWorkspaceLogoMutation,
	useLocalStorage,
	useTranslation
} from '../../../hooks';
import { WorkspaceContext } from '../../../pages';

import { AutoCompletePositions, ButtonSize, LightButton, ModalSizes, Textarea } from '../../ui';

import {
	OverviewContainer,
	ComponentBlock,
	PageTitle,
	PageInfoText,
	PageTypoText,
	GhostButton,
	UploadLogoContainer,
	LogoBlock,
	LogoImg,
	WorkspaceInfoBlock,
	WorkspaceTitleBlock,
	WorkspaceTitle,
	WorkspaceDescriptionBlock,
	OwnerCardContainer,
	OwnerCardContainerSelectBlock,
	AutoComplete,
	PrimaryButton,
	DangerButton,
	Input,
	Modal,
	RenameModalContent,
	ConfirmModalContent,
	ConfirmModalText,
	MemberDefaultCard
} from './WorkspaceOverview.style';
import { CommitteesTable } from './CommitteesTable';
import { WorkspacePartiesList } from './WorkspacePartiesList';
import { CropModalContent } from '../../userProfile/UserGeneralInfo/CropModalContent';
import { FileInput } from '@epolitiker/api';

export function WorkspaceOverview() {
	const translate = useTranslation();
	const { workspace } = useContext(WorkspaceContext);
	const { setNotification } = useAlerts();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [, setFiles] = useState<Promise<FileInput>>();
	const [showRenameModal, setShowRenameModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showAvatarCropModal, setShowAvatarCropModal] = useState(false);
	const [workspaceAvatarFile, setWorkspaceAvatarFile] = useState<File | null>(null);
	const [cropBySquare, setCropBySquare] = useState<boolean>(false);

	const [
		addWorkspaceAvatar,
		{ data: addWorkspaceAvatarData, loading: addWorkspaceAvatarLoading }
	] = useCreateWorkspaceAvatarFileMutation();

	const [
		removeWorkspaceAvatar,
		{ data: removeWorkspaceAvatarData, loading: removeWorkspaceAvatarLoading }
	] = useDeleteWorkspaceLogoMutation();

	function handleShowRenameModal() {
		setShowRenameModal(true);
	}

	function handleHideRenameModal() {
		setShowRenameModal(false);
	}

	function handleShowConfirmModal() {
		setShowConfirmModal(true);
	}

	function handleCloseConfirmModal() {
		setShowConfirmModal(false);
	}

	function handleAddWorkspaceAvatar() {
		if (workspaceAvatarFile && activeWorkspace) {
			addWorkspaceAvatar({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						logo: workspaceAvatarFile
					}
				}
			});
		}
	}

	function handleGetWorkspaceAvatarFile(file: File) {
		setWorkspaceAvatarFile(file);
	}

	useEffect(() => {
		if (addWorkspaceAvatarData) {
			setFiles(addWorkspaceAvatarData.logo);
			setWorkspaceAvatarFile(null);
			handleCloseModal();
		}
	}, [addWorkspaceAvatarData]);

	function handleRemoveWorkspaceAvatar() {
		removeWorkspaceAvatar({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: activeWorkspace.id }
				}
			}
		});
	}
	useEffect(() => {
		if (removeWorkspaceAvatarData) {
			setNotification({ message: 'Workspace Avatar removed' });
			setWorkspaceAvatarFile(null);
		}
	}, [removeWorkspaceAvatarData]);

	function handleOpenModal() {
		setShowAvatarCropModal(true);
		setCropBySquare(true);
	}

	function handleCloseModal() {
		setShowAvatarCropModal(false);
	}

	if (!workspace) {
		return null;
	}
	return (
		<OverviewContainer>
			<Modal
				title={translate(({ buttons }) => buttons.upload)}
				open={showAvatarCropModal}
				onClose={handleCloseModal}
				size={ModalSizes.SM}
			>
				<Modal.Body>
					<CropModalContent
						getFile={handleGetWorkspaceAvatarFile}
						cropBySquare={cropBySquare}
					/>
				</Modal.Body>
				<Modal.Footer>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.upload)}
						onClick={handleAddWorkspaceAvatar}
						loading={addWorkspaceAvatarLoading}
						disabled={!workspaceAvatarFile || addWorkspaceAvatarLoading}
					/>
				</Modal.Footer>
			</Modal>

			<Modal
				size={ModalSizes.XS}
				title={translate(({ titles }) => titles.workspaceName)}
				open={showRenameModal}
				onClose={handleHideRenameModal}
			>
				<Modal.Body>
					<RenameModalContent>
						<Input
							label={translate(({ inputs }) => inputs.name.label)}
							placeholder={translate(({ inputs }) => inputs.name.placeholder)}
							value={''}
							onChange={() => {}}
							helpText="20 max"
							helpTextDirection={'end'}
						/>
						<Textarea
							label={translate(({ inputs }) => inputs.description.label)}
							placeholder={translate(({ inputs }) => inputs.description.placeholder)}
							value={''}
							onChange={() => {}}
							helpText={'400 max'}
							helpTextDirection={'end'}
						/>
					</RenameModalContent>
				</Modal.Body>
				<Modal.Footer>
					<GhostButton
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleHideRenameModal}
						size={ButtonSize.LG}
					/>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.save)}
						onClick={() => {}}
						size={ButtonSize.LG}
					/>
				</Modal.Footer>
			</Modal>

			<Modal
				size={ModalSizes.XS}
				title={'Confirm action'}
				open={showConfirmModal}
				onClose={handleCloseConfirmModal}
			>
				<Modal.Body>
					<ConfirmModalContent>
						<ConfirmModalText>
							Some of the pages has their own local preferences, would you like to
							owervrite previous time zone settings and apply change to the entire
							workspace?
						</ConfirmModalText>
					</ConfirmModalContent>
				</Modal.Body>
				<Modal.Footer>
					<GhostButton title={'Overwrite'} onClick={() => {}} size={ButtonSize.LG} />
					<PrimaryButton
						title={'Apply, but not overwrite'}
						onClick={() => {}}
						size={ButtonSize.LG}
					/>
				</Modal.Footer>
			</Modal>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.companyInfo)}</PageTitle>
				<UploadLogoContainer>
					<LogoBlock>
						<LogoImg src={workspace.logo?.url} />
					</LogoBlock>
					<LightButton
						leftIcon={IconType.EpArrowUp}
						title={translate(({ buttons }) => buttons.uploadNew)}
						onClick={handleOpenModal}
					/>
					<GhostButton
						leftIcon={IconType.EpTrash}
						title={translate(({ buttons }) => buttons.remove)}
						onClick={handleRemoveWorkspaceAvatar}
						loading={removeWorkspaceAvatarLoading}
						disabled={removeWorkspaceAvatarLoading}
					/>
				</UploadLogoContainer>
				<WorkspaceInfoBlock>
					<WorkspaceTitleBlock>
						<WorkspaceTitle>{workspace.name}</WorkspaceTitle>
						<GhostButton
							icon={IconType.EpEdit}
							onClick={handleShowRenameModal}
							tooltip={translate(({ buttons }) => buttons.edit)}
						/>
					</WorkspaceTitleBlock>
					<WorkspaceDescriptionBlock>
						<PageInfoText>
							It is a long established fact that a reader will be distracted by the
							readable content of a page when looking at its layout. The point of
							using Lorem Ipsum is that it has a more-or-less normal distribution of
							letters, as opposed to using Content here, content here, making it look
							like readable English.
						</PageInfoText>
					</WorkspaceDescriptionBlock>
				</WorkspaceInfoBlock>
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.workspaceOwner)}</PageTitle>
				<PageTypoText>
					{translate(({ titles }) => titles.workspaceOwnerHasFullAccess)}
				</PageTypoText>
				{workspace.owners.map(owner => {
					return (
						<OwnerCardContainer key={owner.id}>
							<MemberDefaultCard member={owner} onClick={() => {}} />
							<OwnerCardContainerSelectBlock>
								<AutoComplete value={'Owner'}>
									<AutoComplete.Item onClick={() => {}}>Owner</AutoComplete.Item>
									<AutoComplete.Item onClick={() => {}}>Admin</AutoComplete.Item>
								</AutoComplete>
							</OwnerCardContainerSelectBlock>
						</OwnerCardContainer>
					);
				})}
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.committeeWithMembers)}</PageTitle>
				<CommitteesTable committees={workspace.committees} />
				<GhostButton
					leftIcon={IconType.EpPlus}
					title={translate(({ buttons }) => buttons.addCommittee)}
					onClick={() => {}}
				/>
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.parties)}</PageTitle>
				<WorkspacePartiesList />
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.timeZone)}</PageTitle>
				<PageTypoText>{translate(({ titles }) => titles.timeZoneText)}</PageTypoText>
				<AutoComplete
					label="Current time zone"
					value={'CEST (GMT + 02:00)'}
					position={AutoCompletePositions.Left}
				>
					{workspaceTimeZonesList.map((timeZone, i) => (
						<AutoComplete.Item
							key={`time-zone-item-${i}`}
							onClick={handleShowConfirmModal}
						>
							{timeZone.title}
						</AutoComplete.Item>
					))}
				</AutoComplete>
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.workspaceDefaultLanguage)}</PageTitle>
				<PageTypoText>
					{translate(({ titles }) => titles.workspaceDefaultLanguageText)}
				</PageTypoText>
				<AutoComplete label="Current languagee" value={'English (USA)'}>
					<AutoComplete.Item onClick={() => {}}>English (USA)</AutoComplete.Item>
					<AutoComplete.Item onClick={() => {}}>Norwegian (NB)</AutoComplete.Item>
					<AutoComplete.Item onClick={() => {}}>Swedish (SE)</AutoComplete.Item>
				</AutoComplete>
			</ComponentBlock>

			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.deleteWorkspace)}</PageTitle>
				<PageTypoText>{translate(({ titles }) => titles.deleteWorkspaceText)}</PageTypoText>
				<DangerButton
					leftIcon={IconType.EpTrash}
					title={translate(({ buttons }) => buttons.requestDelete)}
					onClick={() => {}}
				/>
			</ComponentBlock>
		</OverviewContainer>
	);
}
