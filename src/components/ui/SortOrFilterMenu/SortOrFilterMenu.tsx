import React, { useState } from 'react';

import {
	SortOrFilterMenuContainer,
	MenuWrapper,
	WrapperTitle,
	WrapperRow,
	WrapperBlock,
	WrapperText,
	Divider,
	RemoveFilterBlock,
	Select,
	AddFilterBlock
} from './SortOrFilterMenu.style';
import { GhostButton, ButtonSize } from '../Button';
import { useMeasure, useOutsideClick, useTranslation } from '../../../hooks';
import { SelectSize } from '../Select';
import { IconType } from '../../../consts';

export interface OrderByDataType {
	title: string;
	value: string;
}

interface SortOrFilterMenuProps {
	className?: string;
	orderByData: OrderByDataType[];
	orderByValue: string;
	getOrderByValue: (field: 'orderBy', value: string) => void;
}

export function SortOrFilterMenu({
	className,
	orderByData,
	orderByValue,
	getOrderByValue
}: SortOrFilterMenuProps) {
	const [ref] = useMeasure<HTMLDivElement>();
	const translate = useTranslation();
	const [open, setOpen] = useState(false);
	const [filters, setFilters] = useState<any>([{ where: '', how: '', value: '' }]);

	function toggle() {
		setOpen(!open);
	}

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setOpen(false);
		}
	}
	useOutsideClick(handleOutsideClick);

	function handleAddFilter() {
		const newFilter = { where: '', how: '', value: '' };
		setFilters([...filters, newFilter]);
	}

	function handleRemoveFilter(filterIndex: number) {
		setFilters((prevFilters: any) =>
			prevFilters.filter((f: any, index: number) => index !== filterIndex)
		);
	}

	return (
		<SortOrFilterMenuContainer className={className} ref={ref}>
			<GhostButton
				title={translate(({ buttons }) => buttons.sortOrFilter)}
				size={ButtonSize.SM}
				onClick={toggle}
			/>
			{open && (
				<MenuWrapper>
					<WrapperBlock>
						<WrapperTitle>{translate(({ titles }) => titles.sortItems)}</WrapperTitle>
						<WrapperRow>
							<WrapperText>{translate(({ titles }) => titles.showFirst)}</WrapperText>
							<Select
								title={orderByData.find(item => item.value === orderByValue)?.title}
								size={SelectSize.LG}
							>
								{orderByData.map((item, index) => (
									<Select.Item
										key={`order-item-${index}`}
										onClick={() => getOrderByValue('orderBy', item.value)}
									>
										{item.title}
									</Select.Item>
								))}
							</Select>
						</WrapperRow>
					</WrapperBlock>
					<Divider />
					<WrapperBlock>
						<WrapperTitle>{translate(({ titles }) => titles.filterItems)}</WrapperTitle>
						{filters.map((filter: any, index: number) => (
							<WrapperRow key={`filter-item-${index}`}>
								<Select size={SelectSize.MD} title="Filter 1">
									<Select.Item onClick={() => {}}>Filter 2</Select.Item>
									<Select.Item onClick={() => {}}>Filter 3</Select.Item>
									<Select.Item onClick={() => {}}>Filter 4</Select.Item>
								</Select>
								<Select size={SelectSize.MD} title="Filter 1">
									<Select.Item onClick={() => {}}>Option 1</Select.Item>
									<Select.Item onClick={() => {}}>Option 2</Select.Item>
									<Select.Item onClick={() => {}}>Option 3</Select.Item>
								</Select>
								<Select size={SelectSize.MD} title="Filter 1">
									<Select.Item onClick={() => {}}>Option 1</Select.Item>
									<Select.Item onClick={() => {}}>Option 2</Select.Item>
									<Select.Item onClick={() => {}}>Option 3</Select.Item>
								</Select>
								<RemoveFilterBlock>
									<GhostButton
										icon={IconType.EpTrash}
										onClick={() => handleRemoveFilter(index)}
									/>
								</RemoveFilterBlock>
							</WrapperRow>
						))}

						<AddFilterBlock>
							<GhostButton
								leftIcon={IconType.EpPlus}
								title={translate(({ buttons }) => buttons.add)}
								onClick={handleAddFilter}
							/>
						</AddFilterBlock>
					</WrapperBlock>
				</MenuWrapper>
			)}
		</SortOrFilterMenuContainer>
	);
}
