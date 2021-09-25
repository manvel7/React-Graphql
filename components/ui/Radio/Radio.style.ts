import styled from 'styled-components';
import { Colors } from '../../../environment';

export const RadioButtonContainer = styled.label`
	display: flex;
	align-items: center;
	height: 2.4rem;
	margin: 0.5rem 0;
	position: relative;
	cursor: pointer;
`;

export const RadioButtonLabel = styled.span`
	position: absolute;
	width: 2.4rem;
	height: 2.4rem;
	border-radius: 50%;
	background: ${Colors.white};
	border: 0.1rem solid ${Colors.neutralBlue[40]};
`;

export const BaseRadioButton = styled.input`
	opacity: 0;
	z-index: 10;
	border-radius: 50%;
	width: 2.4rem;
	height: 2.4rem;
	cursor: pointer;

	&:hover ~ ${RadioButtonLabel} {
		background: ${Colors.blue[10]};
	}
	${props =>
		props.checked &&
		` 
        &:checked + ${RadioButtonLabel} {
            background: ${Colors.blue[10]};
            border: .1rem solid ${Colors.blue[10]};
            &::after {
                content: "";
                display: block;
                border-radius: 50%;
                width: .8rem;
                height: .8rem;
                margin: 50%;
                transform: translate(-.4rem, -.4rem);
                background: ${Colors.blue[100]};
            }
        }
    `}
`;

export const RadioButtonTextLabel = styled.p<{ checked: boolean }>`
	font-size: 1.4rem;
	color: ${props => (props.checked ? Colors.gray[100] : Colors.typoPlaceholder)};
	margin-left: 1.6rem;
	margin-bottom: 0;
`;
