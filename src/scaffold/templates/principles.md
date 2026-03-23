# Coding Principles

**Project:** {{project_name}}
**Mode:** {{project_mode}}
**Stack:** {{stack}}

---

## Core principles

### Single Responsibility (SRP)
One function does one thing. One file owns one concept. If you can't describe what it does in one sentence, split it.

### Minimal side effects
Functions should be predictable. Given the same input, return the same output. Isolate side effects (database calls, API requests, file writes) at the edges — don't bury them inside business logic. A function that calculates and also saves to the database is doing two jobs.

### Don't Repeat Yourself (DRY)
But don't abstract prematurely. Three instances of duplication before extracting. A little repetition is better than the wrong abstraction.

### Keep It Simple (KISS)
The simplest solution that works. If a junior developer can't read it, it's too clever.

### You Aren't Gonna Need It (YAGNI)
Don't build for hypothetical futures. Build what the story asks for. Refactor when reality demands it.

### Separation of concerns
Keep logic, presentation, and data access in separate layers. Examples:
- **React**: extract business logic into custom hooks when the logic is reused or the component gets crowded. Don't extract a hook for one component with 10 lines of state — that's moving code, not separating concerns.
- **API routes**: validation, business logic, and data access should be distinct — not a single function that does all three.
- **General rule**: if you can describe a piece of code without mentioning the UI/framework/transport layer, it belongs in its own module.

### Reusability (with restraint)
- Build reusable components and utilities **when the same pattern appears in 2+ places**.
- Don't pre-build a generic component "in case we need it later." Build the specific thing. Generalize when reality demands it.
- When you do extract something reusable: clear API, clear name, no hidden assumptions about where it's used.
- Custom hooks, shared components, and utility functions should be self-contained — no implicit dependencies on parent state or context they weren't designed for.

## Code readability

- Code is for humans first, machines second.
- **Readable code over comments.** If you need a comment to explain what the code does, rewrite the code. Names, structure, and flow should make intent obvious.
- Only comment **why** — and only when the why isn't obvious from context (e.g., a workaround for a known bug, a non-obvious business rule).
- Never add comments that restate the code. `// increment counter` above `counter++` is noise.
- Name things for what they do, not how they work.
- Prefer explicit over implicit. Magic is for stage shows.
- Small functions with clear names beat long functions with inline comments.

## Documentation (JS/TS)

- **Always use JSDoc** on exported functions, classes, methods, and type definitions.
- Multi-line format with `@param`, `@returns`, `@throws`, `@example` where useful.
- JSDoc is not a comment — it's API documentation. It powers autocomplete, hover tooltips, and type inference. This is about developer experience, not decoration.
- Keep descriptions concise. One sentence for what the function does. One line per param.

```typescript
/**
 * Calculate the total price including applicable discounts.
 *
 * @param items - Line items in the cart
 * @param discountCode - Optional promotional discount code
 * @returns The final price in cents
 * @throws {InvalidDiscountError} If the discount code is expired or invalid
 */
```

- Internal/private helper functions: JSDoc optional. If the name is clear enough, skip it.
- This applies to **JavaScript and TypeScript only**. Other languages follow their own doc conventions.

## Error handling

- Handle errors at the boundary where you can do something about them.
- Don't catch errors just to log and rethrow.
- User-facing errors: helpful message. Developer-facing errors: stack trace.
- In **MVP mode**: handle the critical path. Let unexpected errors bubble.
- In **Production mode**: handle all known failure modes. Monitor unknown ones.

## Testing

- Test behavior, not implementation.
- Each acceptance criterion should map to at least one test.
- In **MVP mode**: test the happy path and critical edge cases.
- In **Production mode**: comprehensive coverage including edge cases, error paths, and integration tests.

## Dependencies

- **Favor battle-tested libraries over reinventing.** If a well-maintained library solves your problem (usehooks-ts, date-fns, zod, tanstack-query, etc.), use it. Don't rewrite debounce, intersection observer, or local storage hooks from scratch.
- **But don't add a dependency for something you can write in 20 lines.** A simple `formatCurrency` function doesn't need a library. Use judgment — if the problem has edge cases you'll discover over time (dates, validation, i18n), use a library. If it's straightforward, write it.
- **Only install trustworthy packages.** Before adding a dependency, check:
  - **Maintenance**: last publish date, open issues ratio, active maintainers. If the last commit was 2+ years ago, look for an alternative.
  - **Adoption**: weekly downloads, stars, used by known projects. Low adoption = higher risk.
  - **Size**: check bundle size on bundlephobia. Don't add a 200kb library for one function.
  - **Security**: no known vulnerabilities (check npm audit). No excessive transitive dependencies.
  - **License**: MIT, Apache 2.0, BSD are safe. Check before installing.
- When you do add one: state what and why in the commit message.
- Keep dependencies up to date. Pin major versions.
- **Audit regularly.** Run `npm audit` periodically. Don't let vulnerabilities accumulate.

## Types (TS)

- **Extract types into dedicated files.** Don't inline complex types in function signatures or scatter them across implementation files.
- Co-locate types with their feature: `features/auth/auth.types.ts`, not a global `types.ts` dumping ground.
- Shared types used across features go in a `shared/types/` directory.
- Name types for what they represent, not how they're used: `User` not `UserProps`, `CartItem` not `CartItemType` (unless disambiguating is genuinely needed).
- Prefer `interface` for object shapes, `type` for unions, intersections, and computed types.
- Keep types close to their usage — if only one file uses it, define it there.

## File structure

- Organize by feature, not by type (unless the framework dictates otherwise).
- Keep files under 300 lines. If it's longer, it's doing too much.
- A reader should understand the project by looking at the folder tree. Names should be obvious: `auth/`, `cart/`, `payments/` — not `utils/`, `helpers/`, `misc/`.
- Index files (barrel exports) only at module boundaries.

## Git practices

- **Atomic commits.** One logical change per commit. If you can split it, split it.
- **Conventional Commits.** Format: `type(scope): description` — one line, lowercase, no period.
  - `feat(auth): add JWT token refresh`
  - `fix(cart): prevent negative quantities`
  - `refactor(api): extract validation middleware`
  - `test(auth): add login edge case coverage`
  - `chore(deps): update prisma to v6`
- **No co-authored-by trailers.** Ever. The commit is the commit.
- **No multi-line commit messages** unless genuinely needed for a breaking change (`BREAKING CHANGE:` footer).
- Branch per story.

## Performance & scalability

Think about performance from the start — not as premature optimization, but as avoiding obviously bad patterns.

- **Database**: add indexes on columns you query by. Use pagination, not unbounded queries. Avoid N+1 queries.
- **Frontend**: lazy-load routes and heavy components. Don't load everything upfront. Virtualize long lists.
- **API**: keep payloads lean — return only what the client needs. Use pagination and cursor-based navigation for large datasets.
- **Assets**: optimize images, use modern formats (WebP/AVIF), implement proper caching headers.
- **State**: don't store derived data. Compute it. Avoid duplicating state across components.
- **Rendering**: avoid unnecessary re-renders. Memoize expensive computations. Use React.memo/useMemo/useCallback only when there's a measured or obvious perf issue — not everywhere by default.
- In **MVP mode**: avoid the obvious traps (unbounded queries, loading everything at once, no indexes). Don't optimize what isn't slow.
- In **Production mode**: set performance budgets. Monitor bundle size. Profile database queries. Set up alerting on response time degradation.

## Accessibility

Accessibility is not optional. It's a baseline quality standard, not a feature.

- **Semantic HTML first.** Use `button` not `div onClick`. Use `nav`, `main`, `section`, `article`. ARIA is a last resort when no semantic element exists.
- **Keyboard navigation.** Every interactive element must be reachable and operable via keyboard. Logical tab order. Visible focus indicators — never remove `outline` without a replacement.
- **Screen readers.** Meaningful alt text on images (or `alt=""` for decorative). Labels on form inputs. ARIA live regions for dynamic content updates.
- **Color and contrast.** WCAG 2.1 AA minimum: 4.5:1 for normal text, 3:1 for large text. Never convey information through color alone.
- **Focus management.** When content changes (modals open, navigation occurs, items are deleted), move focus to the appropriate element. Don't trap focus unless it's a modal.
- **Motion.** Respect `prefers-reduced-motion`. No auto-playing animations that can't be paused.
- **Touch targets.** Minimum 44x44px on mobile.
- **Testing.** Use eslint-plugin-jsx-a11y (or equivalent), axe-core for automated checks. Test with keyboard. Test with a screen reader at least once per major feature.
- In **MVP mode**: semantic HTML, keyboard nav, contrast, alt text. The basics that cost nothing to do right from the start.
- In **Production mode**: full WCAG 2.1 AA. Automated a11y tests in CI. Screen reader testing.

## Quality tools

_Configured based on detected stack. See setup instructions below._

{{quality_tools}}
