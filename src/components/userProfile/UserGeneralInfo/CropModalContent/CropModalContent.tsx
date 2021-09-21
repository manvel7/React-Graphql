import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../../../helpers';

import {
	CropModalContentWrapper,
	FileInputContainer,
	FileInput,
	FileInputLabel,
	CropContainer,
	ImagePreviewContainer,
	ImagePreviewBlock,
	ImagePreview
} from './CropModalContent.style';
import { LightButton, Icon } from '../../../ui';
import { useAlerts, useTranslation } from '../../../../hooks';
import { IconType } from '../../../../consts';

interface CropModalContentProps {
	getFile: (file: File) => void;
	cropBySquare?: boolean;
}

interface ImageOptions {
	path: string;
	name: string;
	type: string;
}

export function CropModalContent({ getFile, cropBySquare }: CropModalContentProps) {
	const { setError } = useAlerts();
	const translate = useTranslation();

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(2);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [croppedImage, setCroppedImage] = useState<any>(null);
	const [imageOptions, setImageOptions] = useState<ImageOptions | null>(null);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const showCroppedImage = useCallback(async () => {
		try {
			if (!imageOptions) throw new Error();

			const { imgPath: croppedImage, imgFile: blobFile }: any = await getCroppedImg(
				imageOptions.path,
				croppedAreaPixels
			);

			setCroppedImage(croppedImage);

			const croppedImgFile = new File([blobFile], imageOptions.name, {
				lastModified: Date.now(),
				type: imageOptions.type
			});

			getFile(croppedImgFile);
		} catch (e) {
			setError({ message: 'Please try again!' });
		}
	}, [croppedAreaPixels]);

	function handleGetAvatar(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			const imageOptions = {
				name: e.target.files[0].name,
				type: e.target.files[0].type,
				path: URL.createObjectURL(e.target.files[0])
			};

			setImageOptions(imageOptions);
			setCroppedImage(null);
		}
	}

	return (
		<CropModalContentWrapper>
			<FileInputContainer>
				<FileInput
					type="file"
					onChange={handleGetAvatar}
					accept="image/*"
					id="avatarUpload"
				/>
				<FileInputLabel htmlFor="avatarUpload">
					<Icon name={IconType.EpPlus} />
					{translate(({ buttons }) => buttons.upload)}
				</FileInputLabel>
			</FileInputContainer>
			{imageOptions && (
				<>
					<CropContainer>
						<Cropper
							image={imageOptions.path}
							crop={crop}
							zoom={zoom}
							minZoom={0.5}
							maxZoom={8}
							aspect={1/3}
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							cropShape={!cropBySquare ? 'round' : 'rect'}
							showGrid={false}
							cropSize={{ width: 150, height: 150 }}
						/>
					</CropContainer>
					<ImagePreviewContainer>
						<ImagePreviewBlock>
							{croppedImage && (
								<ImagePreview width={150} height={150} src={croppedImage} />
							)}
						</ImagePreviewBlock>

						<LightButton
							title={translate(({ buttons }) => buttons.crop)}
							onClick={showCroppedImage}
						/>
					</ImagePreviewContainer>
				</>
			)}
		</CropModalContentWrapper>
	);
}
