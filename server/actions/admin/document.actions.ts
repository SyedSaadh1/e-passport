'use server'

import { USER_EMAIL_SUBJECT, USER_FIELD_NAME, USER_STATUS } from "../../../constants/user";
import { sendEmail } from "../../../lib/email";
import dbClient from "../../../prisma/dbClient";
import { getApprovedDocumentsCountByUser, getDocumentsByUser, getRejectDocumentsCountByUser, getTotalDocumentsCountByUser, updateStatusForUser } from "../../../services/users.service";
import { getApprovedEmailTemplate } from "../../../templates/email/approved.emai";
import { getRejectedEmailTemplate } from "../../../templates/email/rejected.emai";
import { IUserProfileDocument } from "../../../ui/user/UserProfileContainer";

export async function approveDocuments(documents: IUserProfileDocument[], status = USER_STATUS.APPROVED) {
  const { id = '', fileType } = documents?.[0];
  const [ePassportUserId] = id.split("/");
  const user = await dbClient.user.findFirst({
    where: {
      ePassportUserId
    }
  });

  if (user) {
    await Promise.all(documents.map(async (document) => {
      const { fileType: documentType, id: filePath, } = document;
      const updatedDocuments = await dbClient.document.updateMany({
        where: {
          AND: {
            userId: user.id,
            documentType,
            filePath
          }
        },
        data: {
          status
        }
      });

      if (updatedDocuments.count === 0) {
        await dbClient.document.create({
          data: {
            userId: user.id,
            documentType,
            filePath,
            status
          }
        })
      }
      return true;
    }));

    const TOTAL_DOCUMENTS = 7;
    const totalApprovedDocuments = await getApprovedDocumentsCountByUser(user);
    const totalRejectedDocuments = await getRejectDocumentsCountByUser(user);

    if (documents.length === 1 && status === USER_STATUS.REJECTED) {
      await updateStatusForUser(user, USER_STATUS.DOCUMENTS_PENDING);
      await sendEmail({
        to: user.email,
        subject: USER_EMAIL_SUBJECT[USER_STATUS.REJECTED],
        html: getRejectedEmailTemplate(user, [USER_FIELD_NAME[fileType]])
      });
    }

    if (TOTAL_DOCUMENTS === totalRejectedDocuments || TOTAL_DOCUMENTS === totalApprovedDocuments) {
      const documents = await getDocumentsByUser(user);
      const list = documents.map(document => USER_FIELD_NAME[document.documentType]);

      if (TOTAL_DOCUMENTS === totalRejectedDocuments) {
        await updateStatusForUser(user, USER_STATUS.REJECTED);
        await sendEmail({
          to: user.email,
          subject: USER_EMAIL_SUBJECT[USER_STATUS.REJECTED],
          html: getRejectedEmailTemplate(user, list)
        });
      }

      if (TOTAL_DOCUMENTS === totalApprovedDocuments) {
        await updateStatusForUser(user, USER_STATUS.ACTIVE);
        await sendEmail({
          to: user.email,
          subject: USER_EMAIL_SUBJECT[USER_STATUS.APPROVED],
          html: getApprovedEmailTemplate(user)
        });
      }
    }

    return true;
  }
  return false;
}