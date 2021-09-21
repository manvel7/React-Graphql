import React from 'react';
import { Document } from '@epolitiker/api';
import {
	BookmarksDocumentContainer,
	BookmarksDocumentContent,
	LeftBarDocument,
	RightBarDocument,
	DocumentContent,
	DocumentTime,
	DocTitle,
	HeaderCradBlock,
	ButtonLeftBar
} from './BookmarksDocument.style';
import { Icon, LightButton, ButtonSize } from '../../ui';
import { IconType } from '../../../consts';

import { useTranslation } from '../../../hooks';

interface BookmarksDocumentProps {
	document: Document;
	onClick: (document: Document) => void;
}

export const BookmarksDocument = ({ document, onClick }: BookmarksDocumentProps) => {
	const translate = useTranslation();

	return (
		<BookmarksDocumentContainer onClick={() => onClick(document)}>
			<BookmarksDocumentContent>
				<LeftBarDocument>
					<Icon name={IconType.EpDocs} />
					<DocumentContent>
						<HeaderCradBlock>
							<DocTitle>
								{document.name.length > 8
									? document.name.slice(0, 8)
									: document.name}
								...
							</DocTitle>
							<ButtonLeftBar>
								<LightButton
									size={ButtonSize.SM}
									onClick={() => {}}
									title={translate(({ buttons }) => buttons.case)}
									rounded
								/>
							</ButtonLeftBar>
						</HeaderCradBlock>
						<DocumentTime>Updated By {document.updatedAt}</DocumentTime>
					</DocumentContent>
				</LeftBarDocument>
				<RightBarDocument>
					<Icon name={IconType.EpDocs} />
					<DocumentContent>
						<HeaderCradBlock>
							<DocTitle>
								{document.name.length > 8
									? document.name.slice(0, 8)
									: document.name}
								...
							</DocTitle>
							<ButtonLeftBar>
								<LightButton
									size={ButtonSize.SM}
									onClick={() => {}}
									title={translate(({ buttons }) => buttons.case)}
									rounded
								/>
							</ButtonLeftBar>
						</HeaderCradBlock>
						<DocumentTime>Updated By {document.updatedAt}</DocumentTime>
					</DocumentContent>
				</RightBarDocument>
			</BookmarksDocumentContent>
		</BookmarksDocumentContainer>
	);
};
