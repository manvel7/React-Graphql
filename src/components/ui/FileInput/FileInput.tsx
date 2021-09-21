import React from 'react';

import { FileInputLabel, Input, Toggler } from './FileInput.style';

interface FileInputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	children: JSX.Element | JSX.Element[] | any;
	accept: string;
}

export function FileInput({ onChange, children, accept }: FileInputProps) {
	return (
		<FileInputLabel>
			<Toggler />
			<Input type="file" onChange={onChange} accept={accept} />
			{children}
		</FileInputLabel>
	);
}
