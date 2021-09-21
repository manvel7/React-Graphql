import { AlertType } from '../consts';

export interface Alert {
	uuid: string;
	type: AlertType;
	message: string;
	title?: string;
	timeout?: number;
}
