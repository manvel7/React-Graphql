import styled from 'styled-components';
import { Colors } from '../../../environment';

export const AvatarContainer = styled.div`
	position: relative;
`;

export const AvatarMainImage = styled.img`
	border-radius: 50%;
`;

interface AvatarBadge {
	right: number;
}

export const AvatarBadge = styled.img<AvatarBadge>`
	position: absolute;
	display: block;
	border-radius: 50%;
	top: 50%;
	right: ${props => -props.right + 'px'};
`;

export const AvatarActiveFlag = styled.div`
	position: absolute;
	display: block;
	width: 0.7rem;
	height: 0.7rem;
	border-radius: 50%;
	background-color: ${Colors.green};
	border: 0.1rem solid ${Colors.white};

	transform: scale(1) translate(50%, -50%);
	transform-origin: 100% 0%;
	top: 15%;
	right: 15%;
`;
