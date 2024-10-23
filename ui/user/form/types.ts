export interface IRegister {
    title: string;
    firstName: string;
    middleName: string;
    surname: string;
    dateOfBirth: string;
    nationality: string;
    email: string;
    mobileNumber: string;
    emiratesIdNumber: string;
    emiratesIdExpiryDate: string;
    changeEmiratesIdExpiryDate: string;
    uaeHomeAddress: string;
    [key: string]: string;
}