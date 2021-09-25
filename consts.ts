import { FolderTypes } from '@epolitiker/api';
import { BadgeTypes } from './components/ui';
import { LanguageCode } from './hooks';

export const DEFAULT_ACTIVITY_TIMEOUT = 3000;

export enum AlertType {
	Notification = 'notification',
	Error = 'error'
}

export enum EventType {
	Resize = 'resize',
	Scroll = 'scroll',
	Click = 'mousedown',
	Initialized = 'initialized',
	KeyDown = 'keydown'
}

export enum InputType {
	Text = 'text',
	Textarea = 'textarea',
	Email = 'email',
	Password = 'password',
	Date = 'date',
	Number = 'number'
}

export enum IconType {
	EpGlobe = 'EpGlobe',
	EpMore = 'EPMore',
	EpSearch = 'EpSearch',
	EpPlus = 'EpPlus',
	EpMinus = 'EpMinus',
	EpChevronDown = 'EpChevronDown',
	EpChevronUp = 'EpChevronUp',
	EpChevronRight = 'EpChevronRight',
	EpChevronLeft = 'EpChevronLeft',
	EpCalendar = 'EpCalendar',
	EpEdit = 'EpEdit',
	EpRegComment = 'EpRegComment',
	EpMail = 'EpMail',
	EpTimes = 'EpTimes',
	EpTimesRound = 'EpTimesRound',
	EpAttendance = 'EpAttendance',
	EpMembers = 'EpMembers',
	EpMembersColored = 'EpMembersColored',
	EpAddMember = 'EpAddMember',
	EpCommittees = 'EpCommittees',
	EpDocument = 'EpDocument',
	EpDoc = 'EpDoc',
	EpUploadDocument = 'EpUploadDocument',
	EpDocumentFilled = 'EpDocumentFilled',
	EpMegaphone = 'EpMegaphone',
	EpPolls = 'EpPolls',
	EpSettings = 'EpSettings',
	EpEye = 'EpEye',
	EpEyeSlash = 'EpEyeSlash',
	EpArrowUp = 'EpArrowUp',
	EpArrowDown = 'EpArrowDown',
	EpArrowRight = 'EpArrowRight',
	EpArrowLeft = 'EpArrowLeft',
	EpTrash = 'EpTrash',
	EpCheck = 'EpCheck',
	EpCheckRound = 'EpCheckRound',
	EpInfo = 'EpInfo',
	EpExciamation = 'EpExciamation',
	EpCSVIcon = 'EpCSVIcon',
	EpUploadFile = 'EpUploadFile',
	EpNewDocument = 'EpNewDocument',
	EpPage = 'EpPage',
	EpFolder = 'EpFolder',
	EpFolderDefault = 'EpFolderDefault',
	EpMoveFolder = 'EpMoveFolder',
	EpEvent = 'EpEvent',
	EpPollFilled = 'EpPollFilled',
	EpPreferences = 'EpPreferences',
	EpZoomIn = 'EpZoomIn',
	EpZoomOut = 'EpZoomOut',
	EpHand = 'EpHand',
	EpTextTool = 'EpTextTool',
	EpText = 'EpText',
	EpCornerDown = 'EpCornerDown',
	EpCornerRight = 'EpCornerRight',
	EpClock = 'EpClock',
	EpClockArrow = 'EpClockArrow',
	EpAttachment = 'EpAttachment',
	EpOpen = 'EpOpen',
	EpDevice = 'EpDevice',
	EpBell = 'EpBell',
	EpExternalLink = 'EpExternalLink',
	EpStatus = 'EpStatus',
	EpRelation = 'EpRelation',
	EpSync = 'EpSync',
	EpLock = 'EpLock',
	EpSubItem = 'EpSubItem',
	EpDragHandle = 'EpDragHandle',
	EpLogOut = 'EpLogOut',
	EpAvatarIcon = 'EpAvatarIcon',
	EpDeviceModal = 'EpDeviceModal',
	EpDeviceUpload = 'EpDeviceUpload',
	EpFolderUpload = 'EpFolderUpload',
	EpSecurity = 'EpSecurity',
	EpUploadVector = 'EpUploadVector',
	EpDocumentFile = 'EpDocumentFile',
	EpGoogleDisc = 'EpGoogleDisc',
	EpCloud = 'EpCloud',
	EpDocumentFileWithSlack = 'EpDocumentFileWithSlack',
	EpLocation = 'EpLocation',
	EpCamera = 'EpCamera',
	EpEmptyDoc = 'EpEmptyDoc',
	EpUser = 'EpUser',
	EpEmptyCalendar = 'EpEmptyCalendar',
	EpCommitteeFolder = 'EpCommitteeFolder',
	EpMembersEmpty = 'EpMembersEmpty',
	EpChecked = 'EpChecked',
	EpArrowTableDown = 'EpArrowTableDown',
	EpArrowTableUp = 'EpArrowTableUp',
	EpDashboardSettings = 'EpDashboardSetting',
	EpBookmarks = 'EpBookmarks',
	EpFolderBig = 'EpFolderBig',
	EpDocs = 'EpDocs',
	EpUserGroup = 'EpUserGroup',
	EpCalendarSidebar = 'EpCalendarSidebar',
	EpMembersSidebar = 'EpMembersSidebar',
	EpCommitteesSidebar = 'EpCommitteesSidebar',
	EpDocsSidebar = 'EpDocsSidebar',
	EpSettingsSidebar = 'EpSettingsSidebar',
	EpWorkspaceSidebar = 'EpWorkspaceSidebar',
	EpHello = 'EpHello',
	EpRequests = 'EpRequests',
	EpCircleHello = 'EpCircleHello'
}

export enum StorageKey {
	LanguageCode = 'ePolitiker-language-code',
	Token = 'ePolitiker-auth-token',
	ActiveWorkspace = 'ePolitiker-active-workspace',
	CommitteesPageOrderBy = 'CommitteesPageOrderBy',
	UserRole = 'UserRole',
	MemberPageOrder = 'memberPageOrder'
}

export const committeeVisibilities = [
	{ label: 'Public open', value: 'PUBLIC_OPEN' },
	{ label: 'Public locked', value: 'PUBLIC_LOCKED' },
	{ label: 'Private hidden', value: 'PRIVATE_HIDDEN' }
];

export enum AzureFolderType {
	WORKSPACE = 'WORKSPACE',
	COMMITTEE = 'COMMITTEE',
	MEETING = 'MEETING',
	CUSTOM = 'CUSTOM'
}

export enum DocumentStatusType {
	PUBLISHED = 'PUBLISHED',
	NOT_PUBLISHED = 'NOT_PUBLISHED'
}

// TODO: is there a way to get all values from FolderTypes as array?
export const FolderTypesList: FolderTypes[] = [
	'COMMITTEES',
	'CALENDAR',
	'MEMBERS',
	'CONTACT_INFORMATION',
	'PROTOCOLS',
	'HANDBOOK',
	'FORMS',
	'MANUAL_DOCUMENTS'
];

export const MeetingMemberStatuses = [
	{
		label: 'No response',
		value: 'NO_RESPONSE',
		badgeType: BadgeTypes.Primary
	},
	{
		label: 'Not going',
		value: 'NOT_GOING',
		badgeType: BadgeTypes.Warning
	},
	{
		label: 'Going',
		value: 'GOING',
		badgeType: BadgeTypes.Success
	}
];

export const workspacePartyRolesList = [{ label: 'Deputy', value: 'DEPUTY' }];
export const committeeMemberRolesList = [
	{ label: 'Admin', value: 'ADMIN' },
	{ label: 'Leader', value: 'LEADER' },
	{ label: 'Regular', value: 'REGULAR' }
];

export const permissionsList = [
	{ label: 'Admin', value: 'c-r-u-d' },
	{ label: 'Member', value: 'r' },
	{ label: 'Viewer', value: undefined }
];

export const agendaDurationsList = [
	'No time limit',
	'5 min',
	'10 min',
	'15 min',
	'20 min',
	'25 min',
	'30 min',
	'35 min',
	'40 min',
	'45 min',
	'50 min',
	'55 min',
	'1 hour',
	'1.5 hours',
	'2 hours'
];
export interface TimeZoneItem {
	title: string;
	value: string;
}
export const workspaceTimeZonesList = [
	{ title: '(GMT-11:00) Niue Time ', value: '' },
	{ title: '(GMT-11:00) Samoa Standard Time ', value: '' },
	{ title: '(GMT-10:00) Cook Islands Standard Time', value: '' },
	{ title: '(GMT-10:00) Hawaii-Aleutian Standard Time ', value: '' },
	{ title: '(GMT-10:00) Tahiti Time ', value: '' },
	{ title: '(GMT-09:30) Marquesas Time ', value: '' },
	{ title: '(GMT-09:00) Gambier Time', value: '' },
	{ title: '(GMT-09:00) Hawaii-Aleutian Time (Adak)', value: '' },
	{ title: '(GMT-08:00) Alaska Time - Anchorage', value: '' },
	{ title: '(GMT-08:00) Alaska Time - Juneau', value: '' },
	{ title: '(GMT-08:00) Alaska Time - Metlakatla', value: '' },
	{ title: '(GMT-08:00) Alaska Time - Nome', value: '' },
	{ title: '(GMT-08:00) Alaska Time - Sitka', value: '' },
	{ title: '(GMT-08:00) Alaska Time - Yakutat', value: '' },
	{ title: '(GMT-08:00) Pitcairn Time', value: '' },
	{ title: '(GMT-07:00) Mexican Pacific Standard Time', value: '' },
	{ title: '(GMT-07:00) Mountain Standard Time - Creston', value: '' },
	{ title: '(GMT-07:00) Mountain Standard Time - Dawson', value: '' },
	{ title: '(GMT-07:00) Mountain Standard Time - Dawson Creek', value: '' },
	{ title: '(GMT-07:00) Mountain Standard Time - Fort Nelson', value: '' },
	{ title: '(GMT-07:00) Mountain Standard Time - Phoenix', value: '' },
	{ title: '(GMT-07:00) Mountain Standard Time - Whitehorse', value: '' },
	{ title: '(GMT-07:00) Pacific Time - Los Angeles', value: '' }
];

export enum FileMaxSize {
	Size = 1e9
}

export const languagesList: string[] = Object.keys(LanguageCode);

export enum NewMemberRole {
	ADMIN = 'ADMIN',
	REGULAR = 'REGULAR'
}
