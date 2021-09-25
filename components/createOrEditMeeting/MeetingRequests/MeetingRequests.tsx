import React from 'react';

import {
	PageContainer,
	PageFilters,
	FiltersLeftBlock,
	FiltersRightBlock,
	FiltersItem,
	RequestsList,
	FiltersItemText
} from './MeetingRequests.style';
import { SortOrFilterMenu, SearchInput } from '../../ui';
import { MeetingRequestCard } from '../../cards';

export function MeetingRequests() {
	return (
		<PageContainer>
			<PageFilters>
				<FiltersLeftBlock>
					<FiltersItem>
						<FiltersItemText>New replies and suggestions 12</FiltersItemText>
					</FiltersItem>
				</FiltersLeftBlock>
				<FiltersRightBlock>
					<FiltersItem>
						<SortOrFilterMenu
							orderByData={[]}
							orderByValue={''}
							getOrderByValue={() => {}}
						/>
					</FiltersItem>
					<FiltersItem>
						<SearchInput value={''} onChange={() => {}} />
					</FiltersItem>
				</FiltersRightBlock>
			</PageFilters>
			<RequestsList>
				{[1, 3, 4, 5, 6].map((r, index) => (
					<MeetingRequestCard key={`request-item-${index}`} />
				))}
			</RequestsList>
		</PageContainer>
	);
}
