# 🧠 Shodh-a-Code — Backend

A **Spring Boot–based backend** for an online coding contest platform — similar to LeetCode or HackerRank — where users can view contests, attempt coding problems, and submit code.  

This project powers the **Shodh-a-Code** assignment, forming the backend REST API for the React frontend.

---

## 🚀 Features

- 🏁 Manage **Contests**, **Problems**, **Users**, and **Submissions**
- 💾 In-memory **H2 Database** for quick testing
- 🔗 RESTful API architecture
- ⚙️ Built with **Spring Boot 3.5.7** and **Maven**
- 🔒 Automatic table generation via JPA + `data.sql` seeding
- 🧩 Mocked **code evaluation service** (simulated code judge)

---

## 🧱 Project Structure

backend/
├── src/
│ ├── main/
│ │ ├── java/com/shodhacode/backend/
│ │ │ ├── config/ # CORS, async, and app configs
│ │ │ ├── controller/ # REST controllers
│ │ │ ├── dto/ # Request/response DTOs
│ │ │ ├── model/ # Entity classes (User, Contest, Problem, Submission)
│ │ │ ├── repository/ # JPA repositories
│ │ │ ├── service/ # Business logic services
│ │ │ └── util/ # Utility classes (DockerExecutor, Comparator, etc.)
│ │ └── resources/
│ │ ├── application.properties
│ │ └── data.sql # Preloaded seed data
│ └── test/java/com/shodhacode/backend/
├── pom.xml
├── mvnw / mvnw.cmd
└── docker-compose.yml


---

## ⚙️ Tech Stack

| Component | Technology |
|------------|-------------|
| Backend Framework | **Spring Boot 3.5.7** |
| Build Tool | **Maven** |
| Language | **Java 17 (Eclipse Adoptium JDK)** |
| Database | **H2 (In-Memory)** |
| ORM | **Spring Data JPA** |
| Containerization | **Docker Compose** (optional) |

---

## 🧩 API Endpoints

### 👤 Users
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| GET | `/api/users/{id}` | Get user by ID |
| DELETE | `/api/users/{id}` | Delete a user |

### 🏁 Contests
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/contests` | Get all contests |
| POST | `/api/contests` | Create new contest |
| GET | `/api/contests/{id}` | Get contest by ID |

### 🧮 Problems
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/problems` | Get all problems |
| GET | `/api/problems/{id}` | Get problem details |
| POST | `/api/problems` | Add new problem |

### 🧾 Submissions
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/submissions` | Get all submissions |
| POST | `/api/submissions` | Submit code |
| GET | `/api/submissions/{id}` | Get submission result |

---

## 🛠️ Setup Instructions

### 🧩 Prerequisites
Make sure you have:
- [Java 17+](https://adoptium.net)
- [Maven 3.9+](https://maven.apache.org)
- (Optional) [Docker](https://www.docker.com/)

---

### ⚙️ Run Locally

#### 🪶 Using Maven
```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
