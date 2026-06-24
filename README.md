# Zombie Hideout

Modern Next.js application for **Hideout Gaming - The Home of Zombie Hideout**, a Counter-Strike: Source Zombie Mod community site.

## Requirements

- Node.js 20+
- pnpm 10+
- MySQL 8+ for persistent donations/contact messages. Laragon's MySQL works locally.
- Steam installed locally if you want the `steam://connect/168.100.162.59:27031` CTA to open the game

## Install

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open `http://localhost:3000`. The root route redirects safely to `/es` or `/en`.

## Scripts

- `pnpm dev`: local Next.js server
- `pnpm build`: production build
- `pnpm start`: run production build
- `pnpm lint`: ESLint
- `pnpm typecheck`: strict TypeScript check
- `pnpm test`: Vitest unit tests
- `pnpm test:e2e`: Playwright E2E tests
- `pnpm format`: Prettier
- `pnpm db:create`: create the local MySQL database if needed
- `pnpm db:migrate`: Prisma migrations
- `pnpm db:seed`: development seed
- `pnpm db:studio`: Prisma Studio

## Environment

Copy `.env.example` to `.env`. The site renders locally with live server-status lookup plus a safe offline fallback and mock payments, so no private credentials are required for development previews.

Important variables:

- `DATABASE_URL`: MySQL connection string. Local Laragon default is `mysql://root:root@localhost:3306/zombie_hideout`.
- `NEXT_PUBLIC_SITE_URL`: canonical URL used for metadata.
- `SERVER_STATUS_MODE`: `mock`, `live`, or `auto`.
- `PAYMENTS_MOCK_ENABLED`: enables the safe local payment simulator.
- `MERCADOPAGO_ACCESS_TOKEN`, `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `BINANCE_PAY_API_KEY`, `BINANCE_PAY_SECRET_KEY`: enable real payment adapters.
- `CONTACT_EMAIL_TO` and `EMAIL_PROVIDER_API_KEY`: enable real contact delivery.

## Database

The Prisma schema defines:

- `Donation`
- `PaymentEvent`
- `ContactMessage`

Run:

```bash
pnpm db:create
pnpm db:migrate
pnpm db:seed
```

No payment benefit should be credited until a webhook or provider status check confirms the payment server-side.

## Content Management

Canonical content lives in `src/content` and configuration lives in `src/config`.

- Server IP and Steam commands: `src/content/site.ts`
- Team: `src/content/team.ts`
- Patch notes: `src/content/updates.ts`
- Media center: `src/content/media.ts`
- VIP/Admin rank tiers and purchase conditions: `src/content/donations.ts`
- Social links: `src/config/social-links.ts`

Social links with an empty `url` are hidden automatically.

## Payments

Payment providers use an adapter pattern in `src/lib/payments`.

- Mercado Pago: Checkout Pro preference creation, return URLs, external references, webhook verification scaffold.
- PayPal: order creation/capture scaffold, sandbox/live URLs, server-side amount validation.
- Binance Pay: API v3 order scaffold, signed requests, webhook verification scaffold. It remains disabled without merchant credentials.
- Mock: local simulator for development and tests.

The purchase UI is prepared for VIP, VIP Plus, Admin, and Admin Plus. Prices are intentionally left configurable until the server owner confirms final values and permissions.

Never expose provider secrets in client components. Never trust client-side amounts.

## Server Status

`/api/server-status` queries only the internally configured Counter-Strike: Source server:

```text
168.100.162.59:27031
```

The browser cannot submit arbitrary hosts, preventing SSRF. The default `SERVER_STATUS_MODE=auto` attempts a live query and shows the configured server as offline when it cannot be reached. Use `SERVER_STATUS_MODE=mock` only when you deliberately want the configured offline fallback in development or tests.

## Assets

The original Google Sites assets were not hotlinked. Current files in `public/assets` are professional placeholders. Owner-provided files should replace:

- `public/assets/media-placeholder.svg`
- `public/assets/avatar-placeholder.svg`
- `public/assets/og-image.svg`

Document asset source and license in `public/assets/README.md` when replacing them.

## Confirm With Owner

- Whether the community history is founded in 2005, relaunched in 2024, or only founded in 2024.
- Whether the patch-note dates `17/04/2026` and `14/06/2026` are one corrected date or two different publications.
- Real social URLs.
- Authorized media, music, screenshots, and videos.
- Payment provider merchant credentials and webhook URLs.

## Sources Used

Content was reorganized from the public Google Sites reference at `https://sites.google.com/view/zombiehideout/` and its Spanish/English subpages.
