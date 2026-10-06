# Latur Dental Clinic — Premium Website

A premium, single-page marketing website for **Latur Dental Clinic** (Ganj Golai, Latur, Maharashtra) — built with Next.js 16, Tailwind CSS 4, shadcn/ui, Framer Motion animations, Lenis smooth scrolling, and Prisma (SQLite) for appointment bookings.

> Tagline: _"Bringing Life to Your Smile!"_

---

## Features

- Cinematic preloader featuring the clinic logo
- Glassmorphism sticky navbar with hide-on-scroll and full-screen mobile menu
- Sections: Hero (word-by-word reveal, parallax, floating cards), infinite services marquee, animated stat counters, About, 10 Services, Why Us, scroll-driven Patient Journey timeline, Doctors, auto-rotating Testimonials, Appointment booking form, FAQ accordion, Footer CTA, and floating WhatsApp / Call buttons
- Buttery-smooth Lenis scrolling + scroll-triggered reveals throughout
- Fully responsive (verified from 390px mobile to 1440px desktop)
- SEO-ready: metadata, Open Graph, and JSON-LD `Dentist` structured data
- Appointment requests are validated and stored in a database via `POST /api/appointment`

## Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript)         |
| Styling    | Tailwind CSS 4 + shadcn/ui                  |
| Animation  | Framer Motion + Lenis smooth scroll         |
| Database   | Prisma ORM + SQLite (`db/custom.db`)        |
| Fonts      | Fraunces (display) + Manrope (body)         |

---

## Quick Start (Local)

**Prerequisites:** Node.js 20+ and [Bun](https://bun.sh) (or plain npm).

```bash
# 1) Install dependencies
bun install          # or: npm install

# 2) Set up the SQLite database (creates the Appointment table)
bun run db:push      # or: npx prisma db push

# 3) Start the dev server
bun run dev          # or: npm run dev
```

Open **http://localhost:3000** — done.

> The `.env` file ships with `DATABASE_URL=file:../db/custom.db` (relative to the `prisma/` folder). If the database file is not found on your machine, replace it with an absolute path, e.g. `DATABASE_URL=file:/full/path/to/db/custom.db`.
>
> A pre-created `db/custom.db` is included so the site runs immediately. Delete it and re-run `bun run db:push` for a fresh database.

### Production build

```bash
bun run build        # creates a standalone Node server
bun run start        # serves it (respects the PORT env variable)
```

---

## Deployment

This is a **full-stack** Next.js app (server API route + SQLite file), so pick the hosting accordingly:

- **VPS / Railway / Render / Fly.io (recommended — zero code changes):**
  Run `bun run build` then `bun run start`. The SQLite file persists on the server's disk. Put it behind HTTPS with Caddy or nginx.

- **Vercel:**
  Serverless functions cannot persist a SQLite file. Either:
  - switch Prisma to a hosted database (e.g. PostgreSQL on Neon/Supabase, or Turso for libSQL) and set `DATABASE_URL` in the Vercel environment variables, **or**
  - keep the booking API on a small VPS while Vercel serves the rest.

- **Shared cPanel hosting:** requires Node.js app support (Passenger). Upload the project, run the install/build steps, and point the app root to the standalone server.

---

## Customization Guide

| What to change                  | Where                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Phone / WhatsApp number, address | Search for `94043 30627` in `src/components/site/` (navbar, appointment, footer, floating-actions) |
| Doctor names & bios             | `src/components/site/doctors.tsx`                                                                |
| Services list (10 treatments)   | `src/components/site/services.tsx`                                                               |
| Testimonials                    | `src/components/site/testimonials.tsx`                                                           |
| FAQ questions                   | `src/components/site/faq.tsx`                                                                    |
| Colors & fonts (theme)          | `src/app/globals.css` → `@theme` block (ivory / deep teal / gold, Fraunces + Manrope)            |
| Photography                     | `public/images/` — `hero-clinic.jpg`, `about-care.jpg`, `doctor-siddharth.jpg`, `doctor-jyoti.jpg`, `smile-banner.jpg` |
| Logo & icons                    | `public/` — `logo-full.png`, `logo-emblem.png`, `logo-emblem-white.png`, `favicon.png`, `apple-touch-icon.png`, `icon-512.png` (original file also in `brand-assets/`) |
| Page title, meta & SEO schema   | `src/app/layout.tsx`                                                                             |

## Project Structure

```
latur-dental-clinic-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Single-page composition (all sections)
│   │   ├── layout.tsx            # Metadata, fonts, JSON-LD, favicon
│   │   ├── globals.css           # Theme tokens & keyframes
│   │   └── api/appointment/      # POST endpoint → Prisma → SQLite
│   ├── components/site/          # navbar, preloader, hero, marquee-stats,
│   │                             # about, services, why-us, journey, doctors,
│   │                             # testimonials, appointment, faq, footer,
│   │                             # floating-actions, smooth-scroll, reveal
│   └── lib/db.ts                 # Prisma client singleton
├── prisma/schema.prisma          # Appointment model
├── db/custom.db                  # SQLite database (pre-created)
├── public/                       # Logo set + photography
├── brand-assets/                 # Original uploaded logo
└── package.json
```

## Viewing Appointment Bookings

Every submission from the website form is saved to the `Appointment` table. Inspect entries with:

```bash
npx prisma studio     # opens a browser UI at localhost:5555
```

---

## Clinic Reference

- **Latur Dental Clinic** — Lokhand Galli, Ganj Golai, Latur, Maharashtra
- Phone / WhatsApp: **+91 94043 30627**
- Hours: Mon–Sat, 10:00 AM – 8:00 PM
- Doctors: Dr. Siddharth Phadkule (BDS, MDS — Orthodontics) & Dr. Jyoti Phadkule (BDS)
