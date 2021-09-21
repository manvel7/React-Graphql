import React, { useEffect } from 'react';

import { Dropdown, PageTopBarContainer, TopBarElement } from './PageTopBar.style';
import { IconType } from '../../../consts';
import {
	LanguageCode,
	useBreadcrumbs,
	useIsAdmin,
	useLanguage,
	useTranslation
} from '../../../hooks';
import { Colors } from '../../../environment';
import { Breadcrumbs, ButtonSize, GhostButton, Icon } from '../';

export function PageTopBar() {
	const translate = useTranslation();
	const isAdmin = useIsAdmin();
	const [language, changeLanguage] = useLanguage();
	const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();

	useEffect(() => {
		setBreadcrumbs(breadcrumbs);
	}, [language]);

	const languagesList = [
		{ label: 'EN', value: LanguageCode.EN },
		{ label: 'NO', value: LanguageCode.NB },
		{ label: 'SE', value: LanguageCode.SE }
	];

	const dropDownItems = [
		{
			title: translate(({ buttons }) => buttons.addPageFolder),
			icon: IconType.EpPlus
		},
		{
			title: translate(({ buttons }) => buttons.viewEditHistory),
			icon: IconType.EpEye
		},
		{
			title: translate(({ buttons }) => buttons.editFolderTemplateForAppView),
			icon: IconType.EpEdit
		},
		{
			title: translate(({ buttons }) => buttons.exportCSV),
			icon: IconType.EpArrowDown
		},
		{
			title: translate(({ buttons }) => buttons.deleteCommitteesAndAllFolders),
			icon: IconType.EpTrash
		}
	];

	return (
		<PageTopBarContainer>
			<TopBarElement>
				<Breadcrumbs />
			</TopBarElement>
			{isAdmin ? (
				<TopBarElement>
					<GhostButton
						size={ButtonSize.SM}
						title={translate(({ buttons }) => buttons.manageAccess)}
						onClick={() => {}}
						rightIcon={IconType.EpGlobe}
					/>

					<Dropdown tooltip={translate(({ tooltips }) => tooltips.moreActions)}>
						{dropDownItems.map((item, index) => (
							<Dropdown.Item key={`dropdown-action-${index}`} onClick={() => {}}>
								<Dropdown.ItemIcon name={item.icon} />
								{item.title}
							</Dropdown.Item>
						))}
					</Dropdown>

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
								key={`select-admin-language-${i}`}
								onClick={() => changeLanguage(lang.value)}
							>
								{lang.label}
							</Dropdown.Item>
						))}
					</Dropdown>
				</TopBarElement>
			) : null}
		</PageTopBarContainer>
	);
}
