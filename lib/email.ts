import nodemailer from "nodemailer"

type EmailPayload = {
  to: string
  subject: string
  html: string
}

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_SECRET
  }
});


const getVerificationMailOptions = (toEmail: string, verificationCode: string) => {
  return {
    from: 'verify@fullstack.institute',
    to: toEmail,
    subject: 'Fullstack Institute Verification code',
    text: `Your verification code for loggin Fullstack.Institute is ${verificationCode} `
  }
}

export const sendEmail = async (data: EmailPayload) => {

  return await gmailTransporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL || 'contact@epassport.com',
    ...data,
  })
}