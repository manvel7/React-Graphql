import { useEffect, useRef, useMemo, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { EventType } from '../../consts';

export function useEffectOnce(effect: React.EffectCallback) {
	useEffect(effect, []);
}

export function useMemoOnce<T>(factory: () => T) {
	return useMemo<T>(factory, []);
}

export function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => void (ref.current = value), [value]);

	return ref.current;
}

export function useMediaQuery(query: string, defaultMatches = true) {
	const [matches, setMatches] = useState(defaultMatches);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		let active = true;

		const listener = () => {
			if (!active) {
				return;
			}

			if (mediaQueryList.matches) {
				setMatches(true);
			} else {
				setMatches(false);
			}
		};

		mediaQueryList.addListener(listener);
		setMatches(mediaQueryList.matches);

		return () => {
			active = false;
			mediaQueryList.removeListener(listener);
		};
	}, [query]);

	return matches;
}

export function useOutsideClick(listener: EventListenerOrEventListenerObject) {
	useEffectOnce(() => {
		document.addEventListener(EventType.Click, listener);
		return () => document.removeEventListener(EventType.Click, listener);
	});
}

export function useKeyDownListener(listener: EventListenerOrEventListenerObject) {
	useEffectOnce(() => {
		document.addEventListener(EventType.KeyDown, listener, false);
		return () => document.removeEventListener(EventType.KeyDown, listener, false);
	});
}

export function useMeasure<T extends HTMLElement>(): [React.RefObject<T>, ClientRect] {
	const ref = useRef<T>(null);

	const [bounds, set] = useState({
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		width: 0,
		height: 0
	});
	const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)));

	useEffectOnce(() => {
		if (ref.current) {
			ro.observe(ref.current);
		}

		return () => ro.disconnect();
	});

	return [ref, bounds];
}

export { useMonthsShortName } from './useMonthsShortName';
export { useCommitteeMembershipPositionList } from './useCommitteeMembershipPositionList';
export { useCommitteeMembershipTypeList } from './useCommitteeMembershipTypeList';
export * from './useGroupedCommitteeMemberships';
