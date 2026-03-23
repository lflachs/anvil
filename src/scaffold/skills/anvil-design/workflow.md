---
main_config: '{project-root}/.anvil/config.yaml'
output_file: '{project-root}/.anvil/output/design.md'
template: '{project-root}/.anvil/templates/design.md'
tracker: '{project-root}/.anvil/sessions/active-tracker.md'
prerequisite: '{project-root}/.anvil/output/prd.md'
---

# Design Workflow

**Goal:** Create a design document that gives developers clear direction on look, feel, and interaction.
**Agent:** Read persona from `{project-root}/.anvil/agents/ux-designer.md`.
**Prerequisite:** Approved PRD at {prerequisite}. If missing, tell the user: "No approved PRD found. Run /anvil-prd first."

## WORKFLOW ARCHITECTURE

- **Sequential steps**: Complete each step before moving to the next
- **Tracking**: Update the tracker file after each step
- **Gate**: User must explicitly approve the design document

## INITIALIZATION

1. Load config from {main_config}
2. Load agent persona from `.anvil/agents/ux-designer.md`
3. Read `.anvil/output/prd.md` — identify key user flows and screens needed
4. Create tracker with steps: Review PRD, Gather preferences, Design inspiration (optional), Design foundations, Visual preview (optional), Key screens, Interaction patterns, Accessibility, Approval gate

## STEP 1: Review the PRD

Read the PRD. Tell the user: "I've read the PRD. Here are the screens I think we need: [list]. Does that match your thinking?"

✅ Update tracker.

## STEP 2: Gather preferences

Ask the user:
- Existing brand guidelines, colors, fonts?
- Sites or apps they like the look of? What specifically?
- UI framework preference? (Tailwind, Material, Chakra, etc.)
- Light mode, dark mode, or both?
- Desktop-first or mobile-first?

Don't assume defaults. Ask.

✅ Update tracker.

## STEP 3: Design inspiration & references

Ask the user:

> "Want me to find design references before we lock in the foundations? I can:"
> 1. **Search for best-in-class examples** in your product's category (SaaS dashboards, e-commerce, landing pages, etc.)
> 2. **Look up current design trends and best practices** (2026 web design patterns, award-winning sites)
> 3. **Skip this** — you already know what you want

If the user provides reference URLs or screenshots:
- Analyze what makes them work — layout patterns, whitespace usage, typography choices, color approach, interaction quality
- Extract the principles, not just the surface: "This works because of generous whitespace and a strict 2-color palette, not because it uses blue"

If the user wants a search:
- Search for "[product category] best website design 2026" and "[product category] UI inspiration"
- Search design award sites (Awwwards, Godly, Mobbin, Dribbble) for relevant examples
- Present 3-5 references with one-line takeaways: what each does well and what to borrow

If the user has their own references:
- Ask them to share URLs or describe what they like
- Identify the common thread across their references

Save the references and takeaways to the design document under a "Design references" section.

This step is not a gate. If the user says skip, move on.

✅ Update tracker.

## STEP 4: Design foundations

Define based on user input:
- **Color palette**: primary, secondary, neutral, semantic
- **Typography**: font families, scale, weights
- **Spacing**: base unit, scale
- **Component library**: framework choice, customization approach
- **Layout**: grid, breakpoints, container widths

Present to user for approval before moving to screens.

✅ Update tracker.

## STEP 5: Visual preview (optional)

After the design foundations are approved, offer:

> "Want me to generate a quick preview page so you can see the colors, typography, and spacing in a browser? It takes a minute. Or we can skip this and keep moving."

If the user wants a preview, create a **standalone HTML file** at `.anvil/output/design-preview.html`:

- Self-contained (inline CSS, no external dependencies except Google Fonts if needed)
- Shows:
  - Color palette swatches (primary, secondary, neutral, semantic colors)
  - Typography scale (h1-h6, body, small, monospace) with the chosen fonts
  - Spacing scale visualization
  - A sample card component showing the design tokens together
  - A sample form (input, button, checkbox) showing interactive element styling
  - Light and dark mode if applicable
- Include basic layout examples: a header, a content section, a sidebar sketch
- Keep it simple — this is a mood board, not a prototype

Tell the user: "Open `.anvil/output/design-preview.html` in your browser."

If the user also wants **wireframes**, describe key screen layouts using simple ASCII or create additional HTML pages with placeholder boxes showing layout structure. Don't over-invest — rough is fine.

If the user skips, move on. This step is not a gate.

✅ Update tracker.

## STEP 6: Key screens

For each primary user flow from the PRD:
- Describe layout (header, sidebar, main content)
- List components and their hierarchy
- Define primary action and how user reaches it
- Describe states: loading, empty, error, success

Keep it descriptive, not pixel-precise. Enough for a developer to build it.

✅ Update tracker.

## STEP 7: Interaction patterns

Define the project's approach to:
- Navigation (sidebar, top nav, tabs)
- Forms (inline validation, submit behavior)
- Feedback (toasts, modals, inline messages)
- Loading (skeletons, spinners, progressive)

✅ Update tracker.

## STEP 8: Accessibility

Define the project's accessibility standards:

- **Color contrast**: all text meets WCAG 2.1 AA minimum (4.5:1 normal text, 3:1 large text)
- **Focus indicators**: visible focus ring on all interactive elements, never `outline: none` without replacement
- **Keyboard navigation**: all actions reachable via keyboard, logical tab order, skip-to-content link
- **Screen readers**: semantic HTML elements (`nav`, `main`, `section`, `button`), meaningful alt text, ARIA labels only when semantic HTML isn't enough
- **Motion**: respect `prefers-reduced-motion`, no auto-playing animations
- **Form accessibility**: labels associated with inputs, error messages linked via `aria-describedby`, clear validation feedback
- **Touch targets**: minimum 44x44px for mobile

For **MVP**: enforce contrast, keyboard nav, semantic HTML, alt text.
For **Production**: full list above plus screen reader testing and ARIA patterns.

✅ Update tracker.

## STEP 9: Approval gate

Present the complete design document. Ask:

> "This is the design direction. Review it. Say 'approved' to lock it in, or tell me what to change."

🚫 **Do not proceed until the user explicitly approves.**

When approved:
1. Save to {output_file}
2. Archive tracker to `.anvil/sessions/[YYYY-MM-DD]-design.md`
3. Reset tracker to idle
4. Update `.anvil/CONTEXT.md` with design decisions
