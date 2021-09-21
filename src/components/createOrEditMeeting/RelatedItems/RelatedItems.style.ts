import styled from 'styled-components';
import { Fonts, Colors, Shadows } from '../../../environment';
import { PrimaryButton as BasePrimaryButton, LightButton as BaseLightButton } from '../../ui';

export const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 1rem 0 4rem;
`;

export const PageFilters = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1.4rem 2rem;
	align-items: center;
`;

export const FiltersLeftBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const FiltersRightBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const FiltersItem = styled.div`
	margin-right: 0.8rem;
	display: flex;
	align-items: center;
`;

export const FiltersItemText = styled.p`
	font-size: 1.4rem;
	font-family: ${Fonts.heading};
	color: ${Colors.gray[100]};
	margin-right: 0.8rem;
`;

export const RelatedItemsList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 2rem;
`;

export const PageFooter = styled.div`
	position: relative;
	padding: 0.8rem 1rem 20rem 2rem;
`;

export const FileInputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 0.8rem;
`;

export const FileInput = styled.input`
	display: none;
`;

export const FileInputLabel = styled.label`
	cursor: pointer;
	text-align: center;
	width: 100%;
	padding: 0.7rem;
	border-radius: 0.4rem;
	font-size: 1.3rem;
	font-family: ${Fonts.paragraph};
	color: ${Colors.typoPlaceholder};
	background-color: ${Colors.transparent};

	& :hover {
		color: ${Colors.blue[100]};
		background-color: ${Colors.blue[8]};
	}
`;

export const PrimaryButton = styled(BasePrimaryButton)`
	margin-left: 0.8rem;
`;

export const LightButton = styled(BaseLightButton)`
	margin-bottom: 0.8rem;
`;

export const PopoverContainer = styled.div`
	position: absolute;
	width: 30rem;
	background-color: ${Colors.white};
	border-radius: 0.4rem;
	box-shadow: ${Shadows.dropDownMenu};
	z-index: 10;
`;

export const PopoverActionsBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.6rem 1.4rem 0.8rem 1.4rem;
`;

export const PopoverFooter = styled.div`
	padding: 0.8rem 0;
	display: flex;
	justify-content: center;
	border-top: 0.1rem solid ${Colors.neutralBlue[10]};
`;
