/**
 * No hooks available yet for componentDidCatch and getDerivedStateFromError
 */

import React from 'react';
import styled from 'styled-components';

import { Colors } from '../environment';

export class ErrorBoundary extends React.Component {
	public state = {
		error: false
	};

	public componentDidCatch(error: Error, info: any) {
		console.log(error, info);
		this.setState({ error: true });
	}

	public render() {
		if (this.state.error) {
			return (
				<Container>
					<Text>Something went wrong.</Text>
				</Container>
			);
		}

		return this.props.children;
	}
}

const Container = styled.div`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Text = styled.p`
	color: ${Colors.black};
	font-size: 20;
`;
