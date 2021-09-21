import React from 'react';

import { CommitteeVisibility } from '@epolitiker/api/dist/generated';

import {
	PageFilters,
	FiltersItem,
	FiltersLeftBlock,
	FiltersRightBlock
} from './CommitteesFilterBar.style';
import { CommitteesVisibilitySelect } from '../CommitteesVisibilitySelect';
import { SearchInput, SortOrFilterMenu, OrderByDataType } from '../../ui';
import { useTranslation } from '../../../hooks';

export interface CommitteesFiltersType {
	visibility: CommitteeVisibility[];
	textSearch: string;
	orderBy: string;
}

interface CommitteesFilterBarProps {
	count: number;
	filters: CommitteesFiltersType;
	handleFilters: (
		field: keyof CommitteesFiltersType,
		value: string | CommitteeVisibility[]
	) => void;
}

const workspaceCommitteesOrderByData: OrderByDataType[] = [
	{
		title: 'Recently created',
		value: 'createdAt_DESC'
	},
	{
		title: 'First created',
		value: 'createdAt_ASC'
	},
	{
		title: 'Recently updated',
		value: 'updatedAt_DESC'
	},
	{
		title: 'First updated',
		value: 'updatedAt_ASC'
	},
	{
		title: 'Label ascending',
		value: 'label_ASC'
	},
	{
		title: 'Label descending',
		value: 'label_DESC'
	}
];

export function CommitteesFilterBar({ count, filters, handleFilters }: CommitteesFilterBarProps) {
	const translate = useTranslation();
	return (
		<PageFilters>
			<FiltersLeftBlock>
				<FiltersItem>
					{translate(({ titles }) => titles.numberOfCommittees)} {count}
				</FiltersItem>
			</FiltersLeftBlock>
			<FiltersRightBlock>
				<FiltersItem>
					<SortOrFilterMenu
						orderByData={workspaceCommitteesOrderByData}
						orderByValue={filters.orderBy}
						getOrderByValue={handleFilters}
					/>
				</FiltersItem>
				<FiltersItem>
					<CommitteesVisibilitySelect
						selected={filters.visibility}
						onSelect={handleFilters}
						enableAll={true}
					/>
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
