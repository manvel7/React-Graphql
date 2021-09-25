import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGb from 'date-fns/locale/en-GB';

import './DefaultDatePicker.scss';
import { ToggleInput } from './ToggleInput';

registerLocale('en-gb', enGb);

interface DefaultDatePickerProps {
	startDate: Date;
	setStartDate: (date: Date) => void;
	inputLabel: string;
	maxDate?: Date;
}

export function DefaultDatePicker({
	startDate,
	setStartDate,
	inputLabel,
	maxDate
}: DefaultDatePickerProps) {
	return (
		<ReactDatePicker
			locale="en-gb"
			dateFormat="dd/M/yyyy"
			dateFormatCalendar="MMM yyyy"
			selected={startDate}
			onChange={(date: Date) => setStartDate(date)}
			calendarClassName={'default-deatepicker-calendar-classname'}
			showPopperArrow={false}
			dayClassName={() => 'DayClassName'}
			customInput={<ToggleInput label={inputLabel} />}
			showDisabledMonthNavigation
			maxDate={maxDate}
		/>
	);
}
