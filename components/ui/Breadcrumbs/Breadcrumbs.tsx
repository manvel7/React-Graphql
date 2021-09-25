import React from 'react';

import { BreadcrumbsContainer, BreadcrumbItem, BreadcrumbDivider } from './Breadcrumbs.style';

import { Colors } from '../../../environment';
import { useBreadcrumbs } from '../../../hooks';

export function Breadcrumbs() {
	const { breadcrumbs } = useBreadcrumbs();

	return (
		<BreadcrumbsContainer>
			{breadcrumbs.length > 0 &&
				breadcrumbs.map((item, index) => (
					<BreadcrumbItem
						key={`breadcrumbs-item-${index}`}
						to={item.to}
						color={
							index === breadcrumbs.length - 1
								? Colors.black[100]
								: Colors.typoPlaceholder
						}
					>
						{index !== 0 && <BreadcrumbDivider>/</BreadcrumbDivider>}
						{item.label}
					</BreadcrumbItem>
				))}
		</BreadcrumbsContainer>
	);
}

Breadcrumbs.Item = BreadcrumbItem;
Breadcrumbs.Divider = BreadcrumbDivider;
