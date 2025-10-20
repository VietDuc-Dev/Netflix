# 🌟 MERN NETFLIX App

---

## 🚀 Tools & Technologies

This project leverages the latest tools and frameworks for modern development:

- **Node.js**: Scalable backend architecture
- **React.js**: Dynamic frontend framework
- **MongoDB & Mongoose**: Flexible and scalable database solutions
- **TailwindCSS**: Beautiful, responsive design
- **Vite.js**: Lightning-fast frontend development

---

## 🔄 Getting Started

### 1. DEMO

https://teams-project-management-app.vercel.app/

### 2. Set Up Environment Variables

Create a `.env` file in the root of your project and configure these variables:

```plaintext
PORT=8000
NODE_ENV=development
MONGO_URI="mongodb+srv://<username>:<password>@<>.mongodb.net/teamsync_db"

SESSION_SECRET="session_secret_key"

GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

FRONTEND_ORIGIN=http://localhost:3000
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback
```

### 3. Run the Application

Install dependencies and start the development server:

```bash
npm install
npm start
```

Access the backend at `http://localhost:5000`.

---

## 🌐 Deploying

### 1. Add Environment Variables

Add the `.env` variables to your hosting platform (e.g., Vercel).

### 2. Deploy

Deploy your app using your preferred method to make it live.
