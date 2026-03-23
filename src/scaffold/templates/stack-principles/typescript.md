## TypeScript Principles

### Strict mode

- **Always `strict: true`.** No exceptions. It catches real bugs. If a library doesn't support strict, that's a red flag.
- **No `any`.** Ever. Use `unknown` when the type is truly unknown, then narrow it with type guards. `any` turns off the type system — if you're using `any`, you're writing JavaScript with extra steps. If a library's types are bad, write a proper type declaration instead of `any`.
- **No typecasting.** `as` is not a solution — it's a lie to the compiler. Don't use type assertions (`as`) to force types. If the types don't match, fix the data flow or write a proper type guard. The only acceptable use: DOM element narrowing after a null check (`document.getElementById("x") as HTMLInputElement` after verifying it exists).

### Type design

- **Document type properties.** Use JSDoc comments on interface/type properties to explain what they represent — especially for non-obvious fields, business-specific values, or constraints:
  ```typescript
  interface Order {
    /** Unique order identifier (UUID v4) */
    id: string;
    /** Total price in cents to avoid floating point issues */
    totalCents: number;
    /** ISO 8601 timestamp of when the order was placed */
    createdAt: string;
    /** Current fulfillment stage */
    status: OrderStatus;
  }
  ```
  This powers IDE tooltips and makes the codebase self-documenting. Not every property needs a comment — skip obvious ones like `name: string`. Document the ones where the name alone doesn't tell the full story.
- **Discriminated unions over optional fields.** Instead of `{ type?: string; data?: X | Y }`, use `{ type: "a"; data: X } | { type: "b"; data: Y }`. The compiler enforces exhaustive handling.
- **Exhaustive switches.** When switching on a discriminated union, add a `default: never` case to catch unhandled variants at compile time:
  ```typescript
  function assertNever(x: never): never {
    throw new Error(`Unexpected value: ${x}`);
  }
  ```
- **Narrow, don't widen.** Be as specific as possible with types. `"success" | "error"` is better than `string`. `readonly number[]` is better than `number[]` when the array isn't mutated.
- **Use `satisfies` for type-checking without widening.** `const config = { ... } satisfies Config` checks the type without losing the literal types.

### Patterns

- **Prefer `interface` for objects, `type` for everything else.** Interfaces have better error messages and support declaration merging. Types handle unions, intersections, and mapped types.
- **Use `readonly` by default.** Mark arrays, objects, and properties as `readonly` when they shouldn't be mutated. It prevents accidental mutation and communicates intent.
- **Generic constraints.** When writing generics, constrain them: `<T extends Record<string, unknown>>` not just `<T>`. Unconstrained generics accept anything, which defeats the purpose.
- **Zod/Valibot for runtime validation.** TypeScript types disappear at runtime. Use a validation library at system boundaries (API inputs, form data, external data) to get both type safety and runtime checks.

### What not to do

- Don't use `enum`. Use `as const` objects or union types instead — they're simpler, tree-shakeable, and don't generate weird JavaScript.
- Don't use `namespace`. Use ES modules.
- Don't use `!` (non-null assertion) unless you've proven the value exists and a proper null check is genuinely impractical.
