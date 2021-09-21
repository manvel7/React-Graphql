import React from 'react';

import {
	PageFilters,
	FiltersLeftBlock,
	FiltersRightBlock,
	FiltersItem
} from './MembersFilterBar.style';
import { Dropdown, SearchInput, SortOrFilterMenu, OrderByDataType } from '../../ui';
import { useTranslation } from '../../../hooks';

export interface FiltersType {
	role: string[];
	textSearch: string;
	orderBy: string;
}

interface MembersFilterBarProps {
	count: number;
	filters: FiltersType;
	handleFilters: (field: keyof FiltersType, value: string | string[]) => void;
}

const workspaceMembersOrderByData: OrderByDataType[] = [
	{
		title: 'Recently added',
		value: 'createdAt_DESC'
	},
	{
		title: 'First added',
		value: 'createdAt_ASC'
	},
	{
		title: 'Firstname ascending',
		value: 'firstName_ASC'
	},
	{
		title: 'Firstname descending',
		value: 'firstName_DESC'
	}
];

export function MembersFilterBar({ count, filters, handleFilters }: MembersFilterBarProps) {
	const translate = useTranslation();
	return (
		<PageFilters>
			<FiltersLeftBlock>
				<FiltersItem>
					{translate(({ titles }) => titles.numberOfUsers)} {count}
				</FiltersItem>
			</FiltersLeftBlock>
			<FiltersRightBlock>
				<FiltersItem>
					<SortOrFilterMenu
						orderByData={workspaceMembersOrderByData}
						orderByValue={filters.orderBy}
						getOrderByValue={handleFilters}
					/>
				</FiltersItem>
				<FiltersItem>
					<Dropdown
						toggleComponent={() => (
							<Dropdown.Title>
								{filters.role.length > 1 ? 'Filter by type' : filters.role[0]}
							</Dropdown.Title>
						)}
					>
						<Dropdown.Item onClick={() => handleFilters('role', ['ADMIN', 'REGULAR'])}>
							All
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleFilters('role', ['ADMIN'])}>
							ADMIN
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleFilters('role', ['REGULAR'])}>
							REGULAR
						</Dropdown.Item>
					</Dropdown>
				</FiltersItem>
				<FiltersItem>
					<SearchInput
						value={filters.textSearch}
						placeholder={translate(({ buttons }) => buttons.search)}
						onChange={value => handleFilters('textSearch', value)}
					/>
				</FiltersItem>
			</FiltersRightBlock>
		</PageFilters>
	);
}
