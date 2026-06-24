# PLAN

## Objective

Build a production-ready multilingual Next.js application for **Hideout Gaming - The Home of Zombie Hideout** under the identity **Zombie Hideout: Quarantine Network**.

## Implementation Phases

1. Establish project foundations: scripts, docs, environment example, TypeScript aliases, lint/format/test tooling.
2. Create localized App Router structure with `/es`, `/en`, localized secondary routes, safe root locale redirect, metadata, sitemap, robots, manifest, 404, and error UI.
3. Centralize content and configuration in typed files: server data, history, team, patch notes, media, social links, donation tiers.
4. Build the UI system and landing experience: shadcn-style base components, responsive header, hero, server cards, Zombie Mod section, team, media preview, donations, contact, footer.
5. Implement dynamic features: `/api/server-status`, copy/connect buttons, media modal, lazy video embeds, audio preference, donation form, contact form, cookie preferences.
6. Add payment architecture: provider interface, mock provider, Mercado Pago, PayPal, Binance Pay adapters, webhook/idempotency helpers, server-side validation.
7. Add Prisma schema, migration SQL, and seed.
8. Add Vitest and Playwright coverage for validation, status fallback, i18n, idempotency, navigation, forms, and mobile responsiveness.
9. Run verification: lint, typecheck, tests, build, and E2E where the local environment permits.

## Key Decisions

- Use App Router routes under `app/[locale]` and `proxy.ts` for locale selection, matching the installed Next 16 docs.
- Keep major content in canonical typed arrays/objects with localized copy fields, avoiding separate Spanish and English data sources.
- Use CSS motion instead of a heavy animation dependency, with `prefers-reduced-motion` support.
- Use professional SVG placeholders until the owner provides licensed media assets.
- Keep payment providers disabled unless their required environment variables are present; local development uses an explicit mock provider.
- Query server status only for the configured server to avoid SSRF.

## External Content Reference

- `https://sites.google.com/view/zombiehideout/`
- `https://sites.google.com/view/zombiehideout/spanish/actualizaciones`
- `https://sites.google.com/view/zombiehideout/english/updates`
- Spanish/English media and music subpages from the same site.
