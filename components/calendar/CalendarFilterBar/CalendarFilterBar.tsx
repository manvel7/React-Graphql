import React, { useState, useEffect } from 'react';

import { Committee } from '@epolitiker/api';

import {
	PageFilters,
	FiltersLeftBlock,
	FiltersRightBlock,
	FiltersItem
} from './CalendarFilterBar.style';
import {
	GhostButton,
	ButtonSize,
	SortOrFilterMenu,
	SearchInput,
	OrderByDataType,
	Dropdown
} from '../../ui';
import { IconType, StorageKey } from '../../../consts';
import {
	useWorkspaceCommitteesLazyQuery,
	useEffectOnce,
	useTranslation,
	useLocalStorage,
	useIsAdmin
} from '../../../hooks';

export interface CalendarFiltersType {
	textSearch: string;
	orderBy: string;
	where: any;
	committeeId: string;
	status: string;
}

interface CalendarFilterBarProps {
	count: number;
	filters: CalendarFiltersType;
	handleFilters: (field: keyof CalendarFiltersType, value: string) => void;
}

const workspaceMeetingsOrderByData: OrderByDataType[] = [
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

// const workspaceMeetingsFilterData: any[] = [
// 	{
// 		title: 'Status',
// 		value: 'status',
// 		values: [
// 			{title: 'Published', value: 'PUBLISHED'},
// 			{title: 'Completed', value: 'COMPLETED'},
// 			{title: 'Upcoming', value: 'UPCOMING'},
// 			{title: 'Live', value: 'LIVE'},
// 			{title: 'Protocoled', value: 'PROTOCOLED'},
// 			{title: 'Canceled', value: 'CANCELED'}
// 		]
// 	}
// ];

export function CalendarFilterBar({ count, filters, handleFilters }: CalendarFilterBarProps) {
	const translate = useTranslation();
	const isAdmin = useIsAdmin();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [committees, setCommittees] = useState<Committee[]>([]);
	const [
		getWorkspaceCommittees,
		{ data: workspaceCommitteesData }
	] = useWorkspaceCommitteesLazyQuery();

	useEffectOnce(() => {
		handleGetWorkspaceCommittees();
	});

	function handleGetWorkspaceCommittees() {
		if (activeWorkspace) {
			getWorkspaceCommittees({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					},
					orderBy: 'label_ASC'
				}
			});
		}
	}

	useEffect(() => {
		if (workspaceCommitteesData) {
			setCommittees(workspaceCommitteesData.workspaceDetails.committees);
		}
	}, [workspaceCommitteesData]);

	return (
		<PageFilters>
			<FiltersLeftBlock>
				<FiltersItem>
					{translate(({ titles }) => titles.allMeetings)} {count}
				</FiltersItem>
			</FiltersLeftBlock>
			<FiltersRightBlock>
				<FiltersItem>
					{isAdmin ? (
						<GhostButton
							size={ButtonSize.SM}
							title={translate(({ buttons }) => buttons.list)}
							onClick={() => {}}
						/>
					) : (
						<GhostButton
							size={ButtonSize.SM}
							title={translate(({ buttons }) => buttons.committeeName)}
							onClick={() => {}}
						/>
					)}
				</FiltersItem>
				<FiltersItem>
					{isAdmin ? (
						<Dropdown
							toggleComponent={() => (
								<Dropdown.Title>
									{filters.committeeId
										? committees.find(com => com.id === filters.committeeId)
												?.label
										: translate(({ buttons }) => buttons.allCommittees)}
								</Dropdown.Title>
							)}
						>
							<Dropdown.Item
								key={'all-committees-key'}
								onClick={() => handleFilters('committeeId', '')}
							>
								{translate(({ buttons }) => buttons.allCommittees)}
							</Dropdown.Item>
							{committees.map(committee => (
								<Dropdown.Item
									key={committee.id}
									onClick={() => handleFilters('committeeId', committee.id)}
								>
									{committee.label}
								</Dropdown.Item>
							))}
						</Dropdown>
					) : null}
				</FiltersItem>
				<FiltersItem>
					{!isAdmin ? (
						<GhostButton
							size={ButtonSize.SM}
							title={translate(({ buttons }) => buttons.previousMonth)}
							leftIcon={IconType.EpEvent}
							onClick={() => {}}
						/>
					) : null}
				</FiltersItem>
				<FiltersItem>
					<GhostButton
						size={ButtonSize.SM}
						title={translate(({ buttons }) => buttons.nextMonth)}
						leftIcon={IconType.EpEvent}
						onClick={() => {}}
					/>
				</FiltersItem>
				<FiltersItem>
					<SortOrFilterMenu
						orderByData={workspaceMeetingsOrderByData}
						orderByValue={filters.orderBy}
						getOrderByValue={handleFilters}
					/>
				</FiltersItem>
				<FiltersItem>
					<SearchInput
						placeholder={translate(({ buttons }) => buttons.search)}
						value={filters.textSearch}
						onChange={value => handleFilters('textSearch', value)}
					/>
				</FiltersItem>
			</FiltersRightBlock>
		</PageFilters>
	);
}
