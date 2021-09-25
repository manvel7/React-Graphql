import { useState } from 'react';

export function useLocalStorage(key: string, initialValue?: any) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: any) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			if (typeof value === 'string') {
				window.localStorage.setItem(key, valueToStore);
			} else {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			/* empty */
		}
	};

	const removeValue = () => {
		window.localStorage.removeItem(key);
	};

	return [storedValue, setValue, removeValue];
}
