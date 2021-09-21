import styled from 'styled-components';

import { Dropdown as BaseDropdown } from '../Dropdown';

export const PageTopBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 5.6rem;
	padding: 2.2rem 2rem 1.8rem 2rem;
`;

export const TopBarElement = styled.div`
	display: flex;
`;

export const Dropdown = styled(BaseDropdown)`
	margin-left: 0.8rem;
`;
