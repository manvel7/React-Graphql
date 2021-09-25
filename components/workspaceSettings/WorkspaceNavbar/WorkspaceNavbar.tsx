import React from 'react';

import { useNavigation, useTranslation } from '../../../hooks';

import { WorkspaceNavbarContainer, NavBlock, NavTitle, NavLink } from './WorkspaceNavbar.style';

export function WorkspaceNavbar() {
	const { routes } = useNavigation();
	const translate = useTranslation();

	return (
		<WorkspaceNavbarContainer>
			<NavBlock>
				<NavTitle>{translate(({ tabs }) => tabs.general)}</NavTitle>
				<NavLink exact to={routes.workspaceSettings}>
					{translate(({ titles }) => titles.workspaceOverview)}
				</NavLink>
				<NavLink to={routes.workspaceNotifications}>
					{translate(({ titles }) => titles.notifications)}
				</NavLink>
			</NavBlock>

			<NavBlock>
				<NavTitle>{translate(({ tabs }) => tabs.security)}</NavTitle>
				<NavLink to={routes.workspaceHighSecurity}>
					{translate(({ titles }) => titles.highSecurity)}
				</NavLink>
			</NavBlock>
			<NavBlock>
				<NavTitle>{translate(({ tabs }) => tabs.membersAccess)}</NavTitle>
				<NavLink to={routes.rolesPermissions}>
					{translate(({ titles }) => titles.rolesPermissions)}
				</NavLink>
			</NavBlock>
		</WorkspaceNavbarContainer>
	);
}
