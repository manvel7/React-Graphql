import React from 'react';

import {
	UploadFileContent,
	UploadFileTitle,
	UploadFileSize,
	Progressbar,
	ProgressbarItem,
	CardContent
} from './UploadFileCard.style';

import { GhostButton, Icon, ButtonSize } from '../../ui';
import { FileMaxSize, IconType } from '../../../consts';

interface UploadFileCardProps {
	file: File;
	handleUploadMore: () => void;
}

export function UploadFileCard({ file, handleUploadMore }: UploadFileCardProps) {
	const getFileConvertSize = (size: number) => (size / 1e6).toFixed(2);

	const getFileProgressPercent = (size: number | undefined): number => {
		if (size && size > 0) {
			return (size / FileMaxSize.Size) * 100;
		} else {
			return 0;
		}
	};

	return (
		<UploadFileContent>
			<CardContent>
				<Icon name={IconType.EpDoc} />
				<UploadFileTitle>{file.name}</UploadFileTitle>
			</CardContent>
			<UploadFileSize>{file.size && getFileConvertSize(file.size) + ' MB'}</UploadFileSize>
			<Progressbar>
				<ProgressbarItem width={getFileProgressPercent(file.size)} />
			</Progressbar>
			<GhostButton icon={IconType.EpTimes} size={ButtonSize.SM} onClick={handleUploadMore} />
		</UploadFileContent>
	);
}
