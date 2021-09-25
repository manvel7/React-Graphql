import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Meeting, MeetingDates } from '@epolitiker/api';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
	PageWrapper,
	PageContainer,
	PageMainContent,
	PageSidebar,
	PageNavContainer,
	PageNavItem,
	PageSidebarIconsBlock,
	PageNavContent,
	NexSteptButtonContainer,
	NextStepButton,
	NextStepButtonText,
	NextStepMutedText,
	Badge
} from './CreateOrEditMeetingPage.style';
import {
	getEmptyMeetingLabel,
	IReminder,
	ReminderTypes,
	ReminderFrequencies,
	ReminderFrequencyTypes
} from './CreateOrEditMeetingPage.helpers';
import { Icon, BadgeTypes } from '../../components/ui';
import { IconType } from '../../consts';
import {
	MeetingSetup,
	MeetingSetupFormValues,
	MembersAndGuests,
	RelatedItems,
	MeetingAgenda,
	MeetingRequests,
	CreateOrEditMeetingPageTopBar
} from '../../components/createOrEditMeeting';
import {
	useAddMeetingInCommitteeMutation,
	useUpdateMeetingDetailsMutation,
	useAlerts,
	useMeetingDetailsLazyQuery,
	useEffectOnce,
	useNavigation,
	useUpdateCommitteeDetailsMutation,
	useTranslation,
	useIsAdmin
} from '../../hooks';

const meetingRemindersInitialState: IReminder[] = [
	{
		type: ReminderTypes.EMAIL,
		frequency: ReminderFrequencies.BEFORE_1,
		frequencyType: ReminderFrequencyTypes.HOUR
	}
];

export function CreateOrEditMeetingPage() {
	const { committeeId, meetingId } = useParams();
	const { navigate, routes } = useNavigation();
	const { setNotification } = useAlerts();
	const translate = useTranslation();
	const isAdmin = useIsAdmin();
	const [activeTab, setActiveTab] = useState(1);
	const [submitFromOutside, setSubmitFromOutside] = useState(false);
	const [meetingDetails, setMeetingDetails] = useState<Meeting | null>(null);
	const [isEditMode, setIsEditMode] = useState<boolean | undefined>(undefined);

	const [getMeetingDetails, { data: meetingDetailsData }] = useMeetingDetailsLazyQuery();
	const [
		addMeetingInCommittee,
		{ data: addMeetingInCommitteeData, loading: addMeetingInCommitteeLoading }
	] = useAddMeetingInCommitteeMutation();
	const [
		updateMeetingDetails,
		{ data: updateMeetingDetailsData, loading: updateMeetingDetailsLoading }
	] = useUpdateMeetingDetailsMutation();

	const [
		updateCommitteeDetails,
		{ data: updateCommitteeDetailsData }
	] = useUpdateCommitteeDetailsMutation();

	useEffectOnce(() => {
		if (committeeId && meetingId) {
			handleGetMeetingDetails(committeeId, meetingId);
		} else {
			setIsEditMode(false);
		}
	});

	//Meeting setup form schema
	const MEETING_SETUP_SCHEMA = yup.object().shape({
		label: yup.string(),
		location: yup.string().required(translate(({ inputs }) => inputs.location.invalid)),
		committeeId: yup.string().required(translate(({ inputs }) => inputs.committee.required)),
		committeeLabel: yup.string(),
		description: yup.string(),
		isRemote: yup.boolean(),
		eventPreviewCounter: yup.boolean(),
		deputyAutoReplace: yup.boolean(),
		dates: yup.array().of(
			yup.object().shape({
				id: yup.string(),
				startDate: yup.date().min(new Date(Date.now())),
				endDate: yup.date().when('startDate', (st: Date) => yup.date().min(st))
			})
		),
		reminders: yup.array().of(
			yup.object().shape({
				id: yup.string(),
				type: yup.string().required(),
				frequency: yup.string().required(),
				frequencyType: yup.string().required()
			})
		)
	});

	const getIntialStartDate = useCallback(() => {
		const dateNow = new Date();
		const minutesMultipier = Math.ceil(dateNow.getMinutes() / 15);
		return dateNow.setMinutes(15 * minutesMultipier);
	}, []);

	const meetingDatesInitialState = useMemo(
		() => [
			{
				startDate: new Date(getIntialStartDate()),
				endDate: new Date(getIntialStartDate() + 3600000)
			}
		],
		[]
	);

	const meetingSetupFormik = useFormik({
		initialValues: {
			id: meetingDetails?.id || '',
			label: meetingDetails?.label || '',
			location: meetingDetails?.location || '',
			committeeId: meetingDetails?.committee.id || '',
			committeeLabel: meetingDetails?.committee.label || '',
			description: meetingDetails?.description || '',
			isRemote: meetingDetails?.isRemote || false,
			eventPreviewCounter: meetingDetails?.eventPreviewCounter || false,
			deputyAutoReplace: meetingDetails?.deputyAutoReplace || false,
			dates: meetingDetails ? meetingDetails.dates : meetingDatesInitialState,
			reminders: meetingDetails ? meetingDetails.reminders : meetingRemindersInitialState
		},
		validateOnMount: true,
		enableReinitialize: true,
		validationSchema: MEETING_SETUP_SCHEMA,
		onSubmit: () => {}
	});

	// GET Meeting details
	function handleGetMeetingDetails(committeeId: string, meetingId: string) {
		getMeetingDetails({
			variables: {
				data: {
					committeeWhereUniqueInput: {
						id: committeeId
					}
				},
				where: {
					id: meetingId
				}
			}
		});
	}

	useEffect(() => {
		if (meetingDetailsData) {
			setMeetingDetails(meetingDetailsData.committeeDetails.meetings[0]);
			setIsEditMode(true);
		}
	}, [meetingDetailsData]);

	//Submit Create or Edit meeting form
	function handleSubmitForm(newMeetingData: MeetingSetupFormValues) {
		if (isEditMode) {
			handleUpdateMeetingDetals(newMeetingData);
		} else {
			handleAddMeeting(newMeetingData);
		}
	}

	// Create Meeting
	function handleAddMeeting(newMeetingData: MeetingSetupFormValues) {
		const dates = [...newMeetingData.dates];
		const datesToCreate = dates.map((date, i) => {
			return {
				startDate: i === 0 ? new Date(Date.parse(date.startDate)) : date.startDate,
				endDate: date.endDate
			};
		});

		addMeetingInCommittee({
			variables: {
				data: {
					committeeInput: {
						id: newMeetingData.committeeId
					},
					meetingInput: {
						label: newMeetingData.label || getEmptyMeetingLabel(newMeetingData),
						description: newMeetingData.description,
						location: newMeetingData.location,
						isRemote: newMeetingData.isRemote,
						eventPreviewCounter: newMeetingData.eventPreviewCounter,
						deputyAutoReplace: newMeetingData.deputyAutoReplace,
						dates: {
							create: datesToCreate
						},
						reminders: {
							create: newMeetingData.reminders
						}
					}
				}
			}
		});
	}

	useEffect(() => {
		if (addMeetingInCommitteeData) {
			const newMeeting = addMeetingInCommitteeData.addMeetingInCommittee;
			setNotification({ message: 'Meeting created successfully!' });
			navigate(routes.updateMeetingDetils(newMeeting?.committee?.id, newMeeting.id));
		}
	}, [addMeetingInCommitteeData]);

	// Update meeting
	function handleUpdateMeetingDetals(newMeetingData: MeetingSetupFormValues) {
		const datesToCreate: any = [];
		newMeetingData.dates.forEach((date: MeetingDates) => {
			if (!date.id) {
				const dateItem = {
					startDate: date.startDate,
					endDate: date.endDate
				};
				datesToCreate.push(dateItem);
			}
		});

		const datesToUpdate: any = [];
		newMeetingData.dates.forEach((date: MeetingDates) => {
			if (date.id) {
				const dateItem = {
					where: { id: date.id },
					data: {
						startDate: date.startDate,
						endDate: date.endDate
					}
				};
				datesToUpdate.push(dateItem);
			}
		});

		//Reminders
		const remindersToCreate = newMeetingData.reminders.filter(
			(reminder: IReminder) => !reminder.id
		);
		const remindersToUpdate: any = [];
		newMeetingData.reminders.forEach((reminder: IReminder) => {
			if (reminder.id) {
				const reminderItem = {
					where: { id: reminder.id },
					data: {
						type: reminder.type,
						frequency: reminder.frequency,
						frequencyType: reminder.frequencyType
					}
				};
				remindersToUpdate.push(reminderItem);
			}
		});

		updateMeetingDetails({
			variables: {
				data: {
					meetingWhereUniqueInput: { id: newMeetingData.id },
					meetingDetailsInput: {
						label: newMeetingData.label,
						description: newMeetingData.description,
						location: newMeetingData.location,
						isRemote: newMeetingData.isRemote,
						eventPreviewCounter: newMeetingData.eventPreviewCounter,
						deputyAutoReplace: newMeetingData.deputyAutoReplace,
						dates: {
							create: datesToCreate,
							update: datesToUpdate
						},
						reminders: {
							create: remindersToCreate,
							update: remindersToUpdate
						},
						members: []
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateMeetingDetailsData) {
			setNotification({ message: 'Meeting was updated!' });
			setMeetingDetails(updateMeetingDetailsData.updateMeetingDetails);
		}
	}, [updateMeetingDetailsData]);

	// Delete meeting
	function handleDeleteMeeting() {
		updateCommitteeDetails({
			variables: {
				data: {
					committeeDetailsInput: {
						meetings: {
							delete: {
								id: meetingId
							}
						}
					},
					committeeWhereUniqueInput: {
						id: committeeId
					}
				}
			}
		});
	}

	useEffect(() => {
		if (updateCommitteeDetailsData) {
			setNotification({ message: 'Meeting deleted!' });
			navigate(routes.calendar);
		}
	}, [updateCommitteeDetailsData]);

	//Submit  actions from all tabs.
	useEffect(() => {
		if (submitFromOutside) {
			const { isValid, values } = meetingSetupFormik;
			if (!isValid) {
				setNotification({ message: 'Fill in mandatory inputs!' });
				setActiveTab(1);
			} else {
				handleSubmitForm(values);
				setSubmitFromOutside(false);
			}
		}
	}, [submitFromOutside]);

	return (
		<PageWrapper>
			<CreateOrEditMeetingPageTopBar
				meetingDetails={meetingDetails}
				isEditMode={isEditMode}
				updateMeetingDetailsLoading={updateMeetingDetailsLoading}
				addMeetingInCommitteeLoading={addMeetingInCommitteeLoading}
				handleDeleteMeeting={handleDeleteMeeting}
				setSubmitFromOutside={setSubmitFromOutside}
			/>
			<PageContainer>
				<PageMainContent>
					<PageNavContainer>
						<PageNavItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
							{translate(({ tabs }) => tabs.meetingSetup)}
						</PageNavItem>
						<PageNavItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
							{translate(({ tabs }) => tabs.agenda)}
						</PageNavItem>
						<PageNavItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
							{translate(({ tabs }) => tabs.membersAndGuests)}
						</PageNavItem>
						<PageNavItem active={activeTab === 4} onClick={() => setActiveTab(4)}>
							{translate(({ tabs }) => tabs.relatedItems)}
						</PageNavItem>
						{isEditMode && (
							<PageNavItem active={activeTab === 5} onClick={() => setActiveTab(5)}>
								{translate(({ tabs }) => tabs.newRequests)}
								<Badge title={'12'} type={BadgeTypes.Default} />
							</PageNavItem>
						)}
					</PageNavContainer>

					{(isEditMode === true || isEditMode === false) && (
						<PageNavContent>
							{activeTab === 1 && (
								<MeetingSetup
									isEditModeForModal={isEditMode}
									formik={meetingSetupFormik}
									submitFromOutside={submitFromOutside}
									setSubmitFromOutside={setSubmitFromOutside}
								/>
							)}
							{activeTab === 2 && <MeetingAgenda meeting={meetingDetails} />}
							{activeTab === 3 && (
								<MembersAndGuests
									meeting={meetingDetails}
									setMeeting={setMeetingDetails}
								/>
							)}
							{activeTab === 4 && <RelatedItems meeting={meetingDetails} />}
							{activeTab === 5 && <MeetingRequests />}
						</PageNavContent>
					)}
				</PageMainContent>
				<PageSidebar>
					{!isAdmin ? (
						<PageSidebarIconsBlock>
							<Icon name={IconType.EpInfo} />
							<Icon name={IconType.EpClockArrow} />
						</PageSidebarIconsBlock>
					) : null}
				</PageSidebar>
			</PageContainer>
			{!isEditMode &&
				activeTab !== 5 &&
				(!isAdmin ? (
					<NexSteptButtonContainer>
						<NextStepButton
							onClick={() => setActiveTab(state => (state < 4 ? state + 1 : state))}
						>
							<NextStepButtonText>
								{`${activeTab}/`}
								<NextStepMutedText>4</NextStepMutedText>
							</NextStepButtonText>
							<NextStepButtonText>
								<NextStepMutedText>
									{translate(({ buttons }) => buttons.next)}:
								</NextStepMutedText>
								{(activeTab === 1 &&
									translate(({ buttons }) => buttons.createMeeting)) ||
									(activeTab === 2 &&
										translate(({ buttons }) => buttons.reviewMembersList)) ||
									(activeTab === 3 &&
										translate(
											({ buttons }) => buttons.uploadAdditionalFiles
										)) ||
									(activeTab === 4 &&
										translate(({ buttons }) => buttons.publishMeeting))}
							</NextStepButtonText>
							<Icon name={IconType.EpArrowRight} />
						</NextStepButton>
					</NexSteptButtonContainer>
				) : null)}
		</PageWrapper>
	);
}
