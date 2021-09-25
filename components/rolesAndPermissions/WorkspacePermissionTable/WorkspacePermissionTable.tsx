import React, { useState } from 'react';

import {
	WorkspacePermissionsTableContainer,
	WorkspacePermissionsHeader,
	WorkspacePermissionsTitle,
	TableContainer,
	TableBlock,
	TheadBlock,
	Tr,
	Td,
	FooterContainer,
	FooterEditContent,
	CancelButton,
	EditMode
} from './WorkspacePermissionTable.style';
import { useTranslation } from '../../../hooks';
import { IconType } from '../../../consts';
import { Icon, GhostButton, PrimaryButton, Checkbox } from '../../ui';

export const WorkspacePermissionsTable = () => {
	const translate = useTranslation();
	const [showAll, setShowAll] = useState<boolean>(false);
	const [isEditMode, setEditMode] = useState<boolean>(false);

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

	const IconWorkspaceWithEmpty = [
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

	const handleEditMode = () => {
		setEditMode(true);
	};

	const handleCancelEditMode = () => {
		setEditMode(false);
	};

	return (
		<WorkspacePermissionsTableContainer>
			<WorkspacePermissionsHeader>
				<WorkspacePermissionsTitle>
					{translate(({ titles }) => titles.workspace)}
				</WorkspacePermissionsTitle>
				{!isEditMode ? (
					<EditMode>
						<GhostButton onClick={handleEditMode} icon={IconType.EpEdit} />
					</EditMode>
				) : null}
			</WorkspacePermissionsHeader>
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
									{translate(({ titles }) => titles.viewWorkspaceInfo)}
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
									{translate(({ titles }) => titles.viewWorkspaceInfo)}
								</Td>
								{IconWorkspaceWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateGeneralSettings)}
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
									{translate(({ titles }) => titles.updateGeneralSettings)}
								</Td>
								{IconWorkspaceWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.updateAccessSettings)}
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
									{translate(({ titles }) => titles.updateAccessSettings)}
								</Td>
								{IconWorkspaceWithEmpty.map((item, index) => (
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
								{IconWorkspaceWithEmpty.map((item, index) => (
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
								{IconWorkspaceWithEmpty.map((item, index) => (
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
								{IconWorkspaceWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.viewAllMembers)}
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
									{translate(({ titles }) => titles.viewAllMembers)}
								</Td>
								{IconWorkspaceWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.addNewMembers)}
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
									{translate(({ titles }) => titles.addNewMembers)}
								</Td>
								{IconWorkspaceWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.addNewMembers)}
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
									{translate(({ titles }) => titles.deleteMembers)}
								</Td>
								{IconWorkspaceWithEmpty.map((item, index) => (
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
		</WorkspacePermissionsTableContainer>
	);
};
