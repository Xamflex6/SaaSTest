# FocusTime

Pomodoro SaaS application built with Next.js 14, TypeScript, TailwindCSS and ShadCN UI.

## Project Structure

```
app/                # App Router pages
  layout.tsx        # Root layout with Navbar and Sidebar
  page.tsx          # Home with Timer and TaskList
  dashboard/        # Dashboard with charts and history
  auth/             # Auth pages
components/         # Reusable UI components
lib/                # Zustand store and utilities
public/             # Icons, manifest and service worker
styles/             # Global styles (Tailwind)
```

## Deployment on Vercel

1. Fork this repository and create a project on [Vercel](https://vercel.com).
2. Add environment variables from `.env.local.example` in Vercel settings.
3. Install dependencies with `npm install` and push your code.
4. Vercel will automatically deploy using `next build`.

## Development

```bash
npm install
npm run dev
```

The application uses Supabase for data storage et Stripe Checkout pour les abonnements.

## Setup

1. Copy `.env.local.example` to `.env.local`.
2. Créez un projet sur [Supabase](https://supabase.com) et collez les clés dans `.env.local`.
3. Depuis votre dashboard Stripe, créez un price ID et ajoutez votre clé publishable et le prix dans `.env.local`.
4. Run `npm install` whenever `package.json` changes.