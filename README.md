# Auth API Express

[![Language](https://img.shields.io/badge/language-javascript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Framework](https://img.shields.io/badge/framework-express-lightgrey.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/database-postgresql-blue.svg)](https://www.postgresql.org/)

[Leia em Português](./README-PT.md)

A robust and secure authentication API built with **Express.js** and **PostgreSQL**. This project demonstrates a production-ready approach to user management and security, implementing modern standards for authentication and authorization.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database:** PostgreSQL
- **Security:** Helmet, Express Rate Limit, CORS, Bcrypt
- **Authentication:** JSON Web Token (JWT)
- **Validation:** Zod
- **Documentation:** Swagger (OpenAPI 3.0)
- **Infrastructure:** Docker & Docker Compose
- **Email:** Nodemailer (for 2FA/notifications)

## 🔐 Key Features

- **Robust Authentication:** JWT-based stateless authentication.
- **2FA Support:** Implementation of Two-Factor Authentication (OTP).
- **Security First:**
  - Password hashing using `bcrypt`.
  - Protection against common web vulnerabilities via `helmet`.
  - Brute-force protection with `express-rate-limit`.
- **Data Integrity:** Strict request body validation using `Zod`.
- **API Documentation:** Interactive documentation with Swagger UI.
- **Scalable Architecture:** Organized into Controllers, Services, and Middlewares (Clean Architecture principles).
- **Environment Driven:** Configuration via environment variables.

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- Alternatively: Node.js 18+ and PostgreSQL 14+

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd auth-api-express
   ```

2. **Environment Variables:**
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

### 📧 Email Configuration (2FA)

To use the Two-Factor Authentication (2FA) feature, you need to configure an SMTP server. If you are using Gmail:

1. Enable **2-Step Verification** in your Google Account.
2. Generate an **App Password** (Security > 2-Step Verification > App Passwords).
3. Fill the following variables in your `.env`:
   - `GMAIL_USER`: Your email address.
   - `GMAIL_PASS`: The app password.
   - `GMAIL_HOST`: `smtp.gmail.com`
   - `GMAIL_PORT`: `587`

### Execution

3. **Run with Docker (Recommended):**

   ```bash
   docker-compose up -d
   ```

   The API will be available at `http://localhost:3000`.

4. **Local Development:**
   ```bash
   npm install
   # Make sure your local Postgres is running and configured in .env
   node server.js
   ```

## 📖 API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
`http://localhost:3000/docs` (or your deployment URL)

## 📁 Project Structure

```text
├── src
│   ├── config        # Database and Mailer configurations
│   ├── controllers   # Request handling logic
│   ├── middlewares   # Auth and security middlewares
│   ├── routes        # API route definitions
│   ├── services      # Business logic and DB interactions
│   ├── validators    # Zod schemas for request validation
├── init              # SQL initialization scripts
└── server.js         # Application entry point
```

---

_Developed for educational purposes and as a portfolio piece to demonstrate secure back-end development skills._
