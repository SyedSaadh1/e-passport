'use server'

import dbClient from "../../prisma/dbClient"

export async function IsVerifiedUser() {
  const getUser: object | null = await dbClient.user.findFirst({
    where: {
      firstName:"Zakeer"
    },
    select: {
      status:true
    },
  })
  return getUser
}