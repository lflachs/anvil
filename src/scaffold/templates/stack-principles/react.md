## React Principles

### Components

- **Composition over inheritance. Always.** React has no use for class inheritance. Build complex UI by composing small, focused components together — not by extending base components.
- **Composable components.** Design components as building blocks that combine, not monoliths that configure:
  - Bad: `<Card showHeader showFooter showImage variant="profile" size="lg" onHeaderClick={...} />`
  - Good: `<Card><Card.Header /><Card.Body><Avatar /></Card.Body><Card.Footer /></Card>`
  - Use `children`, compound components (`Card.Header`, `Card.Body`), and render props to let consumers control structure.
- **Slots pattern.** When a component needs multiple insertion points, use named props as slots (`header`, `footer`, `sidebar`) or compound components. Don't pass JSX through 10 props — that's a sign the component should be composed differently.
- **One component, one file.** Co-locate styles, types, and tests with the component. Exception: tiny helper components used only by the parent can live in the same file.
- **Presentational vs logic.** Components should either render UI or manage logic — rarely both. Extract logic into custom hooks when the component is doing too much.
- **Props interface at the top.** Define the component's contract clearly. The props interface is the first thing another developer should see. If it has more than 5 props, the component is probably doing too much — compose instead.
- **Avoid prop drilling.** If a prop passes through 3+ levels unchanged, use context or composition. But don't reach for global state — context scoped to a feature is usually enough.
- **Default to uncontrolled.** Not everything needs to be a controlled component. Use uncontrolled inputs with refs for simple forms. Controlled only when you need real-time validation or derived state.

### Component variants with CVA

- **Use `class-variance-authority` (CVA) for component variants** when using Tailwind. CVA provides type-safe, composable variant definitions instead of messy ternary chains in className strings.
- Pattern: define variants in a `cva()` call, export the component with typed props:
  ```typescript
  const button = cva("rounded font-medium transition-colors", {
    variants: {
      intent: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  });
  ```
- **Combine with `tailwind-merge`** (`twMerge`) to handle class conflicts when consumers pass additional className props.
- **Combine with `clsx`** for conditional classes. The standard pattern: `cn(...inputs)` utility using `clsx` + `twMerge`.
- Use CVA for any component with 2+ visual variants. Don't hand-roll className logic with ternaries.

### Custom hooks

- **Extract when reused or when the component is crowded.** Not every `useState` + `useEffect` combo needs a hook. Extract when:
  - The same logic appears in 2+ components
  - The component has more than ~30 lines of hook logic
  - The logic is independently testable
- **Name hooks for what they do, not how.** `useAuth` not `useAuthStateAndRefreshToken`. `useDebounce` not `useSetTimeoutCleanup`.
- **Return only what's needed.** Don't return internal state that consumers don't need. A hook's return value is its API — keep it minimal.
- **Hooks don't render.** A custom hook should never return JSX. That's a component.
- **Compose hooks from hooks.** Build complex behavior by combining smaller hooks, not by writing one giant hook.

### State management

- **Start with local state.** `useState` covers most cases. Don't reach for a store until local state is genuinely insufficient.
- **URL is state too.** Search params, route params — use the URL for state that should survive refresh or be shareable.
- **Server state is not client state.** Use a data-fetching library (TanStack Query, SWR, or framework-native) for server data. Don't manually sync server data into a client store.
- **Derived state is not state.** If you can compute it from existing state, compute it. Don't `useState` + `useEffect` to keep a derived value in sync — that's a bug waiting to happen.

### Performance

- **Don't optimize by default.** `React.memo`, `useMemo`, `useCallback` are tools for measured problems, not preventive medicine. Profile first.
- **Lazy load routes and heavy components.** Use `React.lazy` + `Suspense` for code splitting at route boundaries.
- **Virtualize long lists.** If the list has 100+ items, use a virtualization library. Don't render 1000 DOM nodes.
- **Key correctly.** Use stable, unique IDs as keys — never array index (unless the list is truly static and never reordered).

### Next.js (if applicable)

- **Server components by default.** Only add `"use client"` when the component needs interactivity, browser APIs, or hooks. Push client boundaries as far down the tree as possible.
- **Server actions for mutations.** Use server actions instead of API routes for form submissions and data mutations.
- **Route handlers for external APIs.** Use route handlers (`app/api/`) only for webhooks, external integrations, or when you need a traditional REST endpoint.
- **Loading and error boundaries.** Use `loading.tsx` and `error.tsx` at route segment boundaries. Don't build custom loading logic when the framework handles it.
- **Metadata.** Use the metadata API for SEO — `generateMetadata` for dynamic pages, static `metadata` export for fixed pages.
