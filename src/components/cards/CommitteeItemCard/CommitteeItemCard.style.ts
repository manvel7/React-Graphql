import styled from 'styled-components';
import { Colors } from '../../../environment';

export const IconBlock = styled.div`
	margin-right: 1.6rem;
`;

export const FolderImage = styled.img``;

export const InfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export const CardTitle = styled.p`
	font-size: 1.5rem;
	color: ${Colors.black[100]};
	margin-bottom: 0.2rem;
`;

export const CardInfoBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const CardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-right: 0.4rem;
    margin-bottom: 0;
`;

export const CommitteeItemCardContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem 0.8rem 0.5rem 1.2rem;
	margin-bottom: 0.2rem;
	border-radius: 0.4rem;
	cursor: pointer;

	:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;
