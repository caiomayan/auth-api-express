# Auth API Express 🚀

[![Language](https://img.shields.io/badge/language-javascript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Framework](https://img.shields.io/badge/framework-express-lightgrey.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/database-postgresql-blue.svg)](https://www.postgresql.org/)

[Read in English](./README.md)

Uma API de autenticação robusta e segura desenvolvida com **Express.js** e **PostgreSQL**. Este projeto demonstra uma abordagem pronta para produção no gerenciamento de usuários e segurança, implementando padrões modernos de autenticação e autorização.

---

## 🛠 Tecnologias

- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL
- **Segurança:** Helmet, Express Rate Limit, CORS, Bcrypt
- **Autenticação:** JSON Web Token (JWT)
- **Validação:** Zod
- **Documentação:** Swagger (OpenAPI 3.0)
- **Infraestrutura:** Docker & Docker Compose
- **Email:** Nodemailer (para 2FA/notificações)

## 🔐 Funcionalidades Principais

- **Autenticação Robusta:** Autenticação stateless baseada em JWT.
- **Suporte a 2FA:** Implementação de autenticação de dois fatores (OTP).
- **Segurança em Primeiro Lugar:**
  - Hash de senhas usando `bcrypt`.
  - Proteção contra vulnerabilidades web comuns via `helmet`.
  - Proteção contra ataques de força bruta com `express-rate-limit`.
- **Integridade de Dados:** Validação rigorosa do corpo das requisições usando `Zod`.
- **Documentação da API:** Documentação interativa com Swagger UI.
- **Arquitetura Escalável:** Organizada em Controllers, Services e Middlewares (princípios de Clean Architecture).
- **Configuração via Ambiente:** Configuração totalmente baseada em variáveis de ambiente.

## 🚀 Como Executar

### Pré-requisitos

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- Alternativa: Node.js 18+ e PostgreSQL 14+

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone <repository-url>
   cd auth-api-express
   ```

2. **Variáveis de Ambiente:**
   Copie `.env.example` para `.env` e preencha suas credenciais:
   ```bash
   cp .env.example .env
   ```

### 📧 Configuração de E-mail (2FA)

Para utilizar a funcionalidade de Autenticação de Dois Fatores (2FA), você precisa configurar um servidor SMTP. Caso utilize o Gmail:

1. Ative a **Verificação em duas etapas** na sua conta Google.
2. Gere uma **Senha de App** (Segurança > Verificação em duas etapas > Senhas de App).
3. Preencha as seguintes variáveis no seu `.env`:
   - `GMAIL_USER`: Seu endereço de e-mail.
   - `GMAIL_PASS`: A senha de app.
   - `GMAIL_HOST`: `smtp.gmail.com`
   - `GMAIL_PORT`: `587`

### Execução

3. **Executar com Docker (Recomendado):**

   ```bash
   docker-compose up -d
   ```

   A API estará disponível em `http://localhost:3000`.

4. **Desenvolvimento Local:**
   ```bash
   npm install
   # Certifique-se de que o Postgres local está rodando e configurado no .env
   node server.js
   ```

## 📖 Documentação da API

Com o servidor rodando, você pode acessar a documentação interativa do Swagger em:
`http://localhost:3000/docs` (ou na URL do seu deploy)

## 📁 Estrutura do Projeto

```text
├── src
│   ├── config        # Configurações de Banco de Dados e Mailer
│   ├── controllers   # Lógica de processamento das requisições
│   ├── middlewares   # Middlewares de autenticação e segurança
│   ├── routes        # Definição das rotas da API
│   ├── services      # Lógica de negócio e interações com DB
│   ├── validators    # Schemas Zod para validação de dados
├── init              # Scripts SQL de inicialização
└── server.js         # Ponto de entrada da aplicação
```

---

_Desenvolvido para fins educacionais e como peça de portfólio para demonstrar habilidades em desenvolvimento back-end seguro._
