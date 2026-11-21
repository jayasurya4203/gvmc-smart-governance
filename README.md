# GVMC Smart Governance Platform

AI-powered smart municipal governance and citizen assistance platform for **Greater Visakhapatnam Municipal Corporation (GVMC)**.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **Framer Motion**
- **Prisma** + **SQLite** (local dev database)
- **JWT** session cookies (`jose` + `bcryptjs`)
- **Leaflet** / **react-leaflet** (optional **Mapbox** tiles via env)

## Features

### Backend API
- **Auth** — `POST /api/auth/login`, `register`, `logout`, `GET /api/auth/me`
- **Complaints** — create, list, track by ID, status updates (officer/worker), duplicate detection near GPS
- **Notifications** — per-user inbox, mark read, unread count
- **GIS** — wards GeoJSON, complaint markers, municipal offices, city alerts
- **Stats** — live complaint counts for dashboards

### Maps (GIS)
- Interactive **Leaflet** map on `/maps` and home preview
- Layers: ward boundaries, complaint markers, offices, flood zones
- Location picker with GPS on complaint registration
- Set `NEXT_PUBLIC_MAPBOX_TOKEN` + `NEXT_PUBLIC_MAP_PROVIDER=mapbox` for Mapbox tiles

### Protected routes
- `/admin` — officers & admins (middleware)
- `/worker` — field workers & admins
- Demo logins (password `gvmc123`): `citizen@gvmc.demo`, `officer@gvmc.demo`, `worker@gvmc.demo`, `admin@gvmc.demo`

## Getting started

```bash
cd gvmc-smart-governance
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API overview

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/register` | Create account |
| GET | `/api/auth/me` | Current user |
| GET/POST | `/api/complaints` | List / create |
| GET | `/api/complaints/[id]` | Track by ID or publicId |
| PATCH | `/api/complaints/[id]/status` | Officer status update |
| GET | `/api/notifications` | User notifications |
| GET | `/api/gis/wards` | Ward polygons |
| GET | `/api/gis/complaints` | Map markers |
| GET | `/api/gis/offices` | Office POIs |
| GET | `/api/stats` | City KPIs |

## Project structure

```
prisma/           # Schema, seed, SQLite DB
src/app/api/      # Route handlers
src/components/maps/  # Leaflet map UI
src/contexts/     # Auth + app preferences
src/lib/          # DB, auth, complaints, GIS helpers
```

## Next steps

1. Real AI integrations (RAG, voice, computer vision)
2. File upload storage for complaint media
3. PWA offline layer and Web Push notifications
4. Production database (PostgreSQL) and object storage

## License

Private — GVMC project scaffold.
