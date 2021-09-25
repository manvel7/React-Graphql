import React, { useState, useEffect } from 'react';
import { Committee, MeetingDates } from '@epolitiker/api';
import { FormikProps } from 'formik';
import moment from 'moment';

import {
	PageFormContainer,
	MeetingSetupForm,
	PageFormLeftBlock,
	PageFormRightBlock,
	FormItem,
	FormItemIconBlock,
	FormItemHeadingBlock,
	FormItemInfoText,
	FormItemLinkText,
	FormItemRadiosBlock,
	FormItemHeadingBlockText,
	ShortInput,
	RemindersBlockTitle,
	RemindersRow,
	RemindersBlock,
	RemoveReminderBlock,
	CalendarBlockDivider,
	Select,
	FormDateRow,
	FormDatesBlock,
	FormDateText,
	CommitteesListIsEmptyBlock,
	CommitteesListIsEmptyTitle,
	CommitteesListIsEmptyLink,
	FooterButtonContent,
	ButtonLave
} from './MeetingSetup.style';
import {
	Icon,
	Input,
	AutoComplete,
	Textarea,
	SelectSize,
	GhostButton,
	Checkbox,
	ModalSizes,
	Modal,
	ButtonSize
} from '../../ui';
import { CreateMeetingDatePicker, CreateMeetingTimePicker } from '../../datepickers';
import { Colors } from '../../../environment';
import { IconType, StorageKey } from '../../../consts';
import {
	useEffectOnce,
	useWorkspaceCommitteesLazyQuery,
	useUpdateMeetingDetailsMutation,
	useNavigation,
	useTranslation,
	useLocalStorage
} from '../../../hooks';
import { ButtonTypes } from '../../ui/Button';
import {
	ReminderTypes,
	IReminder,
	ReminderFrequencies,
	ReminderFrequencyTypes
} from '../../../pages/CreateOrEditMeetingPage';
import {
	MeetingSetupFormValues,
	reminderTypeNames,
	getDaysDifference,
	reminderFrequencyNames,
	reminderFrequencyTypeNames
} from './MeetingSetup.helpers';
import {
	ConfirmBlock,
	ConfirmBlockText,
	ConfirmModal,
	PrimaryButton
} from '../MeetingAgenda/MeetingAgenda.style';

interface MeetingSetupProps {
	formik: FormikProps<MeetingSetupFormValues>;
	submitFromOutside: boolean;
	isEditModeForModal: boolean;
	setSubmitFromOutside: (submitFromOutside: boolean) => void;
}

export function MeetingSetup({
	formik: {
		values,
		handleChange,
		handleSubmit,
		errors,
		touched,
		handleBlur,
		setFieldValue,
		initialValues
	},
	submitFromOutside,
	setSubmitFromOutside,
	isEditModeForModal
}: MeetingSetupProps) {
	const [showMoreSettings, setShowMoreSettings] = useState(false);
	const [showDatesError, setShowDatesError] = useState(false);

	const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
	const [committeesList, setCommitteesList] = useState<Committee[]>([]);
	const { routes, navigate, history } = useNavigation();
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);
	const [confirm, setConfirm] = useState(false);
	const [updateMeetingDetails] = useUpdateMeetingDetailsMutation();
	const [redirectTo, setRedirectTo] = useState<string>('');
	const [redirect, setRedirect] = useState<boolean>(false);

	const [
		getWorkspaceCommittees,
		{ data: workspaceCommitteesData }
	] = useWorkspaceCommitteesLazyQuery();

	useEffect(() => {
		if (isEditModeForModal) {
			if (values !== initialValues && !redirect && !submitFromOutside) {
				const unregister = history.block(location => {
					setRedirectTo(location.pathname);
					handleShowConfirmModal();
					return false;
				});
				setRedirect(false);
				return () => {
					unregister();
				};
			}
		}
	});

	const redirectToSomeRoute = () => {
		setRedirect(true);
		if (redirectTo) {
			window.location.href = redirectTo;
		}
	};

	useEffect(() => {
		if (submitFromOutside) {
			handleSubmit();
			setSubmitFromOutside(false);
		}
	}, [submitFromOutside]);

	function handleGetCommittee(committee: Committee) {
		setFieldValue('committeeId', committee.id);
		setFieldValue('committeeLabel', committee.label);

		setSelectedCommittee(committee);
	}

	function handleGetStartDate(dateIndex: number, newStartDate: Date) {
		if (new Date(newStartDate).getTime() <= new Date(Date.now()).getTime()) {
			setShowDatesError(true);
		} else {
			setShowDatesError(false);
		}

		const tempDates = [...values.dates];
		tempDates[dateIndex].startDate = newStartDate;
		if (new Date(newStartDate).getTime() >= new Date(tempDates[dateIndex].endDate).getTime()) {
			tempDates[dateIndex].endDate = new Date(newStartDate.getTime() + 3600000);
		}
		setFieldValue('dates', tempDates);
	}

	function handleGetEndDate(dateIndex: number, newEndDate: Date) {
		if (
			new Date(newEndDate).getTime() <= new Date(Date.now()).getTime() ||
			new Date(newEndDate).getTime() <= new Date(values.dates[dateIndex].startDate).getTime()
		) {
			setShowDatesError(true);
		} else {
			setShowDatesError(false);
		}

		const dayCount = getDaysDifference(values.dates[0].startDate, newEndDate) + 1;

		// make dates multiple
		if (dayCount > 1 && values.dates.length <= 1) {
			const listOfDates = [];
			for (let i = 0; i < dayCount; i++) {
				const obj = {
					id: '',
					startDate: new Date(new Date(newEndDate).setDate(newEndDate.getDate() - i)),
					endDate: new Date(new Date(newEndDate).setDate(newEndDate.getDate() - i))
				};

				obj.startDate = new Date(
					obj.startDate.setHours(new Date(values.dates[0].startDate).getHours())
				);
				obj.endDate = new Date(
					obj.endDate.setHours(new Date(values.dates[0].startDate).getHours() + 1)
				);
				obj.startDate = new Date(
					obj.startDate.setMinutes(new Date(values.dates[0].startDate).getMinutes())
				);
				obj.endDate = new Date(
					obj.endDate.setMinutes(new Date(values.dates[0].startDate).getMinutes())
				);

				listOfDates.push(obj);
			}
			listOfDates[listOfDates.length - 1].id = values.dates[0].id;
			setFieldValue('dates', listOfDates.reverse());
			return;
		}

		const tempDates = [...values.dates];
		tempDates[dateIndex].endDate = newEndDate;

		setFieldValue('dates', tempDates);
	}

	function handleRemoveDate(dateIndex: number, dateId: string) {
		if (dateId) {
			updateMeetingDetails({
				variables: {
					data: {
						meetingWhereUniqueInput: { id: values.id },
						meetingDetailsInput: {
							dates: {
								delete: { id: dateId }
							}
						}
					}
				}
			});
		}

		const tempDates = [...values.dates];
		tempDates.splice(dateIndex, 1);
		setFieldValue('dates', tempDates);
	}

	//Get workspace committees
	useEffectOnce(() => {
		handleGetCommittees();
	});

	function handleGetCommittees() {
		if (activeWorkspace) {
			getWorkspaceCommittees({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id }
					},
					orderBy: 'label_ASC'
				}
			});
		}
	}

	useEffect(() => {
		if (workspaceCommitteesData) {
			const committees: Committee[] = workspaceCommitteesData.workspaceDetails.committees;
			setCommitteesList(committees);
			setSelectedCommittee(
				committees.find(committee => values?.committeeId === committee.id) || null
			);
		}
	}, [workspaceCommitteesData]);

	//Meeting Reminders
	function handleGetReminder(reminderIndex: number, modifiedReminder: IReminder) {
		const tempReminders = [...values.reminders];
		tempReminders[reminderIndex] = modifiedReminder;
		setFieldValue('reminders', tempReminders);
	}

	function handleAddNewReminder() {
		const newReminder: IReminder = {
			type: ReminderTypes.EMAIL,
			frequency: ReminderFrequencies.BEFORE_1,
			frequencyType: ReminderFrequencyTypes.HOUR
		};

		const tempReminders = [...values.reminders, newReminder];
		setFieldValue('reminders', tempReminders);
	}

	function handleRemoveReminder(reminderIndex: number, reminderId: string | undefined) {
		if (reminderId) {
			updateMeetingDetails({
				variables: {
					data: {
						meetingWhereUniqueInput: { id: values.id },
						meetingDetailsInput: {
							reminders: {
								delete: { id: reminderId }
							}
						}
					}
				}
			});
		}

		const tempReminders = values.reminders.filter(
			(r: IReminder, i: number) => i != reminderIndex
		);
		setFieldValue('reminders', tempReminders);
	}

	useEffect(() => {
		handleGetDuration();
	}, [values.dates]);

	function handleGetDuration() {
		if (values.dates.length > 0) {
			let total = 0;
			values.dates.forEach((date: MeetingDates) => {
				const start = new Date(date.startDate).getTime();
				const end = new Date(date.endDate).getTime();
				const diff = end - start;
				total += diff;
			});

			const hours = moment.duration(total).hours();
			const minutes = moment.duration(total).minutes();

			return `${translate(({ titles }) => titles.totalDuration)}:
				${hours} ${translate(({ titles }) => titles.hours)} ${
				minutes ? `${minutes} ${translate(({ titles }) => titles.minutes)}` : ''
			}
			`;
		}
	}

	function handleNavigateToCommitteesPage() {
		navigate(routes.committees);
	}

	function handleCloseConfirmModal() {
		setConfirm(false);
	}

	function handleShowConfirmModal() {
		setConfirm(true);
	}

	// @ts-ignore
	return (
		<PageFormContainer>
			<ConfirmModal
				size={ModalSizes.XS}
				title={translate(({ titles }) => titles.confirmTitle)}
				open={confirm}
				onClose={handleCloseConfirmModal}
			>
				<Modal.Body>
					<ConfirmBlock>
						<ConfirmBlockText>
							{translate(({ titles }) => titles.confirmText)}
						</ConfirmBlockText>
					</ConfirmBlock>
				</Modal.Body>
				<Modal.Footer>
					<FooterButtonContent>
						<ButtonLave>
							<GhostButton
								title={translate(({ buttons }) => buttons.leaveWithoutSaving)}
								onClick={redirectToSomeRoute}
								size={ButtonSize.LG}
							/>
						</ButtonLave>
						<PrimaryButton
							title={translate(({ buttons }) => buttons.stayAndContinueEditing)}
							onClick={handleCloseConfirmModal}
							size={ButtonSize.LG}
						/>
					</FooterButtonContent>
				</Modal.Footer>
			</ConfirmModal>
			<MeetingSetupForm onSubmit={handleSubmit}>
				<PageFormLeftBlock>
					<FormItem>
						<FormItemIconBlock>
							<Icon name={IconType.EpEvent} color={Colors.neutralBlue[100]} />
						</FormItemIconBlock>
						<Input
							label={translate(({ inputs }) => inputs.name.label)}
							placeholder={translate(({ inputs }) => inputs.name.placeholder)}
							name="label"
							value={values.label}
							onChange={handleChange}
							error={touched.label ? errors.label : undefined}
							onBlur={handleBlur}
						/>
					</FormItem>
					<FormItem>
						<FormItemIconBlock>
							<Icon name={IconType.EpClock} color={Colors.neutralBlue[100]} />
						</FormItemIconBlock>
						<FormDatesBlock>
							{values.dates.map((date: MeetingDates, index: number) => (
								<FormDateRow key={`date-item-${index}`}>
									<CreateMeetingDatePicker
										startDate={new Date(date.startDate)}
										setStartDate={date => handleGetStartDate(index, date)}
									/>
									<CreateMeetingTimePicker
										toggleInputLabel={translate(
											({ inputs }) => inputs.startTime.label
										)}
										startDate={new Date(date.startDate)}
										setStartDate={date => handleGetStartDate(index, date)}
									/>
									<CalendarBlockDivider />
									{values.dates.length === 1 && (
										<CreateMeetingDatePicker
											startDate={new Date(date.endDate)}
											setStartDate={date => handleGetEndDate(index, date)}
										/>
									)}
									<CreateMeetingTimePicker
										toggleInputLabel={translate(
											({ inputs }) => inputs.endTime.label
										)}
										startDate={new Date(date.endDate)}
										setStartDate={date => handleGetEndDate(index, date)}
									/>
									{index !== 0 && (
										<GhostButton
											type={ButtonTypes.Button}
											icon={IconType.EpTrash}
											onClick={() => handleRemoveDate(index, date.id)}
										/>
									)}
								</FormDateRow>
							))}
							<FormDateText error={showDatesError}>
								{showDatesError
									? 'Please choose correct Timestamp'
									: handleGetDuration()}
							</FormDateText>
						</FormDatesBlock>
					</FormItem>
					<FormItem>
						<FormItemIconBlock>
							<Icon name={IconType.EpMembers} color={Colors.neutralBlue[100]} />
						</FormItemIconBlock>
						{committeesList.length > 0 ? (
							<AutoComplete
								name="committeeId"
								required
								label={translate(({ inputs }) => inputs.committee.label)}
								value={selectedCommittee?.label || ''}
								placeholder={translate(
									({ inputs }) => inputs.committee.placeholder
								)}
								error={
									!selectedCommittee?.id && touched.committeeId
										? errors.committeeId
										: undefined
								}
							>
								{committeesList.map(committee => (
									<AutoComplete.Item
										key={committee.id}
										onClick={() => handleGetCommittee(committee)}
									>
										{committee.label}
									</AutoComplete.Item>
								))}
							</AutoComplete>
						) : (
							<CommitteesListIsEmptyBlock>
								<CommitteesListIsEmptyTitle>
									No committees available
								</CommitteesListIsEmptyTitle>
								<CommitteesListIsEmptyLink onClick={handleNavigateToCommitteesPage}>
									Create a committee to continue
								</CommitteesListIsEmptyLink>
							</CommitteesListIsEmptyBlock>
						)}
					</FormItem>
					<FormItem>
						<FormItemIconBlock>
							<Icon name={IconType.EpCommittees} color={Colors.neutralBlue[100]} />
						</FormItemIconBlock>
						<Input
							label={translate(({ inputs }) => inputs.location.label)}
							placeholder={translate(({ inputs }) => inputs.location.placeholder)}
							name="location"
							required
							value={values.location}
							onChange={handleChange}
							error={touched.location ? errors.location : undefined}
							onBlur={handleBlur}
						/>
					</FormItem>
					{/* <FormItem>
						<FormItemIconBlock>
							<Icon name={IconType.EpDevice} color={Colors.neutralBlue[100]} />
						</FormItemIconBlock>
						<Checkbox
							name="isRemote"
							label={'Remote possible'}
							checked={values.isRemote}
							onChange={handleChange}
						/>
					</FormItem> */}
				</PageFormLeftBlock>
				<PageFormRightBlock>
					{/* <FormItem>
						<FormItemIconBlock>
							<Icon name={IconType.EpText} color={Colors.neutralBlue[100]} />
						</FormItemIconBlock>
						<AutoComplete
							label={'meeting related to'}
							placeholder="You can indicate to what entities this meeting also related to"
							value={''}
							searchValue={''}
							getSearchValue={() => {}}
							searchPlaceholder="Search entities"
						>
							<AutoComplete.Item onClick={() => {}}>Item 1</AutoComplete.Item>
							<AutoComplete.Item onClick={() => {}}>Item 2</AutoComplete.Item>
							<AutoComplete.Item onClick={() => {}}>Item 3</AutoComplete.Item>
						</AutoComplete>
					</FormItem> */}
					<FormItem>
						<FormItemIconBlock />
						<Textarea
							label={translate(({ inputs }) => inputs.description.label)}
							placeholder={translate(({ inputs }) => inputs.description.placeholder)}
							name="description"
							value={values.description}
							onChange={handleChange}
						/>
					</FormItem>
					<FormItem>
						<FormItemIconBlock />
						<FormItemHeadingBlock
							onClick={() => setShowMoreSettings(!showMoreSettings)}
						>
							{showMoreSettings ? (
								<Icon
									name={IconType.EpCornerDown}
									color={Colors.neutralBlue[100]}
								/>
							) : (
								<Icon
									name={IconType.EpCornerRight}
									color={Colors.neutralBlue[100]}
								/>
							)}
							<FormItemHeadingBlockText>
								{translate(({ titles }) => titles.additionalSettings)}
							</FormItemHeadingBlockText>
						</FormItemHeadingBlock>
					</FormItem>
					{showMoreSettings && (
						<>
							<FormItem>
								<FormItemIconBlock>
									<Icon
										name={IconType.EpPreferences}
										color={Colors.neutralBlue[100]}
									/>
								</FormItemIconBlock>
								<AutoComplete
									label={translate(({ inputs }) => inputs.meetingType.label)}
									value={'Case and suggestions review'}
								>
									<AutoComplete.Item onClick={() => {}}>Type 1</AutoComplete.Item>
									<AutoComplete.Item onClick={() => {}}>Type 2</AutoComplete.Item>
									<AutoComplete.Item onClick={() => {}}>Type 3</AutoComplete.Item>
								</AutoComplete>
								<ShortInput
									label={translate(({ inputs }) => inputs.eventCode.label)}
									placeholder="F12/3"
									value={''}
									onChange={() => {}}
								/>
							</FormItem>
							<FormItem>
								<FormItemIconBlock>
									<Icon name={IconType.EpBell} color={Colors.neutralBlue[100]} />
								</FormItemIconBlock>
								<RemindersBlock>
									<RemindersBlockTitle>
										{translate(({ buttons }) => buttons.reminder)}
									</RemindersBlockTitle>
									{values.reminders &&
										values.reminders.map(
											(reminder: IReminder, index: number) => (
												<RemindersRow key={`reminder-filter-item-${index}`}>
													<Select
														size={SelectSize.XL}
														title={
															reminderTypeNames.find(
																r => r.value === reminder.type
															)?.title
														}
													>
														{reminderTypeNames.map(remType => (
															<Select.Item
																key={`reminder-type-${remType.value}`}
																onClick={() =>
																	handleGetReminder(index, {
																		...reminder,
																		type: remType.value
																	})
																}
															>
																{remType.title}
															</Select.Item>
														))}
													</Select>

													<Select
														size={SelectSize.XL}
														title={
															reminderFrequencyNames.find(
																r => r.value === reminder.frequency
															)?.title
														}
													>
														{reminderFrequencyNames.map(
															remFrequency => (
																<Select.Item
																	key={`reminder-frequency-${remFrequency.value}`}
																	onClick={() =>
																		handleGetReminder(index, {
																			...reminder,
																			frequency:
																				remFrequency.value
																		})
																	}
																>
																	{remFrequency.title}
																</Select.Item>
															)
														)}
													</Select>

													<Select
														size={SelectSize.XL}
														title={
															reminderFrequencyTypeNames.find(
																r =>
																	r.value ===
																	reminder.frequencyType
															)?.title
														}
													>
														{reminderFrequencyTypeNames.map(
															remFreqType => (
																<Select.Item
																	key={`reminder-frequency-type-${remFreqType.value}`}
																	onClick={() =>
																		handleGetReminder(index, {
																			...reminder,
																			frequencyType:
																				remFreqType.value
																		})
																	}
																>
																	{remFreqType.title}
																</Select.Item>
															)
														)}
													</Select>

													<RemoveReminderBlock>
														<GhostButton
															icon={IconType.EpTrash}
															type={ButtonTypes.Button}
															onClick={() =>
																handleRemoveReminder(
																	index,
																	reminder?.id
																)
															}
														/>
													</RemoveReminderBlock>
												</RemindersRow>
											)
										)}
									<GhostButton
										leftIcon={IconType.EpPlus}
										type={ButtonTypes.Button}
										title={translate(({ buttons }) => buttons.add)}
										onClick={handleAddNewReminder}
									/>
								</RemindersBlock>
							</FormItem>
							<FormItem>
								<FormItemIconBlock />
								<FormItemRadiosBlock>
									<Checkbox
										name="eventPreviewCounter"
										label={translate(
											({ titles }) => titles.addCounterToEventPreview
										)}
										checked={values.eventPreviewCounter}
										onChange={handleChange}
									/>
									<FormItemInfoText>Explanation text</FormItemInfoText>
								</FormItemRadiosBlock>
							</FormItem>
							<FormItem>
								<FormItemIconBlock />
								<FormItemRadiosBlock>
									<Checkbox
										name="deputyAutoReplace"
										label={translate(
											({ titles }) => titles.turnOnAutomaticReplacment
										)}
										checked={values.deputyAutoReplace}
										onChange={handleChange}
									/>
									<FormItemInfoText>Explanation text</FormItemInfoText>
									<FormItemLinkText>View cuent settings</FormItemLinkText>
								</FormItemRadiosBlock>
							</FormItem>
						</>
					)}
				</PageFormRightBlock>
			</MeetingSetupForm>
		</PageFormContainer>
	);
}
