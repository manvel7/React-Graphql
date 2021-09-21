import styled from 'styled-components';

import { Shadows, Colors, Fonts } from '../../../environment';
import { Select as BaseSelect } from '../Select';

export const SortOrFilterMenuContainer = styled.div`
	position: relative;
`;

export const MenuWrapper = styled.div`
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	border-radius: 0.5rem;
	margin: 1rem 0 0 0;
	z-index: 5;
	background-color: ${Colors.white};
	box-shadow: ${Shadows.dropDownMenu};
	width: 49.5rem;
`;

export const WrapperBlock = styled.div`
	padding: 0 1.6rem 0 2.4rem;
`;

export const WrapperTitle = styled.p`
	font-size: 1.4rem;
	font-weight: 500;
	font-family: ${Fonts.heading};
	color: ${Colors.black[100]};
	margin: 2rem 0;
`;

export const WrapperText = styled.p`
	margin-right: 1.2rem;
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.gray[100]};
`;

export const WrapperRow = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
`;

export const Divider = styled.div`
	margin: 0.5rem 0 0.5rem 0;
	width: 100%;
	height: 0.1rem;
	background-color: ${Colors.neutralBlue[100]};
	opacity: 0.1;
`;

export const RemoveFilterBlock = styled.div`
	margin-left: auto;
`;

export const Select = styled(BaseSelect)`
	margin-right: 1rem;
`;

export const AddFilterBlock = styled.div`
	margin-bottom: 1.6rem;
`;
