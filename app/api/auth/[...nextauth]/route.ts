// export { GET, POST } from '../../../auth';
// export const runtime = 'edge';

import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import EmailProvider from "next-auth/providers/email"

const prisma = new PrismaClient();


const GMAIL_SERVER = {
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT || 587),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_SECRET
  }
}

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: GMAIL_SERVER,
      // server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };