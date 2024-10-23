import { User } from "@prisma/client"

export const getRegisterEmailTemplate = ({
    firstName,
    ePassportUserId,
}: User) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
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
          .header {
              color: #444;
              text-align: center;
          }
          .footer {
              text-align: center;
              font-size: 0.8em;
              color: #666;
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
          <h2 class="header">Welcome to ePassport</h2>
          <p>Hello <strong>${firstName}</strong>,</p>
          <p>Welcome to ePassport! We are thrilled to have you on board. Your registration has been successfully received.</p>
          <p><strong>Your ePassport User ID:</strong> ${ePassportUserId}</p>
          <p>To complete the verification process and activate your ePassport account, please follow these simple steps:</p>
          <ol>
              <li><strong>Document Submission:</strong> Log in to your ePassport account and upload the necessary documents, including your Emirates ID, passport, and a recent selfie.</li>
          </ol>
          <p>Once we receive and verify your information, you will be notified about the activation of your ePassport account.</p>
          <p><strong>Need Help?</strong> If you have any questions or require assistance, feel free to contact our support team at <a href="mailto:support@mail.com">support@mail.com</a> or call us at +0 000-000-0000.</p>
          <p>Thank you for choosing ePassport. We are committed to providing you with a secure and efficient verification experience.</p>
          <p class="footer">Best regards,<br>The ePassport Team</p>
      </div>
  </body>
  </html>
  `
}