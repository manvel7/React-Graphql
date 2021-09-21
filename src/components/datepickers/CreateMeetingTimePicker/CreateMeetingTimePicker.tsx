import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './CreateMeetingTimePicker.scss';
import { TimeToggleInput } from './ToggleInput';

interface CreateMeetingTimePickerProps {
	startDate: Date;
	setStartDate: (date: Date) => void;
	toggleInputLabel?: string;
}

export function CreateMeetingTimePicker({
	startDate,
	setStartDate,
	toggleInputLabel
}: CreateMeetingTimePickerProps) {
	return (
		<ReactDatePicker
			selected={startDate}
			onChange={(date: Date) => setStartDate(date)}
			showPopperArrow={false}
			showTimeSelect
			showTimeSelectOnly
			timeCaption=""
			timeIntervals={15}
			dateFormat="HH:mm"
			timeFormat="HH:mm"
			customInput={<TimeToggleInput toggleInputLabel={toggleInputLabel} />}
		/>
	);
}
