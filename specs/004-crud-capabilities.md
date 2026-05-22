Title: Add persistent CRUD backend for cards (SQLite)

Summary
- Replace the mock JSON/backend with a lightweight SQLite-backed CRUD API that stores chapters, sections, and cards. Provide migrations and a simple API server for read/write operations.

Goal
- Introduce a single normalized SQLite database for all flashcards and metadata, expose REST endpoints for CRUD, and migrate existing in-repo JSON card data into the DB without breaking the client.

Acceptance criteria
- A runnable Node.js script or small Express server exposes endpoints: GET /chapters, GET /chapters/:id, POST /chapters, PUT /chapters/:id, DELETE /chapters/:id, and equivalent for sections and cards.
- Existing client read path (importing `src/data`) continues to work or is replaced with a configuration toggle pointing to the local API (backwards compatible during migration).
- Migration script converts existing `src/data/cards/*.ts` into the database and marks migrated state.
- Basic tests demonstrate CRUD operations succeed (can be simple integration tests using an in-memory temporary DB file).

Tasks
1. Define DB schema: tables `chapters`, `sections`, `cards` with necessary fields and indexes.
2. Create migration script `scripts/migrate-to-sqlite.js` that reads current card sources and inserts rows into the DB.
3. Add a minimal API server `accounting/ai-server.js` or `src/server.js` (Express + better-sqlite3 or sqlite3) exposing CRUD endpoints.
4. Add configuration & environment variable `USE_DB=true` to toggle client to fetch from API instead of static data (initially keep static fallback).
5. Add tests for migration and basic CRUD endpoints.
6. Document steps in README.md and add a basic seed command.

Implementation notes
- Use `better-sqlite3` for synchronous, simple DB usage inside Node scripts. Keep server read-only by default and require an API key for writes unless running in dev.
- Keep migration idempotent: it should detect already-migrated records by a unique key (e.g., chapter id + card q text) and skip duplicates.
- Keep the client fallback: by default continue to import static `src/data` for local dev until the client is updated.

Files to add/change (suggested)
- `scripts/migrate-to-sqlite.js`
- `accounting/src/server.ts` or `accounting/ai-server.js`
- `accounting/package.json` scripts: `migrate:db`, `start:api`
- `src/data` loading code: toggle to use API when `USE_DB` is set
- tests under `accounting/__tests__/` for CRUD

Estimated effort
- 4-8 hours (schema + migration + small API + tests)
