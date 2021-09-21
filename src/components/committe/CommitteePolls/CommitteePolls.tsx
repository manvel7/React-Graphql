import React, { useEffect, useContext } from 'react';
import { useBreadcrumbs, useNavigation, useTranslation } from '../../../hooks';
import { CommitteeContext } from '../../../pages';

export function CommitteePolls() {
	const { committee } = useContext(CommitteeContext);
	if (!committee) {
		return null;
	}

	const { setBreadcrumbs } = useBreadcrumbs();
	const { routes } = useNavigation();
	const translate = useTranslation();

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
					label: translate(({ titles }) => titles.polls),
					to: routes.committeePolls(committee.id),
					active: true
				}
			];

			setBreadcrumbs(breadcrumbsData);
		}
	}, [committee]);

	return (
		<div>
			<h1>CommitteePolls</h1>
		</div>
	);
}
