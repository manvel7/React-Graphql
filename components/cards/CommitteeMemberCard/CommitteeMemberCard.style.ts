import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

export const CardAvatar = styled.div`
	padding-right: 4rem;
`;

export const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CardInfoTitle = styled.p`
	font-weight: bold;
	font-family: ${Fonts.heading};
	margin-bottom: 0;
`;

export const CardInfoSubTitle = styled.p`
	font-family: ${Fonts.heading};
	font-size: 1.3rem;
	color: ${Colors.black[100]};
	opacity: 0.5;
	margin-bottom: 1.2rem;
`;

export const CardInfoRole = styled.p`
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	color: ${Colors.black[100]};
	margin-bottom: 1.7rem;
`;

export const CardInfoEmail = styled.p`
	font-family: ${Fonts.heading};
	font-size: 1.3rem;
	color: ${Colors.blue[80]};
	margin-bottom: 1.5rem;
`;

export const CardOptions = styled.div`
	width: 10rem;
	margin-left: auto;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
`;

export const OptionsIconContainer = styled.div`
	position: absolute;
	top: 0;
	padding: 0 1.5rem;
	color: ${Colors.gray[80]};
`;

export const OptionsMessageContainer = styled.div`
	padding: 0.4rem 0.8rem;
	color: ${Colors.gray[80]};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const OptionsMessageTitle = styled.p`
	font-size: 1.3rem;
	opacity: 0;
	margin-bottom: 0;
`;

export const CommitteeMemberCardContainer = styled.div`
	display: flex;
	border-radius: 1rem;
	padding: 2.5rem 2rem;
	cursor: pointer;

	:hover {
		background-color: ${Colors.blue[4]};
		${OptionsMessageContainer} {
			color: ${Colors.blue[100]};
			background: rgba(16, 90, 202, 0.07);
			border-radius: 0.8rem;
			width: 10.2rem;
		}
		${OptionsMessageTitle} {
			opacity: 1;
		}
	}
`;
