## CSS & Styling Principles

### Architecture

- **Utility-first with Tailwind** (if chosen). Use utility classes for most styling. Extract components when a pattern repeats 3+ times. Don't fight the framework with custom CSS unless Tailwind genuinely can't do it.
- **CSS Modules or scoped styles** (if not using Tailwind). Scope styles to components. No global stylesheets except for resets and CSS custom properties.
- **Design tokens as CSS custom properties.** Colors, spacing, font sizes, border radii — define them once as `--color-primary`, `--spacing-md`, etc. Reference everywhere. Change in one place.

### Tailwind theme & consistency

- **No arbitrary values.** Don't use `w-[347px]`, `text-[13px]`, `bg-[#1a2b3c]`, `mt-[23px]`. If a value isn't in the theme, add it to the theme config — don't bypass it with brackets. Arbitrary values break consistency and make the design system meaningless.
- **Extend the theme, don't work around it.** If you need a spacing value that doesn't exist, add it to `tailwind.config` under `theme.extend`. Same for colors, font sizes, border radii, shadows.
- **Use semantic color names.** `bg-primary`, `text-muted-foreground`, `border-destructive` — not `bg-blue-600`. The design document defines the palette; the theme maps it to semantic names. When you change the brand color, you change it in one place.
- **Shadcn/UI (if chosen):**
  - Configure the theme in `globals.css` using CSS custom properties (`--primary`, `--secondary`, `--accent`, etc.). All Shadcn components reference these variables.
  - Don't override Shadcn component styles with arbitrary Tailwind classes. If the component needs a different look, update the theme variables or customize the component source.
  - Use the `cn()` utility (clsx + tailwind-merge) for conditional classes on Shadcn components.
  - When modifying a Shadcn component, edit the source in `components/ui/` — that's the point of the copy-paste model. Don't wrap it in another component just to override styles.
- **Consistent spacing scale.** Pick a scale (4px base: 1=4px, 2=8px, 3=12px, 4=16px...) and stick to it everywhere. Don't mix `p-3` and `p-[14px]` — that's two systems fighting each other.
- **Consistent border radius.** Define `--radius` in the theme. Use `rounded-sm`, `rounded-md`, `rounded-lg` — not random pixel values. Shadcn uses `--radius` for all components by default.

### Responsive design

- **Mobile-first.** Write base styles for mobile, then add `min-width` media queries for larger screens. Not the other way around.
- **Use the design system breakpoints.** Don't invent ad-hoc breakpoints. Stick to the ones defined in the design document.
- **Fluid over fixed.** Use relative units (`rem`, `%`, `clamp()`) over fixed pixels for typography and spacing. Let the layout breathe.
- **Container queries when appropriate.** For component-level responsiveness, container queries are often better than media queries.

### Common mistakes

- **Don't use `!important`.** If you need it, the specificity architecture is broken. Fix the root cause.
- **Don't nest more than 3 levels deep.** Deep nesting creates specificity nightmares and is hard to override.
- **Don't animate layout properties.** Animate `transform` and `opacity` — they're GPU-accelerated. Animating `width`, `height`, `top`, `left` causes layout thrashing.
- **Don't use fixed heights on text containers.** Text wraps differently on different screens and zoom levels. Use `min-height` if you need a minimum, but let content determine height.

### Accessibility in CSS

- **Never `outline: none` without replacement.** Focus indicators are required. Custom focus styles are fine. Removing them is not.
- **Respect `prefers-reduced-motion`.** Wrap animations in `@media (prefers-reduced-motion: no-preference)`.
- **Respect `prefers-color-scheme`.** If supporting dark mode, use the media query to match system preference.
- **Sufficient touch targets.** `min-width: 44px; min-height: 44px` on all interactive elements for mobile.
- **Don't hide content with `display: none` for screen readers.** Use `sr-only` / visually-hidden pattern when content should be screen-reader-accessible but not visible.
