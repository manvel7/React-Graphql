import React from 'react';

import { CookiePageHeader, CookiesTitle, CookiesText, CookiesSubTitle } from './CookiesPage.style';
import { useTranslation } from '../../hooks/i18n';

export const CookiePage = () => {
	const translate = useTranslation();

	return (
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
			<CookiesText>{translate(({ titles }) => titles.FunctionalityCookiesText)}</CookiesText>

			<CookiesSubTitle>{translate(({ titles }) => titles.Targeting)}</CookiesSubTitle>
			<CookiesText>{translate(({ titles }) => titles.TargetingText)}</CookiesText>

			<CookiesSubTitle>{translate(({ titles }) => titles.ThirdPartyCookies)}</CookiesSubTitle>
			<CookiesText>{translate(({ titles }) => titles.ThirdPartyCookiesText)}</CookiesText>

			<CookiesSubTitle>{translate(({ titles }) => titles.thirdPartyPrivacy)}</CookiesSubTitle>
			<CookiesText>{translate(({ titles }) => titles.thirdPartyPrivacyText)}</CookiesText>

			<CookiesSubTitle>{translate(({ titles }) => titles.controlCookies)}</CookiesSubTitle>
			<CookiesText>{translate(({ titles }) => titles.controlCookiesText)}</CookiesText>
			<CookiesText>{translate(({ titles }) => titles.controlCookiesText2)}</CookiesText>
			<CookiesText>{translate(({ titles }) => titles.controlCookiesText3)}</CookiesText>
		</CookiePageHeader>
	);
};
