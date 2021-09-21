import { get } from 'lodash';
import { useContext } from 'react';

import { LanguageContext } from './useLanguage';
import { Dictionary } from '../../environment';

export function useTranslation() {
	const { translations } = useContext(LanguageContext);

	function translate(
		getKey: (dict: typeof Dictionary) => string,
		options?: { [key: string]: string | number }
	) {
		const key = getKey(Dictionary);
		let translation = get(translations, key);

		if (options && translation) {
			Object.entries(options).forEach(entry => {
				translation = translation.replace(`\${${entry[0]}}`, entry[1]);
			});
		}

		return translation;
	}

	return translate;
}
