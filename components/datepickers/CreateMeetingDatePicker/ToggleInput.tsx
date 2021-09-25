import React, { forwardRef } from 'react';

import { DatePickerToggleInput } from './CreateMeetingDatePicker.style';
import { useTranslation } from '../../../hooks';

//Without forwardRef returns issue

// eslint-disable-next-line
export const ToggleInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => {
	const translate = useTranslation();
	return (
		<DatePickerToggleInput
			readOnly
			label={translate(({ inputs }) => inputs.day.label)}
			value={value}
			onClick={onClick}
		/>
	);
});
