import styled from 'styled-components';
import { Colors } from '../../../environment';
import { DefaultButton as BaseDefaultButton } from '../../ui';

export const AgendaRepresentorCardContainer = styled.div`
	display: flex;
`;

export const CardAvatarBlock = styled.div`
	margin-right: 1.2rem;
`;

export const CardInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardInfoTitle = styled.p`
	font-size: 1.3rem;
	font-weight: 500;
	color: ${Colors.black[100]};
`;

export const CardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
`;

export const CommitteemembersList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 2rem;
`;

export const DefaultButton = styled(BaseDefaultButton)`
	margin-right: 1.6rem;
`;
