import React from 'react';
import { Route as ReactRoute, RouteComponentProps, RouteProps, Redirect } from 'react-router-dom';

import { StorageKey } from '../../../consts';
import { Routes } from '../../../app/Router';

// eslint-disable-next-line
interface RouteParams {}

interface Props extends RouteProps {
	guarded?: boolean;
	component: React.ComponentType<RouteComponentProps<RouteParams>> | React.ComponentType<any>;
}

export function Route({ guarded, component: Component, ...rest }: Props) {
	const logged = !!localStorage.getItem(StorageKey.Token);

	if (guarded) {
		if (logged) {
			// if (rest.path === Routes.Root) {
			// 	console.log(rest)
			// 	return <Redirect to={Routes.Members} />;
			// }
			return <ReactRoute {...rest} component={Component} />;
		}
		return <Redirect to={Routes.Login} />;
	} else if (logged) {
		return <Redirect to={Routes.Members} />;
	}

	return <ReactRoute {...rest} component={Component} />;
}
