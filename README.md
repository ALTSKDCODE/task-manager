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

---

## 2. Backend Setup
```bash
npm install
```
# Create a .env file in the server folder
echo "PORT=5000" > .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_super_secret_key" >> .env
echo "NODE_ENV=development" >> .env

# Start the server
npm run dev
3. Frontend SetupBash# Open a new terminal
cd client
npm install

# Start React
npm run dev
Access the app at http://localhost:5173📚 API DocumentationMethodEndpointDescriptionAccessPOST/api/auth/registerRegister a new userPublicPOST/api/auth/loginLogin user & get TokenPublicGET/api/tasksGet all tasks for logged-in userPrivatePOST/api/tasksCreate a new taskPrivatePUT/api/tasks/:idUpdate task details or toggle statusPrivateDELETE/api/tasks/:idDelete a taskPrivate📈 Scalability StrategyThis project was built with production scalability in mind. Here is how I would scale it for a larger user base:Microservices Architecture:Currently, the app is a Monolith. To scale, I would decouple the Authentication logic and Task Management logic into separate microservices (e.g., auth-service and task-service). This prevents a failure in one module from crashing the entire app.Database Optimization:Indexing: Implement indexing on the user_id field in MongoDB to ensure task retrieval remains fast (O(1) or O(log n)) as the dataset grows to millions of records.Caching: Use Redis to cache the response of GET /api/tasks. Since task lists are read frequently but updated less often, caching would reduce database load by ~80%.Frontend Performance:Code Splitting: Implement React.lazy() to load the Dashboard component only after login, reducing the initial bundle size.CDN: Serve static assets via a CDN (Cloudflare/AWS CloudFront) for edge caching.📂 Project StructurePlaintext/root
  ├── /client (Frontend)
  │     ├── /src
  │     │    ├── /components  (Reusable UI: Navbar, TaskCard, TaskForm)
  │     │    ├── /context     (Auth State)
  │     │    ├── /pages       (Dashboard, Login, Register)
  │     │    └── /services    (Axios Config)
  │
  └── /server (Backend)
        ├── /config           (DB Connection)
        ├── /controllers      (Logic Layer)
        ├── /middleware       (Auth & Error Handling)
        ├── /models           (Mongoose Schemas)
        └── /routes           (API Endpoints)