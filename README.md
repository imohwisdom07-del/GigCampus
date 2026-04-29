# GigCampus

A micro-job platform for students to find and post gigs. Built with React (frontend) and Node.js/Express/Supabase (backend).

## Features

- User authentication (Email/Password, Google OAuth, Phone OTP)
- Job posting and browsing
- Real-time job updates
- Filtering by category, location, remote/on-campus, pay rate
- Responsive design with dark theme

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, GSAP animations
- **Backend:** Node.js, Express, Supabase, Zod validation
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Backend Setup

1. Navigate to `backend/` folder
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your Supabase credentials
4. Create the `jobs` table in Supabase (see `backend/README.md` for SQL)
5. Start backend: `npm run dev`

### Frontend Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Start frontend: `npm run dev`

### Environment Variables

Create `.env` in root:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_BASE_URL=http://localhost:4000/api
```

And in `backend/.env`:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_OAUTH_REDIRECT_URL=http://localhost:4173/auth/callback
PORT=4000
```

## Development

- Frontend: `npm run dev`
- Backend: `cd backend && npm run dev`
- Build: `npm run build`

## Project Structure

```
├── backend/          # Express API server
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── utils/        # Utilities (Supabase client, jobs service)
│   └── assets/       # Static assets
└── public/           # Public assets
```
