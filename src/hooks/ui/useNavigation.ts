import { useHistory } from 'react-router-dom';

type paramsIdType = string | undefined;

const routes = {
	root: '/',
	login: '/login',
	signup: '/sign-up',
	privacyPolicy: '/privacy-policy',
	workspaces: '/workspaces',
	requests: '/requests',
	defaultCatalog: '/default-catalog',
	defaultParties: '/default-parties',
	members: '/members',
	committees: '/committees',
	requestSubmittedDocument: '/requests/submitted-document',
	requestNonattendance: '/requests/non-attendance',
	committeeOverview: (id: paramsIdType) => `/committees/${id}`,
	committeeMembers: (id: paramsIdType) => `/committees/${id}/members`,
	committeeCalendar: (id: paramsIdType) => `/committees/${id}/calendar`,
	committeeDocuments: (id: paramsIdType) => `/committees/${id}/documents`,
	committeePolls: (id: paramsIdType) => `/committees/${id}/polls`,
	committeeInformation: (id: paramsIdType) => `/committees/${id}/information`,
	committeeSettingsGeneral: (id: paramsIdType) => `/committee-settings/${id}`,
	committeeSettingsVisibilityAndAccess: (id: paramsIdType) =>
		`/committee-settings/${id}/visibility-and-access`,
	committeeSettingsInvitations: (id: paramsIdType) => `/committee-settings/${id}/invitations`,
	committeeSettingsStructureAndView: (id: paramsIdType) =>
		`/committee-settings/${id}/structure-and-view`,
	meetingInfo: (id: paramsIdType) => `/meetings/${id}`,
	participants: (id: paramsIdType) => `/meetings/${id}/participants`,
	related: (id: paramsIdType) => `/meetings/${id}/related-items`,
	calendar: `/calendar`,
	createOrEditMeeting: '/create-or-edit-meeting',
	updateMeetingDetils: (committeeId: paramsIdType, meetingId: paramsIdType) =>
		`create-or-edit-meeting/${committeeId}/${meetingId}`,
	userProfile: (id: string) => `/members/${id}`,
	folders: '/folders',
	folder: (id: string) => `/folders/${id}`,
	dashboard: '/dashboard',
	workspaceSettings: '/workspace-settings',
	workspaceNotifications: '/workspace-settings/notifications',
	workspaceHighSecurity: '/workspace-settings/high-security',
	rolesPermissions: '/workspace-settings/roles-permissions',
	cookies: '/cookie',
	documents: '/documents'
};

export function useNavigation() {
	const history = useHistory();

	function navigate(route: string) {
		history.push(route);
	}

	function replace(route: string) {
		history.replace(route);
	}

	function back() {
		history.goBack();
	}

	return {
		routes,
		history,
		navigate,
		replace,
		back
	};
}
