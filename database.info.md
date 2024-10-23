As a Database Architect planning to use Prisma ORM for the ePassport User Verification System, the schema should be designed to efficiently store and manage user data, documents, and administrative actions. Here's a proposed database schema tailored for this project:

### **1. Users Table**
- **id:** `Int` @id @default(autoincrement())
- **ePassportUserId:** `String` @unique
- **title:** `String`
- **firstName:** `String`
- **lastName:** `String`
- **dateOfBirth:** `DateTime`
- **nationality:** `String`
- **email:** `String` @unique
- **mobileNumber:** `String`
- **emiratesIdNumber:** `String` @unique
- **emiratesIdExpiryDate:** `DateTime`
- **uaeHomeAddress:** `String`
- **registrationDate:** `DateTime` @default(now())
- **status:** `String` (e.g., 'Pending', 'Verified', 'Rejected')

### **2. Documents Table**
- **id:** `Int` @id @default(autoincrement())
- **userId:** `Int` (Foreign Key to Users Table)
- **documentType:** `String` (e.g., 'Emirates ID Front', 'Emirates ID Back', 'Passport', 'Visa', 'Selfie', 'Video')
- **filePath:** `String`
- **uploadDate:** `DateTime` @default(now())

### **3. VerificationLog Table**
- **id:** `Int` @id @default(autoincrement())
- **userId:** `Int` (Foreign Key to Users Table)
- **action:** `String` (e.g., 'Email Sent', 'Text Received', 'Verified', 'Rejected')
- **actionDate:** `DateTime` @default(now())
- **notes:** `String` (Optional)

### **4. AdminActions Table**
- **id:** `Int` @id @default(autoincrement())
- **userId:** `Int` (Foreign Key to Users Table)
- **actionType:** `String` (e.g., 'Manual Verification', 'Data Update', 'Password Link Sent')
- **actionDate:** `DateTime` @default(now())
- **adminId:** `Int` (For tracking which admin performed the action)

### **5. CommunicationLog Table**
- **id:** `Int` @id @default(autoincrement())
- **userId:** `Int` (Foreign Key to Users Table)
- **communicationMethod:** `String` (e.g., 'Email', 'WhatsApp', 'Text')
- **message:** `String`
- **timestamp:** `DateTime` @default(now())

### **6. ePassportCards Table**
- **id:** `Int` @id @default(autoincrement())
- **userId:** `Int` (Foreign Key to Users Table)
- **cardData:** `Json` (Stores data to be displayed on ePassport card)
- **generationDate:** `DateTime` @default(now())

### **Relationships**
- Each user in the Users table can have multiple entries in the Documents, VerificationLog, AdminActions, CommunicationLog, and ePassportCards tables. This is a one-to-many relationship.

### **Indexes and Constraints**
- Proper indexes should be added to frequently queried fields like `ePassportUserId`, `email`, and `emiratesIdNumber`.
- Foreign key constraints should ensure data integrity between related tables.

### **Security and Data Protection**
- Sensitive data should be encrypted.
- Access controls should be implemented at the application layer.

### **Note for Implementation with Prisma ORM**
- This schema will be translated into Prisma's schema language.
- You will define models in the `schema.prisma` file, reflecting the structure outlined above.
- Prisma Migrate can be used to create and manage the database schema.

This schema provides a comprehensive foundation for the ePassport User Verification System. It's crucial to review and adjust the schema as needed based on specific project requirements and any evolving data storage needs.