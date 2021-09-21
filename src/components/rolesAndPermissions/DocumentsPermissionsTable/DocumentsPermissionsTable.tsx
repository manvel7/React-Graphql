import React, { useState } from 'react';

import {
	DocumentPermissionsTableContainer,
	DocumentPermissionsHeader,
	DocumentPermissionsTitle,
	FooterContainer,
	TableBlock,
	TableContainer,
	Td,
	TheadBlock,
	Tr,
	FooterEditContent,
	CancelButton,
	EditMode
} from './DocumentsPermissionsTable.style';
import { useTranslation } from '../../../hooks';
import { Icon, GhostButton, PrimaryButton, Checkbox } from '../../ui';
import { IconType } from '../../../consts';

export const DocumentsPermissionsTable = () => {
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

	const IconDocument = [
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

	const IconDocumentWithEmpty = [
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

	const handleClosePermissions = () => {
		setShowAll(false);
	};

	const handleShowAllPermissions = () => {
		setShowAll(true);
	};

	const handleEditMode = () => {
		setEditMode(true);
	};

	const handleCancelEditMode = () => {
		setEditMode(false);
	};

	return (
		<DocumentPermissionsTableContainer>
			<DocumentPermissionsHeader>
				<DocumentPermissionsTitle>
					{translate(({ titles }) => titles.documents)}
				</DocumentPermissionsTitle>
				{!isEditMode ? (
					<EditMode>
						<GhostButton onClick={handleEditMode} icon={IconType.EpEdit} />
					</EditMode>
				) : null}
			</DocumentPermissionsHeader>
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
								{IconDocument.map((item, index) => (
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
								{IconDocument.map((item, index) => (
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
								{IconDocumentWithEmpty.map((item, index) => (
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
								{IconDocumentWithEmpty.map((item, index) => (
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
								{IconDocumentWithEmpty.map((item, index) => (
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
								{IconDocumentWithEmpty.map((item, index) => (
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
		</DocumentPermissionsTableContainer>
	);
};
