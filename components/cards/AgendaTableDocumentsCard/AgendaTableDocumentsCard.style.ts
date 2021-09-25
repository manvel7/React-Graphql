import styled from 'styled-components';
import { Colors, Icons, Shadows, Fonts } from '../../../environment';
import { Icon, LightButton as BaseLightButton } from '../../ui';

export const AgendaTableDocumentsCardContainer = styled.div`
	position: relative;
`;

export const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const DocumentBlock = styled.div`
	display: flex;
	align-items: center;
`;

export const DocumentTitle = styled.p`
	font-size: 1.3rem;
	color: ${Colors.gray[100]};
	flex: 1;
	text-align: center;
	margin-bottom: 1rem;
`;

export const DocumentIconWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: -8rem;
`;

export const DocumentIconBackground = styled(Icons.EpFileIcon)``;

export const DocumentIcon = styled(Icon)`
	position: absolute;
	transform: translateY(-10%);
`;

export const PopoverContainer = styled.div`
	position: absolute;
	top: -3rem;
	right: 0;
	width: 30rem;
	background-color: ${Colors.white};
	border-radius: 0.4rem;
	box-shadow: ${Shadows.dropDownMenu};
	z-index: 10;
`;

export const PopoverContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.6rem 0.8rem 1.2rem 0.8rem;
	border-bottom: 0.1rem solid ${Colors.neutralBlue[10]};
`;

export const PopoverContentItem = styled.div`
	display: flex;
	padding: 0.5rem 0.8rem;
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

export const LightButton = styled(BaseLightButton)`
	margin-bottom: 0.8rem;
`;

export const MoreDocsText = styled.p`
	text-align: center;
	font-size: 1.3rem;
`;

export const FileInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
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
	transition: 0.3s;

	& :hover {
		color: ${Colors.blue[100]};
		background-color: ${Colors.blue[8]};
	}
`;

export const DocumentContentBlock = styled.div`
	display: flex;
	align-items: center;
`;
