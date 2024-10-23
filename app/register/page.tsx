'use client';
import React, { useEffect } from 'react';
import { Button, Divider } from '@tremor/react';
import Input from '../../ui/common/Input';
import Container from '../../ui/common/Container';
import { withFormik, FormikProps } from 'formik';
import { registrationSchema } from './form/validation.schema';
import { REGISTER_FIELDS as FIELDS, REGISTER_FIELDS_INITIAL_VALUES } from './form/fields';
import { registerUser } from './action';
import { IRegister } from './form/types';

import { Callout } from '@tremor/react';
import ERRORS from '../../constants/errors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const UserRegisterForm = (props: FormikProps<IRegister>) => {
	const {
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
		status,
	} = props;
	const { duplicateRegistration, serverError } = errors;

	const router = useRouter();

	useEffect(() => {
		if (status) {
			let timerId = setTimeout(() => {
				router.push('/', { scroll: true })
			}, 1000 * 10);

			return () => {
				clearTimeout(timerId)
			}
		}

	}, [status, router])

	return (
		<>
			<Container className='py-3'>
				<h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mt-4">
					Register
				</h3>
				<p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
					Take a few moments to register
				</p>
				{duplicateRegistration && <Callout title="Duplication Registration" color="red" className='mt-2'>
					Email or EmirateID is not available to register, please try login.
				</Callout>}

				{serverError && <Callout title="Server" color="red" className='mt-2'>
					Unable to register at the moment. Please contact support: <a href="mailto:admin@epassport.ae">admin@epassport.ae</a> .
				</Callout>}

				{status && <Callout title="Thanks for register for EPassport Verification" color="green" className='my-4'>
					Please check your email for futher details and Please login to upload the documents...
				</Callout>}


				{!status && <form onSubmit={handleSubmit} className="mt-6" noValidate>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{FIELDS.map(({ label, id, type, options = [], search }) => (
							<Input
								key={id}
								label={label}
								type={type || "text"}
								id={id}
								placeholder={label}
								value={values[id]}
								onChange={handleChange}
								onBlur={handleBlur}
								required={id === 'middleName' ? false : true}
								error={touched[id] && errors[id]}
								options={options}
								search={search}
							/>
						))}
					</div>
					<Divider />
					<div className="flex justify-end space-x-4">
						<Link href="/">
							<Button
								variant='secondary'
								type="button"
							>
								Cancel
							</Button>
						</Link>

						<Button
							type="submit"
							disabled={isSubmitting}
							loading={isSubmitting}
						>
							Submit
						</Button>
					</div>
				</form>}
			</Container>
		</>
	);
}


const UserForm = withFormik<{}, IRegister>({
	mapPropsToValues: () => {
		return REGISTER_FIELDS_INITIAL_VALUES
	},
	validationSchema: registrationSchema,
	handleSubmit: async (values: IRegister, { setSubmitting, setErrors, setStatus }) => {
		try {
			setSubmitting(true);
			const response = await registerUser(values);
			const { status, error } = response;
			setStatus(status);
			if (error) {
				if (error === ERRORS.AUTH.USER_ALREADY_REGISTER) {
					setErrors({ duplicateRegistration: true } as any)
				}
			}
		} catch (error: any) {
			if (error.message === ERRORS.AUTH.USER_ALREADY_REGISTER) {
				setErrors({ duplicateRegistration: true } as any)
			} else {
				setErrors({ serverError: true } as any)
			}
			console.error(error);
		}
		setSubmitting(false);
	},
})(UserRegisterForm);

export default UserForm;
