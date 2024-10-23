import * as Yup from 'yup';

export const uploadDocumentSchema = Yup.object().shape({
    passport: Yup.mixed().required("Passport is Required"),
    visa: Yup.mixed().required("Visa is Required"),
    emiratesIdFront: Yup.mixed().required("Emirates ID Front is Required"),
    emiratesIdBack: Yup.mixed().required("Emirates ID Back is Required"),
    proofOfMobile: Yup.mixed().required("Proof Of Mobile is Required"),
    selfiePhoto: Yup.mixed().required("Selfie Photo is Required"),
    selfieVideo: Yup.mixed().required("Selfie Video is Required")
})