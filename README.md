Digital Health Wallet
1. Objective

The objective of this project is to design and build a Digital Health Wallet that allows users to securely store, manage, and share their medical reports and vital health data.

The application enables users to:

Upload medical test reports
Track and visualize health vitals over time
Retrieve reports based on date and vital type
Share selected reports with doctors, family members, or friends using controlled, read-only access
The goal is to provide anytime, anywhere access to personal health data while ensuring security, simplicity, and usability.

2. Technology Stack
Frontend

ReactJS
JavaScript
HTML, CSS

Backend

Node.js
Express.js
Database
SQLite

Other Tools & Libraries

Axios (API communication)
Multer (file uploads)
JWT (authentication)
bcrypt (password hashing)
Recharts (vitals visualization)

3. Features Implemented
3.1 User Management

User registration and login
Secure authentication using JWT
Role-based access concept:
Owner: Can upload, view, and share reports
Viewer: Has read-only access to shared reports

3.2 Health Reports

Upload medical reports in PDF or image format
Store report metadata:
Report type (Blood Test, X-Ray, etc.)

Date

Associated vital (BP, Sugar, Heart Rate)
View uploaded reports
Filter reports based on date and vital type

3.3 Vitals Tracking

Store vitals data with date and value
Add multiple vitals over time
Display vitals trends using charts
Switch between different vital types for visualization

3.4 Report Retrieval

Search and filter reports using:

Date
Vital type
Report category
Helps users quickly find relevant medical records

3.5 Access Control (Sharing)

Share selected reports with:

Doctors
Family members
Friends

Shared users are given read-only access
Sharing logic is implemented at the database and API level
In a real-world system, this can be extended to viewer logins or secure access links

4. System Architecture
4.1 High-Level Architecture
ReactJS Client
     |
     | REST APIs + JWT Authentication
     |
Node.js (Express Server)
     |
     | SQL Queries
     |
SQLite Database
Uploaded Files → Local uploads/ folder

4.2 Frontend (ReactJS)

Component-based UI (Login, Dashboard, Upload, Reports, Vitals, Share Access)
State management using React Hooks (useState, useEffect)
API integration using Axios
Charts rendered using Recharts

4.3 Backend (Node.js & Express)

RESTful APIs for authentication, reports, vitals, and sharing
JWT-based authentication and authorization
Middleware to protect secure routes
Business logic handled in API controllers

4.4 Database (SQLite)
Tables Used

users: Stores user credentials
reports: Stores uploaded report metadata
vitals: Stores vitals data over time
shares: Stores report-sharing access information

Relationships

One user → many reports
One user → many vitals
One report → can be shared with multiple users (read-only)

5. Security Considerations

Passwords are securely hashed using bcrypt
JWT tokens are used for authentication
Protected backend routes require valid tokens
File uploads are restricted to allowed formats (PDF/Image)
Shared users have read-only access
Sensitive database files are excluded from version control

6. File Storage Strategy

Uploaded reports are stored in a local uploads/ directory
File metadata is stored in the database
For scalability, this can be migrated to cloud storage (e.g., AWS S3) in the future

7. Setup Instructions
Prerequisites

Node.js 
npm
Git

Backend Setup
cd server
npm install
node index.js


Backend runs on:

http://localhost:5000

Frontend Setup
cd client
npm install
npm start


Frontend runs on:

http://localhost:3000

8. API Documentation

Authentication

POST /register – Register a new user
POST /login – Login and receive JWT token

Reports

POST /reports – Upload a medical report
GET /reports – Fetch user reports

Vitals

POST /vitals – Add a vital record
GET /vitals – Fetch vitals data

Sharing

POST /share – Share a report with another user (read-only)

9. Future Enhancements

Viewer login for doctors and family members
Secure report access links via email
Date range filtering for vitals
Cloud-based file storage
Deployment on cloud platforms

Conclusion:

This project demonstrates a complete Digital Health Wallet solution using ReactJS, Node.js, and SQLite.
It focuses on secure data handling, clean system design, and real-world use cases such as report sharing and vitals tracking.