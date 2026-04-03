# Task: Build status.93.fyi

A public uptime/status page for Karl's projects. Looks like a real status page (like status.vercel.com).

## Stack
Next.js 15 + Tailwind. Dark theme (#0f0808 bg, #ff2070 accent). Deploy to Vercel.

## Projects to monitor (HTTP HEAD checks from serverless function)
- TrickAdvisor — https://trickadvisor.cc
- nwbfit — https://nfit.93.fyi
- nwb-yoga — https://nyoga.93.fyi
- nwb-plan API — https://trickadvisor-api.vercel.app/health (or just root)
- 93.fyi — https://93.fyi

## Pages / features
1. `/` — Main status page
   - Header: "System Status" + overall status badge (All Systems Operational / Degraded / Outage)
   - Per-service row: name, status dot (green/yellow/red), response time, last checked
   - Auto-refreshes every 60 seconds
   - "Last updated: X seconds ago" counter
2. `/api/status` — JSON endpoint that does the actual health checks (Next.js API route)
   - Checks each URL with a 5s timeout
   - Returns { services: [{ name, url, status: "up"|"degraded"|"down", latencyMs, checkedAt }] }
   - Cache with Next.js revalidate: 30
3. Simple incident history section (hardcoded array for now, easy to edit)

## Design
- Very clean minimal dark UI
- Status dots with subtle pulse animation on green
- Font: monospace or Inter
- Mobile friendly
- Footer: "93.fyi ecosystem"

## Auth
None — fully public.

## After building:
1. `git init && git add -A && git commit -m "init: status.93.fyi uptime page"`
2. `gh repo create karlmarx/status-93fyi --public --source . --remote origin --push`
3. `vercel --yes --prod` (from the project dir — it will auto-detect Next.js)
4. `vercel domains add status.93.fyi`
5. Write a file `DEPLOY_RESULT.md` with the Vercel production URL
6. `openclaw system event --text "Done: status.93.fyi built and deployed" --mode now`
