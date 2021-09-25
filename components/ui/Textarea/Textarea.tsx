import React, { useState } from 'react';

import { Container, BaseTextarea, Label, ErrorLabel, HelpText } from './Textarea.style';

interface TextareaProps {
	value: string;
	error?: string;
	label?: string;
	rows?: number;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
	disabled?: boolean;
	className?: string;
	name?: string;
	required?: boolean;
	placeholder?: string;
	helpText?: string;
	helpTextDirection?: 'start' | 'end';

	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function Textarea({
	value,
	error,
	label,
	rows = 5,
	autoCapitalize = 'none',
	disabled,
	className,
	name,
	required = false,
	placeholder,
	helpText,
	helpTextDirection = 'start',

	onChange,
	onFocus,
	onBlur
}: TextareaProps) {
	const [isFocused, setIsFocused] = useState(false);

	function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (!isFocused) {
			setIsFocused(true);

			if (onFocus) {
				onFocus(e);
			}
		}
	}

	function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (isFocused) {
			setIsFocused(false);
		}

		if (onBlur) {
			onBlur(e);
		}
	}

	return (
		<Container className={className}>
			{label && <Label>{`${label}${required ? '*' : ''}`}</Label>}
			<BaseTextarea
				name={name}
				placeholder={placeholder}
				rows={rows}
				value={value}
				autoCapitalize={autoCapitalize}
				readOnly={disabled}
				onChange={onChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				invalid={!!error}
				focus={isFocused}
				withLabel={!!label}
			/>
			<ErrorLabel>{error}</ErrorLabel>
			{!error && helpText && <HelpText direction={helpTextDirection}>{helpText}</HelpText>}
		</Container>
	);
}
