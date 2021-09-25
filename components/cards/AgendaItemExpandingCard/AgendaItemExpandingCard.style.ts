import styled from 'styled-components';
import { Colors } from '../../../environment';

export const AgendaItemExpandingCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2.4rem;
`;

export const CardMainBlock = styled.div`
	display: flex;
	align-items: center;
	padding: 1.6rem 2rem 1.6rem 0;
`;

export const CardTitleBlock = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin-left: 1.6rem;
	margin-bottom: 0.8rem;
`;

export const CardTitle = styled.h6`
	font-size: 1.5rem;
	font-weight: 600;
	color: ${Colors.black[100]};
	margin-bottom: 0.4rem;
`;

export const CardInfoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const CardSubTitle = styled.p`
	font-size: 1.2rem;
	text-transform: uppercase;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 1.6rem;
`;

export const CardContentBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 4.4rem;
`;

export const ItemsBlock = styled.div`
	margin-top: 0.8rem;
	margin-bottom: 2.6rem;
	display: flex;
	flex-direction: column;
`;

export const SuggestionsBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
`;

export const RepliesBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardDocumentTitle = styled.p`
	font-size: 1.3rem;
	color: ${Colors.gray[100]};
	margin-left: 1.6rem;
	flex: 1;
`;

export const CardDocumentWrapper = styled.div`
	display: flex;
	align-items: center;
	border-radius: 0.4rem;
	background-color: ${Colors.transparent};
	padding: 0.2rem 0.8rem;
	cursor: pointer;

	&:hover {
		background-color: ${Colors.blue[6]};

		${CardDocumentTitle} {
			color: ${Colors.blue[100]};
		}
	}
`;
