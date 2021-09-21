import React, { useState, createContext, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Committee } from '@epolitiker/api';

import {
	CommiteeSettingsPageContainer,
	NavTabsBlock,
	NavTab,
	NavLink,
	CommitteeDetailsContainer,
	PageTopBar,
	PageTopBarItem,
	PrimaryButton
} from './CommitteesSettingsPage.style';

import {
	useNavigation,
	useAlerts,
	useEffectOnce,
	useBreadcrumbs,
	useTranslation,
	useCommitteeDetailsLazyQuery,
	useUpdateCommitteeDetailsMutation
} from '../../hooks';
import {
	CommitteeSettingsGeneral,
	CommitteeSettingsVisibility,
	CommitteeSettingsInvitations,
	CommitteeSettingsStructure,
	CommitteeSettingsFormValue,
	CommitteeRestSettings
} from '../../components/committeeSettings';
import { Nullable } from '../../types';
import { Breadcrumbs, ButtonSize, Dropdown, PageTitlePanel } from '../../components/ui';

enum CommitteeSettingsRoutes {
	General = '/committee-settings/:id',
	VisibilityAndAccess = '/committee-settings/:id/visibility-and-access',
	Invitations = '/committee-settings/:id/invitations',
	StructureAndView = '/committee-settings/:id/structure-and-view'
}

interface ICommitteeContext {
	committee: Nullable<Committee>;
	formik: any;
	setCommitteeRestGeneralSettings: React.Dispatch<React.SetStateAction<CommitteeRestSettings>>;
	committeeRestGeneralSettings: CommitteeRestSettings;
}

export const CommitteeSettingsContext = createContext<ICommitteeContext>({
	committee: null,
	formik: null,
	setCommitteeRestGeneralSettings: () => null,
	committeeRestGeneralSettings: {}
});

export const CommitteesSettingsPage = () => {
	const { id: committeeId }: { id?: string | undefined } = useParams();
	const { setError, setNotification } = useAlerts();
	const { routes, navigate } = useNavigation();
	const { setBreadcrumbs } = useBreadcrumbs();
	const translate = useTranslation();

	const [committeeDetails, setCommitteeDetails] = useState<Nullable<Committee>>(null);

	const [committeeRestGeneralSettings, setCommitteeRestGeneralSettings] = useState<
		CommitteeRestSettings
	>({
		defaultLanguage: committeeDetails?.defaultLanguage,
		timezone: committeeDetails?.timezone
	});

	const [
		getCommitteeDetailes,
		{ data: getCommitteeDetailesData }
	] = useCommitteeDetailsLazyQuery();

	const [
		updateCommitteeDetails,
		{ data: updateCommitteeDetailsData, loading: updateCommitteeDetailsLoading }
	] = useUpdateCommitteeDetailsMutation();

	if (committeeId == undefined) {
		navigate(routes.committees);
		setError({ message: 'Commitee Settings Page not found' });
		return null;
	}

	const tabsData = [
		{
			title: translate(({ tabs }) => tabs.general),
			path: routes.committeeSettingsGeneral(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.visibilityAndAccess),
			path: routes.committeeSettingsVisibilityAndAccess(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.invitations),
			path: routes.committeeSettingsInvitations(committeeId)
		},
		{
			title: translate(({ tabs }) => tabs.structureAndView),
			path: routes.committeeSettingsStructureAndView(committeeId)
		}
	];

	const UPDATE_COMMITTEE_DETAILS_SCHEMA = yup.object().shape({
		label: yup.string().required(translate(({ inputs }) => inputs.name.required)),
		description: yup.string()
	});

	const committeeSettingsFormik = useFormik({
		initialValues: {
			label: committeeDetails?.label || '',
			description: committeeDetails?.description || ''
		},
		validateOnMount: false,
		enableReinitialize: true,
		validationSchema: UPDATE_COMMITTEE_DETAILS_SCHEMA,
		onSubmit: values => handleUpdateCommitteeSettings(values, committeeRestGeneralSettings)
	});

	const { handleSubmit, isValid } = committeeSettingsFormik;

	useEffectOnce(() => {
		handleGetCommitteeSettings();
	});

	useEffect(() => {
		if (committeeDetails) {
			const breadcrumbsData = [
				{
					label: translate(({ titles }) => titles.committees),
					to: routes.committees,
					active: false
				},
				{
					label: committeeDetails.label,
					to: routes.committeeOverview(committeeId),
					active: false
				},
				{
					label: translate(({ titles }) => titles.settings),
					to: routes.committeeSettingsGeneral(committeeId),
					active: false
				}
			];
			setBreadcrumbs(breadcrumbsData);
		}
	}, [committeeDetails]);

	function handleGetCommitteeSettings() {
		getCommitteeDetailes({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: committeeId
					}
				}
			}
		});
	}

	useEffect(() => {
		if (getCommitteeDetailesData) {
			setCommitteeDetails(getCommitteeDetailesData.committeeDetails);
		}
	}, [getCommitteeDetailesData]);

	function handleUpdateCommitteeSettings(
		newValues: CommitteeSettingsFormValue,
		restNewValues: CommitteeRestSettings
	) {
		updateCommitteeDetails({
			variables: {
				data: {
					committeeWhereUniqueInput: { id: committeeId },
					committeeDetailsInput: {
						label: newValues.label,
						description: newValues.description,
						defaultLanguage:
							committeeDetails?.defaultLanguage !== restNewValues?.defaultLanguage
								? restNewValues?.defaultLanguage
								: undefined,
						timezone:
							committeeDetails?.timezone !== restNewValues.timezone
								? restNewValues.timezone
								: undefined
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateCommitteeDetailsData) {
			setNotification({ message: 'Committee updated successfully!' });
		}
	}, [updateCommitteeDetailsData]);

	return (
		<CommiteeSettingsPageContainer>
			<PageTopBar>
				<PageTopBarItem>
					<Breadcrumbs />
				</PageTopBarItem>
				<PageTopBarItem>
					<PrimaryButton
						title={translate(({ buttons }) => buttons.saveChanges)}
						size={ButtonSize.SM}
						onClick={handleSubmit}
						loading={updateCommitteeDetailsLoading}
						disabled={!isValid || updateCommitteeDetailsLoading}
					/>
					<Dropdown>
						<Dropdown.Item onClick={() => {}}>Action 1</Dropdown.Item>
						<Dropdown.Item onClick={() => {}}>Action 2</Dropdown.Item>
					</Dropdown>
				</PageTopBarItem>
			</PageTopBar>
			<PageTitlePanel title={translate(({ titles }) => titles.committeeSettings)} />
			<NavTabsBlock>
				{tabsData.map((tab, index) => (
					<NavTab key={`committee-tab-${index}`}>
						<NavLink exact to={tab.path}>
							{tab.title}
						</NavLink>
					</NavTab>
				))}
			</NavTabsBlock>
			{committeeDetails && (
				<CommitteeSettingsContext.Provider
					value={{
						committee: committeeDetails,
						formik: committeeSettingsFormik,
						setCommitteeRestGeneralSettings: setCommitteeRestGeneralSettings,
						committeeRestGeneralSettings: committeeRestGeneralSettings
					}}
				>
					<CommitteeDetailsContainer>
						<Route
							exact
							guarded
							path={CommitteeSettingsRoutes.General}
							component={CommitteeSettingsGeneral}
						/>
						<Route
							exact
							guarded
							path={CommitteeSettingsRoutes.VisibilityAndAccess}
							component={CommitteeSettingsVisibility}
						/>
						<Route
							exact
							guarded
							path={CommitteeSettingsRoutes.Invitations}
							component={CommitteeSettingsInvitations}
						/>
						<Route
							exact
							guarded
							path={CommitteeSettingsRoutes.StructureAndView}
							component={CommitteeSettingsStructure}
						/>
					</CommitteeDetailsContainer>
				</CommitteeSettingsContext.Provider>
			)}
		</CommiteeSettingsPageContainer>
	);
};
