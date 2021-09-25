import styled from 'styled-components';
import { Colors } from '../../../environment';

export const DocumentCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 0.1rem solid ${Colors.neutralBlue[20]};
	border-radius: 1.6rem;
	background-color: ${Colors.lightColorLight};
	padding: 2rem 2.5rem 0.4rem 2.5rem;
	cursor: pointer;

	:hover {
		border: 0.1rem solid ${Colors.blue[40]};
		background-color: ${Colors.neutralBlue[5]};
	}

	width: 23rem;
	height: 23.5rem;
`;

export const DocumentViewerBlock = styled.div`
	border-radius: 0.2rem;
	background-color: ${Colors.white};

	max-width: 18rem;
	max-height: 13rem;
	overflow: hidden;
`;

export const CardBody = styled.div`
	display: flex;
	margin-top: 1.6rem;
`;

export const CardIconBlock = styled.div`
	margin-right: 1rem;
`;

export const CardInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardTitle = styled.p`
	font-weight: 600;
	font-size: 1.3rem;
	color: ${Colors.black[100]};
	margin-bottom: 0.4rem;
`;

export const CardText = styled.p`
	font-weight: 500;
	font-size: 1.2rem;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 0.2rem;
`;
