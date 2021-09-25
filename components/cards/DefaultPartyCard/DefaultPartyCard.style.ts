import styled, { css } from 'styled-components';
import { DangerButton as BaseDangerButton } from '../../../components/ui';
import { Colors, Fonts } from '../../../environment';

interface DefaultPartyCardContainerProps {
	isLoading: boolean;
}
export const DefaultPartyCardContainer = styled.div<DefaultPartyCardContainerProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 1.2rem 2rem;
	margin-bottom: 2rem;
	background-color: ${Colors.neutralBlue[20]};
	border-radius: 1rem;

	${props =>
		props.isLoading &&
		css`
			opacity: 0.3;
			pointer-events: none;
		`}
`;

export const CardLogo = styled.img`
	width: 6rem;
	height: 6rem;
`;

export const CardActionsBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const DangerButton = styled(BaseDangerButton)`
	margin-left: 2rem;
`;

export const FileInputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const FileInput = styled.input`
	display: none;
`;

export const FileInputLabel = styled.label`
	cursor: pointer;
	text-align: center;
	width: 15rem;
	border: 0.1rem dashed ${Colors.overlay[40]};
	padding: 1rem;
	border-radius: 1rem;
	font-size: 1.6rem;
	font-family: ${Fonts.heading};
	color: ${Colors.black[100]};
	background-color: ${Colors.transparent};
	transition: 0.3s;

	& :hover {
		background-color: ${Colors.overlay[3]};
	}
`;

export const PartyName = styled.p`
	font-size: 1.8rem;
`;

export const PartyCountry = styled.p`
	font-size: 1.8rem;
`;

export const PartyPosition = styled.p`
	font-size: 1.8rem;
`;
