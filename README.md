<div align="center">
  <img src="httpsYOUR_LOGO_OR_BANNER_URL_HERE" alt="Project Banner" width="600"/>
  <br/>
  <h1>Our Voice Our Rights</h1>
  <p>An anonymous, secure, and user-friendly reporting system designed to empower users and streamline administrative review.</p>
  <br/>

  <a href="https://our-voice-our-rights-kyrgtd2ew-rishabh028s-projects.vercel.app/">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live_Demo-View_Site-28a745?style=for-the-badge&logo=vercel"/>
  </a>
</div>

---

## Overview

**Our Voice Our Rights** is a full-stack web application that provides a safe and anonymous platform for users to file reports. It features a distinct, secure portal for users and a comprehensive dashboard for administrators to manage and act upon these reports.

This project is built as a **monorepo**, separating the `client` (React frontend) from the `api` (Node.js/Express backend) for clean, scalable development.

## ✨ Key Features

* **User Module:**
    * **Secure User Authentication:** Seamless sign-up and sign-in handled by **Clerk** for robust security and user management.
    * **Anonymous Reporting:** Users can submit reports with titles, descriptions, and optional file attachments without revealing their identity.
    * **User Dashboard:** A personal dashboard for users to track the status of their submitted reports (e.g., "Pending," "In Review," "Resolved").
    * **File Uploads:** Supports image and document uploads, which are securely stored using **Cloudinary**.
* **Admin Module:**
    * **Separate Admin Authentication:** A secure, token-based (JWT) login system exclusively for administrators.
    * **Admin Dashboard:** A comprehensive dashboard displaying all user-submitted reports in a clear, manageable table.
    * **Report Management:** Admins can view report details, access attachments, and update the status of any report.
    * **Data Analytics:** (Future-ready) The dashboard can be extended to show analytics on report types, resolution times, etc.

## 🚀 Tech Stack

This project uses a modern, powerful, and scalable MERN-stack-based architecture.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React 18** | Core UI library for building components. |
| | **Vite** | Lightning-fast development server and build tool. |
| | **React Router v6** | Client-side routing for navigating pages. |
| | **TailwindCSS** | A utility-first CSS framework for rapid, custom styling. |
| | **Clerk** | Handles all user authentication and session management. |
| | **Axios** | Promise-based HTTP client for making API requests. |
| | **React Hot Toast** | Provides clean and simple notifications. |
| **Backend** | **Node.js** | JavaScript runtime environment. |
| | **Express** | Fast, unopinionated web framework for the API. |
| | **MongoDB** | NoSQL database used to store report and admin data. |
| | **Mongoose** | Object Data Modeling (ODM) library for MongoDB. |
| | **JSON Web Token (JWT)** | Securely create, sign, and verify admin auth tokens. |
| | **Bcrypt.js** | Hashing admin passwords. |
| **Services** | **Cloudinary** | Cloud-based service for image and file storage. |
| | **Vercel** | Platform for (frontend) deployment and hosting. |
| | **Render / Heroku** | (Recommended) Platform for (backend) deployment. |

## 📂 Project Structure

The project is organized as a monorepo with two main directories: `api` and `client`.

```bash
our-voice-our-rights/
├── api/                  # Backend (Node.js / Express)
│   ├── controllers/      # Handles request logic (auth.controller.js, report.controller.js)
│   ├── models/           # Mongoose data models (report.model.js, admin.model.js)
│   ├── routes/           # API route definitions (auth.route.js, report.route.js)
│   ├── .env.example      # Environment variable template
│   ├── index.js          # Express server entry point
│   └── package.json
│
└── client/               # Frontend (React / Vite)
    ├── public/
    ├── src/
    │   ├── components/   # Reusable React components (Header, Footer, AdminRoute)
    │   ├── pages/        # Page-level components (Home, SignIn, Dashboard, AdminDashboard)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```
## Local Development (Getting Started)

To run this project locally, you will need to run **both** the `api` (backend) and `client` (frontend) servers.

### Prerequisites

* **Node.js** (v18.x or later)
* **MongoDB Atlas** Account (or a local MongoDB instance)
* **Cloudinary** Account (for file uploads)
* **Clerk** Account (for user authentication)

---

### 1. Backend (`api`) Setup

1.  **Navigate to the `api` directory:**
    ```bash
    cd our-voice-our-rights/api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the `api` directory and add the following keys. Get these values from your MongoDB, Cloudinary, and Clerk dashboards.

    ```dotenv
    # .env (in /api)

    # MongoDB Connection String
    MONGO_URI=your_mongodb_connection_string

    # JWT Secret for Admin Auth
    JWT_SECRET=your_super_secret_jwt_key

    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # Clerk JWT verification key
    CLERK_JWT_SECRET=your_clerk_jwt_secret_key
    ```

4.  **Run the backend server:**
    ```bash
    npm run dev
    ```
    The API server will start (usually on `http://localhost:3000`).

---

### 2. Frontend (`client`) Setup

1.  **Open a new terminal.** Navigate to the `client` directory:
    ```bash
    cd our-voice-our-rights/client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the `client` directory. Get the **Publishable Key** from your Clerk dashboard.

    ```dotenv
    # .env.local (in /client)

    # Clerk Publishable Key
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    ```

4.  **Configure API Proxy:**
    The `vite.config.js` file is already configured to proxy API requests from the frontend (running on port `5173`) to the backend (running on port `3000`). No changes are needed if you use the default ports.

    ```javascript
    // vite.config.js
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          secure: false,
        },
      },
    },
    ```

5.  **Run the frontend server:**
    ```bash
    npm run dev
    ```
    The client server will start (usually on `http://localhost:5173`). You can now access the application in your browser!

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
```

## 🙏 Acknowledgments

- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ by Rishabh
