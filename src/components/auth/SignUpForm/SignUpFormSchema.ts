import * as yup from 'yup';
import { useTranslation } from '../../../hooks';

export function SignUpFormSchema() {
	const translate = useTranslation();

	return yup.object().shape({
		firstName: yup.string().required(translate(({ inputs }) => inputs.firstName.required)),
		lastName: yup.string().required(translate(({ inputs }) => inputs.lastName.required)),
		email: yup
			.string()
			.email(translate(({ inputs }) => inputs.email.invalid))
			.required(translate(({ inputs }) => inputs.email.required)),
		verifyEmail: yup.string().required(translate(({ inputs }) => inputs.verifyEmail.required)),
		phone: yup
			.number()
			.integer(translate(({ inputs }) => inputs.phone.invalid))
			.required(translate(({ inputs }) => inputs.phone.required)),
		workspace: yup
			.string()
			.min(
				3,
				translate(({ inputs }) => inputs.workspace.invalid)
			)
			.required(translate(({ inputs }) => inputs.workspace.required)),
		organization: yup
			.number()
			.integer(translate(({ inputs }) => inputs.organization.invalid))
			.required(translate(({ inputs }) => inputs.organization.required)),
		password: yup
			.string()
			.required(translate(({ inputs }) => inputs.password.required))
			.min(
				6,
				translate(({ inputs }) => inputs.password.minLength)
			)
			.matches(
				/([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])/,
				translate(({ inputs }) => inputs.password.invalid)
			),
		confirmPassword: yup
			.string()
			.required(translate(({ inputs }) => inputs.confirmPassword.required))
			.oneOf(
				[yup.ref('password'), null],
				translate(({ inputs }) => inputs.confirmPassword.invalid)
			)
	});
}
