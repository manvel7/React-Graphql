import React, { forwardRef } from 'react';

import { DatePickerToggleInput } from './CreateMeetingReminderDatePicker.style';

//Without forwardRef returns issue

// eslint-disable-next-line
export const ToggleInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
	<DatePickerToggleInput readOnly value={value} onClick={onClick} />
));
