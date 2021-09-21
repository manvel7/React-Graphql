export function useIsAdmin(): boolean {
	const isAdmin = localStorage.getItem('UserRole');
	if (isAdmin === 'ADMIN') {
		return true;
	} else {
		return false;
	}
}
