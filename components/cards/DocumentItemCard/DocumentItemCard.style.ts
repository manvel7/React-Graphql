import styled from 'styled-components';
import { Colors, Icons } from '../../../environment';
import { Icon } from '../../ui';

export const CheckboxBlock = styled.div`
	padding: 0.7rem;
	border-radius: 0.4rem;
	margin-right: 1rem;

	&:hover {
		background-color: ${Colors.blue[8]};
	}
`;

export const CardIconBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-right: 1rem;
`;

export const CardIconWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CardIconBackground = styled(Icons.EpFileIcon)``;

export const CardIcon = styled(Icon)`
	position: absolute;
	transform: translateY(-10%);
`;

export const CardInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardTitle = styled.p`
	font-size: 1.5rem;
	font-weight: 500;
	color: ${Colors.black[100]};
	margin-bottom: 0.5rem;
`;

export const CardInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	display: flex;
	align-items: center;
`;

export const DocumentItemCardContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 1.8rem 0.8rem;
	border-radius: 0.4rem;
	cursor: pointer;

	&:hover {
		background-color: ${Colors.neutralBlue[5]};
		${CardTitle} {
			color: ${Colors.blue[100]};
		}
	}
`;
