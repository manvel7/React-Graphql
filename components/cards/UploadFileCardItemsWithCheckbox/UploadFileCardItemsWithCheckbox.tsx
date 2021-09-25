import React from 'react';

import { Document } from '@epolitiker/api';

import {
	UploadFileCardWithCheckboxContainer,
	CardIconBlock,
	CardMainBlock,
	CardTitleBlock,
	CardTitle,
	CardInfoTextBlock,
	CardInfoText,
	CardIconBackground,
	CardIconWrapper,
	CardIcon,
	ButtonContent,
	CheckboxBlock,
	FileInfoBlock,
	RightIcon
} from './UploadFileCardItemsWithCheckbox.style';

import { Checkbox, LightButton } from '../../ui';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';
import { useTranslation } from '../../../hooks';

interface UploadFileCardWithCheckboxProps {
	document: Document;
	isSelect?: boolean;
	onSelect?: (type: boolean) => void;
	onClick: (document: Document) => void;
}

export function UploadFileCardWithCheckbox({
	document,
	onClick,
	onSelect,
	isSelect
}: UploadFileCardWithCheckboxProps) {
	const translate = useTranslation();

	function getUploadedFormat() {
		const updatedBy = `${document.lastUpdatedBy?.firstName} ${document.lastUpdatedBy?.lastName}`;
		return `${translate(({ titles }) => titles.updatedBy)} ${updatedBy}`;
	}

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onSelect) {
			onSelect(e.target.checked);
		}
	};

	return (
		<UploadFileCardWithCheckboxContainer onClick={() => onClick(document)}>
			<CheckboxBlock>
				<Checkbox checked={isSelect ? isSelect : false} onChange={e => changeHandler(e)} />
			</CheckboxBlock>
			<CardIconBlock>
				<CardIconWrapper>
					<CardIcon name={IconType.EpDoc} color={Colors.blue[100]} />
					<CardIconBackground />
				</CardIconWrapper>
			</CardIconBlock>
			<CardMainBlock>
				<FileInfoBlock>
					<CardTitleBlock>
						<CardTitle>
							{document.name.length > 10 ? document.name.slice(0, 5) : null}
						</CardTitle>
					</CardTitleBlock>
					<CardInfoTextBlock>
						<CardInfoText>
							{getUploadedFormat()}
							{`  ${(document.size / 1024).toFixed(0)}mb`}
						</CardInfoText>
					</CardInfoTextBlock>
				</FileInfoBlock>
				<ButtonContent>
					<LightButton
						onClick={() => {}}
						title={translate(({ titles }) => titles.noRelation)}
						rounded
					/>
					<RightIcon>
						<LightButton
							onClick={() => {}}
							title={translate(({ titles }) => titles.noLabels)}
							rounded
						/>
					</RightIcon>
				</ButtonContent>
			</CardMainBlock>
		</UploadFileCardWithCheckboxContainer>
	);
}
