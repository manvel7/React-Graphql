import React from 'react';

import {
	TermsServiceHeader,
	TermsServiceText,
	TermsServiceTitle,
	PrivacyPolicyTitleOne,
	PrivacyPolicyTitleTwo,
	TermsServiceTextSub,
	PrivacyPolicyTitleFive,
	PrivacyPolicyTitleSix,
	PrivacyPolicyTitleEight
} from './TermsService.style';
import { useTranslation } from '../../hooks/i18n';

export const TermsService = () => {
	const translate = useTranslation();
	return (
		<TermsServiceHeader>
			<TermsServiceTitle>
				{translate(({ titles }) => titles.ICMASTermsOfService)}
			</TermsServiceTitle>
			<PrivacyPolicyTitleOne>
				1. {translate(({ titles }) => titles.Terms)}
			</PrivacyPolicyTitleOne>
			<TermsServiceText>{translate(({ titles }) => titles.TermsText)}</TermsServiceText>

			<PrivacyPolicyTitleTwo>
				2. {translate(({ titles }) => titles.UseLicence)}
			</PrivacyPolicyTitleTwo>
			<TermsServiceTextSub>
				a. {translate(({ titles }) => titles.UseLicenceText)}
			</TermsServiceTextSub>
			<TermsServiceTextSub>
				i. {translate(({ titles }) => titles.UseLicenceText2)}
			</TermsServiceTextSub>
			<TermsServiceTextSub>
				ii. {translate(({ titles }) => titles.UseLicenceText3)}
			</TermsServiceTextSub>
			<TermsServiceTextSub>
				iii. {translate(({ titles }) => titles.UseLicenceText4)}
			</TermsServiceTextSub>
			<TermsServiceTextSub>
				iv. {translate(({ titles }) => titles.UseLicenceText5)}
			</TermsServiceTextSub>
			<TermsServiceTextSub>
				v. {translate(({ titles }) => titles.UseLicenceText6)}
			</TermsServiceTextSub>
			<TermsServiceTextSub>
				b. {translate(({ titles }) => titles.UseLicenceTextSub)}
			</TermsServiceTextSub>

			<PrivacyPolicyTitleTwo>
				3. {translate(({ titles }) => titles.Disclaimer)}
			</PrivacyPolicyTitleTwo>
			<TermsServiceTextSub>
				a. {translate(({ titles }) => titles.DisclaimerText)}
			</TermsServiceTextSub>
			<TermsServiceTextSub>
				b. {translate(({ titles }) => titles.DisclaimerText2)}
			</TermsServiceTextSub>

			<PrivacyPolicyTitleTwo>
				4. {translate(({ titles }) => titles.Limitations)}
			</PrivacyPolicyTitleTwo>
			<TermsServiceTextSub>
				{translate(({ titles }) => titles.LimitationsText)}
			</TermsServiceTextSub>

			<PrivacyPolicyTitleFive>
				5. {translate(({ titles }) => titles.AccuracyOfMaterials)}
			</PrivacyPolicyTitleFive>
			<TermsServiceTextSub>
				{translate(({ titles }) => titles.AccuracyOfMaterialsText)}
			</TermsServiceTextSub>

			<PrivacyPolicyTitleSix>
				6. {translate(({ titles }) => titles.Links)}
			</PrivacyPolicyTitleSix>
			<TermsServiceTextSub>{translate(({ titles }) => titles.LinksText)}</TermsServiceTextSub>

			<PrivacyPolicyTitleTwo>
				7. {translate(({ titles }) => titles.Modifications)}
			</PrivacyPolicyTitleTwo>
			<TermsServiceTextSub>
				{translate(({ titles }) => titles.ModificationsText)}
			</TermsServiceTextSub>

			<PrivacyPolicyTitleEight>
				8. {translate(({ titles }) => titles.GoverningLaw)}
			</PrivacyPolicyTitleEight>
			<TermsServiceTextSub>
				{translate(({ titles }) => titles.GoverningLawText)}
			</TermsServiceTextSub>
		</TermsServiceHeader>
	);
};
