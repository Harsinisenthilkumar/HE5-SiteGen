# HE5 SiteGen Backend

A production-ready backend for the HE5 SiteGen AI Website Generator.

## Features
- Express + TypeScript REST API
- Prisma ORM with PostgreSQL
- Provider-independent AI abstraction
- Project generation, publishing, export, and deletion
- Global error handling and rate limiting
- Static serving for generated sites

## Installation
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

## Environment Variables
Copy .env.example to .env and configure the values.

## API Endpoints
- POST /api/generate
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects/:id/publish
- GET /api/projects/:id/export
- DELETE /api/projects/:id
- GET /api/projects/:id/preview

## Folder Structure
```text
backend/
src/
  config/
  controllers/
  routes/
  middleware/
  services/
  database/
  validators/
  prompts/
  types/
  utils/
  server.ts
  app.ts
prisma/
```

## Deployment
Build the app with `npm run build` and run it with `npm start`.
