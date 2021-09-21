import styled from 'styled-components';
import { Colors } from '../../../environment';
import {
	LightButton as BaseLightButton,
	Input as BaseInput,
	Textarea as BaseTextarea
} from '../../ui';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PageTitle = styled.h5`
	color: ${Colors.black[100]};
	margin-bottom: 2.6rem;
`;

export const UploadImageBlock = styled.div`
	display: flex;
	align-items: center;
	margin-left: 5.2rem;
	margin-bottom: 4rem;
`;

export const ImageContent = styled.div`
	margin-right: 3.2rem;
`;

export const UserImage = styled.img`
	border-radius: 50%;
	width: 12rem;
	height: 12rem;
`;

export const LightButton = styled(BaseLightButton)`
	margin-right: 0.8rem;
`;

export const UserAccoutGeneralInfoForm = styled.form`
	display: flex;
	flex-direction: column;
`;

export const FormItem = styled.div`
	display: flex;
	margin-bottom: 4rem;
`;

export const FormItemIconBlock = styled.div`
	min-width: 3.2rem;
	padding: 0.4rem;
`;

export const Input = styled(BaseInput)`
	width: 32rem;
	margin-left: 2rem;
`;

export const Textarea = styled(BaseTextarea)`
	margin-left: 2rem;
`;

export const UpdateButtonContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
