# Photo Platform

> A photographer's personal platform — polished public portfolio, magic-link client cabinet, and a password-gated admin panel. Built as a portfolio project to demonstrate production-grade frontend architecture.

**Live demo:** [photo-platform-ochre.vercel.app](https://photo-platform-ochre.vercel.app/)

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## Overview

Photo Platform is more than a photographer's website. It is a complete platform with three distinct surfaces:

| Surface | Who it's for | Key capability |
|---|---|---|
| **Public landing** | Anyone | Portfolio gallery, pricing, contact form |
| **Client cabinet** | Invited clients | Browse & download their own photo sessions |
| **Admin panel** | Photographer | Manage content, upload photos, invite clients |

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Nuxt 4** | File-based routing, SSR/SSG, module ecosystem |
| Language | **TypeScript** | Type safety across the entire codebase |
| Architecture | **FSD** (Feature-Sliced Design) | Scalable, dependency-rule-enforced folder structure |
| State | **Pinia** | Lightweight, composable, TypeScript-first |
| Auth | **Supabase** Magic Link | Passwordless — clients click a link in their email |
| Database | **Supabase** PostgreSQL | Relational data for clients, albums, orders |
| Photo storage | **Cloudflare R2** | 10 GB free tier, zero egress fees |
| Deployment | **Vercel** | Edge network, preview deployments, zero config |
| Animations | **GSAP + Lenis** | Smooth scroll, scroll-triggered reveals |
| Components | **Storybook** | Isolated component development and documentation |
| Images | **@nuxt/image** + **sharp** | Automatic optimization and lazy loading |
| Downloads | **JSZip** | Client-side ZIP archive from selected photos |
| Fonts | **Cormorant Garamond** + **Hanken Grotesk** | Editorial serif + clean humanist sans-serif |

---

## Features

### Public Landing (single long-scroll page)

- **Hero** — full-bleed photograph, photographer name, tagline
- **About** — portrait + biography
- **Portfolio** — 5 categories: reportage · studio · creative · wedding · children
- **Timeline** — photographer's creative journey
- **Print album** — special offer with order form
- **Contacts & Pricing** — service list with prices, enquiry form

Fixed header with logo, section navigation, social links, **RU / EN** language toggle, and **light / dark** theme toggle.

### Client Cabinet

- Passwordless login via **Magic Link** sent to email
- List of personal photo sessions
- Full-screen **lightbox gallery** (Fancybox)
- Multi-photo selection with preview
- **Download as ZIP** — client picks photos, gets an archive

### Admin Panel

- **Read-only mode** — anyone can browse the admin to inspect content (great for GitHub reviewers)
- **Edit mode** — unlocked by a simple password; no account required
- Manage landing page content (texts, images, pricing)
- Create clients, upload photos, send Magic Link invitations
- View and manage incoming orders

---

## Architecture

### Feature-Sliced Design

```
app/
├── 01.shared/        # Design system: UI kit, utilities, config, API clients
├── 02.entities/      # Business models: photo, album, client, order
├── 03.features/      # User actions: select-photo, download-archive,
│                     #               upload-photo, auth-by-token, submit-order
├── 04.widgets/       # Composite UI: AlbumGallery, PhotoSelector, AdminUploader
├── assets/           # Global styles (SCSS), fonts
├── layouts/          # default.vue
└── pages/            # File-based routes
```

Imports flow strictly downward: `pages → widgets → features → entities → shared`. No layer imports from a higher layer.

### Photo Storage

```
Supabase
├── Auth          ← Magic Link, session tokens
└── PostgreSQL    ← albums, photos (metadata), clients, orders

Cloudflare R2
├── photo-platform-previews   (public bucket)  ← gallery thumbnails
└── photo-platform-originals  (private bucket) ← full-res, served via presigned URL
```

---

## Roadmap

- [x] Project scaffold — Nuxt 4, FSD aliases, SCSS abstracts, Storybook
- [ ] **Phase 1 — Frontend** *(current)*
  - [ ] Public landing with static placeholder photos
  - [ ] GSAP scroll animations, Lenis smooth scroll
  - [ ] Light / dark theme
  - [ ] i18n (RU / EN)
- [ ] **Phase 2 — Auth & Storage**
  - [ ] Supabase project setup
  - [ ] Magic Link login flow
  - [ ] Cloudflare R2 bucket configuration
- [ ] **Phase 3 — Client Cabinet**
  - [ ] Album gallery with lightbox
  - [ ] Photo selection + ZIP download
- [ ] **Phase 4 — Admin Panel**
  - [ ] Read-only preview mode
  - [ ] Password-gated edit mode
  - [ ] Photo upload, client management, order list
- [ ] **Phase 5 — Polish**
  - [ ] Storybook documentation for all shared UI
  - [ ] Accessibility audit
  - [ ] Performance budget (Core Web Vitals)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Browse component library (http://localhost:6006)
npm run storybook

# Build for production
npm run build
```

> **Note:** Phases 1 runs entirely without backend. No environment variables are required to run the landing page locally.

---

## Environment Variables

Required for Phase 2+:

```env
SUPABASE_URL=
SUPABASE_KEY=
CLOUDFLARE_R2_BUCKET_PREVIEWS=
CLOUDFLARE_R2_BUCKET_ORIGINALS=
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
ADMIN_PASSWORD=
```

---

## Project Goals

This project is built as a **portfolio piece** to demonstrate:

- Production-grade FSD architecture in a real Nuxt 4 application
- Clean separation between public, authenticated, and admin surfaces
- Thoughtful storage design (public CDN vs. private presigned URLs)
- Component-driven development with Storybook
- Smooth, animation-rich UI with GSAP and Lenis

---

*Made with Vue 3 + Nuxt 4 · Deployed on Vercel*
