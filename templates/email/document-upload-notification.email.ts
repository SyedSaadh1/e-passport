import { User } from "@prisma/client"

export const getDocumentUploadNotificationEmailTemplate = (user: User, url: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Document Upload Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            h2 {
                color: #444;
                text-align: center;
            }
            p {
                margin: 10px 0;
            }
            .doc-info {
                background-color: #f0f0f0;
                border-left: 5px solid #007bff;
                padding: 10px;
                margin: 20px 0;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h2>New Document Upload Alert</h2>
            <p>Hello Admin,</p>
            <p>A user has uploaded new documents for verification. Here are the details:</p>
            <div class="doc-info">
                <p><strong>User ID:</strong> ${user?.ePassportUserId}</p>
                <p><strong>User Name:</strong> ${user?.name || user?.firstName}</p>
                <p><strong>Upload Date:</strong> ${(new Date()).toLocaleString()}</p>
            </div>
            <p>Please review the uploaded documents to proceed with the verification process.</p>
            <p>You can view and verify the documents <a href="${url}" style="color: #007bff;">here</a>.</p>
            <div class="footer">
                <p>If you require any further information, please feel free to contact our support team.</p>
                <p>Best Regards,</p>
                <p>The ePassport Team</p>
            </div>
        </div>
    </body>
    </html>
  `
}