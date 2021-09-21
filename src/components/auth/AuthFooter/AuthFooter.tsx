import React from 'react';

import {
	FooterContainer,
	FooterLogoBlock,
	LogoImg,
	LogoText,
	FooterNavBlock,
	NavBar,
	NavBarItem,
	NavLink
} from './AuthFooter.style';
import { Images } from '../../../environment';
import { useNavigation, useTranslation } from '../../../hooks';

export function AuthFooter() {
	const { routes } = useNavigation();
	const translate = useTranslation();

	return (
		<FooterContainer>
			<FooterLogoBlock>
				<LogoImg src={Images.authFooterLogo} />
				<LogoText>© 2020 ePolitiker Labs</LogoText>
			</FooterLogoBlock>
			<FooterNavBlock>
				<NavBar>
					<NavBarItem>
						<NavLink to={routes.privacyPolicy}>
							{translate(({ authNav }) => authNav.termsAndConditions)}
						</NavLink>
					</NavBarItem>
					<NavBarItem>
						<NavLink to={routes.root}>
							{translate(({ authNav }) => authNav.helpAndSupport)}
						</NavLink>
					</NavBarItem>
					<NavBarItem>
						<NavLink to={routes.root}>
							{translate(({ authNav }) => authNav.contactSales)}
						</NavLink>
					</NavBarItem>
				</NavBar>
			</FooterNavBlock>
		</FooterContainer>
	);
}
