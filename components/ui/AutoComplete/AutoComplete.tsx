import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import {
	AutoCompleteContainer,
	InputContainer,
	Input,
	Label,
	ErrorLabel,
	AutoCompleteMenu,
	AutoCompleteItem,
	InputIconBlock,
	SearchBlock,
	SearchField,
	TextSearchWrapper,
	ResultBlock,
	NoResultsBlock,
	NoResulText,
	NoResultInfoText,
	SearchLoaderContainer
} from './AutoComplete.style';
import { useMeasure, useOutsideClick } from '../../../hooks';
import { Icon } from '../Icon';
import { IconType } from '../../../consts';
import { GhostButton, ButtonSize, ButtonTypes } from '../Button';
import { Colors } from '../../../environment';

export enum AutoCompletePositions {
	Right = 'right',
	Left = 'left'
}

interface AutoCompleteProps {
	toggleComponent?: () => JSX.Element;
	name?: string;
	className?: string;
	children: JSX.Element | JSX.Element[] | any;
	value?: string;
	label?: string;
	placeholder?: string;
	error?: string;
	searchValue?: string;
	getSearchValue?: (value: string) => void;
	searchLoading?: boolean;
	searchPlaceholder?: string;
	required?: boolean;
	disabled?: boolean;
	position?: AutoCompletePositions;
}

export function AutoComplete({
	toggleComponent,
	name,
	className,
	value,
	label,
	placeholder = '',
	error,
	required = false,
	disabled = false,
	searchValue,
	getSearchValue,
	searchLoading = false,
	searchPlaceholder,
	children,
	position = AutoCompletePositions.Right
}: AutoCompleteProps) {
	const [ref] = useMeasure<HTMLDivElement>();
	const [open, setOpen] = useState(false);
	const [searchFocused, setSearchFocused] = useState(false);

	function toggle(e: React.MouseEvent) {
		e.stopPropagation();
		setOpen(!open);
	}

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setOpen(false);
		}
	}
	useOutsideClick(handleOutsideClick);

	const renderChildren = React.Children.map(children, child =>
		React.cloneElement(child, {
			onClick: (e: React.MouseEvent) => {
				e.stopPropagation();
				child.props.onClick();
				setOpen(false);
			}
		})
	);

	return (
		<AutoCompleteContainer className={className} ref={ref}>
			<InputContainer onClick={toggle} disabled={disabled}>
				{toggleComponent ? (
					toggleComponent()
				) : (
					<>
						{label && <Label>{`${label}${required ? '*' : ''}`}</Label>}
						<Input
							name={name}
							open={open}
							readOnly={true}
							withLabel={!!label}
							placeholder={placeholder}
							invalid={!!error}
							value={value}
						/>
						<InputIconBlock>
							<Icon
								name={open ? IconType.EpChevronUp : IconType.EpChevronDown}
								color={open ? Colors.blue[80] : ''}
							/>
						</InputIconBlock>
					</>
				)}
			</InputContainer>
			<ErrorLabel>{error}</ErrorLabel>

			{open && (
				<AutoCompleteMenu position={position}>
					{getSearchValue && (
						<SearchBlock>
							<TextSearchWrapper>
								{searchLoading ? (
									<SearchLoaderContainer>
										<ClipLoader
											size={14}
											color={Colors.neutralBlue[80]}
											loading={searchLoading}
										/>
									</SearchLoaderContainer>
								) : (
									<Icon
										name={IconType.EpSearch}
										color={searchFocused ? Colors.blue[100] : ''}
									/>
								)}
								<SearchField
									type="text"
									placeholder={
										searchFocused ? 'Type to search...' : searchPlaceholder
									}
									value={searchValue}
									onChange={e => getSearchValue(e.target.value)}
									onFocus={() => setSearchFocused(true)}
									onBlur={() => setSearchFocused(false)}
								/>
								{(searchValue || searchFocused) && (
									<GhostButton
										type={ButtonTypes.Button}
										icon={IconType.EpTimes}
										size={ButtonSize.SM}
										onClick={() => getSearchValue('')}
									/>
								)}
							</TextSearchWrapper>
						</SearchBlock>
					)}

					{searchValue && renderChildren.length === 0 ? (
						<NoResultsBlock>
							<NoResulText>No Results</NoResulText>
							<NoResultInfoText>Try different search...</NoResultInfoText>
						</NoResultsBlock>
					) : (
						renderChildren
					)}

					{searchValue && renderChildren.length !== 0 && (
						<ResultBlock>{`${renderChildren.length} result`}</ResultBlock>
					)}
				</AutoCompleteMenu>
			)}
		</AutoCompleteContainer>
	);
}

AutoComplete.Item = AutoCompleteItem;
