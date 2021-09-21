import React, { useState } from 'react';

import {
	DropDownContainer,
	DropDownButton,
	ButtonTitle,
	ButtonTitleBold,
	DropdownMenu,
	DropdownItem,
	Tooltip,
	DropdownDivider,
	DopdownItemIcon,
	FileInput,
	FileInputLabel
} from './Dropdown.style';
import { useMeasure, useOutsideClick } from '../../../hooks';
import { Icon } from '../Icon';
import { IconType } from '../../../consts';
import { Colors } from '../../../environment';

export enum DropdownPosition {
	Left = 'left',
	Right = 'right',
	Top = 'top'
}

interface DropdownProps {
	className?: string;
	children: JSX.Element | JSX.Element[] | any;
	toggleComponent?: () => JSX.Element;
	tooltip?: string;
	position?: DropdownPosition;
	floating?: boolean;
}

export function Dropdown({
	className,
	toggleComponent,
	tooltip,
	children,
	position = DropdownPosition.Right,
	floating = false
}: DropdownProps) {
	const [ref] = useMeasure<HTMLDivElement>();
	const [open, setOpen] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);

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
		<DropDownContainer className={className} ref={ref} floating={floating}>
			<DropDownButton
				open={open}
				onClick={toggle}
				type="button"
				onMouseOver={() => setShowTooltip(true)}
				onMouseOut={() => setShowTooltip(false)}
				floating={floating}
			>
				{toggleComponent ? (
					<>
						{toggleComponent()}
						{/* <Icon name={IconType.EpChevronDown} size={12} /> */}
					</>
				) : (
					<Icon
						name={IconType.EpMore}
						color={showTooltip || open ? Colors.blue[100] : Colors.typoPlaceholder}
					/>
				)}
			</DropDownButton>
			{!!tooltip && showTooltip && <Tooltip>{tooltip}</Tooltip>}

			{open && (
				<DropdownMenu position={position} open={open}>
					{renderChildren}
				</DropdownMenu>
			)}
		</DropDownContainer>
	);
}

// File input as Dropdown Item
interface DropdownItemAsFileInputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	children: JSX.Element | JSX.Element[] | any;
	accept: string;
}

const DropdownItemAsFileInput = ({ onChange, children, accept }: DropdownItemAsFileInputProps) => (
	<FileInputLabel onClick={(e: React.MouseEvent<HTMLLabelElement>) => e.stopPropagation()}>
		<FileInput type="file" onChange={onChange} accept={accept} />
		{children}
	</FileInputLabel>
);

Dropdown.Item = DropdownItem;
Dropdown.Title = ButtonTitle;
Dropdown.TitleBold = ButtonTitleBold;
Dropdown.Divider = DropdownDivider;
Dropdown.ItemIcon = DopdownItemIcon;
Dropdown.ItemFileInput = DropdownItemAsFileInput;
