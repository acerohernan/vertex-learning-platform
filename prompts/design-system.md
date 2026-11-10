# Implement the Vertex Design System

## Goal

Build the Vertex design system as a production-ready token layer, reusable UI primitives, and a polished single-page reference gallery that reproduces `design/vertex-designsystem.png` section by section.

The gallery lives at `/design-system`. Until the home page is built, `/` redirects to `/design-system` so the project has a meaningful first screen.

This is a foundation task. Do not build Sanity content, authentication, search, video, progress, or analytics. Build only the visual language and the components the later screens will reuse.

## Skills and documentation read

- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- No Sanity, Clerk, or agent skills apply to this presentational task.

## Code and design inspected

- `package.json` (Next 16.4.6, React 19.3, Tailwind 4.3.3, `@tailwindcss/turbopack`)
- `app/layout.tsx` (starter Geist fonts and metadata)
- `app/page.tsx` (create-next-app starter screen)
- `app/globals.css` (starter color variables and dark mode)
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`
- `design/vertex-designsystem.png` at 1024x1536, inspected as a whole and in section crops

## Decisions and assumptions

1. **Design source of truth is the image.** Reproduce its warm paper canvas, near-white cards, orange accent, Playfair Display headings, Inter UI text, compact labels, and generous card spacing. The palette labels in the image are authoritative for tokens:
   - Primary 500 `#F97316`, 400 `#FB923C`, 300 `#FDBA74`, 200 `#FED7AA`, 100 `#FFEDD5` (render the swatch label/color exactly as shown; use `#FFEDD5` as the token, correcting the low-resolution label read).
   - Neutral 900 `#0F172A`, 700 `#334155`, 500 `#64748B`, 300 `#CBD5E1`, 200 `#E2E8F0`, 100 `#F1F5F9`, 50 `#FAFAFC`, white `#FFFFFF`.
   - Canvas/surface tokens are warm to match the rendered reference: canvas around `#FAF7F3`, surface around `#FFFDFB`, card outline around `#EAE4DE`.
2. **Fonts** are Playfair Display for display type and Inter for all UI/body type, loaded through `next/font/google` in the root layout. Expose them as `--font-display` and `--font-sans`.
3. **Tokens** live in Tailwind v4 `@theme` variables in `app/globals.css`: primary/neutral colors, type scale, radii, and the four shadow values from the image. The type scale is Display 1 48/56 bold, Display 2 36/44 bold, Heading 1 28/36 semibold, Heading 2 22/30 semibold, Heading 3 18/26 medium, Body Large 16/24, Body 14/20, Small 12/16. Spacing already follows Tailwind’s 4px base unit, which is the documented base unit.
4. **Reusable primitives, not page-only markup.** Build real components for the elements the later pages will use: logo, buttons, search field, select, badges, status indicators, progress bar, course/lesson/resource cards, breadcrumbs, pagination, and navigation. The gallery page is built from those components.
5. **Icons:** add `lucide-react` for the outline and filled icon set and for UI affordances (search, external link, chevrons, file, status). Use a consistent 20–24px box, 1.8–2px outline stroke, rounded caps, and fill heavy closed shapes for the “Filled Style” row.
6. **No image assets are needed.** The logo is recreated as an inline SVG V mark plus a wordmark. The card thumbnails are icon/graphic blocks, matching the reference rather than adding unrelated imagery.
7. **Static showcase only.** Demo buttons and links are presentational. They may use `type="button"` or inert `#` anchors, but must not trigger mutations, navigation to missing routes, or data fetches. The reusable components accept `href`/`onClick` so later pages can wire behavior.
8. **Layout target:** desktop content max-width around 1200px, with the gallery at 1024px width matching the reference proportions. Cards use 16px gaps, two-column and three-column grids where shown, and collapse sensibly below `lg`/`md`. Nothing should horizontally overflow at 360px except the intentional type-scale table scroller.

## Files expected to change or add

- `app/globals.css` — reset, tokens, base type, focus styles, shadow/radius/type variables.
- `app/layout.tsx` — Playfair Display + Inter via `next/font/google`, Vertex metadata, light canvas body.
- `app/page.tsx` — server redirect to `/design-system`.
- `app/design-system/page.tsx` — the reference gallery, sections 01–14.
- `components/brand/logo.tsx` — inline Vertex mark + wordmark.
- `components/ui/button.tsx` — primary/secondary/tertiary/text variants, states, icon support, `buttonVariants`.
- `components/ui/field.tsx` — `SearchField`, `SelectField`, shared input styles.
- `components/ui/badge.tsx` — video/lesson/popular badges.
- `components/ui/status-indicator.tsx` — in progress/completed/now playing/locked.
- `components/ui/progress.tsx` — progress bar and inline percentage label.
- `components/design-system/section.tsx` — shared section card, numbered heading, caption, spec-list helpers.
- `components/cards/course-card.tsx`, `lesson-card.tsx`, `resource-card.tsx` — reusable card components (lesson card supports video and lesson presentations).
- `components/navigation/site-nav.tsx`, `components/navigation/breadcrumbs.tsx`, `components/navigation/pagination.tsx` — nav specimens.
- `lib/cn.ts` — tiny class-name merge helper.
- `package.json` / `package-lock.json` — add `lucide-react`; add a `typecheck` script (`tsc --noEmit`).
- This prompt file.

## Requirements

### Global shell

- Light-only design. Remove the starter dark-mode rules and Arial body font.
- Body uses canvas color, Inter, antialiasing, `text-neutral-900`.
- Page has a warm paper background and a centered gallery with 16px vertical gaps between cards.
- Section cards: near-white surface, 1px warm border, 16px radius, very subtle shadow. Inner padding 20–32px depending on breakpoint.
- Numbered headings: orange two-digit number, gap, uppercase tracked label in near-black. Use a shared component.
- All headings hierarchy is semantic: one `h1`, section labels as `h2`, card captions as `h3` where appropriate.

### 01 Colors

- Left hero: Vertex logo (36px mark + 22–24px wordmark), “Design System” in Playfair at Display 1 scale, 16px gray description, and “VERSION 1.0 · MAY 2025” in 10–11px uppercase tracked type. Left panel is visually separated by a vertical border at desktop and stacks above colors on mobile.
- Right panel: Primary and Neutral groups, 5 swatches and 8 swatches respectively, each with a rounded color block, token name, and hex. Responsive to 3/4 columns on small screens.

### 02 Typography and 03 Type Scale

- Two-card row, roughly 40/60.
- Typography row shows large “Ag” specimens for Playfair Display and Inter, font names, and trait lines with orange dot separators.
- Type Scale is a five-column table: Style, Font, Size / Line Height, Weight, Use. Include all eight rows exactly as the reference. Keep the row styles compact and let the table scroll horizontally on narrow screens.

### 04 Spacing and 05 Radius & Shadows

- Two-card row, 50/50.
- Spacing: “Base unit: 4px” and a 9-step row from 4 to 64 with px labels and rem captions.
- Radius: six specimens for 4px (xs), 8px (sm), 12px (md), 16px (lg), 24px (xl), Full (circle).
- Shadows: four cards labeled Sm, Md, Lg, Xl with the exact shadow values from the image; apply the matching shadow to each card.

### 06 Icons, 07 Buttons, and 08 Inputs

- Three-card row with widths approximately 1.2 / 1.8 / 1.
- Icons: outline and filled rows of bell, search, play, document, bookmark, bar chart, clock, user, chevron; plus the icon specs bullet list.
- Buttons: four columns (Primary, Secondary, Tertiary, Text) and three rows (Default, Hover, Disabled). Primary orange, secondary orange outline, tertiary neutral outline with external-link icon, text orange with play icon. Demonstrating Hover must be static via a forced state, not only a real pointer hover. Disabled uses the pale orange/neutral treatments shown. Include button specs.
- Inputs: search field with leading magnifier and ⌘K hint, select showing “Most Relevant” with a chevron, and field specs. Inputs are 44px high, 12px radius, neutral border, clear focus treatment.

### 09 Badges, 10 Status, and 11 Progress

- Three-card row. Badges show the labels Video, Lesson, Popular above their pills; VIDEO/POPULAR are orange-tinted, LESSON is indigo-tinted.
- Status indicators: In Progress (open orange ring), Completed (green check), Now Playing (filled orange play), Locked (neutral lock), each with a short label.
- Progress bar: 6px rounded track, 35% orange fill, and “35% complete” label aligned right.

### 12 Cards

- One full-width card containing four labelled columns: Course Card, Lesson Card (Video), Lesson Card (Lesson), Resource Card.
- Course card: black Next.js-style mark, title, two-line description, footer with level, duration, and module count icons.
- Video lesson card: VIDEO badge, title, description, footer “Lesson 5.1 · 12:45” and orange “Watch from 12:45” action with play icon.
- Lesson card: LESSON badge, title, description, footer “Module 5” and orange “View lesson” action with external-link icon.
- Resource card: file icon, title, description, footer “PDF · 1.2 MB” with external-link icon.
- Use the reusable card components; keep text compact and clamp descriptions where the reference does.

### 13 Navigation and 14 Principles

- One full-width card. Top row: left brand + Courses (orange active) and My Learning links under the “13 NAVIGATION” heading; center breadcrumb group (All Courses > Next.js for Production > Data Fetching & Caching); right pagination (prev, 1 active, 2, 3, ellipsis, 8, next).
- Horizontal divider, then “14 PRINCIPLES” and four principles: Clarity First, Consistency, Focus & Calm, Accessible, each with an outline icon, title, and two-line description.
- Collapse nav groups and principles into stacked layouts on mobile.

### Interaction, accessibility, and quality

- Every interactive control has visible `focus-visible` styling and a sensible keyboard order.
- Use semantic lists for icon specs, field specs, and principles where appropriate.
- Decorative icons are `aria-hidden`; icon-only pagination buttons get accessible labels.
- Use `next/link` for internal links and plain anchors for external links with `rel="noreferrer"` if any.
- No `dangerouslySetInnerHTML`, no client-side data, no secrets, no token exposure, no backend calls.
- Prefer server components; only add `"use client"` if a component truly needs state. The showcase itself can be static.
- Keep class names and component APIs consistent with the existing TypeScript/ESLint setup.

## Security considerations

- No auth, database, env vars, or network calls are introduced.
- No private keys or tokens are used or exposed.
- No user input is rendered as HTML.
- Demo links must stay inside the app or be explicitly inert; do not navigate to unknown external destinations.
- No third-party scripts or analytics.

## Acceptance criteria

1. `/design-system` shows all 14 numbered sections from the reference with the correct order and groupings.
2. At a 1024px-wide desktop viewport, the page closely matches the reference in hierarchy, spacing, type, colors, radii, shadows, states, and card composition.
3. The page remains usable from 360px to wide desktop without unintended horizontal overflow.
4. Playfair Display and Inter render through `next/font`; fallbacks do not flash a different layout.
5. Buttons show default, forced-hover, and disabled states; badges, statuses, progress, cards, nav, breadcrumbs, and pagination all use reusable components.
6. `/` redirects to `/design-system`.
7. No starter create-next-app content remains.
8. Typecheck, lint, and production build pass; dev server starts cleanly with no hydration or console errors.

## Checks to run

From the repo root:

```powershell
npm run typecheck
npm run lint
npm run build
npm run dev
```

Then inspect `/design-system` at 1024px and 390px widths.

## Manual test steps

1. Run `npm run dev` and open `http://localhost:3000`; confirm it lands on `/design-system`.
2. At desktop width, compare sections 01–14 against `design/vertex-designsystem.png`:
   - hero/logo, color swatches and labels;
   - Playfair/Inter specimens and all eight type-scale rows;
   - spacing, radius, and shadow specimens;
   - both icon rows, all 12 button demos, search and select;
   - all three badges, four status indicators, and the 35% bar;
   - all four cards;
   - navigation, breadcrumbs, pagination, and four principles.
3. Hover real buttons and links to confirm hover states; tab through controls to confirm visible focus rings.
4. Resize to 390px and confirm cards stack, the type-scale table scrolls inside its card, and no element causes the page to scroll sideways.
5. Check the browser console and Next.js terminal for hydration, font, or build warnings.

## Out of scope

- Content pages, authentication, Sanity, search, analytics, video ingestion, and progress persistence.
- Any new API routes or server actions.
- Dark mode (the reference is light-only).
