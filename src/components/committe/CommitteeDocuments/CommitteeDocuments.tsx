import React, { useContext, useEffect, useState } from 'react';

import { Document } from '@epolitiker/api';

import {
	PageContainer,
	PageTitleBar,
	PageDocumentsContainer,
	PageFilterBar,
	PageFilterBarTitle,
	PageFoldersList
} from './CommitteeDocuments.style';
import { EmptyCard, MeetingRelatedItemsCard } from '../../cards';
import { useBreadcrumbs, useNavigation, useTranslation } from '../../../hooks';
import { CommitteeContext } from '../../../pages';
import { IconType } from '../../../consts';

export function CommitteeDocuments() {
	const { committee } = useContext(CommitteeContext);
	const translate = useTranslation();
	if (!committee) {
		return null;
	}
	const { setBreadcrumbs } = useBreadcrumbs();
	const { routes } = useNavigation();
	const [documents, setDocuments] = useState<Document[]>([]);

	useEffect(() => {
		if (committee) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.committees),
					to: routes.committees
				},
				{
					label: committee.label,
					to: routes.committeeOverview(committee.id)
				},
				{
					label: translate(({ titles }) => titles.documents),
					to: routes.committeeDocuments(committee.id),
					active: true
				}
			];

			setBreadcrumbs(breadcrumbsData);

			if (committee.folder) {
				setDocuments(committee.folder.documents);
			}
		}
	}, [committee]);
	return (
		<PageContainer>
			<PageTitleBar>
				<p>Workspace documents</p>
			</PageTitleBar>
			<PageDocumentsContainer>
				<PageFilterBar>
					<PageFilterBarTitle>Folders</PageFilterBarTitle>
					<PageFilterBarTitle>Sort by AZ</PageFilterBarTitle>
				</PageFilterBar>
				<PageFoldersList>
					{documents.length > 0 ? (
						documents.map((document, index) => (
							<MeetingRelatedItemsCard
								key={`${document}-${index}`}
								document={document}
								onClick={() => {}}
							/>
						))
					) : (
						<EmptyCard
							title={translate(
								({ titles }) => titles.noCommitteesAndSharedDirectoriesYet
							)}
							iconName={IconType.EpCommitteeFolder}
							buttonTitle={translate(({ titles }) => titles.createDirectory)}
							path={routes.documents}
						/>
					)}
				</PageFoldersList>
			</PageDocumentsContainer>
		</PageContainer>
	);
}
