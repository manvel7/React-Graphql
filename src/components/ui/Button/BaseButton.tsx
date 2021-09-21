import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { Icon } from '../';
import { RequireOnlyOne } from '../../../types';

import { Button, Title, Loader, ButtonContainer, Tooltip } from './BaseButton.style';

export enum ButtonSize {
	SM = 28,
	MD = 32,
	LG = 40,
	XL = 48
}

interface TypeProps {
	title?: string;
	icon?: string;
}

export enum ButtonTypes {
	Button = 'button',
	Submit = 'submit',
	Reset = 'reset'
}

interface BaseProps {
	className?: string;
	tooltip?: string;
	type?: ButtonTypes;
	disabled?: boolean;
	width?: number;
	size?: ButtonSize;
	loading?: boolean;
	rounded?: boolean;
	floating?: boolean;
	leftIcon?: string;
	leftIconSize?: number;
	rightIcon?: string;
	rightIconSize?: number;
	onClick: (e: any) => void;
}

interface StyleProps {
	iconSize?: number;
	color?: string;
	backgroundColor?: string;
	borderColor?: string;
	hoverColor?: string;
	hoverBackgroundColor?: string;
	hoverBorderColor?: string;
}

export type ButtonProps = BaseProps & RequireOnlyOne<TypeProps> & StyleProps;

export function BaseButton({
	className,
	type = ButtonTypes.Submit,
	title,
	tooltip,
	icon,
	width,
	loading = false,
	disabled = false,
	color,
	backgroundColor,
	borderColor,
	hoverColor,
	hoverBackgroundColor,
	hoverBorderColor,
	rounded = false,
	floating = false,
	size = ButtonSize.MD,
	iconSize = 15,
	leftIcon,
	leftIconSize = iconSize,
	rightIcon,
	rightIconSize = iconSize,
	onClick
}: ButtonProps) {
	const [showTooltip, setShowTooltip] = useState(false);

	if (icon) {
		return (
			<ButtonContainer
				className={className}
				onMouseOver={() => setShowTooltip(true)}
				onMouseOut={() => setShowTooltip(false)}
			>
				<Button
					type={type}
					theme={{
						backgroundColor,
						color,
						borderColor,
						hoverColor,
						hoverBackgroundColor,
						hoverBorderColor
					}}
					disabled={disabled}
					rounded={rounded}
					floating={floating}
					width={size}
					height={size}
					onClick={onClick}
				>
					<Icon name={icon} size={iconSize} color={showTooltip ? hoverColor : color} />
				</Button>
				{!!tooltip && showTooltip && <Tooltip>{tooltip}</Tooltip>}
			</ButtonContainer>
		);
	}

	return (
		<ButtonContainer
			className={className}
			onMouseOver={() => setShowTooltip(true)}
			onMouseOut={() => setShowTooltip(false)}
		>
			<Button
				type={type}
				theme={{
					backgroundColor,
					color,
					borderColor,
					hoverColor,
					hoverBackgroundColor,
					hoverBorderColor
				}}
				disabled={disabled}
				rounded={rounded}
				floating={floating}
				width={width}
				height={size}
				onClick={onClick}
			>
				{leftIcon && (
					<Icon
						name={leftIcon}
						size={leftIconSize}
						color={showTooltip ? hoverColor : color}
					/>
				)}
				<Title isLoading={loading} leftIcon={leftIcon} rightIcon={rightIcon}>
					{title}
				</Title>
				<Loader>
					<ClipLoader size={iconSize} color={color} loading={loading} />
				</Loader>
				{rightIcon && (
					<Icon
						name={rightIcon}
						size={rightIconSize}
						color={showTooltip ? hoverColor : color}
					/>
				)}
			</Button>
			{!!tooltip && showTooltip && <Tooltip>{tooltip}</Tooltip>}
		</ButtonContainer>
	);
}
