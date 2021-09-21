import React, { forwardRef } from 'react';

import { DatePickerToggleInput } from './DefaultDatePicker.style';

//Without forwardRef returns issue

// eslint-disable-next-line
export const ToggleInput = forwardRef<HTMLInputElement, any>(({ value, onClick, label }, ref) => (
	<DatePickerToggleInput readOnly label={label} value={value} onClick={onClick} />
));
