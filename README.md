# VAN EGMOND Potgrond Bestelapp

Productiegerichte bestelapp op Next.js (App Router), Supabase, Zustand en next-intl.

## Setup

1. Installeer dependencies:
   - `npm install`
2. Kopieer `.env.example` naar `.env.local` en vul Supabase waarden in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. Draai het SQL schema in Supabase SQL editor:
   - `supabase/schema.sql`
4. (Optioneel) voeg voorbeeldproducten toe:
   - `supabase/seed.sql`
5. Start de app:
   - `npm run dev`

## Beschikbare routes

- `/` splash screen met auto-redirect
- `/login` Supabase email/password login
- `/dashboard` productoverzicht met glass cards
- `/cart` winkelwagen en bestelling plaatsen
- `/orders` orderoverzicht met realtime updates
- `/orders/[id]` orderdetail
- `/admin` orderbeheer (admin)

## Smoke test checklist

- Login werkt met Supabase account en redirect naar `/dashboard`
- Producten verschijnen op `/dashboard` na uitvoeren van `supabase/seed.sql`
- Product toevoegen verhoogt badge en verschijnt in `/cart`
- Bestelling plaatsen redirect naar `/orders?success=1`
- Nieuwe bestelling zichtbaar in admin, status wijziging werkt
- Statuswijziging zichtbaar op klantzijde via realtime update

## Deploy ready (Vercel + Supabase)

1. Push naar GitHub en importeer project in Vercel.
2. Zet in Vercel bij **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (bijv. `https://jouw-app.vercel.app`)
3. Zet in Supabase Auth > URL Configuration:
   - **Site URL**: `NEXT_PUBLIC_SITE_URL`
   - **Redirect URLs**: `http://localhost:3000`, je Vercel URL(s)
4. Draai in Supabase SQL editor:
   - `supabase/schema.sql`
   - `supabase/seed.sql` (optioneel)
5. Draai lokaal preflight check voor deploy:
   - `npm run ci`
6. Deploy op Vercel en run smoke test checklist hierboven.