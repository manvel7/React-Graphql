import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AllDefaultPartiesData, AllPartiesInWorkspaceData } from '@epolitiker/api';
import { PoliticalPartyFragment } from '../fragments';

const ALL_DEFAULT_PARTIES = gql`
	query AllDefaultParties($data: AllDefaultPartiesInput!) {
		allDefaultParties(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

const ALL_PARTIES_IN_WORKSPACE = gql`
	query AllPartiesInWorkspace($data: AllPartiesInWorkspaceInput!) {
		allPartiesInWorkspace(data: $data) {
			...PoliticalPartyFragment
		}
	}
	${PoliticalPartyFragment}
`;

export function useAllDefaultPartiesLazyQuery() {
	return useLazyQuery<AllDefaultPartiesData>(ALL_DEFAULT_PARTIES);
}

export function useAllPartiesInWorkspaceLazyQuery() {
	return useLazyQuery<AllPartiesInWorkspaceData>(ALL_PARTIES_IN_WORKSPACE);
}
