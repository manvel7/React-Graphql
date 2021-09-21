import React, { createContext, useEffect, useState } from 'react';
import { Workspace } from '@epolitiker/api';

import { Route } from '../../components/ui/Route';

import {
	WorkspaceOverview,
	WorkspaceNotifications,
	WorkspaceNavbar,
	WorkspaceHighSecurity,
	RolesPermissions
} from '../../components/workspaceSettings';
import {
	IBreadcrumb,
	useBreadcrumbs,
	useEffectOnce,
	useLocalStorage,
	useNavigation,
	useTranslation,
	useWorkspaceFullDetailsLazyQuery
} from '../../hooks';
import { Breadcrumbs, Dropdown, WorkspaceSettingsPageLoader } from '../../components/ui';

import {
	PageWrapper,
	PageTopBar,
	PageTitleBlock,
	PageTitle,
	PageContainer,
	PageNavContent,
	PageContentWrapper,
	PageMainContent
} from './WorkspaceSettingsPage.style';
import { StorageKey } from '../../consts';

enum WorkspaceSettingsRoutes {
	Overview = '/workspace-settings',
	Notifications = '/workspace-settings/notifications',
	HighSecurity = '/workspace-settings/high-security',
	RolesPermissions = '/workspace-settings/roles-permissions'
}

interface IWorkspaceContext {
	workspace: Workspace | null;
}

export const WorkspaceContext = createContext<IWorkspaceContext>({
	workspace: null
});

export function WorkspaceSettingsPage() {
	const { routes } = useNavigation();
	const translate = useTranslation();
	const { setBreadcrumbs } = useBreadcrumbs();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [workspace, setWorkspace] = useState<Workspace | null>(null);

	const [
		workspaceDetails,
		{ data: workspaceDetailsData, loading: workspaceDetailsLoading }
	] = useWorkspaceFullDetailsLazyQuery();

	useEffectOnce(() => {
		handleGetWorkspaceDetails();

		const breadcrumbsData: IBreadcrumb[] = [
			{
				label: activeWorkspace.name,
				to: routes.workspaceSettings,
				active: true
			}
		];
		setBreadcrumbs(breadcrumbsData);
	});

	function handleGetWorkspaceDetails() {
		workspaceDetails({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: activeWorkspace.id }
				}
			}
		});
	}

	useEffect(() => {
		if (workspaceDetailsData) {
			setWorkspace(workspaceDetailsData.workspaceDetails);
		}
	}, [workspaceDetailsData]);

	return (
		<PageWrapper>
			<PageTopBar>
				<Breadcrumbs />
				<Dropdown>
					<Dropdown.Item onClick={() => {}}>Action</Dropdown.Item>
				</Dropdown>
			</PageTopBar>

			<PageTitleBlock>
				<PageTitle>{translate(({ sideMenuLinks }) => sideMenuLinks.settings)}</PageTitle>
			</PageTitleBlock>

			<PageContainer>
				<PageNavContent>
					<WorkspaceNavbar />
				</PageNavContent>
				{!workspaceDetailsLoading ? (
					<WorkspaceContext.Provider value={{ workspace }}>
						<PageContentWrapper>
							<PageMainContent>
								<Route
									exact
									guarded
									path={WorkspaceSettingsRoutes.Overview}
									component={WorkspaceOverview}
								/>
								<Route
									exact
									guarded
									path={WorkspaceSettingsRoutes.Notifications}
									component={WorkspaceNotifications}
								/>
								<Route
									exact
									guarded
									path={WorkspaceSettingsRoutes.RolesPermissions}
									component={RolesPermissions}
								/>
								<Route
									exact
									guarded
									path={WorkspaceSettingsRoutes.HighSecurity}
									component={WorkspaceHighSecurity}
								/>
							</PageMainContent>
						</PageContentWrapper>
					</WorkspaceContext.Provider>
				) : (
					<WorkspaceSettingsPageLoader />
				)}
			</PageContainer>
		</PageWrapper>
	);
}
