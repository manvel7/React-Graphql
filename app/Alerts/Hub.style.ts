import { FaInfoCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { animated } from 'react-spring';
import styled from 'styled-components';

import { AlertType } from '../../consts';
import { Colors, Shadows } from '../../environment';

export const Container = styled.div`
	position: fixed;
	top: 3rem;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 1000;
`;

interface AlertProps {
	type: AlertType;
}

const StyledWrapper = styled.div<AlertProps>`
	position: relative;
	display: flex;
	align-items: center;
	width: 40rem;
	padding: 0 2rem;
	background-color: ${({ type }) =>
		type === AlertType.Error ? Colors.red[80] : Colors.blue[80]};
	overflow: hidden;
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	box-shadow: ${Shadows.light};
`;
export const Wrapper = animated(StyledWrapper);

export const Content = styled.div`
	flex: 1;
	padding: 2rem 0;
`;

export const Title = styled.h5`
	color: ${Colors.white};
	margin-bottom: 1rem;
`;

export const Message = styled.p`
	color: ${Colors.white};
	font-size: 1.4rem;
`;

const StyledLife = styled.div<AlertProps>`
	position: absolute;
	left: 0;
	bottom: 0;
	height: 0.5rem;
	background: ${({ type }) => (type === AlertType.Error ? Colors.red[100] : Colors.blue[100])};
`;

export const Life = animated(StyledLife);

export const Close = styled(FaTimes)`
	font-size: 2rem;
	color: ${Colors.white};
	margin-left: 1rem;
	cursor: pointer;

	&:hover {
		color: ${Colors.white};
	}
`;

export const ErrorIcon = styled(FaTimesCircle)`
	font-size: 2.5rem;
	color: ${Colors.white};
	margin-right: 1rem;
`;

export const NotificationIcon = styled(FaInfoCircle)`
	font-size: 2.5rem;
	color: ${Colors.white};
	margin-right: 1rem;
`;
