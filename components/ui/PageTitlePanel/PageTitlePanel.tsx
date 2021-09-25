import React from 'react';
import {
	PageTitlePanelContainer,
	PageTitle,
	PageTitlePanelActionsBlock
} from './PageTitlePanel.style';

interface PageTitlePanelProps {
	title: string;
	children?: React.ReactNode;
}

export function PageTitlePanel({ title, children }: PageTitlePanelProps) {
	return (
		<PageTitlePanelContainer>
			<PageTitle>{title}</PageTitle>
			<PageTitlePanelActionsBlock>{children}</PageTitlePanelActionsBlock>
		</PageTitlePanelContainer>
	);
}
