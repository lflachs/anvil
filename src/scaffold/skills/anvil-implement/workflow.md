---
main_config: '{project-root}/.anvil/config.yaml'
stories_folder: '{project-root}/.anvil/output/stories'
sprint_file: '{project-root}/.anvil/output/sprint-status.md'
architecture: '{project-root}/.anvil/output/architecture.md'
principles: '{project-root}/.anvil/principles.md'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
---

# Implement Workflow

**Goal:** Implement a single user story, producing clean, tested, documented code.
**Agent:** Read persona from `{project-root}/.anvil/agents/developer.md`.
**Prerequisites:** Approved stories in {stories_folder}.

## WORKFLOW ARCHITECTURE

- **Sequential steps**: Plan before coding, test after coding
- **Tracking**: Log every file change and technical decision
- **Gate**: Tests must pass, then review workflow runs

## INITIALIZATION

1. Load config from {main_config}
2. Load agent persona from `.anvil/agents/developer.md`
3. Read {architecture} and {principles}
4. Read {sprint_file} to see what's next
5. If user specifies a story, read that file. Otherwise suggest next by priority.
6. Create tracker with: story ID, steps (Pick story, Plan, Implement, Test, Report, Update tracking), Files changed section

## STEP 1: Pick a story

Read the story file completely. Confirm with the user which story to implement.

✅ Update tracker.

## STEP 2: Plan the implementation

Before writing any code, state:
- What files will be created or modified
- What approach you'll take
- Any decisions to make

Ask: "Does this plan make sense, or should I adjust?"

For quick, reversible details — just do it. For architectural choices not in the architecture doc — ask first.

✅ Update tracker.

## STEP 3: Implement

Write code following:
- The architecture document's decisions
- The coding principles in {principles}
- The story's acceptance criteria

For each technical decision: state what and why in one line.
Never silently install packages — announce what and why.

Log every file created/modified in the tracker's Files changed section.

✅ Update tracker.

## STEP 4: Test

Run relevant tests. If tests don't exist:
- Write tests verifying each acceptance criterion
- Run them

If tests fail, fix the code. Don't skip tests.

✅ Update tracker.

## STEP 5: Post-implementation report

Provide:

```
## What changed
- file:lines — what and why

## What to review
- file:lines — decisions needing human judgment

## What to test
- Scenario 1: steps to verify
- Scenario 2: steps to verify

## Dependencies added
- package@version — reason (or "none")
```

✅ Update tracker.

## Commit discipline (throughout implementation)

**Commit early and often.** Don't wait until the end of a story to commit. After each meaningful unit of work (a function, a component, a migration, a test), offer to commit.

After each unit of work:

1. Show the user what changed: `git diff --stat` and the key files.
2. Ask: "Want to review this and commit, or keep going?"
3. If the user wants to commit:
   - Show the full diff for review
   - Wait for the user to say they're ready
   - Propose a commit message using **Conventional Commits** format: `type(scope): description`
   - One line. Lowercase. No period. No co-authored-by.
   - Examples: `feat(auth): add login endpoint`, `test(cart): add quantity validation tests`
   - Let the user adjust the message if they want, then commit
4. If the user says "keep going" — continue, but offer again at the next natural boundary.

**Never batch an entire story into one commit.** A story with 5 pieces of work should have ~5 commits.

## STEP 6: Update tracking

1. Update story file status to `review`
2. Update {sprint_file}
3. Archive tracker to `.anvil/sessions/[YYYY-MM-DD]-implement-[story-id].md`
4. Reset tracker to idle
5. If there are any uncommitted changes, offer one final commit

Suggest: "Story implemented. Run /anvil-review to check it against the criteria."
