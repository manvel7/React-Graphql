import React, { useState, useEffect } from 'react';

import { AgendaItem } from '@epolitiker/api';

import {
	AgendaItemTitleCardContainer,
	CardTitle,
	CardInfoText,
	PopoverContainer,
	PopoverHeader,
	PopoverContent,
	PopoverTitleInput,
	PopoverDescriptionTextarea
} from './AgendaItemTitleCard.style';
import { useMeasure, useOutsideClick, useTranslation } from '../../../hooks';

interface AgendaItemTitleCard {
	order: string;
	agenda: AgendaItem;
	handleUpdate: (agendaId: string, dataToUpdate: any) => void;
}

export function AgendaItemTitleCard({ order, agenda, handleUpdate }: AgendaItemTitleCard) {
	const translate = useTranslation();
	const [ref] = useMeasure<HTMLDivElement>();
	const [show, setShow] = useState(false);
	const [initialState, setInitialState] = useState({
		title: agenda.title || '',
		description: agenda.description || ''
	});
	const [values, setValues] = useState({
		title: agenda.title || '',
		description: agenda.description || ''
	});

	useEffect(() => {
		setInitialState({
			title: agenda.title || '',
			description: agenda.description || ''
		});
	}, [agenda.title, agenda.description]);

	function showPopover() {
		setShow(true);
	}

	function hidePopover() {
		setShow(false);
	}

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			hidePopover();
		}
	}
	useOutsideClick(handleOutsideClick);

	function handleInputsChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const field = e.target.name;
		const value = e.target.value;
		setValues({ ...values, [field]: value });
	}

	useEffect(() => {
		if (!show) {
			if (
				values.title !== initialState.title &&
				values.description !== initialState.description
			) {
				handleUpdate(agenda.id, {
					title: values.title,
					description: values.description
				});
			} else if (values.title !== initialState.title) {
				handleUpdate(agenda.id, {
					title: values.title
				});
			} else if (values.description !== initialState.description) {
				handleUpdate(agenda.id, {
					description: values.description
				});
			}
		}
	}, [show]);

	return (
		<AgendaItemTitleCardContainer onClick={showPopover} ref={ref}>
			<CardTitle exists={!!agenda.title}>
				{`${order} ${agenda.title || translate(({ titles }) => titles.nameAgendaItem)}`}
			</CardTitle>
			<CardInfoText>
				{agenda.description
					? agenda.description.slice(0, 40)
					: translate(({ titles }) => titles.setDescription)}
			</CardInfoText>

			{show && (
				<PopoverContainer>
					<PopoverHeader>
						<PopoverTitleInput
							type="text"
							name="title"
							placeholder={translate(({ titles }) => titles.nameAgendaItem)}
							value={values.title}
							onChange={handleInputsChange}
						/>
					</PopoverHeader>
					<PopoverContent>
						<PopoverDescriptionTextarea
							rows={5}
							name="description"
							placeholder={translate(({ titles }) => titles.setDescription)}
							value={values.description}
							onChange={handleInputsChange}
						/>
					</PopoverContent>
				</PopoverContainer>
			)}
		</AgendaItemTitleCardContainer>
	);
}
