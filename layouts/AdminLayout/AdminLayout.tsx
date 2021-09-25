import React from 'react';

import { AdminLayoutContainer, MainContainer } from './AdminLayout.style';

import { SidebarMenu } from '../../components/SidebarMenu';
import { BreadcrumbsProvider } from '../../app/BreadcrumbsProvider';

interface AdminLayoutProps {
	children: React.ReactNode;
	withOverview?: boolean;
}

export function AdminLayout({ children, withOverview = false }: AdminLayoutProps) {
	return (
		<AdminLayoutContainer>
			<SidebarMenu withOverview={withOverview} />
			<BreadcrumbsProvider>
				<MainContainer>{children}</MainContainer>
			</BreadcrumbsProvider>
		</AdminLayoutContainer>
	);
}
