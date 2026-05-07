# Auth API Express

Documentação em Português. [Read in English](./README.md)

API de autenticação robusta desenvolvida com Express.js e PostgreSQL.

**Demo Online:** [https://auth-api-express-six.vercel.app/](https://auth-api-express-six.vercel.app/)
**Doc API (Swagger):** [https://auth-api-express-six.vercel.app/docs](https://auth-api-express-six.vercel.app/docs)

## Funcionalidades
- Autenticação JWT (stateless)
- 2FA (OTP via E-mail)
- Segurança: Helmet, Rate Limiting, CORS, Bcrypt
- Validação: Zod
- Banco de Dados: PostgreSQL

## Rotas
### Autenticação
- `POST /login`: autenticar usuário
- `POST /verify-2fa`: verificar código OTP

### Usuários
- `GET /`: listar todos os usuários
- `GET /:username`: buscar por username
- `GET /id/:id`: buscar por ID (Requer Autenticação)
- `POST /`: criar usuário
- `PATCH /id/:id`: atualizar usuário (Requer Autenticação)
- `DELETE /id/:id`: deletar usuário (Requer Autenticação)

## Tecnologias
- Node.js / Express.js
- PostgreSQL
- Resend (E-mail)
- Docker

## Instalação Local
1. Clone o repositório
2. `cp .env.example .env`
3. Preencha as variáveis (`RESEND_API_KEY`, `RESEND_DOMAIN_EMAIL`, `DATABASE_URL`)
4. `npm install`
5. `node server.js`
