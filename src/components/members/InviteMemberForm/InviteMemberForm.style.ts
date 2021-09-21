import styled from 'styled-components';
import { Input as BaseInput } from '../../ui';
import { Fonts, Colors } from '../../../environment';
import { AutoComplete as BaseAutoComplete } from '../../ui';

export const FormWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const FormTabsContainer = styled.ul`
	padding: 0 3.2rem;
	border-bottom: 0.1rem solid ${Colors.dividerLight};
`;

interface FormTabItemProps {
	active: boolean;
}

export const FormTabItem = styled.li<FormTabItemProps>`
	float: left;
	list-style: none;
	font-family: ${Fonts.heading};
	font-size: 1.4rem;
	font-weight: 500;
	color: ${props => (props.active ? Colors.black[100] : Colors.typoPlaceholder)};
	padding: 1.5rem 2.2rem;
	cursor: pointer;
	border-bottom: 0.1rem solid ${props => (props.active ? Colors.blue[100] : Colors.transparent)};

	:hover {
		color: ${Colors.black[100]};
	}
`;

export const Form = styled.form``;

export const Input = styled(BaseInput)`
	margin-bottom: 3rem;
	width: 35rem;
`;

export const AutoComplete = styled(BaseAutoComplete)`
	margin-bottom: 3rem;
	width: 35rem;
`;

export const GeneralContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 3.2rem;
`;

export const AccessContainer = styled.div``;

export const GlobalAccessContainer = styled.div`
	border-bottom: 0.1rem solid ${Colors.dividerLight};
	padding: 3.2rem;
`;

export const AccessTitle = styled.p`
	font-size: 1.5rem;
	font-weight: 500;
	color: ${Colors.black[100]};
	margin-top: -2rem;
`;

export const AccessContainerInfoTextBlock = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export const AccessContainerInfoIconBlock = styled.div`
	margin-right: 0.8rem;
`;

export const AccessContainerInfoText = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	margin-bottom: 0;
`;

export const InviteToCommitteeContainer = styled.div`
	padding: 3.2rem;
`;

export const InviteToCommitteeInputsBlock = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const ImportCSVContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 4rem 10rem;
`;

export const CSVIconBlock = styled.div`
	display: flex;
	justify-content: center;
`;

export const CSVText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
	text-align: center;
	line-height: 150%;
	margin: 2.4rem 0;
`;

export const CSVButtonBlock = styled.div`
	display: flex;
	justify-content: center;
`;
