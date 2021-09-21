import React, { useEffect, useState, useContext } from 'react';

import { PoliticalParty } from '@epolitiker/api/dist/generated';

import {
	SelectPartyBlockContainer,
	SelectPartyInputsBlock,
	PageTitle,
	PageTypoText,
	AutoComplete
} from './SelectPartyBlock.style';

import {
	useAllPartiesInWorkspaceLazyQuery,
	useEffectOnce,
	useTranslation,
	useLocalStorage
} from '../../../../hooks';
import { StorageKey, workspacePartyRolesList } from '../../../../consts';
import { UserContext } from '../../../../pages';

export function SelectPartyBlock() {
	const { formik } = useContext(UserContext);
	const { values, setFieldValue } = formik;
	const translate = useTranslation();
	const [activeWorkspace] = useLocalStorage(StorageKey.ActiveWorkspace);

	const [workspaceParties, setWorkspaceParties] = useState<PoliticalParty[]>([]);
	const [partyRoles] = useState(workspacePartyRolesList);

	const [
		allPartiesInWorkspace,
		{ data: allPartiesInWorkspaceData }
	] = useAllPartiesInWorkspaceLazyQuery();

	useEffectOnce(() => {
		handleGetAllPartiesInWorkspace();
	});

	function handleGetAllPartiesInWorkspace() {
		if (activeWorkspace) {
			allPartiesInWorkspace({
				variables: {
					data: {
						workspaceWhereUniqueInput: { id: activeWorkspace.id },
						orderBy: 'name_ASC'
					}
				}
			});
		}
	}

	useEffect(() => {
		if (allPartiesInWorkspaceData) {
			setWorkspaceParties(allPartiesInWorkspaceData.allPartiesInWorkspace);
		}
	}, [allPartiesInWorkspaceData]);

	function handleChangeParty(partyId: string) {
		setFieldValue('partyId', partyId);
	}

	function handleChangePartyRole(partyRole: string) {
		setFieldValue('partyRole', partyRole);
	}

	return (
		<SelectPartyBlockContainer>
			<PageTitle>{translate(({ titles }) => titles.party)}</PageTitle>
			<PageTypoText>{translate(({ titles }) => titles.partyInfoVisibleText)}</PageTypoText>
			<SelectPartyInputsBlock>
				<AutoComplete
					label={translate(({ inputs }) => inputs.memberOfParty.label)}
					placeholder={translate(({ inputs }) => inputs.memberOfParty.placeholder)}
					value={workspaceParties.find(party => party.id === values.partyId)?.name || ''}
				>
					{workspaceParties.length > 0 ? (
						workspaceParties.map(party => (
							<AutoComplete.Item
								key={party.id}
								onClick={() => handleChangeParty(party.id)}
							>
								{party.name}
							</AutoComplete.Item>
						))
					) : (
						<AutoComplete.Item key={`no-options-key`} onClick={() => {}}>
							No parties
						</AutoComplete.Item>
					)}
				</AutoComplete>

				<AutoComplete
					label={translate(({ inputs }) => inputs.partyRole.label)}
					placeholder={translate(({ inputs }) => inputs.partyRole.placeholder)}
					value={
						partyRoles.find(partyRole => partyRole.value === values.partyRole)?.label ||
						''
					}
				>
					{partyRoles.map((partyRole, i) => (
						<AutoComplete.Item
							key={`party-role-${i}`}
							onClick={() => handleChangePartyRole(partyRole.value)}
						>
							{partyRole.label}
						</AutoComplete.Item>
					))}
				</AutoComplete>
			</SelectPartyInputsBlock>
		</SelectPartyBlockContainer>
	);
}
