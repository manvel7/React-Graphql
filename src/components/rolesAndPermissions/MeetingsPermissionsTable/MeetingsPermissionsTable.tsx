import React, { useState } from 'react';

import {
	MeetingsPermissionsTableContainer,
	MeetingsPermissionsHeader,
	MeetingsPermissionsTitle,
	TableContainer,
	TableBlock,
	TheadBlock,
	Tr,
	Td,
	FooterContainer,
	FooterEditContent,
	CancelButton,
	EditMode
} from './MeetingsPermissionsTable.style';
import { useTranslation } from '../../../hooks';
import { IconType } from '../../../consts';
import { Icon, GhostButton, PrimaryButton, Checkbox } from '../../ui';

export const MeetingsPermissionsTable = () => {
	const translate = useTranslation();
	const [showAll, setShowAll] = useState<boolean>(false);
	const [isEditMode, setEditMode] = useState<boolean>(false);

	const handleEditMode = () => {
		setEditMode(true);
	};

	const handleCancelEditMode = () => {
		setEditMode(false);
	};

	const allPermissionsTd = [
		{
			title: ''
		},
		{
			title: translate(({ titles }) => titles.creator)
		},
		{
			title: translate(({ titles }) => titles.admin)
		},
		{
			title: translate(({ titles }) => titles.committeeMember)
		},
		{
			title: translate(({ titles }) => titles.deputy)
		},
		{
			title: translate(({ titles }) => titles.guest)
		}
	];

	const IconMeetingsWithEmpty = [
		{
			icon: IconType.EpChecked
		},
		{
			icon: IconType.EpChecked
		},
		{
			icon: IconType.EpChecked
		},
		{
			icon: IconType.EpMinus
		},
		{
			icon: IconType.EpMinus
		}
	];

	const handleShowAllPermissions = () => {
		setShowAll(true);
	};

	const handleClosePermissions = () => {
		setShowAll(false);
	};

	return (
		<MeetingsPermissionsTableContainer>
			<MeetingsPermissionsHeader>
				<MeetingsPermissionsTitle>
					{translate(({ titles }) => titles.meetings)}
				</MeetingsPermissionsTitle>
				{!isEditMode ? (
					<EditMode>
						<GhostButton onClick={handleEditMode} icon={IconType.EpEdit} />
					</EditMode>
				) : null}
			</MeetingsPermissionsHeader>
			<TableContainer showAll={showAll}>
				<TableBlock>
					<TheadBlock>
						<Tr>
							{allPermissionsTd.map((item, index) => (
								<Td key={`table-action-${index}`}>{item.title}</Td>
							))}
						</Tr>

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAll)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAll)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateAll)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateAll)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateOwn)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateOwn)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.accessSettingsForAll)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part

							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.accessSettingsForAll)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.accessSettingsForOwn)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part

							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.accessSettingsForOwn)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.createNew)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.createNew)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteAll)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteAll)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteOwn)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteOwn)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAgenda)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAgenda)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAttachedDocument)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAttachedDocument)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateAgenda)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateAgenda)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.submitToAgenda)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.submitToAgenda)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAttendies)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAttendies)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.replayToMatter)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.replayToMatter)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.manageInvitations)}
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={true} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
								<Td>
									<Checkbox checked={false} onChange={() => {}} />
								</Td>
							</Tr>
						) : (
							//Edit Part
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.manageInvitations)}
								</Td>
								{IconMeetingsWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
					</TheadBlock>
				</TableBlock>
			</TableContainer>
			<FooterContainer>
				{!showAll ? (
					<GhostButton
						onClick={handleShowAllPermissions}
						rightIcon={IconType.EpArrowTableDown}
						title={translate(({ titles }) => titles.all)}
					/>
				) : (
					<GhostButton
						onClick={handleClosePermissions}
						rightIcon={IconType.EpArrowTableUp}
						title={translate(({ titles }) => titles.showLess)}
					/>
				)}
				{isEditMode ? (
					<FooterEditContent>
						<PrimaryButton
							onClick={() => {}}
							leftIcon={IconType.EpCheck}
							title={translate(({ buttons }) => buttons.saveChanges)}
						/>
						<CancelButton>
							<GhostButton
								onClick={handleCancelEditMode}
								title={translate(({ buttons }) => buttons.cancel)}
							/>
						</CancelButton>
					</FooterEditContent>
				) : null}
			</FooterContainer>
		</MeetingsPermissionsTableContainer>
	);
};
