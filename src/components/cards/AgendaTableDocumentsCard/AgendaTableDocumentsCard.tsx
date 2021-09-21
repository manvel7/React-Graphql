import React, { useState, useEffect, useRef } from 'react';

import { AgendaItem } from '@epolitiker/api';

import {
	AgendaTableDocumentsCardContainer,
	DocumentBlock,
	DocumentIconWrapper,
	DocumentIcon,
	DocumentIconBackground,
	DocumentTitle,
	ColumnWrapper,
	PopoverContainer,
	PopoverContent,
	PopoverActionsBlock,
	PopoverFooter,
	LightButton,
	MoreDocsText
} from './AgendaTableDocumentsCard.style';

import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { GhostButton, Dropdown } from '../../ui';
import { useTranslation, useOutsideClick } from '../../../hooks';

interface AgendaTableDocumentsCardProps {
	agenda: AgendaItem;
	openSelectModal?: () => void;
	openSelectDocsModal: () => void;
	uploadFileToAgendaItem?: (file: File, agenda: AgendaItem) => void;
	deleteAgendaDocument: (docId: string) => void;
	showFromOutside: string;
	setShowFromOutside: (val: string) => void;
	hideFromOutside: boolean;
	setHideFromOutside: (val: boolean) => void;
	setWhereToUpload?: (agenda: AgendaItem | null) => void;
}
export function AgendaTableDocumentsCard({
	agenda,
	openSelectDocsModal,
	// uploadFileToAgendaItem,
	deleteAgendaDocument,
	openSelectModal,
	showFromOutside,
	setShowFromOutside,
	hideFromOutside,
	setHideFromOutside,
	setWhereToUpload
}: AgendaTableDocumentsCardProps) {
	const ref = useRef<HTMLDivElement | any>();
	const translate = useTranslation();
	const [showPopover, setShowPopover] = useState(false);

	function handleShowPopover() {
		setShowPopover(true);
	}

	function handleHidePopover() {
		setShowPopover(false);
		setShowFromOutside('');
	}

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			handleHidePopover();
		}
	}
	useOutsideClick(handleOutsideClick);

	function handleOpenSelectDocsModal() {
		openSelectDocsModal();
		handleHidePopover();
	}

	useEffect(() => {
		if (showFromOutside === agenda.id) {
			handleShowPopover();
		}
	}, [showFromOutside]);

	useEffect(() => {
		if (hideFromOutside) {
			handleHidePopover();
			setHideFromOutside(false);
		}
	}, [hideFromOutside]);

	function handleSelectModal() {
		if (openSelectModal) {
			openSelectModal();
			setWhereToUpload && setWhereToUpload(agenda);
		}
		handleHidePopover();
	}

	return (
		<AgendaTableDocumentsCardContainer ref={ref}>
			<ColumnWrapper onClick={handleShowPopover}>
				{agenda?.folder?.documents && agenda?.folder?.documents.length > 0
					? agenda.folder?.documents.slice(0, 2).map(document => (
							<DocumentBlock key={document.id}>
								<DocumentIconWrapper>
									<DocumentIcon
										name={IconType.EpDoc}
										color={Colors.neutralBlue[100]}
									/>
									<DocumentIconBackground />
								</DocumentIconWrapper>
								<DocumentTitle>{document.name}</DocumentTitle>
							</DocumentBlock>
					  ))
					: translate(({ buttons }) => buttons.choose)}
				{agenda.folder?.documents && agenda.folder?.documents?.length > 2 && (
					<MoreDocsText>
						{`+${agenda.folder?.documents.length - 2} ${translate(
							({ titles }) => titles.documents
						)}`}
					</MoreDocsText>
				)}
			</ColumnWrapper>
			{showPopover && (
				<PopoverContainer>
					<PopoverContent>
						{agenda.folder?.documents && agenda.folder?.documents.length > 0 ? (
							agenda.folder?.documents.map(document => (
								<DocumentBlock key={document.id}>
									<DocumentIconWrapper>
										<DocumentIcon
											name={IconType.EpDoc}
											color={Colors.neutralBlue[100]}
										/>
										<DocumentIconBackground />
									</DocumentIconWrapper>
									<DocumentTitle>{document.name}</DocumentTitle>
									<Dropdown>
										<Dropdown.Item
											onClick={() => deleteAgendaDocument(document.id)}
										>
											{translate(({ buttons }) => buttons.remove)}
										</Dropdown.Item>
									</Dropdown>
								</DocumentBlock>
							))
						) : (
							<DocumentTitle>
								{translate(({ titles }) => titles.noSelectedDocuments)}
							</DocumentTitle>
						)}
					</PopoverContent>
					<PopoverActionsBlock>
						<LightButton
							floating
							leftIcon={IconType.EpAttachment}
							title={translate(({ buttons }) => buttons.selectDocuments)}
							onClick={handleOpenSelectDocsModal}
						/>
						<GhostButton
							floating
							title={translate(({ buttons }) => buttons.upload)}
							onClick={handleSelectModal}
						/>
					</PopoverActionsBlock>
					<PopoverFooter>
						<GhostButton
							floating
							leftIcon={IconType.EpPlus}
							title={translate(({ buttons }) => buttons.create)}
							onClick={() => {}}
						/>
					</PopoverFooter>
				</PopoverContainer>
			)}
		</AgendaTableDocumentsCardContainer>
	);
}
