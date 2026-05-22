# Progress Tracker

Current status
- Context folder created with `ui-context.md`, `code-standards.md`, `progress.md`.

Recent work
- Normalizer and UI highlight for correct answers implemented (see `src/lib/normalizers.ts`, `src/components/questionCard.tsx`).
- Specs added for schema changes and features under `specs/`.

How agents should report progress
- Use the repository `manage_todo_list` helper to record steps (ID, title, status).
- Keep updates concise: one sentence describing what was done and next action.

Example update format
- `Completed: Implement normalizeCard and wire normalization (files: src/lib/normalizers.ts, src/data/index.ts). Next: add migration script.`

Next recommended tasks
- Implement DB-backed CRUD API (specs/004-crud-capabilities.md).
- Update types to support sections and run migration (specs/005-chapters-sections-schema.md).
