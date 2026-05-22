Title: Add `chapter` and `section` structure to schema

Summary
- Introduce `sections` inside `chapters` so content can be semantically organized. Allow variable numbers of cards per section (not constrained to fixed groups of 10).

Goal
- Update data model and UI flow so chapters contain ordered sections, each with their own metadata and card list. Ensure migrations from flat chapter->cards still work.

Acceptance criteria
- Types updated: `Chapter` now optionally contains `sections: Section[]`. A `Section` has `id`, `title`, `description?`, and `cards: Card[]`.
- UI navigation supports starting a section and displays `Section X / Y` (existing tests should still pass or be updated accordingly).
- Migration tool can split existing chapter cards into a default single section when no sections exist.

Tasks
1. Add `Section` type to `src/types/index.ts` and update `Chapter` to accept `sections?: Section[]`.
2. Update `src/data` to wrap existing card arrays into a default section when loading.
3. Update UI components that show section counts (e.g., `LandingPage.section` tests and relevant pages) to use the new structure.
4. Adjust pagination or section-start logic in `src/App.tsx` and `landingPage.tsx` to compute section start indices dynamically.
5. Add migration helper to transform legacy chapters into `sections: [{ id: 'default', title: 'Section 1', cards: [...] }]`.

Implementation notes
- Keep backward compatibility: if a chapter has `cards` but no `sections`, treat it as a single implicit section.
- Use deterministic section IDs (e.g., `chapter-1-section-1`) for migration to avoid collisions.

Files to change (suggested)
- `src/types/index.ts`
- `src/data/index.ts` and per-chapter sources
- `src/App.tsx`, `src/pages/landingPage.tsx`, `src/LandingPage.section.test.tsx`

Estimated effort
- 2-4 hours (types + data wrapper + a few UI updates/tests)
