---
main_config: '{project-root}/.anvil/config.yaml'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
---

# Init Codebase Workflow

**Goal:** Deeply analyze an existing codebase and configure Anvil to match its stack, patterns, conventions, and current state. After this, Anvil understands your project — not just generically, but specifically.
**Prerequisite:** `anvil init` must have been run already (`.anvil/` exists).

## WORKFLOW ARCHITECTURE

- **Sequential steps**: each step builds on the previous
- **Tracking**: update tracker after each step
- **Gate**: user approves the generated context before it's finalized

## INITIALIZATION

1. Load config from {main_config}
2. Create tracker with steps: Detect stack, Analyze structure, Read conventions, Map architecture, Detect gaps, Generate project context, Generate principles, Approval gate

## STEP 1: Detect stack

Scan the project root for configuration files and determine the stack:

**Check for:**
- `package.json` → Node.js/JS/TS project. Read dependencies and devDependencies.
- `tsconfig.json` → TypeScript. Read compiler options.
- `next.config.*` → Next.js. Check app router vs pages router.
- `vite.config.*` → Vite.
- `remix.config.*` → Remix.
- `requirements.txt` / `pyproject.toml` / `Pipfile` → Python.
- `go.mod` → Go.
- `Cargo.toml` → Rust.
- `Gemfile` → Ruby.
- `docker-compose.yml` / `Dockerfile` → containerized.
- `.env` / `.env.example` → environment variables in use.
- `prisma/schema.prisma` → Prisma ORM. Read the schema.
- `drizzle.config.*` → Drizzle ORM.
- `supabase/` → Supabase project.
- `tailwind.config.*` → Tailwind CSS. Read theme config.
- `components.json` → Shadcn/UI. Read configuration.

**Detect testing:**
- `jest.config.*` / `vitest.config.*` / `playwright.config.*` / `cypress.config.*`
- `__tests__/` / `*.test.*` / `*.spec.*` patterns

**Detect quality tools:**
- `.eslintrc.*` / `eslint.config.*` → ESLint
- `.prettierrc*` → Prettier
- `.husky/` → Git hooks
- `lint-staged` in package.json
- `sonar-project.properties` → SonarQube

Present findings: "Here's what I found: [stack summary]. Does this look right?"

✅ Update tracker.

## STEP 2: Analyze structure

Map the project's file organization:

- List top-level directories and their purpose
- Identify the pattern: feature-based, type-based, or hybrid?
- Find key entry points (pages, routes, API handlers)
- Count files by type (components, hooks, utils, tests, etc.)
- Identify shared/common directories
- Note any unusual or non-standard organization

Present: "The project is organized like this: [structure summary]. [N] components, [N] API routes, [N] test files."

✅ Update tracker.

## STEP 3: Read existing conventions

Read the actual code to understand conventions in use:

**Naming:**
- Component naming (PascalCase? kebab-case files?)
- Function naming (camelCase? verb-first?)
- File naming patterns
- Export patterns (default vs named)

**Code patterns:**
- How are API calls handled? (fetch, axios, tanstack-query, server actions?)
- How is state managed? (useState, zustand, jotai, context?)
- How are forms handled? (react-hook-form, formik, native?)
- How is validation done? (zod, yup, joi?)
- How are errors handled? (error boundaries, try/catch patterns, toast notifications?)
- How is auth implemented?

**Styling:**
- Tailwind theme customization (read tailwind.config)
- Design tokens / CSS variables in use
- Component library patterns (Shadcn customizations, etc.)
- Are arbitrary values used? (flag as a gap if yes)

Read 5-10 representative files across different areas to understand the patterns.

✅ Update tracker.

## STEP 4: Map architecture

Based on the analysis, document the existing architecture:

- **Stack**: frontend, backend, database, hosting (as detected)
- **Data model**: if Prisma/Drizzle schema exists, read and summarize it
- **API surface**: list the main endpoints/routes
- **Auth strategy**: what's in place
- **Key integrations**: third-party services, external APIs
- **Environment setup**: what env vars are needed

Present to the user for confirmation: "Here's my understanding of the architecture. Anything wrong or missing?"

✅ Update tracker.

## STEP 5: Detect gaps

Based on what's present and what's missing, identify gaps:

| Area | Check | Status |
|------|-------|--------|
| TypeScript | strict mode enabled? | ✓ or gap |
| Linting | ESLint configured? | ✓ or gap |
| Formatting | Prettier configured? | ✓ or gap |
| Git hooks | Husky + lint-staged? | ✓ or gap |
| Testing | test framework configured? | ✓ or gap |
| Testing | test coverage adequate? | ✓ or gap |
| Accessibility | a11y linting (jsx-a11y)? | ✓ or gap |
| Types | clean type organization? | ✓ or gap |
| Tailwind | arbitrary values in use? | ✓ or gap |
| Tailwind | semantic theme tokens? | ✓ or gap |
| Error handling | consistent pattern? | ✓ or gap |
| API validation | input validation present? | ✓ or gap |
| Documentation | JSDoc on exports? | ✓ or gap |

Present gaps to the user. For each gap, ask: "Want to address this now, add it to the backlog, or skip it?"

✅ Update tracker.

## STEP 6: Generate project context

Write `.anvil/CONTEXT.md` with real project information:

```markdown
# [project_name]

**Mode:** [mode]
**Stack:** [detected stack summary]
**Status:** Existing codebase — Anvil initialized

## Architecture

[Summary from Step 4]

## Conventions

[Detected patterns from Step 3 — naming, state management, styling, etc.]

## Gaps identified

[From Step 5 — what needs attention]

## Key files

- Entry point: [path]
- Database schema: [path]
- API routes: [path]
- Tailwind config: [path]
- Main components: [path]

## Decisions

[Any decisions made during this workflow]
```

✅ Update tracker.

## STEP 7: Generate principles

Create `.anvil/principles.md` tailored to this project:

1. Start with the base principles template
2. Append the relevant stack-specific principles based on detected stack
3. **Override generic principles with project-specific ones** where the project already has established conventions:
   - If the project uses named exports → document that as the convention
   - If the project organizes by type instead of feature → document that (don't fight established patterns)
   - If the project has a specific error handling pattern → document it
4. Add a "Project-specific conventions" section at the top that captures the unique patterns found in Step 3

Present to the user: "Here are the principles based on what I found. Review them — anything to adjust?"

✅ Update tracker.

## STEP 8: Pre-fill architecture document (optional)

Offer: "Want me to generate an architecture document based on what I found? It'll save time if you run /anvil-arch later."

If yes, write `.anvil/output/architecture.md` with the detected architecture from Step 4.

✅ Update tracker.

## STEP 9: Approval gate

Present the full generated context:
- CONTEXT.md
- principles.md
- architecture.md (if generated)
- Gap list with decisions

> "Everything's set up. Anvil now understands this codebase. Review the context and principles — say 'approved' to lock it in, or tell me what to change."

🚫 **Do not finalize until the user explicitly approves.**

When approved:
1. Save all generated files
2. Archive tracker to `.anvil/sessions/[YYYY-MM-DD]-init-codebase.md`
3. Reset tracker to idle
4. Suggest next steps based on gaps:
   - If no tests → "Consider running /anvil-stories to create testing stories"
   - If no linting → "Want me to set up ESLint and Prettier?"
   - If PRD doesn't exist → "Want to document the product with /anvil-prd?"

## TONE

- "Let me look around the workshop and see what we're working with."
- "Interesting setup. Here's what I see."
- "You've got some rough edges here — [gap]. Want to address it now or later?"
- "Your conventions are clear. I'll make sure Anvil follows them."
