import React from 'react';

import {
	RadioButtonContainer,
	BaseRadioButton,
	RadioButtonLabel,
	RadioButtonTextLabel
} from './Radio.style';

interface RadioButtonProps {
	className?: string;
	name: string;
	checked: boolean;
	label?: string;
	value: string;
	disabled?: boolean;
	required?: boolean;

	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Radio({
	className,
	name,
	label,
	checked,
	value,
	disabled = false,
	required = false,
	onChange
}: RadioButtonProps) {
	return (
		<RadioButtonContainer className={className}>
			<BaseRadioButton
				type="radio"
				name={name}
				value={value}
				disabled={disabled}
				required={required}
				checked={checked}
				onChange={onChange}
			/>
			<RadioButtonLabel />
			{!!label && <RadioButtonTextLabel checked={checked}>{label}</RadioButtonTextLabel>}
		</RadioButtonContainer>
	);
}
