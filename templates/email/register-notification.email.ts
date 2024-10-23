import { User } from "@prisma/client"

export const getRegisterNotificationEmailTemplate = (user: User) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>New User Registration Notification</title>
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
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            th, td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
            th {
                background-color: #f0f0f0;
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
            <h2>New User Registration Alert</h2>
            <p>Hello Admin,</p>
            <p>A new user has just completed the registration process. Below are the details of the new user registration:</p>
            <table>
            <tr>
                <th>User ID</th>
                <td>${user?.ePassportUserId}</td>
            </tr>
            <tr>
                <th>First Name</th>
                <td>${user?.firstName}</td>
            </tr>
            <tr>
                <th>Middle Name</th>
                <td>${user?.middleName || '-'}</td>
            </tr>
            <tr>
                <th>Surname</th>
                <td>${user?.surname}</td>
            </tr>
            <tr>
                <th>Date of Birth</th>
                <td>${user?.dateOfBirth?.toLocaleDateString()}</td>
            </tr>
            <tr>
                <th>Nationality</th>
                <td>${user?.nationality}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${user?.email}</td>
            </tr>
            <tr>
                <th>Mobile Number</th>
                <td>${user?.mobileNumber}</td>
            </tr>
            <tr>
                <th>Emirates ID Number</th>
                <td>${user?.emiratesIdNumber}</td>
            </tr>
            <tr>
                <th>Emirates ID Expiry Date</th>
                <td>${user?.emiratesIdExpiryDate?.toLocaleDateString()}</td>
            </tr>
            <tr>
                <th>UAE Home Address</th>
                <td>${user?.uaeHomeAddress}</td>
            </tr>
            <tr>
                <th>Registration Date and Time</th>
                <td>${user?.createdDate?.toLocaleDateString()}</td>
            </tr>
            </table>
            <p>Please proceed with the necessary verification and administrative actions as required.</p>
            <p>If you have any queries or require further information, please do not hesitate to contact the support team.</p>
            <div class="footer">
                <p>Best Regards,</p>
                <p>ePassport System Notification</p>
            </div>
        </div>
    </body>
    </html>    
  `
}