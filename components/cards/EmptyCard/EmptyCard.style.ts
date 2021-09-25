import styled from 'styled-components';
import { GhostButton as BaseGhostButton } from '../../ui/Button';

export const EmptyCardContainer = styled.div`
	display: flex;
	align-items: center;
`;
export const ContentCard = styled.div``;

export const CardTitle = styled.p`
	opacity: 0.5;
	padding-bottom: 0.5rem;
	font-size: 1.3rem;
`;
export const EmptyCardHeader = styled.div``;

export const GhostButton = styled(BaseGhostButton)`
	margin-right: 0.8rem;
`;

export const PageHeaderBlock = styled.div`
	display: flex;
	align-items: center;
`;
