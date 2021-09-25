export const Sizes = {
	xs: '320px',
	sm: '425px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	hd: '1440px'
};

export const MediaQueries = {
	minWidth: {
		xs: `(min-width: ${Sizes.xs})`,
		sm: `(min-width: ${Sizes.sm})`,
		md: `(min-width: ${Sizes.md})`,
		lg: `(min-width: ${Sizes.lg})`,
		xl: `(min-width: ${Sizes.xl})`,
		hd: `(min-width: ${Sizes.hd})`
	},
	minHeight: {
		xs: `(min-height: ${Sizes.xs})`,
		sm: `(min-height: ${Sizes.sm})`,
		md: `(min-height: ${Sizes.md})`,
		lg: `(min-height: ${Sizes.lg})`,
		xl: `(min-height: ${Sizes.xl})`,
		hd: `(min-height: ${Sizes.hd})`
	},
	maxWidth: {
		xs: `(max-width: ${Sizes.xs})`,
		sm: `(max-width: ${Sizes.sm})`,
		md: `(max-width: ${Sizes.md})`,
		lg: `(max-width: ${Sizes.lg})`,
		xl: `(max-width: ${Sizes.xl})`,
		hd: `(max-width: ${Sizes.hd})`
	},
	maxHeight: {
		xs: `(max-height: ${Sizes.xs})`,
		sm: `(max-height: ${Sizes.sm})`,
		md: `(max-height: ${Sizes.md})`,
		lg: `(max-height: ${Sizes.lg})`,
		xl: `(max-height: ${Sizes.xl})`,
		hd: `(max-height: ${Sizes.hd})`
	}
};
