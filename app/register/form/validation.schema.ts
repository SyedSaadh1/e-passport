import * as Yup from 'yup';

export const registrationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First Name is required'),
    middleName: Yup.string(),
    surname: Yup.string().required('Surname is required'),
    dateOfBirth: Yup.date()
        .required('Date of Birth is required')
        .max(new Date(), "Date of Birth cannot be in the future"),
    nationality: Yup.string().required('Nationality is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
    emiratesIdNumber: Yup.string().required('Emirates ID is required'),
    emiratesIdExpiryDate: Yup.date()
        .required('Emirates ID Expiry Date is required')
        .min(new Date(), "Emirates ID Expiry Date cannot be in the past"),
    uaeHomeAddress: Yup.string().required('UAE Home Address is required'),
});