# Webix Vite Frontend & Django Backend

This project is a full-stack web application using **Webix with Vite** for the frontend and **Django** for the backend and SQLite for the database.

---

## Prerequisites
Ensure you have the following installed:

- **Node.js** (v16+ recommended) - [Download](https://nodejs.org/)
- **Python** (3.8+) - [Download](https://www.python.org/downloads/)
- **pip** (Python package manager)
- **Virtualenv** (recommended for Python dependencies)
- **PostgreSQL/MySQL/SQLite** (optional for production databases)

---

## 🚀 Setup and Running the Backend (Django)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/webix-django-app.git
cd webix-django-app
```

### 2️⃣ Create a Virtual Environment
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3️⃣ Install Dependencies
```python3
cd ./django-backend/
pip install -r requirements.txt
```

### 5️⃣ Run Migrations & Start Server
```sh
cd backend
python manage.py migrate
python manage.py runserver
```
Your Django backend will be running at `http://127.0.0.1:8000/`.
To test using Swagger, go to `http://127.0.0.1:8000/api/docs/swagger/`

---

## 🚀 Setup and Running the Frontend (Webix + Vite)

### 1️⃣ Navigate to Frontend Directory
```sh
cd ../
cd webix-frontend
```

### 2️⃣ Install Node Dependencies
```sh
npm install
```

### 3️⃣ Start Development Server
```sh
npm start
```
Your frontend will be running at `http://localhost:5173/`.

## 📦 Building for Production
To generate an optimized production build for the frontend:
```sh
npm run build
```
Then, serve the files using a web server or integrate them into Django’s static files.

For Django, run:
```sh
python manage.py collectstatic
```


## 🛠 Troubleshooting
- **CORS Issues**: Ensure `CORS_ALLOW_ALL_ORIGINS = True` in Django.
- **Database Issues**: Check `DATABASE_URL` in `.env`.
- **Frontend Errors**: Run `npm run clean` and reinstall dependencies.

---

## 📜 License
This project is licensed under the MIT License.

---

## ⭐ Acknowledgments
- **Webix** - UI Framework
- **Vite** - Fast frontend tooling
- **Django** - Backend framework

