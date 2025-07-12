# 🚀 ReactCircle - MERN Social Media Dashboard

ReactCircle is a fully functional, full-stack social media dashboard application built using the MERN stack (MongoDB, Express.js, React, Node.js). It simulates core functionalities of modern social platforms like Instagram or Facebook but tailored into a clean, minimal, and responsive interface.

Users can register and authenticate using JWT-based login or Google OAuth, create posts with images, interact with other users' content, comment and like posts, and manage their own profile and posts. This app showcases not only frontend UI/UX design using React and Bootstrap but also a secure and scalable backend with authentication, role validation, and cloud-based media handling via Cloudinary.

---

## 🌐 Live Demo

- 🔗 Frontend: [https://reactcircle.vercel.app](https://reactcircle.vercel.app/login)

---

## 📌 Features

#### 🧑‍🎓 Authentication & Authorization
- 🔐 Secure JWT authentication (access + refresh tokens).

- 🔑 Google OAuth 2.0 login via Passport.js integration.

- 🧠 User session persists with refresh-token based auto-renewal.

#### 📝 Posts
- 🖼️ Users can create posts with: Title, Caption, Description, Image (uploaded to Cloudinary)

- ✏️ Ability to edit or delete your own posts.

- 🔎 View other users' posts, including interacted posts.

- 💬 Interactions

- ❤️ Like or Unlike any post.

- 💭 Add, Edit, and Delete your own comments on posts.

- 🔃 View post engagement (total likes, total comments).

#### 👤 Profiles
- 🧾 Each user has a personal profile displaying their posts and info.

- 🛠️ Edit profile including profile picture (Cloudinary), username, and bio.

- 🔍 Search and view other users’ public profiles.

#### 🔎 Search

- 🔎 Search users by name or email

---

## 🛠️ Tech Stack

### 🧩 Frontend

- React
- React Router
- Axios
- Bootstrap

### 🧩 Backend

- Node.js + Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth 2.0)
- JWT for Authentication
- Cloudinary (image uploads)
- Multer & multer-storage-cloudinary

---

## 🧑‍💻 Setup Instructions

### 📦 Backend

```bash
cd backend
npm install
npm start
```

### 💻 Frontend

```bash
cd client
npm install
npm start
```

### 🔐 Environment Variables (.env)

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
---
## 🚀 Deployment
- 🖥️ Frontend – Deployed on Vercel

- 🧠 Backend – Deployed on Render

- ☁️ Media Storage – Cloudinary
---

