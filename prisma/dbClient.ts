import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const dbClient = globalThis.prisma ?? prismaClientSingleton()

export default dbClient as PrismaClient

if (process.env.NODE_ENV !== 'production') globalThis.prisma = dbClient