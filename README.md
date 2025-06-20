
# 🛒 Mini E-Commerce Web App

A minimal full-stack e-commerce platform with product submission and management features. Built with React (Vite), Node.js, Express, and PostgreSQL — backend deployed on **Google Cloud Run**.

---

## ✨ Features

- ✅ Add new products with name, price, description, and optional image
- ✅ View all products in a beautiful card layout
- ✅ Edit or delete existing products
- ✅ Search by name or description
- ✅ Backend hosted on Google Cloud Run
- ✅ Clean, responsive UI built with Tailwind CSS

---

## 🛠 Tech Stack

| Layer      | Tech                                |
|------------|-------------------------------------|
| Frontend   | React (Vite), Tailwind CSS, Lucide Icons |
| Backend    | Node.js, Express.js, PostgreSQL     |
| Hosting    | Google Cloud Run (Backend API)      |
| Versioning| Git + GitHub                        |

---

## 📁 Project Structure

```
repo-root/
├── backend/              # Express + PostgreSQL API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js      # Main Express entry
│   ├── package.json
│   └── .env              # (local development only)
└── frontend/             # Vite + React App
    ├── src/
    │   ├── components
    ├   ├      ├─ProductList.jsx
    ├   ├      ├─ProductForm.jsx
    │   └── App.jsx
    ├── .env
    └── package.json
```

---

## 🚀 Backend Deployment (Google Cloud Run)

The backend is deployed to [Google Cloud Run](https://cloud.google.com/run) using **Cloud Buildpacks** (no Dockerfile required).

### 🛠️ Build Trigger

- **Source Directory:** `/backend`
- **Build method:** Cloud Buildpacks (Node.js auto-detection)
- **Exposed PORT:** Automatically uses `process.env.PORT`

---

## 🧪 Local Development

### 📦 Install dependencies

In both `backend/` and `frontend/` directories:

```bash
npm install
```

---

### 🔙 Run Backend (Locally)

```bash
cd backend
npm start
```

Ensure your `.env` includes:

```
DATABASE_URL=your_postgres_connection_string
PORT=3000
```

---

### 🔮 Run Frontend

```bash
cd frontend
npm run dev
```

In `frontend/.env`:

```
VITE_BACKEND_URL=https://your-cloud-run-url/
```

---

---

## 📌 Future Enhancements

- We used a frontend in-memory .filter() + .includes() search on product name + description (case-insensitive)

---

# School_nearest
