import React from 'react';
import moment from 'moment';

import { Committee, CommitteeMember } from '@epolitiker/api';
import {
	CommitteesTableContainer,
	Table,
	Thead,
	TBody,
	Tr,
	Th,
	Td,
	ActionsBlock,
	DangerButton
} from './CommitteesTable.style';
import { ButtonSize, Dropdown } from '../../../ui';
import { IconType } from '../../../../consts';
import { useNavigation, useTranslation } from '../../../../hooks';

interface CommitteesTableProps {
	committees: Committee[];
}

export function CommitteesTable({ committees }: CommitteesTableProps) {
	const translate = useTranslation();
	const { routes, navigate } = useNavigation();

	const getCommitteeCreatedAtInfo = (date: string) => {
		return moment(new Date(date)).format('MM/DD/YYYY');
	};

	const getCommiteeAdmins = (members: CommitteeMember[]) => {
		const admins = members.filter(member => member.role === 'ADMIN');
		if (admins.length > 0) {
			const names = admins.map(admin => admin.user.firstName);
			return names.join(', ');
		} else {
			return 'Name';
		}
	};

	return (
		<CommitteesTableContainer>
			<Table>
				<Thead>
					<Tr>
						<Th>
							{translate(
								({ columns }) => columns.committeeTableInWorkspace.committeeId
							)}
						</Th>
						<Th>
							{translate(({ columns }) => columns.committeeTableInWorkspace.name)}
						</Th>
						<Th>
							{translate(({ columns }) => columns.committeeTableInWorkspace.created)}
						</Th>
						<Th>
							{translate(({ columns }) => columns.committeeTableInWorkspace.admins)}
						</Th>
						<Th>
							{translate(({ columns }) => columns.committeeTableInWorkspace.members)}
						</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<TBody>
					{committees.map(committee => (
						<Tr key={committee.id}>
							<Td>{committee.id}</Td>
							<Td>{committee.label}</Td>
							<Td>{getCommitteeCreatedAtInfo(committee.createdAt)}</Td>
							<Td>{getCommiteeAdmins(committee.members)}</Td>
							<Td>{committee.members.length} people</Td>
							<Td>
								<ActionsBlock>
									<DangerButton
										icon={IconType.EpTrash}
										onClick={() => {}}
										size={ButtonSize.SM}
										tooltip={translate(
											({ buttons }) => buttons.deleteCommittee
										)}
									/>
									<Dropdown>
										<Dropdown.Item
											onClick={() =>
												navigate(routes.committeeOverview(committee.id))
											}
										>
											<Dropdown.ItemIcon name={IconType.EpOpen} />
											{translate(({ buttons }) => buttons.openCommittee)}
										</Dropdown.Item>
										<Dropdown.Item onClick={() => {}}>
											<Dropdown.ItemIcon name={IconType.EpEdit} />
											{translate(({ buttons }) => buttons.goToSettings)}
										</Dropdown.Item>
									</Dropdown>
								</ActionsBlock>
							</Td>
						</Tr>
					))}
				</TBody>
			</Table>
		</CommitteesTableContainer>
	);
}
