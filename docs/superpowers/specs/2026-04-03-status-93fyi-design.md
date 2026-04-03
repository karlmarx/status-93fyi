# Design: status.93.fyi — Public Uptime Status Page

**Date:** 2026-04-03
**Status:** Approved

## Overview

A fully public, minimal dark-themed uptime/status page for the 93.fyi ecosystem. No auth. Deployed to Vercel at `status.93.fyi`.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel (serverless)
- **Font:** Inter (Google Fonts) with monospace fallback

## Services Monitored

| Name | URL |
|------|-----|
| TrickAdvisor | https://trickadvisor.cc |
| nwbfit | https://nfit.93.fyi |
| nwb-yoga | https://nyoga.93.fyi |
| nwb-plan API | https://trickadvisor-api.vercel.app/health |
| 93.fyi | https://93.fyi |

## File Structure

```
/
├── app/
│   ├── layout.tsx              — dark theme shell, font, metadata
│   ├── page.tsx                — main status page (client component)
│   └── api/
│       └── status/
│           └── route.ts        — health check API route
├── components/
│   ├── ServiceRow.tsx          — service name, status dot, latency, last checked
│   ├── OverallBadge.tsx        — aggregate status badge
│   └── IncidentHistory.tsx     — hardcoded incident list
├── lib/
│   └── incidents.ts            — incident history array (hardcoded, easy to edit)
└── tailwind.config.ts          — custom theme tokens
```

## API Route: `/api/status`

- Method: `GET`
- Implementation: `HEAD` request to each service URL with `AbortController` (5s timeout)
- Status logic:
  - `up` — response received, latency < 1000ms, status 2xx/3xx
  - `degraded` — latency 1000–3000ms, or 4xx response
  - `down` — timeout, network error, or 5xx response
- Response shape:
  ```json
  {
    "services": [
      {
        "name": "TrickAdvisor",
        "url": "https://trickadvisor.cc",
        "status": "up",
        "latencyMs": 142,
        "checkedAt": "2026-04-03T12:00:00.000Z"
      }
    ]
  }
  ```
- ISR caching: `export const revalidate = 30`

## Main Page: `/`

- Client component (`"use client"`)
- Fetches `/api/status` on mount, then polls every 60 seconds
- "Last updated X seconds ago" live counter (increments every second)
- Overall badge derived from worst individual service status:
  - All `up` → "All Systems Operational" (green)
  - Any `degraded` → "Degraded Performance" (yellow)
  - Any `down` → "Service Outage" (red)
- Per-service rows showing: colored status dot, service name, latency (ms), last checked time
- Green status dot has subtle CSS pulse animation
- Incident history section below services

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#0f0808` |
| Surface | `#1a0f0f` (cards/rows) |
| Accent | `#ff2070` |
| Up (green) | `#22c55e` |
| Degraded (yellow) | `#eab308` |
| Down (red) | `#ef4444` |
| Text primary | `#f5f5f5` |
| Text muted | `#6b7280` |

## Incident History

Defined as a hardcoded TypeScript array in `lib/incidents.ts`:

```ts
interface Incident {
  date: string;       // ISO date string
  title: string;
  description: string;
  status: "resolved" | "investigating" | "monitoring";
  services: string[]; // affected service names
}
```

Starts empty. Rendered as a timeline list below the services grid.

## Post-Deploy Steps

1. `git init && git add -A && git commit -m "init: status.93.fyi uptime page"`
2. `gh repo create karlmarx/status-93fyi --public --source . --remote origin --push`
3. `vercel --yes --prod`
4. `vercel domains add status.93.fyi`
5. Write `DEPLOY_RESULT.md` with production URL
6. `openclaw system event --text "Done: status.93.fyi built and deployed" --mode now`

## Out of Scope

- Auth/login
- Database or persistent incident storage
- Webhook/alert notifications
- Historical uptime graphs
