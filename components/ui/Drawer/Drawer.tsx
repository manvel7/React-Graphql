import React, { useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

import {
	DrawerBackground,
	DrawerContainer,
	DrawerContentBlock,
	DrawerHeader,
	DrawerTitle,
	DrawerContent
} from './Drawer.style';
import { GhostButton } from '../Button';
import { IconType } from '../../../consts';
import { useOutsideClick, useKeyDownListener } from '../../../hooks';

interface DrawerProps {
	open: boolean;
	children: React.ReactNode;
	onClose: () => void;
	title: string;
}

export function Drawer({ open, children, onClose, title }: DrawerProps) {
	const ref = useRef<HTMLDivElement>(null);

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			onClose();
		}
	}
	useOutsideClick(handleOutsideClick);

	const escFunction = useCallback(event => {
		if (event.keyCode === 27) {
			onClose();
		}
	}, []);

	useKeyDownListener(escFunction);

	// return (
	// 	<DrawerContainer open={open} ref={ref}>
	// 		<DrawerHeader>
	// 			<DrawerTitle>{title}</DrawerTitle>
	// 			<GhostButton icon={IconType.EpTimes} onClick={onClose} />
	// 		</DrawerHeader>
	// 		{children}
	// 	</DrawerContainer>
	// );

	return createPortal(
		<DrawerBackground open={open}>
			<DrawerContainer open={open}>
				<DrawerContentBlock ref={ref}>
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
						<GhostButton icon={IconType.EpTimes} onClick={onClose} />
					</DrawerHeader>
					<DrawerContent>{children}</DrawerContent>
				</DrawerContentBlock>
			</DrawerContainer>
		</DrawerBackground>,
		document.body
	);
}
