import moment from 'moment';

import { MeetingSetupFormValues } from '../../components/createOrEditMeeting';

export function getEmptyMeetingLabel(values: MeetingSetupFormValues) {
	const label = values.committeeLabel;
	const month = moment(new Date(values.dates[0].startDate)).format('MMMM');
	const startDate = moment(new Date(values.dates[0].startDate)).format('D');
	const endDate = moment(new Date(values.dates[values.dates.length - 1].endDate)).format('D');
	return `Meeting in ${label} ${month} ${startDate} - ${endDate}`;
}

export enum ReminderTypes {
	EMAIL = 'EMAIL',
	PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
	SMS = 'SMS'
}

export enum ReminderFrequencies {
	BEFORE_1 = 'BEFORE_1',
	EVERY_1 = 'EVERY_1'
}

export enum ReminderFrequencyTypes {
	HOUR = 'HOUR',
	DAY = 'DAY'
}

export interface IReminder {
	id?: string;
	type: ReminderTypes;
	frequency: ReminderFrequencies;
	frequencyType: ReminderFrequencyTypes;
}
