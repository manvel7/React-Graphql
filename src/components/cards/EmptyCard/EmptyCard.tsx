import React from 'react';
import {
	EmptyCardContainer,
	CardTitle,
	ContentCard,
	GhostButton,
	EmptyCardHeader
} from './EmptyCard.style';
import { Icon, ButtonSize } from '../../ui';
import { IconType } from '../../../consts';
import { useNavigation } from '../../../hooks/ui';

interface EmptyCardProps {
	title: string;
	iconName?: any;
	buttonTitle?: string;
	path?: string;
	onCustomClick?: () => void;
}

export function EmptyCard({ title, iconName, buttonTitle, path, onCustomClick }: EmptyCardProps) {
	const { navigate } = useNavigation();

	function handleGetPath() {
		if (path) {
			navigate(path);
		}
	}

	return (
		<EmptyCardContainer>
			<EmptyCardHeader>
				<Icon name={iconName} />
			</EmptyCardHeader>
			<ContentCard>
				<CardTitle>{title}</CardTitle>
				{onCustomClick ? (
					<GhostButton
						size={ButtonSize.SM}
						leftIcon={IconType.EpPlus}
						onClick={onCustomClick}
						title={buttonTitle}
					/>
				) : (
					<GhostButton
						size={ButtonSize.SM}
						leftIcon={IconType.EpPlus}
						onClick={handleGetPath}
						title={buttonTitle}
					/>
				)}
			</ContentCard>
		</EmptyCardContainer>
	);
}
