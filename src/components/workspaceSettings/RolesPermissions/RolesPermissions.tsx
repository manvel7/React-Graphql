import React, { useState } from 'react';

import {
	RolesPermissionsContainer,
	RolesPermissionsHeader,
	PageTitle,
	Dropdown,
	HeaderAction,
	RolesPermissionsTableContainer
} from './RolesPermissions.style';
import { useTranslation } from '../../../hooks';
import { ButtonSize, DefaultButton, GhostButton, Input, Modal, ModalSizes } from '../../ui';
import { IconType } from '../../../consts';
import {
	WorkspacePermissionsTable,
	CommitteePermissionsTable,
	DocumentsPermissionsTable,
	MeetingsPermissionsTable,
	UserProfilePermissionsTable
} from '../../rolesAndPermissions';
import {
	FixedHeightModal,
	PrimaryButton,
	RenameFolderModalConent
} from '../../../pages/FolderPage/FolderPage.style';

export const RolesPermissions = () => {
	const translate = useTranslation();
	const [showRenameModal, setShowRenameModal] = useState<boolean>(false);

	const dropDownRolesAndPermission = [
		{
			title: 'Action 1'
		},
		{
			title: 'Action 2'
		},
		{
			title: 'Action 4'
		}
	];

	const handleShowModal = () => {
		setShowRenameModal(true);
	};

	return (
		<RolesPermissionsContainer>
			<FixedHeightModal
				open={showRenameModal}
				onClose={() => setShowRenameModal(false)}
				title={translate(({ buttons }) => buttons.newRole)}
				size={ModalSizes.XS}
			>
				<Modal.Body>
					<RenameFolderModalConent>
						<Input
							label={translate(({ inputs }) => inputs.name.role)}
							placeholder={translate(({ inputs }) => inputs.name.placeholder)}
							value={''}
							onChange={() => {}}
						/>
					</RenameFolderModalConent>
				</Modal.Body>
				<Modal.Footer>
					<DefaultButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.cancel)}
						onClick={() => {}}
					/>
					<PrimaryButton
						size={ButtonSize.LG}
						title={translate(({ buttons }) => buttons.save)}
						onClick={() => {}}
					/>
				</Modal.Footer>
			</FixedHeightModal>
			<RolesPermissionsHeader>
				<PageTitle> {translate(({ titles }) => titles.rolesPermissions)}</PageTitle>
				<HeaderAction>
					<GhostButton
						size={ButtonSize.SM}
						leftIcon={IconType.EpPlus}
						onClick={handleShowModal}
						title={translate(({ buttons }) => buttons.addRole)}
					/>
					<Dropdown>
						{dropDownRolesAndPermission.map((item, index) => (
							<Dropdown.Item key={`dropdown-action-${index}`} onClick={() => {}}>
								{item.title}
							</Dropdown.Item>
						))}
					</Dropdown>
				</HeaderAction>
			</RolesPermissionsHeader>
			<RolesPermissionsTableContainer>
				<WorkspacePermissionsTable />
				<CommitteePermissionsTable />
				<DocumentsPermissionsTable />
				<MeetingsPermissionsTable />
				<UserProfilePermissionsTable />
			</RolesPermissionsTableContainer>
		</RolesPermissionsContainer>
	);
};
