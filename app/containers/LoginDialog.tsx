'use client'
import React, { PropsWithChildren, useCallback } from 'react';
import { Button, Dialog, DialogPanel, TextInput } from '@tremor/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { checkIfUserExistByEmail } from '../../server/actions/login.action';
import { LoginSuccessConfirmation } from './LoginSuccessConfirmation';
import ERRORS from '../../constants/errors';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export function LoginDialog({ children, open, onClose }: PropsWithChildren<{ open?: boolean, onClose?: any }>) {
	const [isOpen, setIsOpen] = React.useState(!!open);
	const [isSuccess, setIsSuccess] = React.useState(false);

	const onLoginSuccess = useCallback(() => {
		setIsSuccess(true);
	}, []);

	const closeConfirmationDialog = useCallback(() => {
		setIsOpen(false);
		setIsSuccess(false);
	}, []);

	const onDialogClose = (val: any) => {
		setIsOpen(val);
		onClose && onClose();

	}

	return (
		<>
			<div className="mx-auto block" onClick={() => setIsOpen(true)}>{children}</div>

			{isSuccess
				? <LoginSuccessConfirmation isOpen={isSuccess} onClose={closeConfirmationDialog} />
				: <Dialog open={isOpen} onClose={onDialogClose} static={true}>
					<DialogPanel>
						<div className="sm:mx-auto sm:w-full sm:max-w-sm">
							<h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
								Log In
							</h3>
							<LoginForm setIsOpen={onDialogClose} onSuccess={onLoginSuccess} />
							<p className="mt-4 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
								By signing in, you agree to our{' '}
								<a href="#" className="underline underline-offset-4">
									terms of service
								</a>{' '}
								and{' '}
								<a href="#" className="underline underline-offset-4">
									privacy policy
								</a>
								.
							</p>
						</div>
					</DialogPanel>
				</Dialog>
			}
		</>
	);
}
interface FormValues {
	email: string;
}

interface LoginFormProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSuccess(): void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsOpen, onSuccess }) => {
	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email address').required('Email is required'),
	});

	const formik = useFormik<FormValues>({
		initialValues: {
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			setSubmitting(true);
			try {
				const isUserExists = await checkIfUserExistByEmail(values.email);
				if (!isUserExists) {
					setErrors({ userNotFound: true } as any)
				} else {
					const response = await signIn("email", { email: values.email, redirect: false });
					if (response?.ok) {
						onSuccess()
					}
				}
			} catch (error: any) {
				console.error(error);
			}
			console.log(values);
			setSubmitting(false);
		},
	});

	const { userNotFound }: any = formik.errors;

	return <form onSubmit={formik.handleSubmit} className="mt-6" noValidate>
		<label
			htmlFor="email"
			className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
		>
			Email
		</label>
		<TextInput
			className="mt-2"
			type="email"
			id="email"
			name="email"
			placeholder='Enter Email Id'
			onChange={formik.handleChange}
			value={formik.values.email}
		/>
		{formik.touched.email && formik.errors.email ? (
			<div className='text-red-500'>{formik.errors.email}</div>
		) : null}

		{formik.touched.email && userNotFound ? (
			<div className='text-red-500'>
				Email is not register with us! Please <Link onClick={() => setIsOpen(false)} className='underline' href="/register">Register</Link>
			</div>
		) : null}

		<div className='grid grid-cols-2 gap-2 mt-4 w-full'>
			<Button onClick={() => setIsOpen(false)} type="button" variant='secondary'>
				Cancel
			</Button>
			<Button type="submit" variant='primary' loading={formik.isSubmitting}>
				Sign in
			</Button>
		</div>

	</form>
}