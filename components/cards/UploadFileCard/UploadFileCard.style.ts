import styled from 'styled-components';
import { Colors } from '../../../environment';

export const UploadFileContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.8rem;
	padding: 1.2rem 1.8rem 1.2rem 0.8rem;
	cursor: pointer;

	:hover {
		background-color: ${Colors.neutralBlue[5]};
		color: ${Colors.blue[100]};
	}
`;

export const CardContent = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

export const UploadFileTitle = styled.p`
	padding-left: 2.6rem;
	font-weight: 500;
	color: ${Colors.black[100]};
	font-size: 1.3rem;
	width: 100%;
`;

export const UploadFileSize = styled.p`
	padding-left: 7.6rem;
	font-weight: 500;
	font-size: 1.3rem;
	color: ${Colors.black[100]};
	width: 100%;
`;

export const Progressbar = styled.div`
	width: 100%;
	max-width: 10.6rem;
	height: 0.5rem;
	background: ${Colors.neutralBlue[8]};
	border-radius: 5rem;
	margin-right: 1rem;
`;

interface ProgressbarItemProps {
	width: number;
}

export const ProgressbarItem = styled.span<ProgressbarItemProps>`
	width: ${props => `${props.width}%`};
	background-color: ${Colors.blue[100]};
	transition: width 2s;
	height: 0.8rem;
	display: block;
	height: 100%;
`;
