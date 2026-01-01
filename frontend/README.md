🏫 School Management System (React + Node.js + MySQL)
📌 Project Overview

This is a full-stack mini project built using React.js, Node.js, Express, and MySQL.
The application allows users to add, view, update, and delete school details, including school images.

The project is designed as per the assignment requirement:

One page to input and store school data, and another page to fetch and display school data.

🎯 Features

➕ Add school details with image upload

📄 View all schools in a card-based layout

✏️ Edit school details

🗑 Delete school records

🖼 Delete image only (without deleting school)

🔄 Replace school image

📱 Responsive and clean UI

🔐 Safe image handling using Multer

🛠 Tech Stack
Frontend

React.js (Vite)

React Router DOM

Axios

CSS (custom modern UI)

Backend

Node.js

Express.js

Multer (for image upload)

MySQL

Database

MySQL (schools table)

📂 Project Structure
school_management/
│
├── backend/
│   ├── routes/
│   │   └── schoolRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── uploads/
│   │   └── schoolImages/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AddSchool.jsx
│   │   │   └── ShowSchool.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── App.jsx
│   │   └── index.css
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <your-github-repo-url>
cd school_management

2️⃣ Backend Setup
cd backend
npm install

Configure Database

Update your MySQL credentials in config/db.js.

Create table:

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  contact VARCHAR(20),
  email_id VARCHAR(100),
  image VARCHAR(255) NULL
);

Start Backend Server
npx nodemon server.js


Server runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔄 API Endpoints
Method	Endpoint	Description
POST	/api/schools/add	Add new school
GET	/api/schools	Get all schools
PUT	/api/schools/update/:id	Update school details
DELETE	/api/schools/delete/:id	Delete school
DELETE	/api/schools/delete-image/:id	Delete school image
PUT	/api/schools/replace-image/:id	Replace school image
🧪 How to Use the Application

Go to Add School page

Fill school details and upload image

Click Save School

Navigate to View Schools

Use Edit, Delete, Delete Image, or Replace Image options

🧠 Learning Outcomes

Full CRUD operations using React and Express

File upload handling with Multer

MySQL database integration

Conditional rendering for better UX

REST API design

Real-world image management (delete & replace)

✅ Conclusion

This project successfully demonstrates a full-stack web application with proper separation of frontend and backend, image handling, and database operations. It fulfills all assignment requirements and follows real-world development practices.

👨‍💻 Developed By

Vivek Chaudhary
B.Tech (Computer Science Engineering)
