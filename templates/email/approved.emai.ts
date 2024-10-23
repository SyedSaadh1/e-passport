import { User } from "@prisma/client"

export const getApprovedEmailTemplate = (user: User) => {


  return `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Document Approval Notification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
          }
          .container {
              width: 80%;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
          }
          a {
              color: #007bff;
              text-decoration: none;
          }
          a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <div class="container">
        <p>Hello ${user.name || user.firstName},</p>
        
        <p>We are pleased to inform you that your document submission has been successfully approved. Your ePassport account is now one step closer to complete activation.</p>
        
        <p>What's Next?</p>
        <ul>
            <li>If you have any pending documents, please submit them at your earliest convenience.</li>
            <li>Keep an eye on your email for further updates regarding your account status.</li>
        </ul>
        
        <p>We appreciate your prompt response to the verification process. Should you have any questions or need further assistance, feel free to contact our support team at <a href="mailto:support@mail.com">support@mail.com</a> or call us at +0 000-000-0000.</p>
        
        <p>Thank you for choosing ePassport.</p>
        
        <p>Warm regards,</p>
        <p>The ePassport Team</p>
      </div>
  </body>
  </html>
  `
}