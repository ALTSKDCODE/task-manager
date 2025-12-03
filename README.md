# 🚀 Task Manager Application (MERN Stack)

A full-stack, responsive Task Management Dashboard built for the **Frontend Developer Intern** assignment. This application features secure JWT authentication, real-time task updates, and a modular architecture designed for scalability.

---

## 🔗 Live Demo
**Frontend:** [https://task-manager-v4-alpha.vercel.app](https://task-manager-v4-alpha.vercel.app)

> **⚠️ Important Note:** The backend is hosted on a free Render instance. It spins down after inactivity. Please allow **~60 seconds** for the first login/register request to wake up the server.

---

## ✨ Key Features

### ✅ Frontend (React + Vite)
* **Responsive UI:** Built with **Tailwind CSS v4** for a seamless mobile and desktop experience.
* **State Management:** Uses React Context API for global Authentication state.
* **Search & Filter:** Real-time filtering of tasks by status (Pending/Completed) and search by title.
* **Optimistic UI:** Instant visual updates for task creation and status toggles.
* **Form Validation:** Robust handling using `react-hook-form`.

### ✅ Backend (Node.js + Express)
* **Security:** Passwords hashed with `bcryptjs`; API routes protected via `JWT` middleware.
* **Database:** MongoDB Atlas with Mongoose for schema validation.
* **Error Handling:** Centralized error middleware with `express-async-handler` for clean JSON error responses.
* **CORS Configured:** Securely connected to the deployed frontend.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS v4, Axios, React Router 6 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Auth** | JSON Web Tokens (JWT), BCrypt |
| **Deployment** | Vercel (Client), Render (Server) |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/ALTSKDCODE/task-manager.git](https://github.com/ALTSKDCODE/task-manager.git)
cd task-manager
```
### 2. Backend Setup
```bash
cd server
npm install

# Create a .env file in the server folder
echo "PORT=5000" > .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_super_secret_key" >> .env
echo "NODE_ENV=development" >> .env

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
# Open a new terminal
cd client
npm install

# Start React
npm run dev
```
### Access the app at http://localhost:5173

---

## 📚 API Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Login user & get Token | Public |
| **GET** | `/api/tasks` | Get all tasks for logged-in user | 🔒 **Private** |
| **POST** | `/api/tasks` | Create a new task | 🔒 **Private** |
| **PUT** | `/api/tasks/:id` | Update task details or toggle status | 🔒 **Private** |
| **DELETE** | `/api/tasks/:id` | Delete a task | 🔒 **Private** |

---

## 📈 Scalability Strategy

This project was built with production scalability in mind. Here is how I would scale it for a larger user base:

### 1. Microservices Architecture
* **Decoupling:** Currently, the app is a Monolith. To scale, I would decouple the **Authentication** logic and **Task Management** logic into separate microservices (e.g., `auth-service` and `task-service`).
* **Fault Isolation:** This prevents a failure in one module (like a task processing error) from crashing the entire application or blocking logins.

### 2. Database Optimization
* **Indexing:** Implement indexing on the `user_id` field in MongoDB. This ensures task retrieval remains fast (**O(1)** or **O(log n)**) even as the dataset grows to millions of records.
* **Caching:** Use **Redis** to cache the response of `GET /api/tasks`. Since task lists are read frequently but updated less often, caching would reduce database load by ~80%.

### 3. Frontend Performance
* **Code Splitting:** Implement `React.lazy()` to load the Dashboard component only after login, significantly reducing the initial JavaScript bundle size.
* **CDN:** Serve static assets (images, CSS, JS) via a CDN like **Cloudflare** or **AWS CloudFront** to enable edge caching and faster load times for global users.

---

## 📂 Project Structure

```text
/root
  ├── /client (Frontend)
  │     ├── /src
  │     │    ├── /components  (Reusable UI: Navbar, TaskCard, TaskForm)
  │     │    ├── /context     (Auth State: Login/Register/Logout)
  │     │    ├── /pages       (Dashboard, Login, Register)
  │     │    └── /services    (Axios Config & Interceptors)
  │
  └── /server (Backend)
        ├── /config           (MongoDB Connection)
        ├── /controllers      (Business Logic Layer)
        ├── /middleware       (JWT Auth & Error Handling)
        ├── /models           (Mongoose Schemas)
        └── /routes           (API Endpoints)
```

---

## 👤 Author

**Sudeep Kumar Dalei**
* **Role:** Full Stack Developer
* **GitHub:** [ALTSKDCODE](https://github.com/ALTSKDCODE)
* **Email:** sudeepdalei38@gmail.com

---