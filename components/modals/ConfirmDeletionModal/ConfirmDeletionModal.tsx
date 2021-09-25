import React, { useState } from 'react';
import { Modal, ModalSizes, DangerButton, DefaultButton, Input, ButtonSize } from '../../ui';
import { useTranslation } from '../../../hooks';
import { IconType } from '../../../consts';
import { Nullable } from '../../../types';

import {
	DeleteModelWrapper,
	ModalTytle,
	HightlightedWord,
	ActionButtonsWrapper
} from './ConfirmDeletionModal.style';

interface IDConstraint {
	id: string;
}

interface IConfirmDeletionModalProps<T extends IDConstraint> {
	openConfirmDeletionModal: boolean;
	setOpenConfirmDeletionModal: (openConfirmDeletionModal: boolean) => void;
	entityToDelete: Nullable<T>;
	handleDelete: (id: string) => void;
}

export function ConfirmDeletionModal<T extends IDConstraint>({
	openConfirmDeletionModal,
	setOpenConfirmDeletionModal,
	entityToDelete,
	handleDelete
}: IConfirmDeletionModalProps<T>) {
	const [deleteInputValue, setDeleteInputValue] = useState('');
	const [deleteWordIncorrect, setDeletWordIncorrect] = useState(false);

	const translate = useTranslation();

	function handleDeletionModalClose() {
		setOpenConfirmDeletionModal(false);
		setDeleteInputValue('');
		setDeletWordIncorrect(false);
	}

	function handleDeletionConfirm() {
		if (deleteInputValue === translate(({ titles }) => titles.delete)) {
			entityToDelete && handleDelete(entityToDelete.id);
			setOpenConfirmDeletionModal(false);
		} else {
			setDeletWordIncorrect(true);
		}
	}

	return (
		<Modal
			size={ModalSizes.MD}
			headerLeftIcon={IconType.EpTrash}
			title={translate(({ titles }) => titles.deleteCommittee)}
			open={openConfirmDeletionModal}
			onClose={handleDeletionModalClose}
			height="40%"
		>
			<Modal.Body withoutScroll>
				<DeleteModelWrapper>
					<ModalTytle>
						{`${translate(({ titles }) => titles.pleaseType)} "`}
						{
							<HightlightedWord>{`${translate(
								({ titles }) => titles.delete
							)}`}</HightlightedWord>
						}
						{`" ${translate(({ titles }) => titles.toConfirm)}`}
					</ModalTytle>
					<Input
						label={translate(({ inputs }) => inputs.delete.label)}
						error={
							deleteWordIncorrect && translate(({ inputs }) => inputs.delete.invalid)
						}
						placeholder={translate(({ inputs }) => inputs.delete.placeholder)}
						value={deleteInputValue}
						onChange={e => setDeleteInputValue(e.target.value)}
					/>
					<ActionButtonsWrapper>
						<DefaultButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.cancel)}
							onClick={handleDeletionModalClose}
						/>
						<DangerButton
							size={ButtonSize.LG}
							title={translate(({ buttons }) => buttons.delete)}
							onClick={handleDeletionConfirm}
						/>
					</ActionButtonsWrapper>
				</DeleteModelWrapper>
			</Modal.Body>
		</Modal>
	);
}

export default ConfirmDeletionModal;
