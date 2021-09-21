import React from 'react';

import {
	SidebarContainer,
	NavigationContainer,
	NavBar,
	NavItem,
	NavLink,
	LinkIcon,
	LinkTitle,
	LogoutButton
} from './SuperAdminSidebarMenu.style';

import { IconType, StorageKey } from '../../consts';
import { useNavigation, useTranslation, useLocalStorage } from '../../hooks';
import { Icon } from '../ui';

export function SuperAdminSidebarMenu() {
	const translate = useTranslation();
	const { routes, navigate } = useNavigation();
	const [, , removeActiveWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [, , removeAuthToken] = useLocalStorage(StorageKey.Token);

	const navigationData = [
		{
			title: 'Workspaces',
			icon: IconType.EpCommittees,
			path: routes.workspaces,
			withMarginBottom: false
		},
		{
			title: 'Default Catalog',
			icon: IconType.EpDocument,
			path: routes.defaultCatalog,
			withMarginBottom: false
		},
		{
			title: 'Default Parties',
			icon: IconType.EpCommittees,
			path: routes.defaultParties,
			withMarginBottom: true
		}
	];

	function logOut() {
		removeAuthToken();
		removeActiveWorkspace();
		navigate(routes.login);
	}

	return (
		<SidebarContainer>
			<NavigationContainer>
				<NavBar>
					{navigationData.map((item, index) => {
						return (
							<NavItem
								key={`nav-item-${index}`}
								withMarginBottom={item.withMarginBottom}
							>
								<NavLink to={item.path}>
									<LinkIcon>
										<Icon name={item.icon} size={16} />
									</LinkIcon>
									<LinkTitle>{item.title}</LinkTitle>
								</NavLink>
							</NavItem>
						);
					})}
					<NavItem>
						<LogoutButton
							title={translate(({ buttons }) => buttons.logout)}
							onClick={logOut}
						/>
					</NavItem>
				</NavBar>
			</NavigationContainer>
		</SidebarContainer>
	);
}
