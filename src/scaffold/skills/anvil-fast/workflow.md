---
main_config: '{project-root}/.anvil/config.yaml'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
---

# Fast Mode

**Goal:** Go from idea to structured implementation quickly. Skip the ceremony, keep the control.
**When to use:** Small features, quick prototypes, bug fixes, or when you already know what you want and just need it broken down and built right.

## How it differs from full mode

| Full mode | Fast mode |
|-----------|-----------|
| Separate PRD workflow | Quick requirements in 5 questions |
| Full design workflow | Skip or one-line design notes |
| Full architecture workflow | Skip (use existing) or quick decisions |
| Detailed story breakdown | Lightweight task list with acceptance criteria |
| Full review workflow | Quick checklist review |

**What fast mode keeps:**
- Acceptance criteria on every task (you still know when it's done)
- User approval before implementation starts
- Commit discipline (atomic, conventional)
- Post-implementation report (what changed, what to review)
- Principles compliance (code quality doesn't drop)

## INITIALIZATION

1. Load config from {main_config}
2. Read `.anvil/CONTEXT.md` and `.anvil/principles.md` if they exist
3. Read `.anvil/output/architecture.md` if it exists (use existing architecture)
4. Create tracker

## STEP 1: Quick requirements (5 questions max)

Ask the user to describe what they want. Then ask only what's unclear:

1. "What are you building?" (one sentence)
2. "Who's it for?" (skip if obvious)
3. "What's the happy path?" (the main flow)
4. "Anything that could go wrong that we should handle?"
5. "MVP or polished?"

Don't ask questions the user already answered. If they gave a clear description, you might only need 1-2 clarifying questions.

Write a **quick spec** — not a full PRD, just:

```markdown
## Quick spec: [title]

**What:** [one sentence]
**Happy path:** [the flow]
**Edge cases:** [handle / defer / skip]
**Quality bar:** [mvp / polished]
```

Save to `.anvil/output/quick-spec-[name].md`.

Ask: "Does this capture it? If yes, I'll break it into tasks."

✅ Update tracker.

## STEP 2: Task breakdown

Break the spec into small, ordered tasks. Not full user stories — just a task list with acceptance criteria:

```markdown
## Tasks

### 1. [Task name]
- [ ] [Acceptance criterion]
- [ ] [Acceptance criterion]
Files: [likely files]

### 2. [Task name]
- [ ] [Acceptance criterion]
Files: [likely files]

### 3. [Task name]
...
```

Rules:
- Each task is independently completable and testable
- Each task has at least one acceptance criterion
- Order by dependency (what must be built first)
- Keep it short — 3-8 tasks typical

Present the task list. Ask: "Good to go, or want to adjust?"

🚫 **Wait for user approval before implementing.**

Save to `.anvil/output/quick-spec-[name].md` (append to the spec).

✅ Update tracker.

## STEP 3: Implement (task by task)

For each task:

1. State what you're about to do (one line)
2. Implement it
3. After each task, show what changed:
   ```
   ✓ Task 1: [name]
     Changed: file:lines — what
     Review: file:lines — why to look here
   ```
4. Offer to commit (conventional commits, atomic)
5. Move to next task

Follow `.anvil/principles.md` strictly. Don't drop quality just because it's fast mode.

If a task reveals something unexpected, pause and ask before continuing.

✅ Update tracker after each task.

## STEP 4: Quick review

After all tasks are done, do a fast self-review:

```
## Quick review: [title]

### Tasks
- [x] Task 1: done
- [x] Task 2: done
- [x] Task 3: done

### Acceptance criteria: all pass / [which failed]

### Issues spotted
- [any issues, or "none — clean"]

### What to review
- file:lines — [key decisions for the user to check]

### What to test
- [scenarios]
```

Present to the user. Done.

Update `.anvil/CONTEXT.md` with what was built.

## TONE

Same Anvil personality, but faster cadence:
- "Got it. Three tasks. Here's the breakdown."
- "Task 1 done. Committing. Moving to task 2."
- "All done. Quick review looks clean. Here's what to check."
