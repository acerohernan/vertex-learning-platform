# Sanity Content Model & Server Data Layer

## Goal
Define the full Sanity schema for Vertex (course, module, lesson, instructor, category), wire a server-only read client, expose `sanityFetch` with a private read token, write GROQ queries for the main data surfaces, and add `SanityLive` to the root layout.

---

## Skills read
- `sanity-best-practices` → `references/schema.md`, `references/nextjs.md`

## Code inspected
- `sanity/schemaTypes/index.ts` — empty types array, ready to populate
- `sanity/lib/client.ts` — `createClient` with `useCdn: true`, no token
- `sanity/lib/live.ts` — `defineLive` without `serverToken`, so private dataset reads will 401
- `sanity/env.ts` — reads `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
- `sanity.config.ts` — embedded Studio at `/studio`, uses `schema` from `sanity/schemaTypes/index.ts`
- `sanity/structure.ts` — default `S.documentTypeListItems()`, will update for a custom sidebar
- `app/layout.tsx` — `ClerkProvider` present, `SanityLive` not yet rendered
- `.env.local` — project id `qa2b382s`, dataset `production`; no `SANITY_API_READ_TOKEN` yet

---

## Decisions & assumptions
1. **Keep the embedded Studio** — the user has not asked to migrate to standalone; that is a separate task.
2. **Private dataset** — AGENTS.md requires a read token on the server. I will add `SANITY_API_READ_TOKEN` to `.env.local.example` and wire it into `defineLive` / the server client. Until the user adds the real token, the app falls back to the CDN (unauthenticated) which works for a public dataset.
3. **Module as embedded object** — AGENTS.md explicitly says a module is not its own document.
4. **Video document schema deferred** — video ingestion is a separate task. I will not add the `video` document type here.
5. **Progress document deferred** — progress tracking is a separate task.
6. **No TypeGen run** — TypeGen requires the Sanity CLI and a deployed Studio. I will add the config file so the user can run it; generated types are not committed here.
7. **Icons** — imported from `@sanity/icons/<Name>` subpath exports (v5 requirement).
8. **Portable Text notes** — standard `block` array with bold, italic, link mark decorators.
9. **Resources** — inline object in lesson (not a separate document); each has `type` (string enum), `title`, `description`, `url`.
10. **Learning outcomes** — inline object in course (not a separate document); each has `icon` (string), `title`, `description`.

---

## Security considerations
- `SANITY_API_READ_TOKEN` is kept server-only. It never appears in `NEXT_PUBLIC_*` variables.
- The browser-facing `defineLive` token is intentionally omitted (the `browserToken` field); live updates use the anonymous CDN token which is safe for public data.
- Dataset is kept private; server routes are the only place the token is used.

---

## Files to create

### Schema types
```
sanity/schemaTypes/
  category.ts
  instructor.ts
  lesson.ts
  courseModule.ts      ← object (embedded), not document
  course.ts
  index.ts             ← updated to register all types
```

### Queries
```
sanity/lib/queries.ts   ← GROQ queries for catalog, course, lesson, instructor
```

### Client updates
```
sanity/lib/client.ts    ← add token for server-only use
sanity/lib/live.ts      ← add serverToken from env
```

### Studio structure
```
sanity/structure.ts     ← custom sidebar: Courses, Instructors, Categories
```

### Layout
```
app/layout.tsx          ← add <SanityLive />
```

### Env example
```
.env.example            ← canonical env var list including SANITY_API_READ_TOKEN
```

---

## Requirements

### Schema — category
- Fields: `title` (string, required), `slug` (slug, required, source: title), `description` (text)
- Icon: `TagIcon`

### Schema — instructor
- Fields: `name` (string, required), `slug` (slug, required, source: name), `photo` (image with hotspot), `expertise` (string), `bio` (text)
- Icon: `UserIcon`

### Schema — courseModule (object, not document)
- Fields: `title` (string, required), `summary` (text), `lessons` (array of references to `lesson`)
- No icon (objects don't appear in sidebar)

### Schema — lesson
- Fields: `title` (string, required), `slug` (slug, required, source: title), `videoUrl` (url), `poster` (image with hotspot), `duration` (number, in seconds), `freePreview` (boolean, default false), `studentCount` (number), `notes` (array of block — Portable Text), `keyPoints` (array of object: `{ text: string }`), `proTip` (text), `resources` (array of object: `{ type: string enum[article|video|repo|tool], title, description, url }`)
- Icon: `PlayIcon`

### Schema — course
- Fields: `title` (string, required), `slug` (slug, required, source: title), `summary` (text), `coverImage` (image with hotspot), `level` (string enum: beginner | intermediate | advanced), `price` (number), `popular` (boolean, default false), `studentCount` (number), `learningOutcomes` (array of object: `{ icon: string, title: string, description: string }`), `instructor` (reference to `instructor`, required), `category` (reference to `category`, required), `modules` (array of `courseModule` objects)
- Icon: `BookIcon`

### GROQ queries
Write these as exported `const` strings using `defineQuery` from `groq`:
- `CATALOG_QUERY` — all courses, ordered by `_createdAt desc`, projecting: `_id, title, slug.current as slug, summary, level, price, popular, studentCount, coverImage, instructor->{name, photo}, category->{title, slug.current as slug}`, module count, total lesson count
- `COURSE_QUERY` — single course by slug, full detail including modules with their lesson references expanded: `lessons[]->{_id, title, slug.current as slug, duration, freePreview, poster, studentCount}`
- `LESSON_QUERY` — single lesson by slug, full fields including notes and resources; also derives parent course via reverse reference: `*[_type=="course" && references(^._id)][0]{title, slug, modules[]{title, lessons[]->{_id}}}` (inline)
- `INSTRUCTOR_QUERY` — single instructor by slug with full fields
- `INSTRUCTOR_COURSES_QUERY` — all courses for an instructor, same projection as CATALOG_QUERY

### Client — server token
- Create a server-only export `serverClient` in `sanity/lib/client.ts` that sets `token: process.env.SANITY_API_READ_TOKEN` and `useCdn: false`
- Keep the existing CDN `client` for public reads

### defineLive — server token
- Add `serverToken: process.env.SANITY_API_READ_TOKEN` to `defineLive`; omit `browserToken` (private data not needed in the browser)

### Studio structure
- Three top-level list items: "Courses" (course document list), "Instructors" (instructor document list), "Categories" (category document list)
- Lessons remain accessible through courses, but also add a "Lessons" flat list item at the bottom for direct access

### Layout
- Import `SanityLive` from `@/sanity/lib/live` and render it as a sibling of `{children}` inside `<body>`

---

## Acceptance criteria
- [ ] `npx tsc --noEmit` passes from the project root
- [ ] `npx eslint` passes with no errors
- [ ] Studio loads at `/studio` with Courses, Instructors, Categories in the sidebar
- [ ] Creating a category, instructor, and course (with one module and one lesson) works in Studio without errors
- [ ] `sanityFetch` works in a server component (no 401 error when `SANITY_API_READ_TOKEN` is set)

---

## Checks to run
```bash
# from project root
npx tsc --noEmit
npx eslint
```

---

## Manual test steps
1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000/studio`
3. Confirm sidebar shows Courses, Instructors, Categories
4. Create a Category (e.g., "Programming")
5. Create an Instructor (name, photo, bio)
6. Create a Lesson (title, slug, videoUrl, freePreview: true)
7. Create a Course, attach the instructor and category, add a module, attach the lesson to the module — save should succeed without validation errors
8. In Vision plugin, run: `*[_type=="course"][0]{title, "moduleCount": count(modules)}` — should return the course you created
