# **ePassport User Verification System**

**Project Objective:** 
Develop a secure and efficient user registration and authentication system, initially for in-house use with potential for external deployment. The key aim is to ensure accurate verification of users’ identities for access to various platforms or applications.

**Core Functions:**
1. **User Registration and ePassport ID Generation:**
   - Enable users to register and receive a unique ePassport User ID.

2. **Initial User Data Collection:**
   - Collect essential information such as Title, Names, DOB, Nationality, Email, UAE Mobile Number, Emirates ID Number, Emirates ID Expiry Date, and UAE Home Address.
   - Utilize camera functionality for document uploads: Emirates ID (front and back), proof of mobile number ownership, passport, visa (if applicable), user's selfie, and a short video agreeing to terms of use.

**System Actions:**
1. **Registration Verification Process:**
   - Automated email notification to users upon registration, instructing them to send a text message with their unique ID for further processing.
   - Systematic extraction and processing of text messages for administrative review.

**Administrative Actions:**
1. **Manual Verification and Data Management:**
   - Admin panel for manual verification of user information through text, email, or WhatsApp.
   - Transfer of verified data to live system, setting expiry dates, and sending password update links.
   - Double confirmation of Emirates ID and expiry date.
   - Handling of invalid or rejected applications with customizable email notifications.

**User Engagement:**
1. **Update Requests and Administration:**
   - User-initiated requests for Emirates ID expiry updates through the portal or app.
   - Admin follow-up and information update after user contact.

**System Enquiry and Security:**
1. **Data Access and Protection:**
   - File browsing with search and selection functionalities.
   - Strict confidentiality of passwords and sensitive data.

**Additional Features:**
1. **Website and Communication:**
   - Informative landing page with terms of use.
   - Secure communication channels (WhatsApp, email, text) for user-admin interaction, with record-keeping outside the system.
2. **ePassport Output:**
   - Generation of an electronic ID card displaying user's photo, name, nationality, age, and address location.

**Project Deliverables:**
- A complete, user-friendly ePassport registration and verification system.
- Administrative tools for effective data management and user interaction.
- Compliance with data privacy and security standards.
- A scalable solution ready for in-house deployment with potential for external application.

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/14)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - [Vercel Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Tremor](https://www.tremor.so)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.


- ### [Setup guide](/setup.md)
- ### [Work Stories](/tasks.md)
- ### [Database](/database.info.md)
- ### [Database Schema](/prisma/schema.prisma)
