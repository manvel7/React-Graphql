import React, { useEffect, useContext } from 'react';
import { useBreadcrumbs, useNavigation, useTranslation } from '../../../hooks';
import { CommitteeContext } from '../../../pages';

export function CommitteeInformation() {
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
					label: translate(({ titles }) => titles.information),
					to: routes.committeeInformation(committee.id),
					active: true
				}
			];

			setBreadcrumbs(breadcrumbsData);
		}
	}, [committee]);

	return <h4>Committee Information Component</h4>;
}
