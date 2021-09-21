import React, { useState, useRef, useEffect } from 'react';

import {
	SearchInputContainer,
	ToggleButton,
	TextSearchWrapper,
	SearchField
} from './SearchInput.style';
import { IconType } from '../../../consts';
import { Icon } from '../Icon';
import { GhostButton, ButtonSize } from '../Button';
import { Colors } from '../../../environment';
import { useTranslation } from '../../../hooks';

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search' }: SearchInputProps) {
	const translate = useTranslation();
	const [active, setActive] = useState(false);
	const ref = useRef<HTMLInputElement>(null);

	function handleToggle() {
		setActive(true);
	}

	useEffect(() => {
		if (active && ref.current) {
			ref.current.focus();
		}
	}, [active]);

	function handleClose() {
		setActive(false);
		onChange('');
	}

	return (
		<SearchInputContainer>
			{!active ? (
				<ToggleButton onClick={handleToggle}>
					<Icon name={IconType.EpSearch} />
					{placeholder}
				</ToggleButton>
			) : (
				<TextSearchWrapper>
					<Icon name={IconType.EpSearch} color={Colors.blue[100]} />
					<SearchField
						ref={ref}
						type="text"
						placeholder={translate(({ buttons }) => buttons.search)}
						value={value}
						onChange={e => onChange(e.target.value)}
					/>
					<GhostButton
						icon={IconType.EpTimes}
						size={ButtonSize.SM}
						onClick={handleClose}
					/>
				</TextSearchWrapper>
			)}
		</SearchInputContainer>
	);
}
