import styled from 'styled-components';
import { Colors } from '../../../../environment';

export const CommitteeCardContent = styled.div`
	display: flex;
	border-radius: 0.8rem;
	padding: 1.5rem;
	cursor: pointer;

	&:hover {
		background-color: ${Colors.neutralBlue[5]};
	}
`;

export const CommitteeCardIconBlock = styled.div``;

export const CommitteeCardInfoBlock = styled.div`
	margin-left: 1.2rem;
`;

export const CommitteeCardTitle = styled.p`
	font-weight: bold;
	color: ${Colors.primaryGray};
	margin-bottom: 0.6rem;
`;

export const CommitteeCardDivider = styled.div`
	width: 0.1rem;
	height: 1.2rem;
	background-color: ${Colors.neutralBlue[40]};
	margin: 0.8rem 0;
`;

export const CardDefaultText = styled.p`
	color: ${Colors.gray[100]};
	font-size: 1.4rem;
	margin: 1.2rem 0;
`;

export const CardTypoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-right: 0.4rem;
`;

export const CardLinkText = styled.p`
	font-size: 1.2rem;
	color: ${Colors.blue[100]};
	margin: 0.4rem 0.4rem 0 0;
	cursor: pointer;
`;
