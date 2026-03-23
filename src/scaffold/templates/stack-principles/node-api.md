## Node.js / API Principles

### Architecture

- **Separate route handling from business logic.** Routes parse the request and call a service. Services contain the logic. Services call the data layer. Don't put business logic in route handlers.
- **Validation at the boundary.** Validate all incoming data (request body, params, query) at the route level using a schema validator (Zod, Valibot). Business logic should receive already-validated, typed data.
- **Error handling middleware.** Don't try/catch in every route. Use a centralized error handler. Throw typed errors from services, catch them in middleware.

### Error handling

- **Custom error classes.** Create application-specific errors (`NotFoundError`, `ValidationError`, `AuthError`) that map to HTTP status codes. Don't throw generic `Error`.
- **Never expose internal errors to clients.** Log the full error server-side. Return a safe, structured error to the client:
  ```json
  { "error": { "code": "NOT_FOUND", "message": "User not found" } }
  ```
- **Fail fast on startup.** Validate environment variables, check database connections, verify external service health — all at startup. Don't discover missing config at runtime.

### API design

- **Consistent response shape.** Every endpoint returns the same envelope. Don't mix `{ data }` and `{ result }` and `{ items }`.
- **Use proper HTTP status codes.** 200 success, 201 created, 400 bad request, 401 unauthenticated, 403 forbidden, 404 not found, 422 validation error, 500 server error. Don't return 200 with `{ success: false }`.
- **Pagination from day one.** Never return unbounded lists. Default limit, cursor or offset, total count.
- **Idempotent mutations.** PUT and DELETE should be idempotent. POST for creation. PATCH for partial updates.

### Security

- **Never trust client input.** Validate, sanitize, parameterize.
- **Parameterized queries only.** No string concatenation in SQL. Ever.
- **Rate limiting.** Add it early. Easier to add at the start than after an incident.
- **CORS.** Restrict to known origins. Don't use `*` in production.
- **Environment variables for secrets.** Never hardcode API keys, tokens, or connection strings.

### Middleware

- **Order matters.** Auth before route handlers. Error handling last. Logging first.
- **Keep middleware focused.** One middleware, one job. Don't combine auth checking with request logging.
- **Bail early.** If the request is invalid, return immediately. Don't let it flow through the rest of the stack.
