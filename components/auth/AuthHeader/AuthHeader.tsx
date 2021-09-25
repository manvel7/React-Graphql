import React from 'react';

import {
	HeaderContainer,
	HeaderLogoBlock,
	LogoImg,
	HeaderNavBlock,
	NavBar,
	NavBarItem,
	NavLink,
	NavBarItemDivider
} from './AuthHeader.style';
import { Images, Colors } from '../../../environment';
import { useLanguage, LanguageCode, useNavigation, useTranslation } from '../../../hooks';
import { Dropdown, Icon } from '../../ui';
import { IconType } from '../../../consts';

export function AuthHeader() {
	const [language, changeLanguage] = useLanguage();
	const { routes } = useNavigation();
	const translate = useTranslation();

	const languagesList = [
		{ label: 'EN', value: LanguageCode.EN },
		{ label: 'NO', value: LanguageCode.NB },
		{ label: 'SE', value: LanguageCode.SE }
	];

	return (
		<HeaderContainer>
			<HeaderLogoBlock>
				<LogoImg src={Images.authLogo} />
			</HeaderLogoBlock>
			<HeaderNavBlock>
				<NavBar>
					<NavBarItem>
						<NavLink to="/">
							{translate(({ authNav }) => authNav.productFeatures)}
						</NavLink>
					</NavBarItem>
					<NavBarItem>
						<NavLink to="/">{translate(({ authNav }) => authNav.tutorials)}</NavLink>
					</NavBarItem>

					<NavBarItem>
						<NavBarItemDivider />
					</NavBarItem>

					<NavBarItem>
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
					</NavBarItem>

					<NavBarItem>
						<NavBarItemDivider />
					</NavBarItem>

					<NavBarItem>
						<NavLink to={routes.signup}>
							{translate(({ authNav }) => authNav.createYourOwnWorkspace)}
						</NavLink>
					</NavBarItem>
					<NavBarItem>
						<NavLink to={routes.login}>
							{translate(({ authNav }) => authNav.logIn)}
						</NavLink>
					</NavBarItem>
				</NavBar>
			</HeaderNavBlock>
		</HeaderContainer>
	);
}
