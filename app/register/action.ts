'use server'
import dbClient from "../../prisma/dbClient";
import { IRegister } from "./form/types"
import { generateUniqueEPassportUserID } from "../../utils/epassportUserIdGenerator";
import ERRORS from "../../constants/errors";
import { sendEmail } from "../../lib/email";
import { getRegisterEmailTemplate } from "../../templates/email/register";
import { USER_STATUS } from "../../constants/user";
import { getAdminUsers } from "../../services/users.service";
import { getRegisterNotificationEmailTemplate } from "../../templates/email/register-notification.email";

export async function registerUser(values: IRegister, isAdmin = false, isEdit = false) {

  if (isAdmin || isEdit) {
    const payload = { 
      ...values,
      dateOfBirth: new Date(values['dateOfBirth']),
      emiratesIdExpiryDate: new Date(values['emiratesIdExpiryDate']),
      extendedEmiratesIdExpiryDate: new Date(values['extendedEmiratesIdExpiryDate']),
    } as any;
    payload['email'] = (payload['email'] || "").toLowerCase();
    const { documents, status } = payload;
    delete payload['documents']
    delete payload['id']
    delete payload['isAdmin']

    let updateStatus = status;
    updateStatus = documents.length === 0 ? USER_STATUS.DOCUMENTS_PENDING : USER_STATUS.ACTIVE;

    if (isEdit) {
      updateStatus = status;
    }
    await dbClient.user.update({
      where: {
        ePassportUserId: values.ePassportUserId
      },
      data: {
        ...payload,
        status: updateStatus,
      }
    })
  } else {
    const isAlreadyRegister = await isUserAlreadyRegister(values);
    if (isAlreadyRegister) {
      return {
        status: false,
        error: ERRORS.AUTH.USER_ALREADY_REGISTER
      }
    }
    const maxDate = new Date(values.emiratesIdExpiryDate);
    const user = await dbClient.user.create({
      data: {
        ...values,
        email: (values['email'] || "").toLowerCase(),
        name: `${values.firstName} ${values.middleName}`,
        ePassportUserId: generateUniqueEPassportUserID(),
        extendedEmiratesIdExpiryDate: new Date(maxDate.setDate(maxDate.getDate() + 30)),
        dateOfBirth: new Date(values['dateOfBirth']),
        emiratesIdExpiryDate: new Date(values['emiratesIdExpiryDate']),
        status: USER_STATUS.DOCUMENTS_PENDING
      }
    });

    await sendEmail({
      to: user.email,
      subject: 'User verification',
      html: getRegisterEmailTemplate(user)
    });

    const adminUsers = await getAdminUsers();
    await sendEmail({
      to: adminUsers.join(','),
      subject: 'New User Registration Alert',
      html: getRegisterNotificationEmailTemplate(user)
    });
  }



  return { status: true }
}

export async function isUserAlreadyRegister({ email, emiratesIdNumber }: IRegister) {
  console.log(":: checkIsEmailAlreadyRegister ::", email);

  const count = await dbClient.user.count({
    where: {
      OR: [
        { email: { contains: email } },
        { emiratesIdNumber: { contains: emiratesIdNumber } },
      ]
    }
  })
  return count > 0
}