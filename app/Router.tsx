import React, { Suspense, lazy } from 'react';
import { createBrowserHistory } from 'history';
import { Router as ReactRouter, Switch, Redirect } from 'react-router-dom';

import { Route } from '../components/ui/Route';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const CreateProfilePage = lazy(() => import('../pages/CreateProfilePage'));
const WorkspacesPage = lazy(() => import('../pages/SuperAdmin/WorkspacesPage'));
const DefaultCatalogPage = lazy(() => import('../pages/SuperAdmin/DefaultCatalogPage'));
const DefaultPartiesPage = lazy(() => import('../pages/SuperAdmin/DefaultPartiesPage'));

import {
	MembersPage,
	CommitteesPage,
	CommitteeDetailPage,
	CalendarPage,
	CreateOrEditMeetingPage,
	UserProfilePage,
	FolderPage,
	WorkspaceSettingsPage,
	DocumentsPage,
	CommitteesSettingsPage,
	MeetingPage,
	DashboardPage,
	PrivacyPolicy,
	CookiesPageDashboard,
	Requests
} from '../pages';
import { DefaultLoader } from '../components/ui';
import { AdminLayout, AuthLayout, SuperAdminLayout } from '../layouts';
import { AuthUserProvider } from './AuthUserProvider';
import { useIsAdmin } from '../hooks';

const history = createBrowserHistory();

export enum Routes {
	Root = '/',
	Login = '/login',
	SignUp = '/sign-up',
	Workspaces = '/workspaces',
	Requests = '/requests',
	RequestsSection = '/requests/:section',
	DefaultCatalog = '/default-catalog',
	DefaultParties = '/default-parties',
	CreateProfile = '/create-profile/:token',
	Members = '/members',
	Cookies = '/cookie',
	Committees = '/committees',
	CommitteeSettings = '/committee-settings/:id',
	CommitteeSettingsSection = '/committee-settings/:id/:section',
	CommitteeDetail = '/committees/:id',
	CommitteeDetailSection = '/committees/:id/:section',
	Calendar = '/calendar',
	Dashboard = '/dashboard',
	CreateOrEditMeeting = '/create-or-edit-meeting',
	UpdateMeetingDetails = '/create-or-edit-meeting/:committeeId/:meetingId',
	UserProfile = '/members/:id',
	Meeting = '/meetings/:id',
	MeetingSection = 'meetings/:id/section',
	Folder = '/folders/:id',
	WorkspaceSettings = '/workspace-settings',
	WorkspaceSettingsSection = '/workspace-settings/:section',
	Documents = '/documents',
	PrivacyPolicy = '/privacy-policy',
	NotFoundPage = '*'
}

export function Router() {
	const isAdmin = useIsAdmin();

	return (
		<ReactRouter history={history}>
			<Suspense fallback={<DefaultLoader />}>
				<Switch>
					<Route
						exact
						path={Routes.Login}
						component={() => (
							<AuthLayout>
								<LoginPage />
							</AuthLayout>
						)}
					/>
					<Route
						exact
						path={Routes.SignUp}
						component={() => (
							<AuthLayout>
								<SignUpPage />
							</AuthLayout>
						)}
					/>
					<Route
						exact
						path={Routes.PrivacyPolicy}
						component={() => (
							<AuthLayout>
								<PrivacyPolicy />
							</AuthLayout>
						)}
					/>

					<Route exact path={Routes.CreateProfile} component={CreateProfilePage} />
					<AuthUserProvider>
						<Route
							exact
							guarded
							path={Routes.Workspaces}
							component={() => (
								<SuperAdminLayout>
									<WorkspacesPage />
								</SuperAdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.DefaultCatalog}
							component={() => (
								<SuperAdminLayout>
									<DefaultCatalogPage />
								</SuperAdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.DefaultParties}
							component={() => (
								<SuperAdminLayout>
									<DefaultPartiesPage />
								</SuperAdminLayout>
							)}
						/>

						<Route
							exact
							guarded
							path={Routes.Committees}
							component={() => (
								<AdminLayout withOverview>
									<CommitteesPage />
								</AdminLayout>
							)}
						/>

						<Route
							exact
							guarded
							path={Routes.Requests}
							component={() => (
								<AdminLayout>
									<Requests />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.RequestsSection}
							component={() => (
								<AdminLayout>
									<Requests />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.Dashboard}
							component={() => (
								<AdminLayout>
									<DashboardPage />
								</AdminLayout>
							)}
						/>

						<Route
							exact
							guarded
							path={Routes.Cookies}
							component={() => (
								<AdminLayout>
									<CookiesPageDashboard />
								</AdminLayout>
							)}
						/>

						<Route
							exact
							guarded
							path={Routes.Members}
							component={() => (
								<AdminLayout>
									<MembersPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.CommitteeDetail}
							component={() => (
								<AdminLayout withOverview>
									<CommitteeDetailPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.CommitteeDetailSection}
							component={() => (
								<AdminLayout withOverview>
									<CommitteeDetailPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.CommitteeSettings}
							component={() => (
								<AdminLayout>
									<CommitteesSettingsPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.CommitteeSettingsSection}
							component={() => (
								<AdminLayout>
									<CommitteesSettingsPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.Calendar}
							component={() => (
								<AdminLayout withOverview>
									<CalendarPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.CreateOrEditMeeting}
							component={() => (
								<AdminLayout>
									<CreateOrEditMeetingPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.UpdateMeetingDetails}
							component={() => (
								<AdminLayout>
									<CreateOrEditMeetingPage />
								</AdminLayout>
							)}
						/>
						<Route
							// exact
							guarded
							path={Routes.Meeting}
							component={() => (
								<AdminLayout>
									<MeetingPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.MeetingSection}
							component={() => (
								<AdminLayout>
									<MeetingPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.UserProfile}
							component={() => (
								<AdminLayout>
									<UserProfilePage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.Folder}
							component={() => (
								<AdminLayout>
									<FolderPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.WorkspaceSettings}
							component={() => (
								<AdminLayout>
									<WorkspaceSettingsPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.WorkspaceSettingsSection}
							component={() => (
								<AdminLayout>
									<WorkspaceSettingsPage />
								</AdminLayout>
							)}
						/>
						<Route
							exact
							guarded
							path={Routes.Documents}
							component={() => (
								<AdminLayout>
									<DocumentsPage />
								</AdminLayout>
							)}
						/>
						{isAdmin ? (
							<Route
								exact
								guarded
								path={Routes.Root}
								component={() => <Redirect to={Routes.Dashboard} />}
							/>
						) : (
							<Route
								exact
								guarded
								path={Routes.Root}
								component={() => (
									<SuperAdminLayout>
										<WorkspacesPage />
									</SuperAdminLayout>
								)}
							/>
						)}
					</AuthUserProvider>
				</Switch>
			</Suspense>
		</ReactRouter>
	);
}
