import React, { useCallback, memo } from 'react';
import { useTranslation } from '../../../../hooks';
import moment from 'moment-timezone';
import { AutoCompletePositions } from '../../../ui';

import { AutoComplete } from './TimeZoneDropdown.style';

interface ITimeZoneProps {
	timeZoneValue: string | undefined;
	handleTimezoneChange: (timeZone: string) => void;
}

const TimeZoneDropdown = memo(({ timeZoneValue, handleTimezoneChange }: ITimeZoneProps) => {
	const translate = useTranslation();
	const getTimezoneTitle = useCallback(
		(timeZone: string | undefined) =>
			timeZone ? `(GMT${moment.tz(timeZone).format('Z')}) ${timeZone}` : '',
		[]
	);

	return (
		<AutoComplete
			label={translate(({ titles }) => titles.CurrentTimeZone)}
			value={getTimezoneTitle(timeZoneValue)}
			position={AutoCompletePositions.Left}
		>
			{moment.tz.names().map((timeZone, index) => (
				<AutoComplete.Item
					key={`time-zone-item-${index}`}
					onClick={() => handleTimezoneChange(timeZone)}
				>
					{getTimezoneTitle(timeZone)}
				</AutoComplete.Item>
			))}
		</AutoComplete>
	);
});

export { TimeZoneDropdown };
