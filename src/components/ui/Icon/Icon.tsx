import React from 'react';

import { Wrapper } from './Icon.style';
import { Icons } from '../../../environment';

interface Props {
	name: string;
	size?: number;
	color?: string;
	className?: string;
}

export function Icon({ name, size = 24, className, color }: Props) {
	let IconView: any;

	switch (name) {
		case 'EpPlus':
			IconView = Icons.EpPlus;
			break;
		case 'EpMinus':
			IconView = Icons.EpMinus;
			break;
		case 'EpSearch':
			IconView = Icons.EpSearch;
			break;
		case 'EpGlobe':
			IconView = Icons.EpGlobe;
			break;
		case 'EpMore':
			IconView = Icons.EpMore;
			break;
		case 'EpChevronDown':
			IconView = Icons.EpChevronDown;
			break;
		case 'EpChevronUp':
			IconView = Icons.EpChevronUp;
			break;
		case 'EpChevronRight':
			IconView = Icons.EpChevronRight;
			break;
		case 'EpChevronLeft':
			IconView = Icons.EpChevronLeft;
			break;
		case 'EpCalendar':
			IconView = Icons.EpCalendar;
			break;
		case 'EpEdit':
			IconView = Icons.EpEdit;
			break;
		case 'EpRegComment':
			IconView = Icons.EpRegComment;
			break;
		case 'EpMail':
			IconView = Icons.EpMail;
			break;
		case 'EpTimes':
			IconView = Icons.EpTimes;
			break;
		case 'EpTimesRound':
			IconView = Icons.EpTimesRound;
			break;
		case 'EpAttendance':
			IconView = Icons.EpAttendance;
			break;
		case 'EpMembers':
			IconView = Icons.EpMembers;
			break;
		case 'EpMembersColored':
			IconView = Icons.EpMembersColored;
			break;
		case 'EpAddMember':
			IconView = Icons.EpAddMember;
			break;
		case 'EpCommittees':
			IconView = Icons.EpCommittees;
			break;
		case 'EpDocument':
			IconView = Icons.EpDocument;
			break;
		case 'EpDoc':
			IconView = Icons.EpDoc;
			break;
		case 'EpUploadDocument':
			IconView = Icons.EpUploadDocument;
			break;
		case 'EpDocumentFilled':
			IconView = Icons.EpDocumentFilled;
			break;
		case 'EpMegaphone':
			IconView = Icons.EpMegaphone;
			break;
		case 'EpPolls':
			IconView = Icons.EpPolls;
			break;
		case 'EpSettings':
			IconView = Icons.EpSettings;
			break;
		case 'EpEye':
			IconView = Icons.EpEye;
			break;
		case 'EpEyeSlash':
			IconView = Icons.EpEyeSlash;
			break;
		case 'EpArrowUp':
			IconView = Icons.EpArrowUp;
			break;
		case 'EpArrowDown':
			IconView = Icons.EpArrowDown;
			break;
		case 'EpArrowRight':
			IconView = Icons.EpArrowRight;
			break;
		case 'EpArrowLeft':
			IconView = Icons.EpArrowLeft;
			break;
		case 'EpTrash':
			IconView = Icons.EpTrash;
			break;
		case 'EpCheck':
			IconView = Icons.EpCheck;
			break;
		case 'EpCheckRound':
			IconView = Icons.EpCheckRound;
			break;
		case 'EpInfo':
			IconView = Icons.EpInfo;
			break;
		case 'EpExciamation':
			IconView = Icons.EpExciamation;
			break;
		case 'EpCSVIcon':
			IconView = Icons.EpCSVIcon;
			break;
		case 'EpUploadFile':
			IconView = Icons.EpUploadFile;
			break;
		case 'EpNewDocument':
			IconView = Icons.EpNewDocument;
			break;
		case 'EpPage':
			IconView = Icons.EpPage;
			break;
		case 'EpFolder':
			IconView = Icons.EpFolder;
			break;
		case 'EpFolderDefault':
			IconView = Icons.EpFolderDefault;
			break;
		case 'EpMoveFolder':
			IconView = Icons.EpMoveFolder;
			break;
		case 'EpEvent':
			IconView = Icons.EpEvent;
			break;
		case 'EpPollFilled':
			IconView = Icons.EpPollFilled;
			break;
		case 'EpPreferences':
			IconView = Icons.EpPreferences;
			break;
		case 'EpZoomIn':
			IconView = Icons.EpZoomIn;
			break;
		case 'EpZoomOut':
			IconView = Icons.EpZoomOut;
			break;
		case 'EpHand':
			IconView = Icons.EpHand;
			break;
		case 'EpTextTool':
			IconView = Icons.EpTextTool;
			break;
		case 'EpText':
			IconView = Icons.EpText;
			break;
		case 'EpCornerDown':
			IconView = Icons.EpCornerDown;
			break;
		case 'EpCornerRight':
			IconView = Icons.EpCornerRight;
			break;
		case 'EpClock':
			IconView = Icons.EpClock;
			break;
		case 'EpClockArrow':
			IconView = Icons.EpClockArrow;
			break;
		case 'EpAttachment':
			IconView = Icons.EpAttachment;
			break;
		case 'EpOpen':
			IconView = Icons.EpOpen;
			break;
		case 'EpDevice':
			IconView = Icons.EpDevice;
			break;
		case 'EpBell':
			IconView = Icons.EpBell;
			break;
		case 'EpExternalLink':
			IconView = Icons.EpExternalLink;
			break;
		case 'EpStatus':
			IconView = Icons.EpStatus;
			break;
		case 'EpRelation':
			IconView = Icons.EpRelation;
			break;
		case 'EpSync':
			IconView = Icons.EpSync;
			break;
		case 'EpLock':
			IconView = Icons.EpLock;
			break;
		case 'EpSubItem':
			IconView = Icons.EpSubItem;
			break;
		case 'EpDragHandle':
			IconView = Icons.EpDragHandle;
			break;
		case 'EpLogOut':
			IconView = Icons.EpLogOut;
			break;
		case 'EpAvatarIcon':
			IconView = Icons.EpAvatarIcon;
			break;
		case 'EpDeviceModal':
			IconView = Icons.EpDeviceModal;
			break;
		case 'EpDeviceUpload':
			IconView = Icons.EpDeviceUpload;
			break;
		case 'EpFolderUpload':
			IconView = Icons.EpFolderUpload;
			break;
		case 'EpSecurity':
			IconView = Icons.EpSecurity;
			break;
		case 'EpUploadVector':
			IconView = Icons.EpUploadVector;
			break;
		case 'EpDocumentFile':
			IconView = Icons.EpDocumentFile;
			break;
		case 'EpGoogleDisc':
			IconView = Icons.EpGoogleDisc;
			break;
		case 'EpCloud':
			IconView = Icons.EpCloud;
			break;
		case 'EpDocumentFileWithSlack':
			IconView = Icons.EpDocumentFileWithSlack;
			break;
		case 'EpLocation':
			IconView = Icons.EpLocation;
			break;
		case 'EpCamera':
			IconView = Icons.EpCamera;
			break;
		case 'EpEmptyDoc':
			IconView = Icons.EpEmptyDoc;
			break;
		case 'EpUser':
			IconView = Icons.EpUser;
			break;
		case 'EpEmptyCalendar':
			IconView = Icons.EpEmptyCalendar;
			break;
		case 'EpCommitteeFolder':
			IconView = Icons.EpCommitteeFolder;
			break;
		case 'EpMembersEmpty':
			IconView = Icons.EpMembersEmpty;
			break;
		case 'EpChecked':
			IconView = Icons.EpChecked;
			break;
		case 'EpArrowTableDown':
			IconView = Icons.EpArrowTableDown;
			break;
		case 'EpArrowTableUp':
			IconView = Icons.EpArrowTableUp;
			break;
		case 'EpDashboardSettings':
			IconView = Icons.EpDashboardSettings;
			break;
		case 'EpBookmarks':
			IconView = Icons.EpBookmarks;
			break;
		case 'EpFolderBig':
			IconView = Icons.EpFolderBig;
			break;
		case 'EpDocs':
			IconView = Icons.EpDocs;
			break;
		case 'EpUserGroup':
			IconView = Icons.EpUserGroup;
			break;
		case 'EpCalendarSidebar':
			IconView = Icons.EpCalendarSidebar;
			break;
		case 'EpMembersSidebar':
			IconView = Icons.EpMembersSidebar;
			break;
		case 'EpCommitteesSidebar':
			IconView = Icons.EpCommitteesSidebar;
			break;
		case 'EpDocsSidebar':
			IconView = Icons.EpDocsSidebar;
			break;
		case 'EpSettingsSidebar':
			IconView = Icons.EpSettingsSidebar;
			break;
		case 'EpWorkspaceSidebar':
			IconView = Icons.EpWorkspaceSidebar;
			break;
		case 'EpHello':
			IconView = Icons.EpHello;
			break;
		case 'EpRequests':
			IconView = Icons.EpRequests;
			break;
		case 'EpCircleHello':
			IconView = Icons.EpCircleHello;
			break;
		default:
			IconView = Icons.EpMore;
	}

	return (
		<Wrapper className={className} size={size}>
			<IconView color={color} />
		</Wrapper>
	);
}
