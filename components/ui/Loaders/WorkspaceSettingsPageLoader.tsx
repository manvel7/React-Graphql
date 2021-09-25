import React from 'react';
import ContentLoader from 'react-content-loader';

const Article = (props: any) => (
	<ContentLoader viewBox="0 0 720 160" height={160} width={720} speed={1} {...props}>
		<rect x="0" y="13" rx="4" ry="4" width="720" height="9" />
		<rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
		<rect x="0" y="50" rx="4" ry="4" width="720" height="10" />
		<rect x="0" y="65" rx="4" ry="4" width="720" height="10" />
		<rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
		<rect x="0" y="99" rx="5" ry="5" width="720" height="200" />
	</ContentLoader>
);

const ImageList = (props: any) => (
	<div style={{ display: 'flex', flexDirection: 'column' }}>
		{Array(5)
			.fill('')
			.map((e, i) => (
				<Article
					screen="desktop"
					key={i}
					style={{ opacity: Number(2 / i).toFixed(1) }}
					{...props}
				/>
			))}
	</div>
);

Article.metadata = {
	name: 'RoyalBhati',
	github: 'royalbhati',
	description: 'Simple Article',
	filename: 'Article'
};

export { ImageList as WorkspaceSettingsPageLoader };
