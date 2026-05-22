Title: Add difficulty level to flashcards

Summary
- Add a `difficulty` attribute to each card (e.g., `difficulty: "easy" | "medium" | "hard"`) so the review algorithm and UI can surface and filter by difficulty.

Goal
- Introduce `difficulty` in types and data, show it in the UI, and make it usable by filtering or scheduling logic.

Acceptance criteria
- New or migrated cards include a `difficulty` field with one of the allowed values.
- UI shows difficulty on the card (subtle badge) and the review filter can select by difficulty.
- Backward compatibility: if `difficulty` is missing, default to `medium`.

Tasks
1. Add `difficulty` to `src/types/index.ts` and update card types.
2. Update card data or migration helper to set default `medium` when absent.
3. Add a small badge in `questionCard.tsx` showing difficulty.
4. Add a difficulty filter UI in `flashcardPage.tsx` (dropdown or chips).
5. Update any scheduling/review code in `src/lib/fsrs.ts` to optionally use difficulty as a multiplier.
6. Add unit tests for defaulting and UI rendering.

Implementation notes
- Keep difficulty values simple (`easy`, `medium`, `hard`) to avoid ambiguity.
- Expose difficulty as a prop where cards are rendered so styling remains isolated.

Files to change (suggested)
- `src/types/index.ts`
- `src/components/questionCard.tsx`
- `src/pages/flashcardPage.tsx`
- `src/lib/fsrs.ts`
- `src/data/*` (optional migration)

Estimated effort
- 2-3 hours (types + UI badge + small filter)
