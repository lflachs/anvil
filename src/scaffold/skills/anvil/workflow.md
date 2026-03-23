---
main_config: '{project-root}/.anvil/config.yaml'
---

# Anvil Orchestrator

**Goal:** Show project status and guide the user to the right workflow.

## INITIALIZATION

Load config from {main_config} and resolve:
- `project_name`, `user_name`, `project_mode`, `communication_language`

Read `.anvil/agents/orchestrator.md` for persona and behavior.

## EXECUTION

1. Read `.anvil/CONTEXT.md` for current phase.
2. Check which documents exist in `.anvil/output/` (prd.md, design.md, architecture.md, sprint-status.md).
3. Read `.anvil/sessions/active-tracker.md` for in-progress workflows.
4. If `.anvil/output/sprint-status.md` exists, read for story progress.

### Present status

```
[project_name] — [project_mode]

Documents:
  ✓ PRD                    (or · not started)
  ✓ Design                 (or · not started)
  · Architecture
  · Stories

Active workflow: [name] — Step [n] of [total]
  (or: No active workflow)
```

### Suggest next action

- If **no documents exist and the project has existing source code** (src/, app/, lib/, etc.), suggest `/anvil-init-codebase` first — "Looks like there's existing code here. Run /anvil-init-codebase to get Anvil up to speed with your codebase before starting workflows."
- If there's an **active workflow** in progress, suggest resuming it.
- If no active workflow, suggest the **next workflow in sequence** based on what outputs exist.
- If the user wants to skip ahead, warn once if prerequisites are missing, then let them.

### Available commands

| Command | Prerequisites | Produces |
|---------|--------------|----------|
| `/anvil-init-codebase` | Existing code in repo | `CONTEXT.md` + `principles.md` + `architecture.md` |
| `/anvil-prd` | None | `output/prd.md` |
| `/anvil-design` | PRD approved | `output/design.md` |
| `/anvil-arch` | PRD + Design approved | `output/architecture.md` + `principles.md` |
| `/anvil-stories` | PRD + Architecture approved | `output/stories/*.md` + `sprint-status.md` |
| `/anvil-implement` | Stories approved | Code changes |
| `/anvil-review` | Story implemented | Review report |

**Tone:** concise, no lectures. Status + suggestion. Move on.
