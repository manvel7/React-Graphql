import React from 'react';
import moment from 'moment';
import { Document as DocumentViewer, Page as DocumentPage } from 'react-pdf';

import { Document } from '@epolitiker/api';

import {
	DocumentCardContainer,
	DocumentViewerBlock,
	CardBody,
	CardIconBlock,
	CardInfoBlock,
	CardTitle,
	CardText
} from './DocumentCard.style';
import { DocumentCardLoader, Icon } from '../../ui';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';
import { Colors } from '../../../environment';

interface DocumentCardProps {
	className?: string;
	document: Document;
}

export function DocumentCard({ className, document }: DocumentCardProps) {
	const translate = useTranslation();

	const uploadedByText = () => {
		const text = translate(({ titles }) => titles.attachedBy);
		const f = document.uploadedBy.firstName;
		const l = document.uploadedBy.lastName;
		return `${text} ${f} ${l}`;
	};

	const createdAtText = () => {
		const date = new Date(document.createdAt);
		const text = moment(date).format('MM/DD/YYYY');
		return text;
	};

	return (
		<DocumentCardContainer className={className}>
			<DocumentViewerBlock>
				<DocumentViewer
					file={document.file.url}
					loading={<DocumentCardLoader />}
					error={''}
					onLoadError={() => {}}
				>
					<DocumentPage pageNumber={1} width={180} />
				</DocumentViewer>
			</DocumentViewerBlock>

			<CardBody>
				<CardIconBlock>
					<Icon name={IconType.EpCalendar} color={Colors.blue[100]} />
				</CardIconBlock>
				<CardInfoBlock>
					<CardTitle>{document.name.slice(0, 15)}...</CardTitle>
					<CardText>{`Opened ${createdAtText()}`}</CardText>
					<CardText>{uploadedByText()}</CardText>
				</CardInfoBlock>
			</CardBody>
		</DocumentCardContainer>
	);
}
