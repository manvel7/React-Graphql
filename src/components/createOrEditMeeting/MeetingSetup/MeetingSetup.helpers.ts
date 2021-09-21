import { MeetingDates } from '@epolitiker/api';
import {
	IReminder,
	ReminderTypes,
	ReminderFrequencies,
	ReminderFrequencyTypes
} from '../../../pages/CreateOrEditMeetingPage/CreateOrEditMeetingPage.helpers';

export interface MeetingSetupFormValues {
	id: string;
	label: string;
	location: string;
	committeeId: string;
	committeeLabel: string;
	description: string;
	isRemote: boolean;
	eventPreviewCounter: boolean;
	deputyAutoReplace: boolean;
	dates: MeetingDates[] | any;
	reminders: IReminder[] | any;
}

export const reminderTypeNames = [
	{
		value: ReminderTypes.EMAIL,
		title: 'via email'
	},
	{
		value: ReminderTypes.PUSH_NOTIFICATION,
		title: 'via app notification'
	},
	{
		value: ReminderTypes.SMS,
		title: 'via sms'
	}
];

export const reminderFrequencyNames = [
	{
		value: ReminderFrequencies.BEFORE_1,
		title: 'before 1'
	},
	{
		value: ReminderFrequencies.EVERY_1,
		title: 'every 1'
	}
];

export const reminderFrequencyTypeNames = [
	{
		value: ReminderFrequencyTypes.HOUR,
		title: 'hour'
	},
	{
		value: ReminderFrequencyTypes.DAY,
		title: 'day'
	}
];

export function getDaysDifference(startDate: Date, endDate: Date) {
	const dt1 = new Date(startDate);
	const dt2 = new Date(endDate);
	return Math.floor(
		(Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
			Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
			(1000 * 60 * 60 * 24)
	);
}

export function timeConvert(n: number) {
	const num = n;
	const hours = num / 60;
	const rhours = Math.floor(hours);
	const minutes = (hours - rhours) * 60;
	const rminutes = Math.round(minutes);
	return { rhours, rminutes };
}
