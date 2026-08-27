# Store Rating Web Application

A full-stack web application that allows users to register, view listed stores, submit ratings (1 to 5 stars), and modify their existing ratings. The platform incorporates a single role-based authentication system supporting **System Administrators**, **Normal Users**, and **Store Owners**.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (with `pg` connection pooling)
- **Frontend:** React.js, React Router v6, Axios
- **Authentication:** JSON Web Tokens (JWT), `bcryptjs`
- **Validation:** `express-validator` (Backend), React state (Frontend)

---

## 📂 Project Structure

```text
store-rating-app/
├── backend/
│   ├── config/
│   │   └── db.js              # PostgreSQL pool connection
│   ├── controllers/
│   │   ├── adminController.js # Admin dashboard & user/store management
│   │   ├── authController.js  # Signup, login & password management
│   │   ├── ownerController.js # Store owner statistics & rated users
│   │   └── userController.js  # Store listings & rating submissions
│   ├── middleware/
│   │   ├── auth.js            # JWT verification & role-based guards
│   │   └── validation.js      # Input constraints & validation rules
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── ownerRoutes.js
│   │   └── userRoutes.js
│   ├── package.json
│   └── server.js              # Server entry point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── DataTable.jsx  # Reusable sortable table component
    │   ├── context/
    │   │   └── AuthContext.jsx# Global auth & state management
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── OwnerDashboard.jsx
    │   │   └── UserDashboard.jsx
    │   ├── services/
    │   │   └── api.js         # Axios instance with auth interceptors
    │   ├── App.jsx            # Application routing & protected routes
    │   └── main.jsx
    └── package.json
