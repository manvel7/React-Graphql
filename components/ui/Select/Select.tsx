import React, { useState } from 'react';

import { useMeasure, useOutsideClick } from '../../../hooks';
import {
	SelectContainer,
	SelectButton,
	SelectItem,
	SelectMenu,
	SelectButtonTitle
} from './Select.style';
import { Colors } from '../../../environment';
import { Icon } from '../Icon';
import { IconType } from '../../../consts';

export enum SelectSize {
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl'
}

interface SelectProps {
	className?: string;
	size?: SelectSize;
	title?: string;
	children: JSX.Element[];
	disabled?: boolean;
}

export function Select({
	className,
	size = SelectSize.MD,
	title = 'Text',
	children,
	disabled = false
}: SelectProps) {
	const [ref] = useMeasure<HTMLDivElement>();
	const [open, setOpen] = useState(false);

	function toggle(e: React.MouseEvent) {
		e.stopPropagation();
		setOpen(!open);
	}

	function handleOutsideClick(e: Event) {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setOpen(false);
		}
	}
	useOutsideClick(handleOutsideClick);

	const renderChildren = React.Children.map(children, child =>
		React.cloneElement(child, {
			onClick: (e: React.MouseEvent) => {
				e.stopPropagation();
				child.props.onClick();
				setOpen(false);
			}
		})
	);

	return (
		<SelectContainer className={className} ref={ref}>
			<SelectButton
				open={open}
				onClick={toggle}
				type="button"
				disabled={disabled}
				size={size}
			>
				<SelectButtonTitle>{title}</SelectButtonTitle>
				<Icon
					name={open ? IconType.EpChevronUp : IconType.EpChevronDown}
					color={open ? Colors.blue[100] : ''}
				/>
			</SelectButton>

			{open && <SelectMenu open={open}>{renderChildren}</SelectMenu>}
		</SelectContainer>
	);
}

Select.Item = SelectItem;
