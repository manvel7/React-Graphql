import React from 'react';

import {
	RepliesComponentContainer,
	FiltersItem,
	FiltersItemText,
	FiltersLeftBlock,
	FiltersRightBlock,
	PageFilters,
	RequestsList,
	FiltersItemSub,
	FiltersItemSubDark,
	FiltersItemSubDarkFilter
} from './Replies.style';
import { SearchInput } from '../../ui';
import { useTranslation } from '../../../hooks';
import { RequestCard } from '../../cards/RequestCard';

export const Replies = () => {
	const translate = useTranslation();

	return (
		<RepliesComponentContainer>
			<PageFilters>
				<FiltersLeftBlock>
					<FiltersItem>
						<FiltersItemText>5 New replies</FiltersItemText>
					</FiltersItem>
				</FiltersLeftBlock>
				<FiltersRightBlock>
					<FiltersItem>
						<FiltersItemSub>{translate(({ titles }) => titles.status)}</FiltersItemSub>
						<FiltersItemSubDark>
							{translate(({ titles }) => titles.new)}
						</FiltersItemSubDark>
						<FiltersItemSub>{translate(({ titles }) => titles.show)}</FiltersItemSub>
						<FiltersItemSubDark>
							{translate(({ titles }) => titles.latest)}
						</FiltersItemSubDark>
						<FiltersItemSub>{translate(({ titles }) => titles.list)}</FiltersItemSub>
						<FiltersItemSubDark>
							{translate(({ titles }) => titles.attachments)}
						</FiltersItemSubDark>
						<FiltersItemSubDarkFilter>
							{translate(({ titles }) => titles.filter)}
						</FiltersItemSubDarkFilter>
					</FiltersItem>
					<FiltersItem>
						<SearchInput value={''} onChange={() => {}} />
					</FiltersItem>
				</FiltersRightBlock>
			</PageFilters>
			<RequestsList>
				{[1, 3, 4, 5, 6].map((r, index) => (
					<RequestCard key={`request-item-${index}`} />
				))}
			</RequestsList>
		</RepliesComponentContainer>
	);
};
