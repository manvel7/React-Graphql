import styled from 'styled-components';
import { Colors, Fonts } from '../../../environment';

import { Input as BaseInput } from '../../ui';

import { PrimaryButton as BasePrimaryButton } from '../../ui';

import { MemberDefaultCard as BaseMemberDefaultCard } from '../../cards';

export const GeneralContent = styled.div`
	max-width: 71.4rem;
	margin: 0 auto;
`;

export const FormItem = styled.div`
	display: flex;
	margin-bottom: 4rem;
`;

export const Input = styled(BaseInput)``;

export const Form = styled.form``;

export const GeneralSubTitle = styled.h5`
	color: ${Colors.black[100]};
	font-weight: 8rem;
	margin-bottom: 3rem;
	padding-left: 1.2rem;
`;

export const MemberDefaultCardContainer = styled.div`
	display: flex;
	padding: 1.5rem;
	position: relative;
	cursor: pointer;
	border-radius: 0.4rem;
`;

export const CardTitleBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	margin: 0 1.6rem 0 3.2rem;
	min-width: 15rem;
	cursor: pointer;
`;

export const CardTitle = styled.p`
	font-family: ${Fonts.heading};
	color: ${Colors.primaryDark};
	font-size: 1.4rem;
	font-weight: 600;
	line-height: 1.7rem;
`;

export const CardSubTitle = styled.p`
	font-size: 1.3rem;
	color: ${Colors.typoPlaceholder};
	line-height: 2.1rem;
	margin-right: 1rem;
`;

export const ComponentBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 4.8rem;
	margin-bottom: 4.8rem;
	width: 70rem;
`;

export const PageTitle = styled.h5`
	font-weight: 800;
	color: ${Colors.black[100]};
	margin-bottom: 2rem;
`;

export const PageTypoText = styled.p`
	font-size: 1.4rem;
	color: ${Colors.typoPlaceholder};
	line-height: 150%;
	margin-bottom: 2.5rem;
`;

export const CommitteeAdminsBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 4.8rem;
	margin-bottom: 2.8rem;
	margin-top: 10rem;
	width: 80rem;
`;

export const PrimaryButton = styled(BasePrimaryButton)``;

export const AdminList = styled.div`
	margin-bottom: 2.4rem;
`;

export const MemberDefaultCard = styled(BaseMemberDefaultCard)`
	margin-bottom: 1rem;
`;
