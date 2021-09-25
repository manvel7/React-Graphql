import moment from 'moment';

export function getDataTime(startDate: string, endDate: string) {
	if (startDate && endDate) {
		const startD = moment(new Date(startDate)).format('HH:mm');
		const endD = moment(new Date(endDate)).format('HH:mm');
		return `${startD}-${endD}`;
	}
	return '00:00';
}

export function getDayOfWeek(date: string) {
	return moment(new Date(date)).format('dddd, D MMM');
}

export function getDuration(startDate: string, endDate: string) {
	const duration = new Date(endDate).getTime() - new Date(startDate).getTime();
	return moment.duration(duration).asMinutes();
}
