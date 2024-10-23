import { IUploadDocuments } from "./types"
export const UPLOAD_DOCUMENT_FIELDS = [
  {
    label: 'Passport',
    id: 'passport',
  },
  {
    label: 'Visa',
    id: 'visa',
  },
  {
    label: 'Emirates ID Front',
    id: 'emiratesIdFront'
  },
  {
    label: 'Emirates ID Back',
    id: 'emiratesIdBack',
  },
  {
    label: 'Proof Of Mobile (upload mobile bill or utility bill)',
    id: 'proofOfMobile',
  },
  {
    label: 'Selfie Photo',
    id: 'selfiePhoto',
  },
  {
    label: 'Selfie Video',
    id: 'selfieVideo',
    accept: "video/*",
  },
]

export const UPLOAD_DOCUMENT_FIELDS_INITIAL_VALUES = UPLOAD_DOCUMENT_FIELDS.reduce((prev, { id }) => {
  prev[id] = ''
  return prev;
}, {} as any) as IUploadDocuments;