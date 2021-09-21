import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Colors } from '../../../environment';

export function DefaultLoader() {
	return (
		<div className="default-suspense-loader">
			<ClipLoader size={80} color={Colors.overlay[40]} loading={true} />
		</div>
	);
}
