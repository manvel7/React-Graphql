import React from 'react';

import { SwitchContainer, SwitchInput, SwitchLabel, SwitchButton } from './Switch.style';

export enum SwitchSizes {
	SM = 'SM',
	MD = 'MD'
}

interface SwitchProps {
	name?: string;
	className?: string;
	disabled?: boolean;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	size?: SwitchSizes;
}

export function Switch({
	name,
	className,
	disabled = false,
	checked,
	onChange,
	size = SwitchSizes.MD
}: SwitchProps) {
	const onHandleClick = (e: React.MouseEvent) => e.stopPropagation();

	return (
		<SwitchContainer className={className} onClick={onHandleClick}>
			<SwitchLabel checked={checked} disabled={disabled} size={size}>
				<SwitchInput
					name={name}
					type="checkbox"
					disabled={disabled}
					checked={checked}
					onChange={onChange}
				/>
				<SwitchButton checked={checked} size={size} />
			</SwitchLabel>
		</SwitchContainer>
	);
}
