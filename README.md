# 🏋️ Training App — Frontend

A full stack MERN app to log and organize your workouts by discipline (running, cycling, swimming…).

**🔗 Live demo:** https://app-training.vercel.app/
**⚙️ Backend repo:** [Training App Backend](https://github.com/raulcarrasco8/Training-app-project-backend)

> ⏳ **Heads up:** the API runs on Render's free tier, so the first request may take ~50 seconds while the server wakes up. After that it runs normally.

---

## ✨ Features

- User sign up and login with JWT authentication
- Create custom disciplines (running, cycling, swimming…)
- Full CRUD for workouts: create, edit and delete entries linked to each discipline
- Responsive UI built with Mantine

## 🛠️ Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Mantine UI, JavaScript, HTML, CSS |
| Backend | Node.js, Express.js, MongoDB + Mongoose, JWT |
| Deployment | Vercel (frontend), Render (API) |

## 🧠 Technical decisions

- **Mantine UI:** I used Mantine to reuse well-designed, ready-made components instead of building the UI from scratch. This let me spend more time on the app's logic and on shipping new features.
- **React Context for auth:** the logged-in user and token live in a context, so any page can access them without prop drilling.
- **Separate frontend and backend repos:** keeping the client and the API apart keeps each codebase clean and focused, and gives the project a clear structure if a team ever works on it, with frontend and backend developers able to work independently.

## 🔮 What I'd improve today

- [ ] Add tests (Jest + Supertest for the API, Playwright for end-to-end)
- [ ] Set up CI with GitHub Actions
- [ ] Migrate to TypeScript

---

## 🚀 Run it locally

1. Clone the repo

```bash
git clone https://github.com/raulcarrasco8/Training-app-project-frontend
cd Training-app-project-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root pointing to your local backend:

```env
VITE_API_URL=http://localhost:5005
```

4. Start the dev server

```bash
npm run dev
```

5. Open http://localhost:5173

## 📂 Project structure

```
src/
├── assets/
├── components/
├── context/
├── pages/
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## 👨‍💻 Author

**Raúl Carrasco** — [LinkedIn](https://www.linkedin.com/in/raul-webdeveloper/) · [GitHub](https://github.com/raulcarrasco8)