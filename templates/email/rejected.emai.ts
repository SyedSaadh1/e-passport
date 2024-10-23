import { User } from "@prisma/client"

export const getRejectedEmailTemplate = (
    user: User,
    documentsList: string[] = []
) => {

    return `
  <!DOCTYPE html>
    <html>
    <head>
        <title>Document Rejection Notification</title>
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
            
            <p>We regret to inform you that your document submission could not be approved.</p>
            
            <p>But don’t worry! You can resubmit your document by following these steps:</p>
            <ol>
                <li>Review the submission guidelines to ensure your document meets all requirements.</li>
                <li>Log in to your ePassport account and navigate to the document submission section.</li>
                <li>Upload the corrected document${documentsList.length ? 's' : ''} for ${documentsList.join(", ")}.</li>
            </ol>
            
            <p>If you need clarification on the rejection reasons or require assistance with resubmitting, feel free to contact our support team at <a href="mailto:support@mail.com">support@mail.com</a> or call us at +0 000-000-0000.</p>
            
            <p>Your cooperation and understanding are greatly appreciated as we work together to secure your ePassport account.</p>
            
            <p>Best regards,</p>
            <p>The ePassport Team</p>
        </div>
    </body>
    </html>

  `
}