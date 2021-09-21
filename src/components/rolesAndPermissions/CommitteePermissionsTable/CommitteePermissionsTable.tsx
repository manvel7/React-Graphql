import React, { useState } from 'react';

import {
	CommitteePermissionsHeader,
	CommitteePermissionsTableContainer,
	CommitteePermissionsTitle,
	FooterContainer,
	TableBlock,
	TableContainer,
	Td,
	TheadBlock,
	Tr,
	FooterEditContent,
	CancelButton,
	EditMode
} from './CommitteePermissionsTable.style';
import { useTranslation } from '../../../hooks';
import { Icon } from '../../ui/Icon';
import { IconType } from '../../../consts';
import { GhostButton, PrimaryButton } from '../../ui/Button';
import { Checkbox } from '../../ui/Checkbox';

export const CommitteePermissionsTable = () => {
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

	const IconCommittee = [
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
			icon: IconType.EpChecked
		},
		{
			icon: IconType.EpChecked
		}
	];

	const IconCommitteeWithEmpty = [
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
		<CommitteePermissionsTableContainer>
			<CommitteePermissionsHeader>
				<CommitteePermissionsTitle>
					{translate(({ titles }) => titles.committees)}
				</CommitteePermissionsTitle>
				{!isEditMode ? (
					<EditMode>
						<GhostButton onClick={handleEditMode} icon={IconType.EpEdit} />
					</EditMode>
				) : null}
			</CommitteePermissionsHeader>
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
								{IconCommittee.map((item, index) => (
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
								{IconCommittee.map((item, index) => (
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
									{translate(({ titles }) => titles.updateOwn)}
								</Td>
								{IconCommitteeWithEmpty.map((item, index) => (
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
								{IconCommitteeWithEmpty.map((item, index) => (
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
								{IconCommitteeWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.generalSettingsForAll)}
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
									{translate(({ titles }) => titles.generalSettingsForAll)}
								</Td>
								{IconCommitteeWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.generalSettingsForOwn)}
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
									{translate(({ titles }) => titles.generalSettingsForOwn)}
								</Td>
								{IconCommitteeWithEmpty.map((item, index) => (
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
								{IconCommitteeWithEmpty.map((item, index) => (
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
								{IconCommitteeWithEmpty.map((item, index) => (
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
								{IconCommitteeWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.addMembers)}
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
									{translate(({ titles }) => titles.addMembers)}
								</Td>
								{IconCommitteeWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteMembers)}
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
								{IconCommitteeWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}

						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteMembers)}
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
									{translate(({ titles }) => titles.addDocument)}
								</Td>
								{IconCommitteeWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteOwnDocument)}
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
									{translate(({ titles }) => titles.deleteOwnDocument)}
								</Td>
								{IconCommitteeWithEmpty.map((item, index) => (
									<Td key={`table-action-${index}`}>
										<Icon name={item.icon} />
									</Td>
								))}
							</Tr>
						)}
						{isEditMode ? (
							<Tr>
								<Td style={{ textAlign: 'left' }}>
									{translate(({ titles }) => titles.deleteAnyDocument)}
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
									{translate(({ titles }) => titles.deleteAnyDocument)}
								</Td>
								{IconCommitteeWithEmpty.map((item, index) => (
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
		</CommitteePermissionsTableContainer>
	);
};
