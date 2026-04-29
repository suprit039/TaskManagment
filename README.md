# 📝 Task Management App

A full-stack **Task Management Application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This app allows users to manage tasks efficiently with authentication and filtering features.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Secure Register & Login using JWT
- ✅ **Task Management**
  - Create, Read, Update, Delete (CRUD) tasks
- 🔍 **Filtering**
  - Filter tasks by status: `Pending`, `In Progress`, `Completed`
- 📱 **Responsive Design**
  - Mobile-friendly UI using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcryptjs

---

## ⚙️ Setup Instructions

### 📌 Prerequisites

- Node.js (v14+)
- MongoDB (Local or MongoDB Atlas)

---

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd TaskManagementApp
2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Run the backend server:

npm run dev

Server will run on:

http://localhost:5000
3️⃣ Frontend Setup
cd ../frontend
npm install

Run the frontend:

npm run dev

App will run on:

http://localhost:5173
📡 API Documentation
🔐 Authentication Routes
Register
POST /api/auth/register

Body:

{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "123456"
}
Login
POST /api/auth/login

Body:

{
  "email": "john@example.com",
  "password": "123456"
}
📋 Task Routes

⚠️ Requires Authorization Header:

Authorization: Bearer <token>
Get Tasks
GET /api/tasks

Query (optional):

?status=pending | in-progress | completed
Create Task
POST /api/tasks

Body:

{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending"
}
Update Task
PUT /api/tasks/:id
Delete Task
DELETE /api/tasks/:id

Response:

{
  "message": "Task deleted successfully"
}
🧪 Testing

Run backend tests:

cd backend
npm test
📁 Project Structure
TaskManagementApp/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── index.html
│
└── README.md
🌟 Future Improvements
Task deadlines & reminders
Drag-and-drop UI
Dark mode
Search & pagination
🤝 Contributing

Contributions are welcome! Feel free to fork and submit a pull request.

📄 License

This project is licensed under the MIT License.


---

If you want, I can also:
- add **badges (GitHub stars, build status)**  
- add **screenshots section**  
- or make it **perfect for internship submissions / resume projects** 🚀
