---
main_config: '{project-root}/.anvil/config.yaml'
output_file: '{project-root}/.anvil/output/architecture.md'
template: '{project-root}/.anvil/templates/architecture.md'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
prerequisites:
  - '{project-root}/.anvil/output/prd.md'
  - '{project-root}/.anvil/output/design.md'
---

# Architecture Workflow

**Goal:** Make all technical decisions explicit, documented, and approved by the user.
**Agent:** Read persona from `{project-root}/.anvil/agents/architect.md`.
**Prerequisites:** Approved PRD and design document. If missing, tell the user which to complete first.

## WORKFLOW ARCHITECTURE

- **Sequential steps**: Complete each step before moving to the next
- **Tracking**: Update tracker after each step, log every technical decision
- **Gate**: User must explicitly approve the architecture document

## INITIALIZATION

1. Load config from {main_config}
2. Load agent persona from `.anvil/agents/architect.md`
3. Read `.anvil/output/prd.md` and `.anvil/output/design.md`
4. Create tracker with steps: Review inputs, Stack selection, Data model, API design, Edge cases, Generate principles, Documentation & references, Recommend MCP servers, Approval gate

## STEP 1: Review inputs

Read PRD and design doc. Identify:
- What data needs to be stored?
- What operations does the user perform?
- What integrations are needed?
- What are the performance expectations?

Summarize your understanding to the user.

✅ Update tracker.

## STEP 2: Stack selection

Present options for each layer with trade-offs:

- **Frontend**: framework options and why each fits/doesn't
- **Backend**: framework or BaaS options
- **Database**: SQL vs NoSQL, managed vs self-hosted
- **Hosting**: deployment targets
- **Auth**: strategy options

For each: state the trade-off in one line. Let the user decide.

Respect `project_mode`:
- **MVP**: Lean toward managed services.
- **Production**: Consider scaling, redundancy, monitoring.

Log each decision in tracker.

✅ Update tracker.

## STEP 3: Data model

Design the database schema:
- Tables/collections and fields
- Relationships (1:1, 1:N, N:N)
- Indexes, constraints, validations

Present in table format. User must approve.

✅ Update tracker.

## STEP 4: API design

Define endpoints or service interface:
- Routes, methods, request/response shapes
- Auth/authz approach
- Error response format
- Pagination strategy

Present to user. Approve before continuing.

✅ Update tracker.

## STEP 5: Edge cases and decisions

Surface architectural edge cases:
- File uploads, real-time features, background jobs
- Caching, rate limiting, email/notifications
- **Accessibility infrastructure**: linting tools (eslint-plugin-jsx-a11y, axe-core), automated a11y testing in CI, semantic HTML component patterns

For each: "Do we need this? If yes, here are the options."

Log each decision.

✅ Update tracker.

## STEP 6: Generate principles file

If `.anvil/principles.md` doesn't exist, create it:

1. Start with the base template at `.anvil/templates/principles.md`
2. **Append the relevant stack-specific principles** from `.anvil/templates/stack-principles/`:
   - React project → append `react.md`
   - TypeScript project → append `typescript.md`
   - Node.js/Express/API backend → append `node-api.md`
   - Uses a database → append `database.md`
   - Has a UI → append `css-styling.md`
   - Always append `testing.md`

   Multiple files can apply (e.g., a Next.js app gets: `react.md` + `typescript.md` + `node-api.md` + `database.md` + `css-styling.md` + `testing.md`).

3. Fill in the `{{quality_tools}}` section based on the chosen stack:
   - **JS/TS**: ESLint + Prettier + eslint-plugin-jsx-a11y + Husky + lint-staged
   - **Python**: Ruff + Black + pre-commit hooks
   - **Go**: golangci-lint + gofumpt
   - Configure recommended rules, not custom rule sets.

✅ Update tracker.

## STEP 7: Documentation & references

For each technology in the chosen stack, ask the user:

> "Do you want me to set up documentation references for the stack? I can:"
> 1. **Check for LLM-friendly docs** — some frameworks have dedicated docs for AI assistants (e.g., `llms.txt`, AI-optimized docs pages). I'll search for those.
> 2. **Add doc URLs to the architecture doc** — so I always know where to look things up.
> 3. **Download key references locally** — save critical docs as files in `.anvil/references/` for offline/fast access.

If the user says yes, for each technology:

1. **Search for LLM-specific documentation** (search for "[technology] llms.txt 2026" or "[technology] AI documentation"):
   - Many frameworks now publish `llms.txt` or `llms-full.txt` at their doc root
   - Some have dedicated AI/LLM doc pages optimized for context windows
   - Next.js, Vercel, Supabase, Prisma, Tailwind, Shadcn all have LLM-friendly docs

2. **Collect official doc URLs** for the stack:
   - Framework docs (Next.js, React, Express, etc.)
   - Database docs (Prisma, Drizzle, Supabase, etc.)
   - UI library docs (Tailwind, Shadcn, Radix, etc.)
   - Any third-party service docs

3. **Save references** — create `.anvil/references.md`:
   ```markdown
   # Documentation References

   ## Framework
   - Next.js: https://nextjs.org/docs
   - Next.js LLM docs: https://nextjs.org/llms.txt

   ## Database
   - Prisma: https://www.prisma.io/docs

   ## UI
   - Tailwind: https://tailwindcss.com/docs
   - Shadcn: https://ui.shadcn.com/docs

   ## Local references
   - .anvil/references/[file] — [description]
   ```

4. If the user wants local copies, create `.anvil/references/` and download key pages.

Add the references section to the architecture document.

✅ Update tracker.

## STEP 8: Recommend and install MCP servers

Based on the chosen stack, **search the web for relevant MCP servers** (search for "MCP server [technology] 2026" to find current options). Then recommend the most useful ones.

Common recommendations by stack (verify these are still current — search first):

| Stack | MCP Server | Purpose |
|-------|-----------|---------|
| Any web project | `@playwright/mcp` (Microsoft) | E2E testing, visual regression |
| Code quality | `sonarqube-mcp-server` (SonarSource) | Code quality gates, security scanning |
| PostgreSQL | `@modelcontextprotocol/server-postgres` | Direct database access |
| Supabase | `supabase-mcp` | Database, auth, storage management |
| Prisma | `prisma-postgres` MCP | Schema migrations, queries |
| GitHub | `@modelcontextprotocol/server-github` | PR management, issues |
| Figma | Framelink Figma MCP | Design-to-code bridge |
| MongoDB | Search for current MongoDB MCP | Database access |
| Redis | Search for current Redis MCP | Cache management |

**Always search for the latest versions and alternatives — MCP ecosystem moves fast.**

Present the recommendations to the user:

> "Based on your stack, these MCP servers could help: [list with one-line descriptions]. Want me to add any of these to your Claude Code config?"

If the user accepts, provide the configuration to add to `.claude/settings.json` or `~/.claude/settings.json`.

Save the chosen MCP servers to the architecture document under a "Development tools" section.

✅ Update tracker.

## STEP 9: Approval gate

Present the complete architecture document. Ask:

> "This is the technical blueprint. Review each section. Say 'approved' to lock it in, or tell me what to change."

🚫 **Do not proceed until the user explicitly approves.**

When approved:
1. Save to {output_file}
2. Save principles to `.anvil/principles.md`
3. Archive tracker to `.anvil/sessions/[YYYY-MM-DD]-architecture.md`
4. Reset tracker to idle
5. Update `.anvil/CONTEXT.md` with stack choices and decisions
