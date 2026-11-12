# EasyFeedback

**Embeddable feedback-collection API & dashboard** — collect NPS / CSAT / CES feedback from your apps via a simple REST API, reward respondents with points & badges, and analyze results in a real-time dashboard.

Built with Next.js (App Router) + Supabase. Originally prototyped on [v0.app](https://v0.app/chat/mQ7yFNjSumH).

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/revolutionbyhiddenvalues-9965s-projects/v0-feedback-tool-implementation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- **REST API v1** — `POST/GET /api/v1/feedback`, `GET /api/v1/feedback/stats`, `GET /api/v1/respondents/:id` (Bearer API-key auth)
- **Feedback types** — NPS (0–10), CSAT (1–5), CES (1–7), with aggregated stats
- **Respondent rewards** — points & badges to increase response rates
- **Multi-tenant** — organizations, projects, per-project API keys (`ef_*`)
- **Privacy options** — anonymous feedback support
- **Dashboard** — projects, API keys, analytics

## Quick start (self-host)

1. **Supabase**: create a project (free tier is fine), then run the SQL in `scripts/` in order:
   - `001-initial-schema.sql` — tables (organizations, projects, feedback, respondents, api_keys, badges)
   - `002-rls-policies.sql` — Row-Level Security
   - `003-seed-badges.sql` — badge seed data
   - `004-rpc-functions.sql` — RPC helpers
2. **Env vars** (`.env.local` or Vercel project settings):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   ```
3. **Run**:
   ```bash
   pnpm install
   pnpm dev          # http://localhost:3000
   ```
4. Sign up at `/auth/sign-up`, create a project + API key in the dashboard, then:

   ```bash
   curl -X POST https://<your-host>/api/v1/feedback \
     -H "Authorization: Bearer ef_your_api_key" \
     -H "Content-Type: application/json" \
     -d '{"type":"nps","score":9,"comment":"Great!","respondent_id":"user_123"}'
   ```

## Deploy

One-click-friendly on Vercel (this repo is already wired to a live deployment). Any Next.js-capable host works — the app needs only the two env vars above plus a reachable Supabase project.

## API reference

See `/docs` on a running instance — covers auth, feedback types, endpoints, and rate limits.

## Status

Functional prototype: landing, docs, auth, dashboard, API v1, schema + RLS all present and deployed. TODOs for hardening: rate-limit enforcement, webhooks, iframe widget bundle, tests.

## License

MIT — see [LICENSE](LICENSE).
