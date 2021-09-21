import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import moment from 'moment';

import { UserAccount } from '@epolitiker/api';

import {
	PageWrapper,
	PageTopBarContainer,
	PageTopBarItem,
	PrimaryButton,
	LightButton,
	PageContainer,
	UserCardContainer,
	UserCardAvatarBlock,
	UserCardInfoBlock,
	UserCardInfoTitle,
	UserCardInfoText,
	PageNavContainer,
	PageNavContent,
	PageNavItem,
	Badge
} from './UserProfile.style';
import {
	ButtonSize,
	GhostButton,
	Avatar,
	AvatarSize,
	Breadcrumbs,
	BadgeTypes
} from '../../components/ui';
import { IconType, StorageKey } from '../../consts';
import {
	useWorkspaceMembersLazyQuery,
	useUpdateUserAccountDetailsMutation,
	useEffectOnce,
	useAlerts,
	useBreadcrumbs,
	useNavigation,
	useTranslation,
	useLocalStorage
} from '../../hooks';
import {
	UserGeneralInfo,
	UserAccountFormValues,
	UserMembership,
	UserSettings
} from '../../components/userProfile';
import { Nullable } from '../../types';

interface IUserContext {
	user: Nullable<UserAccount>;
	setUser: (user: UserAccount) => void;
	formik: any;
}

export const UserContext = createContext<IUserContext>({
	user: null,
	setUser: () => null,
	formik: null
});

export function UserProfilePage() {
	const { id: userId } = useParams();
	const { setNotification } = useAlerts();
	const translate = useTranslation();
	const { setBreadcrumbs } = useBreadcrumbs();
	const { routes } = useNavigation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [user, setUser] = useState<UserAccount | null>(null);
	const [activeTab, setActiveTab] = useState(1);

	const [getWorkspaceMembers, { data: workspaceMembersData }] = useWorkspaceMembersLazyQuery();
	const [
		updateUserAccountDetails,
		{ data: updateUserAccountDetailsData, loading: updateUserAccountDetailsLoading }
	] = useUpdateUserAccountDetailsMutation();

	useEffectOnce(() => {
		handleGetUserDetails();
	});

	useEffect(() => {
		if (user) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.allMembers),
					to: routes.members
				},
				{
					label: `${user.firstName} ${user.lastName}`,
					to: routes.userProfile(user.id)
				},
				{
					label: translate(({ buttons }) => buttons.manageProfile),
					to: routes.userProfile(user.id),
					active: true
				}
			];

			setBreadcrumbs(breadcrumbsData);
		}
	}, [user]);

	const USER_PROFILE_SCHEMA = yup.object().shape({
		firstName: yup.string().required(translate(({ inputs }) => inputs.firstName.required)),
		lastName: yup.string().required(translate(({ inputs }) => inputs.lastName.required)),
		email: yup.string().required(translate(({ inputs }) => inputs.email.required)),
		phoneNumber: yup.string().required(translate(({ inputs }) => inputs.phone.required)),
		personalInfo: yup.string(),
		partyId: yup.string(),
		partyRole: yup.string()
	});

	const userAccoutFormik = useFormik({
		initialValues: {
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			email: user?.email || '',
			phoneNumber: user?.phoneNumber || '',
			personalInfo: user?.personalInfo || '',
			partyId: user?.partyMembership?.party?.id || '',
			partyRole: user?.partyMembership?.role || ''
		},
		validateOnMount: true,
		enableReinitialize: true,
		validationSchema: USER_PROFILE_SCHEMA,
		onSubmit: values => handleUpdateUserAccountDetails(values)
	});

	function handleGetUserDetails() {
		if (activeWorkspace && userId) {
			getWorkspaceMembers({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					},
					where: { id: userId }
				}
			});
		}
	}

	useEffect(() => {
		if (workspaceMembersData) {
			setUser(workspaceMembersData.workspaceDetails.members[0]);
		}
	}, [workspaceMembersData]);

	function handleUpdateUserAccountDetails(userAccountDetails: UserAccountFormValues) {
		const partyMembershipAction = () => {
			let action: any;
			if (user?.partyMembership?.id) {
				action = {
					update: {
						role: userAccountDetails.partyRole,
						party: { connect: { id: userAccountDetails.partyId } }
					}
				};
			} else {
				action = {
					create: {
						role: userAccountDetails.partyRole,
						party: { connect: { id: userAccountDetails.partyId } }
					}
				};
			}
			return action;
		};

		updateUserAccountDetails({
			variables: {
				data: {
					workspaceWhereUniqueInput: { id: activeWorkspace.id },
					userAccountWhereUniqueInput: { id: userId },
					userAccountUpdateInputCustom: {
						email: userAccountDetails.email,
						firstName: userAccountDetails.firstName,
						lastName: userAccountDetails.lastName,
						phoneNumber: userAccountDetails.phoneNumber,
						personalInfo: userAccountDetails.personalInfo,
						...(userAccountDetails.partyRole &&
							userAccountDetails.partyId && {
								partyMembership: partyMembershipAction()
							})
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateUserAccountDetailsData) {
			setNotification({ message: 'User account was updated!' });
			setUser(updateUserAccountDetailsData.updateUserAccountDetails);
		}
	}, [updateUserAccountDetailsData]);

	function getFormatedDate(date: string | undefined) {
		if (date) {
			return moment(new Date(date)).format('l HH:mm');
		}
	}

	const { handleSubmit } = userAccoutFormik;

	return (
		<PageWrapper>
			<PageTopBarContainer>
				<PageTopBarItem>
					<Breadcrumbs />
				</PageTopBarItem>
				<PageTopBarItem>
					<LightButton
						size={ButtonSize.SM}
						title={translate(({ buttons }) => buttons.viewAsRegularUser)}
						leftIcon={IconType.EpEye}
						onClick={() => {}}
					/>
					<PrimaryButton
						size={ButtonSize.SM}
						title={translate(({ buttons }) => buttons.updateProfile)}
						onClick={() => handleSubmit()}
						loading={updateUserAccountDetailsLoading}
						disabled={updateUserAccountDetailsLoading}
					/>
					<GhostButton size={ButtonSize.SM} icon={IconType.EpMore} onClick={() => {}} />
				</PageTopBarItem>
			</PageTopBarContainer>
			<UserCardContainer>
				<UserCardAvatarBlock>
					<Avatar
						size={AvatarSize.XL}
						image={user?.avatar?.url}
						badge={user?.partyMembership?.party?.logo?.url}
					/>
				</UserCardAvatarBlock>
				<UserCardInfoBlock>
					<UserCardInfoTitle>{`${user?.firstName} ${user?.lastName}`}</UserCardInfoTitle>

					{!user?.active && (
						<Badge title={'Pending invitation'} type={BadgeTypes.Warning} />
					)}

					<UserCardInfoText>
						{`${translate(({ titles }) => titles.userAdded)}  ${getFormatedDate(
							user?.createdAt
						)}`}
					</UserCardInfoText>
					<UserCardInfoText>
						{`${translate(({ titles }) => titles.lastUserActivity)} ${getFormatedDate(
							user?.updatedAt
						)}`}
					</UserCardInfoText>
					<UserCardInfoText>
						{`${translate(
							({ titles }) => titles.lastProfileUpdated
						)}  ${getFormatedDate(user?.updatedAt)}`}
					</UserCardInfoText>
				</UserCardInfoBlock>
			</UserCardContainer>
			<PageContainer>
				<PageNavContainer>
					<PageNavItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
						{translate(({ tabs }) => tabs.general)}
					</PageNavItem>
					<PageNavItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
						{translate(({ tabs }) => tabs.membership)}
					</PageNavItem>
					<PageNavItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
						{translate(({ tabs }) => tabs.accountSettings)}
					</PageNavItem>
					<PageNavItem active={activeTab === 4} onClick={() => setActiveTab(4)}>
						{translate(({ tabs }) => tabs.attendanceHistory)}
					</PageNavItem>
				</PageNavContainer>

				<UserContext.Provider value={{ user, setUser, formik: userAccoutFormik }}>
					<PageNavContent>
						{activeTab === 1 && (
							<UserGeneralInfo
								updateLoading={updateUserAccountDetailsLoading}
								formik={userAccoutFormik}
							/>
						)}
						{activeTab === 2 && <UserMembership />}
						{activeTab === 3 && <UserSettings />}
						{activeTab === 4 && ''}
					</PageNavContent>
				</UserContext.Provider>
			</PageContainer>
		</PageWrapper>
	);
}
