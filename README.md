# Personal Note Manager

A full-stack web application for managing personal notes with user authentication. Users can create, read, update, and delete notes with a clean and intuitive interface.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Project Structure Details](#project-structure-details)

## 🎯 Project Overview

**Personal Note Manager** is a MERN stack application that allows users to:
- Create accounts and authenticate securely
- Create, read, update, and delete personal notes
- Access notes from anywhere with a persistent backend
- Enjoy a responsive and modern user interface

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **CORS:** Enabled for cross-origin requests
- **Environment Management:** dotenv

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Icons:** Lucide React
- **Linting:** ESLint

## 📁 Project Structure

```
Personal-Note-Manager/
├── Personal-Note-Manager-Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic (login, signup)
│   │   └── noteController.js     # Note CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   ├── Note.js              # Note schema and model
│   │   └── User.js              # User schema and model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── noteRoutes.js        # Note endpoints
│   ├── .env                      # Environment variables (local)
│   ├── .env.production           # Production environment variables
│   ├── server.js                # Express server entry point
│   ├── package.json             # Backend dependencies
│   └── render.yaml              # Render deployment configuration
│
└── Personal-Note-Manager-Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Header.jsx    # Navigation header
    │   │   │   └── Footer.jsx    # Footer component
    │   │   └── notes/
    │   │       ├── NoteForm.jsx  # Form for creating/editing notes
    │   │       └── NoteDetailModal.jsx  # Modal for viewing note details
    │   ├── contexts/
    │   │   └── AuthContext.jsx   # Auth state management
    │   ├── pages/
    │   │   ├── LandingPage.jsx   # Home/landing page
    │   │   ├── LoginPage.jsx     # Login page
    │   │   ├── SignupPage.jsx    # Sign up page
    │   │   └── DashboardPage.jsx # Main notes dashboard
    │   ├── services/
    │   │   └── api.js            # Axios API client configuration
    │   ├── App.jsx               # Main App component with routing
    │   ├── main.jsx              # React entry point
    │   ├── App.css               # App styles
    │   └── index.css             # Global styles
    ├── public/                   # Static assets
    ├── .env                      # Frontend environment variables
    ├── vite.config.js            # Vite configuration
    ├── tailwind.config.js        # Tailwind CSS configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── eslint.config.js          # ESLint configuration
    ├── vercel.json               # Vercel deployment configuration
    ├── package.json              # Frontend dependencies
    └── index.html                # HTML entry point
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or MongoDB Atlas account for cloud database)

## 🚀 Installation

### Clone the Repository

```bash
git clone <repository-url>
cd "Personal Note Manager"
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Personal-Note-Manager-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Personal-Note-Manager-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## ⚙️ Configuration

### Backend Environment Variables (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend Environment Variables (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

### CORS Configuration

The backend allows requests from:
- `https://personal-note-manager-phi.vercel.app` (production)
- `http://localhost:3000` (local frontend)
- `http://localhost:5173` (Vite dev server)

Update the CORS configuration in [server.js](Personal-Note-Manager-Backend/server.js) for different environments.

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd Personal-Note-Manager-Backend
npm run dev
```

The server will start on `http://localhost:5000` and watch for file changes using Nodemon.

#### Start Frontend Development Server

In a new terminal:

```bash
cd Personal-Note-Manager-Frontend
npm run dev
```

The frontend will start on `http://localhost:5173` with hot module replacement (HMR).

### Production Build

#### Build Frontend

```bash
cd Personal-Note-Manager-Frontend
npm run build
```

This creates an optimized build in the `dist/` directory.

#### Run Backend in Production

```bash
cd Personal-Note-Manager-Backend
npm start
```

Set `NODE_ENV=production` in your environment variables.

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securePassword123"
}
```

Response:
```json
{
  "token": "jwt-token-here",
  "user": {
    "_id": "user-id",
    "username": "user@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securePassword123"
}
```

Response:
```json
{
  "token": "jwt-token-here",
  "user": {
    "_id": "user-id",
    "username": "user@example.com"
  }
}
```

### Note Endpoints

All note endpoints require `Authorization: Bearer <token>` header.

#### Get All Notes
```
GET /api/notes
```

Response:
```json
[
  {
    "_id": "note-id",
    "title": "Note Title",
    "content": "Note content here",
    "userId": "user-id",
    "createdAt": "2024-01-04T10:00:00Z",
    "updatedAt": "2024-01-04T10:00:00Z"
  }
]
```

#### Create Note
```
POST /api/notes
Content-Type: application/json

{
  "title": "New Note",
  "content": "Note content here"
}
```

#### Update Note
```
PUT /api/notes/:noteId
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Note
```
DELETE /api/notes/:noteId
```

## ✨ Features

- **User Authentication:** Secure signup and login with JWT tokens
- **Note Management:** Create, read, update, and delete notes
- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Real-time Notifications:** Toast notifications for user feedback
- **Protected Routes:** Authenticated access to dashboard and notes
- **Modern UI:** Clean and intuitive interface with Tailwind CSS
- **Error Handling:** Comprehensive error messages and validation

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- CORS protection
- Input validation with express-validator
- Secure HTTP headers
- Environment variable protection

## 📝 Available Scripts

### Backend

- `npm start` - Start the production server
- `npm run dev` - Start development server with Nodemon
- `npm test` - Run tests (currently not configured)

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## 🌐 Deployment

### Backend
The backend is configured for deployment on Render using [render.yaml](Personal-Note-Manager-Backend/render.yaml).

### Frontend
The frontend is configured for deployment on Vercel using [vercel.json](Personal-Note-Manager-Frontend/vercel.json).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For support, email your contact email or open an issue in the repository.

---

**Last Updated:** January 4, 2026
