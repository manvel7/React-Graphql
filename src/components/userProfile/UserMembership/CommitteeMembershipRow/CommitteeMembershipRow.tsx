import React, { useEffect } from 'react';

import { CommitteeMembership } from '@epolitiker/api/dist/generated';

import {
	CommitteeItemRow,
	CommitteeItemRowInputsBlock,
	AutoComplete
} from './CommitteeMembershipRow.style';
import {
	useDeleteCommitteeMembershipMutation,
	useUpdateCommitteeMembershipMutation,
	useCommitteeMembershipPositionList,
	useCommitteeMembershipTypeList,
	useAlerts,
	useTranslation
} from '../../../../hooks';
import { Dropdown, DropdownPosition, Icon } from '../../../ui';
import { IconType } from '../../../../consts';
import { DefaultDatePicker } from '../../../datepickers';

interface CommitteeMembershipRowProps {
	committeeMembership: CommitteeMembership;
	memberships: CommitteeMembership[];
	updateMemberships: (memberships: CommitteeMembership[]) => void;
}

export function CommitteeMembershipRow({
	committeeMembership,
	memberships,
	updateMemberships
}: CommitteeMembershipRowProps) {
	const { setNotification } = useAlerts();
	const translate = useTranslation();

	const [
		deleteCommitteeMembership,
		{ data: deleteCommitteeMembershipData }
	] = useDeleteCommitteeMembershipMutation();

	const [
		updateCommitteeMembership,
		{ data: updateCommitteeMembershipData }
	] = useUpdateCommitteeMembershipMutation();

	// Delete Committee Membership request
	function handleDeleteCommitteeMembership() {
		deleteCommitteeMembership({
			variables: {
				data: {
					committeeMembershipWhereUniqueInput: {
						id: committeeMembership.id
					}
				}
			}
		});
	}

	// Delete Committee Membership response
	useEffect(() => {
		if (deleteCommitteeMembershipData) {
			setNotification({ message: 'Committee membership was removed!' });
			const removedMembershipId = deleteCommitteeMembershipData.deleteCommitteeMembership.id;
			updateMemberships(memberships.filter(listItem => listItem.id !== removedMembershipId));
		}
	}, [deleteCommitteeMembershipData]);

	// Update Committee Membership request
	function handleUpdateCommitteeMembership(field: string, newValue: any) {
		updateCommitteeMembership({
			variables: {
				data: {
					committeeMembershipWhereUniqueInput: { id: committeeMembership.id },
					committeeMembershipUpdateInput: {
						[field]: newValue
					}
				}
			}
		});
	}

	// Update Committee Membership response
	useEffect(() => {
		if (updateCommitteeMembershipData) {
			setNotification({ message: 'Committee membership was updated!' });
			const updatedMembership = updateCommitteeMembershipData.updateCommitteeMembership;
			const tempMembershipsList = [...memberships];
			const indexInList = memberships.findIndex(
				membership => membership.id === updatedMembership.id
			);
			tempMembershipsList.splice(indexInList, 1, updatedMembership);
			updateMemberships(tempMembershipsList);
		}
	}, [updateCommitteeMembershipData]);

	const positionsList = useCommitteeMembershipPositionList();
	const typesList = useCommitteeMembershipTypeList();

	return (
		<CommitteeItemRow>
			<AutoComplete
				label={translate(({ inputs }) => inputs.membershipType.label)}
				value={typesList.find(type => type.value === committeeMembership.type)?.title}
			>
				<AutoComplete.Item
					onClick={() => handleUpdateCommitteeMembership('type', 'DEPUTY')}
				>
					Deputy
				</AutoComplete.Item>
				<AutoComplete.Item
					onClick={() => handleUpdateCommitteeMembership('type', 'REGULAR_MEMBER')}
				>
					Regular member
				</AutoComplete.Item>
			</AutoComplete>

			<AutoComplete
				label={translate(({ inputs }) => inputs.position.label)}
				value={positionsList.find(pos => pos.value === committeeMembership.position)?.title}
			>
				<AutoComplete.Item
					onClick={() => handleUpdateCommitteeMembership('position', 'SECRETARY')}
				>
					Secretary
				</AutoComplete.Item>
				<AutoComplete.Item
					onClick={() =>
						handleUpdateCommitteeMembership('position', 'ASSISTENT_SECRETARY')
					}
				>
					Assistent secretary
				</AutoComplete.Item>
				<AutoComplete.Item
					onClick={() => handleUpdateCommitteeMembership('position', 'NO_POSITION')}
				>
					No position
				</AutoComplete.Item>
			</AutoComplete>

			<CommitteeItemRowInputsBlock>
				<DefaultDatePicker
					inputLabel={translate(({ inputs }) => inputs.since.label)}
					startDate={new Date(committeeMembership.sinceDate)}
					setStartDate={date => handleUpdateCommitteeMembership('sinceDate', date)}
				/>
				<DefaultDatePicker
					inputLabel={translate(({ inputs }) => inputs.to.label)}
					startDate={new Date(committeeMembership.toDate)}
					setStartDate={date => handleUpdateCommitteeMembership('toDate', date)}
				/>
			</CommitteeItemRowInputsBlock>

			<Dropdown
				position={DropdownPosition.Left}
				toggleComponent={() => <Icon name={IconType.EpTrash} />}
			>
				<Dropdown.Item onClick={handleDeleteCommitteeMembership}>
					Remove membership and position
				</Dropdown.Item>
			</Dropdown>
		</CommitteeItemRow>
	);
}
