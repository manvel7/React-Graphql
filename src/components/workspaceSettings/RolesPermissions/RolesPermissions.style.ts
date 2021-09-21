import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';
import { Dropdown as BaseDropdown } from '../../ui/Dropdown';

export const RolesPermissionsContainer = styled.div`
	width: 100%;
	padding-left: 4rem;
	background-color: ${Colors.lightColorLight};
`;

export const RolesPermissionsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100rem;
	padding: 1.4rem 1.4rem 1.4rem 0;
`;

export const PageTitle = styled.h2`
	font-family: ${Fonts.title};
	font-size: 2.4rem;
	font-weight: 800;
	color: ${Colors.black[100]};
`;

export const Dropdown = styled(BaseDropdown)`
	margin-left: 0.8rem;
`;

export const HeaderAction = styled.div`
	display: flex;
`;

export const RolesPermissionsTableContainer = styled.div`
	margin-top: 3.5rem;
`;
