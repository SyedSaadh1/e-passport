import { COUNTRIES } from "../../../constants/countries";
import { IRegister } from "./types";

export const REGISTER_FIELDS = [
    { label: "Title", id: "title", type: "select", options: ['Mr', 'Miss', 'Mrs'] },
    { label: "First name", id: "firstName" },
    { label: "Middle Name", id: "middleName" },
    { label: "Surname", id: "surname" },
    { label: "Date of birth", id: "dateOfBirth", type: "date" },
    { label: "Nationality", id: "nationality", type: "select", options: COUNTRIES, search: true },
    { label: "Email", id: "email" },
    { label: "Mobile Number", id: "mobileNumber" },
    { label: "Emirates ID Number", id: "emiratesIdNumber" },
    { label: "Emirates ID Expiry Date", id: "emiratesIdExpiryDate", type: "date" },
    { label: "UAE Home Address", id: "uaeHomeAddress" },
]

export const REGISTER_FIELDS_INITIAL_VALUES = REGISTER_FIELDS.reduce((prev, { id, type }) => {
    prev[id] = type === "date" ? null : '';
    return prev;
}, {} as any) as IRegister;