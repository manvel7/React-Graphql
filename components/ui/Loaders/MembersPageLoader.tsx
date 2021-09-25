import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props: any) => {
	let height, width;
	switch (props.screen) {
		case 'mobile': {
			height = '100';
			width = '400';
			break;
		}
		case 'desktop': {
			height = '100';
			width = '650';
			break;
		}
		case 'large-screen': {
			height = '150';
			width = '1920';
			break;
		}
		default: {
			height = '100';
			width = '650';
			break;
		}
	}
	return (
		<ContentLoader
			viewBox={`0 0 ${width} ${height}`}
			height={height}
			width={width}
			speed={2}
			{...props}
		>
			<rect x="103" y="12" rx="3" ry="3" width="123" height="7" />
			<rect x="102" y="152" rx="3" ry="3" width="171" height="6" />
			<circle cx="44" cy="42" r="38" />
			<circle cx="44" cy="147" r="38" />
			<circle cx="44" cy="251" r="38" />
			<rect x="105" y="117" rx="3" ry="3" width="123" height="7" />
			<rect x="104" y="222" rx="3" ry="3" width="123" height="7" />
			<rect x="105" y="48" rx="3" ry="3" width="171" height="6" />
			<rect x="104" y="257" rx="3" ry="3" width="171" height="6" />
		</ContentLoader>
	);
};

const ImageList = (props: any) => (
	<React.Fragment>
		{Array(7)
			.fill('')
			.map((e, i) => (
				<Loader
					screen="desktop"
					key={i}
					style={{ opacity: Number(2 / i).toFixed(1) }}
					{...props}
				/>
			))}
	</React.Fragment>
);

ImageList.metadata = {
	name: 'Gaurav Agarwal',
	github: 'gauravagarwal2704',
	description: 'List with image (rectangle/circle)',
	filename: 'ImageList'
};

export { ImageList as MembersPageLoader };
