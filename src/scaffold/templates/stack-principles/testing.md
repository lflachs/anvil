## Testing Principles

### What to test

- **Test behavior, not implementation.** Test what the function does, not how it does it. If you refactor the internals and the tests break, the tests are too coupled.
- **Test the contract.** Given this input, expect this output. Given this action, expect this side effect. Don't test private methods.
- **Focus on the critical path.** Test the happy path, then the most likely failure modes. 100% coverage is not a goal — meaningful coverage is.

### Unit tests

- **Pure functions first.** Business logic, validators, transformers — these are the easiest and most valuable to test.
- **Mock at boundaries only.** Mock external APIs, databases, file system. Don't mock internal modules — if you're mocking everything, the test proves nothing.
- **One assertion per behavior.** A test should verify one behavior. Multiple assertions are fine if they verify the same behavior from different angles.
- **Name tests as sentences.** `it("returns error when email is invalid")` not `it("test1")`.

### Component tests (React)

- **Test what the user sees.** Use Testing Library. Query by role, label, text — not by CSS class or test ID. If you can't find the element the way a user would, the UI has an accessibility problem.
- **User events over fire events.** Use `userEvent` not `fireEvent`. It simulates real user interaction including focus, keyboard events, and pointer events.
- **Don't test implementation details.** Don't test state values, hook internals, or component instances. Test: does the right thing appear on screen? Does the right thing happen when I click?
- **Snapshot tests: use sparingly.** They catch unintended changes but also break on every intentional change. Use them for stable, atomic components (icons, badges), not for pages.

### Integration / E2E tests

- **Test critical user flows end-to-end.** Login, core feature, payment — the flows that matter most.
- **Real database for integration tests.** Use a test database, not mocks. Mocks can drift from reality.
- **Playwright for E2E.** Run against a real (local) server. Test the critical paths only — E2E tests are slow and brittle.
- **Stable selectors.** Use `data-testid` for E2E selectors when semantic selectors aren't sufficient. Don't rely on CSS classes or DOM structure.

### Test organization

- **Co-locate tests with code.** `auth.ts` and `auth.test.ts` in the same directory. Don't put all tests in a separate `__tests__` folder tree.
- **Factories over fixtures.** Use factory functions to create test data. Factories are composable and explicit. JSON fixtures are rigid and opaque.
- **Clean up after yourself.** Tests should not depend on other tests. Each test sets up its own state and tears it down.

### What not to test

- Don't test framework behavior (does `useState` work? Yes, React tested it).
- Don't test third-party libraries (does Zod validate? Yes, Zod tested it).
- Don't test types — the compiler already does.
- Don't test CSS (does the button turn blue? Use visual regression testing if this matters, not unit tests).
