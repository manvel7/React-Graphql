import React, { useState } from 'react';

import { Icon } from '../Icon';
import { Colors } from '../../../environment';
import { IconType } from '../../../consts';

import { Container, BaseInput, Label, ErrorLabel, HelpText, IconView } from './Input.style';

interface Props {
	value: string;
	error?: string;
	label?: string;
	password?: boolean;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
	maxLength?: number;
	disabled?: boolean;
	readOnly?: boolean;
	className?: string;
	name?: string;
	required?: boolean;
	placeholder?: string;
	helpText?: string;
	helpTextDirection?: 'start' | 'end';
	type?: string;

	onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Input({
	value,
	error,
	label,
	password,
	autoCapitalize = 'none',
	maxLength,
	disabled,
	readOnly = false,
	className,
	name,
	required = false,
	placeholder,
	helpText,
	helpTextDirection = 'start',
	type,

	onChange,
	onFocus,
	onBlur,
	onClick
}: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

	function handlePasswordVisibility() {
		setIsPasswordVisible(state => !state);
	}

	return (
		<Container className={className} onClick={onClick}>
			{label && <Label>{`${label}${required ? '*' : ''}`}</Label>}
			<BaseInput
				name={name}
				type={password && !isPasswordVisible ? 'password' : type || 'text'}
				placeholder={placeholder}
				value={value}
				autoCapitalize={autoCapitalize}
				maxLength={maxLength}
				readOnly={readOnly || disabled}
				onChange={onChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				invalid={!!error}
				focus={isFocused}
				withLabel={!!label}
				pattern="(1[0-2]|0[1-9])\/\d\d"
			/>
			{password && (
				<IconView onClick={handlePasswordVisibility}>
					<Icon
						name={isPasswordVisible ? IconType.EpEyeSlash : IconType.EpEye}
						size={20}
						color={Colors.gray[50]}
					/>
				</IconView>
			)}
			<ErrorLabel>{error}</ErrorLabel>
			{!error && helpText && <HelpText direction={helpTextDirection}>{helpText}</HelpText>}
		</Container>
	);
}
