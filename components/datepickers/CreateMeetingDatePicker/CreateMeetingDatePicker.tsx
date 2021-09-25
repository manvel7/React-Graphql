import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGb from 'date-fns/locale/en-GB';

import './CreateMeetingDatePicker.scss';
import { ToggleInput } from './ToggleInput';
// import { addDays } from 'date-fns';

registerLocale('en-gb', enGb);

interface CreateMeetingDatePickerProps {
	startDate: Date;
	setStartDate: (date: Date) => void;
}

export function CreateMeetingDatePicker({ startDate, setStartDate }: CreateMeetingDatePickerProps) {
	return (
		<ReactDatePicker
			monthsShown={2}
			locale="en-gb"
			dateFormat="dd MMM yyyy"
			dateFormatCalendar="MMM yyyy"
			useWeekdaysShort={true}
			selected={startDate}
			onChange={(date: Date) => setStartDate(date)}
			calendarClassName={'CalendarClassName'}
			showPopperArrow={false}
			dayClassName={() => 'DayClassName'}
			customInput={<ToggleInput />}
			minDate={new Date()}
			// maxDate={addDays(new Date(), 60)}
			showDisabledMonthNavigation
		/>
	);
}
