# 🧠 Shodh-a-Code — Full Stack

A *full-stack online coding contest platform* inspired by *LeetCode* and *HackerRank* — where users can explore contests, attempt coding problems, and submit solutions.

This repository contains both the *React (Vite) frontend* and *Spring Boot backend*, together forming the complete Shodh-a-Code assignment.

---

## 🎯 Overview

- 🌐 Frontend: React + Tailwind CSS + Axios
- ⚙ Backend: Spring Boot (Java 17) + H2 + JPA
- 🧩 Core Features: Contests, Problems, Submissions, Leaderboard
- 🧠 Purpose: A simplified coding platform with mock code evaluation, created for assignment & demonstration

---

## 🪶 Folder Structure

```
shodh-a-code/
├── frontend/     # React + Vite + Tailwind frontend
└── backend/      # Spring Boot backend (REST API)
```
---

# 🎨 Frontend — React + Vite

A clean and responsive *React (Vite)* frontend for Shodh-a-Code, enabling users to browse contests, view problems, submit code, and track results in real-time.

## 🚀 Features

- 🧭 View all contests and problem details
- 💻 Code editor with submission functionality
-  ⚡ Fetches data dynamically from Spring Boot APIs
-  🏆 Leaderboard showing top performers
-  🎨 Styled with Tailwind CSS
-  🔗 Integrated with backend via Axios API service

---

## 🧱 Project Structure
```
frontend/
├── src/
│   ├── components/      # Navbar, ContestCard, ProblemView, Leaderboard
│   ├── pages/           # ContestList, ContestDetail, ProblemDetail
│   ├── services/        # API calls (Axios)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```
---

## ⚙ Tech Stack

| Category | Technology |
|------------|-------------|
| Framework | *React 18 + Vite* |
| Styling | *Tailwind CSS* |
| HTTP Client | *Axios* |
| Routing | *React Router* |
| Build Tool | *Vite* |
| State Handling | *React Hooks (useState, useEffect)*|

---

## 🧩 API Integration
```
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});
```
Examples:

- GET /api/contests → Fetch contests
- GET /api/contests/{id} → Fetch specific contest details
- POST /api/submissions → Submit user code
- GET /api/submissions/{id} → Fetch submission result

## 🧠 Local Setup

### 1️⃣ Install Dependencies
```
cd frontend
npm install
```

### 2️⃣ Start Development Server
```
npm run dev
```
Runs at http://localhost:5173

(Ensure backend runs at port 8080)

# ⚙ Backend — Spring Boot API

A *Spring Boot–based backend* serving REST APIs for contests, users, problems, and submissions.

## 🚀 Features

- 🏁 Manage *Contests, **Problems, **Users, and **Submissions*
- ⚙ Real-time *Code Judge* executing inside Docker (supports C++, Java, Python)
- 🔗 RESTful endpoints with JPA auto-generation
- ⚙ Built using Spring Boot 3.5.7 + Maven
- 🧩 Includes mock code evaluation service
- 🔒 Configurable CORS & global exception handling
---

## 🧱 Project Structure
```
backend/
├── src/
│   ├── main/java/com/shodhacode/backend/
│   │   ├── config/         # CORS, async, and app configs
│   │   ├── controller/     # REST controllers
│   │   ├── dto/            # Request/Response DTOs
│   │   ├── model/          # Entity classes (User, Contest, Problem, Submission)
│   │   ├── repository/     # JPA repositories
│   │   ├── service/        # Business logic
│   │   └── util/           # Utility classes (DockerExecutor, Comparator)
│   └── resources/
│       ├── application.properties
│       └── data.sql        # Seed data
├── pom.xml
└── Dockerfile
```
---

## ⚙ Tech Stack

| Component | Technology |
|------------|-------------|
| Backend Framework | *Spring Boot 3.5.7* |
| Build Tool | *Maven* |
| Language | *Java 17 (Eclipse Adoptium JDK)* |
| Database | *H2 (In-Memory)* |
| ORM | *Spring Data JPA* |
| Containerization | *Docker* (optional) |

---

## 🧩 API Endpoints

### 👤 Users
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | /api/users | Get all users |
| POST | /api/users | Create a new user |
| GET | /api/users/{id} | Get user by ID |
| DELETE | /api/users/{id} | Delete a user |

### 🏁 Contests
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | /api/contests | Get all contests |
| POST | /api/contests | Create new contest |
| GET | /api/contests/{id} | Get contest by ID |

### 🧮 Problems
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | /api/problems | Get all problems |
| GET | /api/problems/{id} | Get problem details |
| POST | /api/problems | Add new problem |

### 🧾 Submissions
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | /api/submissions | Get all submissions |
| POST | /api/submissions | Submit code |
| GET | /api/submissions/{id} | Get submission result |

---

## 🧠 Local Setup

### ▶ Run Backend
```
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```
Backend runs at http://localhost:8080

### 🐳 Docker Setup
```
docker build -t shodhacode-backend .
docker run -p 8080:8080 shodhacode-backend
```
---
