import { createContext, useContext } from 'react';
import { Dictionary } from '../../environment';
import { Nullable } from '../../types';

export enum LanguageCode {
	EN = 'en',
	NB = 'nb',
	SE = 'se'
}

interface LanguageContext {
	language: LanguageCode;
	translations: Nullable<typeof Dictionary>;
	changeLanguage: (code: LanguageCode) => void;
}

type LanguageTriple = [LanguageCode, (code: LanguageCode) => void, Nullable<typeof Dictionary>];

export const LanguageContext = createContext<LanguageContext>({
	language: LanguageCode.EN,
	translations: null,
	changeLanguage: () => null
});

export function useLanguage(): LanguageTriple {
	const { language, changeLanguage, translations } = useContext(LanguageContext);
	return [language, changeLanguage, translations];
}
