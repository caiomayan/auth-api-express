# Auth API Express

Main documentation in English. [Leia em Português](./README-PT.md)

Production-ready authentication API built with Express.js and PostgreSQL.

**Live Demo:** [https://auth-api-express-six.vercel.app/](https://auth-api-express-six.vercel.app/)
**API Docs (Swagger):** [https://auth-api-express-six.vercel.app/docs](https://auth-api-express-six.vercel.app/docs)

## Features

- JWT Authentication (stateless)
- 2FA (OTP via Email)
- Security: Helmet, Rate Limiting, CORS, Bcrypt
- Validation: Zod
- Database: PostgreSQL

## Routes

### Auth

- `POST /login`: authenticate user
- `POST /verify-2fa`: verify OTP code

### Users

- `GET /`: list all users
- `GET /:username`: get user by username
- `GET /id/:id`: get user by ID (Auth required)
- `POST /`: create new user
- `PATCH /id/:id`: update user (Auth required)
- `DELETE /id/:id`: delete user (Auth required)

## Tech Stack

- Node.js / Express.js
- PostgreSQL
- Resend (Email)
- Docker

## Local Setup

1. Clone the repository
2. `cp .env.example .env`
3. Fill required variables (`RESEND_API_KEY`, `RESEND_DOMAIN_EMAIL`, `DATABASE_URL`)
4. `npm install`
5. `node server.js`
