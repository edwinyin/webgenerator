## Website Builder MVP (Next.js App Router)

A tiny demo “website builder” that generates simple small-business websites.

- **No auth**
- **No database**
- **Local JSON storage**: `data/sites.json`
- **Local uploads**: `public/uploads`
- **Generated site preview**: single route `/site/[slug]` with front-end tabs (no internal routing)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` → home page with links
- `/admin/create` → create a website (form + uploads)
- `/sites` → list all created websites
- `/site/[slug]` → generated website preview (tabs: Home/About/Services/Contact/Hours)

## Data + uploads

- **Sites JSON**: `data/sites.json`
  - If it doesn’t exist, it will be created automatically the first time the app reads it.
  - It ships with a small seed record you can delete if you want an empty state.
- **Uploads**: files are written to `public/uploads` via `POST /api/sites` (multipart form data).

## Build / run production

```bash
npm run build
npm run start
```

test