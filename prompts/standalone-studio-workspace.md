# Standalone Studio Workspace

## Goal

Extract the embedded Sanity Studio from the Next.js web workspace and create it as a fully standalone `studio/` workspace in the monorepo root. After this, `studio/` boots independently with `npx sanity dev` and the web workspace has no Studio code inside it.

## Current state

- `app/studio/[[...tool]]/page.tsx` — embedded Studio mounted in Next.js via `NextStudio`
- `sanity.config.ts` — Studio config at web root, referenced by that page
- `sanity.cli.ts` — Sanity CLI config at web root
- `sanity/schemaTypes/` — schema types used by Studio only
- `sanity/structure.ts` — structure config used by Studio only
- `sanity/env.ts` — shared env helpers used by both Studio (`sanity.config.ts`) and web lib (`sanity/lib/*`)
- `sanity/lib/` — web-only Sanity helpers (client, image, live, queries)
- `package.json` has `@sanity/vision` and `styled-components` which are Studio deps, not web deps

## Decisions

- Keep the web workspace at the repo root (no moving of `app/`, `components/`, etc.).
- Create `studio/` as the standalone Studio workspace.
- Studio gets its own `package.json`, `tsconfig.json`, `sanity.config.ts`, `sanity.cli.ts`, and all schema files.
- Web keeps `sanity/lib/` and `sanity/env.ts` for its data fetching — no change to those files needed.
- Remove `app/studio/` and the `NextStudio` page entirely.
- Strip `@sanity/vision` and `styled-components` from the web `package.json`; they belong in Studio.
- Remove `'use client'` directive from the new `studio/sanity.config.ts` (it was there only for NextStudio).
- Remove `basePath: '/studio'` from the new `studio/sanity.config.ts` (not meaningful in standalone mode).
- `studio/sanity.config.ts` imports schema from `./schemaTypes` and structure from `./structure`.
- `studio/sanity.cli.ts` reads the same `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` env vars; it will need a `.env` or `.env.local` in `studio/` with those values, so add `.env.example`.
- Both workspaces can share the same Sanity project and dataset.

## Files to create

| Path | Description |
|---|---|
| `studio/package.json` | Studio workspace: `sanity`, `@sanity/vision`, `styled-components`, `typescript` |
| `studio/tsconfig.json` | Standard Sanity Studio tsconfig |
| `studio/sanity.config.ts` | Moved from root, stripped of `'use client'` and `basePath` |
| `studio/sanity.cli.ts` | Moved from root (unchanged logic) |
| `studio/schemaTypes/` | Moved from `sanity/schemaTypes/` |
| `studio/structure.ts` | Moved from `sanity/structure.ts` |
| `studio/.env.example` | Template: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` |

## Files to delete

| Path | Reason |
|---|---|
| `app/studio/[[...tool]]/page.tsx` | Embedded Studio page |
| `app/studio/` (directory) | No longer needed |
| `sanity.config.ts` (root) | Moved to `studio/` |
| `sanity.cli.ts` (root) | Moved to `studio/` |
| `sanity/schemaTypes/` | Moved to `studio/schemaTypes/` |
| `sanity/structure.ts` | Moved to `studio/structure.ts` |

## Files to modify

| Path | Change |
|---|---|
| `package.json` | Remove `@sanity/vision`, `styled-components` |
| `sanity/env.ts` | No change needed — web still uses it |
| `sanity/lib/client.ts` | No change needed — still imports `../env` |

## Security considerations

- No secrets change. The `SANITY_API_READ_TOKEN` stays web-only server-side.
- Studio uses only the public project ID and dataset env vars.
- No Studio code or token ever touches the Next.js request path after this.

## Acceptance criteria

- `studio/` directory exists with its own `package.json` and can be installed independently.
- Running `npx sanity dev` from `studio/` starts the Studio on its own port.
- `app/studio/` no longer exists.
- Web workspace has no `sanity.config.ts`, no `sanity.cli.ts`, no `sanity/schemaTypes/`, no `sanity/structure.ts`.
- Web typecheck passes: `tsc --noEmit` from repo root.
- Web lint passes: `eslint` from repo root.
- `sanity/lib/` files are untouched and still resolve their imports correctly.

## Checks to run

```
# From web workspace (repo root)
npx tsc --noEmit
npx eslint

# Manual smoke test for studio
cd studio && npm install && npx sanity dev
```

## Manual test steps

1. After implementation, run `tsc --noEmit` from repo root — expect zero errors.
2. Run `eslint` from repo root — expect zero errors.
3. Navigate to `studio/`, run `npm install`, then `npx sanity dev`.
4. Studio opens on its own port — confirm schema loads and content types appear.
5. Verify `app/studio/` no longer exists and the route `/studio` returns 404 in the Next.js dev server.
