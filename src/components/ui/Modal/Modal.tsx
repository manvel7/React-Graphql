import React, { ReactNode, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { IconType } from '../../../consts';

import {
	ModalBackground,
	ModalContainer,
	ModalHeader,
	ModalBody,
	HeaderTitle,
	HeaderLeftIcon,
	HeaderRightIcon,
	ModalFooter
} from './Modal.style';
import { useOutsideClick, useKeyDownListener } from '../../../hooks';
import { Icon } from '../Icon';

export enum ModalSizes {
	XS = 'XS',
	SM = 'SM',
	MD = 'MD',
	LG = 'LG',
	XL = 'XL'
}

interface ModalProps {
	className?: string;
	title?: string;
	children?: ReactNode;
	headerLeftIcon?: string;
	open: boolean;
	onClose: () => void;
	size?: ModalSizes;
	height?: string;
	onBack?: () => void;
}

export function Modal({
	className,
	title,
	children,
	headerLeftIcon,
	open,
	onClose,
	onBack,
	size = ModalSizes.MD,
	height = '80%'
}: ModalProps) {
	const ref = useRef<HTMLDivElement>(null);
	const back = useRef<HTMLDivElement>(null);

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			onClose();
		}
		if (back.current && !back.current.contains(e.target as Node)) {
			if (onBack) {
				onBack();
			}
		}
	}

	useOutsideClick(handleOutsideClick);

	const escFunction = useCallback(event => {
		if (event.keyCode === 27) {
			onClose();
		}
	}, []);

	useKeyDownListener(escFunction);

	return open
		? createPortal(
				<ModalBackground>
					<ModalContainer ref={ref} size={size} height={height} className={className}>
						<ModalHeader>
							{!!headerLeftIcon && (
								<HeaderLeftIcon onClick={onBack}>
									<Icon name={headerLeftIcon} size={22} />
								</HeaderLeftIcon>
							)}
							<HeaderTitle>{title}</HeaderTitle>
							<HeaderRightIcon onClick={onClose}>
								<Icon name={IconType.EpTimes} size={16} />
							</HeaderRightIcon>
						</ModalHeader>
						{children}
					</ModalContainer>
				</ModalBackground>,
				document.body
		  )
		: null;
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
