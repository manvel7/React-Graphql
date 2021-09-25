import React from 'react';
import { useTable, Column, usePagination } from 'react-table';

import { Workspace } from '@epolitiker/api';

import { TableContainer } from './WorkspacesList.style';

interface TableProps {
	columns: Column[];
	data: Workspace[];
}

export function WorkspacesList({ columns, data }: TableProps) {
	const { getTableProps, headerGroups } = useTable(
		{
			columns,
			data
		},
		usePagination
	);
	// const ownerHeader = ["Firstname", "LastName", "Email", "Phone Number"];

	return (
		<TableContainer>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, i) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={`header-group-${i}`}>
							{headerGroup.headers.map((column, index) => (
								<th {...column.getHeaderProps()} key={`header-column-${index}`}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{data.map((item, index) => {
						return (
							<>
								{item.owners.length ? (
									item.owners.map((item1, indx1) => {
										return (
											<tr key={indx1}>
												<td>{item.name}</td>
												<td>{item.organization.name}</td>
												<td>{item.organization.address}</td>
												<td>{item.organization.code}</td>
												<td>{item.organization.number}</td>
												<td>{item1.firstName}</td>
												<td>{item1.lastName}</td>
												<td>{item1.email}</td>
												<td>{item1.phoneNumber}</td>
											</tr>
										);
									})
								) : (
									<tr key={index}>
										<td>{item.name}</td>
										<td>{item.organization.name}</td>
										<td>{item.organization.address}</td>
										<td>{item.organization.code}</td>
										<td>{item.organization.number}</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								)}
							</>
						);
					})}
				</tbody>
			</table>
		</TableContainer>
	);
}

{
	/*<tbody {...getTableBodyProps()}>*/
}
{
	/*	{rows.map((row, i) => {*/
}
{
	/*		prepareRow(row)*/
}
{
	/*		return (*/
}
{
	/*			<tr {...row.getRowProps()} key={`row-${i}`}>*/
}
{
	/*				{row.cells.map((cell, index) => {*/
}
{
	/*					return (*/
}
{
	/*						<td {...cell.getCellProps()} key={`row-cell-${index}`}>*/
}
{
	/*							{cell.render('Cell')}*/
}
{
	/*						</td>*/
}
{
	/*					);*/
}
{
	/*				})}*/
}
{
	/*			</tr>*/
}
{
	/*		);*/
}
{
	/*	})}*/
}
{
	/*</tbody>*/
}
