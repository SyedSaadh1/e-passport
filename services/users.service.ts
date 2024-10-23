'use server'
import { User } from "@prisma/client";
import { getFiles } from "../adapters/aws/s3";
import dbClient from "../prisma/dbClient";
import { IUserProfile } from "../ui/user/UserProfileContainer";
import { USER_STATUS } from "../constants/user";
import { getServerSession } from "next-auth";
import { sendEmail } from "../lib/email";
import { getDocumentUploadNotificationEmailTemplate } from "../templates/email/document-upload-notification.email";


export async function getLoggedInUser() {
  const session: any = await getServerSession();
  let { user } = session || {};
  if (user) {
    const loggedInUser = await getUserDetailsByEmail(user?.email);
    if (!loggedInUser) return null;
    const isAdmin = await checkIfUserIsAdmimByEmail(user?.email);
    return { ...loggedInUser, isAdmin };
  }
}


export async function getUsers() {
  const users = await dbClient.user.findMany({});
  return users;
}

export async function getUserDetailsByEmail(email: string): Promise<IUserProfile | null> {
  const user = await dbClient.user.findFirst({
    where: {
      email: { equals: email },
    }
  });
  if (!user) return null;
  return { ...user, documents: await getUserDocumentsWithURL(user) };
}

export async function getUserDetailsByID(ePassportUserId: string): Promise<IUserProfile | null> {
  const user = await dbClient.user.findFirst({
    where: {
      ePassportUserId: { equals: ePassportUserId },
    }
  });
  if (!user) return null;
  return { ...user, documents: await getUserDocumentsWithURL(user) };
}

export async function getUserDocumentsWithURL(user: User) {
  const { id: userId, ePassportUserId } = user;
  if (userId) {
    const documents = await getDocumentsByUser(user);

    const documentsByType: any = documents.reduce((prev, curr) => ({ ...prev, [curr.documentType]: curr }), {});
    const files = (await getFiles(ePassportUserId)).map(file => {
      return {
        ...file,
        status: documentsByType[file.fileType]?.status
      }
    });

    return files;
  }
  return []
}

export async function getDocumentsByUser({ id: userId }: User) {
  return await dbClient.document.findMany({
    where: {
      userId
    }
  })
}

export async function updateStatusForUser(user: User, status: string) {
  return await dbClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      status
    }
  })
}

export async function getTotalDocumentsCountByUser(user: User) {
  return await dbClient.document.count({
    where: {
      userId: user.id,
    }
  })
}

export async function getApprovedDocumentsCountByUser(user: User) {
  return await dbClient.document.count({
    where: {
      userId: user.id,
      AND: {
        status: USER_STATUS.APPROVED
      }
    }
  })
}

export async function getRejectDocumentsCountByUser(user: User) {
  return await dbClient.document.count({
    where: {
      userId: user.id,
      AND: {
        status: USER_STATUS.REJECTED
      }
    }
  })
}


export async function checkIfUserIsAdmimByEmail(email: string) {
  const users = await getAdminUsers();
  return users.includes(email);
}

export async function getAdminUsers() {
  const { ADMIN_USERS } = process.env;
  const users = String(ADMIN_USERS).split(',').map(user => user.trim());
  return users;
}

export async function sendDocumentUploadNotifcationToAdmin(user: User) {
  const url = `${process.env.NEXTAUTH_URL}/users/${user?.ePassportUserId}`
  const adminUsers = await getAdminUsers();
  await sendEmail({
    to: adminUsers.join(','),
    subject: 'New Document Upload Alert',
    html: getDocumentUploadNotificationEmailTemplate(user, url)
  });
}