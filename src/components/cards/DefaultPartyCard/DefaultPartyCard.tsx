import React, { useEffect, useState } from 'react';

import { PoliticalParty } from '@epolitiker/api/dist/generated';

import {
	DefaultPartyCardContainer,
	CardLogo,
	CardActionsBlock,
	DangerButton,
	FileInputContainer,
	FileInputLabel,
	PartyName,
	PartyCountry,
	PartyPosition
} from './DefaultPartyCard.style';
import { IconType } from '../../../consts';
import { ButtonSize, LightButton, Modal, ModalSizes, PrimaryButton } from '../../ui';
import { EditPartyModalContainer } from '../../workspaceSettings/WorkspaceOverview/WorkspacePartiesList/WorkspacePartiesList.style';
import { CropModalContent } from '../../userProfile/UserGeneralInfo/CropModalContent';
import { useAlerts, useTranslation, useUploadLogoToDefaultPartyMutation } from '../../../hooks';

interface DefaultPartyCardProps {
	party: PoliticalParty | any;
	getPartyAction: (party: PoliticalParty) => void;
	deleteDefaultParty: (partyId: string) => void;
	loading: boolean;
}

export function DefaultPartyCard({
	party,
	getPartyAction,
	deleteDefaultParty,
	loading
}: DefaultPartyCardProps) {
	const { setNotification } = useAlerts();
	const translate = useTranslation();

	const [defaultLogoParty, setWorkspaceAvatarFile] = useState<File | null>(null);
	const [showCreateDefaultModal, setCreateDefaultPartyModal] = useState(false);

	const [
		uploadLogoToDefaultParty,
		{ data: uploadLogoToDefaultPartyData, loading: uploadLogoToDefaultPartyLoading }
	] = useUploadLogoToDefaultPartyMutation();

	function handleUploadLogoToDefaultParty() {
		if (defaultLogoParty) {
			uploadLogoToDefaultParty({
				variables: {
					data: {
						politicalPartyWhereUniqueInput: { id: party?.id },
						logo: defaultLogoParty
					}
				}
			});
		}
	}

	useEffect(() => {
		if (uploadLogoToDefaultPartyData) {
			setNotification({ message: 'Party Logo successfully updated!' });
		}

		handleCloseEditPartyModal();
		setWorkspaceAvatarFile(null);
	}, [uploadLogoToDefaultPartyData]);

	function handleGetWorkspaceAvatarFile(file: File) {
		setWorkspaceAvatarFile(file);
	}

	function handleShowCreatePartyModal() {
		setCreateDefaultPartyModal(true);
	}

	function handleCloseEditPartyModal() {
		setCreateDefaultPartyModal(false);
	}
	return (
		<DefaultPartyCardContainer isLoading={loading}>
			<CardLogo src={party?.logo?.url || 'https://via.placeholder.com/60'} />

			<FileInputContainer>
				<FileInputLabel htmlFor={party?.id} onClick={handleShowCreatePartyModal}>
					Choose Logo
				</FileInputLabel>
			</FileInputContainer>

			<PartyName>{party.name}</PartyName>

			<PartyCountry>{party.country}</PartyCountry>

			<PartyPosition>{party.position}</PartyPosition>

			<CardActionsBlock>
				<LightButton icon={IconType.EpEdit} onClick={() => getPartyAction(party)} />
				<DangerButton
					icon={IconType.EpTrash}
					onClick={() => deleteDefaultParty(party.id)}
				/>
			</CardActionsBlock>
			<Modal
				size={ModalSizes.MD}
				title={'Edit Default Party Logo'}
				open={showCreateDefaultModal}
				onClose={handleCloseEditPartyModal}
			>
				<Modal.Body>
					<EditPartyModalContainer>
						<CropModalContent getFile={handleGetWorkspaceAvatarFile} />
					</EditPartyModalContainer>
				</Modal.Body>
				<Modal.Footer>
					<PrimaryButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.update)}
						onClick={handleUploadLogoToDefaultParty}
						loading={uploadLogoToDefaultPartyLoading}
						disabled={uploadLogoToDefaultPartyLoading}
					/>
				</Modal.Footer>
			</Modal>
		</DefaultPartyCardContainer>
	);
}
