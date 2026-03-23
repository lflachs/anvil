---
main_config: '{project-root}/.anvil/config.yaml'
output_file: '{project-root}/.anvil/output/prd.md'
template: '{project-root}/.anvil/templates/prd.md'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
---

# Requirements Workflow

**Goal:** Create a clear, approved PRD from the user's raw ideas.
**Agent:** Read persona from `{project-root}/.anvil/agents/product-manager.md`.

## WORKFLOW ARCHITECTURE

- **Sequential steps**: Complete each step before moving to the next
- **Tracking**: Update the tracker file after each step
- **Gate**: User must explicitly approve before the PRD is finalized

## INITIALIZATION

1. Load config from {main_config} and resolve: `project_name`, `user_name`, `project_mode`, `communication_language`
2. Load agent persona from `.anvil/agents/product-manager.md`
3. Check if `.anvil/output/prd.md` already exists. If yes, ask: "There's an existing PRD. Start fresh or revise it?"
4. Create tracker:

Write to {tracker}:
```markdown
# Active Workflow

**Workflow:** requirements
**Agent:** Product Manager
**Started:** [timestamp]
**Status:** in-progress

## Steps

- [ ] Step 1: Understand the problem
- [ ] Step 2: Define scope
- [ ] Step 3: Surface edge cases
- [ ] Step 4: Draft the PRD
- [ ] Step 5: Approval gate

## Decisions log

## Notes
```

## STEP 1: Understand the problem

Ask the user to describe what they want to build. Don't interrupt. Then ask:
- Who is this for?
- What problem does it solve?
- What do they use today instead?
- What does success look like?

Save answers as context. Don't paraphrase yet.

✅ Update tracker: mark Step 1 as `[x]`, add timestamp.

## STEP 2: Define scope

Based on the user's answers:
- What's the core value proposition? (One sentence.)
- What are the primary user flows? (List them.)
- What's explicitly out of scope?

Check `project_mode`:
- **MVP**: "If this product could only do ONE thing, what would it be?"
- **Production**: Map the full feature set, but still prioritize.

Present your understanding back. Ask: "Is this right, or am I missing something?"

✅ Update tracker: mark Step 2 as `[x]`.

## STEP 3: Surface edge cases and non-functional requirements

For each user flow, identify:
- What could go wrong?
- What happens with bad input?
- What are the boundary conditions?

Surface **accessibility requirements**:
- Who are the users? Any assistive technology needs?
- What WCAG level are we targeting? (Minimum: WCAG 2.1 AA)
- Keyboard-only navigation required?
- Screen reader support scope?
- For **MVP**: baseline a11y — semantic HTML, keyboard nav, sufficient contrast, alt text
- For **Production**: full WCAG 2.1 AA compliance, screen reader testing, reduced motion support

Also surface: performance targets, i18n needs, browser/device support.

For each edge case, ask: **"Handle it, defer it, or ignore it?"**

Log each decision in the tracker's Decisions log.

✅ Update tracker: mark Step 3 as `[x]`.

## STEP 4: Draft the PRD

Load template from {template}. Fill each section based on the conversation.

Present the PRD **section by section**, not all at once. After each section:
- "Does this capture it? Anything to add or change?"

Write the draft to {output_file}.

✅ Update tracker: mark Step 4 as `[x]`.

## STEP 5: Approval gate

Present the complete PRD. Ask:

> "This is the full PRD. Read through it. When you're satisfied, say 'approved' and I'll lock it in. If anything needs changing, tell me what."

🚫 **Do not proceed until the user explicitly approves.**

When approved:
1. Save final PRD to {output_file}
2. Copy tracker to `.anvil/sessions/[YYYY-MM-DD]-requirements.md`
3. Reset tracker to idle
4. Update `.anvil/CONTEXT.md`: set phase to "Requirements complete", add key decisions
