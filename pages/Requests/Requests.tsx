import React from 'react';

import {
	RequestPageContainer,
	RequestsHeaderContainer,
	RequestsHeaderTitle,
	NavBarItemRequestPage,
	RequestHeaderSubTitle,
	RequestTabContent
} from './Requests.style';
import { LanguageCode, useLanguage, useNavigation, useTranslation } from '../../hooks';
import { Route } from '../../components/ui/Route';
import { Dropdown, Icon } from '../../components/ui';
import { IconType } from '../../consts';
import { Colors } from '../../environment';
import { NavLink, NavTab, NavTabsBlock } from '../CommitteeDetailPage/CommitteeDetailPage.style';
import { Nonattendance, Replies, SubmittedDocument } from '../../components/RequestTabs/';

enum RequestRoutes {
	Replies = '/requests',
	SubmittedDocument = '/request/submitted-document',
	Nonattendance = '/request/non-attendance'
}

export const Requests = () => {
	const translate = useTranslation();
	const [language, changeLanguage] = useLanguage();
	const { routes } = useNavigation();
	const languagesList = [
		{ label: 'EN', value: LanguageCode.EN },
		{ label: 'NO', value: LanguageCode.NB },
		{ label: 'SE', value: LanguageCode.SE }
	];

	//tabs
	const requestTabData = [
		{
			title: translate(({ tabs }) => tabs.replies),
			path: routes.requests
		},
		{
			title: translate(({ tabs }) => tabs.submittedDocument),
			path: routes.requestSubmittedDocument
		},
		{
			title: translate(({ tabs }) => tabs.nonattendance),
			path: routes.requestNonattendance
		}
	];

	return (
		<RequestPageContainer>
			<RequestsHeaderContainer>
				<RequestsHeaderTitle>
					{translate(({ titles }) => titles.Requests)}
				</RequestsHeaderTitle>
				<NavBarItemRequestPage>
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
				</NavBarItemRequestPage>
			</RequestsHeaderContainer>
			<RequestHeaderSubTitle>
				{translate(({ titles }) => titles.AllRequests)}
			</RequestHeaderSubTitle>
			<NavTabsBlock>
				{requestTabData.map((tab, index) => {
					return (
						<NavTab key={`committee-tab-${index}`}>
							<NavLink exact to={tab.path}>
								{tab.title}
							</NavLink>
						</NavTab>
					);
				})}
			</NavTabsBlock>
			<RequestTabContent>
				<Route exact guarded path={RequestRoutes.Replies} component={Replies} />
				<Route
					exact
					guarded
					path={RequestRoutes.SubmittedDocument}
					component={SubmittedDocument}
				/>
				<Route exact guarded path={RequestRoutes.Nonattendance} component={Nonattendance} />
			</RequestTabContent>
		</RequestPageContainer>
	);
};
