# Snip.ly

A full-stack URL shortener with authentication, link analytics, dark mode, and link preview cards. Deployed with Cloudflare Pages (frontend) + Workers + D1.

## What This Project Includes
- Auth with JWT, password strength validation, and secure hashing.
- Short link creation, copy, delete, and click tracking.
- Link preview cards (title, description, image).
- Dark/light mode toggle with persistence.
- Cloudflare Worker API backed by D1.

## Cloudflare Deployment
**Worker (backend)**
- Uses `backend/worker.js` and `backend/schema.sql` with D1.
- Deployed via Wrangler.

**Pages (frontend)**
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

**Pages env vars**
- `VITE_API_BASE=https://<your-worker>.workers.dev/api`
- `VITE_SHORT_DOMAIN=https://<your-worker>.workers.dev`

## Local Development
**Backend (Express + MongoDB)**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
