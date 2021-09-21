import React, { useState } from 'react';

import { AgendaItem } from '@epolitiker/api';

import { AgendaTableDurationCardContainer, Popover } from './AgendaTableDurationCard.style';
import { useMeasure, useOutsideClick, useTranslation } from '../../../hooks';
import { AutoComplete } from '../../ui';
import { agendaDurationsList } from '../../../consts';

interface AgendaTableDurationCardProps {
	agendaItem: AgendaItem;
	handleUpdate: (agendaId: string, dataToUpdate: any) => void;
}

export function AgendaTableDurationCard({
	agendaItem,
	handleUpdate
}: AgendaTableDurationCardProps) {
	const translate = useTranslation();
	const [ref] = useMeasure<HTMLDivElement>();
	const [showEditMode, setShowEditMode] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	function handleShowEditMode() {
		setShowEditMode(true);
	}

	function handleCloseEditMode() {
		setShowEditMode(false);
	}

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			handleCloseEditMode();
		}
	}
	useOutsideClick(handleOutsideClick);

	function handleUpdateAgendaItemDuration(duration: string) {
		handleUpdate(agendaItem.id, { duration: duration });
	}

	return (
		<AgendaTableDurationCardContainer
			onDoubleClick={handleShowEditMode}
			ref={ref}
			onMouseOver={() => setShowPopover(true)}
			onMouseLeave={() => setShowPopover(false)}
		>
			{showEditMode ? (
				<AutoComplete value={agendaItem.duration || ''}>
					{agendaDurationsList.map((duration, i) => (
						<AutoComplete.Item
							key={`duration-item-${i}`}
							onClick={() => handleUpdateAgendaItemDuration(duration)}
						>
							{duration}
						</AutoComplete.Item>
					))}
				</AutoComplete>
			) : (
				agendaItem.duration || 'No time limit'
			)}

			{!showEditMode && showPopover && (
				<Popover>{translate(({ titles }) => titles.doubleClickToSetDuration)}</Popover>
			)}
		</AgendaTableDurationCardContainer>
	);
}
