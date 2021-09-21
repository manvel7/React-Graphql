import React from 'react';

import { AuthLayoutContainer } from './AuthLayout.style';
import { AuthHeader, AuthFooter } from '../../components/auth';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<AuthLayoutContainer>
			<AuthHeader />
			{children}
			<AuthFooter />
		</AuthLayoutContainer>
	);
}
