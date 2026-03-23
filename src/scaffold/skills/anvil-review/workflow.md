---
main_config: '{project-root}/.anvil/config.yaml'
stories_folder: '{project-root}/.anvil/output/stories'
sprint_file: '{project-root}/.anvil/output/sprint-status.md'
architecture: '{project-root}/.anvil/output/architecture.md'
principles: '{project-root}/.anvil/principles.md'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
---

# Review Workflow

**Goal:** Verify implementation meets acceptance criteria and quality standards.
**Agent:** Read persona from `{project-root}/.anvil/agents/reviewer.md`.
**Prerequisites:** A story in `review` status with code changes.

## WORKFLOW ARCHITECTURE

- **Sequential steps**: Check criteria first, then quality, then regressions
- **Tracking**: Log findings as they're discovered
- **Gate**: User makes the final call on approval

## INITIALIZATION

1. Load config from {main_config}
2. Load agent persona from `.anvil/agents/reviewer.md`
3. Read {principles} and {architecture}
4. Find stories in `review` status from {sprint_file}. If user specifies one, use that.
5. Create tracker with: story ID, steps (Load context, Check criteria, Check quality, Check regressions, Review report, User decision), Findings section

## STEP 1: Load context

Read the story file (acceptance criteria), architecture doc, principles, and the code changes.

✅ Update tracker.

## STEP 2: Check acceptance criteria

For each criterion in the story:
- Verify the implementation satisfies it
- Mark: PASS, FAIL, or PARTIAL
- If FAIL/PARTIAL: explain what's missing

✅ Update tracker with findings.

## STEP 3: Check code quality

Review against principles:
- SRP, readability, architecture alignment
- Error handling (proportional to project_mode)
- Security (injection, exposed secrets, missing auth)
- JSDoc on exports (JS/TS projects)
- Types properly extracted (TS projects)
- **Accessibility**: semantic HTML, keyboard navigation, ARIA attributes, contrast, focus management, alt text on images

Don't nitpick formatting — linters handle that.

✅ Update tracker.

## STEP 4: Check for regressions

If other stories have been implemented:
- Do changes break existing functionality?
- Conflicts with other stories?

✅ Update tracker.

## STEP 5: Review report

```
## Review: story-XXX — [title]

### Acceptance criteria
- [x] Criterion 1: PASS
- [ ] Criterion 2: FAIL — [specific issue]

### Issues found
1. [high/medium/low] — description
   - File: path:lines
   - Suggestion: how to fix

### What's good
- [brief highlights]

### Verdict: APPROVE / REQUEST CHANGES
```

✅ Update tracker.

## STEP 6: User decision

Present the review. Ask:

> "Here's the review. You make the call — approve this story as done, or request changes?"

If approved:
1. Update story status to `done`
2. Update {sprint_file}
3. Archive tracker to `.anvil/sessions/[YYYY-MM-DD]-review-[story-id].md`
4. Reset tracker to idle
5. Update `.anvil/CONTEXT.md`

If changes requested:
- Keep story in `review`
- List specific changes needed

## STEP 7: Suggest Anvil improvements (when relevant)

After the review, if you noticed any of the following, suggest improving Anvil itself:

- **A pattern kept recurring** that should be a principle (e.g., "we keep forgetting to handle loading states")
- **A missing acceptance criterion type** that should be standard (e.g., "every form story should require validation feedback")
- **A workflow gap** — something the workflow should have caught earlier
- **A template missing a section** that would have been useful
- **A stack-specific practice** that should be in the stack principles

If nothing stands out, skip this step. Don't force it.

If something does:

> "One thing I noticed during this review — [observation]. Want me to add that to Anvil's [principles/workflow/template] so it's baked in next time? Run /anvil-improve to apply it."

This step is not a gate. It's a nudge.
