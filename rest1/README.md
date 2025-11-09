# Rest1 — Next.js 15 + Node 22 (Vercel-ready)
- Root contains `package.json` (no subfolder issues)
- Build runs `prisma generate` automatically
- Minimal homepage to avoid 404 before DB init
- Admin + uploads + Prisma schema

## Local
npm install
cp .env.example .env.local   # fill values
npm run prisma:deploy        # create tables on Supabase
npm run dev

## Deploy (Vercel)
Import repo → add env vars → Deploy.
