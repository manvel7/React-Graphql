import React from 'react';
import ContentLoader from 'react-content-loader';

export const DocumentCardLoader = (props: any) => (
	<ContentLoader
		viewBox="0 0 180 130"
		width={180}
		height={130}
		speed={2}
		title="Loading docs..."
		{...props}
	>
		<rect x="5" y="5" rx="5" ry="5" width="170" height="120" />
		<rect x="192.84" y="9.67" rx="0" ry="0" width="148.72" height="12.12" />
		<rect x="192.84" y="25.67" rx="0" ry="0" width="89" height="9" />
	</ContentLoader>
);

DocumentCardLoader.metadata = {
	name: 'Arthur Falcão',
	github: 'arthurfalcao',
	description: 'News List',
	filename: 'News'
};
