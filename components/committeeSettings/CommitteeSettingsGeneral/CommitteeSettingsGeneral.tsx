import React, { useContext, useState, useEffect, useRef } from 'react';

import { useTranslation, useDeleteCommitteeMutation, useNavigation } from '../../../hooks';
import { CommitteeMemberRole } from '@epolitiker/api/dist/generated';
import { UserAccount } from '@epolitiker/api';

import {
	GeneralContent,
	FormItem,
	Form,
	Input,
	GeneralSubTitle,
	ComponentBlock,
	PageTitle,
	PageTypoText,
	CommitteeAdminsBlock,
	PrimaryButton,
	AdminList,
	MemberDefaultCard
} from './CommitteeSettingsGeneral.style';

import { GhostButton, DangerButton, ButtonSize } from '../../ui';
import { IconType } from '../../../consts';
import { CommitteeSettingsContext } from '../../../pages';
import { CommitteeMember } from '@epolitiker/api';
import { AddCommiteeMembersModal } from '../../modals/AddCommiteeMembersModal';
import { CommitteeContext } from '../../../pages';
import { ConfirmDeletionModal } from '../../modals/ConfirmDeletionModal/index';
import { TimeZoneDropdown } from './TimeZoneDropdown';
import { LanguageDropdown } from './LanguageDropdown/';
export interface CommitteeSettingsFormValue {
	label: string;
	description: string;
}
export interface CommitteeRestSettings {
	defaultLanguage?: string;
	timezone?: string;
}

export const CommitteeSettingsGeneral = () => {
	const translate = useTranslation();
	const {
		committee,
		formik,
		setCommitteeRestGeneralSettings,
		committeeRestGeneralSettings
	} = useContext(CommitteeSettingsContext);
	const [openDeleteCommitteeModal, setOpenDeleteCommitteeModal] = useState(false);
	const [deleteCommittee, { loading: isDeletionLoading }] = useDeleteCommitteeMutation();
	const { routes, navigate } = useNavigation();
	const isMount = useRef(false);
	const { values, touched, handleChange, errors, handleBlur, handleSubmit } = formik;
	const [openAddCommitteeMemberModal, setOpenAddCommitteeMemberModal] = useState(false);
	const [newMemberRole, setNewMemberRole] = useState<CommitteeMemberRole>('ADMIN');

	function handleGetAdminNames(committeeMembers: CommitteeMember[] | undefined) {
		if (committeeMembers) {
			const admins = committeeMembers.filter(member => member.role === 'ADMIN');
			if (admins.length > 0) {
				const adminInfo = admins.map(
					admin => `${admin.user.firstName} ${admin.user.lastName}`
				);
				return adminInfo.join(', ');
			} else {
				return translate(({ titles }) => titles.NoCommitteeAdmins);
			}
		} else {
			return translate(({ titles }) => titles.NoCommitteeMembers);
		}
	}

	function handleDeleteCommitteeModalOpen() {
		setOpenDeleteCommitteeModal(true);
	}

	function handleDeleteCommittee(id: string) {
		deleteCommittee({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id
					}
				}
			}
		});
	}

	function handleOpenAddCommitteeMemberModal(newMemberRole: CommitteeMemberRole) {
		setNewMemberRole(newMemberRole);
		setOpenAddCommitteeMemberModal(true);
	}

	useEffect(() => {
		if (!isDeletionLoading && isMount.current) {
			navigate(routes.committees);
		} else {
			isMount.current = true;
		}
	}, [isDeletionLoading]);

	useEffect(() => {
		return () => {
			isMount.current = false;
		};
	}, []);

	function handleLanguageChange(language: string) {
		setCommitteeRestGeneralSettings(prevValue => ({
			...prevValue,
			defaultLanguage: language
		}));
	}

	function handleTimezoneChange(timezone: string) {
		setCommitteeRestGeneralSettings(prevValue => ({ ...prevValue, timezone }));
	}

	return (
		<GeneralContent>
			<GeneralSubTitle>{translate(({ titles }) => titles.generalInfo)}</GeneralSubTitle>
			<Form onSubmit={handleSubmit}>
				<FormItem>
					<Input
						label={translate(({ inputs }) => inputs.name.label)}
						placeholder={translate(({ inputs }) => inputs.name.placeholder)}
						name="label"
						onChange={handleChange}
						value={values.label}
						error={touched.label ? errors.label : undefined}
						onBlur={handleBlur}
					/>
				</FormItem>
				<FormItem>
					<Input
						label={translate(({ inputs }) => inputs.description.label)}
						placeholder={translate(({ inputs }) => inputs.description.placeholder)}
						name="description"
						onChange={handleChange}
						value={values.description}
						error={touched.description ? errors.description : undefined}
						onBlur={handleBlur}
					/>
				</FormItem>
			</Form>
			<ComponentBlock>
				<GeneralSubTitle>
					{translate(({ titles }) => titles.committeeLeaders)}
				</GeneralSubTitle>
				<AdminList>
					{committee?.members &&
						committee.members.length > 0 &&
						committee.members.map(
							({ user, role }: { user: UserAccount; role: CommitteeMemberRole }) =>
								role === 'LEADER' && (
									<MemberDefaultCard
										key={user.id}
										member={user}
										onClick={() => {}}
									/>
								)
						)}
				</AdminList>
				<GhostButton
					title={translate(({ buttons }) => buttons.addMember)}
					leftIcon={IconType.EpPlus}
					onClick={() => handleOpenAddCommitteeMemberModal('LEADER')}
				/>
				<CommitteeContext.Provider value={{ committee: committee }}>
					<AddCommiteeMembersModal
						openAddCommitteeMemberModal={openAddCommitteeMemberModal}
						setOpenAddCommitteeMemberModal={setOpenAddCommitteeMemberModal}
						newMemberRole={newMemberRole}
					/>
				</CommitteeContext.Provider>
			</ComponentBlock>

			<CommitteeAdminsBlock>
				<PageTitle>{translate(({ titles }) => titles.committeesAdmins)}</PageTitle>
				<PageTypoText>
					{translate(({ titles }) => titles.workspaceDefaultLanguageText)}
				</PageTypoText>
				<PageTypoText>{handleGetAdminNames(committee?.members)}</PageTypoText>
				<PrimaryButton
					title={translate(({ buttons }) => buttons.EditListOfAdmins)}
					size={ButtonSize.SM}
					onClick={() => handleOpenAddCommitteeMemberModal('ADMIN')}
				/>
			</CommitteeAdminsBlock>
			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.timeZone)}</PageTitle>
				<PageTypoText>{translate(({ titles }) => titles.timeZoneText)}</PageTypoText>
				<TimeZoneDropdown
					timeZoneValue={
						committeeRestGeneralSettings?.timezone
							? committeeRestGeneralSettings?.timezone
							: committee?.timezone
					}
					handleTimezoneChange={handleTimezoneChange}
				/>
			</ComponentBlock>
			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.committeeLaguage)}</PageTitle>
				<PageTypoText>
					{translate(({ titles }) => titles.workspaceDefaultLanguageText)}
				</PageTypoText>
				<LanguageDropdown
					languageValue={
						committeeRestGeneralSettings?.defaultLanguage
							? committeeRestGeneralSettings?.defaultLanguage
							: committee?.defaultLanguage
					}
					handleLanguageChange={handleLanguageChange}
				/>
			</ComponentBlock>
			<ComponentBlock>
				<PageTitle>{translate(({ titles }) => titles.deleteCommittee)}</PageTitle>
				<PageTypoText>{translate(({ titles }) => titles.deleteWorkspaceText)}</PageTypoText>
				<PageTypoText>
					{translate(({ titles }) => titles.deleteConfirmQuestion)}
				</PageTypoText>
				<DangerButton
					leftIcon={IconType.EpTrash}
					title={translate(({ buttons }) => buttons.delete)}
					onClick={handleDeleteCommitteeModalOpen}
				/>
				<ConfirmDeletionModal
					openConfirmDeletionModal={openDeleteCommitteeModal}
					setOpenConfirmDeletionModal={setOpenDeleteCommitteeModal}
					entityToDelete={committee}
					handleDelete={handleDeleteCommittee}
				/>
			</ComponentBlock>
		</GeneralContent>
	);
};
