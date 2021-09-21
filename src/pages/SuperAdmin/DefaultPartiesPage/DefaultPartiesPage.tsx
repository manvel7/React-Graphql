import React, { useState, useEffect } from 'react';

import { PoliticalParty } from '@epolitiker/api/dist/generated';

import {
	PageWrapper,
	PageHeader,
	PageContent,
	DefaultPartiesList
} from './DefaultPartiesPage.style';

import {
	useAllDefaultPartiesLazyQuery,
	useEffectOnce,
	useCreateDefaultPartyMutation,
	useUpdateDefaultPartyMutation,
	useDeleteDefaultPartyMutation,
	useAlerts
} from '../../../hooks';
import { GhostButton, Modal, ModalSizes } from '../../../components/ui';
import { IconType } from '../../../consts';
import {
	CreateUpdateDefaultPartyForm,
	CreateUpdateDefaultPartyFormValues
} from '../../../components/defaultParties';
import { DefaultPartyCard } from '../../../components/cards';

export function DefaultPartiesPage() {
	const { setNotification } = useAlerts();
	const [showCreateUpdatePartyModal, setShowCreateUpdatePartyModal] = useState(false);
	const [selectedParty, setSelectedParty] = useState<PoliticalParty | null>(null);
	const [defaultParties, setDefaultParties] = useState<PoliticalParty[]>([]);

	const [allDefaultParties, { data: allDefaultPartiesData }] = useAllDefaultPartiesLazyQuery();

	const [
		createDefaultParty,
		{ data: createDefaultPartyData, loading: createDefaultPartyLoading }
	] = useCreateDefaultPartyMutation();

	const [
		updateDefaultParty,
		{ data: updateDefaultPartyData, loading: updateDefaultPartyLoading }
	] = useUpdateDefaultPartyMutation();

	const [deleteDefaultParty, { data: deleteDefaultPartyData }] = useDeleteDefaultPartyMutation();

	useEffectOnce(() => {
		handleGetAllDefaultParties();
	});

	function handleGetAllDefaultParties() {
		allDefaultParties({
			variables: {
				data: { orderBy: 'name_ASC' }
			}
		});
	}

	useEffect(() => {
		if (allDefaultPartiesData) {
			setDefaultParties(allDefaultPartiesData.allDefaultParties);
		}
	}, [allDefaultPartiesData]);

	function handleCreateDefaultParty(partyValues: CreateUpdateDefaultPartyFormValues) {
		createDefaultParty({
			variables: {
				data: {
					name: partyValues.name,
					country: partyValues.country,
					position: partyValues.position
				}
			}
		});
	}

	useEffect(() => {
		if (createDefaultPartyData) {
			setDefaultParties([createDefaultPartyData.createDefaultParty, ...defaultParties]);
			handleCloseCreateUpdatePartyModal();
			setNotification({ message: 'Party created successfully!' });
		}
	}, [createDefaultPartyData]);

	function handleUpdateDefaultParty(partyValues: CreateUpdateDefaultPartyFormValues) {
		updateDefaultParty({
			variables: {
				data: {
					politicalPartyWhereUniqueInput: { id: partyValues.id },
					politicalPartyUpdateInput: {
						name: partyValues.name,
						country: partyValues.country,
						position: partyValues.position
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateDefaultPartyData) {
			handleCloseCreateUpdatePartyModal();
			setNotification({ message: 'Party updated successfully!' });
		}
	}, [updateDefaultPartyData]);

	function handleDeleteDefaultParty(partyId: string) {
		deleteDefaultParty({
			variables: {
				data: { id: partyId }
			}
		});
	}

	useEffect(() => {
		if (deleteDefaultPartyData) {
			const removedPartyId = deleteDefaultPartyData.deleteDefaultParty.id;
			setDefaultParties(state => state.filter(party => party.id !== removedPartyId));
			setNotification({ message: 'Party removed from list!' });
		}
	}, [deleteDefaultPartyData]);

	function handleGetPartyAction(party: PoliticalParty | null) {
		setSelectedParty(party);
		handleOpenCreateUpdatePartyModal();
	}

	function handleOpenCreateUpdatePartyModal() {
		setShowCreateUpdatePartyModal(true);
	}

	function handleCloseCreateUpdatePartyModal() {
		setShowCreateUpdatePartyModal(false);
	}

	function handleCreateOrUpdateParty(partyValues: CreateUpdateDefaultPartyFormValues) {
		if (partyValues.id === '') {
			handleCreateDefaultParty(partyValues);
		} else {
			handleUpdateDefaultParty(partyValues);
		}
	}

	return (
		<PageWrapper>
			<Modal
				title="Political Party"
				size={ModalSizes.XS}
				open={showCreateUpdatePartyModal}
				onClose={handleCloseCreateUpdatePartyModal}
			>
				<CreateUpdateDefaultPartyForm
					party={selectedParty}
					handleCreateOrUpdate={handleCreateOrUpdateParty}
					loading={createDefaultPartyLoading || updateDefaultPartyLoading}
				/>
			</Modal>
			<PageHeader>
				<GhostButton
					title="Create Political Party"
					leftIcon={IconType.EpPlus}
					onClick={() => handleGetPartyAction(null)}
				/>
			</PageHeader>
			<PageContent>
				<DefaultPartiesList>
					{defaultParties.length > 0 &&
						defaultParties.map((party: any) => (
							<DefaultPartyCard
								key={party.id}
								party={party}
								getPartyAction={handleGetPartyAction}
								deleteDefaultParty={handleDeleteDefaultParty}
								loading={false}
							/>
						))}
				</DefaultPartiesList>
			</PageContent>
		</PageWrapper>
	);
}
