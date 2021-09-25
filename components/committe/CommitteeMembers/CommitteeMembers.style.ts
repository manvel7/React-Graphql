import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';
import { AutoComplete as BaseAutoComplete } from '../../ui/AutoComplete';

export const CommitteeMembersContainer = styled.div``;

export const PageFilters = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1.8rem 2rem;
	margin: 1rem 0;
`;

export const FiltersBlock = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 50%;
`;

export const FiltersItem = styled.div`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.gray[100]};
`;

export const MembersList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const AddCommitteeMemberList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

//TODO: create card Component
export const AddCommitteeMemberCard = styled.div`
	padding: 2rem 2.5rem;
	border: 0.1rem solid ${Colors.gray[50]};
	border-radius: 1rem;
	margin-bottom: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const AddCommitteeMemberCardTitle = styled.p``;

export const ModalButtonContent = styled.div`
	margin-right: 1rem;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	width: auto;
`;
export const CommitteeMembersList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 2rem;
`;

export const ModalBodyContent = styled.div`
	width: 100%;
	padding: 0 2.4rem;
`;

export const ModalOptionsBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.8rem;
`;

export const PageInfoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
`;

export const RemovableBadgeContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.2rem 1.2rem;
	margin-right: 0.8rem;
	margin-bottom: 0.8rem;
	border-radius: 7rem;
	background-color: ${Colors.blue[6]};
`;

export const RemovableBadgeTitle = styled.p`
	font-size: 1.2rem;
	color: ${Colors.black[100]};
	margin-right: 0.8rem;
	white-space: nowrap;
`;
export const SelectedUsersBadgeList = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;
