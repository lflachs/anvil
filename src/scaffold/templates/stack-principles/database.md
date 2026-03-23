## Database Principles

### Schema design

- **Explicit over implicit.** Name columns for what they store. `created_at` not `date`. `is_active` not `status` (unless status has multiple values — then use an enum).
- **Use proper types.** Timestamps for dates, UUIDs or CUID for IDs (not auto-increment if the ID is exposed), enums for fixed sets of values, JSON columns only when the shape is truly dynamic.
- **Soft delete with caution.** `deleted_at` is useful for audit trails but adds complexity to every query. Decide per-table whether soft delete is worth it. For most tables, hard delete is fine.
- **Indexes on query patterns.** Add indexes on columns you filter, sort, or join on. Don't add indexes on every column — they slow down writes.
- **Constraints in the database.** NOT NULL, UNIQUE, FOREIGN KEY, CHECK — the database is the last line of defense. Don't rely solely on application-level validation.

### Queries

- **No N+1 queries.** If you're querying inside a loop, you're doing it wrong. Use joins, includes (ORM), or batch queries.
- **Paginate everything.** Never `SELECT * FROM table`. Always LIMIT + OFFSET or cursor-based pagination.
- **Select only what you need.** Don't `SELECT *` in production code. Specify columns.
- **Transactions for multi-step operations.** If two writes need to succeed together, use a transaction. Don't hope for the best.

### Migrations

- **One migration per change.** Don't bundle unrelated schema changes. Each migration should be independently reversible.
- **Always write down migrations.** Don't modify the database by hand. Everything goes through migration files that are version-controlled.
- **Test migrations against real data.** A migration that works on an empty database might fail on production data.
- **Backward-compatible migrations.** In production, deploy the migration before the code that uses the new schema. Add columns before removing old ones. Deploy in phases.

### ORM usage (Prisma, Drizzle, etc.)

- **ORM for CRUD, raw SQL for complex queries.** ORMs are great for standard operations. Don't fight the ORM for complex aggregations — use raw queries.
- **Keep Prisma schema as source of truth.** Don't modify the database outside of Prisma migrations.
- **Seed data for development.** Write a seed script that creates realistic test data. Run it in CI.
