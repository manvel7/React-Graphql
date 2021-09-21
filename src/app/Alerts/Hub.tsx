import React, { useRef } from 'react';
import { useTransition } from 'react-spring';

import { AlertType, DEFAULT_ACTIVITY_TIMEOUT } from '../../consts';
import { Alert } from '../../types';

import {
	Close,
	Container,
	Content,
	ErrorIcon,
	Life,
	Message,
	NotificationIcon,
	Title,
	Wrapper
} from './Hub.style';

interface Props {
	items: Alert[];
	filterItems: (uuid: string) => void;
}

interface AnimationProps {
	life?: string;
	opacity?: number;
	height?: number | string;
}

const spring = { tension: 125, friction: 20, precision: 0.1 };

export function Hub({ items, filterItems }: Props) {
	const refMap = useRef(new Map<string, number>()).current;
	const cancelMap = useRef(new Map<string, () => void>()).current;

	const close = (e: React.MouseEvent, uuid: string) => {
		e.stopPropagation();

		const cancel = cancelMap.get(uuid);
		if (cancel) {
			cancel();
			cancelMap.delete(uuid);
		}
	};

	const transitions = useTransition(items, ({ uuid }: Alert) => uuid, {
		from: { opacity: 0, height: 0, life: '100%' },
		enter: ({ uuid }: Alert) => async (next: (props: AnimationProps) => void) =>
			next({ opacity: 1, height: refMap.get(uuid) }),
		leave: (item: Alert) => async (
			next: (props: AnimationProps) => void,
			cancel: () => void
		) => {
			cancelMap.set(item.uuid, cancel);
			await next({ life: '0%' });
			await next({ opacity: 0 });
			await next({ height: 0 });
		},
		onRest: ({ uuid }: Alert) => filterItems(uuid),
		onDestroyed: ({ uuid }: Alert) => {
			const ref = refMap.get(uuid);
			if (ref) {
				refMap.delete(uuid);
			}

			const cancel = cancelMap.get(uuid);
			if (cancel) {
				cancelMap.delete(uuid);
			}
		},
		config: ({ timeout }: Alert, state: string) => (props: string) => {
			switch (props) {
				case 'life': {
					return state === 'leave'
						? { duration: timeout || DEFAULT_ACTIVITY_TIMEOUT }
						: spring;
				}

				default: {
					return spring;
				}
			}
		}
	});

	return (
		<Container>
			{transitions.map(
				({
					item,
					key,
					props: { life, ...style }
				}: {
					item: Alert;
					key: string;
					props: AnimationProps;
				}) => (
					<Wrapper key={key} type={item.type} style={style}>
						{item.type === AlertType.Error ? <ErrorIcon /> : <NotificationIcon />}
						<Content
							ref={(ref: HTMLElement | null) =>
								ref && refMap.set(item.uuid, ref.offsetHeight)
							}
						>
							{item.title && <Title>{item.title}</Title>}
							<Message>{item.message}</Message>
							<Life type={item.type} style={{ right: life }} />
						</Content>
						<Close onClick={e => close(e, item.uuid)} />
					</Wrapper>
				)
			)}
		</Container>
	);
}
