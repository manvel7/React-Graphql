import React, { useEffect, useState } from 'react';
import {
	DashboardPageContainer,
	DashboardHeaderTitle,
	DashboardPageHeader,
	UserBlock,
	UserName,
	ActionBlock,
	ActionBlockButton,
	SettingsIcon,
	DashboardCardContent,
	DashboardContentHeaderPart,
	NavBarItemDashboardPage,
	CardPopoverContainer
} from './DashboardPage.style';
import {
	LanguageCode,
	useEffectOnce,
	useLanguage,
	useNavigation,
	useTranslation
} from '../../hooks';
import { useAuthUser } from '../../hooks/ui/useAuthUser';
import { Avatar, AvatarSize, Dropdown, GhostButton, Icon, LightButton } from '../../components/ui';
import { IconType } from '../../consts';
import { EventsCard, BookmarksCard, DocumentBySorting } from '../../components/cards/';
import { Colors } from '../../environment/theme';

import {
	PopoverActionsBlock,
	PopoverContent,
	PopoverInfoBlock,
	PopoverInfoItem,
	PopoverTypoText,
	PrimaryButton
} from '../../components/cards/MemberPopoverCard/MemberPopoverCard.style';

export const DashboardPage = () => {
	const translate = useTranslation();
	const { routes, navigate } = useNavigation();
	const [language, changeLanguage] = useLanguage();
	const [showCookiesPopup, setShowCookiesPopup] = useState<boolean>(false);
	const { authUser } = useAuthUser();

	useEffectOnce(() => {
		showCookiesModal();
	});

	useEffect(() => {
		const timerId = setTimeout(() => {
			closeCookiesModal();
		}, 7000);
		return () => {
			clearTimeout(timerId);
		};
	});

	const languagesList = [
		{ label: 'EN', value: LanguageCode.EN },
		{ label: 'NO', value: LanguageCode.NB },
		{ label: 'SE', value: LanguageCode.SE }
	];

	const closeCookiesModal = () => {
		setShowCookiesPopup(false);
	};
	const showCookiesModal = () => {
		setShowCookiesPopup(true);
	};

	const handleNavigationLearnMore = () => {
		navigate(routes.cookies);
	};

	return (
		<DashboardPageContainer>
			<NavBarItemDashboardPage>
				<Dropdown
					toggleComponent={() => (
						<>
							<Dropdown.TitleBold>
								{languagesList.find(l => l.value === language)?.label}
							</Dropdown.TitleBold>
							<Icon name={IconType.EpCornerDown} color={Colors.black[100]} />
						</>
					)}
				>
					{languagesList.map((lang, i) => (
						<Dropdown.Item
							key={`select-language-${i}`}
							onClick={() => changeLanguage(lang.value)}
						>
							{lang.label}
						</Dropdown.Item>
					))}
				</Dropdown>
			</NavBarItemDashboardPage>
			<DashboardContentHeaderPart>
				<DashboardHeaderTitle>
					{translate(({ titles }) => titles.workspaceDashboard)}
				</DashboardHeaderTitle>
			</DashboardContentHeaderPart>
			<DashboardPageHeader>
				<UserBlock>
					<Avatar image={authUser?.avatar?.url} size={AvatarSize.XS} />
					<UserName>
						{translate(({ titles }) => titles.Hello)} {authUser?.firstName}
					</UserName>
				</UserBlock>
				<ActionBlock>
					<Icon name={IconType.EpCalendar} />
					<ActionBlockButton>
						<GhostButton
							onClick={() => {}}
							rightIcon={IconType.EpArrowTableDown}
							title={translate(({ titles }) => titles.lastMonths)}
						/>
					</ActionBlockButton>
					<SettingsIcon>
						<Icon name={IconType.EpSettings} />
					</SettingsIcon>
				</ActionBlock>
			</DashboardPageHeader>
			<DashboardCardContent>
				<EventsCard />
				<BookmarksCard />
				<DocumentBySorting />
			</DashboardCardContent>
			{showCookiesPopup ? (
				<CardPopoverContainer>
					<PopoverContent>
						<PopoverInfoBlock>
							<PopoverInfoItem>
								<PopoverTypoText>
									{translate(({ titles }) => titles.CookiePoliceText)}
								</PopoverTypoText>
							</PopoverInfoItem>
							<PopoverActionsBlock>
								<PrimaryButton
									title={translate(({ buttons }) => buttons.accept)}
									onClick={closeCookiesModal}
								/>
								<LightButton
									title={translate(({ buttons }) => buttons.learnMore)}
									leftIcon={IconType.EpEye}
									onClick={handleNavigationLearnMore}
								/>
							</PopoverActionsBlock>
						</PopoverInfoBlock>
					</PopoverContent>
				</CardPopoverContainer>
			) : null}
		</DashboardPageContainer>
	);
};
