import React from 'react';
// import { Colors, Fonts } from '../../../environment';

//TODO:
interface TypographyProps {
	className?: string;
	children: any;
	tag?: keyof JSX.IntrinsicElements;
	size?: number;
	family?: string;
	weight?: number | string;
	color?: string;
	transform?: string;
	align?: string;
	noWrap?: boolean;
}

export function Typography({
	tag: Wrapper = 'p',
	children
}: // className,
// color = Colors.primaryDark,
// size = 16,
// family = Fonts.paragraph,
// weight = 'normal',
// transform = 'lowercase',
// align = 'inherit',
// noWrap = false,
TypographyProps) {
	return <Wrapper>{children}</Wrapper>;
}
