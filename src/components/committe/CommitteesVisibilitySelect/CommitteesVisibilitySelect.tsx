import React from 'react';

import { CommitteeVisibility } from '@epolitiker/api/dist/generated';
import { CommitteesFiltersType } from '../';
import { Dropdown } from '../../ui';
import { CommitteesVisibilitySelectContainer } from './CommitteesVisibilitySelect.style';

enum VisibilityTypes {
	PUBLIC_OPEN = 'PUBLIC_OPEN',
	PUBLIC_LOCKED = 'PUBLIC_LOCKED',
	PRIVATE_HIDDEN = 'PRIVATE_HIDDEN'
}

interface CommitteesVisibilitySelectProps {
	selected: CommitteeVisibility[];
	onSelect: (field: keyof CommitteesFiltersType, value: CommitteeVisibility[]) => void;
	enableAll?: boolean;
}

export function CommitteesVisibilitySelect({
	selected,
	onSelect,
	enableAll = false
}: CommitteesVisibilitySelectProps) {
	return (
		<CommitteesVisibilitySelectContainer>
			<Dropdown
				toggleComponent={() => (
					<Dropdown.Title>
						{selected.length > 1 ? 'Visibility type' : selected[0]}
					</Dropdown.Title>
				)}
			>
				<Dropdown.Item
					disabled={!enableAll}
					onClick={() =>
						onSelect('visibility', [
							VisibilityTypes.PUBLIC_OPEN,
							VisibilityTypes.PUBLIC_LOCKED,
							VisibilityTypes.PRIVATE_HIDDEN
						])
					}
				>
					All types
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => onSelect('visibility', [VisibilityTypes.PUBLIC_OPEN])}
				>
					{VisibilityTypes.PUBLIC_OPEN}
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => onSelect('visibility', [VisibilityTypes.PUBLIC_LOCKED])}
				>
					{VisibilityTypes.PUBLIC_LOCKED}
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => onSelect('visibility', [VisibilityTypes.PRIVATE_HIDDEN])}
				>
					{VisibilityTypes.PRIVATE_HIDDEN}
				</Dropdown.Item>
			</Dropdown>
		</CommitteesVisibilitySelectContainer>
	);
}
