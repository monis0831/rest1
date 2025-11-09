# Adhula — Yemeni Restaurant (Next.js + Supabase + Prisma)

Red/black themed site with menu, item videos, images, and an admin to manage everything.

## Quickstart
```bash
npm install
cp .env.example .env.local
# edit .env.local with your Supabase + DB details
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000 and /admin-login to sign in (password from .env).

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Import in Vercel → add env vars:
   - DATABASE_URL
   - NEXT_PUBLIC_SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - ADMIN_PASSWORD
   - NEXTAUTH_SECRET
3. Deploy.

## Supabase Storage
Create a bucket named `media` (public). The Admin lets you upload images/videos via `/api/upload` to this bucket.
