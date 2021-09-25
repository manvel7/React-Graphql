import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGb from 'date-fns/locale/en-GB';

import './CreateMeetingReminderDatePicker.scss';
import { ToggleInput } from './ToggleInput';

registerLocale('en-gb', enGb);

interface CreateMeetingReminderDatePickerProps {
	maxDate: Date;
	startDate: Date;
	setStartDate: (date: Date) => void;
}

export function CreateMeetingReminderDatePicker({
	maxDate,
	startDate,
	setStartDate
}: CreateMeetingReminderDatePickerProps) {
	return (
		<ReactDatePicker
			locale="en-gb"
			dateFormat="dd MMM yyyy - HH:mm"
			dateFormatCalendar="MMM yyyy"
			showTimeSelect
			timeFormat="HH:mm"
			timeIntervals={15}
			timeCaption="Time"
			useWeekdaysShort={true}
			selected={startDate}
			onChange={(date: Date) => setStartDate(date)}
			calendarClassName={'CalendarClassName'}
			showPopperArrow={false}
			dayClassName={() => 'DayClassName'}
			customInput={<ToggleInput />}
			minDate={new Date(Date.now())}
			maxDate={maxDate}
			minTime={new Date(Date.now())}
			maxTime={maxDate}
			showDisabledMonthNavigation
		/>
	);
}
