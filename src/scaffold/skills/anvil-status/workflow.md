---
main_config: '{project-root}/.anvil/config.yaml'
---

# Status Workflow

**Goal:** Show a concise project overview.

## EXECUTION

1. Read `.anvil/config.yaml` for project settings.
2. Read `.anvil/CONTEXT.md` for current phase.
3. Check which documents exist in `.anvil/output/` (prd.md, design.md, architecture.md, sprint-status.md).
4. Read `.anvil/sessions/active-tracker.md` for in-progress workflows.
5. If sprint-status.md exists, count stories by status.

## OUTPUT

```
[project_name] — [project_mode]

Documents:
  ✓ PRD                    (or · not started)
  ✓ Design                 (or · not started)
  · Architecture
  · Stories

Sprint [N]:
  [done/total] stories complete
  Next: [next story by priority]

Active workflow: [name] — Step [n]
  (or: No active workflow)
```

Then ask: "What do you want to work on?"
