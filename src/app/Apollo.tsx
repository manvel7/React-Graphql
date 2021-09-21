import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, DefaultOptions } from 'apollo-client';
import { Subscription } from 'apollo-client/util/Observable';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';

import React, { useState } from 'react';
import uuid from 'uuid/v4';

import { Alerts } from './Alerts';
import { AlertType, StorageKey } from '../consts';
import { useMemoOnce } from '../hooks';
import { Alert } from '../types';

interface Props {
	children: React.ReactNode;
}

const request = new ApolloLink(
	(operation, forward) =>
		new Observable(observer => {
			let handle: Subscription;

			Promise.resolve(operation)
				.then(op => {
					const token = localStorage.getItem(StorageKey.Token);

					if (token) {
						op.setContext({
							headers: {
								authorization: token
							}
						});
					}
				})
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer)
					});
				})
				.catch(observer.error.bind(observer));

			return () => {
				if (handle) handle.unsubscribe();
			};
		})
);
const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'network-only',
		errorPolicy: 'ignore'
	},
	query: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all'
	}
};

export function Apollo({ children }: Props) {
	const [alerts, setAlerts] = useState<Alert[]>([]);

	const client = useMemoOnce(
		() =>
			new ApolloClient({
				link: ApolloLink.from([
					onError(({ graphQLErrors, networkError }) => {
						const errors: Alert[] = [];

						if (graphQLErrors) {
							graphQLErrors.forEach(({ message }) => {
								console.log(`[GraphQL error]: Message: ${message}`);
								errors.push({ uuid: uuid(), type: AlertType.Error, message });
							});
						}

						if (networkError) {
							console.log(`[Network error]: ${networkError}`);
							errors.push({
								uuid: uuid(),
								type: AlertType.Error,
								message: networkError.message
							});
						}

						setAlerts(errors);
					}),
					request,
					createUploadLink({ uri: process.env.REACT_APP_API_ROOT }),
					new HttpLink({ uri: process.env.REACT_APP_API_ROOT })
				]),
				cache: new InMemoryCache(),
				defaultOptions: defaultOptions
			})
	);

	return (
		<ApolloProvider client={client}>
			<Alerts errors={alerts}>{children}</Alerts>
		</ApolloProvider>
	);
}
