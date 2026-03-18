# MediTrack

A clinic management app built with React, C# ASP.NET Core, and PostgreSQL.

## What it does
- Manage patients, doctors, and appointments
- JWT-based login and registration
- Full CRUD for all entities

## Tech Stack
- Frontend: React + Vite
- Backend: C# ASP.NET Core Web API
- Database: PostgreSQL (Docker)
- ORM: Entity Framework Core

## Running locally

Make sure you have Docker, Node.js, and .NET 8 SDK installed.

**Start the database**
```bash
docker compose up -d
```

**Start the backend**

Open `backend/MediTrack/MediTrack.Api` in Visual Studio and press F5.

**Start the frontend**
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Default ports
- Frontend: 5173
- Backend: 5048
- Postgres: 5544