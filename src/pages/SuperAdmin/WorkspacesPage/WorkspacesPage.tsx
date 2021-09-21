import React, { useMemo, useState, useEffect } from 'react';
import { Workspace } from '@epolitiker/api';

import { useTranslation, useAllWorkspacesQuery, useLanguage } from '../../../hooks';
import { DefaultButton } from '../../../components/ui';
import { WorkspacesList } from '../../../components/workspaces';
import { PageContent, PageHeader } from './WorkspacesPage.style';

export function WorkspacesPage() {
	const translate = useTranslation();
	const [, , translations] = useLanguage();
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
	// const [changedRowId, setChangedRowId] = useState('');

	const { data: workspacesData } = useAllWorkspacesQuery();

	// const [
	// 	toggleActiveWorkspaceOwner,
	// 	{ data: toggleActiveData, loading: toggleActiveLoading }
	// ] = useToggleActiveWorkspaceOwnerMutation();

	useEffect(() => {
		if (workspacesData) {
			setWorkspaces(workspacesData.allWorkspaces);
		}
	}, [workspacesData]);

	const columns = useMemo(
		() => [
			{
				Header: translate(({ columns }) => columns.workspace.workspace),
				columns: [
					{
						Header: translate(({ columns }) => columns.workspace.name),
						accessor: 'name'
					}
				]
			},
			{
				Header: translate(({ columns }) => columns.organization.organization),
				columns: [
					{
						Header: translate(({ columns }) => columns.organization.name),
						accessor: 'organization.name'
					},
					{
						Header: translate(({ columns }) => columns.organization.code),
						accessor: 'organization.code'
					},
					{
						Header: translate(({ columns }) => columns.organization.address),
						accessor: 'organization.address'
					},
					{
						Header: translate(({ columns }) => columns.organization.number),
						accessor: 'organization.number'
					}
				]
			},
			{
				Header: translate(({ columns }) => columns.owner.owner),
				columns: [
					{
						Header: translate(({ columns }) => columns.owner.firstName),
						accessor: 'owners.fistName'
					},
					{
						Header: translate(({ columns }) => columns.owner.lastName),
						accessor: 'owners.lastName'
					},
					{
						Header: translate(({ columns }) => columns.owner.email),
						accessor: 'owners.email'
					},
					{
						Header: translate(({ columns }) => columns.owner.phoneNumber),
						accessor: 'owners.phoneNumber'
					}
					// {
					// 	Header: translate(({ columns }) => columns.owner.active),
					// 	accessor: 'owner.active',
					// 	Cell: ({ cell: { row } }: any) => {
					// 		return (
					// 			<Checkbox
					// 				checked={
					// 					row.original.owners[0]
					// 						? row.original.owners[0].active
					// 						: false
					// 				}
					// 				onChange={e =>
					// 					handleToggleActiveWorkspaceOwner(e.target.checked, row)
					// 				}
					// 				disabled={row.id === changedRowId && toggleActiveLoading}
					// 			/>
					// 		);
					// 	}
					// }
					// {
					// 	Header: translate(({ columns }) => columns.owner.active),
					// 	accessor: 'owner.active',
					// 	Cell: ({ cell: { row } }: any) => {
					// 		return (
					// 			<Checkbox
					// 				checked={row.original.owner.active}
					// 				onChange={
					// 					e => console.log(e)
					// 					// handleToggleActiveWorkspaceOwner(e.target.checked, row)
					// 				}
					// 				disabled={row.id === changedRowId && toggleActiveLoading}
					// 			/>
					// 		);
					// 	}
					// }
				]
			}
		],
		[translations]
	);

	// function handleToggleActiveWorkspaceOwner(active: boolean, row: Row<Workspace>) {
	// 	setChangedRowId(row.id);
	//
	// 	toggleActiveWorkspaceOwner({
	// 		variables: {
	// 			data: { active },
	// 			where: { email: row.original.owners[0] ? row.original.owners[0].email : 'no-email' }
	// 		}
	// 	});
	// }
	//
	// useEffect(() => {
	// 	if (toggleActiveData) {
	// 		const prevData = [...workspaces];
	// 		if (prevData[+changedRowId].owners[0]) {
	// 			prevData[+changedRowId].owners[0].active =
	// 				toggleActiveData.toggleActiveWorkspaceOwner.account.active;
	// 		}
	// 		setWorkspaces(prevData);
	// 		console.log(
	// 			'createUserIdentity - token',
	// 			toggleActiveData.toggleActiveWorkspaceOwner.token
	// 		);
	// 	}
	// }, [toggleActiveData]);

	return (
		<PageContent>
			<PageHeader>
				<DefaultButton
					title={translate(({ buttons }) => buttons.create)}
					onClick={() => {}}
				/>
			</PageHeader>
			{workspaces?.length && <WorkspacesList columns={columns} data={workspaces} />}
		</PageContent>
	);
}
