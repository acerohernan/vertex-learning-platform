# Implement the Vertex home page

## Goal

Build the public Vertex home page at `/` from `design/vertex-home.png`: the production site header, the "Search your learning in plain English" hero with the large search entry point, the "All Courses" three-card row, the weekly-updates note, and the soft orange bar-chart footer art.

Replace the current `/` → `/design-system` redirect. This is a presentational/marketing page with no Sanity, Clerk, PostHog, progress, or search API work. The search form is wired to the future `/search` route, and the course links are wired to the future catalog routes.

## Skills and documentation read

- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
- No Sanity, Clerk, PostHog, or agent skill applies to this static page.

## Code and design inspected

- `design/vertex-home.png` at 1024×1536, plus crops of the header, badge, hero, search field, card footer, weekly note, and footer art.
- `app/page.tsx` (currently redirects to `/design-system`)
- `app/layout.tsx` (Inter + Playfair Display, design-system metadata)
- `app/globals.css` (primary/neutral/canvas/surface/line tokens, type scale, radii, shadows)
- `app/design-system/page.tsx` (existing composition and component usage)
- `components/brand/logo.tsx`
- `components/navigation/site-nav.tsx` (design-system specimen, not the production header)
- `components/cards/course-card.tsx`
- `components/cards/lesson-card.tsx`
- `components/ui/button.tsx`
- `components/ui/field.tsx` (`SearchField`)
- `components/ui/badge.tsx`
- `lib/cn.ts`
- `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` (Next 16.4.6, React 19.3, Tailwind 4.3.3, `cacheComponents` and `partialPrefetching` enabled, `lucide-react` available)

## Decisions and assumptions

1. **The home image is the visual source of truth.** The page uses the warm paper canvas, the fine diagonal hatch in the outer gutters, side borders around the central shell, Playfair Display for display/card headings, Inter for all UI text, and the reference spacing.
2. **Accent color.** The home mock uses a muted terracotta accent (`#E46D48` sampled from the button/logo), while the design-system reference documents primary orange `#F97316`. I will add a small `accent` token scale to `globals.css` for the home/product marketing surfaces and keep the design-system primary palette and gallery unchanged. This matches the supplied home image exactly without changing the existing system page. If you prefer the documented `#F97316` orange instead, say so before approval.
3. **Production header, not the design-system specimen.** `components/navigation/site-nav.tsx` is a tiny gallery sample linked to `/design-system`. I will add `components/navigation/site-header.tsx` as the real header (logo, Courses, My Learning, bell, avatar) and reuse `VertexLogo`. `SiteNav` and the design-system gallery stay as they are.
4. **Logo tone.** `VertexMark` currently hardcodes `text-primary-500`. I will make the mark inherit `currentColor` and let `VertexLogo` set the default primary or an `accent` tone, so the home logo is terracotta while the design-system logo stays orange.
5. **Course card variant.** `CourseCard` currently uses a compact side-by-side layout for the design-system gallery. I will add a `variant="featured"` presentation (large mark on top, Playfair title, larger description, divider before the footer) while preserving the compact default exactly.
6. **Course marks.** Use inline SVGs:
   - Next.js: black rounded square with the white N mark, drawn to match the reference.
   - Docker: Simple Icons Docker whale path (CC0) in `#2496ED`.
   - TypeScript: Simple Icons TypeScript square path (CC0) in `#3178C6`.
7. **Avatar asset.** The reference shows a real portrait. I will add a small local JPG at `public/avatar-learner.jpg` (Unsplash photo `photo-1494790108377-be9c29b29330`, downloaded at 160×160) and render it with `next/image`; no remote image config or runtime network call. It is a placeholder for the future Clerk user image.
8. **Routes.** `Explore Courses` and `View all courses` link to `/courses`; course cards link to `/courses/<slug>`; `My Learning` links to `/my-learning`; the hero search submits a GET form to `/search?q=...`. Those pages are not built yet, so the destinations will 404 until their tasks land. This is intentional incremental wiring; no placeholder pages will be added.
9. **Search shortcut.** The `⌘ K` hint is functional: a small client component focuses the search input on Cmd/Ctrl+K. The form itself is a native GET form, so no search API or client data fetch is introduced.
10. **Responsive behavior.** The desktop composition is kept exact. Below `sm`, the header puts the logo/actions on the first row and the two nav links on a second row, the hero type scales down, the search field shrinks, and the course cards become one column. The footer art scales down but remains clipped at the bottom.
11. **Accent usage.** `accent-500` is used for fills (logo, button, star, bar art); `accent-600` for small text links/badge text to keep them legible; `accent-700` for hover. This is a minor accessibility adjustment over the flat sampled color and is visually imperceptible at the reference size.

## Files expected to change or add

- `app/page.tsx` — replace the redirect with the home page composition and page metadata.
- `app/layout.tsx` — generic Vertex metadata with a title template.
- `app/design-system/page.tsx` — add a page `metadata` title so the gallery is not titled "Vertex" after the root metadata change.
- `app/globals.css` — add the `accent` token scale and the `paper-hatch` background utility.
- `components/navigation/site-header.tsx` — new production header with responsive two-row mobile layout.
- `components/search/hero-search.tsx` — new client search form with Cmd/Ctrl+K focus.
- `components/cards/course-card.tsx` — add the `featured` variant; keep the compact default unchanged.
- `components/cards/course-marks.tsx` — Next.js, Docker, and TypeScript inline SVG marks.
- `components/home/footer-art.tsx` — decorative orange bar-chart strip and weekly note (or the note can live in the page; keep the art in this component).
- `components/ui/button.tsx` — add the `accent` variant and `xl` size (56px) for the hero CTA.
- `components/ui/field.tsx` — add `size`, `name`, `defaultValue`, and `id` support to `SearchField`; default `size="md"` preserves the gallery.
- `components/brand/logo.tsx` — make `VertexMark` inherit color and add `tone="primary" | "accent"` to `VertexLogo`.
- `public/avatar-learner.jpg` — local placeholder portrait.
- `prompts/home-page.md` — this prompt.

## Requirements

### Global shell

- Use the existing warm canvas (`--color-canvas`), surface (`--color-surface`), and line (`--color-line`) tokens.
- The outer page has a fine diagonal hatch (`/` orientation, ~1px line every 7px, very pale warm tone) visible only in the left/right gutters.
- The central shell is a full-height, opaque column, `max-w-[1200px]`, with `border-x border-line` on `sm` and up. Mobile has no gutters or side borders.
- The shell is `min-h-screen`; content flows header → hero → courses → weekly note → footer art.
- No horizontal overflow at 360px.

### Header

- Height ~98px at desktop, ~72–88px at mobile; bottom border.
- Left: Vertex logo (accent mark + black wordmark) and nav links `Courses`, `My Learning` in 15px medium neutral-900, with ~40px gaps.
- Right: outline bell (22px, accessible label `Notifications`), then a 56px circular avatar (44px mobile) cropped from the local portrait, with an accessible label `Account`.
- Mobile: logo and actions on the first row; nav links on a second row separated by a top border. Desktop: one row, nav after the logo, actions pushed right.
- The logo links to `/`; the nav links and action buttons have visible `focus-visible` rings. The bell and avatar are presentational buttons with no menu yet.

### Hero

- Bottom border separating it from the course section.
- Centered, max-width ~760px.
- Pill: `INTELLIGENT LEARNING`, ~11px semibold uppercase with wide tracking, terracotta text, pale terracotta fill, thin warm border, ~10px radius, generous horizontal padding.
- H1: `Search your learning` / `in plain English.` in Playfair Display 600, ~64px / 1.06 at desktop, ~52px at tablet, ~40px at mobile. On `lg`, each sentence is its own line; below `lg`, it wraps naturally.
- Subtitle: two lines at desktop, 20px / 1.6, neutral-500, max-width ~500px, exact copy: “Vertex understands what you want to learn and finds the exact lessons across all your courses.”
- CTA: terracotta `Explore Courses` button with a right arrow, ~56px high, 10px radius, white text. Use the reusable `Button` with the new `accent` variant and `xl` size. Link to `/courses`.
- Search field: centered, max-width ~744px, two-line height at desktop (~76px), 12px radius, near-white surface, thin warm border, faint warm shadow. Leading 26px magnifier, 19px placeholder “Ask anything about your learning…”, and a right-side `⌘ K` keycap (~52×44, 10px radius, thin border). On mobile the field is ~64px high with 16px text and still shows the keycap.
- The search is a `<form role="search" action="/search" method="get">` with `name="q"`. Cmd/Ctrl+K focuses the input. Submitting with a value navigates to `/search?q=...`; no client fetch, no API call.

### All Courses

- Section with ~48px horizontal padding and ~60px vertical padding at desktop.
- Header row: `All Courses` in Playfair Display ~26px semibold on the left; `View all courses` with a right arrow on the right, 14–15px medium terracotta. Link to `/courses`.
- Three cards in a 3-column grid at `lg`, 2 columns at `sm`, 1 column on mobile; 24px gap.
- Card: near-white surface, 1px warm border, 12px radius, 24px padding, equal height. Large 84×84 mark at top; Playfair title ~22px semibold; 15px / 1.55 neutral-500 description; a full-width divider pushed to the bottom; footer meta row with 12px neutral-700 text and 15–16px icons.
- Cards (exact copy):
  1. Next.js for Production — “Build scalable, high-performance web applications with Next.js.” — Intermediate · 18h 24m · 12 modules.
  2. Docker Essentials — “Containerize applications and streamline your development workflow.” — Beginner · 10h 12m · 8 modules.
  3. TypeScript Deep Dive — “Go beyond the basics and write safer, more expressive code.” — Intermediate · 14h 36m · 10 modules.
- Footer icons: bar-chart for level, clock for duration, book for modules.
- Each card links to `/courses/<slug>` (`nextjs-for-production`, `docker-essentials`, `typescript-deep-dive`) with a visible focus ring around the whole card. No hover restyling beyond a subtle border/focus treatment.

### Weekly note and footer art

- Centered row: thin horizontal rules on both sides, an orange outline star, and “New courses and lessons added every week.” in ~17px neutral-700, with ~16px gaps.
- Below it, a decorative, `aria-hidden` bar-chart strip spanning the shell width and clipped at the page bottom. Two clusters of 8 soft orange bars with rounded tops, varying heights, a vertical gradient from saturated terracotta at the bottom to transparent at the top, and a slight blur. The strip is ~220px high at desktop and ~140px at mobile. It must not introduce horizontal scroll.
- No text is rendered inside the art.

### Accessibility and quality

- One `h1`; section headings are `h2`; card titles are `h3`.
- Semantic `header`, `nav aria-label="Primary"`, `main`, `section`, `footer`.
- Decorative icons/SVGs are `aria-hidden`; icon-only buttons have labels.
- All links/buttons have visible `focus-visible` rings using the accent palette.
- Prefer server components. Only `HeroSearch` needs `"use client"` for the keyboard shortcut.
- Use `next/link` for internal links; use `next/image` with the static local avatar import.
- No `dangerouslySetInnerHTML`, no secrets, no client tokens, no runtime network requests.
- Keep existing component defaults (compact course card, md search field, primary button, primary logo) byte-for-byte in behavior.

## Security considerations

- No auth, database, server actions, API routes, env vars, or content fetching are introduced.
- The avatar is a local static asset; no remote image hosts and no `images.remotePatterns` changes.
- The search form only performs a GET navigation to `/search`; it does not send data to any third party.
- No user input is rendered as HTML.
- The bell and avatar are presentational; they do not write or fetch anything.
- No PostHog, Clerk, Sanity, or write tokens are touched.

## Acceptance criteria

1. `/` renders the header, hero, search entry point, three-course row, weekly note, and footer art; it no longer redirects to `/design-system`.
2. At a 1024px-wide viewport the page closely matches `design/vertex-home.png` in hierarchy, type, spacing, warm palette, hatch/borders, card composition, and footer art.
3. At 390px and 360px the header stacks into two rows, the hero scales, the cards stack, the search field remains usable, and there is no unintended horizontal scrolling.
4. Cmd/Ctrl+K focuses the hero search; submitting a query navigates to `/search?q=<query>`.
5. The header/footer links point to `/`, `/courses`, `/courses/<slug>`, and `/my-learning`. The future routes may 404 until built, but the hrefs are correct.
6. All interactive elements have visible keyboard focus; icon-only controls have accessible names; decorative art is hidden from assistive tech.
7. `npm run typecheck`, `npm run lint`, and `npm run build` pass. The dev server starts with no hydration or console errors.
8. `/design-system` still renders all existing sections with no visual regression; only its page title changes.

## Checks to run

From the repo root:

```powershell
npm run typecheck
npm run lint
npm run build
npm run dev
```

Then inspect `/` at 1024px and 390px, and `/design-system` for regressions.

## Manual test steps

1. Run `npm run dev` and open `http://localhost:3000`; confirm it shows the home page, not the design-system gallery.
2. Compare the header against the reference: terracotta logo mark, black wordmark, Courses, My Learning, bell, circular portrait, bottom border.
3. Compare the hero: pill, two-line Playfair headline, two-line subtitle, terracotta Explore Courses button, large search field with `⌘ K` keycap.
4. Press Cmd+K (macOS) or Ctrl+K (Windows); confirm the search input receives focus. Type `data fetching` and press Enter; confirm the URL becomes `/search?q=data%20fetching` (the search page may 404 until built).
5. Confirm the three course cards show the correct marks, titles, descriptions, and meta rows, with dividers and footers aligned across cards.
6. Hover/click Explore Courses, View all courses, each card, and My Learning; confirm the hrefs are `/courses`, `/courses/<slug>`, and `/my-learning`.
7. Confirm the weekly note is centered with rules on both sides and the soft orange bar art is visible at the bottom, clipped cleanly.
8. Resize to 390px: confirm the nav links move to a second row, the headline and subtitle scale, the search field stays usable, the cards stack, and no horizontal scrollbar appears.
9. Tab through the page: confirm the logo, nav links, bell, avatar, CTA, search, View all courses, and cards show visible focus rings.
10. Check the browser console and Next.js terminal for hydration, image, font, or build warnings.
11. Open `/design-system` and confirm the existing gallery is unchanged (apart from its title).
12. Run the checks above and report the real output.

## Out of scope

- Sanity schemas/content, real course data, catalog page, course detail page, lesson page, instructor pages, My Learning page.
- Clerk authentication, progress tracking, PostHog analytics, notifications panel, account menu.
- The `/search` results page and the Sanity Context MCP search API.
- Video ingestion, transcripts, chapters, and playback.
- Dark mode, mobile drawer/menu animation, and any new backend routes.
