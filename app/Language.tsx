import React, { useEffect, useState } from 'react';

import { StorageKey } from '../consts';
import { Dictionary } from '../environment';
import { LanguageContext, LanguageCode, useEffectOnce } from '../hooks';
import { Nullable } from '../types';

interface Props {
	children: React.ReactNode;
}

export function Language({ children }: Props) {
	const [language, setLanguage] = useState(LanguageCode.EN);
	const [translations, setTranslations] = useState<Nullable<typeof Dictionary>>(null);

	useEffectOnce(() => {
		const code = localStorage.getItem(StorageKey.LanguageCode);

		if (code) {
			setLanguage(code as LanguageCode);
		}
	});

	useEffect(() => {
		async function getTranslations(code: string) {
			const t = await fetch(`/locales/${code}/translations.json`)
				.then(res => res.json())
				.then(res => res);

			setTranslations(t);
		}

		getTranslations(language);
	}, [language]);

	function changeLanguage(code: LanguageCode) {
		setLanguage(code);
		localStorage.setItem(StorageKey.LanguageCode, code);
	}

	if (!translations) {
		return null;
	}

	return (
		<LanguageContext.Provider value={{ language, translations, changeLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
}
