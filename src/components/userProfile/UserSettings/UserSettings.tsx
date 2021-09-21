import React, { useContext } from 'react';

import {
	PageContainer,
	PageHeaderBlock,
	PageTitle,
	PageTypoText,
	LightButton,
	PageSubTitle,
	PageSettingsBlock,
	PageSettingsItem,
	PageActionsBlock,
	PageActionsItem,
	WarningButton,
	DangerButton
} from './UserSettings.style';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';
import { UserContext } from '../../../pages';

export function UserSettings() {
	const { user } = useContext(UserContext);
	const translate = useTranslation();

	return (
		<PageContainer>
			<PageHeaderBlock>
				<PageTitle>{translate(({ titles }) => titles.accountSettings)}</PageTitle>
			</PageHeaderBlock>
			<PageSettingsBlock>
				<PageSettingsItem>
					<PageSubTitle>{translate(({ titles }) => titles.accountEmail)}</PageSubTitle>
					<PageTypoText>
						{`${translate(({ titles }) => titles.userAccount)}: ${user?.email}`}
					</PageTypoText>
					<LightButton
						title={translate(({ buttons }) => buttons.changeEmail)}
						onClick={() => {}}
					/>
				</PageSettingsItem>

				<PageSettingsItem>
					<PageSubTitle>{translate(({ titles }) => titles.loginSettings)}</PageSubTitle>
					<PageTypoText>{translate(({ titles }) => titles.loginOptions)}</PageTypoText>
					<LightButton
						title={translate(({ buttons }) => buttons.changeSettings)}
						onClick={() => {}}
					/>
				</PageSettingsItem>

				<PageSettingsItem>
					<PageSubTitle>{translate(({ titles }) => titles.password)}</PageSubTitle>
					<PageTypoText>
						{translate(({ titles }) => titles.deleteUserAccountButKeepData)}
					</PageTypoText>
					<LightButton
						title={translate(({ buttons }) => buttons.resetPassword)}
						onClick={() => {}}
					/>
				</PageSettingsItem>
			</PageSettingsBlock>
			<PageActionsBlock>
				<PageActionsItem>
					<WarningButton
						title={translate(({ buttons }) => buttons.deactivateAccount)}
						leftIcon={IconType.EpTrash}
						onClick={() => {}}
					/>
					<PageTypoText>
						{translate(({ titles }) => titles.deleteUserAccountButKeepData)}
					</PageTypoText>
				</PageActionsItem>
				<PageActionsItem>
					<DangerButton
						title={translate(({ buttons }) => buttons.delete)}
						leftIcon={IconType.EpTrash}
						onClick={() => {}}
					/>
					<PageTypoText>
						{translate(({ titles }) => titles.deleteUserAccountAndAllUserInfo)}
					</PageTypoText>
				</PageActionsItem>
			</PageActionsBlock>
		</PageContainer>
	);
}
