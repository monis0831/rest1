# Rest1 — Next.js 15 + Prisma + Supabase (Node 22)
- Root contains `package.json`
- TypeScript + @types are included
- Relative imports (no "@/")
- Build runs `prisma generate`

## Local dev
npm install
# create .env.local yourself with your keys (not included here)
npm run prisma:deploy
npm run dev

## Deploy (Vercel)
- Import repo
- Build: `npx prisma generate && next build`
- Install: `npm install`
- Output: `.next`
- Add env vars in Vercel → Deploy
