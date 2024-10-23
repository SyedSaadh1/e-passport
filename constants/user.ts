import { UPLOAD_DOCUMENT_FIELDS } from "../app/upload/form/fields";
import { USER_TABLE_COLUMNS } from "../ui/user/table/user.table.columns";

export const USER_STATUS = {
  'ACTIVE': 'ACTIVE',
  'IN_ACTIVE': 'INACTIVE',
  'REJECTED': 'REJECTED',
  'APPROVED': 'APPROVED',
  'DOCUMENTS_PENDING': 'DOCUMENTS PENDING',
  'VERIFICATION_IN_PROGRESS': 'VERIFICATION IN PROGRESS',
}

export const USER_STATUS_OPTIONS = Object.values(USER_STATUS);

export const USER_STATUS_COLOR = {
  [USER_STATUS.ACTIVE]: 'emerald',
  [USER_STATUS.IN_ACTIVE]: 'orange',
  [USER_STATUS.REJECTED]: 'red',
  [USER_STATUS.APPROVED]: 'lime',
  [USER_STATUS.DOCUMENTS_PENDING]: 'indigo',
  [USER_STATUS.VERIFICATION_IN_PROGRESS]: 'yellow',
}


export const USER_REGISTER_FIELD_NAME = USER_TABLE_COLUMNS.reduce((prev, curr) => {
  prev[curr.accessorKey] = curr.header;
  return prev;
}, {} as { [key: string]: string });


export const USER_DOCUMENT_FIELD_NAME = UPLOAD_DOCUMENT_FIELDS.reduce((prev, curr) => {
  prev[curr.id] = curr.label;
  return prev;
}, {} as { [key: string]: string });


export const USER_FIELD_NAME = {
  ...USER_REGISTER_FIELD_NAME,
  ...USER_DOCUMENT_FIELD_NAME
}

export const USER_EMAIL_SUBJECT = {
  [USER_STATUS.REJECTED]: `Action Required: Your Document Submission Needs Review`,
  [USER_STATUS.APPROVED]: `Your Document Submission Has Been Approved!`,
}