<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Zombie Hideout Agent Guide

## Project Shape

- Next.js 16 App Router lives in `app/`.
- Localized routes live under `app/[locale]`.
- Shared application code lives in `src/`.
- Canonical content lives in `src/content`.
- Public placeholder assets live in `public/assets`.
- Prisma schema and migrations live in `prisma/`.

## Architecture Rules

- Treat Server Components as the default.
- Add `"use client"` only for browser APIs, state, effects, form interactions, clipboard, media modals, local storage, or client-side fetch polling.
- Root locale selection belongs in `proxy.ts`; avoid redirect loops.
- Route params are promises in this Next version. Await `params` in pages/layouts.
- Do not query arbitrary server IPs from the browser. `/api/server-status` must use internal config only.
- Do not expose secrets in client code. Only `NEXT_PUBLIC_*` variables may reach the browser.
- Keep payments behind adapters in `src/lib/payments`.
- Validate all user input with Zod on the server.

## Commands

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm format`
- `pnpm db:migrate`
- `pnpm db:seed`
- `pnpm db:studio`

If `pnpm prisma` does not resolve on Windows PowerShell, use `.\node_modules\.bin\prisma.cmd`.

## Style

- TypeScript strict mode is required.
- Avoid `any`; prefer explicit types or `unknown` with narrowing.
- Use shadcn-style primitives from `src/components/ui`.
- Use Lucide icons for common actions.
- Keep components focused and names descriptive.
- Preserve accessibility: semantic landmarks, visible focus, labels, keyboard navigation, `aria-live` for status and payments.
- Keep visual effects subtle and honor `prefers-reduced-motion`.

## Content Rules

- Do not duplicate separate Spanish and English data arrays.
- Store localizable fields as `{ es, en }`.
- Keep server IP, donation tiers, patch entries, team members, and social links configurable.
- Do not invent personal bios, social URLs, release dates, or launch dates.
- TODO comments are reserved for owner-confirmed uncertainties only.

## Verification Expectations

Before handing off substantial changes, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run `pnpm test:e2e` when browsers are installed and a local server can run.
