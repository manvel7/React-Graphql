import React, { useEffect, useState } from 'react';
import { UserAccount } from '@epolitiker/api';
import { AuthUserContext } from '../hooks/ui/useAuthUser';
import { useMeQuery } from '../hooks';

interface AuthUser {
	children: React.ReactNode;
}

export function AuthUserProvider({ children }: AuthUser) {
	const [authUser, setAuthUser] = useState<UserAccount | null>(null);
	const { data: userData } = useMeQuery();

	useEffect(() => {
		if (userData) {
			setAuthUser(userData.me);
		}
	}, [userData]);

	return (
		<AuthUserContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthUserContext.Provider>
	);
}
