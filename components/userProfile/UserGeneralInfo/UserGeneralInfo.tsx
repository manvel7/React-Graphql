import React, { useEffect, useContext, useState } from 'react';
import { FormikProps } from 'formik';

import {
	PageContainer,
	PageTitle,
	UploadImageBlock,
	ImageContent,
	UserImage,
	LightButton,
	UserAccoutGeneralInfoForm,
	FormItem,
	FormItemIconBlock,
	Input,
	Textarea,
	UpdateButtonContainer
} from './UserGeneralInfo.style';
import { GhostButton, Icon, PrimaryButton, ButtonSize, Modal } from '../../ui';
import { IconType, StorageKey } from '../../../consts';
import { Colors, Images } from '../../../environment';
import { useAddOrRemoveUserAvatar, useTranslation, useLocalStorage } from '../../../hooks';
import { UserContext } from '../../../pages';
import { ModalSizes } from '../../ui/Modal/Modal';
import { CropModalContent } from './CropModalContent';

export interface UserAccountFormValues {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	personalInfo: string;
	partyId: string;
	partyRole: string;
}

interface UserGeneralInfoProps {
	updateLoading: boolean;
	formik: FormikProps<UserAccountFormValues>;
}

export function UserGeneralInfo({
	updateLoading,
	formik: { values, handleChange, handleSubmit, errors, touched, handleBlur }
}: UserGeneralInfoProps) {
	const { user, setUser } = useContext(UserContext);
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [showAvatarCropModal, setShowAvatarCropModal] = useState(false);

	const [
		addUserAvatar,
		{ data: addUserAvatarData, loading: addUserAvatarLoading }
	] = useAddOrRemoveUserAvatar();
	const [
		removeUserAvatar,
		{ data: removeUserAvatarData, loading: removeUserAvatarLoading }
	] = useAddOrRemoveUserAvatar();

	function handleAddUserAvatar() {
		if (avatarFile && activeWorkspace) {
			addUserAvatar({
				variables: {
					data: {
						avatar: avatarFile,
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						userAccountWhereUniqueInput: { id: user?.id },
						isRemove: false
					}
				}
			});
		}
	}

	useEffect(() => {
		if (addUserAvatarData) {
			setUser(addUserAvatarData.addOrRemoveUserAvatar);
			setAvatarFile(null);
			handleCloseModal();
		}
	}, [addUserAvatarData]);

	function handleRemoveUserAvatar() {
		removeUserAvatar({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: activeWorkspace.id },
					userAccountWhereUniqueInput: { id: user?.id },
					isRemove: true
				}
			}
		});
	}

	useEffect(() => {
		if (removeUserAvatarData) {
			setUser(removeUserAvatarData.addOrRemoveUserAvatar);
		}
	}, [removeUserAvatarData]);

	function handleOpenModal() {
		setShowAvatarCropModal(true);
	}

	function handleCloseModal() {
		setShowAvatarCropModal(false);
	}

	function handleGetAvatarFile(file: File) {
		setAvatarFile(file);
	}

	return (
		<PageContainer>
			<Modal
				title={translate(({ buttons }) => buttons.upload)}
				open={showAvatarCropModal}
				onClose={handleCloseModal}
				size={ModalSizes.SM}
			>
				<Modal.Body>
					<CropModalContent getFile={handleGetAvatarFile} />
				</Modal.Body>
				<Modal.Footer>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.upload)}
						onClick={handleAddUserAvatar}
						loading={addUserAvatarLoading}
						disabled={!avatarFile || addUserAvatarLoading}
					/>
				</Modal.Footer>
			</Modal>

			<PageTitle>{translate(({ titles }) => titles.generalInformation)}</PageTitle>
			<UploadImageBlock>
				<ImageContent>
					<UserImage src={user && user.avatar ? user.avatar.url : Images.avatar} />
				</ImageContent>
				<LightButton
					leftIcon={IconType.EpArrowUp}
					title={translate(({ buttons }) => buttons.uploadNew)}
					onClick={handleOpenModal}
				/>
				<GhostButton
					leftIcon={IconType.EpTrash}
					title={translate(({ buttons }) => buttons.remove)}
					onClick={handleRemoveUserAvatar}
					loading={removeUserAvatarLoading}
					disabled={removeUserAvatarLoading || !user?.avatar}
				/>
			</UploadImageBlock>
			<UserAccoutGeneralInfoForm onSubmit={handleSubmit}>
				<FormItem>
					<FormItemIconBlock>
						<Icon name={IconType.EpMembers} color={Colors.neutralBlue[100]} />
					</FormItemIconBlock>
					<Input
						label={translate(({ inputs }) => inputs.firstName.label)}
						placeholder={translate(({ inputs }) => inputs.firstName.placeholder)}
						name="firstName"
						value={values.firstName}
						onChange={handleChange}
						error={touched.firstName ? errors.firstName : undefined}
						onBlur={handleBlur}
					/>
					<Input
						label={translate(({ inputs }) => inputs.lastName.label)}
						placeholder={translate(({ inputs }) => inputs.lastName.placeholder)}
						name="lastName"
						value={values.lastName}
						onChange={handleChange}
						error={touched.lastName ? errors.lastName : undefined}
						onBlur={handleBlur}
					/>
				</FormItem>
				<FormItem>
					<FormItemIconBlock>
						<Icon name={IconType.EpMail} color={Colors.neutralBlue[100]} />
					</FormItemIconBlock>
					<Input
						label={translate(({ inputs }) => inputs.email.label)}
						placeholder={translate(({ inputs }) => inputs.email.placeholder)}
						name="email"
						value={values.email}
						onChange={handleChange}
						error={touched.email ? errors.email : undefined}
						onBlur={handleBlur}
					/>
					<Input
						label={translate(({ inputs }) => inputs.phone.label)}
						placeholder={translate(({ inputs }) => inputs.phone.placeholder)}
						name="phoneNumber"
						value={values.phoneNumber}
						onChange={handleChange}
						error={touched.phoneNumber ? errors.phoneNumber : undefined}
						onBlur={handleBlur}
					/>
				</FormItem>
				<FormItem>
					<FormItemIconBlock>
						<Icon name={IconType.EpText} color={Colors.neutralBlue[100]} />
					</FormItemIconBlock>
					<Textarea
						rows={3}
						label={translate(({ inputs }) => inputs.personalInformation.label)}
						placeholder={translate(
							({ inputs }) => inputs.personalInformation.placeholder
						)}
						name="personalInfo"
						value={values.personalInfo}
						onChange={handleChange}
						error={touched.personalInfo ? errors.personalInfo : undefined}
						onBlur={handleBlur}
					/>
				</FormItem>
				{(touched.firstName ||
					touched.lastName ||
					touched.email ||
					touched.phoneNumber ||
					touched.personalInfo) && (
					<FormItem>
						<UpdateButtonContainer>
							<PrimaryButton
								title={translate(({ buttons }) => buttons.updateProfile)}
								onClick={handleSubmit}
								size={ButtonSize.LG}
								loading={updateLoading}
								disabled={updateLoading}
							/>
						</UpdateButtonContainer>
					</FormItem>
				)}
			</UserAccoutGeneralInfoForm>
		</PageContainer>
	);
}
