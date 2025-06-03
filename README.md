# FocusTime

Pomodoro SaaS application built with Next.js 14, TypeScript, TailwindCSS and ShadCN UI.

## Project Structure

```
app/                # App Router pages
  layout.tsx        # Root layout with Navbar and Sidebar
  page.tsx          # Home with Timer and TaskList
  dashboard/        # Dashboard with charts and history
  auth/             # Clerk auth pages
components/         # Reusable UI components
lib/                # Zustand store and utilities
public/             # Icons, manifest and service worker
styles/             # Global styles (Tailwind)
```

## Deployment on Vercel

1. Fork this repository and create a project on [Vercel](https://vercel.com).
2. Add environment variables from `.env.local.example` in Vercel settings.
3. Install ShadCN UI and Tailwind dependencies locally if needed.
4. Push your changes, Vercel will automatically deploy using `next build`.

## Development

```bash
npm install
npm run dev
```

The application uses Clerk for authentication, Supabase for data storage and Stripe Checkout for subscriptions.
