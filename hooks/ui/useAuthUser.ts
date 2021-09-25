import { useContext, createContext } from 'react';
import { Nullable } from '../../types';
import { UserAccount } from '@epolitiker/api';

export interface IUserContext {
	authUser: Nullable<UserAccount>;
	setAuthUser: (user: UserAccount) => void;
}

export const AuthUserContext = createContext<IUserContext>({
	authUser: null,
	setAuthUser: () => null
});

export function useAuthUser(): IUserContext {
	return useContext(AuthUserContext);
}
