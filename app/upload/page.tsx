'use client';
import Input from '../../ui/common/Input';
import Container from '../../ui/common/Container';
import { FormikProps, withFormik } from 'formik';
import { uploadDocumentSchema } from './form/validation.schema';
import { UPLOAD_DOCUMENT_FIELDS as DOCUMENT_FIELDS, UPLOAD_DOCUMENT_FIELDS_INITIAL_VALUES } from './form/fields';
import { IUploadDocuments } from './form/types';
import { Button, Callout, Divider } from '@tremor/react';
import { ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { getUserDetailsByEmail, sendDocumentUploadNotifcationToAdmin, updateStatusForUser } from '../../services/users.service';
import { USER_STATUS } from '../../constants/user';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const UploadDocumentPage = async (props: FormikProps<IUploadDocuments>) => {

	useEffect(() => {
		(async () => {
			const session = await getSession();
			if (!session?.user) {
				return redirect('/')
			}
		})();
	}, [])

	const {
		touched,
		errors,
		handleSubmit,
		isSubmitting,
		setFieldValue,
		status
	} = props;

	const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const { files, id } = e.target;
		const [file]: any = files || [];
		setFieldValue(id, file)
	}

	return (
		<Container className='min-h-[75vh]'>
			<h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mt-8">
				Upload Documents
			</h3>
			{status && <Callout title="Document upload successfully" color="green" className='my-4'>
				Please check your email for futher details
			</Callout>}
			{!status && <form onSubmit={handleSubmit} className="py-8" noValidate>
				<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{DOCUMENT_FIELDS.map(({ id, label }) => {
						const inputType: string = id == "selfiePhoto" ? "selfie" : id == "selfieVideo" ? "selfieVideo" : "file";
						return (
							<div key={id}>
								{inputType == "file" &&
									<Input
										type="file"
										id={id}
										name={id}
										multiple
										accept={"image/*"}
										error={touched[id] && errors[id]}
										key={id}
										label={label}
										placeholder={label}
										onChange={onFileSelect}
										required
									/>}
							</div>)
					})}
				</section>
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{DOCUMENT_FIELDS.map(({ id, label }) => {
						if (id === 'selfiePhoto' || id === 'selfieVideo') {
							const inputType: string = id === 'selfiePhoto' ? 'selfie' : 'selfieVideo';
							return (
								<div key={id}>
									<Input
										type={inputType}
										id={id}
										name={id}
										multiple
										accept={'image/*'}
										error={touched[id] && errors[id]}
										key={id}
										label={label}
										placeholder={label}
										onChange={onFileSelect}
										required
									/>
								</div>
							);
						}
						return null;
					})}
				</section>
				<Divider />
				<div className="flex justify-end space-x-4">
					<Link href="/">
						<button
							type="button"
							className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
						>
							Cancel
						</button>
					</Link>
					<Button
						type="submit"
						className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
						disabled={isSubmitting}
						loading={isSubmitting}
					>
						Upload
					</Button>
				</div>
			</form>}
		</Container>

	);
};


const UploadForm = withFormik<{}, IUploadDocuments>({
	mapPropsToValues: () => {
		return UPLOAD_DOCUMENT_FIELDS_INITIAL_VALUES
	},
	validationSchema: uploadDocumentSchema,
	handleSubmit: async (values: IUploadDocuments, { setSubmitting, setStatus }: any) => {
		setSubmitting(true);
		const {
			passport,
			visa,
			emiratesIdFront,
			emiratesIdBack,
			proofOfMobile,
			selfiePhoto,
			selfieVideo
		} = values;

		const allDocumentUploadApi = [
			{ label: 'passport', file: passport },
			{ label: 'visa', file: visa },
			{ label: 'emiratesIdFront', file: emiratesIdFront },
			{ label: 'emiratesIdBack', file: emiratesIdBack },
			{ label: 'proofOfMobile', file: proofOfMobile },
			{ label: 'selfiePhoto', file: selfiePhoto },
			{ label: 'selfieVideo', file: selfieVideo },
		].map(async ({ label, file }) => {
			const body = new FormData();
			const filePaths = file.name?.split(".");
			const extension = filePaths[filePaths.length - 1];
			body.append("file", file, `${label}.${extension}`);
			const response = await fetch('/api/documents', { method: "POST", body });
			return await response.json()
		})
		const apiResponse = await Promise.all(allDocumentUploadApi);
		const session = await getSession();
		if (session?.user?.email) {
			const user = await getUserDetailsByEmail(session?.user?.email);
			if (user) {
				await updateStatusForUser(user, USER_STATUS.IN_ACTIVE);
				await sendDocumentUploadNotifcationToAdmin(user);
			}
		}
		setSubmitting(false);
		setStatus(true);
		return apiResponse
	},
})(UploadDocumentPage);

export default UploadForm;
