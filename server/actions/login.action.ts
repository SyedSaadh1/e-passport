'use server'
import dbClient from '../../prisma/dbClient';

export async function checkIfUserExistByEmail(email: string) {
  const count = await dbClient.user.count({
    where: { email: { contains: email.toLowerCase(), mode: 'insensitive' } }
  });
  return count > 0;
}