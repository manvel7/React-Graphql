import styled from 'styled-components';
import { Colors } from '../../../environment';
import { Icon as BaseIcon } from '../../ui';

export const IconBlock = styled.div`
	margin: 0 0.4rem;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FolderImage = styled.img`
	width: 5rem;
`;

export const FolderIcon = styled(BaseIcon)`
	position: absolute;
`;

export const InfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export const CardTitle = styled.p`
	font-size: 1.3rem;
	font-weight: 600;
	color: ${Colors.black[100]};
`;

interface FolderDefaultCardContainerProps {
	expanded: boolean;
	isSubItem: boolean;
}

export const FolderDefaultCardContainer = styled.div<FolderDefaultCardContainerProps>`
	display: flex;
	align-items: center;
	padding: 0.6rem 0.8rem;
	margin-bottom: 0.2rem;
	border-radius: 0.4rem;
	cursor: pointer;
	background-color: ${props => (props.expanded ? Colors.neutralBlue[5] : Colors.transparent)};
	margin-left: ${props => (props.isSubItem ? '1.5rem' : 0)};

	:hover {
		background-color: ${Colors.neutralBlue[5]};
		${CardTitle} {
			color: ${Colors.blue[100]};
		}
	}
`;

export const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
