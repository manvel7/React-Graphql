import React from 'react';

import {
	CookiePageHeader,
	CookiesTitle,
	CookiesText,
	CookiesSubTitle,
	CookieHeaderContainer,
	NavBarItemCookiesPageDashboard,
	CookiesTitleHeader
} from './CookiesPageDashboard.style';
import { LanguageCode, useLanguage, useTranslation } from '../../hooks/i18n';
import { Dropdown } from '../../components/ui/Dropdown';
import { Icon } from '../../components/ui/Icon';
import { IconType } from '../../consts';
import { Colors } from '../../environment/theme';

export const CookiesPageDashboard = () => {
	const languagesList = [
		{ label: 'EN', value: LanguageCode.EN },
		{ label: 'NO', value: LanguageCode.NB },
		{ label: 'SE', value: LanguageCode.SE }
	];

	const translate = useTranslation();
	const [language, changeLanguage] = useLanguage();

	return (
		<CookieHeaderContainer>
			<NavBarItemCookiesPageDashboard>
				<Dropdown
					toggleComponent={() => (
						<>
							<Dropdown.TitleBold>
								{languagesList.find(l => l.value === language)?.label}
							</Dropdown.TitleBold>
							<Icon name={IconType.EpCornerDown} color={Colors.black[100]} />
						</>
					)}
				>
					{languagesList.map((lang, i) => (
						<Dropdown.Item
							key={`select-language-${i}`}
							onClick={() => changeLanguage(lang.value)}
						>
							{lang.label}
						</Dropdown.Item>
					))}
				</Dropdown>
				<CookiesTitleHeader>
					{translate(({ titles }) => titles.CookiePolice)}
				</CookiesTitleHeader>
			</NavBarItemCookiesPageDashboard>
			<CookiePageHeader>
				<CookiesTitle>{translate(({ titles }) => titles.CookiePolice)}</CookiesTitle>
				<CookiesText>{translate(({ titles }) => titles.CookiePoliceText)}</CookiesText>
				<CookiesText>{translate(({ titles }) => titles.CookiePoliceText2)}</CookiesText>

				<CookiesTitle>{translate(({ titles }) => titles.WhatIsCookie)}</CookiesTitle>
				<CookiesText>{translate(({ titles }) => titles.WhatIsCookieText)}</CookiesText>
				<CookiesText>{translate(({ titles }) => titles.WhatIsCookieText2)}</CookiesText>
				<CookiesText>{translate(({ titles }) => titles.WhatIsCookieText3)}</CookiesText>

				<CookiesTitle>{translate(({ titles }) => titles.TypeOfCookies)}</CookiesTitle>
				<CookiesSubTitle>
					{translate(({ titles }) => titles.TypeOfCookiesSubTitle)}
				</CookiesSubTitle>
				<CookiesText>{translate(({ titles }) => titles.TypeOfCookiesText)}</CookiesText>

				<CookiesSubTitle>
					{translate(({ titles }) => titles.TypeOfCookiesSubTitle2)}
				</CookiesSubTitle>
				<CookiesText>
					{translate(({ titles }) => titles.TypeOfCookiesTextPerformance)}
				</CookiesText>

				<CookiesSubTitle>
					{translate(({ titles }) => titles.FunctionalityCookies)}
				</CookiesSubTitle>
				<CookiesText>
					{translate(({ titles }) => titles.FunctionalityCookiesText)}
				</CookiesText>

				<CookiesSubTitle>{translate(({ titles }) => titles.Targeting)}</CookiesSubTitle>
				<CookiesText>{translate(({ titles }) => titles.TargetingText)}</CookiesText>

				<CookiesSubTitle>
					{translate(({ titles }) => titles.ThirdPartyCookies)}
				</CookiesSubTitle>
				<CookiesText>{translate(({ titles }) => titles.ThirdPartyCookiesText)}</CookiesText>

				<CookiesSubTitle>
					{translate(({ titles }) => titles.thirdPartyPrivacy)}
				</CookiesSubTitle>
				<CookiesText>{translate(({ titles }) => titles.thirdPartyPrivacyText)}</CookiesText>

				<CookiesSubTitle>
					{translate(({ titles }) => titles.controlCookies)}
				</CookiesSubTitle>
				<CookiesText>{translate(({ titles }) => titles.controlCookiesText)}</CookiesText>
				<CookiesText>{translate(({ titles }) => titles.controlCookiesText2)}</CookiesText>
				<CookiesText>{translate(({ titles }) => titles.controlCookiesText3)}</CookiesText>
			</CookiePageHeader>
		</CookieHeaderContainer>
	);
};
