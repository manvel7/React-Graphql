import React, { forwardRef } from 'react';

import { TimePickerToggleInput } from './CreateMeetingTimePicker.style';

//Without forwardRef returns issue

export const TimeToggleInput = forwardRef<HTMLInputElement, any>(
	// eslint-disable-next-line
	({ value, onClick, onChange, toggleInputLabel }, ref) => (
		<TimePickerToggleInput
			label={toggleInputLabel}
			value={value}
			type="time"
			onChange={onChange}
			onClick={onClick}
		/>
	)
);
