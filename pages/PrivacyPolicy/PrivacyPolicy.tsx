import React, { useState } from 'react';

import {
	PrivacyPolicyContainer,
	PrivacyPolicyTitle,
	PrivacyPolicyText,
	PrivacyPolicyBlock,
	PrivacyPolicySubTitle,
	PrivacyPolicyTitleOne,
	PrivacyPolicyTitleSecond,
	PrivacyPolicyTextInfo,
	Span,
	PrivacyPolicyTextInfoContainer,
	PrivacyPolicyTitleThree,
	PrivacyPolicyTitleFour,
	PrivacyPolicyTitleFive,
	PrivacyPolicyTitleSix,
	SpanText,
	PrivacyPolicyTitleSeven,
	PrivacyPolicyTitleEight,
	PrivacyPolicyTitleNine,
	PrivacyPolicyTitleTen,
	PrivacyPolicyBlockContainer,
	PageNavContainer,
	PageNavItem
} from './PrivacyPolicy.style';
import { useTranslation } from '../../hooks/i18n';
import { TermsService } from '../TermsService';
import { CookiePage } from '../CookiesPage';

export const PrivacyPolicy = () => {
	const translate = useTranslation();
	const [activeTab, setActiveTab] = useState(1);

	return (
		<PrivacyPolicyContainer>
			<PageNavContainer>
				<PageNavItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
					{translate(({ tabs }) => tabs.privacyPolice)}
				</PageNavItem>
				<PageNavItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
					{translate(({ tabs }) => tabs.TermsAndConditions)}
				</PageNavItem>
				<PageNavItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
					{translate(({ tabs }) => tabs.CookiePolicy)}
				</PageNavItem>
			</PageNavContainer>

			<PrivacyPolicyBlockContainer>
				{activeTab === 1 && (
					<PrivacyPolicyBlock>
						<PrivacyPolicyTitle>
							{translate(({ titles }) => titles.privacyPolicy)}
						</PrivacyPolicyTitle>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.privacyPolicyText)}
						</PrivacyPolicyText>

						<PrivacyPolicyTitleOne>
							1. {translate(({ titles }) => titles.InformationWeCollect)}
						</PrivacyPolicyTitleOne>
						<PrivacyPolicySubTitle>
							{translate(({ titles }) => titles.LogData)}
						</PrivacyPolicySubTitle>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.privacyPolicyTextSecond)}
						</PrivacyPolicyText>

						<PrivacyPolicySubTitle>
							{translate(({ titles }) => titles.DeviceData)}
						</PrivacyPolicySubTitle>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.privacyPolicyTextDeviceData)}
						</PrivacyPolicyText>

						<PrivacyPolicySubTitle>
							{translate(({ titles }) => titles.PersonalInformation)}
						</PrivacyPolicySubTitle>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.WeMayAsk)}
						</PrivacyPolicyText>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.Name)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.email)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.SocialMediaProfiles)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.DateOfBirth)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.PhoneMobileNumber)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.HomeMailingAddress)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.WorkAddress)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.WebsiteAddress)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.PaymentInformation)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DriversLicenceDetails)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.PassportNumber)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.TaxSSNMedicareEtcNumber)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicySubTitle>
							{translate(({ titles }) => titles.BusinessData)}
						</PrivacyPolicySubTitle>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.BusinessText)}
						</PrivacyPolicyText>

						<PrivacyPolicyTitleSecond>
							2. {translate(({ titles }) => titles.LegalInfo)}
						</PrivacyPolicyTitleSecond>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.LegalText)}
						</PrivacyPolicyText>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.LegalTextSub)}
						</PrivacyPolicyText>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.Text1)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.Text2)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.Text3)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span> {translate(({ titles }) => titles.Text4)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyText>
							{translate(({ titles }) => titles.Text5)}
						</PrivacyPolicyText>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.Text6)}
						</PrivacyPolicyText>

						<PrivacyPolicyTitleThree>
							3. {translate(({ titles }) => titles.CollectionAndUseOfInformation)}
						</PrivacyPolicyTitleThree>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.CollectionAndUseOfInformationText)}
						</PrivacyPolicyText>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText1
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText2
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText3
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText4
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText5
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText6
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText7
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText8
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText9
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(
									({ titles }) => titles.CollectionAndUseOfInformationText10
								)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTitleFour>
							4. {translate(({ titles }) => titles.DisclosureOfPersonal)}
						</PrivacyPolicyTitleFour>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.discloseText)}
						</PrivacyPolicyText>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DisclosureOfPersonalText1)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DisclosureOfPersonalText2)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DisclosureOfPersonalText3)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DisclosureOfPersonalText4)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DisclosureOfPersonalText5)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DisclosureOfPersonalText6)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>
						<PrivacyPolicyTextInfoContainer>
							<PrivacyPolicyTextInfo>
								<Span>.</Span>{' '}
								{translate(({ titles }) => titles.DisclosureOfPersonalText7)}
							</PrivacyPolicyTextInfo>
						</PrivacyPolicyTextInfoContainer>

						<PrivacyPolicyTitleFive>
							5. {translate(({ titles }) => titles.InternationalTransfers)}
						</PrivacyPolicyTitleFive>

						<PrivacyPolicyText>
							{translate(({ titles }) => titles.InternationalTransfersText1)}
						</PrivacyPolicyText>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.InternationalTransfersText2)}
						</PrivacyPolicyText>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.InternationalTransfersText3)}
						</PrivacyPolicyText>

						<PrivacyPolicyTitleSix>
							6. {translate(({ titles }) => titles.controllingInformation)}
						</PrivacyPolicyTitleSix>
						<PrivacyPolicyTextInfo>
							<SpanText>
								{translate(({ titles }) => titles.ChoiceAndConsent)}
							</SpanText>
							{translate(({ titles }) => titles.controllingYourPersonal)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTextInfo>
							<SpanText>
								{translate(({ titles }) => titles.InformationFromThird)}
							</SpanText>
							{translate(({ titles }) => titles.InformationFromThirdText)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTextInfo>
							<SpanText>{translate(({ titles }) => titles.Restrict)}</SpanText>
							{translate(({ titles }) => titles.RestrictText)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTextInfo>
							<SpanText>{translate(({ titles }) => titles.AccessAndData)}</SpanText>
							{translate(({ titles }) => titles.RestrictText)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTextInfo>
							<SpanText>{translate(({ titles }) => titles.Correction)}</SpanText>
							{translate(({ titles }) => titles.CorrectionText)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTextInfo>
							<SpanText>{translate(({ titles }) => titles.Notification)}</SpanText>
							{translate(({ titles }) => titles.NotificationText)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTextInfo>
							<SpanText>{translate(({ titles }) => titles.Complaints)}</SpanText>
							{translate(({ titles }) => titles.ComplaintsText)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTextInfo>
							<SpanText>{translate(({ titles }) => titles.Unsubscribe)}</SpanText>
							{translate(({ titles }) => titles.UnsubscribeText)}
						</PrivacyPolicyTextInfo>
						<PrivacyPolicyTitleSeven>
							7. {translate(({ titles }) => titles.Cookies)}
						</PrivacyPolicyTitleSeven>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.CookiesText)}
						</PrivacyPolicyText>

						<PrivacyPolicyTitleEight>
							8. {translate(({ titles }) => titles.BusinessTransfers)}
						</PrivacyPolicyTitleEight>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.BusinessTransfersText)}
						</PrivacyPolicyText>

						<PrivacyPolicyTitleNine>
							9. {translate(({ titles }) => titles.LimitsOfOurPolicy)}
						</PrivacyPolicyTitleNine>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.LimitsOfOurPolicyText)}
						</PrivacyPolicyText>

						<PrivacyPolicyTitleTen>
							10. {translate(({ titles }) => titles.ChangesToThisPolicy)}
						</PrivacyPolicyTitleTen>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.ChangesToThisPolicyText)}
						</PrivacyPolicyText>
						<PrivacyPolicyText>
							{translate(({ titles }) => titles.ChangesToThisPolicyText2)}
						</PrivacyPolicyText>
					</PrivacyPolicyBlock>
				)}
				{activeTab === 2 && <TermsService />}
				{activeTab === 3 && <CookiePage />}
			</PrivacyPolicyBlockContainer>
		</PrivacyPolicyContainer>
	);
};
