import React, { useState } from 'react';
import { PoliticalParty } from '@epolitiker/api';

import {
	PartyNameCardContainer,
	PartyName,
	PopoverWrapper,
	PartyLogoBlock,
	PartyLogo,
	PartyInfoWrapper,
	PopoverTitle,
	PopoverSubTitle,
	PopoverLinkText,
	PopoverInfoText
} from './PartyNameCard.style';
import { LightButton } from '../../ui';
import { IconType } from '../../../consts';
import { useTranslation } from '../../../hooks';

interface PartyNameCardProps {
	party: PoliticalParty;
	onEditClick: (party: PoliticalParty) => void;
}

export function PartyNameCard({ party, onEditClick }: PartyNameCardProps) {
	const translate = useTranslation();
	const [showPopover, setShowPopover] = useState(false);

	const handleOnEditClick = () => {
		onEditClick(party);
		setShowPopover(false);
	};

	return (
		<PartyNameCardContainer
			onMouseOver={() => setShowPopover(true)}
			onMouseLeave={() => setShowPopover(false)}
		>
			<PartyName>{party.name},</PartyName>

			{showPopover && (
				<PopoverWrapper>
					<PartyLogoBlock>
						<PartyLogo src={party.logo?.url} />
					</PartyLogoBlock>
					<PartyInfoWrapper>
						<PopoverTitle>{party.name}</PopoverTitle>
						<PopoverSubTitle>Conservative Party</PopoverSubTitle>
						<PopoverLinkText>Lillian Warner</PopoverLinkText>
						<PopoverInfoText>12 representors in the workspace</PopoverInfoText>
						<LightButton
							leftIcon={IconType.EpEdit}
							title={translate(({ buttons }) => buttons.edit)}
							onClick={handleOnEditClick}
						/>
					</PartyInfoWrapper>
				</PopoverWrapper>
			)}
		</PartyNameCardContainer>
	);
}
