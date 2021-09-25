import React from 'react';
import { pdfjs } from 'react-pdf';

// Activating 'react-pdf' worker to allow load PDF thumbnails
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { Apollo } from './Apollo';
import { ErrorBoundary } from './ErrorBoundary';
import { Language } from './Language';
import { Router } from './Router';

export function App() {
	return (
		<ErrorBoundary>
			<Apollo>
				<Language>
					<Router />
				</Language>
			</Apollo>
		</ErrorBoundary>
	);
}
