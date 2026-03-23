---
main_config: '{project-root}/.anvil/config.yaml'
output_folder: '{project-root}/.anvil/output/stories'
sprint_file: '{project-root}/.anvil/output/sprint-status.md'
template_story: '{project-root}/.anvil/templates/story.md'
template_sprint: '{project-root}/.anvil/templates/sprint-status.md'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
prerequisites:
  - '{project-root}/.anvil/output/prd.md'
  - '{project-root}/.anvil/output/architecture.md'
---

# Stories Workflow

**Goal:** Break the approved PRD into independently implementable user stories with clear acceptance criteria.
**Agent:** Read persona from `{project-root}/.anvil/agents/scrum-master.md`.
**Prerequisites:** Approved PRD and architecture document.

## WORKFLOW ARCHITECTURE

- **Sequential steps**: Complete each step before moving to the next
- **Tracking**: Update tracker after each step
- **Gate**: User must approve story backlog and sprint plan

## INITIALIZATION

1. Load config from {main_config}
2. Load agent persona from `.anvil/agents/scrum-master.md`
3. Read `.anvil/output/prd.md` and `.anvil/output/architecture.md`
4. Create tracker with steps: Review inputs, Identify epics, Break into stories, Write acceptance criteria, Suggest priority, Create sprint, Approval gate

## STEP 1: Review inputs

Read PRD and architecture doc. Identify all user flows, features, and technical dependencies.

✅ Update tracker.

## STEP 2: Identify epics

Group related features into epics. Present: "I see [N] major areas: [list]. Does this grouping make sense?"

✅ Update tracker.

## STEP 3: Outline all stories

Map out all the stories needed across all epics — **only as a compact summary table**. No full stories yet. Keep it short:

```markdown
| # | Epic | Story | Priority |
|---|------|-------|----------|
| 1 | Auth | User registration | high |
| 2 | Auth | Login + session | high |
| 3 | Dashboard | Main dashboard layout | high |
| ...
```

Respect `project_mode`:
- **MVP**: Critical path only. Fewer stories.
- **Production**: Include error handling, edge cases, non-functional requirements.

Present the table. Then ask:

> "That's the full picture — [N] stories. I'll detail the first 2-3 now. Ready?"

**Do NOT ask if they want all stories detailed. Default is always batch mode (2-3 at a time).** Only detail all if the user explicitly asks for it.

✅ Update tracker.

## STEP 4: Detail the current batch

**Default: detail only the next 2-3 highest priority stories.** No more unless the user asks.

For each detailed story, write specific, testable acceptance criteria:
- Bad: "The login should work"
- Good: "Given valid credentials, the user is redirected to /dashboard and a session cookie is set"

**Every UI story must include accessibility criteria:**
- Keyboard navigable (tab order, enter/space activation)
- Screen reader announces the correct context
- Contrast ratios meet WCAG AA
- Focus management after state changes (modals, navigation, dynamic content)

✅ Update tracker.

## STEP 5: Suggest priority and order

Suggest order based on:
- Dependencies (what must be built first)
- Value (what proves the concept fastest)
- Risk (what's most uncertain — build early)

Present the suggested order. The user decides final priority.

✅ Update tracker.

## STEP 6: Create sprint

- Write detailed story files to {output_folder}/story-XXX.md using {template_story}
- Write sprint status to {sprint_file} using {template_sprint}
- Sprint status includes both detailed stories (ready to build) and outlined stories (queued for next batch)

✅ Update tracker.

## STEP 7: Approval gate

Present the sprint plan. Ask:

> "Here's sprint [N] with [X] stories ready to build. [Y] more stories outlined for later. Say 'approved' to start, or adjust."

🚫 **Do not proceed until the user explicitly approves.**

When approved:
1. Archive tracker to `.anvil/sessions/[YYYY-MM-DD]-stories.md`
2. Reset tracker to idle
3. Update `.anvil/CONTEXT.md` with story count and sprint goal

**After a batch is implemented and reviewed**, the user can run `/anvil-stories` again to detail the next batch. The workflow will detect existing stories and continue from where it left off.
