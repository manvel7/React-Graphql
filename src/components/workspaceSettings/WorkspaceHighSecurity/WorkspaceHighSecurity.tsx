import React, { useState } from 'react';
import { useTranslation } from '../../../hooks';

import {
	HighSecurityContainer,
	PageTitle,
	ComponentBlock,
	InfoBlock,
	Heading,
	InfoText,
	Switch
} from './WorkspaceHighSecurity.style';

export function WorkspaceHighSecurity() {
	const translate = useTranslation();
	//Remove
	const [val, setVal] = useState(false);

	return (
		<HighSecurityContainer>
			<PageTitle>{translate(({ titles }) => titles.highSecurity)}</PageTitle>

			<ComponentBlock>
				<InfoBlock>
					<Heading>{translate(({ titles }) => titles.preventAnyMember)}</Heading>
					<InfoText>
						ePolitiker uses cookies to deliver a personalized experience for you and
						your users. Storing this information allows us to keep you logged in to the
						workspace, and returns you.
					</InfoText>
				</InfoBlock>
				<Switch checked={val} onChange={e => setVal(e.target.checked)} />
			</ComponentBlock>

			<ComponentBlock>
				<InfoBlock>
					<Heading>{translate(({ titles }) => titles.disableAdmins)}</Heading>
					<InfoText>
						ePolitiker uses cookies to deliver a personalized experience for you and
						your users.
					</InfoText>
				</InfoBlock>
				<Switch checked={false} onChange={() => {}} />
			</ComponentBlock>

			<ComponentBlock>
				<InfoBlock>
					<Heading>{translate(({ titles }) => titles.disableAllDocuments)}</Heading>
					<InfoText>
						ePolitiker uses cookies to deliver a personalized experience for you and
						your users. Storing this information allows us to keep you logged in to the
						workspace, and returns you when you last left the app, along with additional
						benefits.
					</InfoText>
				</InfoBlock>
				<Switch checked={false} onChange={() => {}} />
			</ComponentBlock>

			<ComponentBlock>
				<InfoBlock>
					<Heading>
						{translate(({ titles }) => titles.disableAllHighSecurityDocuments)}
					</Heading>
					<InfoText>
						ePolitiker uses cookies to deliver a personalized experience for you and
						your users.
					</InfoText>
				</InfoBlock>
				<Switch checked={false} onChange={() => {}} />
			</ComponentBlock>

			<ComponentBlock>
				<InfoBlock>
					<Heading>
						{translate(({ titles }) => titles.requestPasswordForDocuments)}
					</Heading>
					<InfoText>
						ePolitiker uses cookies to deliver a personalized experience for you and
						your users. Storing this information allows us to keep you logged in to the
						workspace, and returns you when you last left the app, along with additional
						benefits.
					</InfoText>
				</InfoBlock>
				<Switch checked={false} onChange={() => {}} />
			</ComponentBlock>

			<ComponentBlock>
				<InfoBlock>
					<Heading>{translate(({ titles }) => titles.disableExport)}</Heading>
					<InfoText>
						ePolitiker uses cookies to deliver a personalized experience for you and
						your users.
					</InfoText>
				</InfoBlock>
				<Switch checked={true} onChange={() => {}} />
			</ComponentBlock>
		</HighSecurityContainer>
	);
}
