import React from 'react';
import {
	CheckboxContainer,
	CheckboxLabel,
	HiddenCheckbox,
	Icon,
	StyledCheckbox,
	CheckboxTextLabel
} from './Checkbox.style';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';

interface CheckboxProps {
	name?: string;
	className?: string;
	label?: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}

export function Checkbox({ name, label, className, checked, onChange, disabled }: CheckboxProps) {
	return (
		<CheckboxContainer className={className}>
			<CheckboxLabel>
				<HiddenCheckbox
					name={name}
					checked={checked}
					onChange={e => onChange(e)}
					disabled={disabled}
				/>
				<StyledCheckbox checked={checked} disabled={disabled}>
					<Icon
						name={IconType.EpCheck}
						color={checked ? Colors.white : Colors.transparent}
					/>
				</StyledCheckbox>
				{!!label && <CheckboxTextLabel checked={checked}>{label}</CheckboxTextLabel>}
			</CheckboxLabel>
		</CheckboxContainer>
	);
}
