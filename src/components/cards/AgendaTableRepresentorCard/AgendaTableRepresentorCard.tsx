import React, { useState, useEffect } from 'react';

import { AgendaItem, CommitteeMember, UserAccount } from '@epolitiker/api';

import {
	AgendaRepresentorCardContainer,
	CardAvatarBlock,
	CardInfoBlock,
	CardInfoTitle,
	CardInfoText,
	CommitteemembersList,
	DefaultButton
} from './AgendaTableRepresentorCard.style';
import { Avatar, AvatarSize, Modal, PrimaryButton, ButtonSize } from '../../ui';
import { useTranslation, useCommitteePrivateMembersLazyQuery } from '../../../hooks';
import { MemberDefaultCard } from '../MemberDefaultCard';

interface AgendaTableRepresentorCardProps {
	committeeId: string | undefined;
	agendaItem: AgendaItem;
	handleUpdate: (agendaId: string, dataToUpdate: any) => void;
	updateLoading: boolean;
	closeRepresentorModalFromOutside: boolean;
	setCloseRepresentorModalFromOutside: (show: boolean) => void;
}

export function AgendaTableRepresentorCard({
	committeeId,
	agendaItem: { id: agendaId, representor },
	handleUpdate,
	updateLoading,
	closeRepresentorModalFromOutside,
	setCloseRepresentorModalFromOutside
}: AgendaTableRepresentorCardProps) {
	const translate = useTranslation();
	const [showModal, setShowModal] = useState(false);
	const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
	const [selectedRepresentor, setSelectedRepresentor] = useState<UserAccount | null>(null);

	const [
		committeePrivateMembers,
		{ data: committeePrivateMembersData }
	] = useCommitteePrivateMembersLazyQuery();

	useEffect(() => {
		handleGetCommitteeMembers();
	}, [committeeId]);

	function handleGetCommitteeMembers() {
		committeePrivateMembers({
			variables: {
				data: {
					committeeWhereUniqueInput: { id: committeeId }
				}
			}
		});
	}

	useEffect(() => {
		if (committeePrivateMembersData) {
			setCommitteeMembers(committeePrivateMembersData.committeeDetails.members);
		}
	}, [committeePrivateMembersData]);

	function handleUpdateAgendaRepresentor() {
		handleUpdate(agendaId, {
			representor: {
				connect: { id: selectedRepresentor?.id }
			}
		});
	}

	function handleSelectRepresentor(member: UserAccount) {
		setSelectedRepresentor(member);
	}

	function handleShowModal() {
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
		setSelectedRepresentor(null);
		setCloseRepresentorModalFromOutside(false);
	}

	useEffect(() => {
		if (closeRepresentorModalFromOutside) {
			handleCloseModal();
		}
	}, [closeRepresentorModalFromOutside]);

	return (
		<>
			<Modal
				title={translate(({ titles }) => titles.members)}
				open={showModal}
				onClose={handleCloseModal}
			>
				<Modal.Body>
					<CommitteemembersList>
						{committeeMembers.length > 0 &&
							committeeMembers.map(committeeMember => (
								<MemberDefaultCard
									key={committeeMember.id}
									isSelected={committeeMember.user.id === selectedRepresentor?.id}
									member={committeeMember.user}
									onClick={handleSelectRepresentor}
								/>
							))}
					</CommitteemembersList>
				</Modal.Body>
				<Modal.Footer>
					<DefaultButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={handleCloseModal}
					/>
					<PrimaryButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.select)}
						onClick={handleUpdateAgendaRepresentor}
						loading={updateLoading}
						disabled={!selectedRepresentor || updateLoading}
					/>
				</Modal.Footer>
			</Modal>

			{representor ? (
				<AgendaRepresentorCardContainer onClick={handleShowModal}>
					<CardAvatarBlock>
						<Avatar image={representor.avatar?.url} size={AvatarSize.XS} />
					</CardAvatarBlock>
					<CardInfoBlock>
						<CardInfoTitle>{`${representor.firstName} ${representor.lastName}`}</CardInfoTitle>
						{representor.partyMembership && (
							<CardInfoText>
								{`${representor.partyMembership?.party?.name}, ${representor.partyMembership?.role}`}
							</CardInfoText>
						)}
					</CardInfoBlock>
				</AgendaRepresentorCardContainer>
			) : (
				<AgendaRepresentorCardContainer onClick={handleShowModal}>
					{translate(({ titles }) => titles.assignRepresentor)}
				</AgendaRepresentorCardContainer>
			)}
		</>
	);
}
