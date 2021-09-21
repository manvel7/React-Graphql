import React from 'react';

import { SuperAdminLayoutContainer } from './SuperAdminLayout.style';
import { SuperAdminSidebarMenu } from '../../components/SuperAdminSidebarMenu';

interface SuperAdminLayoutProps {
	children: React.ReactNode;
}

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
	return (
		<SuperAdminLayoutContainer>
			<SuperAdminSidebarMenu />
			{children}
		</SuperAdminLayoutContainer>
	);
}
