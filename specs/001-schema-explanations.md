Title: Change `explanation: string` -> `explanations: string[]`

Summary
- Convert the flashcard data schema field `explanation` (single string) to
  `explanations` (array of strings) so cards can include multiple, ordered
  explanations and supporting notes.

Goal
- Update data schema, data files, and runtime code to accept and render
  `explanations: string[]` while preserving backward compatibility with
  existing single-string `explanation` entries.

Acceptance criteria
- Data files may include either `explanation: "..."` or `explanations: ["...", ...]`.
- At runtime, components render explanations in order as a list. If only
  `explanation` exists, it is treated as a single-item `explanations` array.
- Tests (unit or integration) validate both formats and the migration logic.

Tasks
1. Add migration helper that normalizes card objects to always expose
   `explanations: string[]` in memory.
2. Update TypeScript types in `src/types/index.ts` and any model types.
3. Update data files under `src/data` and `build/data` reading code to use
   the migration helper.
4. Update UI components that display `explanation` (e.g., `questionCard.tsx`,
   `reviewMode.tsx`) to render `explanations` as ordered list or paragraphs.
5. Add unit tests verifying both legacy and new schema are handled.

Implementation notes
- Implement a small function `normalizeCard(card)` that returns `{...card, explanations: Array.isArray(card.explanations) ? card.explanations : (card.explanation ? [card.explanation] : [])}` and call it where cards are loaded or consumed.
- Update `models.ts` and any import sites where raw JSON is read (e.g., `src/data/*`).
- Keep migration logic localized to lib layer (e.g., `src/lib/fsrs.ts` or `src/lib/smartCards.ts`).

Files to change (suggested)
- `src/types/index.ts`
- `src/data/*.ts` (card sources)
- `src/components/questionCard.tsx`
- `src/components/reviewMode.tsx`
- `src/lib/*` (normalizer placement)
- `src/models.ts`
- tests in `src/` where applicable

Estimated effort
- 2-4 hours (small migration + a few component updates and tests)
