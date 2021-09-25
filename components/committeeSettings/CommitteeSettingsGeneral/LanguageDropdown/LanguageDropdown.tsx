import React, { useCallback, memo } from 'react';
import { languagesList } from '../../../../consts';
import { AutoComplete } from './LanguageDropdown.style';
import { useTranslation } from '../../../../hooks';

interface ILanguageDropdownProps {
	languageValue: string | undefined;
	handleLanguageChange: (timeZone: string) => void;
}

const LanguageDropdown = memo(({ languageValue, handleLanguageChange }: ILanguageDropdownProps) => {
	const translate = useTranslation();
	const getLanguageTitle = useCallback((language: string | undefined) => {
		switch (language) {
			case 'EN':
				return 'English (USA)';
			case 'NB':
				return 'Norwegian (NB)';
			case 'SE':
				return 'Swedish (SE)';
			default:
				return 'English (USA)';
		}
	}, []);

	return (
		<AutoComplete
			label={translate(({ titles }) => titles.CurrentLanguage)}
			value={getLanguageTitle(languageValue)}
		>
			{languagesList.map((language: string, index: number) => (
				<AutoComplete.Item
					key={`select-language-${index}`}
					onClick={() => handleLanguageChange(language)}
				>
					{getLanguageTitle(language)}
				</AutoComplete.Item>
			))}
		</AutoComplete>
	);
});

export { LanguageDropdown };
