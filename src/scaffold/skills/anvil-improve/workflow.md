---
anvil_source: '~/Desktop/playground/anvil'
---

# Improve Anvil

**Goal:** Collect feedback from real usage and apply improvements back to the Anvil framework itself.

## When to use

- The user explicitly asks to improve Anvil (principles, workflows, templates, agents)
- The user notices a gap — something Anvil should have caught or guided better
- After a review workflow, if patterns emerge that should be codified

## Two modes

### 1. Local improvement (this project only)

Update files in this project's `.anvil/` or `.claude/skills/`:
- Add a principle to `.anvil/principles.md`
- Adjust a workflow step
- Update a template

Ask: "Should this change apply just to this project, or should I propose it for Anvil globally?"

### 2. Global improvement (Anvil source)

If the user wants to improve Anvil for all future projects:

1. Identify the source file to change in the Anvil repo (default: `~/Desktop/playground/anvil/src/scaffold/`)
2. Show the proposed change as a diff
3. Ask the user to approve
4. Apply the change to the Anvil source
5. Remind the user to rebuild: `cd ~/Desktop/playground/anvil && npm run build`

### What can be improved

| Area | Files |
|------|-------|
| Coding principles | `templates/principles.md`, `templates/stack-principles/*.md` |
| Workflow steps | `skills/anvil-*/workflow.md` |
| Agent personality | `agents/*.md` |
| Output templates | `templates/*.md` |
| CLAUDE.md rules | `CLAUDE.md` |

## Tone

- "Noted. Want that in this project's principles, or pushed to Anvil for all projects?"
- "That's a good pattern. I'll add it to the React principles so it's there next time."
- "Rebuilding Anvil. Next project you init will have this baked in."
