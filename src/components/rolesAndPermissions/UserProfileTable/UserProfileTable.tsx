import React, { useState } from 'react';

import {
	CancelButton,
	FooterContainer,
	FooterEditContent,
	TableBlock,
	TableContainer,
	Td,
	TheadBlock,
	Tr,
	UserPermissionsHeader,
	UserPermissionsTableContainer,
	UserPermissionsTitle,
	EditMode
} from './UserProfileTable.style';
import { useTranslation } from '../../../hooks';
import { IconType } from '../../../consts';
import { Checkbox, GhostButton, Icon, PrimaryButton } from '../../ui';

export const UserProfilePermissionsTable = () => {
	const translate = useTranslation();
	const [showAll, setShowAll] = useState<boolean>(false);
	const [isEditMode, setEditMode] = useState<boolean>(false);
	// const [selected, setSelected] = useState<boolean>(false)

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
	const IconUserProfileWhenEmpty = [
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

	// const handleSelected = (e: ChangeEvent<HTMLInputElement>) => {
	//     setSelected(e.target.checked)
	// }

	return (
		<UserPermissionsTableContainer>
			<UserPermissionsHeader>
				<UserPermissionsTitle>
					{translate(({ titles }) => titles.userProfile)}
				</UserPermissionsTitle>
				{!isEditMode ? (
					<EditMode>
						<GhostButton onClick={handleEditMode} icon={IconType.EpEdit} />
					</EditMode>
				) : null}
			</UserPermissionsHeader>
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
									{translate(({ titles }) => titles.viewMembersProfileInfo)}
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
									{translate(({ titles }) => titles.viewMembersProfileInfo)}
								</Td>
								{IconUserProfileWhenEmpty.map((item, index) => (
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
								{IconUserProfileWhenEmpty.map((item, index) => (
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
								{IconUserProfileWhenEmpty.map((item, index) => (
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
		</UserPermissionsTableContainer>
	);
};
